import { pizzametrics } from "./pizzametrics";
import { fortuneCookie } from "./fortune-cookie";
import { colorbeat } from "./colorbeat";
import { dayCheck } from "./day-check";
import { monmons } from "./monmons";
import { missiopolis } from "./missiopolis";
import { lexiCrash } from "./lexi-crash";
import { digBot } from "./dig-bot";
import type { Application } from "../../types/apps";

export const apps: Application[] = [
    dayCheck,
    digBot,
    lexiCrash,
    fortuneCookie,
    colorbeat,
    pizzametrics,
    monmons,
    missiopolis,
];

export default apps;
