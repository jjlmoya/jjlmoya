import type { SectionData } from "./types";

export const educationSection: SectionData = {
    title: "Educación y Estudiantes",
    slug: "educacion",
    icon: "mdi:school",
    theme: "indigo",
    utilities: [
        {
            title: "Calculadora de Nota Ponderada",
            description: "Calcula tu nota final de Bachillerato, Selectividad (EBAU) o Universidad basándote en los pesos de cada asignatura.",
            href: "/utilidades/calculadora-nota-ponderada/",
            iconBg: "mdi:school-outline",
            iconFg: "mdi:calculator-variant",
            color: "indigo",
        },
        {
            title: "Generador de Citas Bibliográficas",
            description: "Crea referencias automáticas en formato APA, MLA y Vancouver con guardado persistente.",
            href: "/utilidades/generador-citas-bibliograficas/",
            iconBg: "mdi:format-quote-open",
            iconFg: "mdi:book-open-page-variant",
            color: "slate",
        },
    ],
};
