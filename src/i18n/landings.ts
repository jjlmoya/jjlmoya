import { ALL_LANDING_DEFINITIONS } from "@jjlmoya/landings";
import { GAMEBOB_LANGS, GAMEBOB_URL } from "./slugs";
import type { AlternateUrl } from "./slugs";

export async function getLandingAlternates(landingId: string): Promise<AlternateUrl[]> {
    const definition = ALL_LANDING_DEFINITIONS.find((landing) => landing.entry.id === landingId);
    if (!definition) return [];

    const results = await Promise.all(
        GAMEBOB_LANGS.map(async (lang) => {
            const loader = definition.entry.i18n[lang] ?? definition.entry.i18n.en;
            if (!loader) return null;

            const card = await loader();
            return { lang, url: `${GAMEBOB_URL}/${lang}/${card.slug}/` };
        })
    );

    return results.filter((result) => result !== null) as AlternateUrl[];
}
