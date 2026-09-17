import {
  createContactDeliveryService,
} from "../../artifacts/api-server/src/lib/contact-delivery";

interface CloudflareContactContext {
  request: Request;
  env: Record<string, string | undefined>;
}

const contactDelivery = createContactDeliveryService();
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_RETRY_MESSAGE =
  "Please complete the security check and try again.";

export async function onRequestPost(context: CloudflareContactContext) {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, code: "invalid_input", message: "Please check the form fields and try again." }, 400);
  }

  if (!body || typeof body !== "object") {
    return json({ ok: false, code: "invalid_input", message: "Please check the form fields and try again." }, 400);
  }

  const { turnstileToken, ...contactPayload } = body as Record<string, unknown>;
  const turnstileSecret = context.env["TURNSTILE_SECRET_KEY"];
  if (!turnstileSecret) {
    return json(
      {
        ok: false,
        code: "turnstile_secret_missing",
        message: "Security verification is not configured on the server.",
      },
      503,
    );
  }

  if (typeof turnstileToken !== "string" || !turnstileToken) {
    return json(
      {
        ok: false,
        code: "turnstile_token_missing",
        message: TURNSTILE_RETRY_MESSAGE,
      },
      403,
    );
  }

  let turnstileVerified = false;
  let turnstileErrorCodes: string[] | null = null;
  try {
    const verificationBody = new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
    });
    const clientIp = context.request.headers.get("CF-Connecting-IP");
    if (clientIp) verificationBody.set("remoteip", clientIp);

    const verificationResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verificationBody,
    });
    const verificationResult = (await verificationResponse.json()) as {
      success?: boolean;
      "error-codes"?: unknown;
    };
    turnstileVerified =
      verificationResponse.ok && verificationResult.success === true;
    if (verificationResult.success === false) {
      turnstileErrorCodes = Array.isArray(verificationResult["error-codes"])
        ? verificationResult["error-codes"].filter(
            (code): code is string => typeof code === "string",
          )
        : [];
      console.warn("Turnstile verification failed", {
        errorCodes: turnstileErrorCodes,
      });
    }
  } catch {
    turnstileVerified = false;
  }

  if (!turnstileVerified) {
    return json(
      {
        ok: false,
        code: "turnstile_failed",
        message: TURNSTILE_RETRY_MESSAGE,
        ...(turnstileErrorCodes
          ? { "error-codes": turnstileErrorCodes }
          : {}),
      },
      403,
    );
  }

  const result = await contactDelivery.submit(
    contactPayload,
    context.request.headers.get("CF-Connecting-IP") ?? "unknown",
    {
      scriptUrl: context.env["GOOGLE_APPS_SCRIPT_URL"],
      scriptSecret: context.env["GOOGLE_APPS_SCRIPT_SECRET"],
    },
  );
  return json(result.body, result.status);
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}