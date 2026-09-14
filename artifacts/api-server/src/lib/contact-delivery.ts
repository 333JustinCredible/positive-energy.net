export const CONTACT_MAX_LENGTHS = {
  requestId: 80,
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  serviceInterest: 80,
  message: 5000,
  website: 120,
} as const;

const CONTACT_SERVICES = new Set([
  "commercial-ev",
  "distributed-energy",
  "service-om",
  "design-build",
  "resilient-power",
  "residential-energy",
  "other",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{16,80}$/;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_KEY = 5;
const DELIVERY_TIMEOUT_MS = 12_000;

export interface ContactPayload {
  requestId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  website: string;
}

interface ValidationSuccess {
  ok: true;
  value: ContactPayload;
}

interface ValidationFailure {
  ok: false;
  code: "invalid_input" | "spam";
  message: string;
}

export type ContactValidation = ValidationSuccess | ValidationFailure;

export interface ContactDeliveryConfig {
  scriptUrl?: string;
  scriptSecret?: string;
}

export interface ContactDeliverySuccess {
  status: 200;
  body: {
    ok: true;
    accepted: true;
    acknowledgmentSent: boolean;
    message: string;
  };
}

export interface ContactDeliveryFailure {
  status: 400 | 409 | 429 | 502 | 503;
  body: {
    ok: false;
    code:
      | "invalid_input"
      | "spam"
      | "duplicate_request"
      | "rate_limited"
      | "contact_delivery_not_configured"
      | "contact_delivery_unavailable";
    message: string;
  };
}

export type ContactDeliveryResult =
  | ContactDeliverySuccess
  | ContactDeliveryFailure;

interface StoredRequest {
  expiresAt: number;
  pending: boolean;
  result?: ContactDeliverySuccess;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function exceedsMaxLength(value: string, maxLength: number): boolean {
  return value.length > maxLength;
}

export function validateContactPayload(input: unknown): ContactValidation {
  if (!input || typeof input !== "object") {
    return {
      ok: false,
      code: "invalid_input",
      message: "Please check the form fields and try again.",
    };
  }

  const candidate = input as Record<string, unknown>;
  const payload: ContactPayload = {
    requestId: stringValue(candidate.requestId),
    name: stringValue(candidate.name),
    company: stringValue(candidate.company),
    email: stringValue(candidate.email).toLowerCase(),
    phone: stringValue(candidate.phone),
    serviceInterest: stringValue(candidate.serviceInterest),
    message: stringValue(candidate.message),
    website: stringValue(candidate.website),
  };

  const fields = Object.entries(payload) as Array<
    [keyof typeof CONTACT_MAX_LENGTHS, string]
  >;
  if (
    fields.some(([field, value]) =>
      exceedsMaxLength(value, CONTACT_MAX_LENGTHS[field]),
    )
  ) {
    return {
      ok: false,
      code: "invalid_input",
      message: "One or more fields are too long.",
    };
  }

  if (payload.website) {
    return {
      ok: false,
      code: "spam",
      message: "Unable to process this request.",
    };
  }

  if (
    !REQUEST_ID_PATTERN.test(payload.requestId) ||
    payload.name.length < 2 ||
    !EMAIL_PATTERN.test(payload.email) ||
    !CONTACT_SERVICES.has(payload.serviceInterest) ||
    payload.message.length < 10
  ) {
    return {
      ok: false,
      code: "invalid_input",
      message: "Please check the form fields and try again.",
    };
  }

  return { ok: true, value: payload };
}

function failure(
  status: ContactDeliveryFailure["status"],
  code: ContactDeliveryFailure["body"]["code"],
  message: string,
): ContactDeliveryFailure {
  return { status, body: { ok: false, code, message } };
}

export function createContactDeliveryService(
  fetchImpl: typeof fetch = fetch,
  now: () => number = () => Date.now(),
) {
  const requests = new Map<string, StoredRequest>();
  const rateBuckets = new Map<string, number[]>();

  function prune(currentTime: number) {
    for (const [requestId, request] of requests) {
      if (request.expiresAt <= currentTime) requests.delete(requestId);
    }
    for (const [key, timestamps] of rateBuckets) {
      const recent = timestamps.filter(
        (timestamp) => timestamp > currentTime - RATE_WINDOW_MS,
      );
      if (recent.length > 0) rateBuckets.set(key, recent);
      else rateBuckets.delete(key);
    }
  }

  function rateLimited(keys: string[], currentTime: number): boolean {
    for (const key of keys) {
      const timestamps = rateBuckets.get(key) ?? [];
      if (timestamps.length >= MAX_REQUESTS_PER_KEY) return true;
    }
    for (const key of keys) {
      rateBuckets.set(key, [
        ...(rateBuckets.get(key) ?? []),
        currentTime,
      ]);
    }
    return false;
  }

  async function submit(
    input: unknown,
    clientKey: string,
    config: ContactDeliveryConfig,
  ): Promise<ContactDeliveryResult> {
    const validation = validateContactPayload(input);
    if (validation.ok === false) {
      return failure(400, validation.code, validation.message);
    }

    const payload = validation.value;
    const currentTime = now();
    prune(currentTime);

    const existing = requests.get(payload.requestId);
    if (existing) {
      if (existing.result) return existing.result;
      return failure(
        409,
        "duplicate_request",
        "This request is already being processed.",
      );
    }

    if (!config.scriptUrl || !config.scriptSecret) {
      return failure(
        503,
        "contact_delivery_not_configured",
        "Online delivery is not connected yet.",
      );
    }

    let scriptUrl: URL;
    try {
      scriptUrl = new URL(config.scriptUrl);
      if (scriptUrl.protocol !== "https:") throw new Error("HTTPS required");
    } catch {
      return failure(
        503,
        "contact_delivery_not_configured",
        "Online delivery is not connected yet.",
      );
    }

    if (
      rateLimited(
        [`client:${clientKey}`, `email:${payload.email}`],
        currentTime,
      )
    ) {
      return failure(
        429,
        "rate_limited",
        "Please wait before sending another request.",
      );
    }

    requests.set(payload.requestId, {
      expiresAt: currentTime + 24 * 60 * 60 * 1000,
      pending: true,
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

    try {
      const response = await fetchImpl(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, token: config.scriptSecret }),
        signal: controller.signal,
      });
      const rawBody = await response.text();
      let body: unknown;
      try {
        body = JSON.parse(rawBody);
      } catch {
        body = null;
      }

      if (
        !response.ok ||
        !body ||
        typeof body !== "object" ||
        (body as Record<string, unknown>).ok !== true ||
        (body as Record<string, unknown>).accepted !== true
      ) {
        requests.delete(payload.requestId);
        return failure(
          response.status === 429 ? 429 : 502,
          "contact_delivery_unavailable",
          "We could not send your request. Please try again or email us directly.",
        );
      }

      const result: ContactDeliverySuccess = {
        status: 200,
        body: {
          ok: true,
          accepted: true,
          acknowledgmentSent:
            (body as Record<string, unknown>).acknowledgmentSent === true,
          message:
            "Your inquiry was received. We will review your inquiry and be in touch.",
        },
      };
      requests.set(payload.requestId, {
        expiresAt: currentTime + 24 * 60 * 60 * 1000,
        pending: false,
        result,
      });
      return result;
    } catch {
      requests.delete(payload.requestId);
      return failure(
        502,
        "contact_delivery_unavailable",
        "We could not send your request. Please try again or email us directly.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  return { submit };
}