export interface Prototype {
    title: string;
    slug: string;
    icon: string;
    color: string;
    borderColor: string;
    bgHover: string;
    description: string;
    verdict?: "liked" | "disliked";
}

export const prototypes: Prototype[] = [
    {
        title: "Evolución",
        slug: "evolucion",
        icon: "mdi:dna",
        color: "text-purple-400",
        borderColor: "border-purple-500/30",
        bgHover: "hover:bg-purple-500/10",
        description: "Alquimia del caos. Combina elementos, crea criaturas y enfréntalas.",
        verdict: "liked",
    },
    {
        title: "Scroll Velocity Momentum",
        slug: "scroll-momentum",
        icon: "mdi:mouse-move-vertical",
        color: "text-sky-400",
        borderColor: "border-sky-500/30",
        bgHover: "hover:bg-sky-500/10",
        description:
            "Propulsión inercial. Usa la velocidad del scroll como motor en un mundo sin fricción.",
    },
    {
        title: "Imperio de Deuda",
        slug: "imperio-deuda",
        icon: "mdi:office-building",
        color: "text-blue-500",
        borderColor: "border-blue-500/30",
        bgHover: "hover:bg-blue-500/10",
        description:
            "Domina el mercado global. Construye distritos, gestiona sinergias y liquida una deuda billonaria.",
    },
];
