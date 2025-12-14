export type IngredientType = 'spirit' | 'liqueur' | 'citrus' | 'syrup' | 'mixer' | 'bitter' | 'other';

export interface Ingredient {
    id: string;
    name: string;
    type: IngredientType;
    abv: number;       // Alcohol by Volume % (e.g., 40)
    sugar: number;     // Sugar content in g/100ml (approx)
    acid: number;      // Acidity in % (e.g., 6.0 for Lime)
    bitterness: number; // 0-10 scale
    complexity: number; // 0-10 scale
    color: string;     // Hex code (e.g. #FFFFFF)
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
    bitternessIndex: number; // 0-10
    complexityIndex: number; // 0-10
    finalColor: string; // Hex
}
