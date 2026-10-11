import { chromium } from "playwright";
import { expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { pagePath, projectPath, pageSlugs } from "../src/i18n/routes.mjs";
const base = process.env.TEST_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
let page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const report = {
  routes: [],
  responsive: [],
  accessibility: [],
  journeys: [],
  errors,
};
const out = process.env.QA_OUTPUT || "work/qa";
mkdirSync(out, { recursive: true });
const projects = JSON.parse(readFileSync("src/content/projects.json", "utf8"));
try {
  for (const locale of ["pt", "en"]) {
    for (const key of Object.keys(pageSlugs)) {
      const path = pagePath(locale, key);
      const res = await page.goto(base + path);
      await page.locator("h1").waitFor();
      assert.equal(res.status(), 200, path);
      assert.equal(
        await page.locator("html").getAttribute("lang"),
        locale === "pt" ? "pt-PT" : "en",
        path,
      );
      assert.equal(await page.locator("h1").count(), 1, path);
      assert((await page.title()).includes("Móveis Machado"));
      assert(
        await page
          .locator('head meta[name="description"]')
          .getAttribute("content"),
      );
      assert(
        (
          await page.locator('head link[rel="canonical"]').getAttribute("href")
        ).endsWith(path),
      );
      assert.equal(await page.locator('link[hreflang="en"]').count(), 1);
      assert.equal(await page.locator('link[hreflang="pt-PT"]').count(), 1);
      const alternate = await page
        .locator(
          `.header-actions .language a[hreflang="${locale === "pt" ? "en" : "pt-PT"}"]`,
        )
        .getAttribute("href");
      assert.equal(alternate, pagePath(locale === "pt" ? "en" : "pt", key));
      const text = await page.locator("body").innerText();
      assert(!text.includes(["916", "499", "166"].join(" ")));
      assert(!text.includes(["jpfcmachado", "gmail.com"].join("@")));
      const structured = await page
        .locator('script[type="application/ld+json"]')
        .textContent();
      assert(JSON.parse(structured).length >= 2);
      for (const a of await page
        .locator('a[href^="/"]')
        .evaluateAll((els) => els.map((el) => el.getAttribute("href"))))
        assert(a && !a.includes("undefined"));
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      report.accessibility.push({
        path,
        violations: scan.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.length,
        })),
      });
      assert.equal(
        scan.violations.length,
        0,
        `${path} accessibility: ${scan.violations.map((v) => v.id).join(",")}`,
      );
      report.routes.push(path);
    }
    for (const project of projects) {
      const path = projectPath(locale, project);
      assert.equal((await page.goto(base + path)).status(), 200);
      await page.locator(".gallery-grid").waitFor();
      const equivalent = await page
        .locator(
          `.header-actions .language a[hreflang="${locale === "pt" ? "en" : "pt-PT"}"]`,
        )
        .getAttribute("href");
      assert.equal(
        equivalent,
        projectPath(locale === "pt" ? "en" : "pt", project),
      );
      report.routes.push(path);
    }
  }
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/pt",
      "/en",
      "/pt/contactos",
      "/en/projects",
      "/pt/projetos/cozinha-com-ilha",
      "/pt/roupeiros-por-medida",
    ]) {
      await page.goto(base + path);
      await page.locator("h1").waitFor();
      const dims = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      assert(
        dims.scroll <= dims.client,
        `${width} ${path}: overflow ${JSON.stringify(dims)}`,
      );
      report.responsive.push({ width, path });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/pt");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Projetos", exact: true })
    .click();
  await page.waitForURL("**/pt/projetos");
  await page.waitForLoadState("networkidle");
  report.journeys.push("mobile menu, Escape and navigation");
  await page.getByRole("button", { name: "Com ilha", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.locator(".project-card").click();
  await page.waitForURL("**/pt/projetos/cozinha-com-ilha");
  await page.waitForLoadState("networkidle");
  await page
    .getByRole("button", { name: "Ampliar fotografia 1", exact: true })
    .click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-controls")).toContainText("2 de 4");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toBeHidden();
  assert.equal(
    await page.evaluate(() =>
      document.activeElement?.getAttribute("aria-label"),
    ),
    "Ampliar fotografia 1",
  );
  report.journeys.push(
    "portfolio filter, gallery arrows, Escape and focus restoration",
  );
  await page.locator('.header-actions .language a[hreflang="en"]').click();
  await page.waitForURL("**/en/projects/kitchen-with-island");
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  report.journeys.push("equivalent project language switch");
  await page.goto(base + "/pt/contactos");
  await expect(page.locator('input[name="name"]')).toBeDisabled();
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
  assert.equal(
    await page
      .locator('a[href^="tel:"],a[href^="mailto:"],a[href^="https://wa.me/"]')
      .count(),
    0,
  );
  report.journeys.push("missing channels and disabled form");
  const response = await context.request.post(base + "/api/contact", {
    headers: { Origin: base },
    data: {},
  });
  assert.equal(response.status(), 503);
  await page.close();
  page = await context.newPage();
  for (const path of ["/pt/does-not-exist", "/en/does-not-exist", "/fr"]) {
    assert.equal(
      (
        await page.goto(base + path, { waitUntil: "domcontentloaded" })
      ).status(),
      404,
    );
    await expect(page.locator("h1")).toBeVisible();
  }
  const root = await context.request.get(base + "/", { maxRedirects: 0 });
  assert([301, 302, 307, 308].includes(root.status()));
  assert.equal(root.headers().location, "/pt");
  const sitemap = await context.request.get(base + "/sitemap.xml");
  assert.equal(sitemap.status(), 200);
  assert.equal((await sitemap.text()).match(/<loc>/g).length, 30);
  const robots = await context.request.get(base + "/robots.txt");
  assert((await robots.text()).includes("Disallow: /"));
  report.journeys.push(
    "contact 503, localized 404, root redirect, sitemap and private robots",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/pt");
  await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';await img.decode();}});
  await page.screenshot({ path: out + "/home-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/pt");
  await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';await img.decode();}});
  await page.screenshot({ path: out + "/home-mobile.png", fullPage: true });
  await page.goto(base + "/en/contact");
  await page.screenshot({ path: out + "/contact-mobile.png", fullPage: true });
  assert.equal(errors.length, 0, errors.join("\n"));
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = error.message;
  await page
    .screenshot({ path: out + "/failure.png", timeout: 5000 })
    .catch(() => {});
  throw error;
} finally {
  writeFileSync(out + "/report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(
  `Browser QA passed: ${report.routes.length} routes, ${report.responsive.length} responsive checks, ${report.accessibility.length} accessibility scans, ${report.journeys.length} journeys.`,
);
