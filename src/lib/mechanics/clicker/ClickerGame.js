import { ClickerMechanic } from "./ClickerMechanic";

export class ClickerGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.mechanic = new ClickerMechanic();
        this.mechanic.load();

        this.lastTime = performance.now();
        this.loop = this.loop.bind(this);

        this.resize();
        requestAnimationFrame(this.loop);
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    click(x, y) {
        return this.mechanic.click(x, y);
    }

    buyUpgrade(id) {
        const success = this.mechanic.buyUpgrade(id);
        if (success) {
            this.mechanic.save();
        }
        return success;
    }

    get state() {
        return this.mechanic.getState();
    }

    save() {
        this.mechanic.save();
    }

    loop(time) {
        const dt = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.mechanic.update(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    }

    draw() {
        const state = this.mechanic.getState();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = "bold 20px monospace";
        this.ctx.textAlign = "center";

        for (const p of state.particles) {
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.fillText(p.text, p.x, p.y);
        }
        this.ctx.globalAlpha = 1;
    }

    destroy() {
        this.mechanic.save();
    }
}

export function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi"];
    const suffixNum = Math.floor(Math.log10(num) / 3);
    const shortValue = parseFloat(
        (suffixNum != 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(3)
    );
    if (shortValue % 1 != 0) {
        return shortValue.toFixed(1) + suffixes[suffixNum];
    }
    return shortValue + suffixes[suffixNum];
}
