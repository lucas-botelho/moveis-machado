import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site";
import { pageMeta, servicePages } from "@/lib/site-content";

export const Route = createFileRoute("/services/wardrobes")({
  head: ({ match }) => {
    const language = match.search.lang;
    const page = servicePages[language].wardrobes;
    return pageMeta("/services/wardrobes", language, page.metaTitle, page.metaDescription);
  },
  component: () => <ServicePage service="wardrobes" />,
});
