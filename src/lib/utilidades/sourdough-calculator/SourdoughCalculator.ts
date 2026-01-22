export class SourdoughCalculator {
    static calculate(
        totalAmount: number,
        starterRatio: number,
        flourRatio: number,
        waterRatio: number
    ): { starter: number; flour: number; water: number } {
        if (totalAmount <= 0) {
            return { starter: 0, flour: 0, water: 0 };
        }

        const totalParts = starterRatio + flourRatio + waterRatio;
        if (totalParts <= 0) {
            return { starter: 0, flour: 0, water: 0 };
        }

        const unitWeight = totalAmount / totalParts;

        return {
            starter: Math.round(unitWeight * starterRatio),
            flour: Math.round(unitWeight * flourRatio),
            water: Math.round(unitWeight * waterRatio),
        };
    }
}
