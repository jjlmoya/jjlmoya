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
        {
            title: "Calculadora de Distribución Normal",
            description: "Calcula probabilidades, cuantiles y puntuaciones Z de la campana de Gauss con visualización dinámica.",
            href: "/utilidades/calculadora-distribucion-normal/",
            iconBg: "mdi:chart-bell-curve-cumulative",
            iconFg: "mdi:sigma",
            color: "#8b5cf6",
        },
    ],
};
