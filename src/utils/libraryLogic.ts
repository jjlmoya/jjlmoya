import { differenceInDays, differenceInHours } from "date-fns";

export const calculateLifeStats = (birthdate: Date) => {
    const now = new Date();
    if (birthdate > now) {
        return null;
    }

    const daysAlive = differenceInDays(now, birthdate);
    const hoursAlive = differenceInHours(now, birthdate);

    return {
        daysAlive,
        hoursAlive,
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
