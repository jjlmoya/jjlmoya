import type { CocktailComponent, CocktailStats } from "../domain/Ingredient";

export class BalanceCalculator {
    static calculate(components: CocktailComponent[]): CocktailStats {
        let totalVol = 0;
        let totalAlcoholVol = 0;
        let totalSugarGrams = 0;
        let totalAcidGrams = 0;

        let weightedBitterness = 0;
        let weightedComplexity = 0;
        let weightedR = 0;
        let weightedG = 0;
        let weightedB = 0;

        components.forEach((comp) => {
            if (comp.volumeMl <= 0) return;

            const vol = comp.volumeMl;
            totalVol += vol;

            totalAlcoholVol += vol * (comp.ingredient.abv / 100);
            totalSugarGrams += vol * (comp.ingredient.sugar / 100);
            totalAcidGrams += vol * (comp.ingredient.acid / 100);

            weightedBitterness += vol * (comp.ingredient.bitterness || 0);
            weightedComplexity += vol * (comp.ingredient.complexity || 0);

            const rgb = this.hexToRgb(comp.ingredient.color || "#ffffff");
            weightedR += vol * rgb.r;
            weightedG += vol * rgb.g;
            weightedB += vol * rgb.b;
        });

        if (totalVol === 0) {
            return {
                totalVolumeMl: 0,
                finalAbv: 0,
                totalSugarGrams: 0,
                totalAcidGrams: 0,
                sugarConcentration: 0,
                acidConcentration: 0,
                balanceRatio: 0,
                bitternessIndex: 0,
                complexityIndex: 0,
                finalColor: "#ffffff",
            };
        }

        const bitternessIndex = weightedBitterness / totalVol;
        const complexityIndex = weightedComplexity / totalVol;

        const finalR = Math.round(weightedR / totalVol);
        const finalG = Math.round(weightedG / totalVol);
        const finalB = Math.round(weightedB / totalVol);
        const finalColor = this.rgbToHex(finalR, finalG, finalB);

        const finalAbv = (totalAlcoholVol / totalVol) * 100;
        const sugarConcentration = (totalSugarGrams / totalVol) * 100;
        const acidConcentration = (totalAcidGrams / totalVol) * 100;
        const balanceRatio =
            totalAcidGrams > 0 ? totalSugarGrams / totalAcidGrams : totalSugarGrams > 0 ? 999 : 0;

        return {
            totalVolumeMl: totalVol,
            finalAbv,
            totalSugarGrams,
            totalAcidGrams,
            sugarConcentration,
            acidConcentration,
            balanceRatio,
            bitternessIndex,
            complexityIndex,
            finalColor,
        };
    }

    static getBalanceDescription(stats: CocktailStats): {
        label: string;
        color: string;
        advice: string;
    } {
        const r = stats.balanceRatio;

        if (stats.totalAcidGrams === 0 && stats.totalSugarGrams < 2)
            return {
                label: "Espirituoso / Seco",
                color: "text-indigo-400",
                advice: "Sin agentes dulces ni ácidos significativos.",
            };
        if (stats.totalAcidGrams === 0)
            return {
                label: "Solo Dulce (Old Fashioned)",
                color: "text-amber-400",
                advice: "Estilo Old Fashioned. Depende de la dilución.",
            };

        if (r < 4)
            return {
                label: "Muy Ácido / Bone Dry",
                color: "text-red-500",
                advice: "Probablemente imbebible. Sube el azúcar.",
            };
        if (r >= 4 && r < 6)
            return {
                label: "Ácido / Tart",
                color: "text-lime-400",
                advice: "Perfil refrescante. Bueno para aperitivos.",
            };
        if (r >= 6 && r < 9)
            return {
                label: "Equilibrado (Sour)",
                color: "text-emerald-400",
                advice: "El punto dulce clásico (Golden Ratio).",
            };
        if (r >= 9 && r < 12)
            return {
                label: "Dulce / Comercial",
                color: "text-yellow-400",
                advice: "Aceptable para palates dulces.",
            };
        return {
            label: "Empalagoso",
            color: "text-red-500",
            advice: "Demasiado azúcar. Necesita más ácido.",
        };
    }

    static getFixSuggestion(stats: CocktailStats): { action: string; amount: string } | null {
        const TARGET_RATIO = 7.5;

        if (stats.totalVolumeMl === 0) return null;
        if (stats.totalAcidGrams === 0 && stats.totalSugarGrams < 2) return null;
        if (stats.totalAcidGrams === 0 && stats.totalSugarGrams > 2)
            return { action: "add_bitters", amount: "+2 dashes Bitters" };

        const currentRatio = stats.balanceRatio;

        if (currentRatio >= 6.0 && currentRatio <= 9.0) return null;

        if (currentRatio < 6.0) {
            const targetSugar = TARGET_RATIO * stats.totalAcidGrams;
            const diffGrams = targetSugar - stats.totalSugarGrams;

            const vol = (diffGrams * 100) / 61.5;
            if (vol < 2.5) return null;
            return { action: "add_sugar", amount: `+${Math.ceil(vol / 2.5) * 2.5}ml Jarabe` };
        } else {
            const targetAcid = stats.totalSugarGrams / TARGET_RATIO;
            const diffGrams = targetAcid - stats.totalAcidGrams;

            const vol = (diffGrams * 100) / 6.0;
            if (vol < 2.5) return null;
            return { action: "add_acid", amount: `+${Math.ceil(vol / 2.5) * 2.5}ml Lima` };
        }
    }

    private static hexToRgb(hex: string): { r: number; g: number; b: number } {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : { r: 255, g: 255, b: 255 };
    }

    private static rgbToHex(r: number, g: number, b: number): string {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
}
