export type PhaseKey = "trullissatio" | "arenato" | "marmorato";
export type CalType = "pasta" | "polvo";
export type MaterialType = "cal" | "arena";

export interface VitruvianPhase {
    name: string;
    commonName: string;
    layers: number;
    ratio: { cal: number; arena?: number; marmol?: number };
    thickness: number;
    density: number;
    color: string;
    texture: string;
    description: string;
}

export interface MortarState {
    phase: PhaseKey;
    materialType: MaterialType;
    calType: CalType;
    materialKg: number;
}

export interface CalculationResult {
    coverageArea: number; // m2
    complementaryAmount: number; // kg
    complementaryName: string;
    ratioText: string;
}
