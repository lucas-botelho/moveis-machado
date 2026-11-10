import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { seoFilesPlugin } from "./build/seo-files";

const pagesBasePath = process.env["PAGES_BASE_PATH"]?.replace(/\/+$/, "") ?? "";
const publicBase = pagesBasePath ? `${pagesBasePath}/` : "/";

const prerenderedPaths = [
  "/",
  "/pt",
  "/about",
  "/contact",
  "/cookies",
  "/projects",
  "/services",
];

export default defineConfig({
  base: publicBase,
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  server: { host: "::", port: 8080 },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Use src/server.ts (our SSR error wrapper) as the server entry.
      server: { entry: "server" },
      router: { basepath: pagesBasePath || "/" },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: true,
        failOnError: true,
      },
      pages: prerenderedPaths.map((path) => ({
        path: `${pagesBasePath}${path}`,
        prerender: {
          enabled: true,
          outputPath: path === "/" ? "/index.html" : `${path}/index.html`,
        },
      })),
    }),
    viteReact(),
    seoFilesPlugin(),
  ],
});
