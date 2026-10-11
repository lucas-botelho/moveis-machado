export const business = {
  name: "Móveis Machado",
  address: "Rua Vítor Cordon 6A",
  postalCode: "2675-459",
  city: "Odivelas",
  country: "PT",
  maps: "https://share.google/uK5M3YaRHoAcBMNPD",
  facebook: "https://www.facebook.com/MoveisdeCozinhaPorMedida/",
  // Configure only verified business channels. Never fill these from historical sources.
  phone: process.env.BUSINESS_PHONE || "",
  email: process.env.BUSINESS_EMAIL || "",
  whatsapp: process.env.BUSINESS_WHATSAPP || "",
  origin:
    process.env.SITE_URL ||
    "https://moveis-machado-atelier.grassymoth16.chatgpt.site",
  indexable: process.env.ALLOW_INDEXING === "true",
  contactEnabled:
    process.env.CONTACT_ENABLED === "true" &&
    process.env.LEGAL_APPROVED === "true" &&
    !!process.env.RESEND_API_KEY &&
    !!process.env.CONTACT_FROM &&
    !!process.env.CONTACT_TO &&
    !!process.env.TURNSTILE_SECRET_KEY &&
    !!process.env.TURNSTILE_SITE_KEY,
};
