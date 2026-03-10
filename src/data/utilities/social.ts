import type { SectionData } from "./types";

export const socialSection: SectionData = {
    title: "Redes Sociales",
    icon: "mdi:share-variant",
    theme: "pink",
    utilities: [
        {
            href: "/utilidades/simulador-redes/",
            iconBg: "mdi:layers-triple",
            iconFg: "mdi:phone-rotate-portrait",
            title: "Social Safe Zones",
            description: "Simulador de interfaces para fotos y videos en TikTok, Reels y Shorts.",
            color: "#f43f5e",
        },
        {
            href: "/utilidades/extractor-miniaturas-youtube/",
            iconBg: "mdi:youtube",
            iconFg: "mdi:image-search",
            title: "Extractor de Miniaturas",
            description:
                "Descarga las portadas de videos de YouTube en Máxima Calidad usando solo la URL.",
            color: "#ef4444",
        },
        {
            href: "/utilidades/previsualizador-miniaturas-youtube/",
            iconBg: "mdi:youtube",
            iconFg: "mdi:eye-check",
            title: "Previsualizador de Miniaturas",
            description: "Visualiza tus miniaturas en el feed de YouTube (Móvil vs Desktop) con modo oscuro y claro.",
            color: "#ef4444",
        },
        {
            href: "/utilidades/calculadora-valor-cuenta-redes-sociales/",
            iconBg: "mdi:currency-usd",
            iconFg: "mdi:instagram",
            title: "Calculadora Valor de Cuenta",
            description: "Calcula el precio de tus publicaciones patrocinadas basado en seguidores, engagement y nicho.",
            color: "#3b82f6",
        },
        {
            href: "/utilidades/formateador-reddit/",
            iconBg: "mdi:reddit",
            iconFg: "mdi:format-text-rotation-none",
            title: "Formateador para Reddit",
            description:
                "Limpia y adapta textos para Reddit y foros. Convierte saltos de linea y elimina formatos.",
            color: "#ff4500",
        },
    ],
};
