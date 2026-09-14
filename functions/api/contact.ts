import {
  createContactDeliveryService,
} from "../../artifacts/api-server/src/lib/contact-delivery";

interface CloudflareContactContext {
  request: Request;
  env: Record<string, string | undefined>;
}

const contactDelivery = createContactDeliveryService();

export async function onRequestPost(context: CloudflareContactContext) {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, code: "invalid_input", message: "Please check the form fields and try again." }, 400);
  }

  const result = await contactDelivery.submit(
    body,
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