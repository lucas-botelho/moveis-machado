import type { Language } from "@/lib/site-content";
import {
  DEFAULT_SITE_URL,
  buildLanguageAlternates,
  buildLanguageUrl,
  type PublicPath,
} from "@/lib/seo-shared";

export const SITE_URL = import.meta.env["VITE_SITE_URL"]?.trim() || DEFAULT_SITE_URL;

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
  const brandedTitle = `${title} | Móveis Machado`;

  return {
    meta: [
      { title: brandedTitle },
      { name: "description", content: description },
      { property: "og:title", content: brandedTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: buildLanguageUrl(path, language, SITE_URL) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: buildLanguageUrl(path, language, SITE_URL) },
      ...buildLanguageAlternates(path, SITE_URL),
    ],
  };
}
