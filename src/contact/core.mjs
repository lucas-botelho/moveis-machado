export function validateContact(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const take = (k) => (typeof data[k] === "string" ? data[k].trim() : "");
  const name = take("name"),
    email = take("email"),
    phone = take("phone"),
    type = take("type"),
    message = take("message"),
    locale = take("locale");
  if (
    name.length < 2 ||
    name.length > 100 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 254 ||
    phone.length > 40 ||
    message.length < 20 ||
    message.length > 5000 ||
    !["kitchens", "wardrobes", "furniture", "doors", "other"].includes(type) ||
    !["pt", "en"].includes(locale) ||
    /[\r\n]/.test(name + email + phone)
  )
    return null;
  return { name, email, phone, type, message, locale };
}
export async function sendContact(request, config, fetcher = fetch) {
  const reply = (code, status = 400) =>
    Response.json(
      { code },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  if (request.method !== "POST") return reply("method", 405);
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply("origin", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply("invalid", 415);
  if (
    !config.enabled ||
    !config.apiKey ||
    !config.from ||
    !config.to ||
    !config.turnstileSecret
  )
    return reply("unavailable", 503);
  let raw;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply("invalid");
    const chunks = [];
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16000) {
        await reader.cancel();
        return reply("invalid", 413);
      }
      chunks.push(value);
    }
    const all = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      all.set(chunk, offset);
      offset += chunk.byteLength;
    }
    raw = new TextDecoder().decode(all);
  } catch {
    return reply("invalid");
  }
  if (new TextEncoder().encode(raw).length > 16000)
    return reply("invalid", 413);
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return reply("invalid");
  }
  if (data?.website) return reply("spam", 400);
  const clean = validateContact(data);
  if (!clean) return reply("invalid", 422);
  if (
    typeof data.token !== "string" ||
    data.token.length < 5 ||
    data.token.length > 2048
  )
    return reply("challenge", 422);
  try {
    const check = await fetcher(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: config.turnstileSecret,
          response: data.token,
        }),
        signal: AbortSignal.timeout(10000),
      },
    );
    const proof = await check.json();
    if (
      !check.ok ||
      !proof.success ||
      proof.hostname !== new URL(request.url).hostname ||
      proof.action !== "contact"
    )
      return reply("challenge", 403);
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `enquiry-${await digest(data.token)}`,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: clean.email,
        subject: `Móveis Machado · ${clean.type} · ${clean.name}`,
        text: `${clean.name}\n${clean.email}\n${clean.phone}\n${clean.locale}\n${clean.type}\n\n${clean.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return reply("delivery", 502);
    const result = await response.json();
    return result.id ? reply("sent", 200) : reply("delivery", 502);
  } catch {
    return reply("delivery", 502);
  }
}
async function digest(value) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(hash), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}
