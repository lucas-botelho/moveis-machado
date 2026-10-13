import { describe, expect, it } from "vitest";

import { servicePages, servicePaths, serviceSlugs } from "@/lib/site-content";

describe("Service page content", () => {
  it("provides a distinct route and complete PT/EN content for every service", () => {
    expect(new Set(Object.values(servicePaths))).toHaveLength(serviceSlugs.length);

    for (const slug of serviceSlugs) {
      for (const language of ["pt", "en"] as const) {
        const page = servicePages[language][slug];

        expect(page.metaTitle).toBeTruthy();
        expect(page.metaDescription.length).toBeGreaterThan(80);
        expect(page.title).toBeTruthy();
        expect(page.description).toBeTruthy();
        expect(page.scopeCopy.length).toBeGreaterThan(120);
        expect(page.process).toHaveLength(4);
        expect(page.ctaLabel).toBeTruthy();
      }
    }
  });

  it("keeps titles and descriptions unique within each language", () => {
    for (const language of ["pt", "en"] as const) {
      const pages = serviceSlugs.map((slug) => servicePages[language][slug]);

      expect(new Set(pages.map((page) => page.metaTitle))).toHaveLength(serviceSlugs.length);
      expect(new Set(pages.map((page) => page.metaDescription))).toHaveLength(serviceSlugs.length);
      expect(new Set(pages.map((page) => page.title))).toHaveLength(serviceSlugs.length);
    }
  });
});
