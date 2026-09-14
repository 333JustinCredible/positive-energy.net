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

var LEGACY_RECENT_REQUESTS_PROPERTY = "RECENT_REQUESTS";
var RECENT_REQUESTS_PROPERTY_PREFIX = "RECENT_REQUESTS_";
var RECENT_REQUEST_TTL_MS = 24 * 60 * 60 * 1000;
var MAX_RECENT_REQUESTS = 200;
var RECENT_REQUEST_HISTORY_SHARDS = 8;
var RECENT_REQUESTS_PER_SHARD = 25;
var RECENT_REQUESTS_CACHE_PREFIX = "POSITIVE_ENERGY_CONTACT_";
var RECENT_REQUESTS_CACHE_TTL_SECONDS = 6 * 60 * 60;

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

    var requestFingerprint = fingerprint_(payload);
    var cachedResponse = readCachedResponse_(
      payload.requestId,
      requestFingerprint
    );
    if (cachedResponse) {
      return json_(cachedResponse);
    }

    var now = new Date().getTime();
    var recent = readRecent_().filter(function(record) {
      return record[3] > now - RECENT_REQUEST_TTL_MS;
    });

    var duplicate = recent.filter(function(record) {
      return record[0] === payload.requestId ||
        record[1] === requestFingerprint;
    })[0];
    if (duplicate) {
      return json_(responseForRecord_(duplicate, true));
    }

    var requestEmailHash = hash_(payload.email);
    var emailCount = recent.filter(function(record) {
      return record[2] === requestEmailHash &&
        record[3] > now - 60 * 60 * 1000;
    }).length;
    var totalCount = recent.filter(function(record) {
      return record[3] > now - 60 * 1000;
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

    var response = acceptedResponse_(acknowledgmentSent, false);
    cacheResponse_(
      payload.requestId,
      requestFingerprint,
      acknowledgmentSent
    );

    recent.push([
      payload.requestId,
      requestFingerprint,
      requestEmailHash,
      now,
      acknowledgmentSent ? 1 : 0
    ]);

    var historySaved = false;
    try {
      historySaved = writeRecent_(recent);
    } catch (error) {
      // Mail was accepted. History maintenance must never turn it into a
      // reported delivery failure; the cache above prevents immediate retry
      // duplicates when the property write is unavailable.
      historySaved = false;
    }
    response.historySaved = historySaved;
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

function hash_(value) {
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

function fingerprint_(payload) {
  return hash_([
    payload.name,
    payload.company,
    payload.email,
    payload.phone,
    payload.serviceInterest,
    payload.message
  ].join("\u001f"));
}

function acceptedResponse_(acknowledgmentSent, historySaved) {
  return {
    ok: true,
    accepted: true,
    acknowledgmentSent: acknowledgmentSent,
    historySaved: historySaved,
    message: "Your inquiry was received. We will review your inquiry and be in touch."
  };
}

function responseForRecord_(record, historySaved) {
  return acceptedResponse_(record[4] === 1, historySaved);
}

function cacheKey_(kind, value) {
  return RECENT_REQUESTS_CACHE_PREFIX + kind + "_" + value;
}

function cacheResponse_(requestId, requestFingerprint, acknowledgmentSent) {
  try {
    var cache = CacheService.getScriptCache();
    var value = JSON.stringify({
      acknowledgmentSent: acknowledgmentSent ? 1 : 0
    });
    cache.put(
      cacheKey_("id", requestId),
      value,
      RECENT_REQUESTS_CACHE_TTL_SECONDS
    );
    cache.put(
      cacheKey_("fingerprint", requestFingerprint),
      value,
      RECENT_REQUESTS_CACHE_TTL_SECONDS
    );
  } catch (error) {
    // Cache is a duplicate-prevention fallback, not a delivery dependency.
  }
}

function readCachedResponse_(requestId, requestFingerprint) {
  try {
    var cache = CacheService.getScriptCache();
    var raw = cache.get(cacheKey_("id", requestId)) ||
      cache.get(cacheKey_("fingerprint", requestFingerprint));
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (!parsed || (parsed.acknowledgmentSent !== 0 &&
      parsed.acknowledgmentSent !== 1)) {
      return null;
    }
    return acceptedResponse_(parsed.acknowledgmentSent === 1, false);
  } catch (error) {
    return null;
  }
}

function readRecent_() {
  var properties = PropertiesService.getScriptProperties();
  var records = [];

  for (var i = 0; i < RECENT_REQUEST_HISTORY_SHARDS; i += 1) {
    try {
      var shardRaw = properties.getProperty(
        RECENT_REQUESTS_PROPERTY_PREFIX + i
      );
      if (shardRaw) {
        appendStoredRecords_(records, JSON.parse(shardRaw));
      }
    } catch (error) {
      // A history read failure should not turn a successful email into a
      // reported failure. The cache remains available for immediate retries.
    }
  }

  if (records.length === 0) {
    try {
      var legacyRaw = properties.getProperty(
        LEGACY_RECENT_REQUESTS_PROPERTY
      );
      if (legacyRaw) {
        appendStoredRecords_(records, JSON.parse(legacyRaw));
      }
    } catch (error) {
      // Legacy history is best effort and is not required for delivery.
    }
  }

  return records.slice(-MAX_RECENT_REQUESTS);
}

function writeRecent_(records) {
  var recent = records.slice(-MAX_RECENT_REQUESTS);
  var properties = PropertiesService.getScriptProperties();

  for (var i = 0; i < RECENT_REQUEST_HISTORY_SHARDS; i += 1) {
    var start = i * RECENT_REQUESTS_PER_SHARD;
    var shard = recent.slice(
      start,
      start + RECENT_REQUESTS_PER_SHARD
    );
    properties.setProperty(
      RECENT_REQUESTS_PROPERTY_PREFIX + i,
      JSON.stringify(shard)
    );
  }

  try {
    properties.deleteProperty(LEGACY_RECENT_REQUESTS_PROPERTY);
  } catch (error) {
    // A leftover legacy property does not affect the sharded history.
  }
  return true;
}

function appendStoredRecords_(target, parsed) {
  if (!Array.isArray(parsed)) return;
  parsed.forEach(function(record) {
    var normalized = normalizeStoredRecord_(record);
    if (normalized) target.push(normalized);
  });
}

function normalizeStoredRecord_(record) {
  if (Array.isArray(record) && record.length >= 5) {
    if (!record[0] || !record[1] || !record[2]) return null;
    return [
      string_(record[0]),
      string_(record[1]),
      string_(record[2]),
      Number(record[3]) || 0,
      record[4] === 1 ? 1 : 0
    ];
  }

  if (!record || typeof record !== "object") return null;
  var response = record.response || {};
  var email = string_(record.email).toLowerCase();
  if (!record.requestId || !record.fingerprint || !email) return null;
  return [
    string_(record.requestId),
    string_(record.fingerprint),
    hash_(email),
    Number(record.createdAt) || 0,
    response.acknowledgmentSent ? 1 : 0
  ];
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}