import { loadEnv, type Plugin } from "vite";

import {
  DEFAULT_SITE_URL,
  createNotFoundHtml,
  createRobotsTxt,
  createSitemapXml,
  resolveSiteUrl,
} from "../src/lib/seo-shared";

export function seoFilesPlugin(): Plugin {
  let basePath = "";
  let siteUrl = DEFAULT_SITE_URL;

  return {
    name: "moveis-machado-seo-files",
    configResolved(config) {
      const env = loadEnv(config.mode, config.envDir, "");
      basePath = config.base.replace(/^\/+|\/+$/g, "");
      siteUrl = resolveSiteUrl(env["VITE_SITE_URL"]);
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
        const prefix = basePath ? `/${basePath}` : "";

        if (pathname === `${prefix}/sitemap.xml`) {
          response.statusCode = 200;
          response.setHeader("content-type", "application/xml; charset=utf-8");
          response.end(createSitemapXml(siteUrl));
          return;
        }

        if (pathname === `${prefix}/robots.txt`) {
          response.statusCode = 200;
          response.setHeader("content-type", "text/plain; charset=utf-8");
          response.end(createRobotsTxt(siteUrl));
          return;
        }

        next();
      });
    },
    generateBundle(_options, bundle) {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: createSitemapXml(siteUrl) });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: createRobotsTxt(siteUrl) });
      const stylesheet = Object.values(bundle).find(
        (asset) =>
          asset.type === "asset" &&
          asset.fileName.endsWith(".css") &&
          typeof asset.source === "string" &&
          asset.source.includes(".not-found-page"),
      );
      const stylesheetPath = stylesheet
        ? `/${basePath ? `${basePath}/` : ""}${stylesheet.fileName}`
        : "";
      this.emitFile({
        type: "asset",
        fileName: "404.html",
        source: createNotFoundHtml(basePath, stylesheetPath),
      });
    },
  };
}
