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
        {
            title: "Generador de Checklist de Maleta",
            description: "Checklist interactivo de equipaje basado en el destino, duración y motivos de viaje.",
            href: "/utilidades/generador-checklist-maleta/",
            iconBg: "mdi:clipboard-check",
            iconFg: "mdi:bag-suitcase",
            color: "#8b5cf6",
        },
        {
            href: "/utilidades/pronostico-mini-aventuras/",
            iconBg: "mdi:compass",
            iconFg: "mdi:map-marker-path",
            title: "Mini Aventuras",
            description:
                "Generador aleatorio de retos diarios para romper la monotonía y explorar tu entorno.",
            color: "#6366f1",
        },
    ],
};
