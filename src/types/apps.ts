export interface AppBenefit {
    title: string;
    text: string;
    icon?: string;
}

export interface AppHighlight {
    label: string;
    value: string;
}

export interface AppMedia {
    icon: string;
    showcase: string;
    hero: string;
    screenshots: string[];
}

export interface AppStoreLinks {
    googlePlay?: string;
    appStore?: string;
    directDownload?: string;
}

export interface AppTheme {
    primary: string;
    primaryGradient: string;
    accent: string;
    fontHeading: string;
    radiusMain: string;
    glowAccent: string;
    headerTitleGradient: string;
    textTitleGradient: string;
    bgApp: string;
    bgSurface: string;
    bgCard: string;
    textMain: string;
    glass: string;
    glassBorderColor: string;
    glassHighlight: string;
    shadowPrimary: string;
    shadowCard: string;
}

export interface AppFeature {
    title: string;
    text: string;
    icon?: string;
}

export interface Application {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    theme: AppTheme;
    tagline: string;
    description: string;
    philosophy: string;
    quote?: {
        text: string;
        author?: string;
    };
    concept: {
        label: string;
        main: string;
        highlighted: string;
    };
    benefitsTitle: {
        main: string;
        highlighted: string;
    };
    media: AppMedia;
    stores: AppStoreLinks;
    benefits: AppBenefit[];
    features: AppFeature[];
    highlights: AppHighlight[];
}
