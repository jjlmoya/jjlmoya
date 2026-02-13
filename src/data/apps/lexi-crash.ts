import type { Application } from "../../types/apps";

export const lexiCrash: Application = {
    slug: "lexi-crash",
    title: "LexiCrash",
    subtitle: "Forma palabras, supera retos y evita el colapso.",
    category: "Juegos / Puzle / Agilidad Mental",
    isGame: true,
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
    tagline: "El Tetris de las palabras ha llegado.",
    description:
        "Pon a prueba tu agilidad mental en el puzzle de palabras definitivo. Combina letras a toda velocidad, supera retos globales y evita que el tablero colapse. ¿Serás capaz de dominar el caos?",
    philosophy:
        "LexiCrash no es solo un juego de palabras; es una prueba de reflejos y estrategia visual. Hemos diseñado una experiencia táctil pura, donde cada milisegundo cuenta y la satisfacción de una palabra bien formada se siente en cada animación.",
    concept: {
        label: "La Experiencia",
        main: "DOMINA EL CAOS,",
        highlighted: "LIBERA LAS PALABRAS.",
    },
    benefitsTitle: {
        main: "Supera tus propios",
        highlighted: "límites mentales",
    },
    quote: {
        text: "La agilidad mental es el puente entre el caos de las letras y la victoria de las palabras.",
        author: "LexiCrash Team",
    },
    media: {
        icon: "/assets/apps/lexi-crash/icon.webp",
        showcase: "/assets/apps/lexi-crash/icon.webp",
        hero: "/assets/apps/lexi-crash/screenshot_2.webp",
        screenshots: [
            "/assets/apps/lexi-crash/screenshot_2.webp",
            "/assets/apps/lexi-crash/screenshot_3.webp",
            "/assets/apps/lexi-crash/screenshot_1.webp",
        ],
    },
    stores: {
        googlePlay: "https://play.google.com/store/apps/details?id=com.gamebob.lexicrash",
        appStore: "",
    },
    benefits: [
        {
            title: "Modo Crash",
            text: "Adrenalina pura. Las letras caen sin pausa. Despeja el tablero antes de que el colapso sea inevitable.",
            icon: "mdi:lightning-bolt",
        },
        {
            title: "Modo Relax",
            text: "Estrategia sin presión. Tómate tu tiempo para encontrar las palabras más complejas y limpiar el tablero.",
            icon: "mdi:weather-sunny",
        },
        {
            title: "Reto Diario",
            text: "Una palabra, un tablero, todo el mundo. Compite cada día en el formato de deducción global.",
            icon: "mdi:calendar-star",
        },
        {
            title: "Maestría Visual",
            text: "Interfaz optimizada para una respuesta táctil inmediata y una estética neon inmersiva.",
            icon: "mdi:eye",
        },
    ],
    features: [
        {
            title: "Progresión Personal",
            text: "Visualiza tu evolución, rompe tus propios récords y conviértete en un maestro del vocabulario.",
        },
        {
            title: "Retos de Comunidad",
            text: "Únete a miles de jugadores en los desafíos diarios y demuestra quién tiene el léxico más rápido.",
        },
        {
            title: "Modos en Expansión",
            text: "Actualizaciones periódicas con nuevas mecánicas y tableros diseñados para testear tu ingenio.",
        },
    ],
    highlights: [
        { label: "Jugadores", value: "+10k" },
        { label: "Palabras", value: "+1M" },
        { label: "Rating", value: "4.8" },
    ],
    videos: [],
    bannerText: "¡LexiCrash ya disponible en Google Play!",
    hasDetailPage: true,
    roadmap: {
        statusLabel: "Disponible en Google Play",
        statusType: "released",
        progress: 98,
        tasks: [
            { name: "Desarrollo Core", status: "done" },
            { name: "Modos de Juego (Crash, Relax, Daily)", status: "done" },
            { name: "Sistema de Retos", status: "done" },
            { name: "Pulido y UI/UX", status: "done" },
            { name: "Publicación en Stores (Android)", status: "done" },
            { name: "Publicación en Stores (iOS)", status: "active" },
        ],
    },
};
