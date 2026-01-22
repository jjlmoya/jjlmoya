export interface TiltResult {
    optimal: number;
    winter: number;
    summer: number;
    isNorth: boolean;
}

export function toRad(deg: number): number {
    return (deg * Math.PI) / 180;
}

export function calculateTilt(lat: number): TiltResult {
    const absLat = Math.abs(lat);

    let optimal = absLat * 0.87;
    if (absLat > 25 && absLat < 50) {
        optimal = absLat * 0.76 + 3.1;
    }

    const winter = absLat * 0.9 + 29;
    const summer = absLat * 0.9 - 23.5;

    const clamp = (n: number) => Math.min(Math.max(n, 0), 90);

    return {
        optimal: parseFloat(clamp(optimal).toFixed(1)),
        winter: parseFloat(clamp(winter).toFixed(1)),
        summer: parseFloat(clamp(summer).toFixed(1)),
        isNorth: lat >= 0,
    };
}
