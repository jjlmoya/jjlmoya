import type { SectionData } from "./types";

export const nauticalSection: SectionData = {
    title: "Vela y Náutica",
    slug: "vela-y-nautica",
    icon: "mdi:sailing",
    theme: "blue",
    utilities: [
        {
            href: "/utilidades/calculadora-altura-marea/",
            iconBg: "mdi:waves",
            iconFg: "mdi:sailing",
            title: "Calculadora de Altura de Marea",
            description: "Calcula la altura del agua en cualquier momento usando la Regla de los Dozavos.",
            color: "#0074B7",
        },
        {
            href: "/utilidades/calculador-paso-de-bajo/",
            iconBg: "mdi:anchor",
            iconFg: "mdi:ship-wheel",
            title: "Calculador de Paso de Bajo",
            description: "Determina si tienes agua suficiente para pasar por un punto crítico según tu calado.",
            color: "#003B73",
        }
    ],
};

