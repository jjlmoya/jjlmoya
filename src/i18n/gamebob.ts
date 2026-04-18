import { GAMEBOB_URL, GAMEBOB_LANGS, urlSegments } from "./slugs";
import type { AlternateUrl, GamebobLang } from "./slugs";
import { buildEsSlugMap, getCategorySlug } from "./toolRegistry";

export type { AlternateUrl };

export async function buildGamebobUtilityUrl(lang: GamebobLang, categoryKey: string, toolSlug: string): Promise<string> {
    const utilSlug = urlSegments.utilities[lang];
    const catSegSlug = urlSegments.categories[lang];
    const catSlug = await getCategorySlug(categoryKey, lang);
    if (!utilSlug || !catSegSlug || !catSlug) return "";
    return `${GAMEBOB_URL}/${lang}/${utilSlug}/${catSegSlug}/${catSlug}/${toolSlug}/`;
}

export async function buildGamebobCategoryUrl(lang: GamebobLang, categoryKey: string): Promise<string> {
    const utilSlug = urlSegments.utilities[lang];
    const catSegSlug = urlSegments.categories[lang];
    const catSlug = await getCategorySlug(categoryKey, lang);
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
            const url = await buildGamebobUtilityUrl(lang, categoryKey, content.slug);
            if (url) results.push({ lang, url });
        })
    );

    return results;
}

export async function getCategoryAlternates(esPageSlug: string): Promise<AlternateUrl[]> {
    const esSlugMap = await buildEsSlugMap();
    const categoryKey = esSlugMap[esPageSlug];
    if (!categoryKey) return [];

    const results = await Promise.all(
        GAMEBOB_LANGS.map(async (lang) => {
            const url = await buildGamebobCategoryUrl(lang, categoryKey);
            return url ? { lang, url } : null;
        })
    );
    return results.filter((r) => r !== null) as AlternateUrl[];
}

const STATIC_PAGE_MAP: Record<string, Record<GamebobLang, string>> = {
    "/": { en: "/en/", fr: "/fr/", de: "/de/", it: "/it/", pt: "/pt/", nl: "/nl/", sv: "/sv/", pl: "/pl/", id: "/id/", tr: "/tr/", ru: "/ru/", ja: "/ja/", ko: "/ko/", zh: "/zh/" },
    "/apps": { en: "/en/apps/", fr: "/fr/apps/", de: "/de/apps/", it: "/it/apps/", pt: "/pt/apps/", nl: "/nl/apps/", sv: "/sv/apps/", pl: "/pl/apps/", id: "/id/apps/", tr: "/tr/apps/", ru: "/ru/apps/", ja: "/ja/apps/", ko: "/ko/apps/", zh: "/zh/apps/" },
    "/widgets": { en: "/en/widgets/", fr: "/fr/widgets/", de: "/de/widgets/", it: "/it/widgets/", pt: "/pt/widgets/", nl: "/nl/widgets/", sv: "/sv/widgets/", pl: "/pl/widgets/", id: "/id/widgets/", tr: "/tr/widgets/", ru: "/ru/widgets/", ja: "/ja/widgets/", ko: "/ko/widgets/", zh: "/zh/widgets/" },
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
