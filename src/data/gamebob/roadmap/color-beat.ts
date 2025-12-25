import type { Project } from "./types";

export const colorBeatProject: Project = {
    name: "Color Beat",
    description: "Arcade rítmico frenético.",
    homeDescription: "un desafío de ritmo y color. pon a prueba tus reflejos en este arcade frenético donde la música dicta el camino.",
    image: "/images/gamebob/games/color-beat.png",
    statusLabel: "Lanzado en Google Play",
    statusType: "released",
    progress: 100,
    color: "#1ddabc",
    links: {
        googlePlay: "https://play.google.com/store/apps/details?id=com.colorbeat.app",
    },
    tasks: [
        { name: "Concepto y GDD", status: "done" },
        { name: "Prototipado de Mecánicas", status: "done" },
        { name: "Desarrollo del Core Loop", status: "done" },
        { name: "Sistema de Árbol de Habilidades", status: "done" },
        { name: "Sistema de Logros", status: "done" },
        { name: "Diseño Visual y Arte", status: "done" },
        { name: "Implementación de UI/UX", status: "done" },
        { name: "Integración de Audio y SFX", status: "done" },
        { name: "QA y Testing", status: "done" },
        { name: "Preparación de Marketing", status: "done" },
        { name: "Lanzamiento en Stores", status: "done" },
    ],
};
