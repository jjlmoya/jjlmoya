import type { SectionData } from "./types";

export const musicSection: SectionData = {
    title: "Música",
    icon: "mdi:music",
    theme: "pink",
    utilities: [
        {
            href: "/utilidades/metronomo/",
            iconBg: "mdi:metronome",
            iconFg: "mdi:metronome-tick",
            title: "Metrónomo Online",
            description: "Ritmo perfecto para músicos. Precisión con Web Audio API.",
            color: "#db2777",
        },
    ],
};
