import type { SectionData } from "./types";

export const gamesSection: SectionData = {
    title: "Retos y Juegos",
    slug: "retos-y-juegos",
    icon: "mdi:trophy-variant",
    theme: "rose",
    utilities: [
        {
            href: "/utilidades/test-mecanografia/",
            iconBg: "mdi:keyboard",
            iconFg: "mdi:lightning-bolt",
            title: "Test de Mecanografía",
            description: "Pon a prueba tu velocidad y precisión al escribir. ¿Cuántas palabras por minuto eres capaz de teclear?",
            color: "#f43f5e",
        },
    ],
};
