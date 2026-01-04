import type { Application } from "../../types/apps";

export const fortuneCookie: Application = {
    slug: "galleta-de-la-fortuna",
    title: "Galleta de la Fortuna",
    subtitle: "Tu destino en un solo toque.",
    category: "Estilo de Vida / Juegos",
    theme: {
        primary: "#BF9F5A",
        primaryGradient: "linear-gradient(135deg, #BF9F5A 0%, #8C6E3D 100%)",
        accent: "#F2E5BD",
        fontHeading: "serif",
        radiusMain: "2.5rem",
        glowAccent: "rgba(191, 159, 90, 0.4)",
        headerTitleGradient: "linear-gradient(180deg, #f3e5ab 0%, #bf9f5a 100%)",
        textTitleGradient: "linear-gradient(180deg, #f3e5ab 0%, #bf9f5a 100%)",
        bgApp: "radial-gradient(circle at top, #1A1A1A 0%, #050505 100%)",
        bgSurface: "#0D0D0D",
        bgCard: "#141414",
        textMain: "#E5E5E5",
        glass: "rgba(20, 20, 20, 0.8)",
        glassBorderColor: "rgba(191, 159, 90, 0.15)",
        glassHighlight: "rgba(255, 255, 255, 0.03)",
        shadowPrimary: "0 10px 40px -12px rgba(191, 159, 90, 0.25)",
        shadowCard: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
    },
    tagline: "El azar es solo el principio.",
    description: "Hay secretos que solo se revelan una vez al día. Encuentra lo inalcanzable, colecciona lo efímero y domina tu racha en un ritual de búsqueda constante.",
    philosophy: "Esta no es una aplicación de fortuna; es un manifiesto contra lo previsible. En un mundo de ruido, te damos un solo toque al día para cazar lo que otros nunca verán: galletas que solo existen en la sombra y papeles que brillan como oro puro.",
    concept: {
        label: "El Manifiesto",
        main: "DOMINA",
        highlighted: "TU SUERTE."
    },
    benefitsTitle: {
        main: "¿Te atreves a",
        highlighted: "completarlo?"
    },
    quote: {
        text: "Lo que hoy es un mensaje, mañana será tu tesoro más valioso.",
        author: "El Galletario"
    },
    media: {
        icon: "/assets/apps/galleta-de-la-fortuna/icon.png",
        showcase: "/assets/apps/galleta-de-la-fortuna/showcase.png",
        hero: "/assets/apps/galleta-de-la-fortuna/hero_mystic.png",
        screenshots: [
            "/assets/apps/galleta-de-la-fortuna/screenshot_1.png"
        ]
    },
    stores: {
        googlePlay: "",
        appStore: ""
    },
    benefits: [
        {
            title: "Lo Inalcanzable",
            text: "Especies de galletas que solo aparecen cuando el mundo real coincide con el digital. ¿Estarás ahí en el momento justo?",
            icon: "mdi:incognito"
        },
        {
            title: "El Brillo del Destino",
            text: "Papeles de Oro, Jade y Negro. No son simples mensajes; son los trofeos de tu constancia y tu intuición.",
            icon: "mdi:shimmer"
        },
        {
            title: "La Racha Sagrada",
            text: "Tu galletario es un espejo de tu destino. Mantén la llama encendida cada día o deja que tus tesoros se desvanezcan.",
            icon: "mdi:fire"
        },
        {
            title: "Un Solo Toque",
            text: "Una sola oportunidad al día. Ni una más. La escasez hace que cada descubrimiento sea legendario.",
            icon: "mdi:touch-app"
        }
    ],
    features: [],
    highlights: []
};
