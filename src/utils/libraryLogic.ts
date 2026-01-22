import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

export const calculateLifeStats = (birthdate: Date) => {
    const now = new Date();
    if (birthdate > now) {
        return null;
    }

    const daysAlive = differenceInDays(now, birthdate);
    const hoursAlive = differenceInHours(now, birthdate);
    const minutesAlive = differenceInMinutes(now, birthdate);

    return {
        daysAlive,
        hoursAlive,
        minutesAlive,
    };
};

export const calculateSleepStats = (hoursAlive: number) => {
    const hoursSlept = Math.floor(hoursAlive / 3);
    const booksCount = Math.min(100, Math.floor(hoursSlept / 1000));
    return { hoursSlept, booksCount };
};

export const calculateWaterStats = (daysAlive: number) => {
    const litersDrunk = daysAlive * 2;
    const bottlesCount = Math.min(80, Math.floor(litersDrunk / 500));
    return { litersDrunk, bottlesCount };
};

export const calculateStepsStats = (daysAlive: number) => {
    let remainingDays = daysAlive;
    let stepsTaken = 0;

    const daysInfant = Math.min(remainingDays, 365);
    stepsTaken += daysInfant * 0;
    remainingDays -= daysInfant;

    if (remainingDays > 0) {
        const daysChild = Math.min(remainingDays, 11 * 365);
        stepsTaken += daysChild * 12000;
        remainingDays -= daysChild;
    }

    if (remainingDays > 0) {
        const daysYoung = Math.min(remainingDays, 18 * 365);
        stepsTaken += daysYoung * 10000;
        remainingDays -= daysYoung;
    }

    if (remainingDays > 0) {
        const daysAdult = Math.min(remainingDays, 30 * 365);
        stepsTaken += daysAdult * 7000;
        remainingDays -= daysAdult;
    }

    if (remainingDays > 0) {
        stepsTaken += remainingDays * 4000;
    }

    const stepsCount = Math.min(100, Math.floor(stepsTaken / 250000));
    return { stepsTaken, stepsCount };
};

export const calculateBreathStats = (daysAlive: number) => {
    const breathsTaken = daysAlive * 20000;
    const breathsCount = Math.min(120, Math.floor(breathsTaken / 500000));
    return { breathsTaken, breathsCount };
};

export const calculateHeartbeatStats = (daysAlive: number) => {
    const totalHeartbeats = daysAlive * 115200;
    return { totalHeartbeats };
};

export const calculateWordsStats = (daysAlive: number) => {
    let remainingDays = daysAlive;
    let wordsSpoken = 0;

    const daysBaby = Math.min(remainingDays, 2 * 365);
    wordsSpoken += daysBaby * 50;
    remainingDays -= daysBaby;

    if (remainingDays > 0) {
        const daysChild = Math.min(remainingDays, 8 * 365);
        wordsSpoken += daysChild * 10000;
        remainingDays -= daysChild;
    }

    if (remainingDays > 0) {
        wordsSpoken += remainingDays * 16000;
    }

    return { wordsSpoken };
};

export const calculateBlinkStats = (minutesAlive: number) => {
    const awakeMinutes = minutesAlive * (2 / 3);
    const totalBlinks = awakeMinutes * 15;

    const darknessSeconds = totalBlinks * 0.3;
    const darknessMinutes = Math.floor(darknessSeconds / 60);
    const darknessHours = Math.floor(darknessMinutes / 60);
    const darknessDays = Math.floor(darknessHours / 24);

    return { totalBlinks, darknessMinutes, darknessHours, darknessDays };
};

export const calculateTearsStats = (daysAlive: number) => {
    const yearsAlive = daysAlive / 365;
    const litersTears = yearsAlive * 1.2;
    const tearDrops = (litersTears * 1000) / 0.05;

    return { litersTears, tearDrops };
};

export const calculateSkinStats = (daysAlive: number) => {
    const skinShedGrams = daysAlive * 1.5;
    const skinShedKg = skinShedGrams / 1000;

    const skinSuits = skinShedKg / 3.5;

    return { skinShedKg, skinSuits };
};

export const calculateMoonStats = (daysAlive: number) => {
    const fullMoons = Math.floor(daysAlive / 29.53);
    return { fullMoons };
};

export const calculateFoodStats = (daysAlive: number) => {
    const kgEaten = daysAlive * 1.8;

    const tonsEaten = kgEaten / 1000;
    return { kgEaten, tonsEaten };
};

export const calculateGrowthStats = (daysAlive: number) => {
    const hairMeters = daysAlive * 0.0004;
    const nailsMeters = daysAlive * 0.0001;

    return { hairMeters, nailsMeters };
};

export const calculateSunStats = (daysAlive: number) => {
    const sunrises = daysAlive;

    const sunHours = daysAlive * 12;

    return { sunrises, sunHours };
};

export const calculateMindStats = (daysAlive: number) => {
    const thoughts = daysAlive * 60000;
    return { thoughts };
};
