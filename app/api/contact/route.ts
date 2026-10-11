import { business } from "@/src/content/business";
import { sendContact } from "@/src/contact/core.mjs";
export async function POST(request: Request) {
  return sendContact(request, {
    enabled: business.contactEnabled,
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM,
    to: process.env.CONTACT_TO,
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY,
  });
}
