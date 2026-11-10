import walnut from "@/assets/kitchen-walnut.webp";
import island from "@/assets/kitchen-island.webp";
import contemporary from "@/assets/kitchen-contemporary.webp";
import marbleIsland from "@/assets/projects/marble-island.webp";
import marbleColumns from "@/assets/projects/marble-columns.webp";
import oakGalley from "@/assets/projects/oak-galley.webp";
import whiteL from "@/assets/projects/white-l.webp";
import oakWaterfallIsland from "@/assets/projects/oak-waterfall-island.webp";
import oakWaterfallColumns from "@/assets/projects/oak-waterfall-columns.webp";
import oakWaterfallPeninsula from "@/assets/projects/oak-waterfall-peninsula.webp";
import wineWall from "@/assets/projects/wine-wall.webp";
import wineWall3d from "@/assets/projects/wine-wall-3d.webp";
import wineWall3dAlt from "@/assets/projects/wine-wall-3d-alt.webp";
import laundryKitchenDrawing from "@/assets/projects/laundry-kitchen-drawing.webp";
import laundryKitchen3d from "@/assets/projects/laundry-kitchen-3d.webp";
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
    slug: "oak-waterfall",
    category: "kitchen",
    images: [
      { src: oakWaterfallIsland, width: 1024, height: 768, kind: "photo" },
      { src: oakWaterfallColumns, width: 1024, height: 768, kind: "photo" },
      { src: oakWaterfallPeninsula, width: 1024, height: 768, kind: "photo" },
    ],
    pt: {
      title: "Madeira e ilha efeito mármore",
      type: "Cozinha com ilha",
      materials: "Colunas em madeira · branco mate · bancada efeito mármore",
      summary:
        "Uma parede de colunas em madeira reúne forno duplo, frigorífico americano e garrafeira climatizada. Em frente, uma ilha branca com bancada efeito mármore até ao chão e placa integrada.",
    },
    en: {
      title: "Wood and marble-effect island",
      type: "Island kitchen",
      materials: "Wood tall units · matt white · marble-effect worktop",
      summary:
        "A wall of wood tall units brings together a double oven, an American fridge and a wine cooler. Opposite, a white island whose marble-effect worktop runs down to the floor, with an integrated hob.",
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
        "Uma parede inteira de arrumação para vinho, com portas em vidro, nichos em cruz e espaço para uma garrafeira climatizada. Foi desenhada em 3D antes de seguir para a fábrica.",
    },
    en: {
      title: "Bespoke wine wall",
      type: "Bespoke furniture",
      materials: "Black frames with glass · wood · cross-shaped wine racks",
      summary:
        "A full wall of wine storage with glass doors, cross racks and room for a wine cooler. It was designed in 3D before going to the workshop.",
    },
  },
];

export function projectBySlug(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

export const designToWork = {
  render: { src: wineWall3d, width: 1600, height: 1132 },
  photo: { src: wineWall, width: 1600, height: 1104 },
  processDrawing: { src: laundryKitchenDrawing, width: 1436, height: 939 },
  processRender: { src: laundryKitchen3d, width: 1600, height: 1132 },
};

export const heroImage = { src: contemporary, width: 1600, height: 1200 };

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

/**
 * The site is Portuguese-only for now. English copy is kept in this file so it
 * can be re-enabled later by accepting "en" here and restoring the header switch.
 */
export function resolveLanguage(_value: unknown): Language {
  return "pt";
}

export const content = {
  pt: {
    notFound: notFoundContent.pt,
    nav: ["Início", "O que fazemos", "Projetos", "Sobre nós", "Contactos"],
    quote: "Pedir orçamento",
    tagline: "Feito para o seu espaço",
    heroLabel: "FABRICO PRÓPRIO EM ODIVELAS",
    heroTitle: "Cozinhas para a sua casa.",
    heroItalic: "Feitas á sua medida.",
    heroDescription:
      "Há mais de 40 anos que desenhamos, fabricamos e instalamos cozinhas, armários e móveis por medida em Odivelas e na Grande Lisboa.",
    heroPrimary: "Pedir orçamento gratuito",
    explore: "Ver projetos",
    heroImageLabel: "Projeto real Móveis Machado",
    trust: [
      "Há mais de 40 anos no mercado",
      "Projeto 3D sem custos",
      "Fabrico próprio em Odivelas",
      "Instalação e pós-venda",
    ],
    servicesLabel: "O QUE FAZEMOS",
    servicesTitle: "Feito à medida, do chão ao teto.",
    servicesLink: "Ver todos os serviços",
    services: ["Cozinhas por medida", "Armários por medida", "Móveis por medida"],
    serviceShort: [
      "Cozinhas desenhadas ao centímetro, com eletrodomésticos encastrados e ferragens de fecho suave.",
      "Armários do chão ao teto, com o interior organizado para o que guarda.",
      "Móveis de sala, escritórios, garrafeiras e portas interiores feitos para o seu espaço.",
    ],
    serviceLong: [
      "Desenhamos cada cozinha a partir das medidas reais da sua casa e da forma como cozinha. Estruturas reforçadas, ferragens de fecho suave, eletrodomésticos encastrados e acabamentos à escolha.",
      "Armários que vão do chão ao teto, contornam paredes irregulares e organizam o interior com prateleiras, gavetas e divisórias na proporção certa.",
      "Móveis de sala, estantes, escritórios, garrafeiras e portas interiores, desenhados para o lugar onde vão ficar. Também fazemos remodelações.",
    ],
    servicesExtra: "Também fazemos portas interiores e remodelações.",
    projectsLabel: "PROJETOS REAIS",
    projectsTitle: "Os nossos trabalhos",
    projectsLink: "Ver todos os projetos",
    projectView: "Ver projeto",
    renderLabel: "Projeto 3D",
    drawingLabel: "Desenho técnico",
    photoLabel: "Obra concluída",
    designLabel: "DO PROJETO 3D À OBRA",
    designTitle: "Veja o seu móvel antes de ele existir.",
    designCopy:
      "Antes de cortarmos a primeira peça, preparamos o projeto em 3D. Escolha materiais, ajuste medidas e aprove o desenho com tranquilidade. Depois, a fábrica faz exatamente o que aprovou.",
    designRenderCaption: "Projeto 3D",
    designPhotoCaption: "Instalação",
    storyLabel: "SOBRE A MÓVEIS MACHADO",
    storyTitle: "Uma fábrica, mais de 40 anos de cozinhas.",
    storyCopy:
      "Há mais de quatro décadas que fazemos cozinhas, armários e móveis por medida em Odivelas. Ao longo desse tempo apurámos um método: rigor técnico, materiais escolhidos com critério e uma construção pensada para durar.",
    storyCopy2:
      "Como fabricamos tudo, controlamos cada medida, cada união, cada ferragem e cada acabamento. Quem desenha a sua cozinha fala com quem a fabrica e com quem a monta, e é isso que faz a diferença quando ela chega à sua casa.",
    storyLink: "Conheça a nossa história",
    stats: [
      { value: "40+", label: "anos de mercado em Odivelas" },
      { value: "100%", label: "fabrico próprio, peça a peça" },
      { value: "3D", label: "projeto aprovado antes de fabricarmos" },
      { value: "1", label: "equipa do desenho à montagem" },
      { value: "0 €", label: "pela visita, medição e orçamento" },
    ],
    valuesLabel: "COMO CONSTRUÍMOS",
    valuesTitle: "Feito para o uso de todos os dias.",
    values: [
      {
        title: "Estrutura estável",
        copy: "Caixas reforçadas e uniões bem feitas para armários que não cedem com o peso nem com os anos.",
      },
      {
        title: "Precisão",
        copy: "Medidas tiradas no local e cortes feitos na nossa fábrica, para que tudo encaixe à primeira.",
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
      "Amostras retiradas de cozinhas que fabricámos.",
    processLabel: "COMO TRABALHAMOS",
    processTitle: "Quatro passos, uma só equipa.",
    steps: ["Visita", "Projeto 3D e orçamento", "Fabrico", "Instalação"],
    stepCopy: [
      "Vamos à sua casa, tiramos medidas e ouvimos o que precisa. Deslocação sem custos.",
      "Desenhamos em 3D, escolhemos materiais consigo e apresentamos um orçamento detalhado.",
      "Produzimos cada peça em Odivelas, com controlo total sobre medidas e acabamentos.",
      "A nossa equipa monta e ajusta tudo, e continua disponível depois da entrega.",
    ],
    processCaption: "Projeto 3D preparado antes do fabrico",
    processDrawingCaption: "Desenho técnico com as medidas da cozinha antes do fabrico",
    ctaLabel: "ORÇAMENTO SEM COMPROMISSO",
    ctaTitle: "Fale-nos do seu projeto.",
    ctaCopy:
      "Diga-nos o que quer fazer e onde. Se tiver medidas ou fotografias do espaço, envie-as: marcamos a visita e preparamos o projeto 3D sem custos.",
    talk: "Pedir orçamento",
    footerCopy:
      "Cozinhas, armários e móveis por medida, com fabrico próprio em Odivelas há mais de 40 anos.",
    find: "Encontre-nos",
    contactsHeading: "Contactos",
    directions: "Como chegar",
    rights: "Todos os direitos reservados.",
    contactWaysTitle: "Fale connosco",
    phoneLabel: "Telefone",
    emailLabel: "Email",
    whatsapp: "Falar pelo WhatsApp",
    contactSub: "Odivelas e Grande Lisboa",
    contactCopy:
      "Trabalhamos sobretudo em Lisboa, Odivelas e nos concelhos vizinhos. Diga-nos onde é o projeto e agendamos a deslocação.",
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
        a: "A visita, a medição, o projeto 3D e o orçamento não têm custos nem compromisso.",
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
      "Cozinhas e mobiliário fabricados com a nossa fábrica e instalados em casas da Grande Lisboa. Selecione um projeto para ver todas as imagens.",
    projectsCount: "projetos",
    serviceIntro:
      "Cozinhas, armários e móveis por medida, desenhados em 3D, fabricados com a nossa fábrica e instalados pela nossa equipa.",
    serviceExplore: "Conhecer o serviço",
    serviceMaterialsTitle: "Algumas das nossas opções",
    aboutLabel: "SOBRE NÓS",
    aboutTitle: "Mais de 40 anos a fazer móveis por medida.",
    aboutIntro:
      "Em Odivelas, uma equipa que desenha, fabrica e instala, e clientes em toda a Grande Lisboa.",
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
      "For over 40 years we have designed, made and installed kitchens, cabinets and furniture to measure across Lisbon and Greater Lisbon.",
    heroPrimary: "Request a free quote",
    explore: "View projects",
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
    services: ["Bespoke kitchens", "Bespoke cabinets", "Bespoke furniture"],
    serviceShort: [
      "Kitchens designed to the centimetre, with built-in appliances and soft-close fittings.",
      "Floor-to-ceiling cabinets, organised inside for what you keep.",
      "Living room units, offices, wine walls and interior doors made for your space.",
    ],
    serviceLong: [
      "We design each kitchen from the real measurements of your home and the way you cook. Reinforced carcasses, soft-close fittings, built-in appliances and finishes of your choice.",
      "Cabinets that run floor to ceiling, work around uneven walls and organise the interior with shelves, drawers and dividers in the right proportions.",
      "Living room units, shelving, home offices, wine walls and interior doors, designed for the place they will live in. We also handle renovations.",
    ],
    servicesExtra: "We also make interior doors and handle renovations.",
    projectsLabel: "REAL PROJECTS",
    projectsTitle: "Our work",
    projectsLink: "View all projects",
    projectView: "View project",
    renderLabel: "3D design",
    drawingLabel: "Technical drawing",
    photoLabel: "Completed work",
    designLabel: "FROM 3D DESIGN TO FINISHED WORK",
    designTitle: "See your furniture before it exists.",
    designCopy:
      "Before we cut the first panel, we prepare the design in 3D. You choose materials, adjust measurements and approve the drawing at your own pace. Then the workshop makes exactly what you saw.",
    designRenderCaption: "3D design",
    designPhotoCaption: "Installation",
    storyLabel: "ABOUT MÓVEIS MACHADO",
    storyTitle: "One workshop, over 40 years of kitchens.",
    storyCopy:
      "For more than four decades we have made kitchens, cabinets and furniture to measure in our Odivelas workshop. Over that time we have refined a method: technical rigour, carefully chosen materials and construction built to last.",
    storyCopy2:
      "Because we make everything ourselves, we control every measurement, joint, fitting and finish. The people who design your kitchen talk to the people who make and install it, and that is what makes the difference when it arrives in your home.",
    storyLink: "Discover our story",
    stats: [
      { value: "40+", label: "years in our Odivelas workshop" },
      { value: "100%", label: "made in our own workshop" },
      { value: "3D", label: "design approved before we make it" },
      { value: "1", label: "team from design to installation" },
      { value: "€0", label: "for the visit, measuring and quote" },
    ],
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
    processDrawingCaption: "Technical drawing with the kitchen measurements before production",
    ctaLabel: "NO-OBLIGATION QUOTE",
    ctaTitle: "Tell us about your project.",
    ctaCopy:
      "Tell us what you want to make and where. If you have measurements or photographs of the space, send them: we book the visit and prepare the 3D design free of charge.",
    talk: "Request a quote",
    footerCopy:
      "Kitchens, cabinets and furniture made to measure in our Odivelas workshop for over 40 years.",
    find: "Find us",
    contactsHeading: "Contact",
    directions: "Get directions",
    rights: "All rights reserved.",
    contactWaysTitle: "Get in touch",
    phoneLabel: "Phone",
    emailLabel: "Email",
    whatsapp: "Message us on WhatsApp",
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
      "Kitchens, cabinets and furniture made to measure, designed in 3D, made in our workshop and installed by our own team.",
    serviceExplore: "Explore this service",
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
    bannerTitle: "Valorizamos a sua privacidade",
    bannerDescription:
      'Usamos apenas o armazenamento necessário para guardar a sua escolha. Conteúdo externo, como o mapa Google, só é carregado se clicar em "Aceitar tudo" ou o ativar em Personalizar.',
    reject: "Rejeitar",
    accept: "Aceitar tudo",
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
    bannerTitle: "We value your privacy",
    bannerDescription:
      'We only use the storage needed to remember your choice. External content, such as Google Maps, only loads if you click "Accept all" or enable it under Customise.',
    reject: "Reject",
    accept: "Accept all",
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
      "Saiba que informação a Móveis Machado guarda no seu dispositivo, quando é usado o Google Maps e como pode alterar a sua escolha.",
    label: "PRIVACIDADE",
    title: "Política de Cookies.",
    intro:
      "Este site não usa cookies de publicidade nem de estatísticas. Guardamos apenas a sua escolha de privacidade e só carregamos o mapa Google se o autorizar.",
    updated: "Última atualização: 9 de novembro de 2026",
    sections: [
      {
        title: "O que usamos",
        paragraphs: [
          "Para funcionar, o site guarda no seu browser um único registo com a escolha que fez no aviso de cookies. Este registo não inclui o seu nome, email ou qualquer identificador de publicidade.",
          "Não usamos ferramentas de estatísticas, pixels de redes sociais nem publicidade.",
        ],
      },
      {
        title: "Mapa Google",
        paragraphs: [
          "O mapa da página de contactos é fornecido pela Google e só é carregado se aceitar o conteúdo externo ou carregar em “Carregar mapa”. Nessa altura a Google pode recolher dados técnicos do seu dispositivo, como o endereço IP, e guardar cookies próprios de acordo com a política de privacidade da Google.",
          "Se preferir não carregar o mapa, a morada continua visível e a ligação “Como chegar” abre o Google Maps numa nova página.",
        ],
      },
      {
        title: "Ligações externas",
        paragraphs: [
          "Ao abrir o Google Maps ou o WhatsApp a partir deste site, passa a utilizar diretamente esses serviços, e aplicam-se as políticas de privacidade de cada um.",
        ],
      },
      {
        title: "Como alterar a sua escolha",
        paragraphs: [
          "Pode aceitar, rejeitar ou alterar a sua escolha a qualquer momento em “Gerir cookies”, no rodapé de todas as páginas. A escolha é válida durante seis meses; depois disso, ou se esta política mudar, voltamos a perguntar.",
        ],
      },
    ],
    inventoryTitle: "Resumo",
    inventoryLabels: {
      name: "O quê",
      provider: "Fornecedor",
      purpose: "Para quê",
      duration: "Duração",
      category: "Categoria",
    },
    inventory: [
      {
        name: "Escolha de cookies (armazenamento local)",
        provider: "Móveis Machado",
        purpose: "Lembrar a escolha que fez no aviso de cookies.",
        duration: "Seis meses, ou até apagar os dados do browser.",
        category: "Necessário",
      },
      {
        name: "Mapa Google",
        provider: "Google",
        purpose: "Mostrar a localização da loja num mapa interativo.",
        duration: "Definida pela Google. Só é usado depois de o autorizar.",
        category: "Conteúdo externo",
      },
    ],
  },
  en: {
    metaTitle: "Cookie Policy",
    metaDescription:
      "Learn what Móveis Machado stores on your device, when Google Maps is used and how to change your choice.",
    label: "PRIVACY",
    title: "Cookie Policy.",
    intro:
      "This website uses no advertising or analytics cookies. We only store your privacy choice and only load Google Maps if you allow it.",
    updated: "Last updated: 9 November 2026",
    sections: [
      {
        title: "What we use",
        paragraphs: [
          "To work, the site stores a single record in your browser with the choice you made in the cookie notice. It contains no name, email address or advertising identifier.",
          "We use no analytics tools, social media pixels or advertising.",
        ],
      },
      {
        title: "Google Maps",
        paragraphs: [
          "The map on the contact page is provided by Google and only loads if you allow external content or select “Load map”. Google may then collect technical data from your device, such as your IP address, and set its own cookies under Google's privacy policy.",
          "If you prefer not to load the map, the address remains visible and the “Get directions” link opens Google Maps in a new page.",
        ],
      },
      {
        title: "External links",
        paragraphs: [
          "When you open Google Maps or WhatsApp from this site, you use those services directly and their own privacy policies apply.",
        ],
      },
      {
        title: "How to change your choice",
        paragraphs: [
          "You can accept, reject or change your choice at any time with “Manage cookies” in the footer of every page. Your choice lasts six months; after that, or if this policy changes, we ask again.",
        ],
      },
    ],
    inventoryTitle: "Summary",
    inventoryLabels: {
      name: "What",
      provider: "Provider",
      purpose: "Purpose",
      duration: "Duration",
      category: "Category",
    },
    inventory: [
      {
        name: "Cookie choice (local storage)",
        provider: "Móveis Machado",
        purpose: "Remember the choice you made in the cookie notice.",
        duration: "Six months, or until you clear your browser data.",
        category: "Necessary",
      },
      {
        name: "Google Maps",
        provider: "Google",
        purpose: "Show the workshop's location on an interactive map.",
        duration: "Set by Google. Only used after you allow it.",
        category: "External content",
      },
    ],
  },
};

/* Phone, WhatsApp and email confirmed by the site owner (2026-11-09). */
export const contactDetails = {
  phoneDisplay: "+351 964 035 260",
  phoneHref: "tel:+351964035260",
  email: "moveismachado@hotmail.com",
};
export const whatsappUrl = "https://wa.me/351964035260";
/** Opens Google Maps in route mode with the workshop as destination. */
export const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Rua+V%C3%ADtor+Cordon+6A%2C+2675-459+Odivelas%2C+Portugal";
export const mapsEmbedUrl =
  "https://www.google.com/maps?q=Rua+V%C3%ADtor+Cordon+6A,+2675-459+Odivelas,+Portugal&output=embed";
export function pageMeta(path: PublicPath, language: Language, title: string, description: string) {
  return createPageHead({ path, language, title, description });
}
