import type { SectionData } from "./types";

export const streamingSection: SectionData = {
    title: "Streaming y Directos",
    icon: "mdi:broadcast",
    theme: "purple",
    utilities: [
        {
            href: "/utilidades/sorteo/",
            iconBg: "mdi:ticket-confirmation-outline",
            iconFg: "mdi:ticket-percent",
            title: "Sorteo y Concursos",
            description: "Elige un ganador aleatorio de una lista de participantes. Ideal para sorteos en directos y redes sociales.",
            color: "#a855f7"
        }
    ]
};
