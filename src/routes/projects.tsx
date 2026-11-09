import { createFileRoute } from "@tanstack/react-router";
import {
  useLanguage,
  PageHeading,
  ProjectGrid,
  ContactBand,
  DesignToWork,
} from "@/components/site";
import { content, pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/projects")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "/projects",
          "en",
          "Our projects",
          "Real Móveis Machado projects: island kitchens, walnut and lacquer finishes, marble-effect surfaces and a bespoke wine wall designed in 3D.",
        )
      : pageMeta(
          "/projects",
          "pt",
          "Os nossos projetos",
          "Projetos reais Móveis Machado: cozinhas com ilha, nogueira e lacados, superfícies efeito mármore e uma garrafeira desenhada em 3D.",
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
        <ProjectGrid priorityFirstImage headingLevel={2} detailed />
      </section>
      <DesignToWork />
      <ContactBand />
    </main>
  );
}
