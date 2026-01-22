import type { SectionData } from "./types";

export const bikeSection: SectionData = {
    title: "Ciclismo",
    icon: "mdi:bike",
    theme: "rose",
    utilities: [
        {
            href: "/utilidades/calculadora-fixie/",
            iconBg: "mdi:bicycle",
            iconFg: "mdi:cog",
            title: "Calculadora Fixie",
            description: "Optimiza tu transmisión. Calcula Skid Patches y Gear Inches.",
            color: "#ef4444",
        },
        {
            href: "/utilidades/calculadora-radios/",
            iconBg: "mdi:tire",
            iconFg: "mdi:ruler",
            title: "Calculadora de Radios",
            description: "Longitud exacta de radios para construir ruedas. ERD, PCD y cruces.",
            color: "#6366f1",
        },
    ],
};
