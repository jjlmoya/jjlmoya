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
        }
    ]
};
