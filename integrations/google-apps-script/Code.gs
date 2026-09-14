/**
 * Positive Energy contact delivery.
 *
 * This script uses MailApp (send-only) rather than GmailApp, so it does not
 * request inbox or message-reading access. The website proxy supplies the
 * webhook token; visitors never call this endpoint with Google credentials.
 */

var CONFIG_KEYS = {
  OWNER_EMAIL: "OWNER_EMAIL",
  WEBHOOK_SECRET: "WEBHOOK_SECRET",
  SENDER_NAME: "SENDER_NAME"
};

var MAX_LENGTHS = {
  requestId: 80,
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  serviceInterest: 80,
  message: 5000,
  website: 120
};

var SERVICES = {
  "commercial-ev": true,
  "distributed-energy": true,
  "service-om": true,
  "design-build": true,
  "resilient-power": true,
  "residential-energy": true,
  other: true
};

var RECENT_REQUESTS_PROPERTY = "RECENT_REQUESTS";
var RECENT_REQUEST_TTL_MS = 24 * 60 * 60 * 1000;
var MAX_RECENT_REQUESTS = 200;

function doPost(event) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    return json_({
      ok: false,
      code: "busy",
      message: "Please try again."
    });
  }

  try {
    var config = getConfig_();
    if (!config.ownerEmail || !config.webhookSecret) {
      return json_({
        ok: false,
        code: "not_configured",
        message: "Online delivery is not connected yet."
      });
    }

    var input = parseInput_(event);
    if (!input || input.token !== config.webhookSecret) {
      return json_({
        ok: false,
        code: "unauthorized",
        message: "Unable to process this request."
      });
    }

    var payload = normalizePayload_(input);
    var validation = validatePayload_(payload);
    if (!validation.ok) {
      return json_(validation);
    }

    var now = new Date().getTime();
    var recent = readRecent_().filter(function(record) {
      return record.createdAt > now - RECENT_REQUEST_TTL_MS;
    });

    var duplicate = recent.filter(function(record) {
      return record.requestId === payload.requestId ||
        record.fingerprint === fingerprint_(payload);
    })[0];
    if (duplicate) {
      return json_(duplicate.response);
    }

    var emailCount = recent.filter(function(record) {
      return record.email === payload.email &&
        record.createdAt > now - 60 * 60 * 1000;
    }).length;
    var totalCount = recent.filter(function(record) {
      return record.createdAt > now - 60 * 1000;
    }).length;
    if (emailCount >= 3 || totalCount >= 20) {
      return json_({
        ok: false,
        code: "rate_limited",
        message: "Please wait before sending another request."
      });
    }

    if (MailApp.getRemainingDailyQuota() < 2) {
      return json_({
        ok: false,
        code: "quota_exhausted",
        message: "Online delivery is temporarily unavailable."
      });
    }

    var ownerSent = false;
    try {
      MailApp.sendEmail(
        config.ownerEmail,
        "New Positive Energy project inquiry",
        ownerBody_(payload),
        {
          replyTo: payload.email,
          name: config.senderName
        }
      );
      ownerSent = true;
    } catch (error) {
      return json_({
        ok: false,
        code: "owner_send_failed",
        message: "Online delivery is temporarily unavailable."
      });
    }

    var acknowledgmentSent = false;
    if (ownerSent) {
      try {
        MailApp.sendEmail(
          payload.email,
          "We received your Positive Energy inquiry",
          "Thank you for contacting Positive Energy. We received your inquiry and will review it and be in touch.",
          {
            replyTo: config.ownerEmail,
            name: config.senderName
          }
        );
        acknowledgmentSent = true;
      } catch (error) {
        // The owner notification is accepted. Do not retry it from this request.
        acknowledgmentSent = false;
      }
    }

    var response = {
      ok: true,
      accepted: true,
      acknowledgmentSent: acknowledgmentSent,
      message: "Your inquiry was received. We will review your inquiry and be in touch."
    };
    recent.push({
      requestId: payload.requestId,
      fingerprint: fingerprint_(payload),
      email: payload.email,
      createdAt: now,
      response: response
    });
    writeRecent_(recent);
    return json_(response);
  } catch (error) {
    return json_({
      ok: false,
      code: "internal_error",
      message: "Online delivery is temporarily unavailable."
    });
  } finally {
    lock.releaseLock();
  }
}

function validateConfiguration() {
  var config = getConfig_();
  return json_({
    ok: true,
    configured: Boolean(config.ownerEmail && config.webhookSecret),
    sendPermission: "MailApp"
  });
}

function getConfig_() {
  var properties = PropertiesService.getScriptProperties();
  return {
    ownerEmail: properties.getProperty(CONFIG_KEYS.OWNER_EMAIL) || "",
    webhookSecret: properties.getProperty(CONFIG_KEYS.WEBHOOK_SECRET) || "",
    senderName: properties.getProperty(CONFIG_KEYS.SENDER_NAME) || "Positive Energy"
  };
}

function parseInput_(event) {
  if (!event || !event.postData || !event.postData.contents) return null;
  try {
    return JSON.parse(event.postData.contents);
  } catch (error) {
    return null;
  }
}

function normalizePayload_(input) {
  return {
    requestId: string_(input.requestId),
    name: string_(input.name),
    company: string_(input.company),
    email: string_(input.email).toLowerCase(),
    phone: string_(input.phone),
    serviceInterest: string_(input.serviceInterest),
    message: string_(input.message),
    website: string_(input.website)
  };
}

function validatePayload_(payload) {
  var keys = Object.keys(MAX_LENGTHS);
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    if (payload[key].length > MAX_LENGTHS[key]) {
      return {
        ok: false,
        code: "invalid_input",
        message: "One or more fields are too long."
      };
    }
  }

  if (payload.website) {
    return {
      ok: false,
      code: "spam",
      message: "Unable to process this request."
    };
  }

  if (
    !/^[A-Za-z0-9_-]{16,80}$/.test(payload.requestId) ||
    payload.name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    !SERVICES[payload.serviceInterest] ||
    payload.message.length < 10
  ) {
    return {
      ok: false,
      code: "invalid_input",
      message: "Please check the form fields and try again."
    };
  }
  return { ok: true };
}

function ownerBody_(payload) {
  return [
    "A new Positive Energy project inquiry was submitted.",
    "",
    "Name: " + payload.name,
    "Company: " + (payload.company || "Not provided"),
    "Email: " + payload.email,
    "Phone: " + (payload.phone || "Not provided"),
    "Service interest: " + payload.serviceInterest,
    "",
    "Project details:",
    payload.message
  ].join("\n");
}

function string_(value) {
  return typeof value === "string" ? value.trim() : "";
}

function fingerprint_(payload) {
  var value = [
    payload.name,
    payload.company,
    payload.email,
    payload.phone,
    payload.serviceInterest,
    payload.message
  ].join("\u001f");
  var digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    value,
    Utilities.Charset.UTF_8
  );
  return digest.map(function(byte) {
    var hex = (byte < 0 ? byte + 256 : byte).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function readRecent_() {
  var raw = PropertiesService.getScriptProperties().getProperty(RECENT_REQUESTS_PROPERTY);
  if (!raw) return [];
  try {
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeRecent_(records) {
  var recent = records.slice(-MAX_RECENT_REQUESTS);
  PropertiesService.getScriptProperties().setProperty(
    RECENT_REQUESTS_PROPERTY,
    JSON.stringify(recent)
  );
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}