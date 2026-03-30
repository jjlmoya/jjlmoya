import type { SectionData } from "./types";

export const statisticsSection: SectionData = {
    title: "Estadística y Probabilidad",
    slug: "estadistica",
    icon: "mdi:chart-bell-curve",
    theme: "indigo",
    utilities: [
        {
            title: "Calculadora de Tamaño de Muestra",
            description: "Calcula el número exacto de personas necesarias para tu estudio, con población finita/infinita y gráfico de sensibilidad.",
            href: "/utilidades/calculadora-tamano-muestra/",
            iconBg: "mdi:account-group",
            iconFg: "mdi:sigma",
            color: "#0ea5e9",
        },
        {
            title: "Calculadora de Correlación de Pearson",
            description: "Calcula el coeficiente r de Pearson, r² y la recta de regresión a partir de pares de datos.",
            href: "/utilidades/calculadora-correlacion-pearson/",
            iconBg: "mdi:chart-scatter-plot",
            iconFg: "mdi:calculator",
            color: "#6366f1",
        },
        {
            title: "Calculadora de Estadística Descriptiva",
            description: "Calcula al instante la media, mediana, moda, desviación típica y varianza de una lista masiva de datos.",
            href: "/utilidades/calculadora-estadistica-descriptiva/",
            iconBg: "mdi:chart-bar",
            iconFg: "mdi:sigma",
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
        {
            title: "Calculadora de Intervalo de Confianza",
            description: "Calcula el intervalo estimado de una población con su margen de error y niveles de confianza de hasta el 99.9%.",
            href: "/utilidades/calculadora-intervalo-confianza/",
            iconBg: "mdi:chart-bell-curve",
            iconFg: "mdi:percent",
            color: "#10b981",
        },
    ],
};
