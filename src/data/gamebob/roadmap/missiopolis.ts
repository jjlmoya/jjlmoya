import type { Project } from "./types";

export const missiopolisProject: Project = {
    name: "Missiopolis: Crónicas Urbanas",
    description: "Tu ciudad es un libro. Aprénde a leerlo. ¿Cuántas veces has pasado por la misma calle sin verla realmente?",
    image: "/images/gamebob/games/missiopolis.png",
    statusLabel: "En Pre-producción",
    progress: 15,
    tasks: [
        { name: "Concepto y Narrativa", status: "done" },
        { name: "Diseño de Sistemas Urbanos", status: "active" },
        { name: "Prototipo de Cámara y Controles", status: "pending" },
        { name: "Arte Conceptual de la Ciudad", status: "pending" },
        { name: "Arquitectura del Motor", status: "pending" },
    ],
};
