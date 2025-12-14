import type { SectionData } from "./types";

export const filesSection: SectionData = {
    title: "Archivos y Texto",
    icon: "mdi:file-document-outline",
    theme: "blue",
    utilities: [
        {
            href: "/utilidades/clipboard/",
            iconBg: "mdi:clipboard-text-outline",
            iconFg: "mdi:content-paste",
            title: "Portapapeles",
            description: "Pega, visualiza y guarda. Tu portapapeles convertido en archivo.",
            color: "#3b82f6"
        },
        {
            href: "/utilidades/format-stripper/",
            iconBg: "mdi:broom",
            iconFg: "mdi:format-clear",
            title: "Format Stripper",
            description: "Limpia texto basura, elimina formatos ocultos y normaliza espacios.",
            color: "#10b981"
        },
        {
            href: "/utilidades/contador-caracteres/",
            iconBg: "mdi:text-box-search-outline",
            iconFg: "mdi:chart-bar",
            title: "Contador de Caracteres",
            description: "Cuentapalabras y caracteres visual. Analiza tiempos de lectura y voz.",
            color: "#6366f1"
        },
        {
            href: "/utilidades/limpiador-exif/",
            iconBg: "mdi:camera-off",
            iconFg: "mdi:shield-check",
            title: "Limpiador EXIF",
            description: "Borra metadatos GPS y modelo de cámara. Privacidad total para tus fotos.",
            color: "#8b5cf6"
        },
        {
            href: "/utilidades/sincronizar-subtitulos/",
            iconBg: "mdi:movie-open-edit-outline",
            iconFg: "mdi:clock-time-four-outline",
            title: "Sincronizar Subtítulos",
            description: "Ajusta el tiempo de tus archivos SRT. Adelanta o retrasa subtítulos fácilmente.",
            color: "#06b6d4" 
        }
    ]
};
