
import type { SectionData } from "./types";

export const creativeSection: SectionData = {
    title: "Creatividad & Ocio",
    icon: "mdi:palette",
    theme: "pink",
    utilities: [
        {
            href: "/utilidades/generador-excusas/",
            iconBg: "mdi:slot-machine",
            iconFg: "mdi:emoticon-poop",
            title: "Generador de Excusas",
            description: "Máquina de azar semántica para librarte de compromisos con estilo.",
            color: "#ec4899"
        },
        {
            href: "/utilidades/galleta-fortuna/",
            iconBg: "mdi:cookie",
            iconFg: "mdi:sparkles",
            title: "Galleta de la Fortuna",
            description: "Consulta tu destino diario y descubre tus números de la suerte.",
            color: "#f59e0b"
        },
        {
            href: "/utilidades/pintor-sinestesia/",
            iconBg: "mdi:brush",
            iconFg: "mdi:eye",
            title: "Pintor de Sinestesia",
            description: "Visualiza el color de las palabras según la sinestesia grafema-color.",
            color: "#8b5cf6"
        },
        {
            href: "/utilidades/generador-zalgo/",
            iconBg: "mdi:skull-outline",
            iconFg: "mdi:matrix",
            title: "Generador Zalgo",
            description: "Corrompe tus mensajes con cascadas de caracteres Unicode desbordantes.",
            color: "#9333ea"
        },
        {
            href: "/utilidades/generador-patrones-cuentas/",
            iconBg: "mdi:grid",
            iconFg: "mdi:palette",
            title: "Generador de Patrones",
            description: "Crea esquemas de pixel art y cuentas para Miyuki o Hama desde tus fotos.",
            color: "#db2777"
        }
    ]
};
