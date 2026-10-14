import { createFileRoute } from "@tanstack/react-router";

import { PageHeading, useLanguage } from "@/components/site";
import { cookiePolicyContent, pageMeta } from "@/lib/site-content";

export const Route = createFileRoute("/cookies")({
  head: ({ match }) => {
    const lang = match.search.lang;
    const page = cookiePolicyContent[lang];
    return pageMeta("/cookies", lang, page.metaTitle, page.metaDescription);
  },
  component: CookiePolicy,
});

function CookiePolicy() {
  const lang = useLanguage();
  const page = cookiePolicyContent[lang];

  return (
    <main>
      <PageHeading label={page.label} title={page.title} description={page.intro} />
      <article className="section legal-page">
        <div className="legal-meta">
          <p>{page.updated}</p>
          <p>{page.reference}</p>
        </div>

        {page.sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="legal-section legal-inventory" aria-labelledby="cookie-inventory-title">
          <h2 id="cookie-inventory-title">{page.inventoryTitle}</h2>
          <div className="cookie-inventory-header" aria-hidden="true">
            <span>{page.inventoryLabels.name}</span>
            <span>{page.inventoryLabels.provider}</span>
            <span>{page.inventoryLabels.purpose}</span>
            <span>{page.inventoryLabels.duration}</span>
            <span>{page.inventoryLabels.category}</span>
          </div>
          <div className="cookie-inventory-list">
            {page.inventory.map((item) => (
              <dl className="cookie-inventory-row" key={item.name}>
                <div>
                  <dt>{page.inventoryLabels.name}</dt>
                  <dd>{item.name}</dd>
                </div>
                <div>
                  <dt>{page.inventoryLabels.provider}</dt>
                  <dd>{item.provider}</dd>
                </div>
                <div>
                  <dt>{page.inventoryLabels.purpose}</dt>
                  <dd>{item.purpose}</dd>
                </div>
                <div>
                  <dt>{page.inventoryLabels.duration}</dt>
                  <dd>{item.duration}</dd>
                </div>
                <div>
                  <dt>{page.inventoryLabels.category}</dt>
                  <dd>{item.category}</dd>
                </div>
              </dl>
            ))}
          </div>
        </section>

        <aside className="legal-note">
          <p>
            {lang === "pt"
              ? "Fontes oficiais consultadas: CNPD, Lei n.º 41/2004 e Regulamento Geral sobre a Proteção de Dados."
              : "Official sources consulted: CNPD, Portuguese Law no. 41/2004 and the General Data Protection Regulation."}
          </p>
          <div className="legal-source-links">
            <a
              href="https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf"
              target="_blank"
              rel="noreferrer"
            >
              CNPD
            </a>
            <a
              href="https://diariodarepublica.pt/dr/detalhe/lei/41-2004-480710"
              target="_blank"
              rel="noreferrer"
            >
              Lei n.º 41/2004
            </a>
            <a
              href="https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pt"
              target="_blank"
              rel="noreferrer"
            >
              RGPD
            </a>
          </div>
        </aside>
      </article>
    </main>
  );
}
