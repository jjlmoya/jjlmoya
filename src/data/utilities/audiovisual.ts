import type { SectionData } from "./types";

export const audiovisualSection: SectionData = {
    title: "Audiovisual y Fotografía",
    icon: "mdi:camera-iris",
    theme: "purple",
    utilities: [
        {
            href: "/utilidades/calculadora-timelapse/",
            iconBg: "mdi:camera-timer",
            iconFg: "mdi:clock-fast",
            title: "Calculadora Timelapse",
            description: "Calcula intervalos y duración para comprimir el tiempo en tus videos.",
            color: "#8b5cf6"
        },
        {
            href: "/utilidades/limpiador-exif/",
            iconBg: "mdi:camera-off",
            iconFg: "mdi:shield-check",
            title: "Limpiador EXIF",
            description: "Borra metadatos GPS y modelo de cámara. Privacidad total para tus fotos.",
            color: "#6b21a8"
        },
        {
            href: "/utilidades/sincronizar-subtitulos/",
            iconBg: "mdi:movie-open-edit-outline",
            iconFg: "mdi:clock-time-four-outline",
            title: "Sincronizar Subtítulos",
            description: "Ajusta el tiempo de tus archivos SRT. Adelanta o retrasa subtítulos fácilmente.",
            color: "#06b6d4"
        },
        {
            href: "/utilidades/editor-privacidad/",
            iconBg: "mdi:eye-off",
            iconFg: "mdi:blur",
            title: "Editor de Privacidad",
            description: "Censura, pixela y desenfoca zonas sensibles de tus fotos online.",
            color: "#64748b"
        },
        {
            href: "/utilidades/lente-cromatica/",
            iconBg: "mdi:palette-swatch",
            iconFg: "mdi:eye-outline",
            title: "Lente Cromática",
            description: "Extrae paletas de colores matemáticas de cualquier imagen mediante algoritmos de cuantización.",
            color: "#d946ef"
        },
        {
            href: "/utilidades/calculadora-calidad-impresion/",
            iconBg: "mdi:printer",
            iconFg: "mdi:ruler-square",
            title: "Calculadora de Impresión",
            description: "Analiza si tu imagen tiene suficiente calidad para imprimir en gran formato sin pixelarse.",
            color: "#6366f1"
        }
    ]
};
