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
        },
        {
            href: "/utilidades/conversor-unidades-nauticas/",
            iconBg: "mdi:speedometer",
            iconFg: "mdi:compass-outline",
            title: "Conversor de Unidades Náuticas",
            description: "Convierte distancias, velocidades, profundidades y presiones atmosféricas con precisión.",
            color: "#0077be",
        },
        {
            href: "/utilidades/calculadora-superficie-velica/",
            iconBg: "mdi:sailing",
            iconFg: "mdi:gauge",
            title: "Calculadora de Superficie Vélica",
            description: "Mide el rendimiento de tu barco calculando el ratio SA/D a partir de medidas técnicas.",
            color: "#0055a4",
        },
        {
            href: "/utilidades/conversor-velocidad-nautica/",
            iconBg: "mdi:speedometer",
            iconFg: "mdi:weather-windy",
            title: "Conversor de Velocidad Náutica",
            description: "Traduce entre nudos, km/h y m/s. Incluye la escala de viento Beaufort con descripción del mar.",
            color: "#004F98",
        }
    ],
};

