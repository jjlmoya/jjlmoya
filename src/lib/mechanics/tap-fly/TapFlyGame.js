import { TapFlyMechanic } from "./TapFlyMechanic";

export class TapFlyGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new TapFlyMechanic(this.width, this.height);

        this.loop = this.loop.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleKey = this.handleKey.bind(this);

        this.initInput();
        requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleInput);
        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                this.handleInput(e);
            },
            { passive: false }
        );

        window.addEventListener("keydown", this.handleKey);
    }

    handleInput(e) {
        if (e) e.preventDefault();
        this.mechanic.tap();
    }

    handleKey(e) {
        if (e.code === "Space") {
            this.mechanic.tap();
        }
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
        this.mechanic.updateBounds(this.width, this.height);
    }

    loop() {
        this.mechanic.update();
        const state = this.mechanic.getState();

        this.ctx.fillStyle = "#4ec0ca";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = "#73bf2e";
        this.ctx.strokeStyle = "#558c22";
        this.ctx.lineWidth = 4;
        for (const obs of state.obstacles) {
            this.ctx.fillRect(obs.x, 0, obs.width, obs.gapY);
            this.ctx.strokeRect(obs.x, 0, obs.width, obs.gapY);

            const bottomY = obs.gapY + obs.gapHeight;
            this.ctx.fillRect(obs.x, bottomY, obs.width, this.height - bottomY);
            this.ctx.strokeRect(obs.x, bottomY, obs.width, this.height - bottomY);
        }

        this.ctx.save();
        this.ctx.translate(state.player.pos.x, state.player.pos.y);
        this.ctx.rotate(state.player.angle);

        this.ctx.fillStyle = "#f4ce42";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, state.player.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(6, -6, 6, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(8, -6, 2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();

        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 48px monospace";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 4;

        if (state.state === "start") {
        } else if (state.state === "playing") {
            this.ctx.fillText(state.score.toString(), this.width / 2, 100);
        } else if (state.state === "gameover") {
            this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2 - 40);
            this.ctx.font = "bold 24px monospace";
            this.ctx.fillText("TOCA PARA REINICIAR", this.width / 2, this.height / 2 + 40);
            this.ctx.fillText(`PUNTUACIÓN: ${state.score}`, this.width / 2, this.height / 2 + 80);
        }

        this.ctx.shadowBlur = 0;

        requestAnimationFrame(this.loop);
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.handleInput);
        this.canvas.removeEventListener("touchstart", this.handleInput);
        window.removeEventListener("keydown", this.handleKey);
    }
}
