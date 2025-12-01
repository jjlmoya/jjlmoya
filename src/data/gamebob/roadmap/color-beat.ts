import type { Project } from "./types";

export const colorBeatProject: Project = {
    name: "Color Beat",
    description: "Arcade rítmico frenético.",
    image: "/images/gamebob/games/color-beat.png",
    statusLabel: "En Desarrollo",
    progress: 85,
    tasks: [
        { name: "Concepto y GDD", status: "done" },
        { name: "Prototipado de Mecánicas", status: "done" },
        { name: "Desarrollo del Core Loop", status: "done" },
        { name: "Sistema de Árbol de Habilidades", status: "done" },
        { name: "Sistema de Logros", status: "done" },
        { name: "Diseño Visual y Arte", status: "done" },
        { name: "Implementación de UI/UX", status: "done" },
        { name: "Integración de Audio y SFX", status: "done" },
        { name: "QA y Testing", status: "active" },
        { name: "Preparación de Marketing", status: "pending" },
        { name: "Lanzamiento en Stores", status: "pending" },
    ],
};
