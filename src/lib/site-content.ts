import walnut from "@/assets/kitchen-walnut.webp";
import island from "@/assets/kitchen-island.webp";
import contemporary from "@/assets/kitchen-contemporary.webp";
export type Language = "pt" | "en";
export function resolveLanguage(value: unknown): Language {
  return value === "en" ? "en" : "pt";
}
export const projects = [
  { image: island, pt: "Cozinha com ilha", en: "Kitchen with an island" },
  { image: walnut, pt: "Branco e madeira", en: "White & walnut" },
  { image: contemporary, pt: "Linhas contemporâneas", en: "Contemporary lines" },
];
export const content = {
  pt: {
    nav: ["Início", "O que fazemos", "Projetos", "Sobre nós", "Contactos"],
    quote: "Pedir orçamento",
    tagline: "Feito para o seu espaço",
    heroLabel: "FABRICO PRÓPRIO EM ODIVELAS",
    heroTitle: "Cozinhas e móveis.",
    heroItalic: "À sua medida.",
    heroDescription:
      "Fabricamos cozinhas, roupeiros e móveis por medida em Odivelas. Acompanhamos o projeto do desenho à instalação.",
    explore: "Explorar projetos",
    scroll: "Descubra a Móveis Machado",
    trust: [
      "Mais de 40 anos de experiência",
      "Fabrico próprio",
      "Do desenho à instalação",
      "Odivelas · Grande Lisboa",
    ],
    servicesLabel: "O QUE FAZEMOS",
    servicesTitle: "O que podemos fabricar.",
    servicesLink: "Ver serviços",
    services: ["Cozinhas por medida", "Roupeiros por medida", "Móveis por medida"],
    serviceShort: [
      "Disposição e acabamentos adaptados ao espaço.",
      "Arrumação para o que precisa de guardar.",
      "Móveis para a sala e o espaço de trabalho.",
    ],
    serviceLong: [
      "Definimos a disposição dos armários e das bancadas de acordo com o espaço e a forma como utiliza a cozinha. Escolhemos os materiais e os acabamentos para cada projeto.",
      "Fabricamos roupeiros com dimensões e arrumação interior adequadas ao espaço e ao que precisa de guardar. Os acabamentos são escolhidos para cada projeto.",
      "Desenhamos e fabricamos móveis para a sala e o espaço de trabalho. Adaptamos as dimensões, os materiais e os acabamentos à utilização de cada peça.",
    ],
    projectsLabel: "O NOSSO TRABALHO",
    projectsTitle: "Cozinhas que fabricámos.",
    projectsLink: "Ver todos os projetos",
    category: "Cozinhas por medida",
    storyLabel: "SOBRE A MÓVEIS MACHADO",
    storyTitle: "Fabrico próprio em Odivelas.",
    storyCopy:
      "Há mais de 40 anos, fabricamos cozinhas, roupeiros e móveis por medida. Acompanhamos o trabalho desde o desenho até à instalação.",
    storyCopy2:
      "Trabalhamos com madeira maciça, MDF lacado e materiais técnicos. Definimos os materiais e os acabamentos de acordo com as necessidades de cada projeto.",
    storyLink: "Conheça a nossa história",
    years: "anos de experiência",
    own: "Fabrico próprio",
    ownSub: "Do desenho à instalação",
    processLabel: "COMO TRABALHAMOS",
    processTitle: "Como fazemos o seu projeto.",
    steps: ["Conversamos", "Planeamos", "Fabricamos", "Instalamos"],
    stepCopy: [
      "Conversamos sobre o que pretende e as características do espaço.",
      "Definimos as medidas, a disposição, os materiais e os acabamentos.",
      "Produzimos os móveis na nossa oficina.",
      "Tratamos da montagem no local.",
    ],
    ctaLabel: "CONTACTOS E ORÇAMENTOS",
    ctaTitle: "Fale-nos do seu projeto.",
    ctaCopy:
      "Diga-nos o que pretende fazer e onde. Se tiver medidas ou fotografias do espaço, partilhe-as connosco.",
    talk: "Pedir orçamento",
    footerCopy: "Fabrico próprio de cozinhas, roupeiros e móveis por medida em Odivelas.",
    find: "Encontre-nos",
    directions: "Como chegar",
    rights: "Todos os direitos reservados.",
    contactTitle: "Contactos e orçamentos.",
    contactIntro: "Visite-nos em Odivelas ou fale connosco pelo WhatsApp.",
    contactSub: "Odivelas e Grande Lisboa.",
    contactCopy: "Trabalhamos principalmente em Lisboa, Odivelas e na região envolvente.",
    whatsapp: "Falar pelo WhatsApp",
    prepare: "Como preparar o seu projeto?",
    prepareCopy:
      "Reúna medidas aproximadas, fotografias do espaço e referências do que pretende. O prazo e o valor dependem do âmbito, dos materiais e das condições do projeto.",
    materials: "Que materiais podemos escolher?",
    materialsCopy:
      "Madeira maciça, MDF lacado e materiais técnicos. Definimos os materiais e acabamentos conforme as necessidades do seu projeto.",
    close: "Fechar fotografia",
    projectIntro:
      "Veja algumas cozinhas do nosso portefólio. Selecione uma fotografia para a ampliar.",
    serviceIntro:
      "Fabricamos cozinhas, roupeiros e móveis por medida. Definimos as dimensões, os materiais e os acabamentos para cada projeto.",
    aboutIntro: "Trabalhamos em Odivelas e servimos Lisboa e a região envolvente.",
  },
  en: {
    nav: ["Home", "What we do", "Projects", "Our story", "Contact"],
    quote: "Request a quote",
    tagline: "Made for your space",
    heroLabel: "MADE IN OUR ODIVELAS WORKSHOP",
    heroTitle: "Kitchens and furniture.",
    heroItalic: "Made to measure.",
    heroDescription:
      "We make kitchens, wardrobes and furniture to measure in Odivelas. We handle each project from design to installation.",
    explore: "Explore projects",
    scroll: "Discover Móveis Machado",
    trust: [
      "Over 40 years of experience",
      "Made in our own workshop",
      "From design to installation",
      "Odivelas · Greater Lisbon",
    ],
    servicesLabel: "WHAT WE DO",
    servicesTitle: "What we can make.",
    servicesLink: "View services",
    services: ["Bespoke kitchens", "Custom wardrobes", "Bespoke furniture"],
    serviceShort: [
      "Layouts and finishes suited to your space.",
      "Storage for what you need to keep.",
      "Furniture for living rooms and workspaces.",
    ],
    serviceLong: [
      "We plan cabinets and worktops around the space and how you use your kitchen. We select materials and finishes for each project.",
      "We make wardrobes with dimensions and internal storage suited to your space and what you need to keep. Finishes are chosen for each project.",
      "We design and make furniture for living rooms and workspaces. Dimensions, materials and finishes are adapted to how each piece will be used.",
    ],
    projectsLabel: "OUR WORK",
    projectsTitle: "Kitchens we have made.",
    projectsLink: "View all projects",
    category: "Bespoke kitchens",
    storyLabel: "ABOUT MÓVEIS MACHADO",
    storyTitle: "Made in our Odivelas workshop.",
    storyCopy:
      "For over 40 years, we have made kitchens, wardrobes and furniture to measure. We handle the work from design to installation.",
    storyCopy2:
      "We work with solid wood, lacquered MDF and technical materials. Materials and finishes are selected to suit each project.",
    storyLink: "Discover our story",
    years: "years of experience",
    own: "Our own workshop",
    ownSub: "From design to installation",
    processLabel: "HOW WE WORK",
    processTitle: "How we make your furniture.",
    steps: ["We discuss", "We plan", "We make", "We install"],
    stepCopy: [
      "We discuss what you need and the characteristics of your space.",
      "We define dimensions, layout, materials and finishes.",
      "We make the furniture in our own workshop.",
      "We assemble and install the furniture on site.",
    ],
    ctaLabel: "CONTACT AND QUOTES",
    ctaTitle: "Tell us about your project.",
    ctaCopy:
      "Tell us what you need and where. If you have measurements or photographs of the space, share them with us.",
    talk: "Request a quote",
    footerCopy: "Kitchens, wardrobes and furniture made to measure in our Odivelas workshop.",
    find: "Find us",
    directions: "Get directions",
    rights: "All rights reserved.",
    contactTitle: "Contact and quotes.",
    contactIntro: "Visit us in Odivelas or message us on WhatsApp.",
    contactSub: "Odivelas and Greater Lisbon.",
    contactCopy: "We work mainly in Lisbon, Odivelas and the surrounding area.",
    whatsapp: "Message us on WhatsApp",
    prepare: "How can I prepare for my project?",
    prepareCopy:
      "Gather approximate measurements, photographs of the space and references for what you have in mind. Timing and cost depend on the scope, materials and conditions of the project.",
    materials: "Which materials can we choose?",
    materialsCopy:
      "Solid wood, lacquered MDF and technical materials. Materials and finishes are selected to suit the needs of your project.",
    close: "Close photograph",
    projectIntro: "Browse kitchens from our portfolio. Select a photograph to enlarge it.",
    serviceIntro:
      "We make kitchens, wardrobes and furniture to measure. We define dimensions, materials and finishes for each project.",
    aboutIntro: "We are based in Odivelas and work across Lisbon and the surrounding area.",
  },
};
export const whatsappUrl = "https://wa.me/351933776729";
export const mapsUrl = "https://share.google/uK5M3YaRHoAcBMNPD";
export const mapsEmbedUrl =
  "https://www.google.com/maps?q=Rua+V%C3%ADtor+Cordon+6A,+2675-459+Odivelas,+Portugal&output=embed";
export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Móveis Machado` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Móveis Machado` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
