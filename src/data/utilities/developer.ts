import type { SectionData } from "./types";

export const devSection: SectionData = {
    title: "Desarrollo Web",
    icon: "mdi:code-tags",
    theme: "indigo",
    utilities: [
        {
            href: "/utilidades/cron/",
            iconBg: "mdi:clock-check",
            iconFg: "mdi:calendar-clock",
            title: "Generador de Cron",
            description: "Crea y traduce expresiones cron a lenguaje humano de forma visual.",
            color: "#8b5cf6"
        },
        {
            href: "/utilidades/json-formatter/",
            iconBg: "mdi:code-json",
            iconFg: "mdi:code-braces",
            title: "JSON Formatter",
            description: "Valida, repara y formatea JSON. Detección de errores en tiempo real.",
            color: "#d946ef"
        },
        {
            href: "/utilidades/keycode/",
            iconBg: "mdi:keyboard",
            iconFg: "mdi:keyboard-variant",
            title: "KeyCode Visualizer",
            description: "Visualiza códigos de teclas JavaScript en tiempo real.",
            color: "#8b5cf6"
        },
        {
            href: "/utilidades/calculadora-coste-llm/",
            iconBg: "mdi:robot",
            iconFg: "mdi:currency-usd",
            title: "Calculadora Costes LLM",
            description: "Estima el precio de tus proyectos con GPT-4, Claude y Gemini.",
            color: "#6366f1"
        },
        {
            href: "/utilidades/tipografia-musical/",
            iconBg: "mdi:music-note",
            iconFg: "mdi:format-size",
            title: "Tipografía Musical",
            description: "Calculadora de escalas modulares armónicas para jerarquías tipográficas perfectas.",
            color: "#6366f1"
        },
        {
            href: "/utilidades/generador-mockups-movil/",
            iconBg: "mdi:cellphone-screenshot",
            iconFg: "mdi:image-frame",
            title: "Generador Mockups Móviles",
            description: "Crea mockups profesionales de capturas para iPhone y Pixel con fondos personalizados.",
            color: "#8b5cf6"
        }
    ]
};
