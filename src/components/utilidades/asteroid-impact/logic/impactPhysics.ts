export type Composition = 'ice' | 'rock' | 'iron';

export interface ImpactInputs {
    diameter: number;
    distance: number;
    composition: Composition;
    velocity: number;
}

export interface ImpactResults {
    kineticEnergy: number;
    megatons: number;
    craterDiameter: number;
    craterDepth: number;
    thermalRadius: number;
    shockwave1psi: number;
    shockwave5psi: number;
    seismicMagnitude: number;
    airburst: boolean;
    survivalVerdict: 'vaporized' | 'severe-burns' | 'ruptured-eardrums' | 'safe';
}

const DENSITIES: Record<Composition, number> = {
    ice: 917,
    rock: 2600,
    iron: 7800,
};

const MEGATONS_PER_JOULE = 2.39e-16;

export class ImpactPhysics {
    static calculate(inputs: ImpactInputs): ImpactResults {
        const { diameter, distance, composition, velocity } = inputs;
        const radius = diameter / 2;
        const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
        const density = DENSITIES[composition];
        const mass = volume * density;

        const kineticEnergy = 0.5 * mass * Math.pow(velocity, 2);
        const megatons = kineticEnergy * MEGATONS_PER_JOULE;

        const airburst = diameter < 50;

        const craterDiameter = airburst ? 0 : Math.pow(megatons, 0.3) * 1000;
        const craterDepth = craterDiameter * 0.3;

        const thermalRadius = Math.pow(megatons, 0.41) * 1000;

        const shockwave1psi = Math.pow(megatons, 0.33) * 2000;
        const shockwave5psi = Math.pow(megatons, 0.33) * 1000;

        const seismicMagnitude = Math.min(0.67 * Math.log10(megatons) + 3.87, 10);

        let survivalVerdict: ImpactResults['survivalVerdict'] = 'safe';
        if (distance < craterDiameter / 2) {
            survivalVerdict = 'vaporized';
        } else if (distance < thermalRadius) {
            survivalVerdict = 'severe-burns';
        } else if (distance < shockwave5psi) {
            survivalVerdict = 'ruptured-eardrums';
        }

        return {
            kineticEnergy,
            megatons,
            craterDiameter,
            craterDepth,
            thermalRadius,
            shockwave1psi,
            shockwave5psi,
            seismicMagnitude,
            airburst,
            survivalVerdict,
        };
    }
}
