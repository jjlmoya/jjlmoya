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
import { alcoholSection } from "./alcohol";
import { creativeSection } from "./creative";
import { diySection } from "./diy";
import { bikeSection } from "./bike";
import { scienceSection } from "./science";
import { audiovisualSection } from "./audiovisual";
import { textileSection } from "./textiles";

export const sections: SectionData[] = [
    cookingSection,
    homeSection,
    filesSection,
    musicSection,
    healthSection,
    devSection,
    hardwareSection,
    toolsSection,
    financeSection,
    natureSection,
    textileSection,
    streamingSection,
    alcoholSection,
    creativeSection,
    diySection,
    bikeSection,
    scienceSection,
    audiovisualSection,
];

export type { SectionData, UtilityItem } from "./types";
