import type { SectionData } from "./types";

export const healthSection: SectionData = {
    title: "Salud y Deporte",
    icon: "mdi:heart-pulse",
    theme: "cyan",
    utilities: [
        {
            title: "Calculadora IMC",
            description: "Controla tu peso ideal y estado de forma con el índice de Quetelet.",
            href: "/utilidades/imc/",
            iconBg: "mdi:human-handsup",
            iconFg: "mdi:scale-bathroom",
            color: "#3b82f6"
        },
        {
            href: "/utilidades/marcador/",
            iconBg: "mdi:scoreboard-outline",
            iconFg: "mdi:trophy-variant-outline",
            title: "Marcador Deportivo",
            description: "Contador gigante para pádel y ping-pong.",
            color: "#f43f5e"
        },
        {
            href: "/utilidades/torneo/",
            iconBg: "mdi:sitemap",
            iconFg: "mdi:trophy",
            title: "Organizador de Torneos",
            description: "Crea cuadros de enfrentamientos y gestiona eliminatorias. Ideal para deportes y eSports.",
            color: "#6366f1"
        }
    ]
};
