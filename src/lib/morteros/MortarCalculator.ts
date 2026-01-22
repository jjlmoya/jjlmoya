import type { PhaseKey, CalType, VitruvianPhase, MortarState, CalculationResult } from "./types";

export const VITRUVIAN_PHASES: Record<PhaseKey, VitruvianPhase> = {
    trullissatio: {
        name: "Trullissatio",
        commonName: "Enfoscado",
        layers: 2,
        ratio: { cal: 1, arena: 3 },
        thickness: 30,
        density: 1.6,
        color: "#d4c5b0",
        texture: "texture-rough",
        description: "Capa base rugosa. 2 manos de 15mm. Proporción 1:3 (Cal:Arena de río).",
    },
    arenato: {
        name: "Arenato",
        commonName: "Revoco",
        layers: 2,
        ratio: { cal: 1, arena: 2 },
        thickness: 16,
        density: 1.5,
        color: "#e6d5c0",
        texture: "texture-medium",
        description: "Capa intermedia. 2 manos de 8mm. Proporción 1:2 (Cal:Arena lavada).",
    },
    marmorato: {
        name: "Marmorato",
        commonName: "Enlucido",
        layers: 1,
        ratio: { cal: 1, marmol: 1 },
        thickness: 4,
        density: 1.2,
        color: "#f8f8f8",
        texture: "texture-smooth",
        description: "Acabado fino. 1 mano doble de 4mm. Proporción 1:1 (Cal:Polvo de mármol).",
    },
};

export const CAL_DENSITY: Record<CalType, number> = {
    pasta: 1.3,
    polvo: 0.65,
};

export const WASTE_FACTOR = 1.2;

export class MortarCalculator {
    static calculate(state: MortarState): CalculationResult {
        const phase = VITRUVIAN_PHASES[state.phase];
        const coverage = this.calculateCoverage(state, phase);
        const complementary = this.calculateComplementary(state, phase);

        return {
            coverageArea: coverage,
            ...complementary,
        };
    }

    private static calculateCoverage(state: MortarState, phase: VitruvianPhase): number {
        const materialKg = state.materialKg;
        let area = 0;

        if (state.materialType === "cal") {
            const calDensity = CAL_DENSITY[state.calType];
            const volumeLiters = materialKg / calDensity;

            const calParts = phase.ratio.cal;
            const totalParts = phase.ratio.cal + (phase.ratio.arena || phase.ratio.marmol || 0);
            const calFraction = calParts / totalParts;

            const thicknessMeters = phase.thickness / 1000;
            const unitConsumption = thicknessMeters * calFraction;

            area = volumeLiters / (unitConsumption * 1000 * WASTE_FACTOR);
        } else {
            const volumeLiters = materialKg / phase.density;
            const thicknessMeters = phase.thickness / 1000;

            area = volumeLiters / (thicknessMeters * 1000 * WASTE_FACTOR);
        }

        return Math.max(0, area);
    }

    private static calculateComplementary(
        state: MortarState,
        phase: VitruvianPhase
    ): { complementaryAmount: number; complementaryName: string; ratioText: string } {
        let complementaryAmount = 0;
        let complementaryName = "";
        let ratioText = "";

        if (state.materialType === "cal") {
            const calDensity = CAL_DENSITY[state.calType];
            const calVolumeLiters = state.materialKg / calDensity;

            const aggregateParts = phase.ratio.arena || phase.ratio.marmol || 0;
            const arenaVolumeLiters = calVolumeLiters * aggregateParts;

            const arenaDensity = phase.density;
            complementaryAmount = arenaVolumeLiters * arenaDensity;

            complementaryName = phase.ratio.arena ? "Arena" : "Mármol";
            ratioText = `${phase.ratio.cal}:${aggregateParts}`;
        } else {
            const arenaDensity = phase.density;
            const arenaVolumeLiters = state.materialKg / arenaDensity;

            const calParts = phase.ratio.cal;
            const aggregateParts = phase.ratio.arena || phase.ratio.marmol || 0;
            const calVolumeLiters = arenaVolumeLiters * (calParts / aggregateParts);

            const calDensity = CAL_DENSITY[state.calType];
            complementaryAmount = calVolumeLiters * calDensity;

            complementaryName = "Cal";
            ratioText = `${calParts}:${aggregateParts}`;
        }

        return {
            complementaryAmount,
            complementaryName,
            ratioText,
        };
    }
}
