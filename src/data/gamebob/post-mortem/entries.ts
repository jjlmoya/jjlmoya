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
        id: "ansiedad-stores",
        title: "Ansiedad por las Stores",
        date: "2025-12-24",
        image: "ansiedad-stores.png",
        error: "Color Beat estaba listo hace semanas. Sin embargo, el pánico a lo burocrático —las capturas de pantalla, las descripciones SEO, las políticas de privacidad y el proceso técnico de subida a Google Play— se convirtió en mi mayor enemigo. Lo que eran meros trámites los transformé mentalmente en una montaña insuperable, una 'bola' de ansiedad que drenó mi energía y postergó el lanzamiento sin motivo técnico real.",
        lesson: "Paso a paso, la montaña no es tan alta. Al final, dedicarle dos tardes a picar piedra burocrática te quita un peso de encima que llevas arrastrando meses. Ha sido el motivo de este retraso, pero nunca lo será para el siguiente juego: ahora que el camino está trillado, la publicación se integra como una fase más del desarrollo, no como un evento traumático final. Lección aprendida: No dejes que el marketing de guerrilla y la administración te paralicen el código.",
        tags: ["burocracia", "mindset", "lanzamiento", "stores"],
    },
    {
        id: "color-beat-arbol-habilidades",
        title: "Color Beat y su Árbol de Habilidades (El 3:1 del Infierno)",
        date: "2025-12-24",
        image: "color-beat-fail.png",
        error: "Color Beat era un juego casual terminado. Pero mi síndrome del 'Dios Desarrollador' y mi obsesión por los *rogue-lites* me obligaron a sabotearlo. Le incrusté un monstruoso árbol de habilidades hexágonal con sinergias complejas en un juego que solo necesitaba colores. Convertí un sprint de tres semanas en un maratón de 2 meses, con la guinda de la soberbia: lo hice todo antes de que un solo jugador validara si quería esa complejidad.",
        lesson: "El QA no es una fase; es una penitencia por tu arrogancia. La métrica es clara: El tiempo de QA superó al desarrollo por un doloroso 3 a 1. Tres veces más tiempo depurando que creando, solo para garantizar que dos habilidades distintas no crasheen el juego. Lección: Keep it cutre. Un juego simple y vivo vale infinitamente más que una arquitectura preciosa que nadie jugará.",
        tags: ["scope-creep", "autolesión", "rogue-lite", "3:1"],
    },
];
