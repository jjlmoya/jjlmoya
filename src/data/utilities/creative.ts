import type { SectionData } from "./types";
import {
    creativeCategory,
    excuseGenerator, fortuneCookie, synesthesiaPainter,
    zalgoGenerator, beadPatternGenerator, diceRoller,
} from '@jjlmoya/utils-creative';

const LOCALE = 'es';

const [
    excuseContent, fortuneContent, synesthesiaContent,
    zalgoContent, beadContent, diceContent,
] = await Promise.all([
    excuseGenerator.i18n[LOCALE]!(),
    fortuneCookie.i18n[LOCALE]!(),
    synesthesiaPainter.i18n[LOCALE]!(),
    zalgoGenerator.i18n[LOCALE]!(),
    beadPatternGenerator.i18n[LOCALE]!(),
    diceRoller.i18n[LOCALE]!(),
]);

export const creativeSection: SectionData = {
    title: "Creatividad & Ocio",
    slug: "creatividad-ocio",
    icon: creativeCategory.icons.bg,
    theme: "pink",
    utilities: [
        { href: "/utilidades/generador-excusas/", iconBg: excuseGenerator.icons.bg, iconFg: excuseGenerator.icons.fg, title: excuseContent.title, description: excuseContent.description, color: "#ec4899" },
        { href: "/utilidades/galleta-fortuna/", iconBg: fortuneCookie.icons.bg, iconFg: fortuneCookie.icons.fg, title: fortuneContent.title, description: fortuneContent.description, color: "#f59e0b" },
        { href: "/utilidades/pintor-sinestesia/", iconBg: synesthesiaPainter.icons.bg, iconFg: synesthesiaPainter.icons.fg, title: synesthesiaContent.title, description: synesthesiaContent.description, color: "#8b5cf6" },
        { href: "/utilidades/generador-zalgo/", iconBg: zalgoGenerator.icons.bg, iconFg: zalgoGenerator.icons.fg, title: zalgoContent.title, description: zalgoContent.description, color: "#9333ea" },
        { href: "/utilidades/generador-patrones-cuentas/", iconBg: beadPatternGenerator.icons.bg, iconFg: beadPatternGenerator.icons.fg, title: beadContent.title, description: beadContent.description, color: "#db2777" },
        { href: "/utilidades/lanzador-dados/", iconBg: diceRoller.icons.bg, iconFg: diceRoller.icons.fg, title: diceContent.title, description: diceContent.description, color: "#6366f1" },
    ],
};
