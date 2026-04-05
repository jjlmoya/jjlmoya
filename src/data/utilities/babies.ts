import type { SectionData } from "./types";
import {
    babiesCategory,
    babyFeedingCalculator, babySizeConverter, vaccinationCalendar,
    babyPercentileCalculator, fertileDaysEstimator, pregnancyCalculator,
} from '@jjlmoya/utils-babies';

const LOCALE = 'es';

const [
    feedingContent, sizeContent, vaccinationContent,
    percentileContent, fertileContent, pregnancyContent,
] = await Promise.all([
    babyFeedingCalculator.i18n[LOCALE]!(),
    babySizeConverter.i18n[LOCALE]!(),
    vaccinationCalendar.i18n[LOCALE]!(),
    babyPercentileCalculator.i18n[LOCALE]!(),
    fertileDaysEstimator.i18n[LOCALE]!(),
    pregnancyCalculator.i18n[LOCALE]!(),
]);

export const babiesSection: SectionData = {
    title: "Bebés y Embarazo",
    slug: "bebes-y-embarazo",
    icon: babiesCategory.icon,
    theme: "rose",
    utilities: [
        {
            href: "/utilidades/calculadora-dias-fertiles/",
            iconBg: fertileDaysEstimator.icons.bg,
            iconFg: fertileDaysEstimator.icons.fg,
            title: fertileContent.title,
            description: fertileContent.description,
            color: "#ec4899",
        },
        {
            href: "/utilidades/conversor-tallas-bebe/",
            iconBg: babySizeConverter.icons.bg,
            iconFg: babySizeConverter.icons.fg,
            title: sizeContent.title,
            description: sizeContent.description,
            color: "#60a5fa",
        },
        {
            href: "/utilidades/calendario-vacunacion-espana-bebes/",
            iconBg: vaccinationCalendar.icons.bg,
            iconFg: vaccinationCalendar.icons.fg,
            title: vaccinationContent.title,
            description: vaccinationContent.description,
            color: "#6366f1",
        },
        {
            href: "/utilidades/calculadora-tomas-bebe/",
            iconBg: babyFeedingCalculator.icons.bg,
            iconFg: babyFeedingCalculator.icons.fg,
            title: feedingContent.title,
            description: feedingContent.description,
            color: "#f43f5e",
        },
        {
            href: "/utilidades/percentil-peso-talla-bebe/",
            iconBg: babyPercentileCalculator.icons.bg,
            iconFg: babyPercentileCalculator.icons.fg,
            title: percentileContent.title,
            description: percentileContent.description,
            color: "#0d9488",
        },
        {
            href: "/utilidades/calculadora-semanas-embarazo/",
            iconBg: pregnancyCalculator.icons.bg,
            iconFg: pregnancyCalculator.icons.fg,
            title: pregnancyContent.title,
            description: pregnancyContent.description,
            color: "#8b5cf6",
        },
    ],
};
