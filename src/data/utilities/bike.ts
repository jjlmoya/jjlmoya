import { bikeCategory, fixedGear, spokeCalculator, gearCalculator } from '@jjlmoya/utils-bike/data';
import type { SectionData } from "./types";

const LOCALE = 'es';

const [fixedGearContent, spokeContent, gearContent] = await Promise.all([
    fixedGear.i18n[LOCALE]!(),
    spokeCalculator.i18n[LOCALE]!(),
    gearCalculator.i18n[LOCALE]!(),
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
        {
            href: "/utilidades/calculadora-desarrollos/",
            iconBg: gearCalculator.icons.bg,
            iconFg: gearCalculator.icons.fg,
            title: gearContent.title,
            description: gearContent.description,
            color: "#10b981",
        },
    ],
};