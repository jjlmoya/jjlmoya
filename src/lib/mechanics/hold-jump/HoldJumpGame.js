import { HoldJumpMechanic } from "./HoldJumpMechanic";

export class HoldJumpGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new HoldJumpMechanic(this.width, this.height);

        this.loop = this.loop.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.initInput();
        requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleDown);
        window.addEventListener("mouseup", this.handleUp);

        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                this.handleDown(e);
            },
            { passive: false }
        );
        window.addEventListener("touchend", this.handleUp);

        window.addEventListener("keydown", this.handleKey);
        window.addEventListener("keyup", this.handleKeyUp);
    }

    handleDown(e) {
        if (e.type === "touchstart") e.preventDefault();

        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = clientX - rect.left;

        this.mechanic.startCharge(x);
    }

    handleUp() {
        this.mechanic.releaseCharge();
    }

    handleKey(e) {
        if (e.code === "Space") {
            this.mechanic.startCharge();
        }
    }

    handleKeyUp(e) {
        if (e.code === "Space") {
            this.mechanic.releaseCharge();
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
        this.draw();
        requestAnimationFrame(this.loop);
    }

    draw() {
        const state = this.mechanic.getState();

        let offset = 0;
        if (state.player.pos.y < this.height * 0.6) {
            offset = this.height * 0.6 - state.player.pos.y;
        }

        this.ctx.save();
        this.ctx.translate(0, offset);

        this.ctx.fillStyle = "#2c3e50";
        this.ctx.fillRect(0, -offset, this.width, this.height);

        this.ctx.fillStyle = "#95a5a6";
        for (const plat of state.platforms) {
            if (plat.y + plat.height + offset > 0 && plat.y + offset < this.height) {
                this.ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
            }
        }

        this.ctx.save();
        this.ctx.translate(state.player.pos.x, state.player.pos.y);

        const scaleY = 1 - state.player.charge * 0.3;
        const scaleX = 1 + state.player.charge * 0.3;
        this.ctx.scale(scaleX, scaleY);

        this.ctx.fillStyle = "#e74c3c";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, state.player.radius, 0, Math.PI * 2);
        this.ctx.fill();

        if (state.player.charging) {
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${state.player.charge})`;
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        }

        this.ctx.restore();
        this.ctx.restore();

        const playerScreenY = state.player.pos.y + offset;

        if (state.player.charging) {
            const barWidth = 60;
            const barHeight = 8;
            const x = state.player.pos.x - barWidth / 2;
            const y = playerScreenY - 40;

            this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            this.ctx.fillRect(x, y, barWidth, barHeight);

            const chargePercent = state.player.charge;
            const fillWidth = barWidth * chargePercent;

            const r = 255;
            const g = Math.floor(255 * (1 - chargePercent));
            const b = 0;
            this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

            this.ctx.fillRect(x, y, fillWidth, barHeight);

            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x, y, barWidth, barHeight);
        } else if (state.player.grounded) {
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            this.ctx.font = "12px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText("HOLD", state.player.pos.x, playerScreenY - 30);
        }

        const heightScore = Math.floor((this.height - state.player.pos.y) / 10);
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 20px monospace";
        this.ctx.textAlign = "left";
        this.ctx.fillText(`ALTURA: ${Math.max(0, heightScore)}`, 20, 40);

        this.ctx.shadowBlur = 0;
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.handleDown);
        window.removeEventListener("mouseup", this.handleUp);
        window.removeEventListener("keydown", this.handleKey);
        window.removeEventListener("keyup", this.handleKeyUp);
    }
}
