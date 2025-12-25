import type { Project } from "./types";

export const missiopolisProject: Project = {
    name: "Missiopolis: Crónicas Urbanas",
    description: "Tu ciudad es un libro. Aprénde a leerlo. ¿Cuántas veces has pasado por la misma calle sin verla realmente?",
    homeDescription: "tu ciudad es un libro. aprénde a leerlo. ¿cuántas veces has pasado por la misma calle sin verla realmente?",
    image: "/images/gamebob/games/missiopolis.png",
    statusLabel: "Planificación",
    statusType: "planning",
    progress: 10,
    color: "#3b82f6",
    tasks: [
        { name: "Guion y Narrativa", status: "active" },
        { name: "Definición de Mecánicas de Exploración", status: "pending" },
        { name: "Estudio de Estética Visual", status: "pending" },
        { name: "Presupuesto y Calendario", status: "pending" },
    ],
};
