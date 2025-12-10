// Main entry point for utilities data
import type { SectionData } from "./types";

import { financeSection } from "./finance";
import { cookingSection } from "./cooking";
import { homeSection } from "./home";
import { filesSection } from "./files";
import { musicSection } from "./music";
import { healthSection } from "./health";
import { devSection } from "./developer";
import { toolsSection } from "./tools";
import { streamingSection } from "./streaming";

export const sections: SectionData[] = [
    streamingSection,
    cookingSection,
    homeSection,
    filesSection,
    musicSection,
    healthSection,
    devSection,
    toolsSection,
    financeSection,
];

export type { SectionData, UtilityItem } from "./types";
