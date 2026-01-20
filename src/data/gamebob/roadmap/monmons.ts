import type { Project } from "./types";

export const monmonsProject: Project = {
    name: "Monmons",
    description: "Coleccionismo de criaturas reinventado para móvil.",
    homeDescription: "una nueva forma de coleccionar. vincula, progresa y gestiona tu campamento en esta experiencia móvil pura.",
    image: "/images/gamebob/games/monmons.png",
    statusLabel: "En Desarrollo",
    statusType: "developing",
    progress: 40,
    color: "#4a6741",
    links: {
        googlePlay: "",
    },
    tasks: [
        { name: "Concepto y Lore", status: "done" },
        { name: "Gestión de Campamento y Recursos", status: "done" },
        { name: "Integración de HUD y UI (Menús)", status: "done" },
        { name: "Prototipado de Interacciones", status: "pending" },
        { name: "Diseño de Monmons (Generación 1)", status: "pending" },
        { name: "Mecánicas de Exploración Móvil", status: "pending" },
        { name: "Sistema de Misiones y Logros", status: "pending" },
        { name: "Balance de Experiencia", status: "pending" },
        { name: "QA y Beta Cerrada", status: "pending" },
        { name: "Lanzamiento Global", status: "pending" },
    ],
};
