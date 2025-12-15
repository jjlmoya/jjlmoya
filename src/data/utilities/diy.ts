import type { SectionData } from "./types";

export const diySection: SectionData = {
    title: "DIY",
    icon: "mdi:hand",
    theme: "blue",
    utilities: [
        {
            href: "/utilidades/calculadora-resina/",
            iconBg: "mdi:flask",
            iconFg: "mdi:calculator",
            title: "Calculadora de Resina",
            description: "Calcula volumen y mezcla exacta para proyectos epoxi sin desperdicios.",
            color: "#f59e0b"
        },
        {
            href: "/utilidades/calculadora-balustres/",
            iconBg: "mdi:ruler",
            iconFg: "mdi:view-week",
            title: "Calculadora de Balustres",
            description: "Distribución exacta de barrotes cumpliendo normativa.",
            color: "#2563eb"
        },
        {
            href: "/utilidades/morteros/",
            iconBg: "mdi:wall",
            iconFg: "mdi:calculator",
            title: "Calculadora de Morteros",
            description: "Proporciones exactas de cal y arena para enfoscados y revocos.",
            color: "#a855f7"
        }
    ]
};
