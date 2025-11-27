export interface MechanicItem {
    title: string;
    description: string;
    url: string;
    icon: string;
    tags: string[];
    platforms: "mobile" | "desktop" | "all";
}

export const mechanics: MechanicItem[] = [
    {
        title: "Slingshot",
        description: "arrastra, estira y lanza. física de tirachinas con rebotes dinámicos y control táctil preciso.",
        url: "/gamebob/mecanicas/slingshot/",
        icon: "mdi:gesture-swipe",
        tags: ["física", "táctil", "arcade"],
        platforms: "all",
    },
    {
        title: "Swipe Gesture",
        description: "detecta gestos de deslizamiento en 4 u 8 direcciones con seguimiento de velocidad y sensibilidad configurable.",
        url: "/gamebob/mecanicas/swipe/",
        icon: "mdi:gesture-swipe-horizontal",
        tags: ["input", "táctil", "utilidad"],
        platforms: "all",
    },
    {
        title: "Gravity Well",
        description: "simulación de partículas con pozos de gravedad interactivos. crea campos de fuerza y observa el caos.",
        url: "/gamebob/mecanicas/gravity-well/",
        icon: "mdi:magnet",
        tags: ["física", "partículas", "simulación"],
        platforms: "all",
    },
    {
        title: "Flocking",
        description: "simulación de comportamiento de bandada. separación, alineación y cohesión en acción.",
        url: "/gamebob/mecanicas/flocking/",
        icon: "mdi:bird",
        tags: ["ia", "simulación", "naturaleza"],
        platforms: "all",
    },
    {
        title: "Tap & Fly",
        description: "control de un toque. desafía la gravedad y esquiva obstáculos con precisión.",
        url: "/gamebob/mecanicas/tap-fly/",
        icon: "mdi:arrow-up-bold",
        tags: ["arcade", "física"],
        platforms: "all",
    },
    {
        title: "Hold to Jump",
        description: "carga tu salto. controla la fuerza y la trayectoria para alcanzar nuevas alturas.",
        url: "/gamebob/mecanicas/hold-jump/",
        icon: "mdi:arrow-collapse-down",
        tags: ["física", "plataformas", "input"],
        platforms: "all",
    },
    {
        title: "Clicker",
        description: "mecánica incremental. haz clic, gana recursos y automatiza tu progreso.",
        url: "/gamebob/mecanicas/clicker/",
        icon: "mdi:cursor-default-click",
        tags: ["idle", "incremental", "ui"],
        platforms: "all",
    },
    {
        title: "Autorunner",
        description: "carrera infinita. salta obstáculos y plataformas en este runner procedural.",
        url: "/gamebob/mecanicas/autorunner/",
        icon: "mdi:run-fast",
        tags: ["arcade", "procedural", "plataformas"],
        platforms: "all",
    },
    {
        title: "Platformer",
        description: "mecánicas de plataformas fluidas. salto variable, doble salto y deslizamiento.",
        url: "/gamebob/mecanicas/plataformas/",
        icon: "mdi:gamepad-variant",
        tags: ["plataformas", "física", "controles"],
        platforms: "desktop",
    },
    {
        title: "Size Matters",
        description: "el tamaño importa. crece para romper, encoge para flotar. física de masa variable.",
        url: "/gamebob/mecanicas/size-matters/",
        icon: "mdi:arrow-expand-all",
        tags: ["física", "puzzle", "único"],
        platforms: "all",
    },
    {
        title: "One Bullet Shooter",
        description: "un disparo. una oportunidad. recupera tu bala para sobrevivir.",
        url: "/gamebob/mecanicas/one-bullet-shooter/",
        icon: "mdi:bullet",
        tags: ["shooter", "puzzle", "acción"],
        platforms: "desktop",
    }
];
