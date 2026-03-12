import type { SectionData } from "./types";

export const sportsSection: SectionData = {
    title: "Deporte",
    icon: "mdi:run",
    theme: "orange",
    utilities: [
        {
            href: "/utilidades/marcador/",
            iconBg: "mdi:scoreboard-outline",
            iconFg: "mdi:trophy-variant-outline",
            title: "Marcador Deportivo",
            description: "Contador gigante para pádel y ping-pong.",
            color: "#f43f5e",
        },
        {
            href: "/utilidades/torneo/",
            iconBg: "mdi:sitemap",
            iconFg: "mdi:trophy",
            title: "Organizador de Torneos",
            description:
                "Crea cuadros de enfrentamientos y gestiona eliminatorias. Ideal para deportes y eSports.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/test-reflejos/",
            iconBg: "mdi:lightning-bolt",
            iconFg: "mdi:timer-outline",
            title: "Test de Reflejos",
            description: "Mide tu velocidad de reacción en ms. Challenge de rangos.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/seguimiento-entrenamiento-gym/",
            iconBg: "mdi:weight-lifter",
            iconFg: "mdi:chart-line",
            title: "Seguimiento Gym",
            description: "Registra tus pesos y visualiza gráficas de progreso por ejercicio.",
            color: "#ef4444",
        },
    ],
};
