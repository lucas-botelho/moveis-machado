export type SeoLanguage = "pt" | "en";

export const DEFAULT_SITE_URL = "https://artisan-ambiance-hub.lovable.app";

export const PUBLIC_PATHS = [
  "/",
  "/services",
  "/services/kitchens",
  "/services/wardrobes",
  "/services/furniture",
  "/projects",
  "/about",
  "/contact",
] as const;

export type PublicPath = (typeof PUBLIC_PATHS)[number];

export const SEO_LANGUAGES = ["pt", "en"] as const satisfies readonly SeoLanguage[];

export function resolveSiteUrl(value?: string): string {
  const candidate = value?.trim() || DEFAULT_SITE_URL;
  const url = new URL(candidate);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("VITE_SITE_URL must use http or https");
  }

  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString().replace(/\/$/, "");
}

export function buildLanguageUrl(
  path: PublicPath,
  language: SeoLanguage,
  siteUrl = DEFAULT_SITE_URL,
): string {
  const base = new URL(`${resolveSiteUrl(siteUrl)}/`);
  const basePath = base.pathname.replace(/\/+$/, "");
  const pagePath = path === "/" ? "" : path;

  base.pathname = `${basePath}${pagePath}` || "/";
  base.search = new URLSearchParams({ lang: language }).toString();
  return base.toString();
}

export function buildLanguageAlternates(path: PublicPath, siteUrl = DEFAULT_SITE_URL) {
  const portugueseUrl = buildLanguageUrl(path, "pt", siteUrl);

  return [
    { rel: "alternate", hrefLang: "pt-PT", href: portugueseUrl },
    { rel: "alternate", hrefLang: "en", href: buildLanguageUrl(path, "en", siteUrl) },
    { rel: "alternate", hrefLang: "x-default", href: portugueseUrl },
  ] as const;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function createSitemapXml(siteUrl = DEFAULT_SITE_URL): string {
  const entries = PUBLIC_PATHS.flatMap((path) =>
    SEO_LANGUAGES.map((language) => {
      const alternates = buildLanguageAlternates(path, siteUrl)
        .map(
          ({ hrefLang, href }) =>
            `    <xhtml:link rel="alternate" hreflang="${hrefLang}" href="${escapeXml(href)}" />`,
        )
        .join("\n");

      return [
        "  <url>",
        `    <loc>${escapeXml(buildLanguageUrl(path, language, siteUrl))}</loc>`,
        alternates,
        "  </url>",
      ].join("\n");
    }),
  ).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries,
    "</urlset>",
    "",
  ].join("\n");
}

export function createRobotsTxt(siteUrl = DEFAULT_SITE_URL): string {
  const sitemapUrl = new URL(`${resolveSiteUrl(siteUrl)}/`);
  sitemapUrl.pathname = `${sitemapUrl.pathname.replace(/\/+$/, "")}/sitemap.xml`;

  return [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${sitemapUrl.toString()}`, ``].join("\n");
}

export function getLegacyPortugueseRedirectUrl(requestUrl: string): string | undefined {
  const url = new URL(requestUrl);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  if (!pathname.endsWith("/pt")) return undefined;

  const deploymentBase = pathname.slice(0, -3);
  url.pathname = deploymentBase ? `${deploymentBase}/` : "/";
  url.search = new URLSearchParams({ lang: "pt" }).toString();
  url.hash = "";
  return url.toString();
}
