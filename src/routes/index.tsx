import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  ServicesPreview,
  ProjectsPreview,
  Story,
  Process,
  ContactBand,
} from "@/components/site";
import { pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "Bespoke kitchens & furniture",
          "Over 40 years making kitchens, wardrobes and furniture to measure in Odivelas, Greater Lisbon. From design to installation.",
        )
      : pageMeta(
          "Cozinhas e mobiliário por medida",
          "Mais de 40 anos de experiência em cozinhas, roupeiros e mobiliário por medida. Fabrico próprio em Odivelas, Grande Lisboa.",
        ),
  component: HomePage,
});

export function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <ProjectsPreview />
      <Story />
      <Process />
      <ContactBand />
    </main>
  );
}
