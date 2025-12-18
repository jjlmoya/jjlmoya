export interface RipenessState {
    level: number;
    name: string;
    description: string;
    conservation: string;
    acceleration: string;
    suggestedUse: string;
    color: string;
}

export const RIPENESS_STAGES: Record<number, RipenessState> = {
    1: {
        level: 1,
        name: "Verde Esmeralda",
        description: "Contenido máximo de almidón resistente. Firmeza total.",
        conservation: "Ambiente (18-20°C). Evitar frío (<12°C).",
        acceleration: "Bolsa de papel con una manzana o tomate maduro.",
        suggestedUse: "Cocinar (tostones) o madurar.",
        color: "#059669"
    },
    2: {
        level: 2,
        name: "Amarillo Radiante",
        description: "Equilibrio perfecto entre firmeza y dulzor inicial.",
        conservation: "Lugar fresco, separar del racimo para frenar etileno.",
        acceleration: "Mantener en el racimo y envolver en plástico.",
        suggestedUse: "Consumo directo, ensaladas de frutas.",
        color: "#fbbf24"
    },
    3: {
        level: 3,
        name: "Moteado Dulce",
        description: "Pico de antioxidantes. Dulzor intenso y textura cremosa.",
        conservation: "Refrigerar para conservar pulpa (aunque la piel se oscurezca).",
        acceleration: "Calor suave (cerca de una fuente de calor, no directa).",
        suggestedUse: "Postres rápidos, batidos, snacks.",
        color: "#f59e0b"
    },
    4: {
        level: 4,
        name: "Maduro Canela",
        description: "Textura muy blanda. Ideal para repostería sin azúcar.",
        conservation: "Pelar y congelar inmediatamente.",
        acceleration: "Ya ha alcanzado su máximo.",
        suggestedUse: "Banana bread, tortitas, helados.",
        color: "#b45309"
    },
    5: {
        level: 5,
        name: "Pasado / Fermentado",
        description: "Proceso de degradación avanzado.",
        conservation: "No recomendable para consumo directo.",
        acceleration: "N/A",
        suggestedUse: "Compost o abono orgánico.",
        color: "#451a03"
    }
};

export class BananaEngine {
    static getStatus(level: number): RipenessState {
        const stage = Math.max(1, Math.min(5, Math.round(level)));
        return RIPENESS_STAGES[stage];
    }

    static calculateDays(level: number, temperature: number, humidity: number, hasPartners: boolean): number {
        const baseDaysPerStage = 3;
        const tempFactor = 20 / temperature;
        const humidityFactor = 1 + (humidity - 50) / 200;
        const partnerFactor = hasPartners ? 0.6 : 1.0;

        const remainingInStage = (1 - (level % 1 || 0.1)) * baseDaysPerStage;
        return Number((remainingInStage * tempFactor * humidityFactor * partnerFactor).toFixed(1));
    }
}
