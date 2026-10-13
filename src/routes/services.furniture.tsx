import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site";
import { pageMeta, servicePages } from "@/lib/site-content";

export const Route = createFileRoute("/services/furniture")({
  head: ({ match }) => {
    const language = match.search.lang;
    const page = servicePages[language].furniture;
    return pageMeta("/services/furniture", language, page.metaTitle, page.metaDescription);
  },
  component: () => <ServicePage service="furniture" />,
});
