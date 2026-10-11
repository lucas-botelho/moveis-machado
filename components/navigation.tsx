"use client";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/src/content";
import { getMessages } from "@/src/i18n";
import { pagePath } from "@/src/i18n/routes.mjs";
export default function Navigation({
  locale,
  equivalent,
}: {
  locale: Locale;
  equivalent: string;
}) {
  const m = getMessages(locale);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const links = (
    <>
      <a href={pagePath(locale, "projects")}>{m.nav.projects}</a>
      <a href={`${pagePath(locale, "home")}#services`}>{m.nav.services}</a>
      <a href={pagePath(locale, "about")}>{m.nav.about}</a>
      <a href={pagePath(locale, "contact")}>{m.nav.contact}</a>
    </>
  );
  const languages = (
    <div className="language">
      <a
        href={locale === "pt" ? pagePath(locale, "home") : equivalent}
        hrefLang="pt-PT"
        aria-label="Português"
        aria-current={locale === "pt" ? "true" : undefined}
      >
        PT
      </a>
      <span>/</span>
      <a
        href={locale === "en" ? pagePath(locale, "home") : equivalent}
        hrefLang="en"
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </a>
    </div>
  );
  return (
    <header className="header">
      <a
        className="brand"
        href={pagePath(locale, "home")}
        aria-label="Móveis Machado"
      >
        <span className="brand-mark" aria-hidden="true">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 30V12h7v4c3-6 9-6 12 0 5-6 11-5 11 3v11M12 15v15M24 16v14" />
          </svg>
        </span>
        <span className="brand-name">
          MÓVEIS MACHADO
          <small>
            {locale === "pt" ? "FEITO À SUA MEDIDA" : "MADE TO MEASURE"}
          </small>
        </span>
      </a>
      <nav
        className="desktop-nav"
        aria-label={locale === "pt" ? "Navegação principal" : "Main navigation"}
      >
        {links}
      </nav>
      <div className="header-actions">
        {languages}
        <a className="button small" href={pagePath(locale, "contact")}>
          {m.nav.quote}
          <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? m.nav.close : m.nav.menu}
        >
          {open ? "×" : "☰"}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className={`mobile-nav ${open ? "open" : ""}`}
        aria-label={locale === "pt" ? "Navegação móvel" : "Mobile navigation"}
        hidden={!open}
        onClick={() => setOpen(false)}
      >
        {links}
        {languages}
        <a href={pagePath(locale, "contact")}>{m.nav.quote} ↗</a>
      </nav>
    </header>
  );
}
