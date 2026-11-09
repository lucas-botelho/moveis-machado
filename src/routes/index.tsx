import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  ServicesPreview,
  ProjectsPreview,
  Story,
  Process,
  ContactBand,
  DesignToWork,
  Materials,
} from "@/components/site";
import { pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "/",
          "en",
          "Bespoke kitchens & furniture",
          "Over 40 years designing, making and installing bespoke kitchens, cabinets and furniture in Odivelas, Greater Lisbon. Free visit, quote and 3D design.",
        )
      : pageMeta(
          "/",
          "pt",
          "Cozinhas e mobiliário por medida",
          "Há mais de 40 anos a desenhar, fabricar e instalar cozinhas, armários e móveis por medida em Odivelas. Visita, orçamento e projeto 3D sem custos.",
        ),
  component: HomePage,
});

export function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <ProjectsPreview />
      <DesignToWork />
      <Story />
      <Materials />
      <Process />
      <ContactBand />
    </main>
  );
}
