export const GAMEBOB_URL = "https://www.gamebob.dev";

export const GAMEBOB_LANGS = ["en", "fr", "de", "it", "pt", "nl", "sv", "pl", "id", "tr", "ru", "ja", "ko", "zh"] as const;
export type GamebobLang = (typeof GAMEBOB_LANGS)[number];

export const LANG_METADATA: Record<GamebobLang, { label: string; flag: string }> = {
    en: { label: "English", flag: "🇬🇧" },
    fr: { label: "Français", flag: "🇫🇷" },
    de: { label: "Deutsch", flag: "🇩🇪" },
    it: { label: "Italiano", flag: "🇮🇹" },
    pt: { label: "Português", flag: "🇵🇹" },
    nl: { label: "Nederlands", flag: "🇳🇱" },
    sv: { label: "Svenska", flag: "🇸🇪" },
    pl: { label: "Polski", flag: "🇵🇱" },
    id: { label: "Bahasa Indonesia", flag: "🇮🇩" },
    tr: { label: "Türkçe", flag: "🇹🇷" },
    ru: { label: "Русский", flag: "🇷🇺" },
    ja: { label: "日本語", flag: "🇯🇵" },
    ko: { label: "한국어", flag: "🇰🇷" },
    zh: { label: "中文", flag: "🇨🇳" },
};

export type AlternateUrl = { lang: string; url: string };

export const urlSegments: Record<string, Record<GamebobLang, string>> = {
    utilities: {
        en: "utilities",
        fr: "utilitaires",
        de: "werkzeuge",
        it: "utilita",
        pt: "utilidades",
        nl: "hulpmiddelen",
        sv: "verktyg",
        pl: "narzedzia",
        id: "utilitas",
        tr: "araclar",
        ru: "instrumenty",
        ja: "utilities",
        ko: "utilities",
        zh: "utilities",
    },
    categories: {
        en: "categories",
        fr: "categories",
        de: "kategorien",
        it: "categorie",
        pt: "categorias",
        nl: "categorieen",
        sv: "kategorier",
        pl: "kategorie",
        id: "kategori",
        tr: "kategoriler",
        ru: "kategorii",
        ja: "categories",
        ko: "categories",
        zh: "categories",
    },
};
