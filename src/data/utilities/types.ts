export interface UtilityItem {
    title: string;
    description: string;
    href: string;
    iconBg: string;
    iconFg: string;
    color: string;
    appSlug?: string;
}

export interface SectionData {
    title: string;
    icon: string;
    theme:
        | "emerald"
        | "orange"
        | "purple"
        | "blue"
        | "pink"
        | "cyan"
        | "indigo"
        | "slate"
        | "rose"
        | "amber"
        | "nature";
    utilities: UtilityItem[];
}
