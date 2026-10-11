import { renderToString } from "react-dom/server";
import Page, {
  generateMetadata,
  generateStaticParams,
} from "@/app/[locale]/[[...slug]]/page";
import { GET as sitemap } from "@/app/sitemap.xml/route";
import { GET as robots } from "@/app/robots.txt/route";
import { pagePath } from "@/src/i18n/routes.mjs";

export async function renderPages() {
  const routes = [];
  for (const state of generateStaticParams()) {
    const params = Promise.resolve(state);
    routes.push({
      state,
      metadata: await generateMetadata({ params }),
      html: renderToString(await Page({ params })),
    });
  }
  return {
    routes,
    sitemap: await sitemap().text(),
    robots: await robots().text(),
    home: pagePath("pt", "home"),
  };
}
