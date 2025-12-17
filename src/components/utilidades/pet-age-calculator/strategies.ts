
export interface PetAgeStrategy {
    calculateHumanAge(chronologicalAge: number, size?: string): number;
    getLifeStage(humanAge: number): string;
    getNextMilestone(chronologicalAge: number): string;
}

export class DogStrategy implements PetAgeStrategy {
    calculateHumanAge(age: number, size: string = "medium"): number {
        if (age < 0) return 0;
        if (age === 0) return 0;
        if (age === 1) return 15;
        if (age === 2) return 24;

        const base = 24;
        const yearsAfterTwo = age - 2;
        let multiplier = 5;

        switch (size) {
            case "small": multiplier = 5; break;
            case "medium": multiplier = 6; break;
            case "large": multiplier = 7; break;
            case "giant": multiplier = 8; break;
            default: multiplier = 6; break;
        }

        return Math.floor(base + yearsAfterTwo * multiplier);
    }

    getLifeStage(humanAge: number): string {
        if (humanAge < 15) return "Cachorro Juguetón";
        if (humanAge < 24) return "Adolescencia Rebelde";
        if (humanAge < 60) return "Adultez Plena";
        if (humanAge < 80) return "Madurez Distinguida";
        return "Sabiduría Senior";
    }

    getNextMilestone(age: number): string {
        if (age < 1) return "Vacunación y Microchip";
        if (age < 7) return "Chequeo Anual y Limpieza Dental";
        return "Chequeo Geriátrico Semestral";
    }
}

export class CatStrategy implements PetAgeStrategy {
    calculateHumanAge(age: number): number {
        if (age < 0) return 0;
        if (age === 0) return 0;
        if (age === 1) return 15;
        if (age === 2) return 24;
        return 24 + (age - 2) * 4;
    }

    getLifeStage(humanAge: number): string {
        if (humanAge < 15) return "Curiosidad Infantil";
        if (humanAge < 24) return "Juventud Felina";
        if (humanAge < 60) return "Reinado Doméstico";
        if (humanAge < 80) return "Veteranía Consentida";
        return "Venerable Felino";
    }

    getNextMilestone(age: number): string {
        if (age < 1) return "Esterilización y Vacunas";
        if (age < 10) return "Control de Peso y Salud Dental";
        return "Perfil Renal y Chequeo Senior";
    }
}

export class PetStrategyFactory {
    static getStrategy(type: string): PetAgeStrategy {
        switch (type) {
            case "cat": return new CatStrategy();
            case "dog":
            default: return new DogStrategy();
        }
    }
}
