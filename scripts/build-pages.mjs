import { build } from "vite";
import { resolve, join } from "node:path";
import { mkdir, writeFile, readFile } from "node:fs/promises";

// A separate static target shares the exact page components with the Worker.
// Only explicitly public configuration enters browser bundles; no server secrets.
const base = process.env.PAGES_BASE_PATH || "/moveis-machado";
if (!/^\/[a-zA-Z0-9_-]+$/.test(base) && base !== "")
  throw new Error("Invalid PAGES_BASE_PATH");
const origin = new URL(
  process.env.PAGES_ORIGIN || "https://lucas-botelho.github.io",
).origin;
const publicEnv = {
  SITE_URL: origin,
  NEXT_PUBLIC_BASE_PATH: base,
  ALLOW_INDEXING: process.env.ALLOW_INDEXING || "false",
  CONTACT_ENABLED: "false",
  BUSINESS_PHONE: process.env.BUSINESS_PHONE || "",
  BUSINESS_EMAIL: process.env.BUSINESS_EMAIL || "",
  BUSINESS_WHATSAPP: process.env.BUSINESS_WHATSAPP || "",
};
const shared = {
  configFile: false,
  resolve: { alias: { "@": resolve(".") } },
  define: { "process.env": JSON.stringify(publicEnv) },
  esbuild: { jsx: "automatic" },
  base: base + "/",
};
await build({
  ...shared,
  publicDir: "public",
  build: {
    outDir: "pages-build",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: { input: "static/client.tsx" },
  },
});
await build({
  ...shared,
  publicDir: false,
  build: {
    ssr: "static/render.tsx",
    outDir: ".pages-render",
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "render.mjs" } },
  },
});
const { renderPages } = await import(
  new URL("../.pages-render/render.mjs", import.meta.url)
);
const result = await renderPages();
const manifest = JSON.parse(
  await readFile("pages-build/.vite/manifest.json", "utf8"),
);
const entry = manifest["static/client.tsx"];
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const absolute = (path) => new URL(String(path), origin).href;
const css = (entry.css || [])
  .map((file) => `<link rel="stylesheet" href="${base}/${file}">`)
  .join("");
for (const { state, metadata: m, html } of result.routes) {
  const path = `/${state.locale}${state.slug.length ? "/" + state.slug.join("/") : ""}`;
  const head =
    `<title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"><meta name="robots" content="${m.robots.index ? "index,follow" : "noindex,nofollow"}"><link rel="canonical" href="${absolute(m.alternates.canonical)}">` +
    Object.entries(m.alternates.languages)
      .map(
        ([lang, href]) =>
          `<link rel="alternate" hreflang="${lang}" href="${absolute(href)}">`,
      )
      .join("") +
    `<meta property="og:title" content="${esc(m.openGraph.title)}"><meta property="og:description" content="${esc(m.description)}"><meta property="og:url" content="${absolute(m.openGraph.url)}"><meta property="og:type" content="website"><meta property="og:site_name" content="Móveis Machado"><meta property="og:locale" content="${m.openGraph.locale}"><meta property="og:image" content="${absolute(m.openGraph.images[0].url)}"><meta name="twitter:card" content="summary_large_image">`;
  const document = `<!doctype html><html lang="${state.locale === "pt" ? "pt-PT" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${head}<link rel="icon" href="${base}/favicon.svg">${css}</head><body class="antialiased"><div id="site">${html}</div><script id="page-state" type="application/json">${JSON.stringify(state).replace(/</g, "\\u003c")}</script><script type="module" src="${base}/${entry.file}"></script></body></html>`;
  const dir = join("pages-build", path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), document);
}
await writeFile(
  "pages-build/index.html",
  `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${result.home}/"><title>Móveis Machado</title></head><body><a href="${result.home}/">Visitar Móveis Machado</a></body></html>`,
);
await writeFile(
  "pages-build/404.html",
  `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Página não encontrada | Móveis Machado</title>${css}</head><body><main class="section"><p class="eyebrow">Móveis Machado · 404</p><h1>Página não encontrada</h1><p>Page not found</p><a class="button" href="${result.home}/">Página inicial</a> <a href="${base}/en/">English</a></main></body></html>`,
);
await writeFile("pages-build/sitemap.xml", result.sitemap);
await writeFile("pages-build/robots.txt", result.robots);
await writeFile("pages-build/.nojekyll", "");
console.log(
  `GitHub Pages ready: ${result.routes.length} pages at ${origin}${base}/. Contact delivery disabled.`,
);
