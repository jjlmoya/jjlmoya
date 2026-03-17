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
    ],
};
