import type { SectionData } from "./types";

export const natureSection: SectionData = {
    title: "Ciencia y Naturaleza",
    icon: "mdi:telescope",

    theme: "indigo",
    utilities: [
        {
            title: "Simulador de Cielo Oscuro",
            description: "Visualiza la escala de Bortle y el impacto de la contaminación lumínica en las estrellas.",
            href: "/utilidades/simulador-cielo-oscuro/",

            color: "#4f46e5",
            iconBg: "mdi:weather-night",
            iconFg: "mdi:telescope",
        },
        {
            title: "Calculadora de Siembra",
            description: "Calibra tu sembradora. Calcula el espaciado entre semillas basado en la población por hectárea.",
            href: "/utilidades/calculadora-siembra/",
            color: "#d97706",
            iconBg: "mdi:tractor",
            iconFg: "mdi:sprout",
        },
        {
            title: "Alcance de Telescopio",
            description: "Calculadora de magnitud límite. Descubre qué objetos celestes son visibles con tu equipo.",
            href: "/utilidades/alcance-telescopio/",
            color: "#6366f1",
            iconBg: "mdi:telescope",
            iconFg: "mdi:eye",
        },
    ],
};
