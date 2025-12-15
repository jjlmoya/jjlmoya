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
            href: "/utilidades/calculadora-resina/",
            iconBg: "mdi:flask",
            iconFg: "mdi:calculator",
            title: "Calculadora de Resina",
            description: "Calcula volumen y mezcla exacta para proyectos epoxi sin desperdicios.",
            color: "#f59e0b"
        }
    ]
};
