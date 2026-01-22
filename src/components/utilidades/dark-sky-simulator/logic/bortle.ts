export interface BortleClass {
    level: number;
    title: string;
    description: string;
    nelm: number;
    sqm: string;
    starsVisible: boolean;
    milkyWayVisible: boolean;
    cloudsLit: boolean;
    skyBrightness: number;
}

export const BORTLE_SCALE: Record<number, BortleClass> = {
    1: {
        level: 1,
        title: "Cielo Oscuro Excelente",
        description:
            "El nirvana astronómico. La Vía Láctea proyecta sombras. La luz zodiacal es visible y colorida. M33 es visible a simple vista.",
        nelm: 8.0,
        sqm: "21.99 - 22.0",
        starsVisible: true,
        milkyWayVisible: true,
        cloudsLit: false,
        skyBrightness: 0.0,
    },
    2: {
        level: 2,
        title: "Cielo Oscuro Típico",
        description:
            "Sitios realmente oscuros. La Vía Láctea es muy estructurada. Nubes solo visibles como agujeros negros en el cielo.",
        nelm: 7.5,
        sqm: "21.89 - 21.99",
        starsVisible: true,
        milkyWayVisible: true,
        cloudsLit: false,
        skyBrightness: 0.1,
    },
    3: {
        level: 3,
        title: "Cielo Rural",
        description:
            "Vía Láctea compleja. Alguna contaminación lumínica en el horizonte. Las nubes están iluminadas cerca del horizonte pero oscuras arriba.",
        nelm: 7.0,
        sqm: "21.69 - 21.89",
        starsVisible: true,
        milkyWayVisible: true,
        cloudsLit: true,
        skyBrightness: 0.2,
    },
    4: {
        level: 4,
        title: "Transición Rural/Suburbana",
        description:
            "La Vía Láctea pierde detalle pero se ve. Domos de luz en el horizonte. Las nubes están iluminadas por abajo.",
        nelm: 6.5,
        sqm: "20.49 - 21.69",
        starsVisible: true,
        milkyWayVisible: true,
        cloudsLit: true,
        skyBrightness: 0.35,
    },
    5: {
        level: 5,
        title: "Cielo Suburbano",
        description:
            "La Vía Láctea es muy débil o invisible cerca del horizonte. Luz zodiacal rara vez visible. El cielo se ve grisáceo, no negro.",
        nelm: 6.0,
        sqm: "19.50 - 20.49",
        starsVisible: true,
        milkyWayVisible: true,
        cloudsLit: true,
        skyBrightness: 0.5,
    },
    6: {
        level: 6,
        title: "Cielo Suburbano Brillante",
        description:
            "Vía Láctea invisible. El cielo es gris brillante. Nubes muy brillantes. M31 (Andrómeda) apenas visible.",
        nelm: 5.5,
        sqm: "18.94 - 19.50",
        starsVisible: true,
        milkyWayVisible: false,
        cloudsLit: true,
        skyBrightness: 0.65,
    },
    7: {
        level: 7,
        title: "Transición Suburbana/Urbana",
        description:
            "Fondo del cielo gris claro. Fuentes de luz fuertes en todas direcciones. Solo las estrellas más brillantes son visibles.",
        nelm: 5.0,
        sqm: "18.38 - 18.94",
        starsVisible: true,
        milkyWayVisible: false,
        cloudsLit: true,
        skyBrightness: 0.8,
    },
    8: {
        level: 8,
        title: "Cielo Urbano",
        description:
            "El cielo es gris blanquecino o naranja. Se pueden leer titulares de periódico. Solo se ven constelaciones principales.",
        nelm: 4.5,
        sqm: "< 18.38",
        starsVisible: true,
        milkyWayVisible: false,
        cloudsLit: true,
        skyBrightness: 0.9,
    },
    9: {
        level: 9,
        title: "Cielo Urbano Interior",
        description:
            "El cielo es muy brillante, incluso en el cenit. Solo se ven la Luna, planetas y un puñado de estrellas brillantes.",
        nelm: 4.0,
        sqm: "< 18.00",
        starsVisible: false,
        milkyWayVisible: false,
        cloudsLit: true,
        skyBrightness: 1.0,
    },
};

export function getBortleData(level: number): BortleClass {
    const safeLevel = Math.max(1, Math.min(9, Math.floor(level)));
    return BORTLE_SCALE[safeLevel];
}
