import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage, PageHeading, Eyebrow } from "@/components/site";
import { Button } from "@/components/ui/button";
import { content, pageMeta, facebookUrl, mapsUrl, mapsEmbedUrl } from "@/lib/site-content";
export const Route = createFileRoute("/contact")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "Contact & quotes",
          "Start your bespoke furniture project with Móveis Machado. Visit us at Rua Vítor Cordon 6A, Odivelas, or contact us on Facebook.",
        )
      : pageMeta(
          "Contactos e orçamentos",
          "Comece o seu projeto com a Móveis Machado. Visite-nos na Rua Vítor Cordon 6A, Odivelas, ou fale connosco através do Facebook.",
        ),
  component: Contact,
});
function Contact() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <main>
      <PageHeading label={t.nav[4] ?? ""} title={t.contactTitle} description={t.contactIntro} />
      <section className="section contact-layout">
        <div>
          <Eyebrow>ODIVELAS · LISBOA</Eyebrow>
          <h2 className="section-title">{t.contactSub}</h2>
          <p className="body-copy">{t.contactCopy}</p>
          <Button variant="luxury" asChild>
            <a href={facebookUrl} target="_blank" rel="noreferrer">
              {t.facebook}
              <ArrowUpRight />
            </a>
          </Button>
          <details className="faq">
            <summary>{t.prepare}</summary>
            <p>{t.prepareCopy}</p>
          </details>
          <details className="faq">
            <summary>{t.materials}</summary>
            <p>{t.materialsCopy}</p>
          </details>
        </div>
        <div className="contact-location">
          <MapPin className="text-primary mb-6" size={28} strokeWidth={1.25} />
          <h2>Móveis Machado</h2>
          <address>
            Rua Vítor Cordon 6A
            <br />
            2675-459 Odivelas
            <br />
            Portugal
          </address>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-link">
            {t.directions}
            <ArrowUpRight />
          </a>
          <iframe
            className="contact-map"
            src={mapsEmbedUrl}
            title={
              lang === "pt"
                ? "Mapa da Móveis Machado em Odivelas"
                : "Map to Móveis Machado in Odivelas"
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}
