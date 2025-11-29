export interface PostMortemEntry {
    id: string;
    title: string;
    date: string;
    error: string;
    lesson: string;
    tags?: string[];
    image?: string;
}

export const postMortemEntries: PostMortemEntry[] = [
    {
        id: "color-beat-arbol-habilidades",
        title: "Color Beat y su Árbol de Habilidades (El 3:1 del Infierno)",
        date: "2025-11-29",
        image: "color-beat-fail.png",
        error: "Color Beat era un juego casual terminado. Pero mi síndrome del 'Dios Desarrollador' y mi obsesión por los *rogue-lites* me obligaron a sabotearlo. Le incrusté un monstruoso árbol de habilidades hexágonal con sinergias complejas en un juego que solo necesitaba colores. Convertí un sprint de tres semanas en un maratón de 2 meses, con la guinda de la soberbia: lo hice todo antes de que un solo jugador validara si quería esa complejidad.",
        lesson: "El QA no es una fase; es una penitencia por tu arrogancia. La métrica es clara: El tiempo de QA superó al desarrollo por un doloroso 3 a 1. Tres veces más tiempo depurando que creando, solo para garantizar que dos habilidades distintas no crasheen el juego. Lección: Keep it cutre. Un juego simple y vivo vale infinitamente más que una arquitectura preciosa que nadie jugará.",
        tags: ["scope-creep", "autolesión", "rogue-lite", "3:1"]
    }
];
