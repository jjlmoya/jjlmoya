import { bikeCategory, fixedGear, spokeCalculator } from '@jjlmoya/utils-bike/data';
import type { SectionData } from "./types";

const LOCALE = 'es';

const [fixedGearContent, spokeContent] = await Promise.all([
    fixedGear.i18n[LOCALE]!(),
    spokeCalculator.i18n[LOCALE]!(),
]);

export const bikeSection: SectionData = {
    title: "Ciclismo",
    slug: "ciclismo",
    icon: bikeCategory.icon,
    theme: "rose",
    utilities: [
        {
            href: "/utilidades/calculadora-fixie/",
            iconBg: fixedGear.icons.bg,
            iconFg: fixedGear.icons.fg,
            title: fixedGearContent.title,
            description: fixedGearContent.description,
            color: "#ef4444",
        },
        {
            href: "/utilidades/calculadora-radios/",
            iconBg: spokeCalculator.icons.bg,
            iconFg: spokeCalculator.icons.fg,
            title: spokeContent.title,
            description: spokeContent.description,
            color: "#6366f1",
        },
    ],
};