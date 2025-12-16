import type { SectionData } from "./types";

export const natureSection: SectionData = {
    title: "Naturaleza y Agricultura",
    icon: "mdi:leaf",

    theme: "nature",
    utilities: [
        {
            title: "Calculadora de Siembra",
            description: "Calibra tu sembradora. Calcula el espaciado entre semillas basado en la población por hectárea.",
            href: "/utilidades/calculadora-siembra/",
            color: "#d97706",
            iconBg: "mdi:tractor",
            iconFg: "mdi:sprout",
        },
        {
            title: "Cosechador de Lluvia",
            description: "Calcula el potencial de recolección de agua tu techo y dimensiona tu tanque.",
            href: "/utilidades/calculadora-agua-lluvia/",
            color: "#06b6d4",
            iconBg: "mdi:weather-pouring",
            iconFg: "mdi:water",
        },
    ],
};
