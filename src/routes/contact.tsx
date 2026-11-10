import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/components/site";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/cookie-consent";
import {
  contactDetails,
  content,
  cookieConsentContent,
  pageMeta,
  whatsappUrl,
  directionsUrl,
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
          "Start your bespoke furniture project with Armando Machado. Call, email or message us on WhatsApp, or visit our workshop in Odivelas. Free visit, quote and 3D design.",
        )
      : pageMeta(
          "/contact",
          "pt",
          "Contactos e orçamentos",
          "Comece o seu projeto com Armando Machado. Ligue, envie email ou mensagem pelo WhatsApp, ou visite a oficina em Odivelas. Visita, orçamento e projeto 3D sem custos.",
        ),
  component: Contact,
});
function Contact() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <main>
      <section className="section contact-layout">
        <div>
          <h1 className="section-title">{t.contactWaysTitle}</h1>
          <ul className="contact-ways">
            <li>
              <Phone aria-hidden="true" />
              <span>{t.phoneLabel}</span>
              <a href={contactDetails.phoneHref}>{contactDetails.phoneDisplay}</a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <span>{t.emailLabel}</span>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </li>
          </ul>
          <Button variant="luxury" asChild>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              {t.whatsapp}
            </a>
          </Button>
        </div>
      </section>
      <section className="section contact-location-section">
        <div className="contact-location">
          <div className="contact-location-info">
            <MapPin className="text-primary mb-6" size={28} strokeWidth={1.25} aria-hidden="true" />
            <h2>Armando Machado</h2>
            <address>
              Rua Vítor Cordon 6A
              <br />
              2675-459 Odivelas
              <br />
              Portugal
            </address>
            <p className="contact-area">
              <strong>{t.contactSub}.</strong> {t.contactCopy}
            </p>
          </div>
          <ConsentMap lang={lang} />
        </div>
      </section>
      <section className="section faq-section">
        <h2 className="section-title">{t.faqTitle}</h2>
        <div>
          {t.faq.map((item) => (
            <details className="faq" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
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
          lang === "pt" ? "Mapa de Armando Machado em Odivelas" : "Map to Armando Machado in Odivelas"
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
        <a href={directionsUrl} target="_blank" rel="noreferrer" className="text-link">
          {content[lang].directions}
        </a>
      </div>
    </div>
  );
}
