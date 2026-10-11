import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pageSlugs } from "../src/i18n/routes.mjs";

const prefix = process.env.PAGES_BASE_PATH || "/moveis-machado";
const root = resolve("pages-build");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".xml": "application/xml",
};
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (!path.startsWith(prefix + "/") && path !== prefix) {
      res.writeHead(404);
      res.end();
      return;
    }
    let file = resolve(root, "." + (path.slice(prefix.length) || "/"));
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Invalid path");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "text/plain" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(resolve(root, "404.html")));
  }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const local = `http://127.0.0.1:${server.address().port}`;
const base = process.env.PAGES_TEST_URL || local;
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
const projects = JSON.parse(
  await readFile("src/content/projects.json", "utf8"),
);
const routes = ["pt", "en"].flatMap((locale) => [
  ...Object.values(pageSlugs).map(
    (s) => `/${locale}${s[locale] ? "/" + s[locale] : ""}`,
  ),
  ...projects
    .filter((p) => p.published)
    .map(
      (p) =>
        `/${locale}/${pageSlugs.projects[locale]}/${p.translations[locale].slug}`,
    ),
]);
const report = {
  routes: [],
  responsive: [],
  accessibility: [],
  journeys: [],
  errors,
};
try {
  for (const route of routes) {
    const response = await page.goto(base + prefix + route + "/");
    await page.waitForLoadState("networkidle");
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      await page.locator("html").getAttribute("lang"),
      route.startsWith("/pt") ? "pt-PT" : "en",
    );
    assert.equal(
      await page.locator('head link[rel="canonical"]').getAttribute("href"),
      "https://lucas-botelho.github.io" + prefix + route,
    );
    assert.equal(await page.locator('head link[hreflang="en"]').count(), 1);
    assert.equal(await page.locator('head link[hreflang="pt-PT"]').count(), 1);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    assert(
      links.every((href) => href.startsWith(prefix + "/")),
      route + " broken base path",
    );
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = "eager";
        await img.decode();
      }
    });
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.equal(
      scan.violations.length,
      0,
      route + ": " + scan.violations.map((v) => v.id),
    );
    report.accessibility.push(route);
    report.routes.push(route);
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/pt", "/en/projects", "/pt/contactos"]) {
      await page.goto(base + prefix + route + "/");
      assert(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
        `${width} ${route} overflow`,
      );
      report.responsive.push({ width, route });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + prefix + "/pt/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toBeHidden();
  await page.goto(base + prefix + "/pt/projetos/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Com ilha", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.locator(".project-card").click();
  await page.waitForLoadState("networkidle");
  await page
    .getByRole("button", { name: "Ampliar fotografia 1", exact: true })
    .click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-controls")).toContainText("2 de 4");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Ampliar fotografia 1", exact: true }),
  ).toBeFocused();
  await page.locator('.header-actions .language a[hreflang="en"]').click();
  await page.waitForURL(/\/en\/projects\/kitchen-with-island\/?$/);
  await page.goto(base + prefix + "/en/contact/");
  await expect(page.locator('input[name="name"]')).toBeDisabled();
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
  report.journeys.push(
    "hydration, mobile menu, filter, gallery, focus, language switch, disabled contact",
  );
  // Error pages deliberately have no JS and return an actual HTTP 404.
  assert.equal(
    (await context.request.get(base + prefix + "/missing-page/")).status(),
    404,
  );
  assert.equal(
    (
      await context.request.post(base + prefix + "/api/contact", { data: {} })
    ).status(),
    404,
  );
  const sitemap = await context.request.get(base + prefix + "/sitemap.xml");
  assert.equal((await sitemap.text()).match(/<loc>/g).length, 30);
  await page.goto(base + prefix + "/");
  await page.waitForURL("**/pt/");
  report.journeys.push("root redirect, HTTP 404, no server endpoint, sitemap");
  assert.equal(errors.length, 0, errors.join("\n"));
  report.passed = true;
} catch (e) {
  report.passed = false;
  report.failure = e.message;
  throw e;
} finally {
  await mkdir("work/pages-qa", { recursive: true });
  await writeFile("work/pages-qa/report.json", JSON.stringify(report, null, 2));
  await browser.close();
  await new Promise((ok) => server.close(ok));
}
console.log(
  `Pages QA passed: ${report.routes.length} routes, ${report.accessibility.length} accessibility scans, ${report.responsive.length} responsive checks and interactive journeys.`,
);
