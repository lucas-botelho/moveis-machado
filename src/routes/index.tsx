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
  useLanguage,
} from "@/components/site";
import { pageMeta } from "@/lib/site-content";
import { createBusinessJsonLd } from "@/lib/seo";
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
  const lang = useLanguage();
  const jsonLd = createBusinessJsonLd(lang);
  return (
    <main>
      <script type={jsonLd.type} dangerouslySetInnerHTML={{ __html: jsonLd.children }} />
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
