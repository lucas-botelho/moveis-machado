import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, PageHeading, ContactBand, Process } from "@/components/site";
import { content, pageMeta } from "@/lib/site-content";
export const Route = createFileRoute("/services")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "Our bespoke solutions",
          "Bespoke kitchens, custom wardrobes, furniture and interior doors. Designed and made in our own workshop in Odivelas.",
        )
      : pageMeta(
          "O que fazemos",
          "Cozinhas, roupeiros, móveis por medida e portas interiores. Soluções de fabrico próprio pensadas para o seu espaço.",
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
            <span>0{i + 1}</span>
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
