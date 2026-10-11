import type { Locale, PortfolioProject } from "../content/index";
export type PageKey =
  | "home"
  | "projects"
  | "about"
  | "contact"
  | "privacy"
  | "legal"
  | "accessibility"
  | "kitchens"
  | "wardrobes"
  | "furniture"
  | "doors";
export const pageSlugs: Record<PageKey, Record<Locale, string>>;
export function pagePath(locale: Locale, key: PageKey): string;
export function projectPath(locale: Locale, project: PortfolioProject): string;
export function resolvePage(
  locale: string,
  segments: string[],
  projects: PortfolioProject[],
): { key: PageKey } | { key: "project"; project: PortfolioProject } | null;
export function whatsappUrl(
  number: string,
  locale: Locale,
  projectTitle?: string,
): string | null;
