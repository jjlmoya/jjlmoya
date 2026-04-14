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
    slug: string;
    icon: string;
    utilities: UtilityItem[];
}
