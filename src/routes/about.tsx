import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, PageHeading, Story, Process, ContactBand } from "@/components/site";
import { content, pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/about")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "Our story",
          "Discover Móveis Machado: over 40 years of craftsmanship and bespoke furniture manufacturing in Odivelas.",
        )
      : pageMeta(
          "A nossa história",
          "Mais de 40 anos de saber-fazer. Conheça a Móveis Machado, especialista em mobiliário por medida de fabrico próprio em Odivelas.",
        ),
  component: About,
});
function About() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <main>
      <PageHeading label={t.storyLabel} title={t.storyTitle} description={t.aboutIntro} />
      <Story full />
      <Process />
      <ContactBand />
    </main>
  );
}
