import type { SectionData } from "./types";

export const dronesSection: SectionData = {
    title: "Radioaficionados y Drones",
    slug: "drones",
    icon: "mdi:drone",
    theme: "orange",
    utilities: [
        {
            href: "/utilidades/calculadora-tiempo-vuelo-dron/",
            iconBg: "mdi:drone",
            iconFg: "mdi:timer-sand",
            title: "Tiempo de Vuelo Dron",
            description: "Calcula la autonomía de tu dron según mAh de batería y consumo de motores.",
            color: "#f97316",
        },
        {
            href: "/utilidades/conversor-coordenadas-gps/",
            iconBg: "mdi:latitude",
            iconFg: "mdi:map-marker",
            title: "Conversor Coordenadas GPS",
            description: "Pasa de Decimal a GMS (Grados, Minutos, Segundos) con mapa visual.",
            color: "#0ea5e9",
        },
        {
            href: "/utilidades/calculadora-longitud-antena/",
            iconBg: "mdi:antenna",
            iconFg: "mdi:ruler",
            title: "Calculadora de Antena",
            description: "Calcula la longitud exacta para dipolos y látigos de 1/2 y 1/4 de onda.",
            color: "#f59e0b",
        },
    ],
};
