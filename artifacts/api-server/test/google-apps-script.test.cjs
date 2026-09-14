const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const scriptPath = path.resolve(
  __dirname,
  "../../../integrations/google-apps-script/Code.gs",
);
const scriptSource = fs.readFileSync(scriptPath, "utf8");

function createHarness({ failHistoryWrites = false } = {}) {
  const properties = new Map();
  const cacheValues = new Map();
  const sentEmails = [];
  let currentTime = 1750000000000;

  const scriptProperties = {
    getProperty(key) {
      return properties.get(key) ?? null;
    },
    setProperty(key, value) {
      if (failHistoryWrites && key.startsWith("RECENT_REQUESTS_")) {
        throw new Error("simulated Script Property storage failure");
      }
      if (Buffer.byteLength(value, "utf8") > 9000) {
        throw new Error("simulated Google 9 KB property limit");
      }
      properties.set(key, value);
    },
    deleteProperty(key) {
      properties.delete(key);
    },
  };
  properties.set("OWNER_EMAIL", "contact@positive-energy.net");
  properties.set("WEBHOOK_SECRET", "test-secret");
  properties.set("SENDER_NAME", "Positive Energy");

  const scriptCache = {
    get(key) {
      const entry = cacheValues.get(key);
      if (!entry || entry.expiresAt <= currentTime) {
        cacheValues.delete(key);
        return null;
      }
      return entry.value;
    },
    put(key, value, seconds) {
      cacheValues.set(key, {
        value,
        expiresAt: currentTime + seconds * 1000,
      });
    },
    clear() {
      cacheValues.clear();
    },
  };

  class FakeDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [currentTime]));
    }

    static now() {
      return currentTime;
    }
  }

  const sandbox = {
    CacheService: {
      getScriptCache() {
        return scriptCache;
      },
    },
    ContentService: {
      MimeType: { JSON: "application/json" },
      createTextOutput(body) {
        return {
          body,
          setMimeType() {
            return this;
          },
        };
      },
    },
    Date: FakeDate,
    JSON,
    LockService: {
      getScriptLock() {
        return {
          tryLock() {
            return true;
          },
          releaseLock() {},
        };
      },
    },
    MailApp: {
      getRemainingDailyQuota() {
        return 1000;
      },
      sendEmail(...args) {
        sentEmails.push(args);
      },
    },
    PropertiesService: {
      getScriptProperties() {
        return scriptProperties;
      },
    },
    Utilities: {
      Charset: { UTF_8: "utf8" },
      DigestAlgorithm: { SHA_256: "sha256" },
      computeDigest(_algorithm, value) {
        return Array.from(
          crypto.createHash("sha256").update(value, "utf8").digest(),
        ).map((byte) => (byte > 127 ? byte - 256 : byte));
      },
    },
  };

  vm.runInNewContext(scriptSource, sandbox, { filename: scriptPath });

  function submit(payload) {
    const response = sandbox.doPost({
      postData: {
        contents: JSON.stringify({ ...payload, token: "test-secret" }),
      },
    });
    return JSON.parse(response.body);
  }

  function advanceMinute() {
    currentTime += 61 * 1000;
  }

  return {
    properties,
    scriptCache,
    sentEmails,
    submit,
    advanceMinute,
  };
}

function validPayload(index = 0) {
  return {
    requestId: (`request-${index}`).padEnd(80, "x"),
    name: "N".repeat(120),
    company: "C".repeat(160),
    email: `user${index}${"a".repeat(220)}@example.com`,
    phone: "1".repeat(40),
    serviceInterest: "commercial-ev",
    message: "M".repeat(5000),
    website: "",
  };
}

test("keeps 200 long valid submissions below the per-property limit", () => {
  const harness = createHarness();

  for (let index = 0; index < 200; index += 1) {
    const response = harness.submit(validPayload(index));
    assert.equal(response.ok, true);
    assert.equal(response.accepted, true);
    assert.equal(response.historySaved, true);
    harness.advanceMinute();
  }

  const shards = [...harness.properties.entries()].filter(([key]) =>
    key.startsWith("RECENT_REQUESTS_"),
  );
  assert.equal(shards.length, 8);
  assert.ok(
    shards.every(([, value]) => Buffer.byteLength(value, "utf8") < 9000),
  );
  assert.equal(
    shards.reduce((count, [, value]) => count + JSON.parse(value).length, 0),
    200,
  );
  assert.equal(harness.sentEmails.length, 400);
});

test("preserves owner and visitor email routing", () => {
  const harness = createHarness();
  const payload = validPayload(1);
  const response = harness.submit(payload);

  assert.equal(response.ok, true);
  assert.equal(harness.sentEmails.length, 2);
  assert.equal(harness.sentEmails[0][0], "contact@positive-energy.net");
  assert.equal(harness.sentEmails[0][3].replyTo, payload.email);
  assert.equal(harness.sentEmails[1][0], payload.email);
  assert.equal(
    harness.sentEmails[1][3].replyTo,
    "contact@positive-energy.net",
  );
});

test("prevents repeat delivery from cache and sharded history", () => {
  const harness = createHarness();
  const payload = validPayload(2);

  const first = harness.submit(payload);
  const cachedRepeat = harness.submit(payload);
  harness.scriptCache.clear();
  const historyRepeat = harness.submit(payload);

  assert.equal(first.accepted, true);
  assert.equal(cachedRepeat.accepted, true);
  assert.equal(historyRepeat.accepted, true);
  assert.equal(harness.sentEmails.length, 2);
});

test("does not report unsent when history storage fails after mail", () => {
  const harness = createHarness({ failHistoryWrites: true });
  const payload = validPayload(3);

  const first = harness.submit(payload);
  const retry = harness.submit(payload);

  assert.equal(first.ok, true);
  assert.equal(first.accepted, true);
  assert.equal(first.historySaved, false);
  assert.equal(retry.ok, true);
  assert.equal(retry.accepted, true);
  assert.equal(harness.sentEmails.length, 2);
});