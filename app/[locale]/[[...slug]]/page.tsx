import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/navigation";
import {
  Home,
  ProjectList,
  ProjectDetail,
  ServicePage,
  About,
  Contact,
  LegalPage,
  Footer,
  Breadcrumb,
  pageTitle,
} from "@/components/site";
import { business } from "@/src/content/business";
import { projects, services, type Locale } from "@/src/content";
import { getMessages } from "@/src/i18n";
import {
  publicPath,
  pagePath,
  projectPath,
  resolvePage,
  pageSlugs,
  type PageKey,
} from "@/src/i18n/routes.mjs";
type Props = { params: Promise<{ locale: string; slug?: string[] }> };
async function getPage(params: Props["params"]) {
  const p = await params;
  const page = resolvePage(p.locale, p.slug || [], projects);
  if (!page) notFound();
  return { locale: p.locale as Locale, page };
}
export function generateStaticParams() {
  return (["pt", "en"] as Locale[]).flatMap((locale) => [
    ...Object.values(pageSlugs).map((slugs) => ({
      locale,
      slug: slugs[locale] ? slugs[locale].split("/") : [],
    })),
    ...projects.map((p) => ({
      locale,
      slug: [pageSlugs.projects[locale], p.translations[locale].slug],
    })),
  ]);
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await params;
  const page = resolvePage(route.locale, route.slug || [], projects);
  const locale: Locale = route.locale === "en" ? "en" : "pt";
  if (!page)
    return {
      title: `${getMessages(locale).common.notFound} | Móveis Machado`,
      robots: { index: false, follow: false },
    };
  const other = locale === "pt" ? "en" : "pt";
  const title =
    page.key === "project"
      ? page.project.translations[locale].shortTitle
      : pageTitle(locale, page.key);
  const path =
    page.key === "project"
      ? projectPath(locale, page.project)
      : pagePath(locale, page.key);
  const equivalent =
    page.key === "project"
      ? projectPath(other, page.project)
      : pagePath(other, page.key);
  const m = getMessages(locale);
  const service = services.find((s) => s.id === page.key);
  const description =
    page.key === "project"
      ? page.project.translations[locale].description
      : service
        ? service.description[locale]
        : page.key === "about"
          ? m.about.text
          : page.key === "contact"
            ? m.contact.text
            : page.key === "projects"
              ? m.projectsPage.text
              : page.key === "privacy"
                ? m.legalPages.privacyIntro
                : page.key === "legal"
                  ? m.legalPages.legalIntro
                  : page.key === "accessibility"
                    ? m.legalPages.accessibilityIntro
                    : m.home.description;
  return {
    title: `${title} | Móveis Machado`,
    description,
    metadataBase: new URL(business.origin),
    alternates: {
      canonical: path,
      languages: {
        "pt-PT": locale === "pt" ? path : equivalent,
        en: locale === "en" ? path : equivalent,
        "x-default": locale === "pt" ? path : equivalent,
      },
    },
    robots: { index: business.indexable, follow: business.indexable },
    openGraph: {
      title: `${title} | Móveis Machado`,
      description,
      url: path,
      type: "website",
      siteName: business.name,
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      alternateLocale: locale === "pt" ? "en_GB" : "pt_PT",
      images: [
        {
          url: publicPath("/images/projects/cozinha-ilha-ceramica-4-1600.webp"),
          width: 1600,
          height: 1200,
          alt: m.home.imageCaption,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        publicPath("/images/projects/cozinha-ilha-ceramica-4-1600.webp"),
      ],
    },
  };
}
export default async function Page({ params }: Props) {
  const { locale, page } = await getPage(params);
  return <PageContent locale={locale} page={page} />;
}
export function PageContent({
  locale,
  page,
}: {
  locale: Locale;
  page: NonNullable<ReturnType<typeof resolvePage>>;
}) {
  const other = locale === "pt" ? "en" : "pt";
  const project = page.key === "project" ? page.project : undefined;
  const current = project
    ? project.translations[locale].shortTitle
    : pageTitle(locale, page.key as PageKey);
  const path = project
    ? projectPath(locale, project)
    : pagePath(locale, page.key as PageKey);
  const equivalent = project
    ? projectPath(other, project)
    : pagePath(other, page.key as PageKey);
  const m = getMessages(locale);
  const base = business.origin;
  const siteRoot = base + publicPath("/");
  const businessId = siteRoot + "#business";
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": businessId,
      name: business.name,
      url: base + pagePath(locale, "home"),
      description: m.common.footerDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address,
        postalCode: business.postalCode,
        addressLocality: business.city,
        addressCountry: "PT",
      },
      areaServed: ["Odivelas", "Lisboa"],
      sameAs: [business.maps, business.facebook],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": siteRoot + "#website",
      name: business.name,
      url: siteRoot,
      inLanguage: ["pt-PT", "en"],
      publisher: { "@id": businessId },
    },
  ];
  if (page.key !== "home")
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: m.common.home,
          item: base + pagePath(locale, "home"),
        },
        ...(project
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: m.common.projects,
                item: base + pagePath(locale, "projects"),
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: project ? 3 : 2,
          name: current,
          item: base + path,
        },
      ],
    });
  const service = services.find((s) => s.id === page.key);
  if (service)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.titles[locale],
      description: service.description[locale],
      url: base + path,
      provider: { "@id": businessId },
      areaServed: ["Lisboa", "Odivelas"],
    });
  return (
    <>
      <a className="skip-link" href="#main">
        {m.nav.skip}
      </a>
      <Navigation locale={locale} equivalent={equivalent} />
      <main id="main">
        {page.key !== "home" && (
          <Breadcrumb locale={locale} current={current} project={project} />
        )}{" "}
        {page.key === "home" ? (
          <Home locale={locale} />
        ) : page.key === "projects" ? (
          <ProjectList locale={locale} />
        ) : page.key === "project" ? (
          <ProjectDetail locale={locale} project={page.project} />
        ) : page.key === "about" ? (
          <About locale={locale} />
        ) : page.key === "contact" ? (
          <Contact locale={locale} />
        ) : ["privacy", "legal", "accessibility"].includes(page.key) ? (
          <LegalPage
            locale={locale}
            kind={page.key as "privacy" | "legal" | "accessibility"}
          />
        ) : (
          <ServicePage locale={locale} id={page.key} />
        )}
      </main>
      <Footer locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
