import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./index";
import { pageMeta } from "@/lib/site-content";

export const Route = createFileRoute("/pt")({
  head: ({ match }) =>
    match.search.lang === "en"
      ? pageMeta(
          "Bespoke kitchens & furniture",
          "Over 40 years creating bespoke kitchens, wardrobes and furniture in Odivelas, Greater Lisbon. Made for your home, designed for your life.",
        )
      : pageMeta(
          "Cozinhas e mobiliário por medida",
          "Mais de 40 anos de experiência em cozinhas, roupeiros e mobiliário por medida. Fabrico próprio em Odivelas, Grande Lisboa.",
        ),
  component: HomePage,
});
