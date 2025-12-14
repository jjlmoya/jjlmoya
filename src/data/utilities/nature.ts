import type { SectionData } from "./types";

export const natureSection: SectionData = {
    title: "Ciencia y Naturaleza",
    icon: "mdi:telescope",

    theme: "indigo",
    utilities: [
        {
            title: "Simulador de Cielo Oscuro",
            description: "Visualiza la escala de Bortle y el impacto de la contaminación lumínica en las estrellas.",
            href: "/utilidades/simulador-cielo-oscuro",

            color: "#4f46e5",
            iconBg: "mdi:weather-night",
            iconFg: "mdi:telescope",
        },
    ],
};
