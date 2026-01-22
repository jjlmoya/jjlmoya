export type BMICategory =
    | "underweight"
    | "normal"
    | "overweight"
    | "obesity_1"
    | "obesity_2"
    | "obesity_3";

export interface BMIResult {
    bmi: number;
    category: BMICategory;
    label: string;
    description: string;
    color: string;
}

export class BMICalculator {
    static calculate(weightKg: number, heightCm: number): BMIResult {
        if (weightKg <= 0 || heightCm <= 0) {
            return {
                bmi: 0,
                category: "normal",
                label: "Esperando datos...",
                description: "Introduce tu peso y altura.",
                color: "text-slate-400",
            };
        }

        const heightM = heightCm / 100;
        const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

        return this.categorize(bmi);
    }

    private static categorize(bmi: number): BMIResult {
        if (bmi < 18.5) {
            return {
                bmi,
                category: "underweight",
                label: "Bajo Peso",
                description:
                    "Podría indicar desnutrición o problemas de salud. Consulta con un médico.",
                color: "text-blue-500",
            };
        } else if (bmi < 25) {
            return {
                bmi,
                category: "normal",
                label: "Peso Normal",
                description: "¡Buen trabajo! Mantén una dieta equilibrada y ejercicio regular.",
                color: "text-emerald-500",
            };
        } else if (bmi < 30) {
            return {
                bmi,
                category: "overweight",
                label: "Sobrepeso",
                description:
                    "Un ligero exceso de peso. Pequeños cambios en la dieta pueden ayudar.",
                color: "text-amber-500",
            };
        } else if (bmi < 35) {
            return {
                bmi,
                category: "obesity_1",
                label: "Obesidad I",
                description:
                    "Riesgo moderado de problemas cardiovasculares. Se recomienda supervisión.",
                color: "text-orange-600",
            };
        } else if (bmi < 40) {
            return {
                bmi,
                category: "obesity_2",
                label: "Obesidad II",
                description: "Riesgo alto de hipertensión y diabetes. Consulta a un especialista.",
                color: "text-rose-600",
            };
        } else {
            return {
                bmi,
                category: "obesity_3",
                label: "Obesidad III",
                description:
                    "Situación de riesgo muy alto. Es crucial buscar ayuda médica profesional.",
                color: "text-red-700",
            };
        }
    }
}
