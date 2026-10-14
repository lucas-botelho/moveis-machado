import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage, PageHeading, ContactBand, Process } from "@/components/site";
import { content, pageMeta, servicePaths, serviceSlugs } from "@/lib/site-content";

export const Route = createFileRoute("/services/")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "/services",
          "en",
          "Our services",
          "Kitchens, wardrobes and furniture made to measure in our Odivelas workshop. From design to installation.",
        )
      : pageMeta(
          "/services",
          "pt",
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
        {serviceSlugs.map((slug, i) => (
          <article className="service-detail" key={slug}>
            <h2>
              <Link to={servicePaths[slug]} search={{ lang }}>
                {t.services[i]}
              </Link>
            </h2>
            <p>{t.serviceLong[i]}</p>
            <Link to={servicePaths[slug]} search={{ lang }} className="text-link">
              {lang === "pt" ? "Conhecer o serviço" : "Explore this service"}
            </Link>
          </article>
        ))}
      </section>
      <Process />
      <ContactBand />
    </main>
  );
}
