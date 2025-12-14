import type { Ingredient } from '../domain/Ingredient';

// Reference: Liquid Intelligence (Dave Arnold) & standard bartending charts
export const INGREDIENTS_DB: Ingredient[] = [
    // --- SPIRITS ---
    { id: 'gin_std', name: 'Ginebra (London Dry)', type: 'spirit', abv: 40, sugar: 0, acid: 0 },
    { id: 'vodka_std', name: 'Vodka', type: 'spirit', abv: 40, sugar: 0, acid: 0 },
    { id: 'rum_white', name: 'Ron Blanco (Ligero)', type: 'spirit', abv: 40, sugar: 0, acid: 0 },
    { id: 'rum_aged', name: 'Ron Añejo', type: 'spirit', abv: 40, sugar: 0.5, acid: 0 }, // Trace sugar often added
    { id: 'tequila_blanco', name: 'Tequila Blanco', type: 'spirit', abv: 40, sugar: 0, acid: 0 },
    { id: 'whiskey_bourbon', name: 'Bourbon Whiskey', type: 'spirit', abv: 45, sugar: 0, acid: 0 },
    { id: 'rye_whiskey', name: 'Rye Whiskey', type: 'spirit', abv: 50, sugar: 0, acid: 0 },
    { id: 'mezcal', name: 'Mezcal', type: 'spirit', abv: 45, sugar: 0, acid: 0 },
    { id: 'pisco', name: 'Pisco', type: 'spirit', abv: 40, sugar: 1, acid: 0 },

    // --- CITRUS / ACIDS ---
    { id: 'juice_lime', name: 'Zumo de Lima (Fresco)', type: 'citrus', abv: 0, sugar: 1.5, acid: 6.0 },
    { id: 'juice_lemon', name: 'Zumo de Limón', type: 'citrus', abv: 0, sugar: 2.0, acid: 6.0 },
    { id: 'juice_grapefruit', name: 'Zumo de Pomelo', type: 'citrus', abv: 0, sugar: 7.0, acid: 2.0 }, // Less acid, more sugar
    { id: 'juice_orange', name: 'Zumo de Naranja', type: 'citrus', abv: 0, sugar: 9.0, acid: 0.8 },
    { id: 'acid_solution_citric', name: 'Solución Ácido Cítrico (6%)', type: 'citrus', abv: 0, sugar: 0, acid: 6.0 },

    // --- SYRUPS / SWEETENERS ---
    { id: 'syrup_simple_11', name: 'Jarabe Simple (1:1)', type: 'syrup', abv: 0, sugar: 61.5, acid: 0 },
    { id: 'syrup_rich_21', name: 'Jarabe Rico (2:1)', type: 'syrup', abv: 0, sugar: 80.0, acid: 0 }, // approximate
    { id: 'syrup_honey', name: 'Jarabe de Miel (3:1)', type: 'syrup', abv: 0, sugar: 75.0, acid: 0.1 },
    { id: 'syrup_agave', name: 'Sirope de Agave', type: 'syrup', abv: 0, sugar: 70.0, acid: 0 },
    { id: 'syrup_grenadine', name: 'Granadina (Real)', type: 'syrup', abv: 0, sugar: 65.0, acid: 0.5 },
    { id: 'syrup_orgeat', name: 'Orgeat', type: 'syrup', abv: 0, sugar: 60.0, acid: 0 },

    // --- LIQUEURS ---
    { id: 'liq_cointreau', name: 'Cointreau / Triple Sec', type: 'liqueur', abv: 40, sugar: 25.0, acid: 0 },
    { id: 'liq_curacao', name: 'Dry Curaçao', type: 'liqueur', abv: 40, sugar: 20.0, acid: 0 },
    { id: 'liq_maraschino', name: 'Licor Maraschino', type: 'liqueur', abv: 32, sugar: 35.0, acid: 0 },
    { id: 'liq_campari', name: 'Campari', type: 'liqueur', abv: 25, sugar: 24.0, acid: 0 }, // Very bitter, but sweet
    { id: 'liq_aperol', name: 'Aperol', type: 'liqueur', abv: 11, sugar: 25.0, acid: 0 },
    { id: 'vermouth_sweet', name: 'Vermut Rojo (Dulce)', type: 'liqueur', abv: 16, sugar: 16.0, acid: 0.4 },
    { id: 'vermouth_dry', name: 'Vermut Dry', type: 'liqueur', abv: 18, sugar: 3.0, acid: 0.5 },
    { id: 'liq_coffee', name: 'Licor de Café (Kahlúa)', type: 'liqueur', abv: 20, sugar: 40.0, acid: 0.1 },
    { id: 'liq_amaretto', name: 'Amaretto', type: 'liqueur', abv: 28, sugar: 30.0, acid: 0 },
    { id: 'liq_stgermain', name: 'St. Germain', type: 'liqueur', abv: 20, sugar: 25.0, acid: 0 },

    // --- MIXERS ---
    { id: 'mix_soda', name: 'Agua con Gas / Soda', type: 'mixer', abv: 0, sugar: 0, acid: 0 },
    { id: 'mix_tonic', name: 'Tónica', type: 'mixer', abv: 0, sugar: 9.0, acid: 0.5 },
    { id: 'mix_cola', name: 'Cola', type: 'mixer', abv: 0, sugar: 10.6, acid: 0.1 }, // Phosporic acid is acid but low %
    { id: 'mix_gingerbeer', name: 'Ginger Beer', type: 'mixer', abv: 0, sugar: 12.0, acid: 0.1 },
];

export class IngredientRepository {
    static getAll(): Ingredient[] {
        return INGREDIENTS_DB.sort((a, b) => a.name.localeCompare(b.name));
    }

    static getById(id: string): Ingredient | undefined {
        return INGREDIENTS_DB.find(i => i.id === id);
    }

    static getByType(type: string): Ingredient[] {
        return INGREDIENTS_DB.filter(i => i.type === type);
    }
}
