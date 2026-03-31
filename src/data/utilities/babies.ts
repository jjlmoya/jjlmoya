import type { SectionData } from "./types";

export const babiesSection: SectionData = {
    title: "Bebés y Embarazo",
    slug: "bebes-y-embarazo",
    icon: "mdi:baby",
    theme: "rose",
    utilities: [
        {
            href: "/utilidades/calculadora-dias-fertiles/",
            iconBg: "mdi:calendar-heart",
            iconFg: "mdi:water-percent",
            title: "Días Fértiles",
            description: "Estimador de ciclos y ventana de fertilidad con calendario intuitivo.",
            color: "#ec4899",
        },
        {
            href: "/utilidades/conversor-tallas-bebe/",
            iconBg: "mdi:baby-face-outline",
            iconFg: "mdi:ruler",
            title: "Tallas Bebé",
            description: "Conversor inteligente de tallas entre marcas como Zara, H&M y Carter's.",
            color: "#60a5fa",
        },
        {
            href: "/utilidades/calendario-vacunacion-espana-bebes/",
            iconBg: "mdi:calendar-check",
            iconFg: "mdi:baby",
            title: "Calendario de Vacunación 2026",
            description: "Esquema oficial de la AEP para que no se te pase ninguna cita de tu hijo.",
            color: "#6366f1",
        },
    ],
};
