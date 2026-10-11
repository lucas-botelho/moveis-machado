import { business } from "@/src/content/business";
import { projects, type Locale } from "@/src/content";
import {
  pageSlugs,
  pagePath,
  projectPath,
  type PageKey,
} from "@/src/i18n/routes.mjs";
export function GET() {
  const pairs = [
    ...Object.keys(pageSlugs).map((key) => ({
      pt: pagePath("pt", key as PageKey),
      en: pagePath("en", key as PageKey),
    })),
    ...projects.map((p) => ({
      pt: projectPath("pt", p),
      en: projectPath("en", p),
    })),
  ];
  const entries = pairs.flatMap((pair) =>
    (["pt", "en"] as Locale[]).map(
      (locale) =>
        `<url><loc>${business.origin}${pair[locale]}</loc><xhtml:link rel="alternate" hreflang="pt-PT" href="${business.origin}${pair.pt}"/><xhtml:link rel="alternate" hreflang="en" href="${business.origin}${pair.en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${business.origin}${pair.pt}"/></url>`,
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
