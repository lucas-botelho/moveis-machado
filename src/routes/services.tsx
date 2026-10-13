import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, PageHeading, ContactBand, Process } from "@/components/site";
import { content, pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/services")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "Our services",
          "Kitchens, wardrobes and furniture made to measure in our Odivelas workshop. From design to installation.",
        )
      : pageMeta(
          "O que fazemos",
          "Fabrico próprio de cozinhas, roupeiros e móveis por medida em Odivelas. Do desenho à instalação.",
        ),
  component: Services,
});
function Services() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <main>
      <PageHeading label={t.servicesLabel} title={t.servicesTitle} description={t.serviceIntro} />
      <section className="section">
        {t.services.map((s, i) => (
          <article className="service-detail" key={s}>
            <h2>{s}</h2>
            <p>{t.serviceLong[i]}</p>
          </article>
        ))}
      </section>
      <Process />
      <ContactBand />
    </main>
  );
}
