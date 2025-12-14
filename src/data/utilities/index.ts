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
import { hardwareSection } from "./hardware";

import { natureSection } from "./nature";

export const sections: SectionData[] = [
    natureSection,
    streamingSection,
    cookingSection,
    homeSection,
    filesSection,
    musicSection,
    healthSection,
    devSection,
    hardwareSection,
    toolsSection,
    financeSection,
];

export type { SectionData, UtilityItem } from "./types";
