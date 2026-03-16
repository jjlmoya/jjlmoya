import type { SectionData } from "./types";

export const coffeeSection: SectionData = {
    title: "Para los mas cafeteros",
    icon: "mdi:coffee",
    theme: "amber",
    utilities: [
        {
            href: "/utilidades/calculadora-ratio-cafe/",
            iconBg: "mdi:coffee",
            iconFg: "mdi:water-outline",
            title: "Calculadora Brew Ratio",
            description:
                "Calcula los gramos exactos de cafe o el agua ideal segun tu ratio (1:15, 1:16...). Resultado en taza real incluido.",
            color: "#b5651d",
        },
        {
            href: "/utilidades/cronometro-cafe/",
            iconBg: "mdi:timer-outline",
            iconFg: "mdi:coffee-outline",
            title: "Cronometro para Cafe",
            description:
                "Temporizador con fases de vertido (bloom/pour) y avisos sonoros para baristas y amantes del cafe de filtro.",
            color: "#d97706",
        },
    ],
};
