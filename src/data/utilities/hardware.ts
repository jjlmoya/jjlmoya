import type { SectionData } from "./index";

export const hardwareSection: SectionData = {
    title: "Hardware y Periféricos",
    icon: "mdi:cpu-64-bit", // Chip icon or similar
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
            color: "#6366f1" // Indigo
        },
        {
            href: "/utilidades/test-mando/",
            iconBg: "mdi:controller-classic",
            iconFg: "mdi:controller",
            title: "Test de Mando y Drift",
            description: "Analiza joysticks, botones y vibración de tu Gamepad (Xbox/PS).",
            color: "#a855f7" // Purple
        },
        {
            href: "/utilidades/test-raton/",
            iconBg: "mdi:mouse-variant",
            iconFg: "mdi:mouse",
            title: "Test de Polling Rate",
            description: "Mide los Hz reales de tu ratón gaming en el navegador.",
            color: "#10b981" // Emerald
        },
        {
            href: "/utilidades/generador-tonos/",
            iconBg: "mdi:waveform",
            iconFg: "mdi:sine-wave",
            title: "Generador de Frecuencias",
            description: "Crea tonos puros de audio para probar altavoces y oídos.",
            color: "#f43f5e" // Rose
        }
    ]
};
