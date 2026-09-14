# Positive Energy Contact Delivery

This project uses a small Google Apps Script mail relay. It does not use Formspree, Resend, SendGrid, Gmail inbox access, or visitor Google sign-in.

## Owner setup

Use the existing `justin@pe-charging.com` Google Workspace account. Never put its password, the Apps Script URL, or the webhook secret in chat, browser code, public files, or source control.

1. Open [script.google.com](https://script.google.com/) while signed in as `justin@pe-charging.com`.
2. Create a standalone Apps Script project and paste the complete contents of `integrations/google-apps-script/Code.gs` into `Code.gs`.
3. Open **Project Settings → Script Properties** and add:
   - `OWNER_EMAIL`: `contact@positive-energy.net`
   - `SENDER_NAME`: `Positive Energy`
   - `WEBHOOK_SECRET`: a random high-entropy value stored in a password manager or secret manager, not in this repository
4. Run `validateConfiguration` once and approve the **send email** permission for this Workspace account. The script uses `MailApp`, not `GmailApp`, so it does not request inbox access.
5. Deploy → **New deployment** → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Copy the deployed `/exec` URL. Visitors do not sign in; the server-side webhook secret protects the send operation.
6. Add these server-only settings to the current Replit environment:
   - `GOOGLE_APPS_SCRIPT_URL`: the deployed `/exec` URL
   - `GOOGLE_APPS_SCRIPT_SECRET`: the same random secret from Script Properties
7. Submit one real test through the Replit preview. Verify both:
   - `contact@positive-energy.net` receives the inquiry with the visitor as Reply-To.
   - The visitor receives the short acknowledgment with `contact@positive-energy.net` as Reply-To.

The owner notification is sent first. If the acknowledgment send fails, the accepted owner notification is not retried or duplicated. Repeating the same request ID or matching submission within the deduplication window returns the prior result.

### Updating an existing deployment

When a corrected copy of `Code.gs` is prepared in Replit, it does not change the already deployed Google Apps Script. To update the existing web app while retaining its URL and saved properties:

1. Copy the complete current `integrations/google-apps-script/Code.gs` into the Google editor and save it.
2. Open **Deploy → Manage deployments** and edit the existing web app deployment.
3. Create/select a **new version** for that deployment, keeping **Execute as: Me** and **Who has access: Anyone**.
4. Deploy the updated version. The existing `/exec` URL remains the same.
5. Leave the existing Script Properties unchanged. No new property is required; the script automatically migrates any legacy `RECENT_REQUESTS` data into bounded `RECENT_REQUESTS_0` through `RECENT_REQUESTS_7` shards.

The history uses eight compact shards of up to 25 records each, plus a short-lived cache fallback for the most recent accepted request. A history maintenance failure after mail is accepted now returns an accepted response instead of reporting the submission as unsent.

## Cloudflare Pages production setup

The repository includes `functions/api/contact.ts`, which is the same-origin Cloudflare Pages Function proxy. Configure the Pages project with the repository root as its source, the existing Positive Energy build command, and `artifacts/positive-energy/dist/public` as the output directory. Add these as encrypted production environment variables:

- `GOOGLE_APPS_SCRIPT_URL`
- `GOOGLE_APPS_SCRIPT_SECRET`

The browser calls `/api/contact` only. The Apps Script URL and secret stay in the Replit server or Cloudflare Function and are never bundled into the frontend. No DNS change is part of this setup.

## Delivery behavior and limits

- The browser requires a readable positive JSON response before showing success.
- Invalid or oversized fields are rejected before sending.
- The hidden honeypot, per-client/per-email rate limits, Apps Script rate limits, request IDs, recent payload fingerprints, sharded history, and cache fallback provide practical spam and duplicate protection.
- Apps Script checks that quota exists for both owner and acknowledgment sends before sending.
- Automatic retries are deliberately avoided after an ambiguous send. A retry with the same request ID is deduplicated when the first accepted result was recorded.
- If settings are absent, the website keeps the form values, clearly says online delivery is unavailable, and offers `contact@positive-energy.net` directly.

Real delivery is not confirmed until the owner completes the setup above and a live test produces both expected emails.