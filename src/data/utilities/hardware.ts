import type { SectionData } from "./index";

export const hardwareSection: SectionData = {
    title: "Hardware y Periféricos",
    icon: "mdi:cpu-64-bit",
    theme: "blue",
    utilities: [
        {
            href: "/utilidades/pixeles-pantalla/",
            iconBg: "mdi:monitor-dashboard",
            iconFg: "mdi:monitor-shimmer",
            title: "Test de Píxeles Muertos",
            description: "Diagnóstico de pantalla y reparador de píxeles atascados (Strobe).",
            color: "#3b82f6"
        },
        {
            href: "/utilidades/test-teclado/",
            iconBg: "mdi:keyboard-variant",
            iconFg: "mdi:keyboard-outline",
            title: "Test de Teclado (Ghosting)",
            description: "Verifica el Rollover de tu teclado y detecta teclas que no funcionan.",
            color: "#6366f1"
        },
        {
            href: "/utilidades/test-mando/",
            iconBg: "mdi:controller-classic",
            iconFg: "mdi:controller",
            title: "Test de Mando y Drift",
            description: "Analiza joysticks, botones y vibración de tu Gamepad (Xbox/PS).",
            color: "#a855f7"
        },
        {
            href: "/utilidades/test-raton/",
            iconBg: "mdi:mouse-variant",
            iconFg: "mdi:mouse",
            title: "Test de Polling Rate",
            description: "Mide los Hz reales de tu ratón gaming en el navegador.",
            color: "#10b981"
        },
        {
            href: "/utilidades/generador-tonos/",
            iconBg: "mdi:waveform",
            iconFg: "mdi:sine-wave",
            title: "Generador de Frecuencias",
            description: "Crea tonos puros de audio para probar altavoces y oídos.",
            color: "#f43f5e"
        },
        {
            href: "/utilidades/estimador-salud-bateria/",
            iconBg: "mdi:battery-heart-variant",
            iconFg: "mdi:battery-charging-high",
            title: "Salud de Batería",
            description: "Estima la degradación y años restantes de vida de tus celdas de litio.",
            color: "#10b981"
        }
    ]
};
