export interface Upgrade {
    id: string;
    name: string;
    cost: number;
    costMultiplier: number;
    power: number;
    type: "click" | "auto";
    count: number;
}

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    text: string;
    color: string;
}

export class ClickerMechanic {
    private currency: number = 0;
    private clickPower: number = 1;
    private autoClickRate: number = 0;

    private upgrades: Upgrade[] = [];
    private particles: Particle[] = [];

    constructor() {
        this.initUpgrades();
    }

    private initUpgrades() {
        this.upgrades = [
            {
                id: "cursor",
                name: "Cursor Mejorado",
                cost: 15,
                costMultiplier: 1.5,
                power: 1,
                type: "auto",
                count: 0,
            },
            {
                id: "power",
                name: "Fuerza de Clic",
                cost: 50,
                costMultiplier: 1.8,
                power: 2,
                type: "click",
                count: 0,
            },
            {
                id: "farm",
                name: "Granja de Clics",
                cost: 250,
                costMultiplier: 1.4,
                power: 10,
                type: "auto",
                count: 0,
            },
            {
                id: "factory",
                name: "Fábrica",
                cost: 1000,
                costMultiplier: 1.3,
                power: 50,
                type: "auto",
                count: 0,
            },
        ];
    }

    public click(x: number, y: number) {
        this.currency += this.clickPower;
        this.addParticle(x, y, `+${this.clickPower}`);
        return this.clickPower;
    }

    public buyUpgrade(id: string): boolean {
        const upgrade = this.upgrades.find((u) => u.id === id);
        if (upgrade && this.currency >= upgrade.cost) {
            this.currency -= upgrade.cost;
            upgrade.count++;
            upgrade.cost = Math.ceil(upgrade.cost * upgrade.costMultiplier);

            if (upgrade.type === "click") {
                this.clickPower += upgrade.power;
            } else {
                this.autoClickRate += upgrade.power;
            }
            return true;
        }
        return false;
    }

    public load() {
        const saved = localStorage.getItem("clicker_save");
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.currency = data.currency || 0;
                this.clickPower = data.clickPower || 1;
                this.autoClickRate = data.autoClickRate || 0;

                if (data.upgrades) {
                    data.upgrades.forEach((savedUpgrade: any) => {
                        const upgrade = this.upgrades.find((u) => u.id === savedUpgrade.id);
                        if (upgrade) {
                            upgrade.count = savedUpgrade.count;
                            upgrade.cost = savedUpgrade.cost;
                        }
                    });
                }
            } catch (e) {
                console.error("Failed to load save", e);
            }
        }
    }

    public save() {
        const data = {
            currency: this.currency,
            clickPower: this.clickPower,
            autoClickRate: this.autoClickRate,
            upgrades: this.upgrades.map((u) => ({
                id: u.id,
                count: u.count,
                cost: u.cost,
            })),
        };
        localStorage.setItem("clicker_save", JSON.stringify(data));
    }

    public update(deltaTime: number) {
        if (this.autoClickRate > 0) {
            const clicks = this.autoClickRate * deltaTime;
            this.currency += clicks;
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= deltaTime;
            p.x += p.vx * deltaTime * 60;
            p.y += p.vy * deltaTime * 60;
            p.vy += 0.5 * deltaTime * 60;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    private addParticle(x: number, y: number, text: string) {
        this.particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 5,
            vy: -5 - Math.random() * 5,
            life: 1.0,
            text,
            color: "#fbbf24",
        });
    }

    public getState() {
        return {
            currency: Math.floor(this.currency),
            clickPower: this.clickPower,
            autoClickRate: this.autoClickRate,
            upgrades: this.upgrades,
            particles: this.particles,
        };
    }
}
