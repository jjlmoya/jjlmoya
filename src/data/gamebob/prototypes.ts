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
];
