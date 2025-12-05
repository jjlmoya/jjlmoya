import type { SectionData } from "./types";

export const financeSection: SectionData = {
    title: "Finanzas",
    icon: "mdi:finance",
    theme: "emerald",
    utilities: [
        {
            title: "Interés Compuesto",
            description: "La octava maravilla del mundo. Visualiza el poder de la reinversión.",
            href: "/utilidades/interes-compuesto/",
            iconBg: "mdi:finance",
            iconFg: "mdi:chart-line-variant",
            color: "#10b981"
        },
        {
            title: "Simulador Hipoteca",
            description: "Evita sorpresas. Calcula tu cuota y tabla de amortización.",
            href: "/utilidades/hipoteca/",
            iconBg: "mdi:home-city-outline",
            iconFg: "mdi:calculator-variant",
            color: "#6366f1"
        },
        {
            title: "Inflación Histórica",
            description: "¿Cuánto vale tu dinero realmente? Simulador de 1980 a 2025.",
            href: "/utilidades/inflacion/",
            iconBg: "mdi:chart-line-stacked",
            iconFg: "mdi:cash-clock",
            color: "#f59e0b"
        }
    ]
};
