export const GAMEBOB_URL = "https://www.gamebob.dev";

export const GAMEBOB_LANGS = ["en", "fr"] as const;
export type GamebobLang = (typeof GAMEBOB_LANGS)[number];

export const LANG_METADATA: Record<GamebobLang, { label: string; flag: string }> = {
    en: { label: "English", flag: "🇬🇧" },
    fr: { label: "Français", flag: "🇫🇷" },
};

export type AlternateUrl = { lang: string; url: string };

export const urlSegments: Record<string, Record<GamebobLang, string>> = {
    utilities: { en: "utilities", fr: "utilitaires" },
    categories: { en: "categories", fr: "categories" },
};

