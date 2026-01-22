export interface BatterySpecs {
    voltage: number;
    cycles: number;
    temperature: number;
}

export interface SoHResult {
    soh: number;
    estimatedLife: number;
    healthStatus: "excelente" | "bueno" | "regular" | "critico";
    recommendations: string[];
}

export class BatteryLifeEstimator {
    public static calculate(specs: BatterySpecs): SoHResult {
        const cycleDegradation = (specs.cycles / 500) * 20;

        let tempPenalty = 1;
        if (specs.temperature > 30) tempPenalty = 1 + (specs.temperature - 30) * 0.05;
        if (specs.temperature > 45) tempPenalty = 2 + (specs.temperature - 45) * 0.1;
        if (specs.temperature < 10) tempPenalty = 1.2;

        let voltageStress = 1;
        if (specs.voltage > 4.05) voltageStress = 1.3;
        if (specs.voltage > 4.15) voltageStress = 1.8;
        if (specs.voltage < 3.2) voltageStress = 1.2;

        const totalDegradation = cycleDegradation * tempPenalty * voltageStress;
        const soh = Math.max(0, 100 - totalDegradation);

        const baseYears = 5;
        const remainingLifeRatio = soh / 100;
        const estimatedLife = Math.max(
            0,
            baseYears * remainingLifeRatio * (1 / (tempPenalty * voltageStress))
        );

        let healthStatus: SoHResult["healthStatus"] = "excelente";
        if (soh < 90) healthStatus = "bueno";
        if (soh < 80) healthStatus = "regular";
        if (soh < 65) healthStatus = "critico";

        const recommendations = this.getRecommendations(specs, soh);

        return {
            soh: Math.round(soh * 10) / 10,
            estimatedLife: Math.round(estimatedLife * 10) / 10,
            healthStatus,
            recommendations,
        };
    }

    private static getRecommendations(specs: BatterySpecs, soh: number): string[] {
        const recs: string[] = [];
        if (specs.temperature > 35)
            recs.push(
                "Reduce la temperatura ambiente o mejora la ventilación para evitar la oxidación del electrolito."
            );
        if (specs.voltage > 4.1)
            recs.push(
                "Evita mantener la batería al 100% de carga (4.2V) por periodos prolongados."
            );
        if (specs.voltage < 3.3)
            recs.push(
                "Evita descargas profundas; los ciclos entre 20% y 80% duplican la vida útil."
            );
        if (soh < 80)
            recs.push(
                "La capacidad ha caído por debajo del estándar óptimo. Considera un reemplazo si la autonomía es insuficiente."
            );
        if (recs.length === 0)
            recs.push(
                "Mantén los hábitos actuales, tu batería está en un rango de operación ideal."
            );
        return recs;
    }
}
