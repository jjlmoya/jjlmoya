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
];
