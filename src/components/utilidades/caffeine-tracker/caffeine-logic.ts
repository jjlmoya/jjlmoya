export interface Drink {
    id: string;
    name: string;
    description: string;
    mg: number;
    icon: string;
}

export const DRINK_PRESETS: Drink[] = [
    {
        id: "espresso",
        name: "Espresso",
        description: "60mg • 30ml",
        mg: 60,
        icon: "mdi:coffee-outline",
    },
    {
        id: "double_espresso",
        name: "Doble Espresso",
        description: "120mg • 60ml",
        mg: 120,
        icon: "mdi:coffee",
    },
    {
        id: "brewed",
        name: "Café de Filtro",
        description: "95mg • 250ml",
        mg: 95,
        icon: "mdi:coffee-maker-outline",
    },
    {
        id: "energy_small",
        name: "Bebida Energética",
        description: "80mg • 250ml",
        mg: 80,
        icon: "mdi:lightning-bolt",
    },
    {
        id: "monster",
        name: "Lata XL Energy",
        description: "160mg • 500ml",
        mg: 160,
        icon: "mdi:lightning-bolt-circle",
    },
    {
        id: "soda",
        name: "Refresco Cola",
        description: "35mg • 330ml",
        mg: 35,
        icon: "mdi:cup-water",
    },
    { id: "tea", name: "Té Negro", description: "45mg • 250ml", mg: 45, icon: "mdi:tea" },
];

export interface MetabolismProfile {
    id: string;
    label: string;
    halfLife: number;
    description: string;
}

export const METABOLISM_PROFILES: MetabolismProfile[] = [
    {
        id: "fast",
        label: "Rápido (Fumador)",
        halfLife: 3,
        description: "El tabaco acelera la eliminación del café.",
    },
    {
        id: "normal",
        label: "Estándar",
        halfLife: 5.5,
        description: "Promedio para un adulto sano.",
    },
    {
        id: "slow",
        label: "Lento (Anticonceptivos)",
        halfLife: 10,
        description: "Ciertos medicamentos ralentizan el proceso.",
    },
    {
        id: "pregnancy",
        label: "Muy Lento (Embarazo)",
        halfLife: 15,
        description: "Eliminación muy pausada.",
    },
];

export function calculateDecay(initialMg: number, hours: number, halfLife: number): number {
    return initialMg * Math.pow(0.5, hours / halfLife);
}

export function generateChartData(initialMg: number, halfLife: number, duration: number = 24) {
    const data = [];
    for (let h = 0; h <= duration; h += 0.5) {
        data.push({
            hour: h,
            mg: calculateDecay(initialMg, h, halfLife),
        });
    }
    return data;
}
