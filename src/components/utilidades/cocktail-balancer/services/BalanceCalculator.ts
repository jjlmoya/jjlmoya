import type { CocktailComponent, CocktailStats } from '../domain/Ingredient';

export class BalanceCalculator {

    /**
     * Analyzes a list of cocktail components and returns intrinsic statistics.
     * Does not use dilution (assuming built cocktail before ice/shake for base balance).
     */
    static calculate(components: CocktailComponent[]): CocktailStats {
        let totalVol = 0;
        let totalAlcoholVol = 0;
        let totalSugarGrams = 0;
        let totalAcidGrams = 0;

        components.forEach(comp => {
            if (comp.volumeMl <= 0) return;

            totalVol += comp.volumeMl;

            // ABV calculation: (ml * abv%) = ml of pure alcohol
            totalAlcoholVol += comp.volumeMl * (comp.ingredient.abv / 100);

            // Sugar calculation: (ml * g/100ml) / 100 = grams ??
            // sugar is usually g/100ml. So (10g/100ml) * 50ml = 5g.
            totalSugarGrams += comp.volumeMl * (comp.ingredient.sugar / 100);

            // Acid calculation: % is usually w/v (g/100ml) for citric acid.
            totalAcidGrams += comp.volumeMl * (comp.ingredient.acid / 100);
        });

        if (totalVol === 0) {
            return {
                totalVolumeMl: 0,
                finalAbv: 0,
                totalSugarGrams: 0,
                totalAcidGrams: 0,
                sugarConcentration: 0,
                acidConcentration: 0,
                balanceRatio: 0
            };
        }

        const finalAbv = (totalAlcoholVol / totalVol) * 100;
        const sugarConcentration = (totalSugarGrams / totalVol) * 100; // g/100ml
        const acidConcentration = (totalAcidGrams / totalVol) * 100; // %

        // Ratio: Grams of Sugar per Gram of Acid
        // Standard Sour: 22.5ml Simple(1:1) vs 22.5ml Lime.
        // Simple 1:1 = 61.5g/100ml => 22.5 * 0.615 = 13.8g Sugar.
        // Lime = 6g/100ml => 22.5 * 0.06 = 1.35g Acid.
        // Ratio = 13.8 / 1.35 = ~10.2

        // Wait, standard Sour is often 2oz Spirit, 0.75 Lime, 0.75 Simple.
        // Let's re-verify Standard Ratio.
        // Daiquiri: 60ml Rum, 30ml Lime, 22.5ml Simple.
        // Lime: 30 * 0.06 = 1.8g Acid.
        // Simple: 22.5 * 0.615 = 13.8g Sugar.
        // Ratio = 13.8 / 1.8 = 7.66.

        // Old Fashioned: 60ml Whiskey, 5ml Simple.
        // 5 * 0.615 = 3g Sugar. 
        // 0 Acid. Ratio = Infinity.

        // We will return the raw ratio, and let the UI interpret it based on Cocktail Family.
        const balanceRatio = totalAcidGrams > 0 ? (totalSugarGrams / totalAcidGrams) : totalSugarGrams > 0 ? 999 : 0;

        return {
            totalVolumeMl: totalVol,
            finalAbv,
            totalSugarGrams,
            totalAcidGrams,
            sugarConcentration,
            acidConcentration,
            balanceRatio
        };
    }

    static getBalanceDescription(stats: CocktailStats): { label: string, color: string, advice: string } {
        // Based on "Sour" Family Logic (Daiquiri/Sour/Margarita)
        // Sweet/Sour Sweet Spot is usually between 5.0 and 9.0 Sugar:Acid ratio by weight?

        // Let's look at "The Sour Law" visualizer expectation (2:1:1 volume).
        // 1 part Lime (6% acid) : 1 part Simple (61.5% sugar).
        // Mass Ratio = 61.5 / 6 = 10.25.
        // So a 1:1 volume ratio is a ~10.25 mass ratio.

        // Most modern palates prefer slightly drier, 0.75 simple to 1 lime. (Ratio ~7.5)

        const r = stats.balanceRatio;

        if (stats.totalAcidGrams === 0 && stats.totalSugarGrams < 2) return { label: "Espirituoso / Seco", color: "text-indigo-400", advice: "Sin agentes dulces ni ácidos significativos." };
        if (stats.totalAcidGrams === 0) return { label: "Solo Dulce (Old Fashioned)", color: "text-amber-400", advice: "Estilo Old Fashioned. Depende de la dilución." };

        if (r < 4) return { label: "Muy Ácido / Bone Dry", color: "text-red-500", advice: "Probablemente imbebible. Sube el azúcar." };
        if (r >= 4 && r < 6) return { label: "Ácido / Tart", color: "text-lime-400", advice: "Perfil refrescante y punzante. Bueno para días de calor." };
        if (r >= 6 && r < 9) return { label: "Equilibrado (Sour)", color: "text-emerald-400", advice: "El punto dulce clásico (Daiquiri, Sour, Gimlet)." };
        if (r >= 9 && r < 12) return { label: "Dulce / Comercial", color: "text-yellow-400", advice: "Aceptable para palates dulces, pero oculta el destilado." };
        return { label: "Empalagoso", color: "text-red-500", advice: "Demasiado azúcar. Necesita más ácido o alcohol." };
    }
}
