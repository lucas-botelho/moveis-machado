import { notFoundContent } from "./not-found-content";

export type SeoLanguage = "pt" | "en";

export const DEFAULT_SITE_URL = "https://lucas-botelho.github.io/moveis-machado";

export const PUBLIC_PATHS = [
  "/",
  "/services",
  "/services/kitchens",
  "/services/wardrobes",
  "/services/furniture",
  "/projects",
  "/about",
  "/contact",
  "/cookies",
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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function createNotFoundHtml(basePath = "", stylesheetPath = ""): string {
  const prefix = basePath ? `/${basePath.replace(/^\/+|\/+$/g, "")}` : "";
  const stylesheet = stylesheetPath
    ? `<link rel="stylesheet" href="${escapeHtml(stylesheetPath)}">`
    : "";

  return `<!doctype html>
<html lang="pt-PT">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, follow">
    <title>404 | Móveis Machado</title>
    ${stylesheet}
  </head>
  <body>
    <main class="not-found-page" id="main-content">
      <div class="not-found-content">
        <p class="not-found-code" aria-hidden="true">404</p>
        <h1 id="not-found-title" data-pt="${escapeHtml(notFoundContent.pt.title)}" data-en="${escapeHtml(notFoundContent.en.title)}">${escapeHtml(notFoundContent.pt.title)}</h1>
        <p id="not-found-description" data-pt="${escapeHtml(notFoundContent.pt.description)}" data-en="${escapeHtml(notFoundContent.en.description)}">${escapeHtml(notFoundContent.pt.description)}</p>
        <a class="not-found-action" id="not-found-action" href="${prefix}/?lang=pt" data-pt-href="${prefix}/?lang=pt" data-en-href="${prefix}/?lang=en" data-pt="${escapeHtml(notFoundContent.pt.action)}" data-en="${escapeHtml(notFoundContent.en.action)}">${escapeHtml(notFoundContent.pt.action)}</a>
        <nav class="not-found-languages" aria-label="${escapeHtml(notFoundContent.pt.languageLabel)} / ${escapeHtml(notFoundContent.en.languageLabel)}">
          <a href="${prefix}/?lang=pt" lang="pt-PT">${escapeHtml(notFoundContent.pt.languageLabel)}</a>
          <a href="${prefix}/?lang=en" lang="en">${escapeHtml(notFoundContent.en.languageLabel)}</a>
        </nav>
      </div>
    </main>
    <script>
      (() => {
        const language = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "pt";
        document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
        document.querySelectorAll("[data-pt][data-en]").forEach((element) => {
          element.textContent = element.getAttribute("data-" + language);
        });
        const action = document.getElementById("not-found-action");
        action.href = action.getAttribute("data-" + language + "-href");
      })();
    </script>
  </body>
</html>
`;
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
