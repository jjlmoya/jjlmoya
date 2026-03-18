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
    ],
};
