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
        {
            href: "/utilidades/calculadora-distancia-fase/",
            iconBg: "mdi:microphone-outline",
            iconFg: "mdi:waveform",
            title: "Distancia de Fase",
            description: "Alinea tus micrófonos con precisión de muestras y compensa el retraso acústico.",
            color: "#ff4d00",
        },
        {
            href: "/utilidades/conversor-frecuencia-nota-musical/",
            iconBg: "mdi:piano",
            iconFg: "mdi:music-note",
            title: "Frecuencia a Nota Musical",
            description: "Convierte Hz a notas musicales al instante. Mide cents de desafinación y afina sintetizadores y samples con precisión.",
            color: "#c026d3",
        },
    ],
};
