import type { SectionData } from "./types";

export const healthSection: SectionData = {
    title: "Salud y Deporte",
    icon: "mdi:heart-pulse",
    theme: "cyan",
    utilities: [
        {
            title: "Calculadora IMC",
            description: "Controla tu peso ideal y estado de forma con el índice de Quetelet.",
            href: "/utilidades/imc/",
            iconBg: "mdi:human-handsup",
            iconFg: "mdi:scale-bathroom",
            color: "#3b82f6"
        },
        {
            href: "/utilidades/marcador/",
            iconBg: "mdi:scoreboard-outline",
            iconFg: "mdi:trophy-variant-outline",
            title: "Marcador Deportivo",
            description: "Contador gigante para pádel y ping-pong.",
            color: "#f43f5e"
        },
        {
            href: "/utilidades/torneo/",
            iconBg: "mdi:sitemap",
            iconFg: "mdi:trophy",
            title: "Organizador de Torneos",
            description: "Crea cuadros de enfrentamientos y gestiona eliminatorias. Ideal para deportes y eSports.",
            color: "#6366f1"
        },
        {
            href: "/utilidades/test-reflejos/",
            iconBg: "mdi:lightning-bolt",
            iconFg: "mdi:timer-outline",
            title: "Test de Reflejos",
            description: "Mide tu velocidad de reacción en ms. Challenge de rangos.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/alivio-tinnitus/",
            iconBg: "mdi:ear-hearing",
            iconFg: "mdi:waveform",
            title: "Alivio Tinnitus",
            description: "Terapia de muesca y ruidos de colores para calmar el zumbido.",
            color: "#2dd4bf"
        },
        {
            href: "/utilidades/calculadora-edad-mascotas/",
            iconBg: "mdi:paw",
            iconFg: "mdi:clock-time-eight-outline",
            title: "Calculadora Edad Mascotas",
            description: "Traduce años de perro y gato a años humanos con ciencia.",
            color: "#f59e0b"
        },
        {
            href: "/utilidades/visualizador-respiracion/",
            iconBg: "mdi:wind-power",
            iconFg: "mdi:lungs",
            title: "Respiración Consciente",
            description: "Visualizador de Box Breathing para reducir estrés y calmar la ansiedad.",
            color: "#3b82f6"
        },
        {
            href: "/utilidades/rastreador-cafeina/",
            iconBg: "mdi:coffee",
            iconFg: "mdi:sleep",
            title: "Simulador de Cafeína",
            description: "Rastrea la vida media de la cafeína en tu sistema para evitar el insomnio.",
            color: "#d97706"
        }
    ]
};
