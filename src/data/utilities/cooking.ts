import type { SectionData } from "./types";

export const cookingSection: SectionData = {
    title: "Cocina",
    icon: "mdi:chef-hat",
    theme: "orange",
    utilities: [
        {
            href: "/utilidades/pizza/",
            iconBg: "mdi:pizza",
            iconFg: "mdi:chef-hat",
            title: "Calculadora Pizza",
            description: "Diseña la masa perfecta. Controla la hidratación, la sal y la fermentación.",
            color: "#f97316"
        },
        {
            href: "/utilidades/salmuera/",
            iconBg: "mdi:shaker",
            iconFg: "mdi:water",
            title: "Calculadora de Salmuera",
            description: "Calcula la cantidad exacta de sal para tus encurtidos y fermentados.",
            color: "#14b8a6"
        },
        {
            href: "/utilidades/huevos/",
            iconBg: "mdi:egg",
            iconFg: "mdi:timer-sand",
            title: "Cronómetro de Huevos",
            description: "Ciencia aplicada. Calcula el tiempo exacto de cocción según altitud.",
            color: "#eab308"
        },
        {
            href: "/utilidades/moldes/",
            iconBg: "mdi:cake-variant",
            iconFg: "mdi:scale-balance",
            title: "Escalador de Moldes",
            description: "Adapta recetas a cualquier molde. Calcula el factor multiplicador exacto.",
            color: "#f43f5e"
        },
        {
            href: "/utilidades/reescalador-ingredientes/",
            iconBg: "mdi:scale",
            iconFg: "mdi:calculator",
            title: "Re-escalador de Recetas",
            description: "Regla de tres automática para adaptar ingredientes a más o menos comensales.",
            color: "#fbbf24"
        }
    ]
};
