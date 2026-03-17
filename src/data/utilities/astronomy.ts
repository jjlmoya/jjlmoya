import type { SectionData } from "./types";

export const astronomySection: SectionData = {
    title: "Astronomía",
    slug: "astronomia",
    icon: "mdi:telescope",
    theme: "indigo",
    utilities: [
        {
            title: "Simulador de Cielo Oscuro",
            description: "Visualiza la escala de Bortle y el impacto de la contaminación lumínica.",
            href: "/utilidades/simulador-cielo-oscuro/",
            color: "#4f46e5",
            iconBg: "mdi:weather-night",
            iconFg: "mdi:telescope",
        },
        {
            title: "Alcance de Telescopio",
            description: "Calculadora de magnitud límite. Descubre qué objetos son visibles con tu equipo.",
            href: "/utilidades/alcance-telescopio/",
            color: "#6366f1",
            iconBg: "mdi:telescope",
            iconFg: "mdi:eye",
        },
        {
            href: "/utilidades/calculadora-regla-500/",
            iconBg: "mdi:star-shooting",
            iconFg: "mdi:timer-sand",
            title: "Regla de los 500",
            description: "Calcula el tiempo de exposición máximo antes de que las estrellas dejen de ser puntos.",
            color: "#f59e0b",
        },
        {
            href: "/utilidades/calculadora-resolucion-telescopio/",
            iconBg: "mdi:telescope",
            iconFg: "mdi:flare",
            title: "Límite de Dawes",
            description: "Calcula la resolución máxima y el detalle de tu telescopio.",
            color: "#a855f7",
        },
    ],
};
