import type { SectionData } from "./types";

export const dronesSection: SectionData = {
    title: "Radioaficionados y Drones",
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
    ],
};
