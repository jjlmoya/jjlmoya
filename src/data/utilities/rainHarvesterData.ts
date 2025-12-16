export interface RoofMaterial {
    id: string;
    name: string;
    coefficient: number;
}

export const ROOF_MATERIALS: RoofMaterial[] = [
    { id: "metal", name: "Metal / Teja Esmaltada", coefficient: 0.95 },
    { id: "clay", name: "Teja Arábica / Arcilla", coefficient: 0.85 },
    { id: "concrete", name: "Hormigón / Asfalto", coefficient: 0.85 },
    { id: "gravel", name: "Grava / Techo Verde", coefficient: 0.60 },
];

export const FILTER_EFFICIENCY = 0.90;
