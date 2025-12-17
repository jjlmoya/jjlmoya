import type { SectionData } from "./types";

export const diySection: SectionData = {
    title: "DIY",
    icon: "mdi:hand",
    theme: "blue",
    utilities: [
        {
            href: "/utilidades/calculadora-arcilla/",
            iconBg: "mdi:pot",
            iconFg: "mdi:resize",
            title: "Calculadora de Arcilla",
            description: "Calcula la contracción de arcilla en secado y cocción para dimensiones exactas.",
            color: "#d97706"
        },
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
        },
        {
            href: "/utilidades/calculadora-passepartout/",
            iconBg: "mdi:crop-free",
            iconFg: "mdi:ruler",
            title: "Calculadora Passepartout",
            description: "Márgenes perfectos y corrección óptica para enmarcar tus obras.",
            color: "#6366f1"
        },
        {
            href: "/utilidades/optimizador-corte/",
            iconBg: "mdi:saw-blade",
            iconFg: "mdi:ruler-square",
            title: "Optimizador de Cortes",
            description: "Ahorra material. Calcula la mejor distribución de cortes para madera o metal.",
            color: "#f97316"
        }
    ]
};
