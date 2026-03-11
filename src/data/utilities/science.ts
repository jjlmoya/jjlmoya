import type { SectionData } from "./types";

export const scienceSection: SectionData = {
    title: "Ciencia",
    icon: "mdi:flask",
    theme: "cyan",
    utilities: [
        {
            href: "/utilidades/contador-colonias/",
            iconBg: "mdi:bacteria",
            iconFg: "mdi:counter",
            title: "Contador de Colonias",
            description:
                "Conteo digital de UFC en placas de Petri. Diferencia tipos y evita errores.",
            color: "#14b8a6",
        },
        {
            title: "Simulador de Cielo Oscuro",
            description:
                "Visualiza la escala de Bortle y el impacto de la contaminación lumínica en las estrellas.",
            href: "/utilidades/simulador-cielo-oscuro/",
            color: "#4f46e5",
            iconBg: "mdi:weather-night",
            iconFg: "mdi:telescope",
        },
        {
            title: "Alcance de Telescopio",
            description:
                "Calculadora de magnitud límite. Descubre qué objetos celestes son visibles con tu equipo.",
            href: "/utilidades/alcance-telescopio/",
            color: "#6366f1",
            iconBg: "mdi:telescope",
            iconFg: "mdi:eye",
        },
        {
            href: "/utilidades/simulador-impacto-asteroide/",
            iconBg: "mdi:meteor",
            iconFg: "mdi:earth",
            title: "Simulador de Impacto de Asteroides",
            description:
                "Calcula los efectos de un impacto cósmico. Energía, cráter, radiación y veredicto de supervivencia.",
            color: "#f97316",
        },
        {
            href: "/utilidades/detector-microondas/",
            iconBg: "mdi:microwave",
            iconFg: "mdi:wifi-strength-alert-outline",
            title: "Detector de Microondas",
            description: "Mide interferencias RF de tu cocina usando WiFi.",
            color: "#e11d48",
        },
        {
            title: "Probabilidad de Simulación",
            description:
                "¿Vivimos en una simulación? Estima las posibilidades según el argumento de Nick Bostrom.",
            href: "/utilidades/calculadora-probabilidad-simulacion/",
            color: "#00f2ff",
            iconBg: "mdi:matrix",
            iconFg: "mdi:monitor-cellphone",
        },
        {
            href: "/utilidades/calculadora-renovacion-celular/",
            iconBg: "mdi:atom",
            iconFg: "mdi:dna",
            title: "Renovación Celular",
            description: "Calcula cuánto de ti es 'nuevo' mediante la tasa de recambio atómico.",
            color: "#f43f5e",
        },
    ],
};
