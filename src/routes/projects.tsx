import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, PageHeading, ProjectGrid, ContactBand } from "@/components/site";
import { content, pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/projects")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "Our projects",
          "Explore real Móveis Machado kitchen projects: island kitchens, walnut finishes and contemporary lines.",
        )
      : pageMeta(
          "Os nossos projetos",
          "Conheça os projetos Móveis Machado. Cozinhas com ilha, acabamentos em madeira e linhas contemporâneas.",
        ),
  component: Projects,
});
function Projects() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <main>
      <PageHeading label={t.projectsLabel} title={t.projectsTitle} description={t.projectIntro} />
      <section className="section">
        <ProjectGrid />
      </section>
      <ContactBand />
    </main>
  );
}
