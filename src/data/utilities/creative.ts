
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
        }
    ]
};
