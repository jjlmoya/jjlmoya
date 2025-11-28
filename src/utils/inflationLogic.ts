export interface InflationItem {
    name: string;
    price: number;
    icon: string;
    minYear: number;
    maxYear: number;
}

export const getPurchasingPower = (year: number): number => {
    const yearsDiff = 2025 - year;
    if (year < 1980) return Math.pow(1.06, yearsDiff);
    if (year < 2000) return Math.pow(1.04, yearsDiff);
    return Math.pow(1.025, yearsDiff);
};

export const calculateBasket = (
    budget: number,
    items: InflationItem[],
    year: number
): Map<string, number> => {
    const availableItems = items.filter((item) => item.minYear <= year && item.maxYear >= year);

    let currentBudget = budget;
    const itemCounts = new Map<string, number>();

    const sortedItems = [...availableItems].sort((a, b) => b.price - a.price);

    sortedItems.forEach((item) => {
        if (currentBudget >= item.price) {
            if (item.price > 50 && Math.random() > 0.3) {
                itemCounts.set(item.name, (itemCounts.get(item.name) || 0) + 1);
                currentBudget -= item.price;
            }
        }
    });

    let safety = 0;
    while (currentBudget > 1 && safety < 100) {
        const affordable = availableItems.filter((i) => i.price <= currentBudget);
        if (affordable.length === 0) break;

        const randomItem = affordable[Math.floor(Math.random() * affordable.length)];

        itemCounts.set(randomItem.name, (itemCounts.get(randomItem.name) || 0) + 1);
        currentBudget -= randomItem.price;
        safety++;
    }

    return itemCounts;
};
