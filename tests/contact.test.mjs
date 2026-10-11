import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact, sendContact } from "../src/contact/core.mjs";
const data = {
  name: "Pessoa Teste",
  email: "person@example.test",
  phone: "",
  type: "kitchens",
  message: "Gostaria de conhecer as opções para a minha cozinha.",
  locale: "pt",
  token: "a-test-token",
};
const config = {
  enabled: true,
  apiKey: "unit-test-key",
  from: "sender@example.test",
  to: "recipient@example.test",
  turnstileSecret: "unit-test-secret",
};
const request = (d = data, origin = "https://site.test") =>
  new Request("https://site.test/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(d),
  });
test("server validates required fields and bounds", () => {
  assert(validateContact(data));
  for (const d of [
    { ...data, email: "bad" },
    { ...data, message: "short" },
    { ...data, name: "a" },
    { ...data, type: "invalid" },
    { ...data, locale: "br" },
    { ...data, name: "Injected\nHeader" },
  ])
    assert.equal(validateContact(d), null);
});
test("missing configuration never sends", async () => {
  let calls = 0;
  const res = await sendContact(request(), { enabled: false }, async () => {
    calls++;
  });
  assert.equal(res.status, 503);
  assert.equal(calls, 0);
});
test("cross-origin submissions rejected", async () => {
  assert.equal(
    (await sendContact(request(data, "https://other.test"), config)).status,
    403,
  );
});
test("honeypot rejected without provider call", async () => {
  assert.equal(
    (await sendContact(request({ ...data, website: "spam" }), config)).status,
    400,
  );
});
test("invalid fields and missing token rejected", async () => {
  assert.equal(
    (await sendContact(request({ ...data, email: "bad" }), config)).status,
    422,
  );
  assert.equal(
    (await sendContact(request({ ...data, token: "" }), config)).status,
    422,
  );
});
test("failed security verification never sends", async () => {
  let calls = 0;
  const res = await sendContact(request(), config, async () => {
    calls++;
    return Response.json({ success: false });
  });
  assert.equal(res.status, 403);
  assert.equal(calls, 1);
});
test("token hostname and action verified", async () => {
  const res = await sendContact(request(), config, async () =>
    Response.json({ success: true, hostname: "wrong.test", action: "contact" }),
  );
  assert.equal(res.status, 403);
});
test("success only follows provider acceptance", async () => {
  let calls = 0;
  const res = await sendContact(request(), config, async (url, opts) => {
    calls++;
    if (String(url).includes("siteverify"))
      return Response.json({
        success: true,
        hostname: "site.test",
        action: "contact",
      });
    const body = JSON.parse(opts.body);
    assert.equal(body.reply_to, data.email);
    assert.equal(body.to[0], config.to);
    assert(body.text.includes(data.message));
    assert(opts.headers["Idempotency-Key"]);
    return Response.json({ id: "accepted-id" });
  });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).code, "sent");
  assert.equal(calls, 2);
});
test("provider rejection or absent acceptance id not success", async () => {
  for (const response of [
    () => Response.json({ error: "failed" }, { status: 500 }),
    () => Response.json({}),
  ]) {
    const res = await sendContact(request(), config, async (url) =>
      String(url).includes("siteverify")
        ? Response.json({
            success: true,
            hostname: "site.test",
            action: "contact",
          })
        : response(),
    );
    assert.equal(res.status, 502);
  }
});
test("request too large rejected", async () => {
  assert.equal(
    (
      await sendContact(
        request({ ...data, message: "a".repeat(17000) }),
        config,
      )
    ).status,
    413,
  );
});
