import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowDown, Menu, X, Ruler, Hammer, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/cookie-consent";
import heroImage from "@/assets/interior-hero.jpg";
import materialImage from "@/assets/material-study.jpg";
import brandMark from "@/assets/brand-mark.svg?url&no-inline";
import {
  content,
  cookieConsentContent,
  projects,
  mapsUrl,
  servicePages,
  servicePaths,
  serviceSlugs,
  type Language,
  type ServiceSlug,
} from "@/lib/site-content";
export function useLanguage() {
  const search = useSearch({ from: "__root__" });
  return search.lang;
}
const destinations = ["/", "/services", "/projects", "/about", "/contact"] as const;
function Brand() {
  const lang = useLanguage();
  return (
    <Link to="/" search={{ lang }} className="brand">
      <img
        className="brand-mark"
        src={brandMark}
        alt=""
        aria-hidden="true"
        width={108}
        height={100}
      />
      <span>
        <span className="brand-name">Móveis Machado</span>
        <span className="brand-tagline">{content[lang].tagline}</span>
      </span>
    </Link>
  );
}
export function SiteHeader() {
  const lang = useLanguage();
  const t = content[lang];
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  }, [lang]);
  const switchLanguage = (value: Language) => {
    void navigate({ to: ".", search: { lang: value }, resetScroll: false });
  };
  return (
    <header className="site-header">
      <Brand />
      <nav
        aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
        className={`site-navigation ${open ? "is-open" : ""}`}
      >
        {destinations.map((to, i) => (
          <Link
            key={to}
            to={to}
            search={{ lang }}
            activeOptions={{ exact: true }}
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            {t.nav[i]}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <div className="language-switch" aria-label="Language">
          <Button
            variant="navigation"
            aria-pressed={lang === "pt"}
            onClick={() => switchLanguage("pt")}
          >
            PT
          </Button>
          <span className="text-muted-foreground text-xs">/</span>
          <Button
            variant="navigation"
            aria-pressed={lang === "en"}
            onClick={() => switchLanguage("en")}
          >
            EN
          </Button>
        </div>
        <Button variant="luxury" asChild className="header-enquiry">
          <Link to="/contact" search={{ lang }}>
            {t.quote}
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="menu-toggle"
          aria-label={
            open
              ? lang === "pt"
                ? "Fechar menu"
                : "Close menu"
              : lang === "pt"
                ? "Abrir menu"
                : "Open menu"
          }
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
    </header>
  );
}
export function Eyebrow({ children, line = false }: { children: React.ReactNode; line?: boolean }) {
  return (
    <div className="eyebrow">
      {line && <span className="line" />}
      {children}
    </div>
  );
}
export function Hero() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <>
      <section className="hero">
        <img
          src={heroImage}
          alt={
            lang === "pt"
              ? "Ambiente de inspiração com cozinha e mobiliário em madeira"
              : "An inspirational interior with a walnut kitchen and furniture"
          }
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="hero-content">
          <Eyebrow line>{t.heroLabel}</Eyebrow>
          <h1>Móveis Machado</h1>
          <h2>
            {t.heroTitle}
            <br />
            <em>{t.heroItalic}</em>
          </h2>
          <p className="hero-description">{t.heroDescription}</p>
          <Button variant="hero" asChild>
            <Link to="/projects" search={{ lang }}>
              {t.explore}
            </Link>
          </Button>
        </div>
        <div className="hero-bottom">
          <a className="hero-scroll" href="#craft">
            <ArrowDown size={16} />
            {t.scroll}
          </a>
          <span className="hero-image-label">
            {lang === "pt" ? "Imagem de inspiração" : "Inspiration image"}
          </span>
        </div>
      </section>
      <TrustBand />
    </>
  );
}
function TrustBand() {
  const lang = useLanguage();
  const icons = [BadgeCheck, Hammer, Ruler, MapPin];
  return (
    <div className="trust-band">
      {content[lang].trust.map((text, i) => {
        const Icon = icons[i];
        return (
          <div className="trust-item" key={text}>
            {Icon && <Icon />}
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );
}
export function ServicesPreview() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <section className="section" id="craft">
      <div className="section-heading">
        <div>
          <Eyebrow>{t.servicesLabel}</Eyebrow>
          <h2 className="section-title">{t.servicesTitle}</h2>
        </div>
        <Link to="/services" search={{ lang }} className="text-link">
          {t.servicesLink}
        </Link>
      </div>
      <div className="service-grid">
        {serviceSlugs.map((slug, i) => (
          <Link to={servicePaths[slug]} search={{ lang }} className="service-item" key={slug}>
            <h3>{t.services[i]}</h3>
            <p>{t.serviceShort[i]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function ProjectGrid({ priorityFirstImage = false }: { priorityFirstImage?: boolean }) {
  const lang = useLanguage();
  const t = content[lang];
  const [selected, setSelected] = useState<number | null>(null);
  const project = selected === null ? undefined : projects[selected];
  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [selected]);
  return (
    <>
      <div className="project-grid">
        {projects.map((p, i) => (
          <article key={p.pt}>
            <Button
              variant="ghost"
              className="project-image-button"
              onClick={() => setSelected(i)}
              aria-label={p[lang]}
            >
              <img
                src={p.image}
                alt={p[lang]}
                loading={priorityFirstImage && i === 0 ? "eager" : "lazy"}
                fetchPriority={priorityFirstImage && i === 0 ? "high" : "auto"}
                width={1600}
                height={1200}
              />
            </Button>
            <div className="project-info">
              <div>
                <h3>{p[lang]}</h3>
                <p>{t.category}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      {project && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={project[lang]}
          onClick={() => setSelected(null)}
        >
          <Button
            autoFocus
            variant="ghost"
            size="icon"
            className="lightbox-close"
            aria-label={t.close}
            onClick={() => setSelected(null)}
          >
            <X />
          </Button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={project.image} alt={project[lang]} />
            <h2>{project[lang]}</h2>
          </div>
        </div>
      )}
    </>
  );
}
export function ProjectsPreview() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <section className="section projects-section">
      <div className="section-heading">
        <div>
          <Eyebrow>{t.projectsLabel}</Eyebrow>
          <h2 className="section-title">{t.projectsTitle}</h2>
        </div>
        <Link to="/projects" search={{ lang }} className="text-link">
          {t.projectsLink}
        </Link>
      </div>
      <ProjectGrid />
    </section>
  );
}
export function Story({ full = false }: { full?: boolean }) {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <section className="section story-section">
      <div className="story-text">
        <Eyebrow line>{t.storyLabel}</Eyebrow>
        <h2 className="section-title">{t.storyTitle}</h2>
        <p className="body-copy">{t.storyCopy}</p>
        {full && <p className="body-copy">{t.storyCopy2}</p>}
        {!full && (
          <Link className="text-link" to="/about" search={{ lang }}>
            {t.storyLink}
          </Link>
        )}
        <div className="story-signature">
          <span>Móveis Machado</span>
          <span>ODIVELAS · PORTUGAL</span>
        </div>
      </div>
      <figure className="story-visual">
        <img
          className="story-image"
          src={materialImage}
          alt={
            lang === "pt"
              ? "Estudo de inspiração de materiais: madeira, tecido e pedra"
              : "An inspirational material study: wood, fabric and stone"
          }
          loading="lazy"
          width={1536}
          height={1024}
        />
        <figcaption>
          {lang === "pt" ? "Estudo de materiais" : "Material study"}
          <span>{lang === "pt" ? "Imagem de inspiração" : "Inspiration image"}</span>
        </figcaption>
      </figure>
      <div className="story-stats">
        <div className="stat">
          <strong>
            40<span>+</span>
          </strong>
          <span>{t.years}</span>
        </div>
        <div className="stat">
          <strong>{t.own}</strong>
          <span>{t.ownSub}</span>
        </div>
      </div>
    </section>
  );
}
export function Process() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <section className="section process-section">
      <div className="process-intro">
        <Eyebrow line>{t.processLabel}</Eyebrow>
        <h2 className="section-title">{t.processTitle}</h2>
        <figure className="process-visual">
          <img
            src={projects[1]?.image}
            alt={projects[1]?.[lang]}
            loading="lazy"
            width={1600}
            height={1200}
          />
          <figcaption>{t.ownSub}</figcaption>
        </figure>
      </div>
      <div className="process-grid">
        {t.steps.map((s, i) => (
          <div className="process-item" key={s}>
            <div>
              <h3>{s}</h3>
              <p>{t.stepCopy[i]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function ContactBand() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <section className="contact-band">
      <img
        className="contact-backdrop"
        src={heroImage}
        alt=""
        loading="lazy"
        width={1920}
        height={1088}
      />
      <div className="contact-content">
        <Eyebrow line>{t.ctaLabel}</Eyebrow>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaCopy}</p>
        <Button variant="hero" asChild>
          <Link to="/contact" search={{ lang }}>
            {t.talk}
          </Link>
        </Button>
      </div>
      <div className="contact-bottom">
        <span>MÓVEIS MACHADO</span>
        <span>ODIVELAS · GRANDE LISBOA</span>
      </div>
    </section>
  );
}
export function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export function ServicePage({ service }: { service: ServiceSlug }) {
  const lang = useLanguage();
  const page = servicePages[lang][service];

  return (
    <main>
      <PageHeading label={page.label} title={page.title} description={page.description} />
      <section className="section service-page-section">
        <div className="service-page-primary">
          <h2 className="section-title">{page.scopeTitle}</h2>
          <p className="body-copy">{page.scopeCopy}</p>
          <div className="service-page-planning">
            <h3>{page.planningTitle}</h3>
            <p>{page.planningCopy}</p>
          </div>
        </div>
        <div className="service-page-facts">
          <article>
            <h2>{page.materialsTitle}</h2>
            <p>{page.materialsCopy}</p>
          </article>
          <article>
            <h2>{page.areaTitle}</h2>
            <p>{page.areaCopy}</p>
          </article>
        </div>
      </section>
      <section className="section service-page-process">
        <div className="section-heading">
          <div>
            <Eyebrow>{content[lang].processLabel}</Eyebrow>
            <h2 className="section-title">{page.processTitle}</h2>
          </div>
        </div>
        <ol className="service-page-steps">
          {page.process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="service-page-cta">
        <div>
          <Eyebrow>{content[lang].ctaLabel}</Eyebrow>
          <h2>{page.ctaTitle}</h2>
          <p>{page.ctaCopy}</p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/contact" search={{ lang }}>
            {page.ctaLabel}
          </Link>
        </Button>
      </section>
    </main>
  );
}

export function SiteFooter() {
  const lang = useLanguage();
  const t = content[lang];
  const cookieCopy = cookieConsentContent[lang];
  const consent = useConsent();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p className="footer-copy">{t.footerCopy}</p>
        </div>
        <div>
          <h2 className="footer-heading">{t.servicesLabel}</h2>
          <div className="footer-links">
            {serviceSlugs.map((slug, index) => (
              <Link to={servicePaths[slug]} search={{ lang }} key={slug}>
                {t.services[index]}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="footer-heading">{t.find}</h2>
          <div className="footer-links">
            <span>
              Rua Vítor Cordon 6A
              <br />
              2675-459 Odivelas, Portugal
            </span>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              {t.directions}
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Móveis Machado. {t.rights}
        </span>
        <div className="footer-legal-links">
          <Link to="/cookies" search={{ lang }}>
            {cookieCopy.policyLink}
          </Link>
          <button type="button" onClick={() => consent.setPreferencesOpen(true)}>
            {cookieCopy.manage}
          </button>
        </div>
      </div>
    </footer>
  );
}
