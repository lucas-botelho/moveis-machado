import { hydrateRoot } from "react-dom/client";
import { PageContent } from "@/app/[locale]/[[...slug]]/page";
import { projects, type Locale } from "@/src/content";
import { resolvePage } from "@/src/i18n/routes.mjs";
import "@/app/globals.css";

const state = JSON.parse(document.getElementById("page-state")!.textContent!);
const page = resolvePage(state.locale, state.slug, projects);
if (page)
  hydrateRoot(
    document.getElementById("site")!,
    <PageContent locale={state.locale as Locale} page={page} />,
  );
