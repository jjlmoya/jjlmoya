import type { SectionData } from "./types";

import { financeSection } from "./finance";
import { workSection } from "./work";
import { cookingSection } from "./cooking";
import { homeSection } from "./home";
import { filesSection } from "./files";
import { musicSection } from "./music";
import { healthSection } from "./health";
import { sportsSection } from "./sports";
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
import { socialSection } from "./social";
import { textileSection } from "./textiles";
import { converterSection } from "./converters";
import { travelSection } from "./travel";
import { educationSection } from "./education";
import { dronesSection } from "./drones";


export const sections: SectionData[] = [
    cookingSection,
    homeSection,
    filesSection,
    socialSection,
    musicSection,
    healthSection,
    sportsSection,
    devSection,
    hardwareSection,
    toolsSection,
    financeSection,
    workSection,
    natureSection,
    textileSection,
    streamingSection,
    alcoholSection,
    creativeSection,
    diySection,
    bikeSection,
    scienceSection,
    audiovisualSection,
    converterSection,
    travelSection,
    educationSection,
    dronesSection,
];


export type { SectionData, UtilityItem } from "./types";
