export type MacronutrientType = 'carbs' | 'protein' | 'fat' | 'liquid' | 'fiber';

export interface DigestionStage {
    name: string;
    description: string;
    percentage: number;
    ph: string;
    durationMinutes: number;
}

export class DigestionCalculator {
    private readonly baseStages = [
        { id: 'stomach', name: 'Estómago', baseDuration: 180, ph: '1.5 - 3.5' },
        { id: 'small_intestine', name: 'Intestino Delgado', baseDuration: 240, ph: '6.0 - 7.4' },
        { id: 'large_intestine', name: 'Intestino Grueso', baseDuration: 1440, ph: '5.5 - 7.0' }
    ];

    calculateStages(startTime: Date, macronutrients: MacronutrientType[]): DigestionStage[] {
        const multipliers = this.getMultipliers(macronutrients);
        const now = new Date();
        const elapsedMinutes = (now.getTime() - startTime.getTime()) / 60000;

        let cumulativeMinutes = 0;
        return this.baseStages.map(stage => {
            const adjustedDuration = stage.baseDuration * multipliers;
            const stageElapsed = Math.max(0, Math.min(adjustedDuration, elapsedMinutes - cumulativeMinutes));
            const percentage = (stageElapsed / adjustedDuration) * 100;

            cumulativeMinutes += adjustedDuration;

            return {
                name: stage.name,
                description: this.getStageDescription(stage.id, percentage),
                percentage,
                ph: stage.ph,
                durationMinutes: adjustedDuration
            };
        });
    }

    private getMultipliers(macronutrients: MacronutrientType[]): number {
        if (macronutrients.includes('liquid')) return 0.5;

        let multiplier = 1.0;
        if (macronutrients.includes('fat')) multiplier += 0.5;
        if (macronutrients.includes('protein')) multiplier += 0.3;
        if (macronutrients.includes('fiber')) multiplier += 0.2;
        if (macronutrients.includes('carbs')) multiplier -= 0.1;

        return Math.max(0.5, multiplier);
    }

    private getStageDescription(id: string, percentage: number): string {
        if (percentage === 0) return 'Esperando llegada...';
        if (percentage === 100) return 'Procesado.';

        switch (id) {
            case 'stomach':
                return 'Descomposición ácida en curso.';
            case 'small_intestine':
                return 'Absorción de nutrientes activa.';
            case 'large_intestine':
                return 'Fermentación y reabsorción de agua.';
            default:
                return 'En proceso.';
        }
    }
}
