import { Resource } from '../core/Resource.js';
import { Business } from '../core/Business.js';
import { Passive } from '../core/Passive.js';
import { Operation } from '../core/Operation.js';
import { UIManager } from '../ui/UIManager.js';
import { PersistenceManager } from './PersistenceManager.js';

export class GameEngine {
    constructor() {
        this.bank = new Resource("Bank", 50);
        this.debt = new Resource("Debt", 10000000);
        this.debtGrowthRate = 0.0003;
        this.clickPower = 1;
        this.buildingCount = 0;
        this.activeTab = "biz";

        this.businesses = [];
        this.passives = [];
        this.operations = [];
        this.unlocks = new Set();
        this.grid = new Map();

        this.lastDopamine = 0;
    }

    init(config) {
        this.businesses = config.businesses.map((b) => new Business(b));
        this.passives = config.passives.map((p) => new Passive(p));
        this.operations = config.operations.map((o) => new Operation(o));

        this.ui = new UIManager(this);
        this.persistence = new PersistenceManager(this);

        this.persistence.load();
        this.startLoop();
    }

    getBusiness(id) {
        return this.businesses.find(b => b.id === id);
    }

    getPassive(id) {
        return this.passives.find(p => p.id === id);
    }

    getTotalIncome() {
        return this.businesses.reduce((sum, b) => sum + b.getIncome(), 0);
    }

    placeBuilding(x, y, bizId) {
        const key = `${x},${y}`;
        if (this.grid.has(key)) return false;

        const b = this.getBusiness(bizId);
        if (!b) return false;

        const isRoad = x % 4 === 0 || y % 4 === 0;
        const cellType = isRoad ? "road" : "block";
        if (b.allowedOn !== cellType) return false;

        if (this.bank.canAfford(b.currentCost)) {
            this.bank.sub(b.currentCost);
            b.upgrade();
            const instanceName = b.getRandomInstanceName();
            b.instances.push({ x, y, instanceName });
            this.grid.set(key, { bizId: b.id, name: instanceName });
            this.buildingCount++;

            this.calculateProximityBonuses();
            this.ui.render();
            this.ui.updateStats();
            return true;
        }
        return false;
    }

    calculateProximityBonuses() {
        this.businesses.forEach(b => b.proximityMult = 1);
        for (const [key, data] of this.grid) {
            const bId = data.bizId;
            const [x1, y1] = key.split(',').map(Number);
            for (const [otherKey, otherData] of this.grid) {
                const otherId = otherData.bizId;
                if (key === otherKey) continue;
                const [x2, y2] = otherKey.split(',').map(Number);
                const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                if (dist <= 1.5) {
                    if (bId === "rent-shop" && otherId === "fast-food") {
                        this.getBusiness("fast-food").proximityMult *= 1.2;
                    }
                    if (bId === "gym" && otherId === "pharmacy") {
                        this.getBusiness("gym").proximityMult *= 1.5;
                    }
                }
            }
        }
    }

    buyPassive(id) {
        const p = this.getPassive(id);
        if (p && !p.purchased && this.bank.canAfford(p.cost)) {
            if (p.isUnlocked(this)) {
                this.bank.sub(p.cost);
                p.purchased = true;
                this.unlocks.add(p.id);
                if (typeof p.effect === 'function') p.effect(this);
                this.ui.render();
                this.ui.renderIcons();
                this.ui.updateStats();
            }
        }
    }

    runOperation(id) {
        const op = this.operations.find((x) => x.id === id);
        if (op && this.bank.canAfford(op.cost)) {
            this.bank.sub(op.cost);
            if (typeof op.effect === 'function') op.effect(this);
            this.ui.render();
            this.ui.updateStats();
        }
    }

    tick() {

        const growth = this.debt.value * this.debtGrowthRate;
        this.debt.add(growth);


        const income = this.getTotalIncome();
        if (income > 0) {
            const step = income / 10;
            this.bank.add(step);
            this.debt.sub(step);
        }


        if (this.ui && this.ui.showBuildingIncome) {
            const now = Date.now();
            if (now - this.lastDopamine > 2000) {
                this.lastDopamine = now;
                this.businesses.forEach(b => {
                    if (b.lvl > 0) {
                        const incPerInst = b.getInstanceIncome();
                        if (incPerInst > 0) {
                            b.instances.forEach(inst => {
                                this.ui.showBuildingIncome(inst.x, inst.y, incPerInst);
                            });
                        }
                    }
                });
            }
        }

        if (this.debt.value <= 1) {
            this.debt.value = 0;
            alert("LIBERTAD FINANCIERA ALCANZADA.");
            this.persistence.clear();
            location.reload();
        }

        if (this.ui) {
            this.ui.updateStats();
            this.ui.updateAffordabilities();
        }

        if (Math.random() < 0.01) {
            this.persistence.save();
        }
    }

    startLoop() {
        setInterval(() => this.tick(), 100);
    }
}
