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
        description:
            "arrastra, estira y lanza. física de tirachinas con rebotes dinámicos y control táctil preciso.",
        url: "/gamebob/mecanicas/slingshot/",
        icon: "mdi:gesture-swipe",
        tags: ["física", "táctil", "arcade"],
        platforms: "all",
    },
    {
        title: "Swipe Gesture",
        description:
            "detecta gestos de deslizamiento en 4 u 8 direcciones con seguimiento de velocidad y sensibilidad configurable.",
        url: "/gamebob/mecanicas/swipe/",
        icon: "mdi:gesture-swipe-horizontal",
        tags: ["input", "táctil", "utilidad"],
        platforms: "all",
    },
    {
        title: "Gravity Well",
        description:
            "simulación de partículas con pozos de gravedad interactivos. crea campos de fuerza y observa el caos.",
        url: "/gamebob/mecanicas/gravity-well/",
        icon: "mdi:magnet",
        tags: ["física", "partículas", "simulación"],
        platforms: "all",
    },
    {
        title: "Flocking",
        description:
            "simulación de comportamiento de bandada. separación, alineación y cohesión en acción.",
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
        description:
            "carga tu salto. controla la fuerza y la trayectoria para alcanzar nuevas alturas.",
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
        description:
            "mecánicas de plataformas fluidas. salto variable, doble salto y deslizamiento.",
        url: "/gamebob/mecanicas/plataformas/",
        icon: "mdi:gamepad-variant",
        tags: ["plataformas", "física", "controles"],
        platforms: "desktop",
    },
    {
        title: "Size Matters",
        description:
            "el tamaño importa. crece para romper, encoge para flotar. física de masa variable.",
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
    },
    {
        title: "Echolocation",
        description: "navega en la oscuridad. usa el sonido para revelar el mundo invisible.",
        url: "/gamebob/mecanicas/echolocation/",
        icon: "mdi:radar",
        tags: ["puzzle", "experimental", "audio"],
        platforms: "all",
    },
    {
        title: "Vibrator Cracker",
        description:
            "siente el mecanismo. usa la vibración para encontrar la combinación de la caja fuerte.",
        url: "/gamebob/mecanicas/vibrator-cracker/",
        icon: "mdi:safe",
        tags: ["haptics", "experimental", "mobile"],
        platforms: "all",
    },
    {
        title: "Magnetic Finger",
        description: "control magnético. atrae o repele partículas con la punta de tus dedos.",
        url: "/gamebob/mecanicas/magnetic-finger/",
        icon: "mdi:magnet",
        tags: ["física", "partículas", "input"],
        platforms: "all",
    },
    {
        title: "Color Chameleon",
        description: "camuflaje activo. cambia tu color para fundirte con el entorno y sobrevivir.",
        url: "/gamebob/mecanicas/color-chameleon/",
        icon: "mdi:palette",
        tags: ["sigilo", "colores", "acción"],
        platforms: "all",
    },
    {
        title: "The Barrier",
        description: "control de flujo. dibuja líneas para redirigir una cascada de partículas.",
        url: "/gamebob/mecanicas/the-barrier/",
        icon: "mdi:vector-line",
        tags: ["física", "dibujo", "simulación"],
        platforms: "all",
    },
    {
        title: "Finger Twister",
        description: "caos multitáctil. usa todos tus dedos para mantener los nodos activos.",
        url: "/gamebob/mecanicas/finger-twister/",
        icon: "mdi:hand-back-right",
        tags: ["multitouch", "arcade", "caos"],
        platforms: "mobile",
    },
    {
        title: "Gravity Flip",
        description:
            "el suelo es el techo. invierte la gravedad para esquivar obstáculos en este runner psicodélico.",
        url: "/gamebob/mecanicas/gravity-flip/",
        icon: "mdi:flip-vertical",
        tags: ["arcade", "física", "runner"],
        platforms: "all",
    },
    {
        title: "Neon Grapple",
        description:
            "spiderman minimalista. balancéate por un mundo infinito usando ganchos de energía.",
        url: "/gamebob/mecanicas/neon-grapple/",
        icon: "mdi:hook",
        tags: ["física", "skill", "flow"],
        platforms: "all",
    },
    {
        title: "Rhythm Jump",
        description:
            "alterna tu color para sobrevivir. cyan y magenta son tus únicos aliados en este runner de precisión.",
        url: "/gamebob/mecanicas/rhythm-jump/",
        icon: "mdi:palette-swatch",
        tags: ["color", "runner", "coordinación"],
        platforms: "all",
    },
    {
        title: "Draw The Path",
        description:
            "protege al corredor. dibuja escudos contra meteoritos y puentes sobre el vacío.",
        url: "/gamebob/mecanicas/draw-the-path/",
        icon: "mdi:draw",
        tags: ["dibujo", "creatividad", "reflejos"],
        platforms: "all",
    },

    {
        title: "Viewport Edge Collision",
        description:
            "colisión dinámica. redimensiona la ventana para golpear objetos y aumentar la presión.",
        url: "/gamebob/mecanicas/viewport-collision/",
        icon: "mdi:resize",
        tags: ["física", "browser", "experimental"],
        platforms: "desktop",
    },
    {
        title: "Bullet-Time Painting",
        description:
            "planifica tus movimientos y disparos en tiempo pausado y ejecútalos en ráfagas de 1 segundo.",
        url: "/gamebob/mecanicas/bullet-time-painting/",
        icon: "mdi:brush",
        tags: ["táctica", "bullet-time", "física"],
        platforms: "all",
    },
    {
        title: "Momentum Transfer",
        description: "no matas enemigos golpeándolos, sino transfiriéndoles tu velocidad.",
        url: "/gamebob/mecanicas/momentum-transfer/",
        icon: "mdi:billiards",
        tags: ["física", "billar", "arcade"],
        platforms: "all",
    },
];
