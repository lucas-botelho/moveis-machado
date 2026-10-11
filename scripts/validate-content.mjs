import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import { pageSlugs, projectPath, resolvePage } from "../src/i18n/routes.mjs";
const projects = JSON.parse(readFileSync("src/content/projects.json", "utf8"));
const ids = new Set();
const slugs = { pt: new Set(), en: new Set() };
for (const p of projects) {
  assert(!ids.has(p.id), "duplicate id");
  ids.add(p.id);
  assert.equal(p.category, "kitchens");
  assert(p.gallery.includes(p.coverImage));
  for (const locale of ["pt", "en"]) {
    const t = p.translations[locale];
    assert(t && t.slug && t.title && t.description && t.alt);
    assert(!slugs[locale].has(t.slug));
    slugs[locale].add(t.slug);
    assert.equal(
      resolvePage(locale, projectPath(locale, p).split("/").slice(2), projects)
        ?.project.id,
      p.id,
    );
  }
  for (const image of p.gallery)
    for (const size of [800, 1600])
      assert(
        existsSync(`public/images/projects/${image}-${size}.webp`),
        "missing image",
      );
}
const pt = JSON.parse(readFileSync("messages/pt-PT.json", "utf8"));
const en = JSON.parse(readFileSync("messages/en.json", "utf8"));
function shape(a, b, path = "") {
  assert.deepEqual(Object.keys(a), Object.keys(b), `translation keys ${path}`);
  for (const key of Object.keys(a))
    if (a[key] && typeof a[key] === "object")
      shape(a[key], b[key], path + "." + key);
    else assert(typeof b[key] === "string", path + "." + key);
}
shape(pt, en);
for (const locale of ["pt", "en"])
  assert.equal(
    new Set(Object.values(pageSlugs).map((x) => x[locale])).size,
    Object.keys(pageSlugs).length,
  );
console.log(
  `Content valid: ${projects.length} projects, ${Object.keys(pageSlugs).length * 2 + projects.length * 2} localized pages, complete translations and assets.`,
);
