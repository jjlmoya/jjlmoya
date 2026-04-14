import { ALL_TOOLS as HOME_TOOLS, homeCategory, homeCategorySEO } from "@jjlmoya/utils-home";
import { ALL_TOOLS as BIKE_TOOLS, bikeCategory, BikeCategorySEO } from "@jjlmoya/utils-bike";
import { ALL_TOOLS as ALCOHOL_TOOLS, alcoholCategory, AlcoholCategorySEO } from "@jjlmoya/utils-alcohol";
import { ALL_TOOLS as ASTRONOMY_TOOLS, astronomyCategory, AstronomyCategorySEO } from "@jjlmoya/utils-astronomy";
import { ALL_TOOLS as AUDIOVISUAL_TOOLS, audiovisualCategory, audiovisualCategorySEO } from "@jjlmoya/utils-audiovisual";
import { ALL_TOOLS as BABIES_TOOLS, babiesCategory, babiesCategorySEO } from "@jjlmoya/utils-babies";
import { ALL_TOOLS as CONVERTERS_TOOLS, convertersCategory, ConvertersCategorySEO } from "@jjlmoya/utils-converters";
import { ALL_TOOLS as COOKING_TOOLS, cookingCategory, CookingCategorySEO } from "@jjlmoya/utils-cooking";
import { ALL_TOOLS as CREATIVE_TOOLS, creativeCategory, creativeCategorySEO } from "@jjlmoya/utils-creative";
import { ALL_TOOLS as DRONES_TOOLS, dronesCategory, DronesCategorySEO } from "@jjlmoya/utils-drones";
import { ALL_TOOLS as EDUCATION_TOOLS, educationCategory, educationCategorySEO } from "@jjlmoya/utils-education";
import { ALL_TOOLS as FILES_TOOLS, filesCategory, filesCategorySEO } from "@jjlmoya/utils-files";
import { ALL_TOOLS as GAMES_TOOLS, gamesCategory, GamesCategorySEO } from "@jjlmoya/utils-games";
import { ALL_TOOLS as NAUTICAL_TOOLS, nauticalCategory, NauticalCategorySEO } from "@jjlmoya/utils-nautical";
import { ALL_TOOLS as PETS_TOOLS, petsCategory, PetsCategorySEO } from "@jjlmoya/utils-pets";
import { ALL_TOOLS as SCIENCE_TOOLS, scienceCategory, ScienceCategorySEO } from "@jjlmoya/utils-science";
import { ALL_TOOLS as TEXTILES_TOOLS, textilesCategory, textilesCategorySEO } from "@jjlmoya/utils-textiles";
import { ALL_TOOLS as TRAVEL_TOOLS, travelCategory, TravelCategorySEO } from "@jjlmoya/utils-travel";
import { ALL_TOOLS as SOCIAL_TOOLS, socialCategory, socialCategorySEO } from "@jjlmoya/utils-social";
import { ALL_TOOLS as MUSIC_TOOLS, musicCategory, musicCategorySEO } from "@jjlmoya/utils-music";
import { ALL_TOOLS as HEALTH_TOOLS, healthCategory, healthCategorySEO } from "@jjlmoya/utils-health";
import { ALL_TOOLS as SPORTS_TOOLS, sportsCategory, sportsCategorySEO } from "@jjlmoya/utils-sports";
import { ALL_TOOLS as NATURE_TOOLS, natureCategory, natureCategorySEO } from "@jjlmoya/utils-nature";
import { ALL_TOOLS as DEVELOPER_TOOLS, developerCategory, developerCategorySEO } from "@jjlmoya/utils-developer";
import { ALL_TOOLS as HARDWARE_TOOLS, hardwareCategory, hardwareCategorySEO } from "@jjlmoya/utils-hardware";
import { ALL_TOOLS as COFFEE_TOOLS, coffeeCategory, coffeeCategorySEO } from "@jjlmoya/utils-coffee";
import { ALL_TOOLS as PRINTING3D_TOOLS, printing3dCategory, printing3dCategorySEO } from "@jjlmoya/utils-printing3d";
import { ALL_TOOLS as FINANCE_TOOLS, financeCategory, financeCategorySEO } from "@jjlmoya/utils-finance";
import { ALL_TOOLS as STREAMING_TOOLS, streamingCategory, streamingCategorySEO } from "@jjlmoya/utils-streaming";
import { ALL_TOOLS as STATISTICS_TOOLS, statisticsCategory, statisticsCategorySEO } from "@jjlmoya/utils-statistics";
import { ALL_TOOLS as DIY_TOOLS, diyCategory, diyCategorySEO } from "@jjlmoya/utils-diy";
import { ALL_TOOLS as WORK_TOOLS, workCategory, workCategorySEO } from "@jjlmoya/utils-work";
import { ALL_TOOLS as TOOLS_TOOLS, toolsCategory, toolsCategorySEO } from "@jjlmoya/utils-tools";

type LangSlugs = { en: string; fr: string };

export interface CategoryDef {
    key: string;
    entry: { icon?: string; i18n: Record<string, () => Promise<{ slug: string; title: string; description: string }>> };
    SEOComponent: (props: Record<string, unknown>) => unknown;
    AllTools: Array<{ entry: { icons: { bg: string; fg: string }; i18n: Record<string, () => Promise<{ slug: string; title: string; description: string }>> } }>;
    color: string;
}

const toolRegistry = new Map<object, string>();
const categoryRegistryMap = new Map<object, string>();
const categorySlugRegistry = new Map<string, LangSlugs>();
export const CATEGORIES: CategoryDef[] = [];

function register(
    tools: object[],
    category: object,
    key: string,
    slugs: LangSlugs,
    SEOComponent: CategoryDef["SEOComponent"],
    color: string
) {
    for (const tool of tools) toolRegistry.set(tool, key);
    categoryRegistryMap.set(category, key);
    categorySlugRegistry.set(key, slugs);
    CATEGORIES.push({
        key,
        entry: category as CategoryDef["entry"],
        SEOComponent,
        AllTools: tools as CategoryDef["AllTools"],
        color,
    });
}

register(HOME_TOOLS, homeCategory, "home", { en: "home", fr: "maison" }, homeCategorySEO, "#a855f7");
register(BIKE_TOOLS, bikeCategory, "bikes", { en: "cycling", fr: "cyclisme" }, BikeCategorySEO, "#ef4444");
register(ALCOHOL_TOOLS, alcoholCategory, "alcohol", { en: "alcohol-party", fr: "alcool-fete" }, AlcoholCategorySEO, "#a855f7");
register(ASTRONOMY_TOOLS, astronomyCategory, "astronomy", { en: "astronomy", fr: "astronomie" }, AstronomyCategorySEO, "#4f46e5");
register(AUDIOVISUAL_TOOLS, audiovisualCategory, "audiovisual", { en: "audiovisual-photography", fr: "audiovisuels-photographie" }, audiovisualCategorySEO, "#8b5cf6");
register(BABIES_TOOLS, babiesCategory, "babies", { en: "babies", fr: "bebes" }, babiesCategorySEO, "#ec4899");
register(CONVERTERS_TOOLS, convertersCategory, "converters", { en: "image-converters", fr: "convertisseurs-image" }, ConvertersCategorySEO, "#6366f1");
register(COOKING_TOOLS, cookingCategory, "cooking", { en: "cooking", fr: "cuisine" }, CookingCategorySEO, "#f97316");
register(CREATIVE_TOOLS, creativeCategory, "creative", { en: "creativity-leisure", fr: "creativite-loisirs" }, creativeCategorySEO, "#ec4899");
register(DRONES_TOOLS, dronesCategory, "drones", { en: "drones", fr: "drones" }, DronesCategorySEO, "#f97316");
register(EDUCATION_TOOLS, educationCategory, "education", { en: "education", fr: "education" }, educationCategorySEO, "#6366f1");
register(FILES_TOOLS, filesCategory, "files", { en: "files-and-text", fr: "fichiers-et-texte" }, filesCategorySEO, "#3b82f6");
register(GAMES_TOOLS, gamesCategory, "games", { en: "games", fr: "jeux" }, GamesCategorySEO, "#f43f5e");
register(NAUTICAL_TOOLS, nauticalCategory, "nautical", { en: "sailing-and-nautical", fr: "voile-et-nautisme" }, NauticalCategorySEO, "#0ea5e9");
register(PETS_TOOLS, petsCategory, "pets", { en: "pets", fr: "animaux" }, PetsCategorySEO, "#f59e0b");
register(SCIENCE_TOOLS, scienceCategory, "science", { en: "science", fr: "science" }, ScienceCategorySEO, "#f97316");
register(TEXTILES_TOOLS, textilesCategory, "textiles", { en: "textiles", fr: "textiles" }, textilesCategorySEO, "#6366f1");
register(TRAVEL_TOOLS, travelCategory, "travel", { en: "travel", fr: "voyages" }, TravelCategorySEO, "#3b82f6");
register(SOCIAL_TOOLS, socialCategory, "social", { en: "social-media", fr: "reseaux-sociaux" }, socialCategorySEO, "#f43f5e");
register(MUSIC_TOOLS, musicCategory, "music", { en: "music", fr: "musique" }, musicCategorySEO, "#db2777");
register(HEALTH_TOOLS, healthCategory, "health", { en: "health", fr: "sante" }, healthCategorySEO, "#06b6d4");
register(SPORTS_TOOLS, sportsCategory, "sports", { en: "sports", fr: "sport" }, sportsCategorySEO, "#f97316");
register(NATURE_TOOLS, natureCategory, "nature", { en: "nature", fr: "nature" }, natureCategorySEO, "#10b981");
register(DEVELOPER_TOOLS, developerCategory, "developer", { en: "web-development", fr: "developpement-web" }, developerCategorySEO, "#6366f1");
register(HARDWARE_TOOLS, hardwareCategory, "hardware", { en: "hardware-tools", fr: "outils-materiels" }, hardwareCategorySEO, "#3b82f6");
register(COFFEE_TOOLS, coffeeCategory, "coffee", { en: "coffee", fr: "cafe" }, coffeeCategorySEO, "#92400e");
register(PRINTING3D_TOOLS, printing3dCategory, "printing3d", { en: "3d-printing", fr: "impression-3d" }, printing3dCategorySEO, "#0284c7");
register(FINANCE_TOOLS, financeCategory, "finance", { en: "finance", fr: "finances" }, financeCategorySEO, "#10b981");
register(STREAMING_TOOLS, streamingCategory, "streaming", { en: "streaming", fr: "streaming" }, streamingCategorySEO, "#a855f7");
register(STATISTICS_TOOLS, statisticsCategory, "statistics", { en: "statistics", fr: "statistiques" }, statisticsCategorySEO, "#4f46e5");
register(DIY_TOOLS, diyCategory, "diy", { en: "diy", fr: "bricolage" }, diyCategorySEO, "#2563eb");
register(WORK_TOOLS, workCategory, "work", { en: "work", fr: "travail" }, workCategorySEO, "#3b82f6");
register(TOOLS_TOOLS, toolsCategory, "tools", { en: "tools", fr: "outils" }, toolsCategorySEO, "#64748b");

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
    "@jjlmoya/utils-music",
    "@jjlmoya/utils-health",
    "@jjlmoya/utils-sports",
    "@jjlmoya/utils-nature",
    "@jjlmoya/utils-developer",
    "@jjlmoya/utils-hardware",
    "@jjlmoya/utils-coffee",
    "@jjlmoya/utils-printing3d",
    "@jjlmoya/utils-finance",
    "@jjlmoya/utils-streaming",
    "@jjlmoya/utils-statistics",
    "@jjlmoya/utils-diy",
    "@jjlmoya/utils-work",
    "@jjlmoya/utils-tools",
]);

export function getCategoryKeyForTool(tool: object): string | undefined {
    return toolRegistry.get(tool);
}

export function getAllRegisteredTools(): Array<[object, string]> {
    return Array.from(toolRegistry.entries());
}

export async function buildEsSlugMap(): Promise<Record<string, string>> {
    const map: Record<string, string> = {};
    await Promise.all(
        Array.from(categoryRegistryMap.entries()).map(async ([entry, key]) => {
            const content = await (entry as CategoryDef["entry"]).i18n?.es?.();
            if (content?.slug) map[content.slug] = key;
        })
    );
    return map;
}
