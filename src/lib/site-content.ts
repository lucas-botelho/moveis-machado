import walnut from "@/assets/kitchen-walnut.webp";
import island from "@/assets/kitchen-island.webp";
import contemporary from "@/assets/kitchen-contemporary.webp";
import marbleIsland from "@/assets/projects/marble-island.webp";
import marbleColumns from "@/assets/projects/marble-columns.webp";
import oakGalley from "@/assets/projects/oak-galley.webp";
import whiteL from "@/assets/projects/white-l.webp";
import wineWall from "@/assets/projects/wine-wall.webp";
import wineWall3d from "@/assets/projects/wine-wall-3d.webp";
import wineWall3dAlt from "@/assets/projects/wine-wall-3d-alt.webp";
import island3d from "@/assets/projects/island-3d.webp";
import marbleSwatch from "@/assets/materials/marble.webp";
import oakSwatch from "@/assets/materials/oak.webp";
import walnutSwatch from "@/assets/materials/walnut.webp";
import blackLacquerSwatch from "@/assets/materials/black-lacquer.webp";
import whiteGlossSwatch from "@/assets/materials/white-gloss.webp";
import { createPageHead } from "@/lib/seo";
import { notFoundContent } from "@/lib/not-found-content";
import type { PublicPath, SeoLanguage } from "@/lib/seo-shared";

export type Language = SeoLanguage;
export const serviceSlugs = ["kitchens", "wardrobes", "furniture"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];
export const servicePaths = {
  kitchens: "/services/kitchens",
  wardrobes: "/services/wardrobes",
  furniture: "/services/furniture",
} as const satisfies Record<ServiceSlug, PublicPath>;

/*
 * Facts used across the copy come from the brand's own published website
 * (moveismachado.com: home, about, services and gallery pages) or from the
 * company's photographs. Do not add prices, deadlines, guarantees, founding
 * dates or testimonials until the company confirms them.
 */

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  /** "render" marks a 3D design visual; it must never be shown as finished work. */
  kind: "photo" | "render";
};

type ProjectCopy = { title: string; type: string; materials: string; summary: string };

export type Project = {
  slug: string;
  category: "kitchen" | "furniture";
  images: readonly ProjectImage[];
  pt: ProjectCopy;
  en: ProjectCopy;
};

export const projects: readonly Project[] = [
  {
    slug: "marble-island",
    category: "kitchen",
    images: [
      { src: marbleIsland, width: 1600, height: 1032, kind: "photo" },
      { src: marbleColumns, width: 1600, height: 1032, kind: "photo" },
    ],
    pt: {
      title: "Ilha e revestimento efeito mármore",
      type: "Cozinha com ilha",
      materials: "Lacado branco alto brilho · bancada e revestimento efeito mármore",
      summary:
        "Armários altos até ao teto, frentes sem puxadores e uma ilha com placa integrada. As colunas reúnem forno duplo e frigorífico americano numa só parede.",
    },
    en: {
      title: "Island and marble-effect surfaces",
      type: "Island kitchen",
      materials: "White high-gloss lacquer · marble-effect worktop and splashback",
      summary:
        "Wall units up to the ceiling, handleless fronts and an island with an integrated hob. Tall units bring a double oven and an American fridge together on one wall.",
    },
  },
  {
    slug: "wine-wall",
    category: "furniture",
    images: [
      { src: wineWall, width: 1600, height: 1104, kind: "photo" },
      { src: wineWall3d, width: 1600, height: 1132, kind: "render" },
      { src: wineWall3dAlt, width: 1600, height: 1132, kind: "render" },
    ],
    pt: {
      title: "Garrafeira à medida",
      type: "Mobiliário por medida",
      materials: "Perfis pretos com vidro · madeira · garrafeiras em cruz",
      summary:
        "Uma parede inteira de arrumação para vinho, com portas em vidro, nichos em cruz e espaço para uma garrafeira climatizada. Foi desenhada em 3D antes de seguir para a oficina.",
    },
    en: {
      title: "Bespoke wine wall",
      type: "Bespoke furniture",
      materials: "Black frames with glass · wood · cross-shaped wine racks",
      summary:
        "A full wall of wine storage with glass doors, cross racks and room for a wine cooler. It was designed in 3D before going to the workshop.",
    },
  },
  {
    slug: "walnut",
    category: "kitchen",
    images: [{ src: walnut, width: 1600, height: 1200, kind: "photo" }],
    pt: {
      title: "Branco e nogueira",
      type: "Cozinha em L",
      materials: "Branco mate · nogueira · bancada escura",
      summary:
        "Uma cozinha em L que junta a luz das frentes brancas ao calor da nogueira, com armários superiores em duas profundidades.",
    },
    en: {
      title: "White and walnut",
      type: "L-shaped kitchen",
      materials: "Matt white · walnut · dark worktop",
      summary:
        "An L-shaped kitchen pairing bright white fronts with warm walnut, with wall units in two depths.",
    },
  },
  {
    slug: "contemporary",
    category: "kitchen",
    images: [{ src: contemporary, width: 1600, height: 1200, kind: "photo" }],
    pt: {
      title: "Lacado preto e branco",
      type: "Cozinha contemporânea",
      materials: "MDF lacado alto brilho · puxador integrado",
      summary:
        "Linhas contínuas, puxador integrado e o contraste do lacado preto e branco em alto brilho.",
    },
    en: {
      title: "Black and white lacquer",
      type: "Contemporary kitchen",
      materials: "High-gloss lacquered MDF · integrated handle",
      summary:
        "Continuous lines, an integrated handle and the contrast of black and white high-gloss lacquer.",
    },
  },
  {
    slug: "oak-galley",
    category: "kitchen",
    images: [{ src: oakGalley, width: 1200, height: 1488, kind: "photo" }],
    pt: {
      title: "Corredor em branco e madeira",
      type: "Cozinha linear",
      materials: "Lacado branco · madeira · bancada escura",
      summary:
        "Uma cozinha linear que aproveita todo o comprimento do espaço, com gavetões, eletrodomésticos encastrados e uma faixa de madeira a aquecer o conjunto.",
    },
    en: {
      title: "White and wood galley",
      type: "Galley kitchen",
      materials: "White lacquer · wood · dark worktop",
      summary:
        "A galley kitchen that uses the full length of the room, with deep drawers, built-in appliances and a band of wood warming the whole.",
    },
  },
  {
    slug: "island",
    category: "kitchen",
    images: [{ src: island, width: 1600, height: 1200, kind: "photo" }],
    pt: {
      title: "Ilha em tom pedra",
      type: "Cozinha com ilha",
      materials: "Branco mate · ilha em tom pedra · madeira",
      summary: "Uma ilha robusta em tom pedra que organiza a cozinha e abre o espaço para a sala.",
    },
    en: {
      title: "Stone-tone island",
      type: "Island kitchen",
      materials: "Matt white · stone-tone island · wood",
      summary:
        "A solid stone-tone island that organises the kitchen and opens it to the living area.",
    },
  },
  {
    slug: "white-l",
    category: "kitchen",
    images: [{ src: whiteL, width: 1600, height: 1164, kind: "photo" }],
    pt: {
      title: "Branco mate com coluna",
      type: "Cozinha em L",
      materials: "Branco mate · bancada escura · eletrodomésticos encastrados",
      summary:
        "Frentes em branco mate sem puxadores aparentes, coluna até ao teto e eletrodomésticos encastrados à altura certa.",
    },
    en: {
      title: "Matt white with tall unit",
      type: "L-shaped kitchen",
      materials: "Matt white · dark worktop · built-in appliances",
      summary:
        "Matt white handleless fronts, a floor-to-ceiling tall unit and built-in appliances at the right height.",
    },
  },
];

export function projectBySlug(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

export const featuredProjectSlugs = ["walnut", "contemporary", "island"] as const;

export const designToWork = {
  render: { src: wineWall3d, width: 1600, height: 1132 },
  photo: { src: wineWall, width: 1600, height: 1104 },
  process: { src: island3d, width: 1599, height: 899 },
};

export const heroImage = { src: marbleIsland, width: 1600, height: 1032 };

export const materials = [
  {
    image: walnutSwatch,
    pt: { name: "Madeira", copy: "Carvalho, nogueira e faia, em maciço ou folheado." },
    en: { name: "Wood", copy: "Oak, walnut and beech, solid or veneered." },
  },
  {
    image: whiteGlossSwatch,
    pt: { name: "MDF lacado", copy: "Mate ou alto brilho, na cor que escolher." },
    en: { name: "Lacquered MDF", copy: "Matt or high gloss, in the colour you choose." },
  },
  {
    image: oakSwatch,
    pt: { name: "Laminados técnicos", copy: "Termolaminados resistentes ao uso diário." },
    en: { name: "Technical laminates", copy: "Thermolaminates made for daily use." },
  },
  {
    image: marbleSwatch,
    pt: { name: "Pedra e cerâmica técnica", copy: "Bancadas e revestimentos de veio contínuo." },
    en: {
      name: "Stone and technical ceramic",
      copy: "Worktops and splashbacks with continuous veining.",
    },
  },
  {
    image: blackLacquerSwatch,
    pt: { name: "Ferragens e acabamentos", copy: "Fecho suave, puxador integrado ou sem puxador." },
    en: {
      name: "Hardware and details",
      copy: "Soft-close fittings, integrated or handleless fronts.",
    },
  },
] as const;

type ServicePageContent = {
  metaTitle: string;
  metaDescription: string;
  label: string;
  title: string;
  description: string;
  scopeTitle: string;
  scopeCopy: string;
  planningTitle: string;
  planningCopy: string;
  includedTitle: string;
  included: readonly string[];
  materialsTitle: string;
  materialsCopy: string;
  areaTitle: string;
  areaCopy: string;
  processTitle: string;
  process: readonly string[];
  ctaTitle: string;
  ctaCopy: string;
  ctaLabel: string;
};

export const serviceGalleries: Record<ServiceSlug, readonly string[]> = {
  kitchens: ["marble-island", "walnut", "contemporary", "oak-galley"],
  wardrobes: [],
  furniture: ["wine-wall"],
};

export const servicePages: Record<Language, Record<ServiceSlug, ServicePageContent>> = {
  pt: {
    kitchens: {
      metaTitle: "Cozinhas por medida em Odivelas",
      metaDescription:
        "Cozinhas por medida com fabrico próprio em Odivelas. Projeto 3D, materiais nobres, ferragens de fecho suave e instalação em Lisboa e na Grande Lisboa.",
      label: "COZINHAS POR MEDIDA",
      title: "A cozinha que o seu espaço pede.",
      description:
        "Desenhamos, fabricamos e instalamos cozinhas por medida a partir da nossa oficina em Odivelas. Veja o projeto em 3D antes de cortarmos a primeira peça.",
      scopeTitle: "Pensada para a forma como cozinha",
      scopeCopy:
        "Uma boa cozinha resolve-se nos centímetros: a altura das bancadas, a profundidade dos armários, o caminho entre o frigorífico, a placa e o lava-loiça. Partimos das medidas reais da sua casa e da forma como a usa todos os dias para desenhar cada módulo.",
      planningTitle: "O que definimos consigo",
      planningCopy:
        "Disposição, arrumação interior, eletrodomésticos encastrados, iluminação, materiais e acabamentos. Antes de avançar, mostramos-lhe o projeto em 3D para ajustar o que for preciso.",
      includedTitle: "Incluído em cada cozinha",
      included: [
        "Visita, medição e orçamento sem custos",
        "Projeto 3D antes do fabrico",
        "Estruturas reforçadas e ferragens de fecho suave",
        "Integração de eletrodomésticos encastrados",
        "Montagem pela nossa equipa e assistência pós-venda",
      ],
      materialsTitle: "Materiais e acabamentos",
      materialsCopy:
        "Madeira maciça de carvalho, nogueira ou faia, MDF lacado mate ou alto brilho, termolaminados, pedra natural e cerâmica técnica. Ajudamos a escolher a combinação que resiste ao uso diário e envelhece bem.",
      areaTitle: "Oficina em Odivelas",
      areaCopy:
        "Fabricamos tudo na nossa oficina, o que nos dá controlo sobre medidas, uniões e acabamentos. Instalamos em Lisboa, Odivelas e nos concelhos vizinhos.",
      processTitle: "Da primeira conversa à cozinha instalada",
      process: [
        "Visitamos o espaço, tiramos medidas e ouvimos como usa a cozinha.",
        "Preparamos o projeto 3D e o orçamento, e afinamos consigo cada detalhe.",
        "Fabricamos todos os módulos na nossa oficina em Odivelas.",
        "Montamos, ajustamos e entregamos a cozinha pronta a usar.",
      ],
      ctaTitle: "Vamos desenhar a sua cozinha?",
      ctaCopy:
        "Envie-nos medidas aproximadas, fotografias do espaço e referências do que gosta. Marcamos a visita e preparamos o projeto 3D sem custos.",
      ctaLabel: "Pedir orçamento de cozinha",
    },
    wardrobes: {
      metaTitle: "Roupeiros por medida em Odivelas",
      metaDescription:
        "Roupeiros e closets por medida com fabrico próprio em Odivelas. Interiores organizados, portas de batente ou correr e acabamentos à escolha.",
      label: "ROUPEIROS POR MEDIDA",
      title: "Arrumação desenhada para o que guarda.",
      description:
        "Roupeiros e closets feitos à medida da parede, do teto e do que precisa de guardar, fabricados na nossa oficina em Odivelas.",
      scopeTitle: "Cada centímetro aproveitado",
      scopeCopy:
        "Num roupeiro por medida não há espaços perdidos: vai do chão ao teto, contorna vigas e paredes irregulares e organiza o interior com cabides, gavetas, prateleiras e sapateiras na proporção certa para si.",
      planningTitle: "O que definimos consigo",
      planningCopy:
        "Medidas, tipo de portas, organização interior, iluminação e acabamentos. Mostramos-lhe o projeto em 3D antes do fabrico.",
      includedTitle: "Incluído em cada roupeiro",
      included: [
        "Visita, medição e orçamento sem custos",
        "Projeto 3D antes do fabrico",
        "Interior organizado à sua medida",
        "Ferragens de fecho suave",
        "Montagem pela nossa equipa e assistência pós-venda",
      ],
      materialsTitle: "Materiais e acabamentos",
      materialsCopy:
        "MDF lacado mate ou alto brilho, madeira maciça ou folheada, termolaminados e espelho. A combinação é escolhida consigo durante o projeto.",
      areaTitle: "Fabrico próprio em Odivelas",
      areaCopy:
        "Produzimos na nossa oficina e instalamos em Lisboa, Odivelas e nos concelhos vizinhos.",
      processTitle: "Do espaço ao roupeiro instalado",
      process: [
        "Visitamos o espaço e percebemos o que precisa de guardar.",
        "Desenhamos o roupeiro em 3D e preparamos o orçamento.",
        "Fabricamos o roupeiro na nossa oficina.",
        "Montamos e ajustamos tudo no local.",
      ],
      ctaTitle: "Quer um roupeiro feito para si?",
      ctaCopy:
        "Partilhe medidas aproximadas, fotografias e o que precisa de arrumar. Marcamos a visita e preparamos o projeto 3D sem custos.",
      ctaLabel: "Pedir orçamento de roupeiro",
    },
    furniture: {
      metaTitle: "Móveis por medida em Odivelas",
      metaDescription:
        "Móveis por medida para sala, escritório e garrafeira, portas interiores e remodelações, com fabrico próprio em Odivelas e instalação na Grande Lisboa.",
      label: "MÓVEIS POR MEDIDA",
      title: "Peças que só fazem sentido na sua casa.",
      description:
        "Móveis de sala, estantes, escritórios, garrafeiras e portas interiores, desenhados para o espaço onde vão ficar e fabricados na nossa oficina.",
      scopeTitle: "Mobiliário integrado na arquitetura",
      scopeCopy:
        "Um móvel por medida encaixa no nicho, acompanha a altura do teto e responde a uma função concreta: guardar vinho, esconder a televisão, organizar livros ou criar um escritório em casa. Desenhamos cada peça para o lugar e para o uso.",
      planningTitle: "O que definimos consigo",
      planningCopy:
        "Função, medidas, desenho, materiais e acabamentos. Antes de fabricarmos, veja a peça em 3D no seu espaço.",
      includedTitle: "Também fazemos",
      included: [
        "Móveis de sala, estantes e escritórios",
        "Garrafeiras e vitrinas",
        "Portas interiores",
        "Remodelações de cozinhas e interiores",
        "Assistência pós-venda",
      ],
      materialsTitle: "Materiais e acabamentos",
      materialsCopy:
        "Madeira maciça de carvalho, nogueira ou faia, MDF lacado, termolaminados, vidro, pedra natural e cerâmica técnica.",
      areaTitle: "Da oficina de Odivelas à sua casa",
      areaCopy: "Fabricamos em Odivelas e instalamos em Lisboa, Odivelas e nos concelhos vizinhos.",
      processTitle: "Do desenho à peça instalada",
      process: [
        "Conversamos sobre a peça, a função e o espaço onde vai ficar.",
        "Desenhamos em 3D e preparamos o orçamento.",
        "Fabricamos a peça na nossa oficina.",
        "Montamos e ajustamos tudo no local.",
      ],
      ctaTitle: "Tem uma peça em mente?",
      ctaCopy:
        "Envie-nos medidas aproximadas, fotografias do espaço e referências. Marcamos a visita e preparamos o projeto 3D sem custos.",
      ctaLabel: "Pedir orçamento de mobiliário",
    },
  },
  en: {
    kitchens: {
      metaTitle: "Bespoke kitchens in Odivelas",
      metaDescription:
        "Bespoke kitchens made in our Odivelas workshop. 3D design, fine materials, soft-close fittings and installation across Lisbon and Greater Lisbon.",
      label: "BESPOKE KITCHENS",
      title: "The kitchen your space asks for.",
      description:
        "We design, make and install bespoke kitchens from our workshop in Odivelas. You see the design in 3D before we cut the first panel.",
      scopeTitle: "Planned around how you cook",
      scopeCopy:
        "A good kitchen is decided in centimetres: worktop height, cabinet depth, the path between fridge, hob and sink. We start from the real measurements of your home and the way you use it every day to design each unit.",
      planningTitle: "What we define with you",
      planningCopy:
        "Layout, internal storage, built-in appliances, lighting, materials and finishes. Before going ahead, we show you the design in 3D so you can adjust anything you need.",
      includedTitle: "Included with every kitchen",
      included: [
        "Free visit, measuring and quote",
        "3D design before production",
        "Reinforced carcasses and soft-close fittings",
        "Built-in appliance integration",
        "Installation by our own team and after-sales support",
      ],
      materialsTitle: "Materials and finishes",
      materialsCopy:
        "Solid oak, walnut or beech, matt or high-gloss lacquered MDF, thermolaminates, natural stone and technical ceramic. We help you choose a combination that stands up to daily use and ages well.",
      areaTitle: "Our workshop in Odivelas",
      areaCopy:
        "We make everything in our own workshop, which gives us control over measurements, joints and finishes. We install across Lisbon, Odivelas and neighbouring municipalities.",
      processTitle: "From the first conversation to an installed kitchen",
      process: [
        "We visit, measure and listen to how you use your kitchen.",
        "We prepare the 3D design and quote, and refine every detail with you.",
        "We make every unit in our Odivelas workshop.",
        "We install, adjust and hand over a kitchen ready to use.",
      ],
      ctaTitle: "Shall we design your kitchen?",
      ctaCopy:
        "Send us approximate measurements, photographs of the space and references you like. We book the visit and prepare the 3D design free of charge.",
      ctaLabel: "Request a kitchen quote",
    },
    wardrobes: {
      metaTitle: "Custom wardrobes in Odivelas",
      metaDescription:
        "Custom wardrobes and walk-in closets made in our Odivelas workshop. Organised interiors, hinged or sliding doors and finishes of your choice.",
      label: "CUSTOM WARDROBES",
      title: "Storage designed around what you keep.",
      description:
        "Wardrobes and walk-in closets built to fit the wall, the ceiling and everything you need to store, made in our Odivelas workshop.",
      scopeTitle: "Every centimetre put to use",
      scopeCopy:
        "A custom wardrobe wastes no space: it runs floor to ceiling, works around beams and uneven walls, and organises the interior with rails, drawers, shelves and shoe storage in the right proportions for you.",
      planningTitle: "What we define with you",
      planningCopy:
        "Measurements, door type, internal layout, lighting and finishes. We show you the design in 3D before production.",
      includedTitle: "Included with every wardrobe",
      included: [
        "Free visit, measuring and quote",
        "3D design before production",
        "An interior organised to your needs",
        "Soft-close fittings",
        "Installation by our own team and after-sales support",
      ],
      materialsTitle: "Materials and finishes",
      materialsCopy:
        "Matt or high-gloss lacquered MDF, solid or veneered wood, thermolaminates and mirror. The combination is chosen with you during the design.",
      areaTitle: "Made in our Odivelas workshop",
      areaCopy:
        "We make everything in our workshop and install across Lisbon, Odivelas and neighbouring municipalities.",
      processTitle: "From the space to an installed wardrobe",
      process: [
        "We visit the space and understand what you need to store.",
        "We design the wardrobe in 3D and prepare the quote.",
        "We make the wardrobe in our own workshop.",
        "We install and adjust everything on site.",
      ],
      ctaTitle: "Would you like a wardrobe made for you?",
      ctaCopy:
        "Share approximate measurements, photographs and what you need to store. We book the visit and prepare the 3D design free of charge.",
      ctaLabel: "Request a wardrobe quote",
    },
    furniture: {
      metaTitle: "Bespoke furniture in Odivelas",
      metaDescription:
        "Bespoke living room, office and wine storage furniture, interior doors and renovations, made in our Odivelas workshop and installed across Greater Lisbon.",
      label: "BESPOKE FURNITURE",
      title: "Pieces that only make sense in your home.",
      description:
        "Living room units, shelving, home offices, wine walls and interior doors, designed for the space they will live in and made in our workshop.",
      scopeTitle: "Furniture built into the architecture",
      scopeCopy:
        "Bespoke furniture fits the alcove, follows the ceiling height and serves a clear purpose: storing wine, hiding the television, organising books or creating a home office. We design each piece for its place and its use.",
      planningTitle: "What we define with you",
      planningCopy:
        "Purpose, measurements, design, materials and finishes. Before we make it, you see the piece in 3D in your space.",
      includedTitle: "We also make",
      included: [
        "Living room units, shelving and home offices",
        "Wine walls and display cabinets",
        "Interior doors",
        "Kitchen and interior renovations",
        "After-sales support",
      ],
      materialsTitle: "Materials and finishes",
      materialsCopy:
        "Solid oak, walnut or beech, lacquered MDF, thermolaminates, glass, natural stone and technical ceramic.",
      areaTitle: "From our Odivelas workshop to your home",
      areaCopy:
        "We make everything in Odivelas and install across Lisbon, Odivelas and neighbouring municipalities.",
      processTitle: "From the drawing to the installed piece",
      process: [
        "We discuss the piece, its purpose and where it will live.",
        "We design it in 3D and prepare the quote.",
        "We make the piece in our own workshop.",
        "We install and adjust everything on site.",
      ],
      ctaTitle: "Do you have a piece in mind?",
      ctaCopy:
        "Send us approximate measurements, photographs of the space and references. We book the visit and prepare the 3D design free of charge.",
      ctaLabel: "Request a furniture quote",
    },
  },
};

export function resolveLanguage(value: unknown): Language {
  return value === "en" ? "en" : "pt";
}

export const content = {
  pt: {
    notFound: notFoundContent.pt,
    nav: ["Início", "O que fazemos", "Projetos", "Sobre nós", "Contactos"],
    quote: "Pedir orçamento",
    tagline: "Feito para o seu espaço",
    heroLabel: "FABRICO PRÓPRIO EM ODIVELAS",
    heroTitle: "Cozinhas por medida.",
    heroItalic: "Feitas na nossa oficina.",
    heroDescription:
      "Há mais de 40 anos que desenhamos, fabricamos e instalamos cozinhas, roupeiros e móveis por medida em Lisboa e na Grande Lisboa.",
    heroPrimary: "Pedir orçamento gratuito",
    explore: "Ver projetos",
    scroll: "Descubra a Móveis Machado",
    heroImageLabel: "Projeto real Móveis Machado",
    trust: [
      "Mais de 40 anos de oficina",
      "Projeto 3D sem custos",
      "Fabrico próprio em Odivelas",
      "Instalação e pós-venda",
    ],
    servicesLabel: "O QUE FAZEMOS",
    servicesTitle: "Feito à medida, do chão ao teto.",
    servicesLink: "Ver todos os serviços",
    services: ["Cozinhas por medida", "Roupeiros por medida", "Móveis por medida"],
    serviceShort: [
      "Cozinhas desenhadas ao centímetro, com eletrodomésticos encastrados e ferragens de fecho suave.",
      "Roupeiros e closets do chão ao teto, com o interior organizado para o que guarda.",
      "Móveis de sala, escritórios, garrafeiras e portas interiores feitos para o seu espaço.",
    ],
    serviceLong: [
      "Desenhamos cada cozinha a partir das medidas reais da sua casa e da forma como cozinha. Estruturas reforçadas, ferragens de fecho suave, eletrodomésticos encastrados e acabamentos à escolha.",
      "Roupeiros e closets que vão do chão ao teto, contornam paredes irregulares e organizam o interior com cabides, gavetas e prateleiras na proporção certa.",
      "Móveis de sala, estantes, escritórios, garrafeiras e portas interiores, desenhados para o lugar onde vão ficar. Também fazemos remodelações.",
    ],
    servicesExtra: "Também fazemos portas interiores e remodelações.",
    projectsLabel: "PROJETOS REAIS",
    projectsTitle: "Trabalho que saiu da nossa oficina.",
    projectsLink: "Ver todos os projetos",
    projectView: "Ver projeto",
    renderLabel: "Projeto 3D",
    photoLabel: "Obra concluída",
    designLabel: "DO PROJETO 3D À OBRA",
    designTitle: "Veja o seu móvel antes de ele existir.",
    designCopy:
      "Antes de cortarmos a primeira peça, preparamos o projeto em 3D. Escolha materiais, ajuste medidas e aprove o desenho com tranquilidade. Depois, a oficina faz exatamente o que aprovou.",
    designRenderCaption: "Projeto 3D",
    designPhotoCaption: "Garrafeira instalada",
    storyLabel: "SOBRE A MÓVEIS MACHADO",
    storyTitle: "Uma oficina, mais de 40 anos de cozinhas.",
    storyCopy:
      "Há mais de quatro décadas que fazemos cozinhas, roupeiros e móveis por medida na nossa oficina em Odivelas. Ao longo desse tempo apurámos um método: rigor técnico, materiais escolhidos com critério e uma construção pensada para durar.",
    storyCopy2:
      "Como fabricamos tudo, controlamos cada medida, cada união, cada ferragem e cada acabamento. Quem desenha a sua cozinha fala com quem a fabrica e com quem a monta, e é isso que faz a diferença quando ela chega à sua casa.",
    storyLink: "Conheça a nossa história",
    years: "anos de oficina em Odivelas",
    own: "3D",
    ownSub: "projeto antes de fabricarmos",
    valuesLabel: "COMO CONSTRUÍMOS",
    valuesTitle: "Feito para o uso de todos os dias.",
    values: [
      {
        title: "Estrutura estável",
        copy: "Caixas reforçadas e uniões bem feitas para armários que não cedem com o peso nem com os anos.",
      },
      {
        title: "Precisão",
        copy: "Medidas tiradas no local e cortes feitos na nossa oficina, para que tudo encaixe à primeira.",
      },
      {
        title: "Acabamentos cuidados",
        copy: "Lacados, madeiras e pedras escolhidos consigo e aplicados com atenção ao detalhe.",
      },
      {
        title: "Acompanhamento",
        copy: "Do primeiro desenho à montagem e depois dela, com assistência pós-venda.",
      },
    ],
    materialsLabel: "MATERIAIS",
    materialsTitle: "Materiais que escolhemos consigo.",
    materialsIntro:
      "Amostras retiradas de cozinhas que fabricámos. Na oficina mostramos-lhe as opções ao vivo.",
    processLabel: "COMO TRABALHAMOS",
    processTitle: "Quatro passos, uma só equipa.",
    steps: ["Visita e medição", "Projeto 3D e orçamento", "Fabrico na oficina", "Instalação"],
    stepCopy: [
      "Vamos à sua casa, tiramos medidas e ouvimos o que precisa. Deslocação sem custos.",
      "Desenhamos em 3D, escolhemos materiais consigo e apresentamos um orçamento detalhado.",
      "Produzimos cada peça em Odivelas, com controlo total sobre medidas e acabamentos.",
      "A nossa equipa monta e ajusta tudo, e continua disponível depois da entrega.",
    ],
    processCaption: "Projeto 3D preparado antes do fabrico",
    ctaLabel: "ORÇAMENTO SEM COMPROMISSO",
    ctaTitle: "Fale-nos do seu projeto.",
    ctaCopy:
      "Diga-nos o que quer fazer e onde. Se tiver medidas ou fotografias do espaço, envie-as: marcamos a visita e preparamos o projeto 3D sem custos.",
    talk: "Pedir orçamento",
    footerCopy:
      "Cozinhas, roupeiros e móveis por medida, com fabrico próprio em Odivelas há mais de 40 anos.",
    find: "Encontre-nos",
    contactsHeading: "Contactos",
    directions: "Como chegar",
    rights: "Todos os direitos reservados.",
    contactTitle: "Vamos falar sobre o seu projeto.",
    contactIntro:
      "Ligue, envie mensagem ou visite a oficina em Odivelas. O orçamento, o projeto 3D e a deslocação não têm custos.",
    contactWaysTitle: "Fale connosco",
    phoneLabel: "Telefone",
    emailLabel: "Email",
    whatsapp: "Falar pelo WhatsApp",
    instagram: "Instagram",
    contactSub: "Odivelas e Grande Lisboa",
    contactCopy:
      "Trabalhamos sobretudo em Lisboa, Odivelas e nos concelhos vizinhos. Diga-nos onde é o projeto e confirmamos a deslocação.",
    nextTitle: "O que acontece a seguir",
    nextSteps: [
      "Envie-nos medidas aproximadas, fotografias e referências do que gosta.",
      "Marcamos uma visita para medir o espaço e conversar consigo.",
      "Receba o projeto 3D e o orçamento detalhado, sem compromisso.",
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Quanto custa o orçamento?",
        a: "Nada. A visita, a medição, o projeto 3D e o orçamento não têm custos nem compromisso.",
      },
      {
        q: "Como preparo o meu projeto?",
        a: "Reúna medidas aproximadas, fotografias do espaço e imagens de cozinhas ou móveis de que goste. Com isso conseguimos começar a conversa.",
      },
      {
        q: "Que materiais posso escolher?",
        a: "Madeira maciça de carvalho, nogueira ou faia, MDF lacado mate ou alto brilho, termolaminados, pedra natural e cerâmica técnica.",
      },
      {
        q: "Quanto tempo demora?",
        a: "Depende da dimensão do projeto, dos materiais e do estado do espaço. Indicamos o prazo junto com o orçamento.",
      },
    ],
    close: "Fechar fotografia",
    previous: "Fotografia anterior",
    next: "Fotografia seguinte",
    projectIntro:
      "Cozinhas e mobiliário fabricados na nossa oficina e instalados em casas da Grande Lisboa. Selecione um projeto para ver todas as imagens.",
    projectsCount: "projetos",
    serviceIntro:
      "Cozinhas, roupeiros e móveis por medida, desenhados em 3D, fabricados na nossa oficina e instalados pela nossa equipa.",
    serviceExplore: "Conhecer o serviço",
    serviceGalleryTitle: "Projetos deste serviço",
    serviceMaterialsTitle: "Algumas das nossas opções",
    aboutLabel: "SOBRE NÓS",
    aboutTitle: "Mais de 40 anos a fazer móveis por medida.",
    aboutIntro:
      "Uma oficina em Odivelas, uma equipa que desenha, fabrica e instala, e clientes em toda a Grande Lisboa.",
  },
  en: {
    notFound: notFoundContent.en,
    nav: ["Home", "What we do", "Projects", "Our story", "Contact"],
    quote: "Request a quote",
    tagline: "Made for your space",
    heroLabel: "MADE IN OUR ODIVELAS WORKSHOP",
    heroTitle: "Bespoke kitchens.",
    heroItalic: "Made in our own workshop.",
    heroDescription:
      "For over 40 years we have designed, made and installed kitchens, wardrobes and furniture to measure across Lisbon and Greater Lisbon.",
    heroPrimary: "Request a free quote",
    explore: "View projects",
    scroll: "Discover Móveis Machado",
    heroImageLabel: "A real Móveis Machado project",
    trust: [
      "Over 40 years in the workshop",
      "Free 3D design",
      "Made in Odivelas",
      "Installation and after-sales",
    ],
    servicesLabel: "WHAT WE DO",
    servicesTitle: "Made to measure, floor to ceiling.",
    servicesLink: "View all services",
    services: ["Bespoke kitchens", "Custom wardrobes", "Bespoke furniture"],
    serviceShort: [
      "Kitchens designed to the centimetre, with built-in appliances and soft-close fittings.",
      "Floor-to-ceiling wardrobes and closets, organised inside for what you keep.",
      "Living room units, offices, wine walls and interior doors made for your space.",
    ],
    serviceLong: [
      "We design each kitchen from the real measurements of your home and the way you cook. Reinforced carcasses, soft-close fittings, built-in appliances and finishes of your choice.",
      "Wardrobes and closets that run floor to ceiling, work around uneven walls and organise the interior with rails, drawers and shelves in the right proportions.",
      "Living room units, shelving, home offices, wine walls and interior doors, designed for the place they will live in. We also handle renovations.",
    ],
    servicesExtra: "We also make interior doors and handle renovations.",
    projectsLabel: "REAL PROJECTS",
    projectsTitle: "Work that left our workshop.",
    projectsLink: "View all projects",
    projectView: "View project",
    renderLabel: "3D design",
    photoLabel: "Completed work",
    designLabel: "FROM 3D DESIGN TO FINISHED WORK",
    designTitle: "See your furniture before it exists.",
    designCopy:
      "Before we cut the first panel, we prepare the design in 3D. You choose materials, adjust measurements and approve the drawing at your own pace. Then the workshop makes exactly what you saw.",
    designRenderCaption: "3D design",
    designPhotoCaption: "Installed wine wall",
    storyLabel: "ABOUT MÓVEIS MACHADO",
    storyTitle: "One workshop, over 40 years of kitchens.",
    storyCopy:
      "For more than four decades we have made kitchens, wardrobes and furniture to measure in our Odivelas workshop. Over that time we have refined a method: technical rigour, carefully chosen materials and construction built to last.",
    storyCopy2:
      "Because we make everything ourselves, we control every measurement, joint, fitting and finish. The people who design your kitchen talk to the people who make and install it, and that is what makes the difference when it arrives in your home.",
    storyLink: "Discover our story",
    years: "years in our Odivelas workshop",
    own: "3D",
    ownSub: "design before we make it",
    valuesLabel: "HOW WE BUILD",
    valuesTitle: "Made for everyday use.",
    values: [
      {
        title: "Stable structure",
        copy: "Reinforced carcasses and sound joints, so cabinets hold their shape under weight and over the years.",
      },
      {
        title: "Precision",
        copy: "Measurements taken on site and panels cut in our own workshop, so everything fits first time.",
      },
      {
        title: "Careful finishes",
        copy: "Lacquers, woods and stones chosen with you and applied with attention to detail.",
      },
      {
        title: "Ongoing support",
        copy: "From the first drawing to installation and beyond, with after-sales support.",
      },
    ],
    materialsLabel: "MATERIALS",
    materialsTitle: "Materials we choose with you.",
    materialsIntro:
      "Samples taken from kitchens we have made. At the workshop we show you the options in person.",
    processLabel: "HOW WE WORK",
    processTitle: "Four steps, one team.",
    steps: ["Visit and measuring", "3D design and quote", "Made in our workshop", "Installation"],
    stepCopy: [
      "We come to your home, take measurements and listen to what you need. No travel charge.",
      "We design in 3D, choose materials with you and present a detailed quote.",
      "We make every piece in Odivelas, with full control over measurements and finishes.",
      "Our team installs and adjusts everything, and stays available after handover.",
    ],
    processCaption: "3D design prepared before production",
    ctaLabel: "NO-OBLIGATION QUOTE",
    ctaTitle: "Tell us about your project.",
    ctaCopy:
      "Tell us what you want to make and where. If you have measurements or photographs of the space, send them: we book the visit and prepare the 3D design free of charge.",
    talk: "Request a quote",
    footerCopy:
      "Kitchens, wardrobes and furniture made to measure in our Odivelas workshop for over 40 years.",
    find: "Find us",
    contactsHeading: "Contact",
    directions: "Get directions",
    rights: "All rights reserved.",
    contactTitle: "Let's talk about your project.",
    contactIntro:
      "Call, send a message or visit the workshop in Odivelas. The quote, the 3D design and the visit are free of charge.",
    contactWaysTitle: "Get in touch",
    phoneLabel: "Phone",
    emailLabel: "Email",
    whatsapp: "Message us on WhatsApp",
    instagram: "Instagram",
    contactSub: "Odivelas and Greater Lisbon",
    contactCopy:
      "We work mainly in Lisbon, Odivelas and neighbouring municipalities. Tell us where your project is and we will confirm the visit.",
    nextTitle: "What happens next",
    nextSteps: [
      "Send us approximate measurements, photographs and references you like.",
      "We book a visit to measure the space and talk with you.",
      "You receive the 3D design and a detailed quote, with no obligation.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much does a quote cost?",
        a: "Nothing. The visit, measuring, 3D design and quote are free and carry no obligation.",
      },
      {
        q: "How do I prepare for my project?",
        a: "Gather approximate measurements, photographs of the space and pictures of kitchens or furniture you like. That is enough to start the conversation.",
      },
      {
        q: "Which materials can I choose?",
        a: "Solid oak, walnut or beech, matt or high-gloss lacquered MDF, thermolaminates, natural stone and technical ceramic.",
      },
      {
        q: "How long does it take?",
        a: "It depends on the size of the project, the materials and the condition of the space. We give you the timing together with the quote.",
      },
    ],
    close: "Close photograph",
    previous: "Previous photograph",
    next: "Next photograph",
    projectIntro:
      "Kitchens and furniture made in our workshop and installed in homes across Greater Lisbon. Select a project to see all its images.",
    projectsCount: "projects",
    serviceIntro:
      "Kitchens, wardrobes and furniture made to measure, designed in 3D, made in our workshop and installed by our own team.",
    serviceExplore: "Explore this service",
    serviceGalleryTitle: "Projects in this service",
    serviceMaterialsTitle: "Some of our options",
    aboutLabel: "ABOUT US",
    aboutTitle: "Over 40 years making furniture to measure.",
    aboutIntro:
      "A workshop in Odivelas, a team that designs, makes and installs, and clients across Greater Lisbon.",
  },
};

export const cookieConsentContent: Record<
  Language,
  {
    bannerTitle: string;
    bannerDescription: string;
    reject: string;
    accept: string;
    customize: string;
    save: string;
    close: string;
    preferencesTitle: string;
    preferencesDescription: string;
    necessaryTitle: string;
    necessaryDescription: string;
    alwaysActive: string;
    externalMediaTitle: string;
    externalMediaDescription: string;
    manage: string;
    policyLink: string;
    mapTitle: string;
    mapDescription: string;
    loadMap: string;
  }
> = {
  pt: {
    bannerTitle: "A sua privacidade, sem atalhos.",
    bannerDescription:
      "Guardamos apenas a sua escolha neste dispositivo. O mapa Google só é carregado com a sua autorização.",
    reject: "Rejeitar opcionais",
    accept: "Aceitar opcionais",
    customize: "Personalizar",
    save: "Guardar escolhas",
    close: "Fechar preferências",
    preferencesTitle: "Preferências de privacidade",
    preferencesDescription:
      "Escolha que recursos opcionais podem funcionar. Pode alterar esta decisão a qualquer momento no rodapé.",
    necessaryTitle: "Armazenamento necessário",
    necessaryDescription:
      "Guarda a versão, as categorias e a data da sua escolha para que o site a respeite nas visitas seguintes.",
    alwaysActive: "Sempre ativo",
    externalMediaTitle: "Conteúdo externo",
    externalMediaDescription:
      "Permite carregar o mapa Google incorporado. Sem esta opção, a morada e a ligação externa continuam disponíveis.",
    manage: "Gerir cookies",
    policyLink: "Política de Cookies",
    mapTitle: "Mapa não carregado",
    mapDescription:
      "O mapa Google é conteúdo externo e pode receber dados técnicos do seu dispositivo. Pode carregá-lo agora ou abrir apenas as direções numa nova página.",
    loadMap: "Carregar mapa",
  },
  en: {
    bannerTitle: "Your privacy, without shortcuts.",
    bannerDescription:
      "We only store your choice on this device. Google Maps only loads with your permission.",
    reject: "Reject optional",
    accept: "Accept optional",
    customize: "Customise",
    save: "Save choices",
    close: "Close preferences",
    preferencesTitle: "Privacy preferences",
    preferencesDescription:
      "Choose which optional resources may operate. You can change this decision at any time in the footer.",
    necessaryTitle: "Necessary storage",
    necessaryDescription:
      "Stores the version, categories and date of your choice so the site can respect it on later visits.",
    alwaysActive: "Always active",
    externalMediaTitle: "External content",
    externalMediaDescription:
      "Allows the embedded Google map to load. The address and external directions link remain available without it.",
    manage: "Manage cookies",
    policyLink: "Cookie Policy",
    mapTitle: "Map not loaded",
    mapDescription:
      "Google Maps is external content and may receive technical data from your device. You can load it now or open directions in a new page.",
    loadMap: "Load map",
  },
};

export const cookiePolicyContent: Record<
  Language,
  {
    metaTitle: string;
    metaDescription: string;
    label: string;
    title: string;
    intro: string;
    updated: string;
    reference: string;
    sections: readonly { title: string; paragraphs: readonly string[] }[];
    inventoryTitle: string;
    inventory: readonly {
      name: string;
      provider: string;
      purpose: string;
      duration: string;
      category: string;
    }[];
    inventoryLabels: {
      name: string;
      provider: string;
      purpose: string;
      duration: string;
      category: string;
    };
  }
> = {
  pt: {
    metaTitle: "Política de Cookies",
    metaDescription:
      "Saiba que armazenamento e recursos externos a Móveis Machado utiliza e como pode gerir as suas preferências.",
    label: "PRIVACIDADE E CONTROLO",
    title: "Política de Cookies.",
    intro:
      "Esta política descreve o armazenamento no dispositivo e os recursos externos presentes neste site. O conteúdo em português europeu é a versão de referência.",
    updated: "Última atualização: 9 de novembro de 2026",
    reference: "Versão de referência: 2026-11-09",
    sections: [
      {
        title: "O que acontece antes da sua escolha",
        paragraphs: [
          "O conteúdo principal, as fotografias, as fontes e a navegação são servidos sem carregar o mapa Google. Não encontrámos analytics, pixels de marketing ou publicidade no código carregado pelo site.",
          "O banner não bloqueia o acesso ao site. Aceitar e rejeitar estão disponíveis na primeira camada, e todas as categorias opcionais começam desligadas quando personaliza.",
        ],
      },
      {
        title: "Como guardamos e alteramos a escolha",
        paragraphs: [
          "A escolha é guardada no localStorage do seu browser com a versão desta política, as categorias e um timestamp. Este registo é necessário para respeitar a sua decisão e não contém nome, email ou identificador publicitário.",
          "Pode usar “Gerir cookies” no rodapé para aceitar, rejeitar ou alterar categorias. Uma mudança material de finalidade, fornecedor ou categoria exige nova versão e volta a apresentar a escolha.",
        ],
      },
      {
        title: "Google Maps e ligações externas",
        paragraphs: [
          "O iframe Google Maps só é criado depois de autorizar Conteúdo externo ou selecionar “Carregar mapa”. A partir daí, a Google pode receber endereço IP, informação do browser/dispositivo e definir armazenamento segundo as suas próprias regras. Os nomes e durações concretos podem variar por localização, sessão e políticas da Google.",
          "A morada e a ligação “Como chegar” funcionam sem ativar o iframe. Ao abrir Google Maps ou WhatsApp numa nova página, passa a interagir diretamente com esse serviço externo e aplicam-se as respetivas políticas.",
        ],
      },
      {
        title: "Limites do inventário",
        paragraphs: [
          "O inventário abaixo corresponde ao código e ao build auditados nesta versão. Serviços de alojamento podem manter logs técnicos fora do browser; esse tratamento pertence à Política de Privacidade, cuja confirmação empresarial continua pendente.",
          "A Política de Cookies deve ser revista sempre que forem adicionados analytics, marketing, novos embeds ou outro armazenamento no dispositivo.",
        ],
      },
    ],
    inventoryTitle: "Inventário observado",
    inventoryLabels: {
      name: "Nome/recurso",
      provider: "Fornecedor",
      purpose: "Finalidade",
      duration: "Duração",
      category: "Categoria",
    },
    inventory: [
      {
        name: "moveis-machado:consent (localStorage)",
        provider: "Móveis Machado / este site",
        purpose: "Guardar versão, categorias e timestamp da escolha.",
        duration: "Até 6 meses, nova versão da política ou remoção pelo utilizador.",
        category: "Necessário",
      },
      {
        name: "Iframe Google Maps e armazenamento definido pela Google",
        provider: "Google",
        purpose: "Apresentar o mapa interativo da morada.",
        duration:
          "Apenas após opt-in; cookies/armazenamento e duração variam segundo a Google e a sessão.",
        category: "Conteúdo externo",
      },
    ],
  },
  en: {
    metaTitle: "Cookie Policy",
    metaDescription:
      "Learn which storage and external resources Móveis Machado uses and how to manage your preferences.",
    label: "PRIVACY AND CONTROL",
    title: "Cookie Policy.",
    intro:
      "This policy describes device storage and external resources present on this website. The European Portuguese text is the reference version.",
    updated: "Last updated: 9 November 2026",
    reference: "Reference version: 2026-11-09",
    sections: [
      {
        title: "What happens before your choice",
        paragraphs: [
          "The main content, photographs, fonts and navigation are served without loading Google Maps. We found no analytics, marketing pixels or advertising in the code loaded by the site.",
          "The banner does not block access. Accept and reject are available in the first layer, and all optional categories start off when you customise.",
        ],
      },
      {
        title: "How we store and change your choice",
        paragraphs: [
          "Your choice is stored in your browser's localStorage with the policy version, categories and a timestamp. This record is necessary to respect your decision and contains no name, email address or advertising identifier.",
          "Use “Manage cookies” in the footer to accept, reject or change categories. A material change to a purpose, provider or category requires a new version and presents the choice again.",
        ],
      },
      {
        title: "Google Maps and external links",
        paragraphs: [
          "The Google Maps iframe is only created after you allow External content or select “Load map”. Google may then receive an IP address and browser/device information and set storage under its own rules. Exact names and durations can vary by location, session and Google's policies.",
          "The address and “Get directions” link work without enabling the iframe. When you open Google Maps or WhatsApp in a new page, you interact directly with that external service and its policies apply.",
        ],
      },
      {
        title: "Inventory limits",
        paragraphs: [
          "The inventory below reflects the code and build audited for this version. Hosting services may keep technical logs outside the browser; that processing belongs in the Privacy Policy and still awaits company confirmation.",
          "This Cookie Policy must be reviewed whenever analytics, marketing, new embeds or other device storage are added.",
        ],
      },
    ],
    inventoryTitle: "Observed inventory",
    inventoryLabels: {
      name: "Name/resource",
      provider: "Provider",
      purpose: "Purpose",
      duration: "Duration",
      category: "Category",
    },
    inventory: [
      {
        name: "moveis-machado:consent (localStorage)",
        provider: "Móveis Machado / this site",
        purpose: "Store the version, categories and timestamp of the choice.",
        duration: "Up to 6 months, a new policy version or removal by the user.",
        category: "Necessary",
      },
      {
        name: "Google Maps iframe and storage set by Google",
        provider: "Google",
        purpose: "Display an interactive map of the address.",
        duration:
          "Only after opt-in; cookies/storage and duration vary according to Google and the session.",
        category: "External content",
      },
    ],
  },
};

/* Phone, WhatsApp and email confirmed by the site owner (2026-11-09).
   Instagram comes from the brand website. */
export const contactDetails = {
  phoneDisplay: "+351 964 035 260",
  phoneHref: "tel:+351964035260",
  email: "moveismachado@hotmail.com",
  instagramUrl: "https://www.instagram.com/cozinhasmoveismachado/",
  instagramHandle: "@cozinhasmoveismachado",
};
export const whatsappUrl = "https://wa.me/351964035260";
export const mapsUrl = "https://share.google/uK5M3YaRHoAcBMNPD";
export const mapsEmbedUrl =
  "https://www.google.com/maps?q=Rua+V%C3%ADtor+Cordon+6A,+2675-459+Odivelas,+Portugal&output=embed";
export function pageMeta(path: PublicPath, language: Language, title: string, description: string) {
  return createPageHead({ path, language, title, description });
}
