import { pizzametrics } from "./pizzametrics";
import { fortuneCookie } from "./fortune-cookie";
import { colorbeat } from "./colorbeat";
import type { Application } from "../../types/apps";

export const apps: Application[] = [
    colorbeat,
    fortuneCookie,
    pizzametrics
];

export default apps;
