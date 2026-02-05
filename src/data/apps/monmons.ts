import type { Application } from "../../types/apps";

export const monmons: Application = {
    slug: "monmons",
    title: "Monmons",
    subtitle: "Conecta con criaturas únicas.",
    category: "Juegos",
    isGame: true,
    theme: {
        primary: "hsl(102, 23%, 33%)",
        primaryGradient: "hsl(102, 23%, 33%)",
        accent: "hsl(81, 55%, 49%)",
        fontHeading: "'Inter', sans-serif",
        radiusMain: "12px",
        glowAccent: "0 0 15px hsla(81, 55%, 49%, 0.5)",
        headerTitleGradient: "hsl(102, 23%, 33%)",
        textTitleGradient: "hsl(102, 23%, 33%)",
        bgApp: "hsl(48, 25%, 89%)",
        bgSurface: "hsl(48, 25%, 89%)",
        bgCard: "hsl(48, 25%, 80%)",
        textMain: "hsl(102, 23%, 15%)",
        glass: "hsla(48, 25%, 89%, 0.9)",
        glassBorderColor: "hsla(102, 23%, 33%, 0.2)",
        glassHighlight: "rgba(255, 255, 255, 0.1)",
        shadowPrimary: "0 2px 10px hsla(81, 55%, 49%, 0.3)",
        shadowCard: "0 4px 20px hsla(102, 23%, 33%, 0.15)",
    },
    tagline: "",
    description:
        "Monmons es un RPG de gestión de monstruos en pixel art centrado en tu Base de Operaciones. Equilibra la exploración narrativa con desafíos de alto nivel en una experiencia retro-moderna optimizada para móvil.",
    philosophy:
        "Foco absoluto en la estrategia de combate y el entrenamiento. Un sistema de tipos refinado y una progresión directa donde el crecimiento de tus Monmons es el único protagonista.",
    concept: {
        label: "ADN Competitivo",
        main: "MAESTRÍA",
        highlighted: "TÁCTICA",
    },
    benefitsTitle: {
        main: "Entrena,",
        highlighted: "Evoluciona y Domina.",
    },
    quote: {
        text: "Un tributo táctico a la era dorada del pixel art, donde cada evolución cuenta una historia de maestría.",
        author: "jjlmoya",
    },
    media: {
        icon: "/assets/apps/monmons/icon.webp",
        showcase: "/assets/apps/monmons/showcase.webp",
        hero: "/assets/apps/monmons/hero.webp",
        screenshots: ["/assets/apps/monmons/screenshot_real.webp"],
    },
    stores: {
        googlePlay: "",
        appStore: "",
    },
    benefits: [
        {
            title: "Base de Operaciones",
            text: "Tu centro personalizable que evoluciona y se expande mientras progresas en la historia y los desafíos.",
            icon: "mdi:home-modern",
        },
        {
            title: "Torre Infinita",
            text: "Pon a prueba tu fuerza y resistencia en combates constantes que desafían tus límites.",
            icon: "mdi:tournament",
        },
        {
            title: "Expediciones",
            text: "La clave para el crecimiento: vincula y recluta nuevos Monmons para completar tu equipo.",
            icon: "mdi:map-search",
        },
        {
            title: "Torneo de Élite",
            text: "Compite por la gloria máxima y corónate como el gran campeón del mundo Monmon.",
            icon: "mdi:trophy",
        },
    ],
    features: [
        {
            title: "Historia Principal",
            text: "Sumérgete en un mundo narrativo vibrante con un lore propio por descubrir.",
            icon: "mdi:book-open-page-variant",
        },
        {
            title: "Entrenamiento",
            text: "Potencia las estadísticas de tus criaturas mediante objetos y actividades dentro del campamento.",
            icon: "mdi:weight-lifter",
        },
        {
            title: "Equipo",
            text: "Gestiona y personaliza tu alineación ideal para cada desafío.",
            icon: "mdi:account-group",
        },
        {
            title: "Arte Pixel Art",
            text: "Estética retro-moderna con ilustraciones cuidadas y criaturas vibrantes.",
            icon: "mdi:palette",
        },
    ],
    highlights: [
        {
            label: "Visual",
            value: "Pixel Art",
        },
        {
            label: "Combate",
            value: "Elemental",
        },
    ],
    videos: [],
    bannerText: "Una nueva forma de coleccionar. Prepárate para el campamento Monmon.",
    hasDetailPage: true,
    roadmap: {
        statusLabel: "En Desarrollo",
        statusType: "developing",
        progress: 40,
        tasks: [
            { name: "Concepto y Lore", status: "done" },
            { name: "Gestión de Campamento y Recursos", status: "done" },
            { name: "Integración de HUD y UI (Menús)", status: "done" },
            { name: "Prototipado de Interacciones", status: "pending" },
            { name: "Diseño de Monmons (Generación 1)", status: "pending" },
            { name: "Mecánicas de Exploración Móvil", status: "pending" },
            { name: "Sistema de Misiones y Logros", status: "pending" },
            { name: "Balance de Experiencia", status: "pending" },
            { name: "QA y Beta Cerrada", status: "pending" },
            { name: "Lanzamiento Global", status: "pending" },
        ],
    },
};
