import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Menu,
  X,
  Ruler,
  Hammer,
  MapPin,
  BadgeCheck,
  Box,
  Phone,
  Mail,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/cookie-consent";
import brandMark from "@/assets/brand-mark.svg?url&no-inline";
import marbleColumns from "@/assets/projects/marble-columns.webp";
import oakGalley from "@/assets/projects/oak-galley.webp";
import whiteL from "@/assets/projects/white-l.webp";
import {
  content,
  contactDetails,
  cookieConsentContent,
  designToWork,
  featuredProjectSlugs,
  heroImage,
  materials,
  projectBySlug,
  projects,
  mapsUrl,
  serviceGalleries,
  servicePages,
  servicePaths,
  serviceSlugs,
  type Language,
  type Project,
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
            activeOptions={{ exact: to === "/", includeSearch: false }}
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            {t.nav[i]}
          </Link>
        ))}
        <Link to="/contact" search={{ lang }} className="nav-quote" onClick={() => setOpen(false)}>
          {t.quote}
        </Link>
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
          <span className="text-muted-foreground text-xs" aria-hidden="true">
            /
          </span>
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
  const featured = projectBySlug("marble-island");
  return (
    <>
      <section className="hero">
        <img
          src={heroImage.src}
          alt={featured[lang].title}
          width={heroImage.width}
          height={heroImage.height}
          fetchPriority="high"
        />
        <div className="hero-content">
          <Eyebrow line>{t.heroLabel}</Eyebrow>
          <h1>
            {t.heroTitle}
            <br />
            <em>{t.heroItalic}</em>
          </h1>
          <p className="hero-description">{t.heroDescription}</p>
          <div className="hero-actions">
            <Button variant="hero" asChild>
              <Link to="/contact" search={{ lang }}>
                {t.heroPrimary}
              </Link>
            </Button>
            <Link to="/projects" search={{ lang }} className="hero-secondary">
              {t.explore}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <a className="hero-scroll" href="#craft">
            <ArrowDown size={16} aria-hidden="true" />
            {t.scroll}
          </a>
          <span className="hero-image-label">{t.heroImageLabel}</span>
        </div>
      </section>
      <TrustBand />
    </>
  );
}
function TrustBand() {
  const lang = useLanguage();
  const icons = [BadgeCheck, Box, Hammer, Ruler];
  return (
    <div className="trust-band">
      {content[lang].trust.map((text, i) => {
        const Icon = icons[i];
        return (
          <div className="trust-item" key={text}>
            {Icon && <Icon aria-hidden="true" />}
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
    <section className="section services-preview" id="craft">
      <figure className="services-visual">
        <img
          src={oakGalley}
          alt={projectBySlug("oak-galley")[lang].title}
          loading="lazy"
          width={1200}
          height={1488}
        />
      </figure>
      <div className="services-body">
        <Eyebrow>{t.servicesLabel}</Eyebrow>
        <h2 className="section-title">{t.servicesTitle}</h2>
        <div className="service-list">
          {serviceSlugs.map((slug, i) => (
            <Link to={servicePaths[slug]} search={{ lang }} className="service-item" key={slug}>
              <span className="service-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{t.services[i]}</h3>
                <p>{t.serviceShort[i]}</p>
              </div>
              <ArrowRight className="service-arrow" size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="services-extra">{t.servicesExtra}</p>
        <Link to="/services" search={{ lang }} className="text-link">
          {t.servicesLink}
        </Link>
      </div>
    </section>
  );
}

function ProjectLightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const lang = useLanguage();
  const t = content[lang];
  const [index, setIndex] = useState(0);
  const count = project.images.length;
  const image = project.images[index] ?? project.images[0];
  const go = (step: number) => setIndex((current) => (current + step + count) % count);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
    // go only depends on count, which is stable for one project.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);
  if (!image) return null;
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={project[lang].title}
      onClick={onClose}
    >
      <Button
        autoFocus
        variant="ghost"
        size="icon"
        className="lightbox-close"
        aria-label={t.close}
        onClick={onClose}
      >
        <X />
      </Button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-media">
          <img src={image.src} alt={`${project[lang].title} (${index + 1}/${count})`} />
          {image.kind === "render" && <span className="render-badge">{t.renderLabel}</span>}
          {count > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="lightbox-nav lightbox-prev"
                aria-label={t.previous}
                onClick={() => go(-1)}
              >
                <ArrowLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lightbox-nav lightbox-next"
                aria-label={t.next}
                onClick={() => go(1)}
              >
                <ArrowRight />
              </Button>
            </>
          )}
        </div>
        <div className="lightbox-meta">
          <div>
            <h2>{project[lang].title}</h2>
            <p>{project[lang].materials}</p>
          </div>
          {count > 1 && (
            <span>
              {index + 1} / {count}
            </span>
          )}
        </div>
        <p className="lightbox-summary">{project[lang].summary}</p>
      </div>
    </div>
  );
}

export function ProjectGrid({
  items = projects,
  priorityFirstImage = false,
  headingLevel = 3,
  detailed = false,
}: {
  items?: readonly Project[];
  priorityFirstImage?: boolean;
  headingLevel?: 2 | 3;
  detailed?: boolean;
}) {
  const lang = useLanguage();
  const t = content[lang];
  const [selected, setSelected] = useState<string | null>(null);
  const project = items.find((p) => p.slug === selected);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <>
      <div className={`project-grid ${detailed ? "is-detailed" : ""}`}>
        {items.map((p, i) => {
          const cover = p.images[0];
          if (!cover) return null;
          return (
            <article key={p.slug}>
              <Button
                variant="ghost"
                className="project-image-button"
                onClick={() => setSelected(p.slug)}
                aria-label={`${t.projectView}: ${p[lang].title}`}
              >
                <img
                  src={cover.src}
                  alt={p[lang].title}
                  loading={priorityFirstImage && i === 0 ? "eager" : "lazy"}
                  fetchPriority={priorityFirstImage && i === 0 ? "high" : "auto"}
                  width={cover.width}
                  height={cover.height}
                />
                {p.images.length > 1 && (
                  <span className="project-count">+{p.images.length - 1}</span>
                )}
              </Button>
              <div className="project-info">
                <p className="project-type">{p[lang].type}</p>
                <Heading>{p[lang].title}</Heading>
                <p>{p[lang].materials}</p>
                {detailed && <p className="project-summary">{p[lang].summary}</p>}
              </div>
            </article>
          );
        })}
      </div>
      {project && <ProjectLightbox project={project} onClose={() => setSelected(null)} />}
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
      <ProjectGrid items={featuredProjectSlugs.map(projectBySlug)} />
    </section>
  );
}
export function DesignToWork() {
  const lang = useLanguage();
  const t = content[lang];
  const project = projectBySlug("wine-wall");
  return (
    <section className="section design-section">
      <div className="design-copy">
        <Eyebrow line>{t.designLabel}</Eyebrow>
        <h2 className="section-title">{t.designTitle}</h2>
        <p className="body-copy">{t.designCopy}</p>
      </div>
      <div className="design-pair">
        <figure>
          <img
            src={designToWork.render.src}
            alt={`${project[lang].title}: ${t.designRenderCaption}`}
            loading="lazy"
            width={designToWork.render.width}
            height={designToWork.render.height}
          />
          <figcaption>
            <span className="render-badge is-static">{t.designRenderCaption}</span>
          </figcaption>
        </figure>
        <ArrowRight className="design-arrow" aria-hidden="true" />
        <figure>
          <img
            src={designToWork.photo.src}
            alt={`${project[lang].title}: ${t.designPhotoCaption}`}
            loading="lazy"
            width={designToWork.photo.width}
            height={designToWork.photo.height}
          />
          <figcaption>
            <span className="photo-badge">{t.designPhotoCaption}</span>
          </figcaption>
        </figure>
      </div>
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
      </div>
      <figure className="story-visual">
        <img
          className="story-image"
          src={marbleColumns}
          alt={projectBySlug("marble-island")[lang].title}
          loading="lazy"
          width={1600}
          height={1032}
        />
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
export function Values() {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <section className="section values-section">
      <div className="section-heading">
        <div>
          <Eyebrow>{t.valuesLabel}</Eyebrow>
          <h2 className="section-title">{t.valuesTitle}</h2>
        </div>
      </div>
      <div className="values-grid">
        {t.values.map((value) => (
          <article key={value.title}>
            <Check aria-hidden="true" />
            <h3>{value.title}</h3>
            <p>{value.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Materials({ compact = false }: { compact?: boolean }) {
  const lang = useLanguage();
  const t = content[lang];
  const Heading = compact ? "h3" : "h2";
  return (
    <section className={`section materials-section ${compact ? "is-compact" : ""}`}>
      <div className="materials-heading">
        {!compact && <Eyebrow>{t.materialsLabel}</Eyebrow>}
        <Heading className="section-title">
          {compact ? t.serviceMaterialsTitle : t.materialsTitle}
        </Heading>
        <p className="body-copy">{t.materialsIntro}</p>
      </div>
      <ul className="materials-grid">
        {materials.map((material) => (
          <li key={material.pt.name}>
            <img src={material.image} alt="" loading="lazy" width={640} height={640} />
            <strong>{material[lang].name}</strong>
            <span>{material[lang].copy}</span>
          </li>
        ))}
      </ul>
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
            src={designToWork.process.src}
            alt={t.processCaption}
            loading="lazy"
            width={designToWork.process.width}
            height={designToWork.process.height}
          />
          <span className="render-badge">{t.renderLabel}</span>
        </figure>
      </div>
      <ol className="process-grid">
        {t.steps.map((s, i) => (
          <li className="process-item" key={s}>
            <span className="process-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{s}</h3>
              <p>{t.stepCopy[i]}</p>
            </div>
          </li>
        ))}
      </ol>
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
        src={whiteL}
        alt=""
        loading="lazy"
        width={1600}
        height={1164}
      />
      <div className="contact-content">
        <Eyebrow line>{t.ctaLabel}</Eyebrow>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaCopy}</p>
        <div className="hero-actions">
          <Button variant="hero" asChild>
            <Link to="/contact" search={{ lang }}>
              {t.talk}
            </Link>
          </Button>
          <a href={contactDetails.phoneHref} className="hero-secondary">
            <Phone size={16} aria-hidden="true" />
            {contactDetails.phoneDisplay}
          </a>
        </div>
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
  const t = content[lang];
  const page = servicePages[lang][service];
  const gallery = serviceGalleries[service].map(projectBySlug);

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
            <h2>{page.includedTitle}</h2>
            <ul className="included-list">
              {page.included.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h2>{page.areaTitle}</h2>
            <p>{page.areaCopy}</p>
          </article>
        </div>
      </section>
      {gallery.length > 0 && (
        <section className="section service-gallery">
          <h2 className="section-title">{t.serviceGalleryTitle}</h2>
          <ProjectGrid items={gallery} />
        </section>
      )}
      <section className="section service-materials">
        <div className="service-materials-copy">
          <h2 className="section-title">{page.materialsTitle}</h2>
          <p className="body-copy">{page.materialsCopy}</p>
        </div>
        <ul className="materials-grid is-small">
          {materials.map((material) => (
            <li key={material.pt.name}>
              <img src={material.image} alt="" loading="lazy" width={640} height={640} />
              <strong>{material[lang].name}</strong>
            </li>
          ))}
        </ul>
      </section>
      <section className="section service-page-process">
        <div className="section-heading">
          <div>
            <Eyebrow>{t.processLabel}</Eyebrow>
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
          <h2 className="footer-heading">{t.contactsHeading}</h2>
          <div className="footer-links">
            <a href={contactDetails.phoneHref}>
              <Phone size={14} aria-hidden="true" />
              {contactDetails.phoneDisplay}
            </a>
            <a href={`mailto:${contactDetails.email}`}>
              <Mail size={14} aria-hidden="true" />
              {contactDetails.email}
            </a>
            <a href={contactDetails.instagramUrl} target="_blank" rel="noreferrer">
              <Instagram size={14} aria-hidden="true" />
              {contactDetails.instagramHandle}
            </a>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">{t.find}</h2>
          <div className="footer-links">
            <span>
              <MapPin size={14} aria-hidden="true" />
              <span>
                Rua Vítor Cordon 6A
                <br />
                2675-459 Odivelas, Portugal
              </span>
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
