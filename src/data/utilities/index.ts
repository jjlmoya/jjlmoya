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
import { nauticalSection } from "./nautical";
import { statisticsSection } from "./statistics";



import { natureSection } from "./nature";
import { alcoholSection } from "./alcohol";
import { creativeSection } from "./creative";
import { diySection } from "./diy";
import { bikeSection } from "./bike";
import { scienceSection } from "./science";
import { astronomySection } from "./astronomy";
import { printing3dSection } from "./printing3d";
import { audiovisualSection } from "./audiovisual";
import { socialSection } from "./social";
import { textileSection } from "./textiles";
import { converterSection } from "./converters";
import { travelSection } from "./travel";
import { educationSection } from "./education";
import { dronesSection } from "./drones";
import { coffeeSection } from "./coffee";
import { gamesSection } from "./games";
import { petsSection } from "./pets";
import { babiesSection } from "./babies";


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
    astronomySection,
    printing3dSection,
    scienceSection,
    audiovisualSection,
    converterSection,
    travelSection,
    educationSection,
    dronesSection,
    coffeeSection,
    gamesSection,
    petsSection,
    nauticalSection,
    statisticsSection,
    babiesSection,
];




export type { SectionData, UtilityItem } from "./types";
