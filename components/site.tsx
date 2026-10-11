import { business } from "@/src/content/business";
import {
  photo,
  projects,
  services,
  type Locale,
  type PortfolioProject,
} from "@/src/content";
import { getMessages } from "@/src/i18n";
import { pagePath, whatsappUrl, type PageKey } from "@/src/i18n/routes.mjs";
import { Gallery, Portfolio, ProjectCard } from "./portfolio";
import ContactForm from "./contact-form";
export function Button({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <a className={`button ${outline ? "outline" : ""}`} href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function Cta({ locale }: { locale: Locale }) {
  const m = getMessages(locale).common;
  return (
    <section className="cta">
      <div>
        <p className="eyebrow">MÓVEIS MACHADO</p>
        <h2>{m.quoteTitle}</h2>
        <p>{m.quoteText}</p>
      </div>
      <Button href={pagePath(locale, "contact")}>{m.quote}</Button>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href={pagePath(locale, "home")}>MÓVEIS MACHADO</a>
          <h2>{m.common.footerLine}</h2>
          <p>{m.common.footerDescription}</p>
        </div>
        <div>
          <h3>{m.nav.services}</h3>
          {services.map((s) => (
            <a href={pagePath(locale, s.id)} key={s.id}>
              {s.titles[locale]}
            </a>
          ))}
        </div>
        <div>
          <h3>{m.common.follow}</h3>
          <p>
            {business.address}
            <br />
            {business.postalCode} {business.city}
            <br />
            Portugal
          </p>
          <a href={business.maps} target="_blank" rel="noopener noreferrer">
            {m.common.directions} ↗
          </a>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer">
            Facebook ↗
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Móveis Machado. {m.common.copyright}
        </span>
        <div>
          <a href={pagePath(locale, "privacy")}>{m.common.privacy}</a>
          <a href={pagePath(locale, "legal")}>{m.common.legal}</a>
          <a href={pagePath(locale, "accessibility")}>
            {m.common.accessibility}
          </a>
        </div>
      </div>
    </footer>
  );
}
export function Process({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <section className="section process">
      <SectionHeading label={m.home.processLabel} title={m.home.processTitle} />
      <div className="process-grid">
        {m.process.map((step, i) => (
          <article key={step.title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Faq({
  locale,
  service = false,
}: {
  locale: Locale;
  service?: boolean;
}) {
  const m = getMessages(locale);
  const list = service
    ? m.faq.filter((_, i) => i === 1 || i === 3 || i === 4)
    : m.faq;
  return (
    <section className="section faq">
      <div>
        <p className="eyebrow">{m.home.faqLabel}</p>
        <h2>{m.home.faqTitle}</h2>
      </div>
      <div>
        {list.map((item) => (
          <details key={item.q}>
            <summary>
              {item.q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={photo(name)}
      srcSet={`${photo(name, 800)} 800w, ${photo(name)} 1600w`}
      sizes="(max-width: 700px) 100vw, 75vw"
      width="1600"
      height="1200"
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
export function ServiceSketch({ id, locale }: { id: string; locale: Locale }) {
  return (
    <div className={`service-sketch ${id}`}>
      <svg
        viewBox="0 0 600 450"
        role="img"
        aria-label={getMessages(locale).common.serviceDrawing}
      >
        <rect width="600" height="450" fill="#e8e2d6" />
        <g fill="none" stroke="#796d59" strokeWidth="1.5">
          {id === "wardrobes" ? (
            <>
              <rect x="130" y="85" width="340" height="285" />
              {[215, 300, 385].map((x) => (
                <path key={x} d={`M${x} 85v285`} />
              ))}
              <path d="M130 155h170M130 245h85M215 270h85M385 175h85M385 260h85M300 155h85" />
              <path d="M322 155v50q0 10 15 10h12" />
            </>
          ) : id === "doors" ? (
            <>
              <rect x="205" y="65" width="190" height="310" />
              <rect x="217" y="78" width="166" height="297" />
              <path d="M355 230h20M355 230v7M120 375h355M205 65v-18h190v18" />
            </>
          ) : (
            <>
              <rect x="110" y="135" width="380" height="175" />
              <path d="M110 220h380M230 135v175M370 135v175M135 310v60M465 310v60M110 370h380M145 175h35M260 175h35M400 175h35" />
            </>
          )}
          <path strokeDasharray="3 5" d="M95 400h410M95 395v10M505 395v10" />
          <path strokeWidth=".7" d="M70 100h15M77 92v16M505 80h15M512 73v15" />
        </g>
      </svg>
      <span>{getMessages(locale).common.serviceDrawing}</span>
    </div>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{m.home.eyebrow}</p>
          <h1>
            {m.home.title}
            <br />
            <em>{m.home.italic}</em>
          </h1>
          <div className="hero-bottom">
            <p>{m.home.description}</p>
            <Button href={pagePath(locale, "projects")}>{m.home.view}</Button>
          </div>
        </div>
        <div className="hero-photo">
          <Photo
            name="cozinha-ilha-ceramica-4"
            alt={projects[0]?.translations[locale].alt ?? m.home.imageCaption}
            priority
          />
          <div className="hero-caption">
            <span>{m.home.imageCaption}</span>
            <a href="#essence">
              {m.home.scroll}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className="photo-index" aria-hidden="true">
            M / M
          </span>
        </div>
      </section>
      <section id="essence" className="section intro">
        <p className="eyebrow">{m.home.introLabel}</p>
        <div>
          <h2>{m.home.introTitle}</h2>
          <p className="lead">{m.home.introText}</p>
        </div>
      </section>
      <div className="facts">
        <div>
          <strong>
            40<span>+</span>
          </strong>
          <span>{m.home.experience}</span>
        </div>
        <div>
          <strong>{m.home.manufacturing}</strong>
          <span>{m.home.manufacturingSub}</span>
        </div>
        <div>
          <strong>{m.home.area}</strong>
          <span>{m.home.areaSub}</span>
        </div>
      </div>
      <section id="services" className="section services">
        <SectionHeading
          label={m.home.servicesLabel}
          title={m.home.servicesTitle}
        />
        <div className="services-grid">
          {services.map((s, i) => (
            <a
              className="service-card"
              key={s.id}
              href={pagePath(locale, s.id)}
            >
              <span className="service-number">0{i + 1}</span>
              <h3>{s.titles[locale]}</h3>
              <p>{s.intro[locale]}</p>
              <span className="service-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="section featured">
        <SectionHeading
          label={m.home.projectsLabel}
          title={m.home.projectsTitle}
        >
          <a className="text-link" href={pagePath(locale, "projects")}>
            {m.home.allProjects} ↗
          </a>
        </SectionHeading>
        <div className="featured-grid">
          {projects
            .filter((p) => p.featured)
            .slice(0, 3)
            .map((p) => (
              <ProjectCard key={p.id} project={p} locale={locale} />
            ))}
        </div>
      </section>
      <section className="craft">
        <div className="craft-photo">
          <Photo
            name="cozinha-branco-nogueira-2"
            alt={projects[1]?.translations[locale].alt ?? m.common.kitchens}
          />
        </div>
        <div className="craft-copy">
          <p className="eyebrow">{m.home.craftLabel}</p>
          <h2>{m.home.craftTitle}</h2>
          <p>{m.home.craftText}</p>
          <a className="text-link" href={pagePath(locale, "about")}>
            {m.home.craftLink} ↗
          </a>
          <div className="material-swatches" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
      <Process locale={locale} />
      <section className="location">
        <div className="location-label">
          ODIVELAS
          <span>{locale === "pt" ? "GRANDE LISBOA" : "GREATER LISBON"}</span>
        </div>
        <div>
          <h2>{m.home.locationTitle}</h2>
          <p>{m.home.locationText}</p>
          <a
            className="text-link"
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            {m.common.directions} ↗
          </a>
        </div>
      </section>
      <Faq locale={locale} />
      <Cta locale={locale} />
    </>
  );
}
export function PageIntro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </section>
  );
}
export function ProjectList({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <>
      <PageIntro
        label={m.projectsPage.eyebrow}
        title={m.projectsPage.title}
        text={m.projectsPage.text}
      />
      <section className="section portfolio-section">
        <Portfolio projects={projects} locale={locale} />
        <p className="archive-note">{m.common.archive}</p>
      </section>
      <Cta locale={locale} />
    </>
  );
}
export function ProjectDetail({
  locale,
  project,
}: {
  locale: Locale;
  project: PortfolioProject;
}) {
  const m = getMessages(locale);
  const t = project.translations[locale];
  return (
    <>
      <PageIntro
        label={m.common.kitchens}
        title={t.title}
        text={t.description}
      />
      <section className="section project-detail">
        <Gallery locale={locale} project={project} />
        <p className="archive-note">{m.common.archive}</p>
        <a className="text-link" href={pagePath(locale, "projects")}>
          ← {m.common.backProjects}
        </a>
      </section>
      <section className="section related">
        <SectionHeading label={m.common.projects} title={m.common.related} />
        <div className="projects-grid">
          {projects
            .filter((p) => p.id !== project.id)
            .slice(0, 2)
            .map((p) => (
              <ProjectCard project={p} locale={locale} key={p.id} />
            ))}
        </div>
      </section>
      <Cta locale={locale} />
    </>
  );
}
export function ServicePage({ locale, id }: { locale: Locale; id: string }) {
  const s = services.find((x) => x.id === id)!;
  const m = getMessages(locale);
  return (
    <>
      <PageIntro
        label={s.titles[locale]}
        title={s.intro[locale]}
        text={s.description[locale]}
      />
      <section className="section service-feature">
        <div>
          {s.image ? (
            <Photo
              name={s.image}
              alt={projects[0]?.translations[locale].alt ?? m.home.imageCaption}
              priority
            />
          ) : (
            <ServiceSketch id={id} locale={locale} />
          )}
        </div>
        <div>
          <h2>{s.titles[locale]}</h2>
          <ul className="benefits">
            {s.details[locale].map((d, i) => (
              <li key={d}>
                <span>0{i + 1}</span>
                {d}
              </li>
            ))}
          </ul>
          <Button href={pagePath(locale, "contact")}>{m.nav.quote}</Button>
        </div>
      </section>
      <section className="section materials">
        <p className="eyebrow">{m.common.materials}</p>
        <h2>
          {locale === "pt"
            ? "A escolha certa para o seu projeto."
            : "The right choice for your project."}
        </h2>
        <p className="lead">{m.common.materialsText}</p>
      </section>
      <Process locale={locale} />
      {id === "kitchens" && (
        <section className="section related">
          <SectionHeading
            label={m.home.projectsLabel}
            title={m.home.projectsTitle}
          />
          <div className="projects-grid">
            {projects.slice(0, 2).map((p) => (
              <ProjectCard project={p} locale={locale} key={p.id} />
            ))}
          </div>
        </section>
      )}
      <Faq locale={locale} service />
      <section className="section">
        <h2>{m.common.otherServices}</h2>
        <div className="other-services">
          {services
            .filter((x) => x.id !== id)
            .map((x) => (
              <a key={x.id} href={pagePath(locale, x.id)}>
                {x.titles[locale]} ↗
              </a>
            ))}
        </div>
      </section>
      <Cta locale={locale} />
    </>
  );
}
export function About({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <>
      <PageIntro
        label={m.about.label}
        title={m.about.title}
        text={m.about.text}
      />
      <section className="about-image">
        <Photo
          name="cozinha-ilha-ceramica-1"
          alt={projects[0]?.translations[locale].alt ?? m.home.imageCaption}
          priority
        />
      </section>
      <section className="section about-story">
        <h2>{m.about.secondTitle}</h2>
        <p className="lead">{m.about.secondText}</p>
      </section>
      <section className="section values">
        {m.about.values.map((v, i) => (
          <article key={v.title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </article>
        ))}
      </section>
      <Process locale={locale} />
      <Cta locale={locale} />
    </>
  );
}
export function Contact({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const whatsapp = whatsappUrl(business.whatsapp, locale);
  return (
    <>
      <PageIntro
        label={m.contact.label}
        title={m.contact.title}
        text={m.contact.text}
      />
      <section className="section contact-layout">
        <aside>
          <h2>{m.contact.visit}</h2>
          <p>
            {business.address}
            <br />
            {business.postalCode} {business.city}
            <br />
            Portugal
          </p>
          <a
            className="text-link"
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            {m.common.directions} ↗
          </a>
          <div className="contact-channels">
            {business.email && (
              <a href={`mailto:${business.email}`}>{business.email} ↗</a>
            )}
            {business.phone && (
              <>
                <a href={`tel:${business.phone}`}>
                  {m.contact.call} · {business.phone}
                </a>
                <small>{m.contact.callCost}</small>
              </>
            )}
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                {m.contact.whatsapp} ↗
              </a>
            )}
          </div>
          <h3>{m.contact.area}</h3>
          <p>{m.contact.areaText}</p>
          <h3>{m.contact.prepare}</h3>
          <p>{m.contact.prepareText}</p>
        </aside>
        <ContactForm
          locale={locale}
          enabled={business.contactEnabled}
          siteKey={process.env.TURNSTILE_SITE_KEY || ""}
        />
      </section>
      <section className="address-strip">
        <span>ODIVELAS</span>
        <p>
          {business.address} · {business.postalCode} {business.city}
        </p>
        <a href={business.maps} target="_blank" rel="noopener noreferrer">
          {m.common.directions} ↗
        </a>
      </section>
    </>
  );
}
export function LegalPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "privacy" | "legal" | "accessibility";
}) {
  const m = getMessages(locale).legalPages;
  const title = m[`${kind}Title`];
  const intro = m[`${kind}Intro`];
  const sections = m[`${kind}Sections`];
  return (
    <>
      <PageIntro label="MÓVEIS MACHADO" title={title} text={intro} />
      <section className="section legal-content">
        {sections.map((s) => (
          <article key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </article>
        ))}
        {kind === "legal" && (
          <p>
            <a
              href="https://www.livroreclamacoes.pt/Inicio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === "pt"
                ? "Portal do Livro de Reclamações Eletrónico"
                : "Portuguese electronic complaints book portal"}{" "}
              ↗
            </a>
          </p>
        )}
        {kind === "privacy" && (
          <p>
            <a
              href="https://www.cnpd.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === "pt"
                ? "Comissão Nacional de Proteção de Dados"
                : "Portuguese Data Protection Authority"}{" "}
              ↗
            </a>
          </p>
        )}
      </section>
    </>
  );
}
export function Breadcrumb({
  locale,
  current,
  project,
}: {
  locale: Locale;
  current: string;
  project?: PortfolioProject;
}) {
  const m = getMessages(locale).common;
  return (
    <nav
      className="breadcrumb"
      aria-label={locale === "pt" ? "Percurso de navegação" : "Breadcrumb"}
    >
      <a href={pagePath(locale, "home")}>{m.home}</a>
      <span aria-hidden="true">/</span>
      {project && (
        <>
          <a href={pagePath(locale, "projects")}>{m.projects}</a>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}
export function pageTitle(locale: Locale, key: PageKey) {
  const m = getMessages(locale);
  return key === "home"
    ? locale === "pt"
      ? "Cozinhas e mobiliário por medida em Odivelas"
      : "Bespoke kitchens and furniture in Lisbon"
    : key === "projects"
      ? m.common.projects
      : key === "about"
        ? m.nav.about
        : key === "contact"
          ? m.nav.contact
          : key === "privacy"
            ? m.common.privacy
            : key === "legal"
              ? m.common.legal
              : key === "accessibility"
                ? m.common.accessibility
                : services.find((s) => s.id === key)!.titles[locale];
}
