import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  pageSlugs,
  pagePath,
  projectPath,
  resolvePage,
  whatsappUrl,
} from "../src/i18n/routes.mjs";
const projects = JSON.parse(readFileSync("src/content/projects.json", "utf8"));
test("all page pairs resolve correctly", () => {
  for (const locale of ["pt", "en"])
    for (const key of Object.keys(pageSlugs))
      assert.equal(
        resolvePage(locale, pagePath(locale, key).split("/").slice(2), projects)
          .key,
        key,
      );
});
test("project language switch preserves identity", () => {
  for (const p of projects)
    for (const locale of ["pt", "en"])
      assert.equal(
        resolvePage(
          locale,
          projectPath(locale, p).split("/").slice(2),
          projects,
        ).project.id,
        p.id,
      );
});
test("unknown locale, slug and unpublished project reject", () => {
  assert.equal(resolvePage("fr", [], projects), null);
  assert.equal(resolvePage("pt", ["missing"], projects), null);
  assert.equal(resolvePage("pt", ["projetos", "not-real"], projects), null);
});
test("missing and invalid WhatsApp channel omitted", () => {
  for (const n of ["", "abc", "000"]) assert.equal(whatsappUrl(n, "pt"), null);
});
test("localized WhatsApp message encoded", () => {
  const url = whatsappUrl("+12345678901", "pt", "Projeto teste");
  assert(url.startsWith("https://wa.me/12345678901?text="));
  assert(decodeURIComponent(url).includes("Olá!"));
  assert(decodeURIComponent(url).includes("Projeto teste"));
  assert(
    decodeURIComponent(whatsappUrl("+12345678901", "en")).includes("Hello!"),
  );
});
