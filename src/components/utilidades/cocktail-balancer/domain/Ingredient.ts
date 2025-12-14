export type IngredientType = 'spirit' | 'liqueur' | 'citrus' | 'syrup' | 'mixer' | 'bitter' | 'other';

export interface Ingredient {
    id: string;
    name: string;
    type: IngredientType;
    abv: number;       // Alcohol by Volume % (e.g., 40)
    sugar: number;     // Sugar content in g/100ml (approx)
    acid: number;      // Acidity in % (e.g., 6.0 for Lime)
    description?: string;
}

export interface CocktailComponent {
    ingredient: Ingredient;
    volumeMl: number;
}

export interface CocktailStats {
    totalVolumeMl: number;
    finalAbv: number;
    totalSugarGrams: number;
    totalAcidGrams: number;
    sugarConcentration: number; // g/100ml
    acidConcentration: number;  // %
    balanceRatio: number; // Sugar / Acid ratio
}
