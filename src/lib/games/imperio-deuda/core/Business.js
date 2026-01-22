import { businessNames } from "../data/businessNames.js";

export class Business {
    constructor(config) {
        this.id = config.id || "unknown";
        this.name = config.name || "Negocio";
        this.icon = config.icon || "mdi:store";
        this.description = config.description || "";

        this.baseCost = Number(config.baseCost) || 10;
        this.baseIncome = Number(config.baseIncome) || 0;

        this.lvl = 0;
        this.mult = 1;
        this.proximityMult = 1;

        this.currentCost = this.baseCost;
        this.allowedOn = config.allowedOn || "block";

        this.instances = [];
    }

    getIncome() {
        const base = this.lvl * this.baseIncome * this.mult * this.proximityMult;
        return isNaN(base) ? 0 : base;
    }

    getInstanceIncome() {
        return this.baseIncome * this.mult * this.proximityMult;
    }

    upgrade() {
        this.lvl++;
        this.currentCost = Math.floor(this.baseCost * Math.pow(1.15, this.lvl));
    }

    getRandomInstanceName() {
        const pool = businessNames[this.id] || ["Sucursal de Deuda"];
        return pool[Math.floor(Math.random() * pool.length)];
    }
}
