import type { SectionData } from "./types";
import { astronomyCategory, bortleVisualizer, deepSpaceScope, starExposureCalculator, telescopeResolution } from '@jjlmoya/utils-astronomy';

const LOCALE = 'es';

const [
    bortleContent,
    deepSpaceContent,
    starExposureContent,
    telescopeResolutionContent,
] = await Promise.all([
    bortleVisualizer.i18n[LOCALE]!(),
    deepSpaceScope.i18n[LOCALE]!(),
    starExposureCalculator.i18n[LOCALE]!(),
    telescopeResolution.i18n[LOCALE]!(),
]);

export const astronomySection: SectionData = {
    title: "Astronomía",
    slug: "astronomia",
    icon: astronomyCategory.icon,
    theme: "indigo",
    utilities: [
        {
            href: "/utilidades/simulador-cielo-oscuro/",
            iconBg: bortleVisualizer.icons.bg,
            iconFg: bortleVisualizer.icons.fg,
            title: bortleContent.title,
            description: bortleContent.description,
            color: "#4f46e5",
        },
        {
            href: "/utilidades/alcance-telescopio/",
            iconBg: deepSpaceScope.icons.bg,
            iconFg: deepSpaceScope.icons.fg,
            title: deepSpaceContent.title,
            description: deepSpaceContent.description,
            color: "#6366f1",
        },
        {
            href: "/utilidades/calculadora-regla-500/",
            iconBg: starExposureCalculator.icons.bg,
            iconFg: starExposureCalculator.icons.fg,
            title: starExposureContent.title,
            description: starExposureContent.description,
            color: "#f59e0b",
        },
        {
            href: "/utilidades/calculadora-resolucion-telescopio/",
            iconBg: telescopeResolution.icons.bg,
            iconFg: telescopeResolution.icons.fg,
            title: telescopeResolutionContent.title,
            description: telescopeResolutionContent.description,
            color: "#a855f7",
        },
    ],
};
