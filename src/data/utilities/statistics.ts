import type { SectionData } from "./types";

export const statisticsSection: SectionData = {
    title: "Estadística y Probabilidad",
    slug: "estadistica",
    icon: "mdi:chart-bell-curve",
    theme: "indigo",
    utilities: [
        {
            title: "Calculadora de Correlación de Pearson",
            description: "Calcula el coeficiente r de Pearson, r² y la recta de regresión a partir de pares de datos.",
            href: "/utilidades/calculadora-correlacion-pearson/",
            iconBg: "mdi:chart-scatter-plot",
            iconFg: "mdi:calculator",
            color: "#6366f1",
        },
    ],
};
