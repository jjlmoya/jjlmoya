import type { SectionData } from "./types";
import { petsCategory, petAge, petRation } from '@jjlmoya/utils-pets/data';

const LOCALE = 'es';

const [petAgeContent, petRationContent] = await Promise.all([
    petAge.i18n[LOCALE]!(),
    petRation.i18n[LOCALE]!(),
]);

export const petsSection: SectionData = {
    title: "Mascotas",
    slug: "mascotas",
    icon: petsCategory.icon,
    theme: "amber",
    utilities: [
        {
            href: "/utilidades/calculadora-edad-mascotas/",
            iconBg: petAge.icons.bg,
            iconFg: petAge.icons.fg,
            title: petAgeContent.title,
            description: petAgeContent.description,
            color: "#f59e0b",
        },
        {
            href: "/utilidades/calculadora-racion-diaria-mascotas/",
            iconBg: petRation.icons.bg,
            iconFg: petRation.icons.fg,
            title: petRationContent.title,
            description: petRationContent.description,
            color: "#10b981",
        },
    ],
};
