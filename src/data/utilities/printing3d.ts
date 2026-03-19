import type { SectionData } from "./types";

export const printing3dSection: SectionData = {
    title: "Impresión 3D",
    slug: "impresion-3d",
    icon: "mdi:printer-3d",
    theme: "orange",
    utilities: [
        {
            href: "/utilidades/calculadora-coste-impresion-3d/",
            iconBg: "mdi:currency-usd",
            iconFg: "mdi:printer-3d",
            title: "Coste de Impresión 3D",
            description: "Calcula el precio real de tus piezas incluyendo material, energía y amortización.",
            color: "#f97316",
        },
        {
            href: "/utilidades/calculadora-contraccion-impresion-3d/",
            iconBg: "mdi:cube-scan",
            iconFg: "mdi:printer-3d-nozzle",
            title: "Contracción (Shrinkage)",
            description: "Ajusta la escala de tus diseños para compensar la pérdida de volumen por enfriamiento.",
            color: "#0ea5e9",
        },
        {
            href: "/utilidades/calculadora-caudal-volumetrico-impresion-3d/",
            iconBg: "mdi:speedometer",
            iconFg: "mdi:printer-3d-nozzle",
            title: "Caudal Volumétrico",
            description: "Calcula el limite de velocidad real de tu impresora basándose en el flujo máximo de tu hotend.",
            color: "#ef4444",
        },
        {
            href: "/utilidades/calculadora-tiempo-curado-resina-uv/",
            iconBg: "mdi:brightness-5",
            iconFg: "mdi:printer-3d",
            title: "Tiempo de Curado UV",
            description: "Calcula el tiempo óptimo de post-procesado basado en potencia y tipo de resina.",
            color: "#8b5cf6",
        },
    ],
};
