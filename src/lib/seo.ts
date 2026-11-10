import type { Language } from "@/lib/site-content";
import {
  DEFAULT_SITE_URL,
  buildLanguageAlternates,
  buildLanguageUrl,
  resolveSiteUrl,
  type PublicPath,
} from "@/lib/seo-shared";

export const SITE_URL = resolveSiteUrl(
  import.meta.env["VITE_SITE_URL"]?.trim() || DEFAULT_SITE_URL,
);

/** Absolute URL of a file served from /public (social previews need absolute URLs). */
export function publicFileUrl(fileName: string) {
  return `${SITE_URL}/${fileName.replace(/^\/+/, "")}`;
}

const OG_IMAGE = {
  url: publicFileUrl("og-image.jpg"),
  width: "1200",
  height: "630",
  alt: {
    pt: "Cozinha por medida Armando Machado com lacado branco e revestimento efeito mármore",
    en: "Armando Machado bespoke kitchen with white lacquer and marble-effect splashback",
  },
} as const;

const OG_LOCALE = { pt: "pt_PT", en: "en_GB" } as const;

export function createPageHead({
  path,
  language,
  title,
  description,
}: {
  path: PublicPath;
  language: Language;
  title: string;
  description: string;
}) {
  const brandedTitle = `${title} | Armando Machado`;
  const url = buildLanguageUrl(path, language, SITE_URL);

  return {
    meta: [
      { title: brandedTitle },
      { name: "description", content: description },
      { property: "og:site_name", content: "Armando Machado" },
      { property: "og:title", content: brandedTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: OG_LOCALE[language] },
      { property: "og:image", content: OG_IMAGE.url },
      { property: "og:image:width", content: OG_IMAGE.width },
      { property: "og:image:height", content: OG_IMAGE.height },
      { property: "og:image:alt", content: OG_IMAGE.alt[language] },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: brandedTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE.url },
    ],
    links: [{ rel: "canonical", href: url }, ...buildLanguageAlternates(path, SITE_URL)],
  };
}

/**
 * schema.org description of the business for Google rich results.
 * Only facts confirmed by the company or published on its own website.
 */
export function createBusinessJsonLd(language: Language) {
  const homeUrl = buildLanguageUrl("/", language, SITE_URL);
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Armando Machado",
    alternateName: "Móveis Machado",
    url: homeUrl,
    logo: publicFileUrl("logo.png"),
    image: OG_IMAGE.url,
    description:
      language === "pt"
        ? "Fabrico próprio de cozinhas, roupeiros e móveis por medida em Odivelas, com projeto 3D, instalação e assistência pós-venda na Grande Lisboa."
        : "Bespoke kitchens, wardrobes and furniture made in our own workshop in Odivelas, with 3D design, installation and after-sales support across Greater Lisbon.",
    telephone: "+351964035260",
    email: "moveismachado@hotmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Vítor Cordon 6A",
      postalCode: "2675-459",
      addressLocality: "Odivelas",
      addressRegion: "Lisboa",
      addressCountry: "PT",
    },
    areaServed: [
      { "@type": "City", name: "Lisboa" },
      { "@type": "City", name: "Odivelas" },
      { "@type": "AdministrativeArea", name: "Grande Lisboa" },
    ],
    knowsAbout:
      language === "pt"
        ? [
            "Cozinhas por medida",
            "Roupeiros por medida",
            "Móveis por medida",
            "Portas interiores",
            "Remodelações",
          ]
        : [
            "Bespoke kitchens",
            "Custom wardrobes",
            "Bespoke furniture",
            "Interior doors",
            "Renovations",
          ],
    sameAs: ["https://www.instagram.com/cozinhasmoveismachado/"],
  };

  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}
