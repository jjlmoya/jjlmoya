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
    // Average 16,000 words per day (adult), less for kids
    let remainingDays = daysAlive;
    let wordsSpoken = 0;

    // First 2 years: almost 0
    const daysBaby = Math.min(remainingDays, 2 * 365);
    wordsSpoken += daysBaby * 50;
    remainingDays -= daysBaby;

    // Child (2-10): ~10k
    if (remainingDays > 0) {
        const daysChild = Math.min(remainingDays, 8 * 365);
        wordsSpoken += daysChild * 10000;
        remainingDays -= daysChild;
    }

    // Adult: ~16k
    if (remainingDays > 0) {
        wordsSpoken += remainingDays * 16000;
    }

    return { wordsSpoken };
};

export const calculateBlinkStats = (minutesAlive: number) => {
    // Average 15-20 blinks per minute. Let's say 15.
    // Each blink is ~0.1 to 0.4 seconds of darkness. Let's say 0.3s.
    // We only count awake time (2/3 of life).

    const awakeMinutes = minutesAlive * (2 / 3);
    const totalBlinks = awakeMinutes * 15;

    // Total darkness in seconds
    const darknessSeconds = totalBlinks * 0.3;
    const darknessMinutes = Math.floor(darknessSeconds / 60);
    const darknessHours = Math.floor(darknessMinutes / 60);
    const darknessDays = Math.floor(darknessHours / 24);

    return { totalBlinks, darknessMinutes, darknessHours, darknessDays };
};

export const calculateTearsStats = (daysAlive: number) => {
    // Average human sheds 60-100 liters in a lifetime.
    // Let's say roughly 1 liter per year (very rough avg including emotional + basal).
    // 1 liter = 1000ml.
    // 1 tear drop ~ 0.05ml.

    const yearsAlive = daysAlive / 365;
    const litersTears = yearsAlive * 1.2; // A bit more dramatic
    const tearDrops = (litersTears * 1000) / 0.05;

    return { litersTears, tearDrops };
};

export const calculateSkinStats = (daysAlive: number) => {
    // Humans shed ~0.03 - 0.09 g of skin per hour.
    // Let's say 1.5g per day.
    // Total skin weight ~ 3-4kg (organ).
    // We shed our entire outer layer every 2-4 weeks.

    const skinShedGrams = daysAlive * 1.5;
    const skinShedKg = skinShedGrams / 1000;

    // How many "complete selves" is that? (Assuming 3.5kg skin weight)
    const skinSuits = skinShedKg / 3.5;

    return { skinShedKg, skinSuits };
};

export const calculateMoonStats = (daysAlive: number) => {
    // Full moon every 29.53 days.
    const fullMoons = Math.floor(daysAlive / 29.53);
    return { fullMoons };
};

export const calculateFoodStats = (daysAlive: number) => {
    // Avg human eats ~1.5 - 2kg per day.
    const kgEaten = daysAlive * 1.8;
    // Tons
    const tonsEaten = kgEaten / 1000;
    return { kgEaten, tonsEaten };
};

export const calculateGrowthStats = (daysAlive: number) => {
    // Hair grows ~0.4mm/day => 0.0004m/day
    // Nails grow ~0.1mm/day => 0.0001m/day

    const hairMeters = daysAlive * 0.0004;
    const nailsMeters = daysAlive * 0.0001;

    return { hairMeters, nailsMeters };
};

export const calculateSunStats = (daysAlive: number) => {
    // Sunrises = days alive (roughly)
    const sunrises = daysAlive;
    // Hours of sunlight (avg 12h/day)
    const sunHours = daysAlive * 12;

    return { sunrises, sunHours };
};

export const calculateMindStats = (daysAlive: number) => {
    // Humans have ~60,000 thoughts per day.
    const thoughts = daysAlive * 60000;
    return { thoughts };
};
