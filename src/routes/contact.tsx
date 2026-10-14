import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useLanguage, PageHeading, Eyebrow } from "@/components/site";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/cookie-consent";
import {
  content,
  cookieConsentContent,
  pageMeta,
  whatsappUrl,
  mapsUrl,
  mapsEmbedUrl,
  type Language,
} from "@/lib/site-content";
export const Route = createFileRoute("/contact")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "/contact",
          "en",
          "Contact & quotes",
          "Start your bespoke furniture project with Móveis Machado. Visit us at Rua Vítor Cordon 6A, Odivelas, or message us on WhatsApp.",
        )
      : pageMeta(
          "/contact",
          "pt",
          "Contactos e orçamentos",
          "Comece o seu projeto com a Móveis Machado. Visite-nos na Rua Vítor Cordon 6A, Odivelas, ou fale connosco pelo WhatsApp.",
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
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              {t.whatsapp}
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
          </a>
          <ConsentMap lang={lang} />
        </div>
      </section>
    </main>
  );
}

export function ConsentMap({ lang }: { lang: Language }) {
  const consent = useConsent();
  const copy = cookieConsentContent[lang];

  if (consent.record?.categories.externalMedia) {
    return (
      <iframe
        className="contact-map"
        src={mapsEmbedUrl}
        title={
          lang === "pt" ? "Mapa da Móveis Machado em Odivelas" : "Map to Móveis Machado in Odivelas"
        }
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="contact-map contact-map-placeholder" data-testid="map-placeholder">
      <MapPin aria-hidden="true" size={30} strokeWidth={1.25} />
      <div>
        <h3>{copy.mapTitle}</h3>
        <p>{copy.mapDescription}</p>
      </div>
      <div className="contact-map-actions">
        <Button
          type="button"
          variant="luxury"
          onClick={() => consent.allowCategory("externalMedia")}
        >
          {copy.loadMap}
        </Button>
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-link">
          {content[lang].directions}
        </a>
      </div>
    </div>
  );
}
