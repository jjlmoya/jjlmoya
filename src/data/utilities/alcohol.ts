import type { SectionData } from "./types";

export const alcoholSection: SectionData = {
    title: "Alcohol & Party",
    icon: "mdi:glass-mug-variant",
    theme: "purple",
    utilities: [
        {
            href: "/utilidades/equilibrador-cocteles/",
            iconBg: "mdi:glass-cocktail",
            iconFg: "mdi:fruit-citrus",
            title: "Simulador de Cócteles",
            description: "Analiza la Ley del Sour y visualiza el equilibrio químico de tus mezclas.",
            color: "#10b981"
        },
        {
            href: "/utilidades/calculadora-enfriamiento-cerveza/",
            iconBg: "mdi:snowflake-thermometer",
            iconFg: "mdi:beer",
            title: "Enfriador de Bebidas",
            description: "Termodinámica líquida. Calcula cuándo tu bebida estará en el punto exacto de congelación.",
            color: "#f59e0b"
        },
        {
            href: "/utilidades/calculadora-barriles-fiesta/",
            iconBg: "mdi:keg",
            iconFg: "mdi:snowflake",
            title: "Calculadora de Fiesta",
            description: "Estima cerveza y hielo necesarios basándose en invitados y temperatura ambiente.",
            color: "#F59E0B"
        }
    ]
};
