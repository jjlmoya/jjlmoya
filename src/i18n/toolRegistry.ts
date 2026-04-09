import { ALL_TOOLS as HOME_TOOLS } from "@jjlmoya/utils-home";
import { ALL_TOOLS as BIKE_TOOLS } from "@jjlmoya/utils-bike";
import { ALL_TOOLS as ALCOHOL_TOOLS } from "@jjlmoya/utils-alcohol";
import { ALL_TOOLS as ASTRONOMY_TOOLS } from "@jjlmoya/utils-astronomy";
import { ALL_TOOLS as AUDIOVISUAL_TOOLS } from "@jjlmoya/utils-audiovisual";
import { ALL_TOOLS as BABIES_TOOLS } from "@jjlmoya/utils-babies";
import { ALL_TOOLS as CONVERTERS_TOOLS } from "@jjlmoya/utils-converters";
import { ALL_TOOLS as COOKING_TOOLS } from "@jjlmoya/utils-cooking";
import { ALL_TOOLS as CREATIVE_TOOLS } from "@jjlmoya/utils-creative";
import { ALL_TOOLS as DRONES_TOOLS } from "@jjlmoya/utils-drones";
import { ALL_TOOLS as EDUCATION_TOOLS } from "@jjlmoya/utils-education";
import { ALL_TOOLS as FILES_TOOLS } from "@jjlmoya/utils-files";
import { ALL_TOOLS as GAMES_TOOLS } from "@jjlmoya/utils-games";
import { ALL_TOOLS as NAUTICAL_TOOLS } from "@jjlmoya/utils-nautical";
import { ALL_TOOLS as PETS_TOOLS } from "@jjlmoya/utils-pets";
import { ALL_TOOLS as SCIENCE_TOOLS } from "@jjlmoya/utils-science";
import { ALL_TOOLS as TEXTILES_TOOLS } from "@jjlmoya/utils-textiles";
import { ALL_TOOLS as TRAVEL_TOOLS } from "@jjlmoya/utils-travel";

const toolRegistry = new Map<object, string>();

function register(tools: object[], categoryKey: string) {
    for (const tool of tools) {
        toolRegistry.set(tool, categoryKey);
    }
}

register(HOME_TOOLS, "home");
register(BIKE_TOOLS, "bikes");
register(ALCOHOL_TOOLS, "alcohol");
register(ASTRONOMY_TOOLS, "astronomy");
register(AUDIOVISUAL_TOOLS, "audiovisual");
register(BABIES_TOOLS, "babies");
register(CONVERTERS_TOOLS, "converters");
register(COOKING_TOOLS, "cooking");
register(CREATIVE_TOOLS, "creative");
register(DRONES_TOOLS, "drones");
register(EDUCATION_TOOLS, "education");
register(FILES_TOOLS, "files");
register(GAMES_TOOLS, "games");
register(NAUTICAL_TOOLS, "nautical");
register(PETS_TOOLS, "pets");
register(SCIENCE_TOOLS, "science");
register(TEXTILES_TOOLS, "textiles");
register(TRAVEL_TOOLS, "travel");

export function getCategoryKeyForTool(tool: object): string | undefined {
    return toolRegistry.get(tool);
}

export function getAllRegisteredTools(): Array<[object, string]> {
    return Array.from(toolRegistry.entries());
}
