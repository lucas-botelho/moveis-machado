"use client";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/src/content";
import { services } from "@/src/content";
import { getMessages } from "@/src/i18n";
import { pagePath } from "@/src/i18n/routes.mjs";
type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
export default function ContactForm({
  locale,
  enabled,
  siteKey,
}: {
  locale: Locale;
  enabled: boolean;
  siteKey: string;
}) {
  const m = getMessages(locale).contact;
  const [state, setState] = useState("");
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState("");
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef("");
  useEffect(() => {
    if (!enabled || !widget.current) return;
    let active = true;
    const el = widget.current;
    const mount = () => {
      if (active && window.turnstile)
        widgetId.current = window.turnstile.render(el, {
          sitekey: siteKey,
          language: locale === "pt" ? "pt-pt" : "en",
          action: "contact",
          callback: (value: string) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
    };
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = mount;
    if (window.turnstile) mount();
    else document.head.appendChild(script);
    return () => {
      active = false;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      script.remove();
    };
  }, [enabled, siteKey, locale]);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) {
      setState("invalid");
      return;
    }
    if (!token) {
      setState("challenge");
      return;
    }
    const fields = Object.fromEntries(new FormData(form));
    setBusy(true);
    setState("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, locale, token }),
      });
      const data = (await response.json()) as { code: string };
      if (response.ok && data.code === "sent") {
        setState("success");
        form.reset();
      } else
        setState(
          data.code === "invalid"
            ? "invalid"
            : data.code === "challenge"
              ? "challenge"
              : "error",
        );
    } catch {
      setState("error");
    } finally {
      setBusy(false);
      setToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }
  return (
    <section className="form-panel">
      <h2>{m.formTitle}</h2>
      {!enabled && (
        <p className="form-unavailable" role="status">
          {m.unavailable}
        </p>
      )}
      <form onSubmit={submit}>
        <fieldset disabled={!enabled || busy}>
          <div className="form-row">
            <label>
              {m.name}
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
              />
            </label>
            <label>
              {m.email}
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              {m.phone}
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
            <label>
              {m.type}
              <select name="type" required defaultValue="">
                <option value="" disabled>
                  {m.select}
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.titles[locale]}
                  </option>
                ))}
                <option value="other">{m.other}</option>
              </select>
            </label>
          </div>
          <label>
            {m.message}
            <textarea
              name="message"
              rows={5}
              required
              minLength={20}
              maxLength={5000}
              placeholder={m.placeholder}
            />
          </label>
          <label className="honeypot" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          {enabled && <div ref={widget} />}
          <p className="form-privacy">
            {m.privacyText}{" "}
            <a href={pagePath(locale, "privacy")}>{m.privacyLink}</a>
          </p>
          <button className="button" type="submit">
            {busy ? m.sending : m.send}
            <span aria-hidden="true">↗</span>
          </button>
        </fieldset>
        <p
          className={`form-status ${state === "success" ? "success" : ""}`}
          role="status"
          aria-live="polite"
        >
          {state
            ? m[state as "success" | "error" | "invalid" | "challenge"]
            : ""}
        </p>
      </form>
    </section>
  );
}
