import type { Project } from "./types";

export const fortuneCookieProject: Project = {
    name: "Galleta de la Fortuna",
    description: "Destrucción táctil por niveles y estética premium para un ritual de suerte sin precedentes. Rompe las capas del destino, colecciona rarezas y eleva tu fortuna diaria a una obra de arte interactiva.",
    homeDescription: "Destrucción táctil por niveles y estética premium para un ritual de suerte sin precedentes. Rompe las capas del destino, colecciona rarezas y eleva tu fortuna diaria a una obra de arte interactiva.",
    image: "/images/gamebob/games/fortune-cookie.png",
    statusLabel: "QA",
    statusType: "qa",
    progress: 90,
    color: "#f59e0b",
    tasks: [
        { name: "Concepto y Mecánica de Azar", status: "done" },
        { name: "Diseño Visual Pixel Art", status: "done" },
        { name: "Implementación de Motor de Mensajes", status: "done" },
        { name: "Fase de QA y Pulido", status: "active" },
        { name: "Publicación en Google Play", status: "pending" },
    ],
};
