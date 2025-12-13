export type ContainerType = 'can' | 'bottle';
export type LocationType = 'fridge' | 'freezer';

export interface CoolingState {
    container: ContainerType | null;
    location: LocationType | null;
    tempStart: number;
    tempTarget: number;
}

export const LABELS = {
    can: 'Lata (Aluminio)',
    bottle: 'Botella (Vidrio)',
    fridge: 'Nevera (4°C)',
    freezer: 'Congelador (-18°C)'
};

const K_VALUES = {
    can: 0.055,
    bottle: 0.038
};

const MULTIPLIER_MEDIUM = {
    freezer: 1.0,
    fridge: 0.45
};

const TEMP_ENV = {
    fridge: 4,
    freezer: -18
};

export function calculateCoolingTime(state: CoolingState): number {
    if (!state.container || !state.location) {
        return 0;
    }

    const T_env = TEMP_ENV[state.location];
    const T_0 = state.tempStart;
    const T_target = state.tempTarget;
    const k = K_VALUES[state.container] * MULTIPLIER_MEDIUM[state.location];

    if (T_target >= T_0) {
        return 0; // Already colder or equal
    }

    // Safety margin for asymptotes
    const effectiveEnv = T_env + 0.5;
    if (T_target <= effectiveEnv) {
        return 999; // Never reaches
    }

    const ratio = (T_target - T_env) / (T_0 - T_env);
    if (ratio <= 0) return 999;

    const t = -Math.log(ratio) / k;
    return Math.round(t);
}

export function getFinishTime(minutes: number): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
