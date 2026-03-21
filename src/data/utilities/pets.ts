import type { SectionData } from "./types";

export const petsSection: SectionData = {
    title: "Mascotas",
    slug: "mascotas",
    icon: "mdi:paw",
    theme: "amber",
    utilities: [
        {
            href: "/utilidades/calculadora-edad-mascotas/",
            iconBg: "mdi:paw",
            iconFg: "mdi:clock-time-eight-outline",
            title: "Calculadora Edad Mascotas",
            description: "Traduce años de perro y gato a años humanos con ciencia.",
            color: "#f59e0b",
        },
        {
            href: "/utilidades/calculadora-racion-diaria-mascotas/",
            iconBg: "mdi:food-apple",
            iconFg: "mdi:weight-gram",
            title: "Calculadora de Ración",
            description: "Calcula la cantidad exacta de comida para tu perro o gato según su peso y actividad.",
            color: "#10b981",
        },
    ],
};
