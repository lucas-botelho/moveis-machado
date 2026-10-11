import data from "./projects.json";
export type Locale = "pt" | "en";
export type ProjectTranslation = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  alt: string;
};
export type PortfolioProject = {
  id: string;
  category: "kitchens";
  featured: boolean;
  published: boolean;
  order: number;
  coverImage: string;
  gallery: string[];
  translations: Record<Locale, ProjectTranslation>;
};
export const projects = (data as PortfolioProject[])
  .filter((p) => p.published)
  .sort((a, b) => a.order - b.order);
export const photo = (name: string, size = 1600) =>
  `/images/projects/${name}-${size}.webp`;
export const services = [
  {
    id: "kitchens",
    slugs: { pt: "cozinhas-por-medida", en: "bespoke-kitchens" },
    titles: { pt: "Cozinhas por medida", en: "Bespoke kitchens" },
    intro: {
      pt: "O centro da casa, à sua medida.",
      en: "The heart of your home, made for you.",
    },
    description: {
      pt: "Uma cozinha deve adaptar-se ao espaço e à forma como o utiliza. Desenvolvemos mobiliário por medida, combinando organização, escolha de acabamentos e fabrico próprio, do planeamento à instalação.",
      en: "Your kitchen should fit your space and the way you use it. We create made-to-measure cabinetry with thoughtful storage, a choice of finishes and our own manufacturing, from planning to installation.",
    },
    details: {
      pt: [
        "Organização que acompanha as suas rotinas",
        "Armários adaptados às dimensões do espaço",
        "Acabamentos escolhidos em função do projeto",
      ],
      en: [
        "Storage shaped around your daily routine",
        "Cabinetry fitted to the dimensions of your space",
        "Finishes chosen for your individual project",
      ],
    },
    image: "cozinha-ilha-ceramica-4",
  },
  {
    id: "wardrobes",
    slugs: { pt: "roupeiros-por-medida", en: "custom-wardrobes" },
    titles: { pt: "Roupeiros por medida", en: "Custom wardrobes" },
    intro: {
      pt: "Um lugar para tudo. Espaço para viver.",
      en: "A place for everything. Room to live.",
    },
    description: {
      pt: "A arrumação começa por compreender o que precisa de guardar. Desenhamos roupeiros personalizados que aproveitam o espaço disponível, com uma organização interior e acabamentos definidos consigo.",
      en: "Good storage starts with understanding what you need to put away. We design custom wardrobes that make use of the available space, with an interior layout and finishes selected with you.",
    },
    details: {
      pt: [
        "Medidas ajustadas ao espaço disponível",
        "Organização interior personalizada",
        "Continuidade com o restante mobiliário",
      ],
      en: [
        "Dimensions tailored to your space",
        "Personalised interior organisation",
        "Finishes that work with the rest of your furniture",
      ],
    },
    image: null,
  },
  {
    id: "furniture",
    slugs: { pt: "moveis-por-medida", en: "bespoke-furniture" },
    titles: { pt: "Móveis por medida", en: "Bespoke furniture" },
    intro: {
      pt: "O seu espaço não é igual a nenhum outro.",
      en: "Your space is unlike any other.",
    },
    description: {
      pt: "Criamos mobiliário personalizado para habitação. Partimos das dimensões, da utilização e do ambiente que procura para desenvolver uma solução fabricada para a sua casa.",
      en: "We create custom furniture for homes. Your dimensions, practical needs and the atmosphere you want guide a solution manufactured specifically for your home.",
    },
    details: {
      pt: [
        "Soluções para espaços com medidas particulares",
        "Desenho em função da utilização",
        "Escolha de materiais e acabamentos",
      ],
      en: [
        "Solutions for spaces with individual dimensions",
        "Design guided by how you will use it",
        "Choice of materials and finishes",
      ],
    },
    image: null,
  },
  {
    id: "doors",
    slugs: { pt: "portas-interiores", en: "interior-doors" },
    titles: { pt: "Portas interiores", en: "Interior doors" },
    intro: {
      pt: "Detalhes que dão continuidade à casa.",
      en: "Details that bring your home together.",
    },
    description: {
      pt: "As portas fazem parte do desenho de cada divisão. Desenvolvemos soluções de carpintaria interior, considerando as medidas, os acabamentos e a relação com os restantes elementos da casa.",
      en: "Doors are part of the design of every room. Our interior carpentry considers dimensions, finishes and how each element relates to the rest of your home.",
    },
    details: {
      pt: [
        "Integração no projeto de interiores",
        "Medidas e acabamentos definidos por projeto",
        "Acompanhamento até à instalação",
      ],
      en: [
        "Integration with your interior design",
        "Dimensions and finishes defined for each project",
        "Support through to installation",
      ],
    },
    image: null,
  },
] as const;
