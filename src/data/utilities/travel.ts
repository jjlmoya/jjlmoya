import type { SectionData } from "./types";

export const travelSection: SectionData = {
    title: "Viajes y Aventura",
    icon: "mdi:map-marker-path",
    theme: "blue",
    utilities: [
        {
            title: "Calculadora de Equipaje",
            description: "Consulta las medidas y pesos permitidos para tu maleta de mano en más de 20 aerolíneas.",
            href: "/utilidades/calculadora-equipaje-aerolineas/",
            iconBg: "mdi:bag-suitcase",
            iconFg: "mdi:airplane",
            color: "#3b82f6",
        },
        {
            title: "Calculadora de Propinas",
            description: "Guía de etiqueta y porcentajes de propina recomendados para más de 50 países.",
            href: "/utilidades/calculadora-propinas-internacional/",
            iconBg: "mdi:cash-multiple",
            iconFg: "mdi:earth",
            color: "#10b981",
        },
    ],
};
