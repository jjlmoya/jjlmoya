import type { Application } from "../../types/apps";

export const fastTask: Application = {
    slug: "fast-task",
    title: "Fast Task",
    subtitle: "Gestión de tareas y GTD ágil",
    category: "Productividad / Utilidades",
    isGame: false,
    theme: {
        primary: "#04D991",
        primaryGradient: "linear-gradient(135deg, #0d1318 0%, #04D991 100%)",
        accent: "#04D991",
        radiusMain: "1.5rem",
        glowAccent: "rgba(4, 217, 145, 0.4)",
        headerTitleGradient: "linear-gradient(180deg, #FFFFFF 0%, #04D991 100%)",
        textTitleGradient: "linear-gradient(180deg, #FFFFFF 0%, #04D991 100%)",
        bgApp: "radial-gradient(circle at top, #0d1318 0%, #05080a 100%)",
        bgSurface: "#0d1318",
        bgCard: "#141c23",
        textMain: "#E5FFF4",
        glass: "rgba(13, 19, 24, 0.8)",
        glassBorderColor: "rgba(255, 255, 255, 0.1)",
        glassHighlight: "rgba(255, 255, 255, 0.03)",
        shadowPrimary: "0 10px 40px -12px rgba(4, 217, 145, 0.25)",
        shadowCard: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    },
    tagline: "Escribe. Envía. Olvida. Paz.",
    description:
        "Captura bug, ideas o tareas en 3 segundos. Envía notas a GitHub, Make o Linear mediante interfaz de chat. Sin fricción: escribe, envía y olvida. Productividad pura.",
    philosophy:
        "Fast-Task no es un gestor de proyectos pesado. Es tu canal de entrada ultra-rápido para que nada interrumpa tu foco.",
    concept: {
        label: "La Filosofía",
        main: "CERO FRICCIÓN,",
        highlighted: "VELOCIDAD ABSOLUTA.",
    },
    benefitsTitle: {
        main: "Optimiza tu flujo de",
        highlighted: "trabajo diario",
    },
    quote: {
        text: "La mejor tarea es la que se captura en un segundo y se resuelve en el momento justo.",
        author: "Fast Task Team",
    },
    media: {
        icon: "/assets/apps/fast-task/icon.webp",
        showcase: "/assets/apps/fast-task/feature-graphic.webp",
        hero: "/assets/apps/fast-task/1.webp",
        screenshots: [
            "/assets/apps/fast-task/1.webp",
            "/assets/apps/fast-task/2.webp",
            "/assets/apps/fast-task/3.webp",
            "/assets/apps/fast-task/4.webp",
            "/assets/apps/fast-task/5_split.webp",
            "/assets/apps/fast-task/6_features.webp",
        ],
    },
    stores: {
        googlePlay: "https://play.google.com/store/apps/details?id=com.gamebob.fasttask",
        appStore: "",
    },
    price: "4,95€",
    benefits: [
        {
            title: "Captura en 3 segundos",
            text: "Funciona como un chat: llegas, escribes y envías. Sin formularios, sin campos obligatorios.",
            icon: "mdi:lightning-bolt",
        },
        {
            title: "Integraciones Pro",
            text: "Conecta tus proyectos directamente con GitHub, Linear o Make.",
            icon: "mdi:connection",
        },
        {
            title: "Privacidad Radical",
            text: "Tus tokens y tus tareas viven en tu dispositivo. Sin servidores intermedios, sin rastreo.",
            icon: "mdi:shield-check",
        },
        {
            title: "Modo Offline-First",
            text: "Envía tus tareas incluso sin cobertura. La app se encarga de sincronizarlas en segundo plano cuando vuelvas a estar online.",
            icon: "mdi:wifi-off",
        },
    ],
    features: [
        {
            title: "Captura instantánea sin formularios",
            text: "La interfaz de chat convierte el móvil en el canal de entrada más rápido de tu flujo de trabajo.",
        },
        {
            title: "Integraciones con tus herramientas",
            text: "GitHub, Linear o Make. Crea issues, tareas o dispara automatizaciones de un solo mensaje.",
        },
        {
            title: "Organizador de proyectos local",
            text: "Crea proyectos para separar contextos: trabajo, clientes, ideas personales o desarrollo.",
        },
    ],
    highlights: [
        { label: "Velocidad", value: "<3s" },
        { label: "Integraciones", value: "Nativas" },
        { label: "Offline", value: "First" },
    ],
    videos: [],
    bannerText: "Fast Task: Disponible pronto en todas las plataformas.",
    hasDetailPage: true,
    roadmap: {
        statusLabel: "Lanzamiento Inminente",
        statusType: "released",
        progress: 100,
        tasks: [
            { name: "Desarrollo Core", status: "done" },
            { name: "Integración GitHub", status: "done" },
            { name: "Integración Make", status: "done" },
            { name: "Integración Linear", status: "done" },
            { name: "Pulido Final UI", status: "done" },
            { name: "Lanzamiento en Beta", status: "done" },
        ],
    },
};
