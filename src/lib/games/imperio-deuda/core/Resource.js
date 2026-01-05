export class Resource {
    constructor(name, initialValue = 0) {
        this.name = name;
        this.value = Number(initialValue) || 0;
    }

    add(amt) {
        const n = Number(amt);
        if (!isNaN(n)) this.value += n;
    }

    sub(amt) {
        const n = Number(amt);
        if (!isNaN(n)) this.value -= n;
    }

    canAfford(cost) {
        const n = Number(cost);
        if (isNaN(n)) return false;
        return this.value >= n;
    }
}
