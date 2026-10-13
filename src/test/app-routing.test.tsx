import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

const serviceRoutes = ["/services/kitchens", "/services/wardrobes", "/services/furniture"] as const;

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("keeps the legacy Portuguese route matchable so its redirect can run", () => {
    const router = createRouter({
      routeTree,
      basepath: "/moveis-machado",
      context: { queryClient: new QueryClient() },
    });

    const matches = router.matchRoutes("/pt/");

    expect(matches.at(-1)?.routeId).toBe("/pt");
    expect(router.buildLocation({ to: "/pt", search: { lang: "pt" } }).href).toBe(
      "/moveis-machado/pt?lang=pt",
    );
  });

  it.each(serviceRoutes)("matches the service page at %s and preserves English", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).toBe(path);
    expect(router.buildLocation({ to: path, search: { lang: "en" } }).href).toBe(`${path}?lang=en`);
  });
});
