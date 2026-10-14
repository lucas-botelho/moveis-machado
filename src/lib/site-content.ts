import walnut from "@/assets/kitchen-walnut.webp";
import island from "@/assets/kitchen-island.webp";
import contemporary from "@/assets/kitchen-contemporary.webp";
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

export const servicePages: Record<Language, Record<ServiceSlug, ServicePageContent>> = {
  pt: {
    kitchens: {
      metaTitle: "Cozinhas por medida em Odivelas",
      metaDescription:
        "Cozinhas por medida com fabrico próprio em Odivelas. Planeamento, materiais, acabamentos e instalação para projetos na Grande Lisboa.",
      label: "COZINHAS POR MEDIDA",
      title: "Uma cozinha pensada para o seu espaço.",
      description:
        "Planeamos e fabricamos cozinhas por medida na nossa oficina em Odivelas, acompanhando cada projeto do desenho à instalação.",
      scopeTitle: "Disposição, arrumação e utilização",
      scopeCopy:
        "Definimos a disposição dos armários e das bancadas de acordo com as características do espaço e a forma como utiliza a cozinha. Cada decisão procura conciliar arrumação, circulação e o uso diário.",
      planningTitle: "O que definimos consigo",
      planningCopy:
        "Partimos das medidas do espaço e das suas referências para preparar a disposição, as dimensões, os materiais e os acabamentos. O âmbito final é ajustado às necessidades concretas do projeto.",
      materialsTitle: "Materiais e acabamentos",
      materialsCopy:
        "Trabalhamos com madeira maciça, MDF lacado e materiais técnicos. A escolha é feita para cada projeto, tendo em conta o resultado pretendido e as condições do espaço.",
      areaTitle: "Oficina em Odivelas",
      areaCopy:
        "Fabricamos em Odivelas e trabalhamos principalmente em Lisboa, Odivelas e na região envolvente. Confirme connosco a localização do seu projeto ao pedir orçamento.",
      processTitle: "Da primeira conversa à instalação",
      process: [
        "Conversamos sobre a cozinha, o espaço e a forma como pretende utilizá-la.",
        "Definimos medidas, disposição, materiais e acabamentos.",
        "Fabricamos os elementos na nossa oficina.",
        "Fazemos a montagem e a instalação no local.",
      ],
      ctaTitle: "Tem um projeto de cozinha?",
      ctaCopy:
        "Envie-nos medidas aproximadas, fotografias do espaço e referências do que pretende. Falamos consigo sobre os próximos passos.",
      ctaLabel: "Pedir orçamento de cozinha",
    },
    wardrobes: {
      metaTitle: "Roupeiros por medida em Odivelas",
      metaDescription:
        "Roupeiros por medida com fabrico próprio em Odivelas. Dimensões, arrumação interior, materiais e acabamentos definidos para cada espaço.",
      label: "ROUPEIROS POR MEDIDA",
      title: "Arrumação desenhada para o que precisa.",
      description:
        "Fabricamos roupeiros com dimensões e organização interior adaptadas ao espaço, desde o planeamento até à instalação.",
      scopeTitle: "Aproveitar o espaço disponível",
      scopeCopy:
        "Um roupeiro por medida permite ajustar as dimensões ao local e organizar o interior de acordo com o que precisa de guardar. O desenho parte sempre do espaço real e da utilização pretendida.",
      planningTitle: "O que definimos consigo",
      planningCopy:
        "Revemos as medidas, a configuração interior, os materiais e os acabamentos. Estas escolhas são feitas para cada projeto, sem soluções ou dimensões predefinidas.",
      materialsTitle: "Materiais e acabamentos",
      materialsCopy:
        "Podemos trabalhar com madeira maciça, MDF lacado e materiais técnicos. A combinação adequada é definida durante o planeamento do projeto.",
      areaTitle: "Fabrico próprio em Odivelas",
      areaCopy:
        "A produção é feita na nossa oficina em Odivelas. Trabalhamos principalmente em Lisboa, Odivelas e na região envolvente, mediante confirmação do local do projeto.",
      processTitle: "Do espaço à instalação",
      process: [
        "Percebemos o espaço disponível e o que precisa de guardar.",
        "Planeamos dimensões, organização interior, materiais e acabamentos.",
        "Produzimos o roupeiro na nossa oficina.",
        "Montamos e instalamos o roupeiro no local.",
      ],
      ctaTitle: "Quer planear um roupeiro por medida?",
      ctaCopy:
        "Partilhe medidas aproximadas, fotografias e as suas necessidades de arrumação para iniciarmos a conversa.",
      ctaLabel: "Pedir orçamento de roupeiro",
    },
    furniture: {
      metaTitle: "Móveis por medida em Odivelas",
      metaDescription:
        "Móveis por medida para salas e espaços de trabalho, com fabrico próprio em Odivelas e acompanhamento do desenho à instalação.",
      label: "MÓVEIS POR MEDIDA",
      title: "Mobiliário feito para a sua utilização.",
      description:
        "Desenhamos e fabricamos móveis por medida para salas e espaços de trabalho, adaptando cada peça ao espaço e à função.",
      scopeTitle: "Uma peça com medidas e função próprias",
      scopeCopy:
        "Planeamos mobiliário para salas e espaços de trabalho a partir das dimensões disponíveis e da utilização de cada peça. O desenho procura responder ao contexto concreto do espaço.",
      planningTitle: "O que definimos consigo",
      planningCopy:
        "Conversamos sobre a função do móvel, analisamos as medidas e definimos materiais e acabamentos. O projeto resulta dessas escolhas e não de uma configuração genérica.",
      materialsTitle: "Materiais e acabamentos",
      materialsCopy:
        "Trabalhamos com madeira maciça, MDF lacado e materiais técnicos. Selecionamos os materiais e acabamentos de acordo com as necessidades de cada peça.",
      areaTitle: "Da oficina de Odivelas à instalação",
      areaCopy:
        "Fabricamos em Odivelas e trabalhamos principalmente em Lisboa, Odivelas e na região envolvente. A localização é confirmada connosco antes de avançar.",
      processTitle: "Do desenho ao móvel instalado",
      process: [
        "Conversamos sobre a peça, a utilização e o espaço onde ficará.",
        "Definimos medidas, desenho, materiais e acabamentos.",
        "Fabricamos o móvel na nossa oficina.",
        "Tratamos da montagem e instalação no local.",
      ],
      ctaTitle: "Tem uma peça em mente?",
      ctaCopy:
        "Envie-nos medidas aproximadas, fotografias do espaço e referências para avaliarmos consigo o projeto.",
      ctaLabel: "Pedir orçamento de mobiliário",
    },
  },
  en: {
    kitchens: {
      metaTitle: "Bespoke kitchens in Odivelas",
      metaDescription:
        "Bespoke kitchens made in our Odivelas workshop. Planning, materials, finishes and installation for projects across Greater Lisbon.",
      label: "BESPOKE KITCHENS",
      title: "A kitchen planned for your space.",
      description:
        "We plan and make bespoke kitchens in our Odivelas workshop, handling each project from design to installation.",
      scopeTitle: "Layout, storage and everyday use",
      scopeCopy:
        "We plan cabinets and worktops around the characteristics of the space and how you use your kitchen. Each decision considers storage, movement and day-to-day use.",
      planningTitle: "What we define with you",
      planningCopy:
        "We start with the measurements of the space and your references, then define the layout, dimensions, materials and finishes. The final scope is adapted to the needs of the project.",
      materialsTitle: "Materials and finishes",
      materialsCopy:
        "We work with solid wood, lacquered MDF and technical materials. The selection is made for each project, considering the intended result and the conditions of the space.",
      areaTitle: "Our workshop in Odivelas",
      areaCopy:
        "We make our furniture in Odivelas and work mainly in Lisbon, Odivelas and the surrounding area. Confirm your project location with us when requesting a quote.",
      processTitle: "From the first conversation to installation",
      process: [
        "We discuss the kitchen, the space and how you intend to use it.",
        "We define measurements, layout, materials and finishes.",
        "We make the components in our own workshop.",
        "We assemble and install the kitchen on site.",
      ],
      ctaTitle: "Planning a new kitchen?",
      ctaCopy:
        "Send us approximate measurements, photographs of the space and references for what you have in mind. We will discuss the next steps with you.",
      ctaLabel: "Request a kitchen quote",
    },
    wardrobes: {
      metaTitle: "Custom wardrobes in Odivelas",
      metaDescription:
        "Custom wardrobes made in our Odivelas workshop. Dimensions, internal storage, materials and finishes planned for each space.",
      label: "CUSTOM WARDROBES",
      title: "Storage designed around what you need.",
      description:
        "We make wardrobes with dimensions and internal organisation suited to your space, from planning through to installation.",
      scopeTitle: "Making use of the available space",
      scopeCopy:
        "A custom wardrobe can be sized for its location and organised around what you need to keep. The design always starts with the actual space and its intended use.",
      planningTitle: "What we define with you",
      planningCopy:
        "We review measurements, internal organisation, materials and finishes. These choices are made for each project, without predefined dimensions or configurations.",
      materialsTitle: "Materials and finishes",
      materialsCopy:
        "We can work with solid wood, lacquered MDF and technical materials. The appropriate combination is selected while planning the project.",
      areaTitle: "Made in our Odivelas workshop",
      areaCopy:
        "Production takes place in our Odivelas workshop. We work mainly in Lisbon, Odivelas and the surrounding area, subject to confirmation of the project location.",
      processTitle: "From the space to installation",
      process: [
        "We understand the available space and what you need to store.",
        "We plan dimensions, internal organisation, materials and finishes.",
        "We make the wardrobe in our own workshop.",
        "We assemble and install the wardrobe on site.",
      ],
      ctaTitle: "Would you like to plan a custom wardrobe?",
      ctaCopy:
        "Share approximate measurements, photographs and your storage needs to start the conversation.",
      ctaLabel: "Request a wardrobe quote",
    },
    furniture: {
      metaTitle: "Bespoke furniture in Odivelas",
      metaDescription:
        "Bespoke furniture for living rooms and workspaces, made in our Odivelas workshop and handled from design to installation.",
      label: "BESPOKE FURNITURE",
      title: "Furniture made for how you use it.",
      description:
        "We design and make bespoke furniture for living rooms and workspaces, adapting each piece to its setting and purpose.",
      scopeTitle: "A piece with its own dimensions and purpose",
      scopeCopy:
        "We plan furniture for living rooms and workspaces around the available dimensions and the purpose of each piece. The design responds to the specific setting.",
      planningTitle: "What we define with you",
      planningCopy:
        "We discuss the purpose of the piece, review the dimensions and define materials and finishes. The project grows from those choices rather than a generic configuration.",
      materialsTitle: "Materials and finishes",
      materialsCopy:
        "We work with solid wood, lacquered MDF and technical materials. Materials and finishes are selected to suit the needs of each piece.",
      areaTitle: "From our Odivelas workshop to installation",
      areaCopy:
        "We make our furniture in Odivelas and work mainly in Lisbon, Odivelas and the surrounding area. We confirm the location with you before proceeding.",
      processTitle: "From the drawing to installed furniture",
      process: [
        "We discuss the piece, its purpose and the space where it will be used.",
        "We define measurements, design, materials and finishes.",
        "We make the furniture in our own workshop.",
        "We handle assembly and installation on site.",
      ],
      ctaTitle: "Do you have a piece in mind?",
      ctaCopy:
        "Send us approximate measurements, photographs of the space and references so we can discuss the project with you.",
      ctaLabel: "Request a furniture quote",
    },
  },
};

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
    notFound: notFoundContent.pt,
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
    notFound: notFoundContent.en,
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
    diagnosticsTitle: string;
    diagnosticsDescription: string;
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
      "Guardamos apenas a sua escolha neste dispositivo. O mapa Google e o diagnóstico opcional só são ativados com a sua autorização.",
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
    diagnosticsTitle: "Diagnóstico",
    diagnosticsDescription:
      "Permite comunicar erros técnicos aos hooks da Lovable quando estes existem no ambiente de preview.",
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
      "We only store your choice on this device. Google Maps and optional diagnostics are enabled only with your permission.",
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
    diagnosticsTitle: "Diagnostics",
    diagnosticsDescription:
      "Allows technical errors to be sent to Lovable hooks when they are present in the preview environment.",
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
    updated: "Última atualização: 14 de outubro de 2026",
    reference: "Versão de referência: 2026-10-14",
    sections: [
      {
        title: "O que acontece antes da sua escolha",
        paragraphs: [
          "O conteúdo principal, as fotografias, as fontes e a navegação são servidos sem carregar o mapa Google e sem autorizar diagnóstico opcional. Não encontrámos analytics, pixels de marketing ou publicidade no código carregado pelo site.",
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
        title: "Diagnóstico no ambiente de preview",
        paragraphs: [
          "O código reconhece hooks opcionais da Lovable usados para comunicar erros técnicos no editor/preview. Só os chama quando autoriza Diagnóstico e quando o próprio ambiente disponibiliza esses hooks. O site público não instala por si uma plataforma de analytics.",
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
      {
        name: "Hooks de erro Lovable",
        provider: "Lovable, quando presente no preview/editor",
        purpose: "Diagnosticar erros técnicos da aplicação.",
        duration: "Não é criado armazenamento pelo código do site; retenção do host por confirmar.",
        category: "Diagnóstico",
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
    updated: "Last updated: 14 October 2026",
    reference: "Reference version: 2026-10-14",
    sections: [
      {
        title: "What happens before your choice",
        paragraphs: [
          "The main content, photographs, fonts and navigation are served without loading Google Maps or enabling optional diagnostics. We found no analytics, marketing pixels or advertising in the code loaded by the site.",
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
        title: "Diagnostics in the preview environment",
        paragraphs: [
          "The code recognises optional Lovable hooks used to report technical errors in the editor/preview. It only calls them when you allow Diagnostics and the environment provides those hooks. The public site does not install an analytics platform itself.",
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
      {
        name: "Lovable error hooks",
        provider: "Lovable, when present in the preview/editor",
        purpose: "Diagnose technical application errors.",
        duration: "The site code creates no storage; host retention remains to be confirmed.",
        category: "Diagnostics",
      },
    ],
  },
};

export const whatsappUrl = "https://wa.me/351933776729";
export const mapsUrl = "https://share.google/uK5M3YaRHoAcBMNPD";
export const mapsEmbedUrl =
  "https://www.google.com/maps?q=Rua+V%C3%ADtor+Cordon+6A,+2675-459+Odivelas,+Portugal&output=embed";
export function pageMeta(path: PublicPath, language: Language, title: string, description: string) {
  return createPageHead({ path, language, title, description });
}
