export const GAMEBOB_URL = "https://www.gamebob.dev";

export const GAMEBOB_LANGS = ["en", "fr"] as const;
export type GamebobLang = (typeof GAMEBOB_LANGS)[number];

export type AlternateUrl = { lang: string; url: string };

export const categorySlugMap: Record<string, Record<GamebobLang, string>> = {
    utilities: { en: "utilities", fr: "utilitaires" },
    categories: { en: "categories", fr: "categories" },
    bikes: { en: "cycling", fr: "cyclisme" },
    pets: { en: "pets", fr: "animaux" },
    alcohol: { en: "alcohol-party", fr: "alcool-fete" },
    astronomy: { en: "astronomy", fr: "astronomie" },
    audiovisual: { en: "audiovisual-photography", fr: "audiovisuels-photographie" },
    babies: { en: "babies", fr: "bebes" },
    converters: { en: "image-converters", fr: "convertisseurs-image" },
    creative: { en: "creativity-leisure", fr: "creativite-loisirs" },
    cooking: { en: "cooking", fr: "cuisine" },
    drones: { en: "drones", fr: "drones" },
    education: { en: "education", fr: "education" },
    games: { en: "games", fr: "jeux" },
    nautical: { en: "sailing-and-nautical", fr: "voile-et-nautisme" },
    science: { en: "science", fr: "science" },
    travel: { en: "travel", fr: "voyages" },
    textiles: { en: "textiles", fr: "textiles" },
    home: { en: "home", fr: "maison" },
    files: { en: "files-and-text", fr: "fichiers-et-texte" },
};

export const esSlugToCategoryKey: Record<string, string> = {
    ciclismo: "bikes",
    mascotas: "pets",
    alcohol: "alcohol",
    astronomia: "astronomy",
    audiovisual: "audiovisual",
    "bebes-y-embarazo": "babies",
    "convertidores-imagen": "converters",
    "creatividad-ocio": "creative",
    cocina: "cooking",
    drones: "drones",
    educacion: "education",
    "retos-y-juegos": "games",
    "vela-y-nautica": "nautical",
    ciencia: "science",
    viajes: "travel",
    textiles: "textiles",
    hogar: "home",
    "archivos-y-texto": "files",
};
