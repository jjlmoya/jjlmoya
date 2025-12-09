export class SourdoughCalculator {
    /**
     * Calculates the amounts of starter, flour, and water needed.
     * @param totalAmount Desired final amount of sourdough starter in grams.
     * @param starterRatio Parts of starter (e.g., 1 in 1:2:2).
     * @param flourRatio Parts of flour (e.g., 2 in 1:2:2).
     * @param waterRatio Parts of water (e.g., 2 in 1:2:2).
     * @returns An object containing the grams of starter, flour, and water needed.
     */
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
