import { describe, expect, it } from "vitest";

import { pageMeta, servicePaths } from "@/lib/site-content";
import {
  DEFAULT_SITE_URL,
  PUBLIC_PATHS,
  SEO_LANGUAGES,
  buildLanguageAlternates,
  buildLanguageUrl,
  createNotFoundHtml,
  createRobotsTxt,
  createSitemapXml,
  getLegacyPortugueseRedirectUrl,
  resolveSiteUrl,
} from "@/lib/seo-shared";

describe("SEO URLs", () => {
  it("uses the currently published GitHub Pages origin for default SEO URLs", () => {
    expect(resolveSiteUrl()).toBe("https://lucas-botelho.github.io/moveis-machado");

    const head = pageMeta("/contact", "pt", "Contactos", "Descrição");
    const canonical = head.links.find((link) => link.rel === "canonical");

    expect(canonical?.href).toBe("https://lucas-botelho.github.io/moveis-machado/contact?lang=pt");
    expect(createSitemapXml()).toContain(
      "<loc>https://lucas-botelho.github.io/moveis-machado/contact?lang=pt</loc>",
    );
    expect(createRobotsTxt()).toContain(
      "Sitemap: https://lucas-botelho.github.io/moveis-machado/sitemap.xml",
    );
  });

  it("normalizes the configured site URL and preserves a deployment base path", () => {
    expect(resolveSiteUrl("https://example.com/moveis-machado///?ignored=yes#section")).toBe(
      "https://example.com/moveis-machado",
    );
    expect(buildLanguageUrl("/contact", "en", "https://example.com/moveis-machado/")).toBe(
      "https://example.com/moveis-machado/contact?lang=en",
    );
  });

  it("builds one canonical and reciprocal language alternates", () => {
    const head = pageMeta("/contact", "pt", "Contactos", "Descrição");
    const canonical = head.links.find((link) => link.rel === "canonical");
    const alternates = buildLanguageAlternates("/contact", DEFAULT_SITE_URL);

    expect(canonical?.href).toBe(`${DEFAULT_SITE_URL}/contact?lang=pt`);
    expect(alternates).toEqual([
      {
        rel: "alternate",
        hrefLang: "pt-PT",
        href: `${DEFAULT_SITE_URL}/contact?lang=pt`,
      },
      { rel: "alternate", hrefLang: "en", href: `${DEFAULT_SITE_URL}/contact?lang=en` },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: `${DEFAULT_SITE_URL}/contact?lang=pt`,
      },
    ]);
  });
});

describe("SEO discovery files", () => {
  it("renders an accessible bilingual static 404 with deployment-aware language links", () => {
    const html = createNotFoundHtml("/moveis-machado", "/moveis-machado/assets/site.css");

    expect(html).toContain('<html lang="pt-PT">');
    expect(html).toContain('<main class="not-found-page" id="main-content">');
    expect(html).toContain('data-pt="Não encontrámos esta página."');
    expect(html).toContain('data-en="We couldn&#39;t find this page."');
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain('href="/moveis-machado/?lang=pt"');
    expect(html).toContain('href="/moveis-machado/?lang=en"');
    expect(html).toContain('href="/moveis-machado/assets/site.css"');
    expect(html).toContain('name="robots" content="noindex, follow"');
  });

  it("generates one sitemap entry per public path and language without the legacy route", () => {
    const sitemap = createSitemapXml("https://example.com");
    const locations = sitemap.match(/<loc>/g) ?? [];
    const languageLinks = sitemap.match(/<xhtml:link /g) ?? [];

    expect(locations).toHaveLength(PUBLIC_PATHS.length * SEO_LANGUAGES.length);
    expect(languageLinks).toHaveLength(PUBLIC_PATHS.length * SEO_LANGUAGES.length * 3);
    expect(sitemap).toContain("https://example.com/services?lang=pt");
    expect(sitemap).toContain("https://example.com/services?lang=en");
    expect(sitemap).toContain(`https://example.com${servicePaths.kitchens}?lang=pt`);
    expect(sitemap).toContain(`https://example.com${servicePaths.wardrobes}?lang=en`);
    expect(sitemap).toContain(`https://example.com${servicePaths.furniture}?lang=pt`);
    expect(sitemap).not.toContain("/pt?");
  });

  it("generates crawl rules with an absolute sitemap URL", () => {
    expect(createRobotsTxt("https://example.com/base")).toBe(
      ["User-agent: *", "Allow: /", "", "Sitemap: https://example.com/base/sitemap.xml", ""].join(
        "\n",
      ),
    );
  });
});

describe("legacy Portuguese URL", () => {
  it("redirects root and base-path /pt URLs to the canonical Portuguese query", () => {
    expect(getLegacyPortugueseRedirectUrl("https://example.com/pt")).toBe(
      "https://example.com/?lang=pt",
    );
    expect(getLegacyPortugueseRedirectUrl("https://example.com/moveis-machado/pt/")).toBe(
      "https://example.com/moveis-machado/?lang=pt",
    );
    expect(getLegacyPortugueseRedirectUrl("https://example.com/projects?lang=pt")).toBeUndefined();
  });
});
