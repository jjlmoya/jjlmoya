import type { Application } from "../../types/apps";

export const lexiCrash: Application = {
    slug: "lexi-crash",
    title: "LexiCrash",
    subtitle: "Forma palabras, supera retos y evita el colapso.",
    category: "Juegos / Puzle / Agilidad Mental",
    theme: {
        primary: "#00D2FF",
        primaryGradient: "linear-gradient(135deg, #00D2FF 0%, #007AFF 100%)",
        accent: "#00EBFF",
        fontHeading: "sans-serif",
        radiusMain: "1.5rem",
        glowAccent: "rgba(0, 210, 255, 0.4)",
        headerTitleGradient: "linear-gradient(180deg, #FFFFFF 0%, #00D2FF 100%)",
        textTitleGradient: "linear-gradient(180deg, #FFFFFF 0%, #00D2FF 100%)",
        bgApp: "radial-gradient(circle at top, #001A2C 0%, #000B14 100%)",
        bgSurface: "#00121F",
        bgCard: "#001A2C",
        textMain: "#E5F7FF",
        glass: "rgba(0, 26, 44, 0.8)",
        glassBorderColor: "rgba(0, 210, 255, 0.15)",
        glassHighlight: "rgba(255, 255, 255, 0.03)",
        shadowPrimary: "0 10px 40px -12px rgba(0, 210, 255, 0.25)",
        shadowCard: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    },
    tagline: "Combina letras, forma palabras y evita el colapso.",
    description:
        "LexiCrash es un ecosistema de juegos de palabras diseñado para poner a prueba tu agilidad mental y vocabulario bajo diferentes mecánicas. Desde la presión del modo arcade hasta la lógica de los retos diarios, el juego ofrece múltiples formas de interactuar con el tablero.",
    philosophy:
        "LexiCrash ofrece una interfaz limpia y optimizada para una respuesta táctil inmediata. Sin distracciones innecesarias, el enfoque está totalmente en la jugabilidad y la agilidad visual. El catálogo de modos de juego se actualiza periódicamente para ofrecer nuevos retos mecánicos a la comunidad.",
    concept: {
        label: "El Desafío",
        main: "DOMINA EL",
        highlighted: "VOCABULARIO.",
    },
    benefitsTitle: {
        main: "Supera todos los",
        highlighted: "modos de juego",
    },
    quote: {
        text: "La agilidad mental es el puente entre el caos de las letras y la victoria de las palabras.",
        author: "LexiCrash Team",
    },
    media: {
        icon: "/assets/apps/lexi-crash/icon.webp",
        showcase: "/assets/apps/lexi-crash/showcase.webp",
        hero: "/assets/apps/lexi-crash/screenshot_2.webp",
        screenshots: [
            "/assets/apps/lexi-crash/screenshot_2.webp",
            "/assets/apps/lexi-crash/screenshot_3.webp",
        ],
    },
    stores: {
        googlePlay: "",
        appStore: "",
    },
    benefits: [
        {
            title: "Modo Crash",
            text: "El desafío insignia. Las letras caen sin pausa y debes formar palabras para despejar el tablero antes de que alcancen el límite.",
            icon: "mdi:lightning-bolt",
        },
        {
            title: "Modo Relax",
            text: "Concentración sin límites de tiempo. Resuelve el tablero mediante lógica y estrategia sin la presión de la caída constante.",
            icon: "mdi:emoticon-happy",
        },
        {
            title: "Palabra del Día",
            text: "Un reto global diario. Encuentra la palabra secreta en un formato de deducción único para todos los jugadores.",
            icon: "mdi:calendar-star",
        },
        {
            title: "Retos y Progresión",
            text: "Sistema de Retos Fijos diseñados para testear habilidades específicas en configuraciones de tablero determinadas.",
            icon: "mdi:trophy",
        },
    ],
    features: [
        {
            title: "Estadísticas Detalladas",
            text: "Panel para monitorizar tu evolución, récords personales y análisis de rendimiento por cada modo.",
        },
        {
            title: "Interfaz Optimizada",
            text: "Experiencia táctil inmediata y enfocada totalmente en la agilidad visual y jugabilidad.",
        },
        {
            title: "Actualizaciones Regulares",
            text: "Nuevos modos de juego y retos mecánicos añadidos periódicamente para la comunidad.",
        },
    ],
    highlights: [],
    videos: [],
    bannerText: "Próximamente: LexiCrash llegará muy pronto a las tiendas de aplicaciones.",
    hasDetailPage: true,
    roadmap: {
        statusLabel: "Próximamente en Stores",
        statusType: "developing",
        progress: 95,
        tasks: [
            { name: "Desarrollo Core", status: "done" },
            { name: "Modos de Juego (Crash, Relax, Daily)", status: "done" },
            { name: "Sistema de Retos", status: "done" },
            { name: "Pulido y UI/UX", status: "done" },
            { name: "Publicación en Stores", status: "active" },
        ],
    },
};
