export class PersistenceManager {
    constructor(engine) {
        this.engine = engine;
        this.KEY = "debt_empire_v10_funny_names";
    }

    save() {
        if (!this.engine) return;
        try {
            const data = {
                bank: this.engine.bank.value,
                debt: this.engine.debt.value,
                growth: this.engine.debtGrowthRate,
                unlocks: Array.from(this.engine.unlocks),
                grid: Array.from(this.engine.grid.entries()),
                cam: this.engine.ui
                    ? {
                          x: this.engine.ui.cam.x,
                          y: this.engine.ui.cam.y,
                          scale: this.engine.ui.cam.scale,
                      }
                    : null,
                biz: this.engine.businesses.map((b) => ({
                    id: b.id,
                    lvl: b.lvl,
                    cost: b.currentCost,
                    instances: b.instances,
                })),
            };
            localStorage.setItem(this.KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Save failed", e);
        }
    }

    load() {
        if (!this.engine) return;
        const raw = localStorage.getItem(this.KEY);
        if (!raw) return;
        try {
            const d = JSON.parse(raw);
            if (!d) return;

            this.engine.bank.value = Number(d.bank) || 50;
            this.engine.debt.value = Number(d.debt) || 10000000;
            this.engine.debtGrowthRate = Number(d.growth) || 0.0003;

            if (d.grid) {
                this.engine.grid = new Map(d.grid);
            }

            if (d.biz) {
                d.biz.forEach((saved) => {
                    const b = this.engine.getBusiness(saved.id);
                    if (b) {
                        b.lvl = Number(saved.lvl) || 0;
                        b.currentCost = Number(saved.cost) || b.baseCost;
                        b.instances = saved.instances || [];
                    }
                });
            }

            if (d.unlocks) {
                d.unlocks.forEach((id) => {
                    const p = this.engine.getPassive(id);
                    if (p) {
                        p.purchased = true;
                        this.engine.unlocks.add(p.id);
                        if (typeof p.effect === "function") p.effect(this.engine);
                    }
                });
            }

            if (d.cam && this.engine.ui) {
                this.engine.ui.cam.x = d.cam.x;
                this.engine.ui.cam.y = d.cam.y;
                this.engine.ui.cam.scale = d.cam.scale;
                this.engine.ui.applyCamera();
            }

            this.engine.calculateProximityBonuses();
            this.engine.buildingCount = this.engine.grid.size;

            if (this.engine.ui) {
                this.engine.ui.render();
                this.engine.ui.updateStats();
            }
        } catch (e) {
            console.error("Load failed", e);
            this.clear();
        }
    }

    clear() {
        localStorage.removeItem(this.KEY);
    }
}
