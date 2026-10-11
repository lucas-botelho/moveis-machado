import { headers } from "next/headers";
import { getMessages } from "@/src/i18n";
export default async function NotFound() {
  const locale = (await headers()).get("x-site-locale") === "en" ? "en" : "pt";
  const m = getMessages(locale).common;
  return (
    <main className="not-found">
      <p className="eyebrow">MÓVEIS MACHADO · 404</p>
      <h1>{m.notFound}</h1>
      <p>{m.notFoundText}</p>
      <a className="button" href={`/${locale}`}>
        {m.home} ↗
      </a>
    </main>
  );
}
