import { pizzametrics } from "./pizzametrics";
import { fortuneCookie } from "./fortune-cookie";
import { colorbeat } from "./colorbeat";
import { dayCheck } from "./day-check";
import type { Application } from "../../types/apps";

export const apps: Application[] = [
    dayCheck,
    fortuneCookie,
    colorbeat,
    pizzametrics
];

export default apps;
