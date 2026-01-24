import type { Project } from "./types";

export const fortuneCookieProject: Project = {
    name: "Galleta de la Fortuna",
    description:
        "Destrucción táctil por niveles y estética premium para un ritual de suerte sin precedentes. Rompe las capas del destino, colecciona rarezas y eleva tu fortuna diaria a una obra de arte interactiva.",
    homeDescription:
        "Destrucción táctil por niveles y estética premium para un ritual de suerte sin precedentes. Rompe las capas del destino, colecciona rarezas y eleva tu fortuna diaria a una obra de arte interactiva.",
    image: "/images/gamebob/games/fortune-cookie.webp",
    statusLabel: "Publicado en Google Play",
    statusType: "released",
    progress: 100,
    color: "#f59e0b",
    links: {
        googlePlay: "https://play.google.com/store/apps/details?id=com.gamebob.cookie.fortune",
    },
    tasks: [
        { name: "Concepto y Mecánica de Azar", status: "done" },
        { name: "Visuales", status: "done" },
        { name: "Implementación de Motor de Mensajes", status: "done" },
        { name: "Fase de QA y Pulido", status: "done" },
        { name: "Publicación en Google Play", status: "done" },
    ],
};
