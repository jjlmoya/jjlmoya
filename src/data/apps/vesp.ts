import type { Application } from "../../types/apps";

export const vesp: Application = {
    slug: "vesp",
    title: "VESP: Equilibrador de Cócteles",
    subtitle: "Mixología: Balance y Recetas",
    category: "Food & Drink / Professional Tools",
    isGame: false,
    theme: {
        primary: "#DAA520", 
        primaryGradient: "linear-gradient(135deg, hsl(38, 90%, 55%) 0%, hsl(20, 80%, 45%) 100%)",
        accent: "hsl(160, 85%, 40%)",
        radiusMain: "16px",
        glowAccent: "rgba(218, 165, 32, 0.3)",
        headerTitleGradient: "linear-gradient(180deg, hsl(38, 90%, 55%) 0%, hsl(38, 100%, 75%) 100%)",
        textTitleGradient: "linear-gradient(180deg, hsl(38, 90%, 55%) 0%, hsl(38, 100%, 75%) 100%)",
        bgApp: "hsl(229, 100%, 4%)",
        bgSurface: "hsl(230, 25%, 12%)",
        bgCard: "hsl(230, 25%, 12%)",
        textMain: "hsl(40, 20%, 98%)",
        glass: "rgba(15, 23, 42, 0.85)",
        glassBorderColor: "rgba(218, 165, 32, 0.15)",
        glassHighlight: "rgba(255, 255, 255, 0.03)",
        shadowPrimary: "0 10px 25px -5px rgba(218, 165, 32, 0.3)",
        shadowCard: "0 12px 40px rgba(0, 0, 0, 0.6)",
    },
    tagline: "Mixología: Balance y Recetas",
    description:
        "Calculadora de balance, ABV, Brix y recetas clásicas de coctelería profesional.",
    philosophy:
        "Eleva la consistencia de tu barra con VESP: Equilibrador de Cócteles, la herramienta técnica definitiva para bartenders y aficionados a la mixología que buscan la perfección científica en cada copa.",
    concept: {
        label: "Precisión en la Barra",
        main: "TÉCNICA DE,",
        highlighted: "CALIDAD.",
    },
    benefitsTitle: {
        main: "Estética y precisión",
        highlighted: "en cada servicio",
    },
    media: {
        icon: "/assets/apps/vesp/icon.webp",
        showcase: "/assets/apps/vesp/home-mockup.webp",
        hero: "/assets/apps/vesp/home-mockup.webp",
        screenshots: [
            "/assets/apps/vesp/home-mockup.webp",
            "/assets/apps/vesp/mixer-mockup.webp",
            "/assets/apps/vesp/library-mockup.webp",
            "/assets/apps/vesp/ingredients-mockup.webp",
            "/assets/apps/vesp/settings-mockup.webp",
        ],
    },
    stores: {},
    price: "Gratis",
    benefits: [
        {
            title: "Equilibrio Científico",
            text: "Cálculos exactos entre alcohol, azúcar y acidez.",
            icon: "mdi:flask-outline",
        },
        {
            title: "Calibración de Dilución",
            text: "Ajuste por técnica: Shake, Stir o Directo.",
            icon: "mdi:water-percent",
        },
        {
            title: "Biblioteca Real",
            text: "70+ clásicos con datos fisicoquímicos.",
            icon: "mdi:book-open-variant",
        },
        {
            title: "Creador",
            text: "Diseña y guarda tus propias firmas.",
            icon: "mdi:creation",
        },
    ],
    features: [
        {
            title: "Balance ABV/Brix",
            text: "Controla la densidad y el grado alcohólico.",
        },
        {
            title: "Sin Registros",
            text: "Privacidad total local sin conexión.",
        },
        {
            title: "Modo Barra",
            text: "Lectura rápida bajo luces tenues.",
        },
    ],
    highlights: [
        { label: "Classics", value: "70+" },
        { label: "Price", value: "Gratis" },
    ],
    roadmap: {
        statusLabel: "Próximamente",
        statusType: "developing",
        progress: 95,
        tasks: [
            { name: "Cálculo técnico", status: "done" },
            { name: "Motor Dilución", status: "done" },
            { name: "Publicación", status: "active" },
        ],
    },
};
