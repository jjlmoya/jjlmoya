import type { SectionData } from "./types";

export const devSection: SectionData = {
    title: "Desarrollo Web",
    icon: "mdi:code-tags",
    theme: "indigo",
    utilities: [
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
        }
    ]
};
