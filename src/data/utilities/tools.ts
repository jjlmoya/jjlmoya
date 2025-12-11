import type { SectionData } from "./types";

export const toolsSection: SectionData = {
    title: "Herramientas Prácticas",
    icon: "mdi:toolbox",
    theme: "slate",
    utilities: [
        {
            href: "/utilidades/rutas/",
            iconBg: "mdi:map-marker-path",
            iconFg: "mdi:map-search",
            title: "Optimizador de Rutas",
            description: "Organiza paradas y calcula la ruta óptima para repartos y visitas.",
            color: "#06b6d4"
        },
        {
            href: "/utilidades/regla-de-tres/",
            iconBg: "mdi:math-compass",
            iconFg: "mdi:math-compass",
            title: "Regla de Tres",
            description: "Calculadora rápida para resolver proporciones y escalas.",
            color: "#8b5cf6"
        },
        {
            href: "/utilidades/generador-contrasenas/",
            iconBg: "mdi:shield-lock-outline",
            iconFg: "mdi:password",
            title: "Generador de Contraseñas",
            description: "Crea claves seguras y aleatorias imposibles de hackear. Ciberseguridad básica.",
            color: "#10b981"
        },
        {
            href: "/utilidades/pixeles-pantalla/",
            iconBg: "mdi:monitor-dashboard",
            iconFg: "mdi:monitor-shimmer",
            title: "Test de Píxeles Muertos",
            description: "Diagnóstico de pantalla y reparador de píxeles atascados (Strobe).",
            color: "#3b82f6"
        }
    ]
};
