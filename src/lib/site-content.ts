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
    heroLabel: "MOBILIÁRIO POR MEDIDA · FABRICO PRÓPRIO",
    heroTitle: "A sua casa. A sua essência.",
    heroItalic: "À sua medida.",
    heroDescription:
      "Cozinhas e mobiliário que refletem quem é. Mais de 40 anos a dar forma a espaços únicos, com cuidado em cada detalhe.",
    explore: "Explorar projetos",
    scroll: "Descubra a Móveis Machado",
    trust: [
      "Mais de 40 anos de experiência",
      "Fabrico próprio",
      "Do desenho à instalação",
      "Odivelas · Grande Lisboa",
    ],
    servicesLabel: "O QUE FAZEMOS",
    servicesTitle: "Um espaço. Infinitas possibilidades.",
    servicesLink: "Conheça as nossas soluções",
    services: [
      "Cozinhas por medida",
      "Roupeiros por medida",
      "Móveis por medida",
      "Portas interiores",
    ],
    serviceShort: [
      "O coração da casa, pensado para si.",
      "Organização que se adapta à sua vida.",
      "Peças únicas para espaços únicos.",
      "O detalhe que une toda a casa.",
    ],
    serviceLong: [
      "Criamos cozinhas que conciliam estética e funcionalidade. Cada medida, material e acabamento é pensado para a sua casa e para a forma como a vive.",
      "Aproveitamos cada centímetro com soluções de arrumação feitas à medida. Interiores organizados e acabamentos em harmonia com o seu espaço.",
      "Do móvel de sala ao espaço de trabalho, desenhamos e fabricamos peças que respondem às suas necessidades e se integram naturalmente na sua casa.",
      "Portas interiores que dão continuidade aos ambientes. Materiais, dimensões e acabamentos escolhidos em função de cada projeto.",
    ],
    projectsLabel: "O NOSSO TRABALHO",
    projectsTitle: "Ideias que ganharam forma.",
    projectsLink: "Ver todos os projetos",
    category: "Cozinhas por medida",
    storyLabel: "A ESSÊNCIA MÓVEIS MACHADO",
    storyTitle: "O valor está nos detalhes.",
    storyCopy:
      "Na escolha dos materiais. No encontro entre duas peças. Num acabamento bem executado. Há mais de 40 anos, damos forma a mobiliário que respeita o seu espaço e a sua maneira de viver.",
    storyCopy2:
      "O fabrico próprio permite acompanhar cada fase — do primeiro desenho à instalação. Trabalhamos com madeira maciça, MDF lacado e materiais técnicos, escolhidos em função de cada projeto.",
    storyLink: "Conheça a nossa história",
    years: "anos de experiência",
    own: "Fabrico próprio",
    ownSub: "Do desenho à instalação",
    processLabel: "COMO TRABALHAMOS",
    processTitle: "Da primeira ideia à sua casa.",
    steps: ["Conversamos", "Planeamos", "Fabricamos", "Instalamos"],
    stepCopy: [
      "Ouvimos as suas ideias e conhecemos o espaço e as suas necessidades.",
      "Definimos medidas, organização, materiais e acabamentos.",
      "Damos forma ao projeto na nossa produção própria.",
      "Cuidamos da instalação e de cada último detalhe.",
    ],
    ctaLabel: "VAMOS CRIAR ALGO SEU",
    ctaTitle: "A sua próxima ideia começa aqui.",
    ctaCopy: "Conte-nos o que imagina para a sua casa. Vamos dar forma ao seu projeto.",
    talk: "Vamos conversar",
    footerCopy:
      "Mobiliário com a medida da sua vida. Fabrico próprio de cozinhas, roupeiros e móveis por medida em Odivelas.",
    find: "Encontre-nos",
    directions: "Como chegar",
    rights: "Todos os direitos reservados.",
    made: "Feito com cuidado. Feito para si.",
    contactTitle: "Vamos dar forma à sua ideia.",
    contactIntro:
      "Cada projeto começa por uma conversa. Visite-nos em Odivelas ou fale connosco através do Facebook.",
    contactSub: "Perto de si, na Grande Lisboa.",
    contactCopy:
      "Trabalhamos principalmente em Lisboa, Odivelas e na zona envolvente. Traga as suas ideias, medidas aproximadas e fotografias do espaço.",
    facebook: "Falar pelo Facebook",
    prepare: "Como preparar o seu projeto?",
    prepareCopy:
      "Reúna medidas aproximadas, fotografias do espaço e referências do que pretende. O prazo e o valor dependem do âmbito, dos materiais e das condições do projeto.",
    materials: "Que materiais podemos escolher?",
    materialsCopy:
      "Madeira maciça, MDF lacado e materiais técnicos. Definimos os materiais e acabamentos conforme as necessidades do seu projeto.",
    close: "Fechar fotografia",
    projectIntro:
      "Uma seleção do nosso trabalho. Soluções feitas para espaços reais, com atenção a cada detalhe.",
    serviceIntro:
      "Cada casa tem a sua identidade. Criamos soluções à medida do espaço, das necessidades e de quem o habita.",
    aboutIntro:
      "Mais de 40 anos a transformar ideias em espaços para viver. Uma história de saber-fazer, proximidade e atenção ao detalhe.",
  },
  en: {
    nav: ["Home", "What we do", "Projects", "Our story", "Contact"],
    quote: "Request a quote",
    tagline: "Made for your space",
    heroLabel: "BESPOKE FURNITURE · OUR OWN WORKSHOP",
    heroTitle: "Your home. Your essence.",
    heroItalic: "Made for you.",
    heroDescription:
      "Kitchens and furniture that reflect who you are. Over 40 years shaping unique spaces, with care in every detail.",
    explore: "Explore projects",
    scroll: "Discover Móveis Machado",
    trust: [
      "Over 40 years of experience",
      "Made in our own workshop",
      "From design to installation",
      "Odivelas · Greater Lisbon",
    ],
    servicesLabel: "WHAT WE DO",
    servicesTitle: "One space. Endless possibilities.",
    servicesLink: "Discover our solutions",
    services: ["Bespoke kitchens", "Custom wardrobes", "Bespoke furniture", "Interior doors"],
    serviceShort: [
      "The heart of your home, designed for you.",
      "Organisation that fits your way of life.",
      "Unique pieces for unique spaces.",
      "The detail that brings your home together.",
    ],
    serviceLong: [
      "We create kitchens that bring together beauty and functionality. Every dimension, material and finish is designed around your home and the way you live.",
      "Make the most of every centimetre with made-to-measure storage. Thoughtfully organised interiors and finishes that complement your space.",
      "From living room furniture to your workspace, we design and make pieces that meet your needs and feel naturally at home.",
      "Interior doors that connect your spaces. Materials, dimensions and finishes selected to suit each project.",
    ],
    projectsLabel: "OUR WORK",
    projectsTitle: "Ideas brought to life.",
    projectsLink: "View all projects",
    category: "Bespoke kitchens",
    storyLabel: "THE ESSENCE OF MÓVEIS MACHADO",
    storyTitle: "The difference is in the details.",
    storyCopy:
      "In the materials we choose. In the way two pieces meet. In a beautifully finished surface. For over 40 years, we have crafted furniture that respects your space and the way you live.",
    storyCopy2:
      "Our own workshop allows us to follow every stage — from the first drawing to installation. We work with solid wood, lacquered MDF and technical materials, selected for each individual project.",
    storyLink: "Discover our story",
    years: "years of experience",
    own: "Our own workshop",
    ownSub: "From design to installation",
    processLabel: "HOW WE WORK",
    processTitle: "From the first idea to your home.",
    steps: ["We listen", "We plan", "We craft", "We install"],
    stepCopy: [
      "We get to know your ideas, your space and what you need.",
      "We define dimensions, layout, materials and finishes.",
      "We bring your project to life in our own workshop.",
      "We look after the installation and every finishing touch.",
    ],
    ctaLabel: "LET’S CREATE SOMETHING YOURS",
    ctaTitle: "Your next idea starts here.",
    ctaCopy: "Tell us what you imagine for your home. Let’s bring your project to life.",
    talk: "Let’s talk",
    footerCopy:
      "Furniture made for the way you live. Bespoke kitchens, wardrobes and furniture, made in our own workshop in Odivelas.",
    find: "Find us",
    directions: "Get directions",
    rights: "All rights reserved.",
    made: "Made with care. Made for you.",
    contactTitle: "Let’s shape your idea.",
    contactIntro:
      "Every project starts with a conversation. Visit us in Odivelas or get in touch through Facebook.",
    contactSub: "Close to you, in Greater Lisbon.",
    contactCopy:
      "We work mainly in Lisbon, Odivelas and the surrounding area. Bring your ideas, approximate measurements and photographs of your space.",
    facebook: "Talk to us on Facebook",
    prepare: "How can I prepare for my project?",
    prepareCopy:
      "Gather approximate measurements, photographs of the space and references for what you have in mind. Timing and cost depend on the scope, materials and conditions of the project.",
    materials: "Which materials can we choose?",
    materialsCopy:
      "Solid wood, lacquered MDF and technical materials. Materials and finishes are selected to suit the needs of your project.",
    close: "Close photograph",
    projectIntro:
      "A selection of our work. Solutions made for real spaces, with attention to every detail.",
    serviceIntro:
      "Every home has its own identity. We create solutions tailored to the space, the needs and the people who live there.",
    aboutIntro:
      "Over 40 years transforming ideas into spaces to live in. A story of craftsmanship, personal service and attention to detail.",
  },
};
export const facebookUrl = "https://www.facebook.com/MoveisdeCozinhaPorMedida/";
export const mapsUrl = "https://share.google/uK5M3YaRHoAcBMNPD";
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
