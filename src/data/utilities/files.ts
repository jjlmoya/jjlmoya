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
            color: "#3b82f6",
        },
        {
            href: "/utilidades/format-stripper/",
            iconBg: "mdi:broom",
            iconFg: "mdi:format-clear",
            title: "Format Stripper",
            description: "Limpia texto basura, elimina formatos ocultos y normaliza espacios.",
            color: "#10b981",
        },
        {
            href: "/utilidades/contador-caracteres/",
            iconBg: "mdi:text-box-search-outline",
            iconFg: "mdi:chart-bar",
            title: "Contador de Caracteres",
            description: "Cuentapalabras y caracteres visual. Analiza tiempos de lectura y voz.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/verificador-hash/",
            iconBg: "mdi:shield-check-outline",
            iconFg: "mdi:fingerprint",
            title: "Verificador de Hash",
            description: "Calcula firmas SHA-256 de archivos locales para verificar su integridad.",
            color: "#10b981",
        },
        {
            href: "/utilidades/texto-a-markdown/",
            iconBg: "mdi:markdown",
            iconFg: "mdi:format-text",
            title: "Texto a Markdown",
            description:
                "Convertidor inteligente de copypaste de Word o Web a codigo MD limpio y semantico.",
            color: "#f59e0b",
        },
        {
            href: "/utilidades/formateador-reddit/",
            iconBg: "mdi:reddit",
            iconFg: "mdi:format-text-rotation-none",
            title: "Formateador para Reddit",
            description:
                "Limpia y adapta textos para Reddit y foros. Convierte saltos de linea y elimina formatos.",
            color: "#ff4500",
        },
        {
            href: "/utilidades/eliminador-emojis-espacios-dobles/",
            iconBg: "mdi:format-text-variant-outline",
            iconFg: "mdi:broom",
            title: "Limpiador de Emojis y Espacios",
            description:
                "Elimina emojis, dobles espacios y caracteres invisibles de tus textos al instante.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/separador-de-texto/",
            iconBg: "mdi:format-list-bulleted-type",
            iconFg: "mdi:content-cut",
            title: "Separador de Texto",
            description: "Divide listas, comas o delimitadores en líneas individuales. Organiza tus datos.",
            color: "#8b5cf6",
        },
        {
            href: "/utilidades/conversor-json-a-excel-csv/",
            iconBg: "mdi:file-code-outline",
            iconFg: "mdi:microsoft-excel",
            title: "Conversor JSON a Excel",
            description: "Transforma datos JSON en hojas de cálculo planas (CSV) con aplanamiento automático.",
            color: "#06b6d4",
        },
    ],
};
