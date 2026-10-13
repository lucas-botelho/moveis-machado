import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site";
import { pageMeta, servicePages } from "@/lib/site-content";

export const Route = createFileRoute("/services/kitchens")({
  head: ({ match }) => {
    const language = match.search.lang;
    const page = servicePages[language].kitchens;
    return pageMeta("/services/kitchens", language, page.metaTitle, page.metaDescription);
  },
  component: () => <ServicePage service="kitchens" />,
});
