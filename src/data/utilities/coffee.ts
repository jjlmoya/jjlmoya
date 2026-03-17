import type { SectionData } from "./types";

export const coffeeSection: SectionData = {
    title: "Para los mas cafeteros",
    slug: "cafe",
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
        {
            href: "/utilidades/calculadora-agua-cafe-sca/",
            iconBg: "mdi:water-outline",
            iconFg: "mdi:flask-outline",
            title: "Calculadora de Agua SCA",
            description:
                "Calcula la mineralización ideal (Magnesio, Calcio, Bicarbonatos) para agua de café de especialidad según estándares SCA.",
            color: "#2d5a27",
        },
        {
            href: "/utilidades/conversor-molienda-cafe/",
            iconBg: "mdi:cog-transfer",
            iconFg: "mdi:coffee-maker-outline",
            title: "Conversor de Molienda",
            description:
                "Tabla comparativa para ajustar el punto de molienda (clics/niveles) entre diferentes métodos y molinos populares.",
            color: "#d35400",
        },
    ],
};
