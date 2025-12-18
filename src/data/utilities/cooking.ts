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
        },
        {
            href: "/utilidades/temporizador-cocina/",
            iconBg: "mdi:clock-outline",
            iconFg: "mdi:alarm-multiple",
            title: "Temporizador Múltiple",
            description: "Controla horno, fuego y reposo a la vez. Crea tantos temporizadores como necesites.",
            color: "#f97316"
        },
        {
            href: "/utilidades/masa-madre/",
            iconBg: "mdi:bacteria",
            iconFg: "mdi:water-percent",
            title: "Calculadora Masa Madre",
            description: "Calcula los refrescos perfectos. Control total sobre ratios, hidratación y desperdicio.",
            color: "#f59e0b"
        },
        {
            href: "/utilidades/guia-roux/",
            iconBg: "mdi:pot-mix",
            iconFg: "mdi:spoon-sugar",
            title: "Guía Maestra de Roux",
            description: "Descubre las Salsas Madre francesas y calcula proporciones de espesante.",
            color: "#d97706"
        },
        {
            href: "/utilidades/guia-sartenes/",
            iconBg: "mdi:pot-steam-outline",
            iconFg: "mdi:shield-star-outline",
            title: "Selector de Sartenes",
            description: "Encuentra el material ideal y aprende su mantenimiento: Hierro, Acero, Cobre o Antiadherente.",
            color: "#475569"
        },
        {
            href: "/utilidades/diagnostico-platanos/",
            iconBg: "mdi:fruit-citrus",
            iconFg: "mdi:microscope",
            title: "Diagnóstico de Plátanos",
            description: "Analiza el grado de madurez y recibe consejos científicos de conservación según la temperatura.",
            color: "#fbbf24"
        }
    ]
};
