import type { SectionData } from "./types";

export const musicSection: SectionData = {
    title: "Música",
    slug: "musica",
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
        {
            href: "/utilidades/calculadora-bpm-milisegundos/",
            iconBg: "mdi:calculator-variant",
            iconFg: "mdi:music-note-eighth-dotted",
            title: "BPM a Milisegundos",
            description: "Calcula tiempos rítmicos para delays y reverbs. Sincroniza tu mezcla profesional.",
            color: "#6366f1",
        },
    ],
};
