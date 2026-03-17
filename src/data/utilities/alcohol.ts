import type { SectionData } from "./types";

export const alcoholSection: SectionData = {
    title: "Alcohol & Party",
    slug: "alcohol",
    icon: "mdi:glass-mug-variant",
    theme: "purple",
    utilities: [
        {
            href: "/utilidades/equilibrador-cocteles/",
            iconBg: "mdi:glass-cocktail",
            iconFg: "mdi:fruit-citrus",
            title: "Simulador de Cócteles",
            description:
                "Mixología Molecular. Analiza la Ley del Sour y el equilibrio químico de tus mezclas.",
            color: "#10b981",
        },
        {
            href: "/utilidades/calculadora-enfriamiento-cerveza/",
            iconBg: "mdi:snowflake-thermometer",
            iconFg: "mdi:beer",
            title: "Enfriador de Bebidas",
            description:
                "Termodinámica líquida. Evita que las botellas exploten en el congelador con cálculos térmicos precisos.",
            color: "#f59e0b",
        },
        {
            href: "/utilidades/calculadora-barriles-fiesta/",
            iconBg: "mdi:keg",
            iconFg: "mdi:snowflake",
            title: "Calculadora de Fiesta",
            description:
                "Estima cerveza y hielo necesarios basándose en invitados y temperatura ambiente.",
            color: "#F59E0B",
        },
        {
            href: "/utilidades/calculadora-carbonatacion/",
            iconBg: "mdi:bottle-soda-classic",
            iconFg: "mdi:water-opacity",
            title: "Carbonatación Perfecta",
            description:
                "Visualiza y calcula el priming exacto para Stouts, IPAs y Lagers sin riesgo de explosión.",
            color: "#D97706",
        },
        {
            href: "/utilidades/calculadora-alcohol-resaca/",
            iconBg: "mdi:glass-wine",
            iconFg: "mdi:pill",
            title: "Predictor de Resaca",
            description: "Calculadora de metabolismo de alcohol e hidratación basada en la fórmula de Widmark.",
            color: "#a855f7",
        },
    ],
};
