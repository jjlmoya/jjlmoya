import type { SectionData } from "./types";
import { alcoholCategory, alcoholClearance, beerCooler, carbonationCalculator, cocktailBalancer, partyKeg } from '@jjlmoya/utils-alcohol';

const LOCALE = 'es';

const [
    alcoholClearanceContent,
    beerCoolerContent,
    carbonationContent,
    cocktailContent,
    partyKegContent,
] = await Promise.all([
    alcoholClearance.i18n[LOCALE]!(),
    beerCooler.i18n[LOCALE]!(),
    carbonationCalculator.i18n[LOCALE]!(),
    cocktailBalancer.i18n[LOCALE]!(),
    partyKeg.i18n[LOCALE]!(),
]);

export const alcoholSection: SectionData = {
    title: "Alcohol & Party",
    slug: "alcohol",
    icon: alcoholCategory.icon,
    theme: "purple",
    utilities: [
        {
            href: "/utilidades/equilibrador-cocteles/",
            iconBg: cocktailBalancer.icons.bg,
            iconFg: cocktailBalancer.icons.fg,
            title: cocktailContent.title,
            description: cocktailContent.description,
            color: "#10b981",
        },
        {
            href: "/utilidades/calculadora-enfriamiento-cerveza/",
            iconBg: beerCooler.icons.bg,
            iconFg: beerCooler.icons.fg,
            title: beerCoolerContent.title,
            description: beerCoolerContent.description,
            color: "#f59e0b",
        },
        {
            href: "/utilidades/calculadora-barriles-fiesta/",
            iconBg: partyKeg.icons.bg,
            iconFg: partyKeg.icons.fg,
            title: partyKegContent.title,
            description: partyKegContent.description,
            color: "#F59E0B",
        },
        {
            href: "/utilidades/calculadora-carbonatacion/",
            iconBg: carbonationCalculator.icons.bg,
            iconFg: carbonationCalculator.icons.fg,
            title: carbonationContent.title,
            description: carbonationContent.description,
            color: "#D97706",
        },
        {
            href: "/utilidades/calculadora-alcohol-resaca/",
            iconBg: alcoholClearance.icons.bg,
            iconFg: alcoholClearance.icons.fg,
            title: alcoholClearanceContent.title,
            description: alcoholClearanceContent.description,
            color: "#a855f7",
        },
    ],
};
