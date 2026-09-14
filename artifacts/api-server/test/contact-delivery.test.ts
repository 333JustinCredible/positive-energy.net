import assert from "node:assert/strict";
import test from "node:test";
import {
  createContactDeliveryService,
  type ContactPayload,
} from "../src/lib/contact-delivery.ts";

const validPayload: ContactPayload = {
  requestId: "request-1234567890",
  name: "Jane Doe",
  company: "",
  email: "jane@example.com",
  phone: "",
  serviceInterest: "commercial-ev",
  message: "We need a charging plan for a new commercial site.",
  website: "",
};

const configured = {
  scriptUrl: "https://script.google.com/macros/s/test/exec",
  scriptSecret: "test-secret",
};

function successfulFetch() {
  return async () =>
    new Response(
      JSON.stringify({
        ok: true,
        accepted: true,
        acknowledgmentSent: true,
      }),
      { status: 200 },
    );
}

test("accepts a positive Google response and sends the secret server-side", async () => {
  let calls = 0;
  let body: Record<string, unknown> | undefined;
  const service = createContactDeliveryService(async (_url, options) => {
    calls += 1;
    body = JSON.parse(String(options?.body));
    return new Response(
      JSON.stringify({ ok: true, accepted: true, acknowledgmentSent: true }),
      { status: 200 },
    );
  });

  const result = await service.submit(validPayload, "127.0.0.1", configured);

  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(calls, 1);
  assert.equal(body?.token, "test-secret");
});

test("rejects invalid input without calling the sender", async () => {
  let calls = 0;
  const service = createContactDeliveryService(async () => {
    calls += 1;
    return new Response("unexpected", { status: 200 });
  });

  const result = await service.submit(
    { ...validPayload, message: "short" },
    "127.0.0.1",
    configured,
  );

  assert.equal(result.status, 400);
  assert.equal(calls, 0);
});

test("returns the stored result for a duplicate request", async () => {
  let calls = 0;
  const service = createContactDeliveryService(async () => {
    calls += 1;
    return new Response(
      JSON.stringify({ ok: true, accepted: true, acknowledgmentSent: true }),
      { status: 200 },
    );
  });

  const first = await service.submit(validPayload, "127.0.0.1", configured);
  const second = await service.submit(validPayload, "127.0.0.1", configured);

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(calls, 1);
});

test("reports unavailable Google setup without sending", async () => {
  let calls = 0;
  const service = createContactDeliveryService(async () => {
    calls += 1;
    return new Response("unexpected", { status: 200 });
  });

  const result = await service.submit(validPayload, "127.0.0.1", {});

  assert.equal(result.status, 503);
  assert.equal(result.body.code, "contact_delivery_not_configured");
  assert.equal(calls, 0);
});

test("reports sender failures without claiming delivery", async () => {
  const service = createContactDeliveryService(async () => {
    throw new Error("network unavailable");
  });

  const result = await service.submit(
    { ...validPayload, requestId: "request-failure-1234" },
    "127.0.0.1",
    configured,
  );

  assert.equal(result.status, 502);
  assert.equal(result.body.ok, false);
});