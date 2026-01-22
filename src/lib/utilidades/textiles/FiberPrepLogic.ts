export type FiberType = "protein" | "cellulosic";

export interface WOFCalculation {
    alum: number;
    creamOfTartar: number;
    iron: number;
}

export interface ThermalStep {
    temperature: number;
    time: number;
    description: string;
}

export class FiberPrepLogic {
    static getProtocol(fiberType: FiberType) {
        if (fiberType === "protein") {
            return {
                mordant: "Alumbre y Crémor Tártaro",
                description:
                    "Las fibras animales requieren un ambiente ácido y sales metálicas para abrir sus escamas.",
                steps: [
                    { time: 0, temp: 20, label: "Inicio" },
                    { time: 30, temp: 85, label: "Rampa de calentamiento" },
                    { time: 90, temp: 85, label: "Mantenimiento (Simmer)" },
                    { time: 150, temp: 20, label: "Enfriamiento lento" },
                ],
            };
        }
        return {
            mordant: "Taninos y Alumbre",
            description:
                "Las fibras vegetales no tienen afinidad natural por el alumbre; necesitan un pre-tratamiento con taninos.",
            steps: [
                { time: 0, temp: 20, label: "Baño de Taninos" },
                { time: 60, temp: 40, label: "Reposo prolongado" },
                { time: 120, temp: 80, label: "Baño de Alumbre" },
                { time: 180, temp: 20, label: "Aclarado" },
            ],
        };
    }

    static calculateWOF(weightG: number, fiberType: FiberType): WOFCalculation {
        if (fiberType === "protein") {
            return {
                alum: weightG * 0.15,
                creamOfTartar: weightG * 0.02,
                iron: weightG * 0.01,
            };
        }
        return {
            alum: weightG * 0.2,
            creamOfTartar: 0,
            iron: weightG * 0.02,
        };
    }

    static adjustPH(currentPH: number, targetPH: number, volumeLiters: number) {
        const diff = targetPH - currentPH;
        if (Math.abs(diff) < 0.1) return "pH óptimo";

        if (diff > 0) {
            return `Añadir Carbonato de Calcio o Soda Ash. Aprox. ${(diff * volumeLiters * 0.5).toFixed(1)}g para subir a ${targetPH}`;
        } else {
            return `Añadir Ácido Cítrico o Vinagre. Aprox. ${(Math.abs(diff) * volumeLiters * 0.2).toFixed(1)}ml para bajar a ${targetPH}`;
        }
    }
}
