export interface TireSize {
    label: string;
    diameterInches: number;
}

export const TIRE_SIZES: TireSize[] = [
    { label: "700x23c", diameterInches: 26.3 },
    { label: "700x25c", diameterInches: 26.5 },
    { label: "700x28c", diameterInches: 26.8 },
    { label: "700x32c", diameterInches: 27.0 },
    { label: "26\" x 2.0", diameterInches: 26.0 },
];

export const calculateGcd = (a: number, b: number): number => {
    return b === 0 ? a : calculateGcd(b, a % b);
};

export const calculateSkidPatches = (
    chainring: number,
    cog: number,
    ambidextrous: boolean
): number => {
    const gcd = calculateGcd(chainring, cog);
    const simplifiedNumerator = chainring / gcd;
    const simplifiedDenominator = cog / gcd;

    if (ambidextrous && simplifiedNumerator % 2 !== 0) {
        return simplifiedDenominator * 2;
    }
    return simplifiedDenominator;
};

export const calculateGearInches = (
    chainring: number,
    cog: number,
    tireDiameter: number
): number => {
    return (chainring / cog) * tireDiameter;
};

export const calculateSpeed = (gearInches: number, rpm: number): number => {
    const circumferenceMeters = gearInches * Math.PI * 0.0254;
    return (circumferenceMeters * rpm * 60) / 1000;
};
