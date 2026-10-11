export const pageSlugs = {
  home: { pt: "", en: "" },
  projects: { pt: "projetos", en: "projects" },
  about: { pt: "sobre-nos", en: "about" },
  contact: { pt: "contactos", en: "contact" },
  privacy: { pt: "privacidade", en: "privacy" },
  legal: { pt: "informacao-legal", en: "legal-information" },
  accessibility: { pt: "acessibilidade", en: "accessibility" },
  kitchens: { pt: "cozinhas-por-medida", en: "bespoke-kitchens" },
  wardrobes: { pt: "roupeiros-por-medida", en: "custom-wardrobes" },
  furniture: { pt: "moveis-por-medida", en: "bespoke-furniture" },
  doors: { pt: "portas-interiores", en: "interior-doors" },
};
export function pagePath(locale, key) {
  return `/${locale}${pageSlugs[key][locale] ? "/" + pageSlugs[key][locale] : ""}`;
}
export function projectPath(locale, project) {
  return `${pagePath(locale, "projects")}/${project.translations[locale].slug}`;
}
export function resolvePage(locale, segments = [], projects = []) {
  if (!["pt", "en"].includes(locale)) return null;
  const slug = segments.join("/");
  const key = Object.keys(pageSlugs).find((k) => pageSlugs[k][locale] === slug);
  if (key) return { key };
  if (segments.length === 2 && segments[0] === pageSlugs.projects[locale]) {
    const project = projects.find(
      (p) => p.published && p.translations[locale].slug === segments[1],
    );
    if (project) return { key: "project", project };
  }
  return null;
}
export function whatsappUrl(number, locale, projectTitle = "") {
  if (!/^\+[1-9]\d{7,14}$/.test(number)) return null;
  const text =
    locale === "pt"
      ? "Olá! Gostaria de pedir um orçamento para um projeto de móveis por medida."
      : "Hello! I would like to request a quote for a custom furniture project.";
  return `https://wa.me/${number.slice(1)}?text=${encodeURIComponent(text + (projectTitle ? " " + projectTitle : ""))}`;
}
