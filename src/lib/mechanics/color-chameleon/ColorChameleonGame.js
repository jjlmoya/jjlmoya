import { ColorChameleonMechanic } from "./ColorChameleonMechanic";

export class ColorChameleonGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.colors = ["#FF0055", "#00FF55", "#0055FF"];

        this.mechanic = new ColorChameleonMechanic(this.width, this.height, this.colors.length);

        this.loop = this.loop.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.initInput();
        this.animationId = requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleClick);
        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                this.handleClick(e);
            },
            { passive: false }
        );
    }

    handleClick() {
        if (this.mechanic.isGameOver) {
            this.mechanic.reset();
            return;
        }
        this.mechanic.cyclePlayerColor();
    }

    update() {
        this.mechanic.update();
    }

    draw() {
        this.ctx.fillStyle = "rgba(20, 20, 20, 0.3)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        const centerX = this.width / 2;
        const centerY = this.height / 2;

        if (!this.mechanic.isGameOver) {
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(this.mechanic.player.angle);

            const color = this.colors[this.mechanic.player.colorIndex];
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = color;
            this.ctx.fillStyle = color;

            this.ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6;
                const r = this.mechanic.player.radius;
                this.ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        }

        for (const enemy of this.mechanic.enemies) {
            this.ctx.save();
            this.ctx.translate(enemy.x, enemy.y);
            this.ctx.rotate(enemy.angle);

            const color = this.colors[enemy.colorIndex];
            this.ctx.fillStyle = color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = color;

            this.ctx.beginPath();
            if (enemy.colorIndex === 0) {
                this.ctx.rect(-10, -10, 20, 20);
            } else if (enemy.colorIndex === 1) {
                this.ctx.moveTo(0, -12);
                this.ctx.lineTo(12, 10);
                this.ctx.lineTo(-12, 10);
            } else {
                this.ctx.arc(0, 0, 12, 0, Math.PI * 2);
            }
            this.ctx.fill();
            this.ctx.restore();
        }

        for (const p of this.mechanic.particles) {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.colorIndex === -1 ? "#FFFFFF" : this.colors[p.colorIndex];
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        }

        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "bold 40px monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.mechanic.score, centerX, 50);

        if (this.mechanic.isGameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "bold 30px monospace";
            this.ctx.fillText("GAME OVER", centerX, centerY - 20);
            this.ctx.font = "20px monospace";
            this.ctx.fillText("Click to Restart", centerX, centerY + 20);
        }
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
        this.mechanic.resize(this.width, this.height);
    }

    loop() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(this.loop);
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.handleClick);
        this.canvas.removeEventListener("touchstart", this.handleClick);
        cancelAnimationFrame(this.animationId);
    }
}
