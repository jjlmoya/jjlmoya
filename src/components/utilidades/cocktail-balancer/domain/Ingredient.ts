export type IngredientType =
    | "spirit"
    | "liqueur"
    | "citrus"
    | "syrup"
    | "mixer"
    | "bitter"
    | "other";

export interface Ingredient {
    id: string;
    name: string;
    type: IngredientType;
    abv: number;
    sugar: number;
    acid: number;
    bitterness: number;
    complexity: number;
    color: string;
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
    sugarConcentration: number;
    acidConcentration: number;
    balanceRatio: number;
    bitternessIndex: number;
    complexityIndex: number;
    finalColor: string;
}
