import { GAMEBOB_URL, GAMEBOB_LANGS, urlSegments } from "./slugs";
import type { AlternateUrl, GamebobLang } from "./slugs";
import { buildEsSlugMap, getCategorySlug } from "./toolRegistry";

export type { AlternateUrl };

export function buildGamebobUtilityUrl(lang: GamebobLang, categoryKey: string, toolSlug: string): string {
    const utilSlug = urlSegments.utilities[lang];
    const catSegSlug = urlSegments.categories[lang];
    const catSlug = getCategorySlug(categoryKey, lang);
    if (!utilSlug || !catSegSlug || !catSlug) return "";
    return `${GAMEBOB_URL}/${lang}/${utilSlug}/${catSegSlug}/${catSlug}/${toolSlug}/`;
}

export function buildGamebobCategoryUrl(lang: GamebobLang, categoryKey: string): string {
    const utilSlug = urlSegments.utilities[lang];
    const catSegSlug = urlSegments.categories[lang];
    const catSlug = getCategorySlug(categoryKey, lang);
    if (!utilSlug || !catSegSlug || !catSlug) return "";
    return `${GAMEBOB_URL}/${lang}/${utilSlug}/${catSegSlug}/${catSlug}/`;
}

export async function getUtilityAlternates(tool: { entry: any }, categoryKey: string): Promise<AlternateUrl[]> {
    const { entry } = tool;
    const results: AlternateUrl[] = [];

    await Promise.all(
        GAMEBOB_LANGS.map(async (lang) => {
            if (!entry.i18n?.[lang]) return;
            const content = await entry.i18n[lang]();
            const url = buildGamebobUtilityUrl(lang, categoryKey, content.slug);
            if (url) results.push({ lang, url });
        })
    );

    return results;
}

export async function getCategoryAlternates(esPageSlug: string): Promise<AlternateUrl[]> {
    const esSlugMap = await buildEsSlugMap();
    const categoryKey = esSlugMap[esPageSlug];
    if (!categoryKey) return [];

    return GAMEBOB_LANGS.reduce<AlternateUrl[]>((acc, lang) => {
        const url = buildGamebobCategoryUrl(lang, categoryKey);
        if (url) acc.push({ lang, url });
        return acc;
    }, []);
}

const STATIC_PAGE_MAP: Record<string, Record<GamebobLang, string>> = {
    "/": { en: "/en/", fr: "/fr/" },
    "/apps": { en: "/en/apps/", fr: "/fr/apps/" },
    "/widgets": { en: "/en/widgets/", fr: "/fr/widgets/" },
};

export function getStaticPageAlternates(pathname: string): AlternateUrl[] {
    const normalized = pathname.replace(/\/$/, "") || "/";
    const paths = STATIC_PAGE_MAP[normalized];
    if (!paths) return [];
    return GAMEBOB_LANGS.map((lang) => ({ lang, url: `${GAMEBOB_URL}${paths[lang]}` }));
}

export function getUtilitiesHubAlternates(): AlternateUrl[] {
    return GAMEBOB_LANGS.map((lang) => ({
        lang,
        url: `${GAMEBOB_URL}/${lang}/${urlSegments.utilities[lang]}/`,
    }));
}
