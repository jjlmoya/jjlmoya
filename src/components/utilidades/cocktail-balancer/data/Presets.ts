
export interface PresetRecipe {
    id: string;
    name: string;
    icon: string;
    ingredients: { id: string; vol: number }[];
    description?: string;
}

export const COCKTAIL_PRESETS: PresetRecipe[] = [
    {
        id: 'daiquiri',
        name: 'Daiquiri Clásico',
        icon: 'mdi:glass-cocktail',
        description: 'El estándar de oro del equilibrio Sour.',
        ingredients: [
            { id: 'rum_white', vol: 60 },
            { id: 'juice_lime', vol: 30 },
            { id: 'syrup_simple_11', vol: 22.5 }
        ]
    },
    {
        id: 'margarita_tommys',
        name: "Tommy's Margarita",
        icon: 'mdi:glass-cocktail',
        description: 'Versión moderna resaltando el agave.',
        ingredients: [
            { id: 'tequila_blanco', vol: 60 },
            { id: 'juice_lime', vol: 30 },
            { id: 'syrup_agave', vol: 15 }
        ]
    },
    {
        id: 'whiskey_sour',
        name: 'Whiskey Sour',
        icon: 'mdi:glass-cocktail',
        description: 'Cuerpo, acidez y carácter.',
        ingredients: [
            { id: 'whiskey_bourbon', vol: 60 },
            { id: 'juice_lemon', vol: 30 },
            { id: 'syrup_simple_11', vol: 22.5 }
        ]
    },
    {
        id: 'gimlet',
        name: 'Gimlet (Fresco)',
        icon: 'mdi:glass-cocktail',
        description: 'Gin y lima, afilado y refrescante.',
        ingredients: [
            { id: 'gin_std', vol: 60 },
            { id: 'juice_lime', vol: 30 },
            { id: 'syrup_simple_11', vol: 22.5 }
        ]
    },
    {
        id: 'negroni',
        name: 'Negroni',
        icon: 'mdi:glass-cocktail',
        description: 'El rey del aperitivo. Amargo y dulce.',
        ingredients: [
            { id: 'gin_std', vol: 30 },
            { id: 'vermouth_sweet', vol: 30 },
            { id: 'liq_campari', vol: 30 }
        ]
    },
    {
        id: 'mai_tai',
        name: 'Mai Tai Tradicional',
        icon: 'mdi:palm-tree',
        description: 'Complejidad tropical tiki.',
        ingredients: [
            { id: 'rum_aged', vol: 60 },
            { id: 'juice_lime', vol: 30 },
            { id: 'liq_curacao', vol: 15 },
            { id: 'syrup_orgeat', vol: 7.5 },
            { id: 'syrup_rich_21', vol: 7.5 }
        ]
    },
    {
        id: 'pisco_sour',
        name: 'Pisco Sour',
        icon: 'mdi:glass-cocktail',
        description: 'El clásico peruano.',
        ingredients: [
            { id: 'pisco', vol: 60 },
            { id: 'juice_lime', vol: 30 },
            { id: 'syrup_simple_11', vol: 22.5 }
        ]
    },
    {
        id: 'tom_collins',
        name: 'Tom Collins',
        icon: 'mdi:glass-cocktail',
        description: 'Limonada de adultos.',
        ingredients: [
            { id: 'gin_std', vol: 60 },
            { id: 'juice_lemon', vol: 30 },
            { id: 'syrup_simple_11', vol: 15 },
            { id: 'mix_soda', vol: 60 }
        ]
    },
    {
        id: 'old_fashioned',
        name: 'Old Fashioned',
        icon: 'mdi:glass-cocktail',
        description: 'El cóctel original.',
        ingredients: [
            { id: 'whiskey_bourbon', vol: 60 },
            { id: 'syrup_simple_11', vol: 7.5 },
        ]
    },
    {
        id: 'boulevardier',
        name: 'Boulevardier',
        icon: 'mdi:glass-cocktail',
        description: 'El primo rico del Negroni.',
        ingredients: [
            { id: 'whiskey_bourbon', vol: 45 },
            { id: 'vermouth_sweet', vol: 30 },
            { id: 'liq_campari', vol: 30 }
        ]
    }
];
