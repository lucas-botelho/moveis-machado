import { createFileRoute } from "@tanstack/react-router";
import {
  useLanguage,
  PageHeading,
  Story,
  Values,
  Materials,
  Process,
  ContactBand,
} from "@/components/site";
import { content, pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/about")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
        "/about",
        "en",
        "Our story",
        "Móveis Machado: over 40 years making kitchens, cabinets and furniture to measure in Odivelas.",
      )
      : pageMeta(
        "/about",
        "pt",
        "A nossa história",
        "Móveis Machado: mais de 40 anos de fabrico próprio de cozinhas, armários e móveis por medida em Odivelas.",
      ),
  component: About,
});
function About() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <main>
      <Story full light />
      <Values />
      <Materials />
      <Process />
      <ContactBand />
    </main>
  );
}
