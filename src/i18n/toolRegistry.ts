import { ALL_TOOLS as HOME_TOOLS, homeCategory } from "@jjlmoya/utils-home";
import { ALL_TOOLS as BIKE_TOOLS, bikeCategory } from "@jjlmoya/utils-bike";
import { ALL_TOOLS as ALCOHOL_TOOLS, alcoholCategory } from "@jjlmoya/utils-alcohol";
import { ALL_TOOLS as ASTRONOMY_TOOLS, astronomyCategory } from "@jjlmoya/utils-astronomy";
import { ALL_TOOLS as AUDIOVISUAL_TOOLS, audiovisualCategory } from "@jjlmoya/utils-audiovisual";
import { ALL_TOOLS as BABIES_TOOLS, babiesCategory } from "@jjlmoya/utils-babies";
import { ALL_TOOLS as CONVERTERS_TOOLS, convertersCategory } from "@jjlmoya/utils-converters";
import { ALL_TOOLS as COOKING_TOOLS, cookingCategory } from "@jjlmoya/utils-cooking";
import { ALL_TOOLS as CREATIVE_TOOLS, creativeCategory } from "@jjlmoya/utils-creative";
import { ALL_TOOLS as DRONES_TOOLS, dronesCategory } from "@jjlmoya/utils-drones";
import { ALL_TOOLS as EDUCATION_TOOLS, educationCategory } from "@jjlmoya/utils-education";
import { ALL_TOOLS as FILES_TOOLS, filesCategory } from "@jjlmoya/utils-files";
import { ALL_TOOLS as GAMES_TOOLS, gamesCategory } from "@jjlmoya/utils-games";
import { ALL_TOOLS as NAUTICAL_TOOLS, nauticalCategory } from "@jjlmoya/utils-nautical";
import { ALL_TOOLS as PETS_TOOLS, petsCategory } from "@jjlmoya/utils-pets";
import { ALL_TOOLS as SCIENCE_TOOLS, scienceCategory } from "@jjlmoya/utils-science";
import { ALL_TOOLS as TEXTILES_TOOLS, textilesCategory } from "@jjlmoya/utils-textiles";
import { ALL_TOOLS as TRAVEL_TOOLS, travelCategory } from "@jjlmoya/utils-travel";
import { ALL_TOOLS as SOCIAL_TOOLS, socialCategory } from "@jjlmoya/utils-social";

type LangSlugs = { en: string; fr: string };

const toolRegistry = new Map<object, string>();
const categoryRegistry = new Map<object, string>();
const categorySlugRegistry = new Map<string, LangSlugs>();

function register(tools: object[], category: object, key: string, slugs: LangSlugs) {
    for (const tool of tools) toolRegistry.set(tool, key);
    categoryRegistry.set(category, key);
    categorySlugRegistry.set(key, slugs);
}

register(HOME_TOOLS, homeCategory, "home", { en: "home", fr: "maison" });
register(BIKE_TOOLS, bikeCategory, "bikes", { en: "cycling", fr: "cyclisme" });
register(ALCOHOL_TOOLS, alcoholCategory, "alcohol", { en: "alcohol-party", fr: "alcool-fete" });
register(ASTRONOMY_TOOLS, astronomyCategory, "astronomy", { en: "astronomy", fr: "astronomie" });
register(AUDIOVISUAL_TOOLS, audiovisualCategory, "audiovisual", { en: "audiovisual-photography", fr: "audiovisuels-photographie" });
register(BABIES_TOOLS, babiesCategory, "babies", { en: "babies", fr: "bebes" });
register(CONVERTERS_TOOLS, convertersCategory, "converters", { en: "image-converters", fr: "convertisseurs-image" });
register(COOKING_TOOLS, cookingCategory, "cooking", { en: "cooking", fr: "cuisine" });
register(CREATIVE_TOOLS, creativeCategory, "creative", { en: "creativity-leisure", fr: "creativite-loisirs" });
register(DRONES_TOOLS, dronesCategory, "drones", { en: "drones", fr: "drones" });
register(EDUCATION_TOOLS, educationCategory, "education", { en: "education", fr: "education" });
register(FILES_TOOLS, filesCategory, "files", { en: "files-and-text", fr: "fichiers-et-texte" });
register(GAMES_TOOLS, gamesCategory, "games", { en: "games", fr: "jeux" });
register(NAUTICAL_TOOLS, nauticalCategory, "nautical", { en: "sailing-and-nautical", fr: "voile-et-nautisme" });
register(PETS_TOOLS, petsCategory, "pets", { en: "pets", fr: "animaux" });
register(SCIENCE_TOOLS, scienceCategory, "science", { en: "science", fr: "science" });
register(TEXTILES_TOOLS, textilesCategory, "textiles", { en: "textiles", fr: "textiles" });
register(TRAVEL_TOOLS, travelCategory, "travel", { en: "travel", fr: "voyages" });
register(SOCIAL_TOOLS, socialCategory, "social", { en: "social-media", fr: "reseaux-sociaux" });

export function getCategorySlug(categoryKey: string, lang: string): string | undefined {
    return categorySlugRegistry.get(categoryKey)?.[lang as keyof LangSlugs];
}

export const REGISTERED_PACKAGES = new Set([
    "@jjlmoya/utils-home",
    "@jjlmoya/utils-bike",
    "@jjlmoya/utils-alcohol",
    "@jjlmoya/utils-astronomy",
    "@jjlmoya/utils-audiovisual",
    "@jjlmoya/utils-babies",
    "@jjlmoya/utils-converters",
    "@jjlmoya/utils-cooking",
    "@jjlmoya/utils-creative",
    "@jjlmoya/utils-drones",
    "@jjlmoya/utils-education",
    "@jjlmoya/utils-files",
    "@jjlmoya/utils-games",
    "@jjlmoya/utils-nautical",
    "@jjlmoya/utils-pets",
    "@jjlmoya/utils-science",
    "@jjlmoya/utils-textiles",
    "@jjlmoya/utils-travel",
    "@jjlmoya/utils-social",
]);

export function getCategoryKeyForTool(tool: object): string | undefined {
    return toolRegistry.get(tool);
}

export function getAllRegisteredTools(): Array<[object, string]> {
    return Array.from(toolRegistry.entries());
}

export function getAllRegisteredCategories(): Array<[object, string]> {
    return Array.from(categoryRegistry.entries());
}

export async function buildEsSlugMap(): Promise<Record<string, string>> {
    const map: Record<string, string> = {};
    await Promise.all(
        Array.from(categoryRegistry.entries()).map(async ([entry, key]) => {
            const content = await (entry as any).i18n?.es?.();
            if (content?.slug) map[content.slug] = key;
        })
    );
    return map;
}
