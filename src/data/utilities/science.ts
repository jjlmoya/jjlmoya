import type { SectionData } from "./types";

export const scienceSection: SectionData = {
    title: "Ciencia",
    icon: "mdi:flask",
    theme: "cyan",
    utilities: [
        {
            href: "/utilidades/contador-colonias/",
            iconBg: "mdi:bacteria",
            iconFg: "mdi:counter",
            title: "Contador de Colonias",
            description: "Conteo digital de UFC en placas de Petri. Diferencia tipos y evita errores.",
            color: "#14b8a6"
        }
    ]
};
