import { homeCategory } from "@jjlmoya/utils-home";
import { bikeCategory } from "@jjlmoya/utils-bike";
import { alcoholCategory } from "@jjlmoya/utils-alcohol";
import { astronomyCategory } from "@jjlmoya/utils-astronomy";
import { audiovisualCategory } from "@jjlmoya/utils-audiovisual";
import { babiesCategory } from "@jjlmoya/utils-babies";
import { convertersCategory } from "@jjlmoya/utils-converters";
import { cookingCategory } from "@jjlmoya/utils-cooking";
import { creativeCategory } from "@jjlmoya/utils-creative";
import { dronesCategory } from "@jjlmoya/utils-drones";
import { educationCategory } from "@jjlmoya/utils-education";
import { filesCategory } from "@jjlmoya/utils-files";
import { gamesCategory } from "@jjlmoya/utils-games";
import { nauticalCategory } from "@jjlmoya/utils-nautical";
import { petsCategory } from "@jjlmoya/utils-pets";
import { scienceCategory } from "@jjlmoya/utils-science";
import { textilesCategory } from "@jjlmoya/utils-textiles";
import { travelCategory } from "@jjlmoya/utils-travel";
import { socialCategory } from "@jjlmoya/utils-social";
import { musicCategory } from "@jjlmoya/utils-music";
import { healthCategory } from "@jjlmoya/utils-health";
import { sportsCategory } from "@jjlmoya/utils-sports";
import { natureCategory } from "@jjlmoya/utils-nature";
import { developerCategory } from "@jjlmoya/utils-developer";
import { hardwareCategory } from "@jjlmoya/utils-hardware";
import { coffeeCategory } from "@jjlmoya/utils-coffee";
import { printing3dCategory } from "@jjlmoya/utils-printing3d";
import { financeCategory } from "@jjlmoya/utils-finance";
import { streamingCategory } from "@jjlmoya/utils-streaming";
import { statisticsCategory } from "@jjlmoya/utils-statistics";
import { diyCategory } from "@jjlmoya/utils-diy";
import { workCategory } from "@jjlmoya/utils-work";
import { toolsCategory } from "@jjlmoya/utils-tools";

export interface CategoryDef {
    key: string;
    entry: { icon?: string; i18n: Record<string, () => Promise<{ slug: string; title: string; description: string }>> };
    color: string;
}

const toolRegistry = new Map<object, string>();
const categoryRegistryMap = new Map<object, string>();
const categorySlugCache = new Map<string, Map<string, string | undefined>>();
export const CATEGORIES: CategoryDef[] = [];

function register(category: object, key: string, color: string) {
    categoryRegistryMap.set(category, key);
    CATEGORIES.push({ key, entry: category as CategoryDef["entry"], color });
}

register(homeCategory, "home", "#a855f7");
register(bikeCategory, "bikes", "#ef4444");
register(alcoholCategory, "alcohol", "#a855f7");
register(astronomyCategory, "astronomy", "#4f46e5");
register(audiovisualCategory, "audiovisual", "#8b5cf6");
register(babiesCategory, "babies", "#ec4899");
register(convertersCategory, "converters", "#6366f1");
register(cookingCategory, "cooking", "#f97316");
register(creativeCategory, "creative", "#ec4899");
register(dronesCategory, "drones", "#f97316");
register(educationCategory, "education", "#6366f1");
register(filesCategory, "files", "#3b82f6");
register(gamesCategory, "games", "#f43f5e");
register(nauticalCategory, "nautical", "#0ea5e9");
register(petsCategory, "pets", "#f59e0b");
register(scienceCategory, "science", "#f97316");
register(textilesCategory, "textiles", "#6366f1");
register(travelCategory, "travel", "#3b82f6");
register(socialCategory, "social", "#f43f5e");
register(musicCategory, "music", "#db2777");
register(healthCategory, "health", "#06b6d4");
register(sportsCategory, "sports", "#f97316");
register(natureCategory, "nature", "#10b981");
register(developerCategory, "developer", "#6366f1");
register(hardwareCategory, "hardware", "#3b82f6");
register(coffeeCategory, "coffee", "#92400e");
register(printing3dCategory, "printing3d", "#0284c7");
register(financeCategory, "finance", "#10b981");
register(streamingCategory, "streaming", "#a855f7");
register(statisticsCategory, "statistics", "#4f46e5");
register(diyCategory, "diy", "#2563eb");
register(workCategory, "work", "#3b82f6");
register(toolsCategory, "tools", "#64748b");

export async function getCategorySlug(categoryKey: string, lang: string): Promise<string | undefined> {
    let langMap = categorySlugCache.get(categoryKey);
    if (langMap?.has(lang)) return langMap.get(lang);
    if (!langMap) { langMap = new Map(); categorySlugCache.set(categoryKey, langMap); }
    const category = CATEGORIES.find((c) => c.key === categoryKey);
    const loader = category?.entry.i18n?.[lang];
    const slug = loader ? (await loader()).slug : undefined;
    langMap.set(lang, slug);
    return slug;
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

export async function getAllRegisteredTools(): Promise<Array<[object, string]>> {
    if (toolRegistry.size > 0) return Array.from(toolRegistry.entries());
    const { loadCategory } = await import('./loadCategory');
    await Promise.all(
        CATEGORIES.map(async (cat) => {
            const { ALL_TOOLS } = await loadCategory(cat.key);
            for (const tool of ALL_TOOLS) toolRegistry.set(tool, cat.key);
        })
    );
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
