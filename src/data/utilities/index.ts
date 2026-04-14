import { CATEGORIES } from "../../i18n/toolRegistry";
import type { SectionData } from "./types";

export const sections: SectionData[] = await Promise.all(
    CATEGORIES.map(async (catDef) => {
        const catContent = await catDef.entry.i18n.es!();

        const utilities = await Promise.all(
            catDef.AllTools.map(async (tool) => {
                const toolContent = await tool.entry.i18n.es?.();
                return {
                    href: `/utilidades/${toolContent?.slug || "unknown"}/`,
                    iconBg: tool.entry.icons.bg,
                    iconFg: tool.entry.icons.fg,
                    title: toolContent?.title.split("|")[0].trim() || "Herramienta",
                    description: toolContent?.description || "",
                    color: catDef.color,
                };
            })
        );

        return {
            title: catContent.title,
            slug: catContent.slug,
            icon: (catDef.entry as { icon?: string }).icon ?? "mdi:tools",
            utilities,
        };
    })
);

export type { SectionData, UtilityItem } from "./types";
