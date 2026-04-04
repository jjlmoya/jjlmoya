import type { SectionData } from "./types";
import {
    nauticalCategory,
    tideCalculator, underKeel, nauticalConverter,
    speedConverter, endurance, sailArea,
} from '@jjlmoya/utils-nautical';

const LOCALE = 'es';

const [
    tideContent, underKeelContent, nauticalConverterContent,
    speedContent, enduranceContent, sailAreaContent,
] = await Promise.all([
    tideCalculator.i18n[LOCALE]!(),
    underKeel.i18n[LOCALE]!(),
    nauticalConverter.i18n[LOCALE]!(),
    speedConverter.i18n[LOCALE]!(),
    endurance.i18n[LOCALE]!(),
    sailArea.i18n[LOCALE]!(),
]);

export const nauticalSection: SectionData = {
    title: "Vela y Náutica",
    slug: "vela-y-nautica",
    icon: nauticalCategory.icon,
    theme: "blue",
    utilities: [
        {
            href: "/utilidades/calculadora-altura-marea/",
            iconBg: tideCalculator.icons.bg,
            iconFg: tideCalculator.icons.fg,
            title: tideContent.title,
            description: tideContent.description,
            color: "#0074B7",
        },
        {
            href: "/utilidades/calculador-paso-de-bajo/",
            iconBg: underKeel.icons.bg,
            iconFg: underKeel.icons.fg,
            title: underKeelContent.title,
            description: underKeelContent.description,
            color: "#003B73",
        },
        {
            href: "/utilidades/conversor-unidades-nauticas/",
            iconBg: nauticalConverter.icons.bg,
            iconFg: nauticalConverter.icons.fg,
            title: nauticalConverterContent.title,
            description: nauticalConverterContent.description,
            color: "#0077be",
        },
        {
            href: "/utilidades/calculadora-superficie-velica/",
            iconBg: sailArea.icons.bg,
            iconFg: sailArea.icons.fg,
            title: sailAreaContent.title,
            description: sailAreaContent.description,
            color: "#0055a4",
        },
        {
            href: "/utilidades/conversor-velocidad-nautica/",
            iconBg: speedConverter.icons.bg,
            iconFg: speedConverter.icons.fg,
            title: speedContent.title,
            description: speedContent.description,
            color: "#004F98",
        },
        {
            href: "/utilidades/calculadora-autonomia-nautica/",
            iconBg: endurance.icons.bg,
            iconFg: endurance.icons.fg,
            title: enduranceContent.title,
            description: enduranceContent.description,
            color: "#e01e37",
        },
    ],
};
