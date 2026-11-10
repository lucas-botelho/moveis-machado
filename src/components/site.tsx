import { useEffect, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Ruler,
  Hammer,
  MapPin,
  BadgeCheck,
  Box,
  Phone,
  Mail,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/lazy-image";
import { useConsent } from "@/components/cookie-consent";
import brandMark from "@/assets/brand-mark.svg?url&no-inline";
import kitchenIsland from "@/assets/kitchen-island.webp";
import marbleColumns from "@/assets/projects/marble-columns.webp";
import whiteL from "@/assets/projects/white-l.webp";
import {
  content,
  contactDetails,
  cookieConsentContent,
  designToWork,
  heroImage,
  materials,
  projectBySlug,
  projects,
  directionsUrl,
  serviceSlugs,
  type Project,
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
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  }, [lang]);
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
  const featured = projectBySlug("contemporary");
  return (
    <>
      <section className="hero">
        <LazyImage
          src={heroImage.src}
          alt={featured[lang].title}
          width={heroImage.width}
          height={heroImage.height}
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-content">
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
        <LazyImage
          src={whiteL}
          alt={projectBySlug("white-l")[lang].title}
          loading="lazy"
          width={1600}
          height={1164}
        />
      </figure>
      <div className="services-body">
        <h2 className="section-title">{t.servicesTitle}</h2>
        <div className="service-list">
          {serviceSlugs.map((slug, i) => (
            <Link to="/services" search={{ lang }} className="service-item" key={slug}>
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
          <LazyImage
            key={image.src}
            src={image.src}
            alt={`${project[lang].title} (${index + 1}/${count})`}
            loading="eager"
            width={image.width}
            height={image.height}
          />
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

function ProjectCard({
  project,
  onOpen,
  heading: Heading = "h3",
  detailed = false,
  priority = false,
}: {
  project: Project;
  onOpen: () => void;
  heading?: "h2" | "h3";
  detailed?: boolean;
  priority?: boolean;
}) {
  const lang = useLanguage();
  const t = content[lang];
  const cover = project.images[0];
  if (!cover) return null;
  return (
    <>
      <Button
        variant="ghost"
        className="project-image-button"
        onClick={onOpen}
        aria-label={`${t.projectView}: ${project[lang].title}`}
      >
        <LazyImage
          src={cover.src}
          alt={project[lang].title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          width={cover.width}
          height={cover.height}
        />
        {project.images.length > 1 && (
          <span className="project-count">+{project.images.length - 1}</span>
        )}
      </Button>
      <div className="project-info">
        <p className="project-type">{project[lang].type}</p>
        <Heading>{project[lang].title}</Heading>
        <p>{project[lang].materials}</p>
        {detailed && <p className="project-summary">{project[lang].summary}</p>}
      </div>
    </>
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
  const [selected, setSelected] = useState<string | null>(null);
  const project = items.find((p) => p.slug === selected);
  return (
    <>
      <div className={`project-grid ${detailed ? "is-detailed" : ""}`}>
        {items.map((p, i) => (
          <article key={p.slug}>
            <ProjectCard
              project={p}
              onOpen={() => setSelected(p.slug)}
              heading={headingLevel === 2 ? "h2" : "h3"}
              detailed={detailed}
              priority={priorityFirstImage && i === 0}
            />
          </article>
        ))}
      </div>
      {project && <ProjectLightbox project={project} onClose={() => setSelected(null)} />}
    </>
  );
}

export function ProjectCarousel({
  items = projects,
  label,
}: {
  items?: readonly Project[];
  label: string;
}) {
  const lang = useLanguage();
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const project = items.find((p) => p.slug === selected);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);

  return (
    <div
      className="project-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="project-carousel-viewport" ref={viewportRef}>
        <div className="project-carousel-track">
          {items.map((p, i) => (
            <article
              className="project-carousel-slide"
              key={p.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
            >
              <ProjectCard project={p} onOpen={() => setSelected(p.slug)} />
            </article>
          ))}
        </div>
      </div>
      <div className="project-carousel-controls">
        <Button
          variant="ghost"
          size="icon"
          className="project-carousel-button"
          aria-label={lang === "pt" ? "Projetos anteriores" : "Previous projects"}
          disabled={!canPrev}
          onClick={() => api?.scrollPrev()}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="project-carousel-button"
          aria-label={lang === "pt" ? "Projetos seguintes" : "Next projects"}
          disabled={!canNext}
          onClick={() => api?.scrollNext()}
        >
          <ArrowRight />
        </Button>
      </div>
      {project && <ProjectLightbox project={project} onClose={() => setSelected(null)} />}
    </div>
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
      <ProjectCarousel label={t.projectsTitle} />
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
        <h2 className="section-title">{t.designTitle}</h2>
        <p className="body-copy">{t.designCopy}</p>
      </div>
      <div className="design-pair">
        <figure>
          <LazyImage
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
          <LazyImage
            src={designToWork.photo.src}
            alt={`${project[lang].title}: ${t.designPhotoCaption}`}
            loading="lazy"
            width={designToWork.photo.width}
            height={designToWork.photo.height}
          />
          <figcaption>
            <span className="render-badge is-static">{t.designPhotoCaption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
export function Story({ full = false, light = false }: { full?: boolean; light?: boolean }) {
  const lang = useLanguage();
  const t = content[lang];
  return (
    <section className={`section story-section${light ? " is-light" : ""}`}>
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
        <LazyImage
          className="story-image"
          src={kitchenIsland}
          alt={projectBySlug("island")[lang].title}
          loading="lazy"
          width={1600}
          height={1200}
        />
      </figure>
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
          <h2 className="section-title">{t.valuesTitle}</h2>
        </div>
      </div>
      <div className="values-grid">
        {t.values.map((value) => (
          <article key={value.title}>
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
        <Heading className="section-title">
          {compact ? t.serviceMaterialsTitle : t.materialsTitle}
        </Heading>
        <p className="body-copy">{t.materialsIntro}</p>
      </div>
      <ul className="materials-grid">
        {materials.map((material) => (
          <li key={material.pt.name}>
            <LazyImage src={material.image} alt="" loading="lazy" width={640} height={640} />
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
        <h2 className="section-title">{t.processTitle}</h2>
        <div className="process-visual">
          <figure className="process-drawing">
            <LazyImage
              src={designToWork.processDrawing.src}
              alt={t.processDrawingCaption}
              loading="lazy"
              width={designToWork.processDrawing.width}
              height={designToWork.processDrawing.height}
            />
            <span className="render-badge">{t.drawingLabel}</span>
          </figure>
          <figure>
            <LazyImage
              src={designToWork.processRender.src}
              alt={t.processCaption}
              loading="lazy"
              width={designToWork.processRender.width}
              height={designToWork.processRender.height}
            />
            <span className="render-badge">{t.renderLabel}</span>
          </figure>
        </div>
      </div>
      <ol className="process-grid">
        {t.steps.map((s, i) => (
          <li className="process-item" key={s}>
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
      <LazyImage
        className="contact-backdrop"
        src={marbleColumns}
        alt=""
        loading="lazy"
        width={1600}
        height={1032}
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
              <Link to="/services" search={{ lang }} key={slug}>
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
            <a href={directionsUrl} target="_blank" rel="noreferrer">
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
          <a href="https://livroreclamacoes.pt/Inicio/" target="_blank" rel="noreferrer">
            Livro de Reclamações Eletrónico
          </a>
        </div>
      </div>
    </footer>
  );
}
