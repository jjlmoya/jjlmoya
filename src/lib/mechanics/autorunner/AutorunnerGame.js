import { AutorunnerMechanic } from "./AutorunnerMechanic";

export class AutorunnerGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new AutorunnerMechanic(this.width, this.height);

        this.lastTime = performance.now();
        this.runTime = 0;

        this.loop = this.loop.bind(this);
        this.handleJump = this.handleJump.bind(this);
        this.handleKey = this.handleKey.bind(this);

        this.initInput();
        requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleJump);
        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                this.handleJump(e);
            },
            { passive: false }
        );

        window.addEventListener("keydown", this.handleKey);
    }

    handleJump(e) {
        if (e.type === "touchstart") e.preventDefault();

        const state = this.mechanic.getState();
        if (state.state === "gameover") {
            this.mechanic.reset();
        } else {
            this.mechanic.jump();
        }
    }

    handleKey(e) {
        const state = this.mechanic.getState();

        if (e.code === "Space" || e.code === "ArrowUp") {
            if (state.state === "gameover") {
                this.mechanic.reset();
            } else {
                this.mechanic.jump();
            }
        } else if (e.code === "ArrowDown") {
            this.mechanic.dash();
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

    loop(time) {
        const dt = Math.min((time - this.lastTime) / 1000, 0.1);
        this.lastTime = time;
        this.runTime += dt;

        this.mechanic.update(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    }

    drawPlayer(x, y, w, grounded, runTime, isDashing) {
        this.ctx.strokeStyle = "#4B0082";
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";

        const cx = x + w / 2;

        this.ctx.beginPath();
        this.ctx.arc(cx, y + 10, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(cx + 3, y + 10, 1, 0, Math.PI * 2);
        this.ctx.fillStyle = "black";
        this.ctx.fill();

        this.ctx.save();
        this.ctx.strokeStyle = isDashing ? "#00ff00" : "#ff4444";
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(cx, y + 22);
        const wave = Math.sin(runTime * 20) * 5;

        if (isDashing) {
            this.ctx.quadraticCurveTo(cx - 25, y + 10, cx - 40, y + 5);
        } else {
            this.ctx.quadraticCurveTo(cx - 15, y + 22 - wave, cx - 30, y + 25 + wave);
        }
        this.ctx.stroke();
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.moveTo(cx, y + 18);
        this.ctx.lineTo(cx, y + 35);
        this.ctx.stroke();

        const armOffset = Math.sin(runTime * 15) * 5;
        this.ctx.beginPath();

        this.ctx.moveTo(cx, y + 22);
        this.ctx.lineTo(cx + (grounded ? -10 : -15), y + 30 + (grounded ? armOffset : -10));

        this.ctx.moveTo(cx, y + 22);
        this.ctx.lineTo(cx + (grounded ? 10 : 15), y + 30 + (grounded ? -armOffset : -10));
        this.ctx.stroke();

        const legOffset = Math.sin(runTime * 15) * 10;
        this.ctx.beginPath();

        this.ctx.moveTo(cx, y + 35);
        this.ctx.lineTo(cx - 5 + (grounded ? legOffset : -5), y + 50 + (grounded ? 0 : -5));

        this.ctx.moveTo(cx, y + 35);
        this.ctx.lineTo(cx + 5 + (grounded ? -legOffset : 5), y + 50 + (grounded ? 0 : -5));
        this.ctx.stroke();
    }

    draw() {
        const state = this.mechanic.getState();

        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(1, "#E0F7FA");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        for (const cloud of state.clouds) {
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.height, 0, Math.PI * 2);
            this.ctx.arc(
                cloud.x + cloud.width * 0.3,
                cloud.y - cloud.height * 0.5,
                cloud.height * 0.8,
                0,
                Math.PI * 2
            );
            this.ctx.arc(cloud.x + cloud.width * 0.6, cloud.y, cloud.height * 0.9, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.fillStyle = "#5D4037";
        for (const plat of state.platforms) {
            this.ctx.fillRect(plat.x, plat.y, plat.width, plat.height);

            this.ctx.fillStyle = "#7CB342";
            this.ctx.fillRect(plat.x, plat.y, plat.width, 15);
            this.ctx.fillStyle = "#5D4037";
        }

        this.ctx.fillStyle = "#424242";
        for (const obs of state.obstacles) {
            this.ctx.beginPath();
            this.ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 4);
            this.ctx.fill();

            this.ctx.fillStyle = "#616161";
            this.ctx.beginPath();
            this.ctx.arc(obs.x + 10, obs.y + 10, 5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = "#424242";
        }

        this.ctx.fillStyle = "#FFD700";
        this.ctx.strokeStyle = "#DAA520";
        this.ctx.lineWidth = 2;
        for (const coin of state.coins) {
            if (coin.collected) continue;

            const cx = coin.x + coin.width / 2;
            const cy = coin.y + coin.height / 2;
            const r = coin.width / 2;

            this.ctx.beginPath();
            this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.fillStyle = "rgba(255,255,255,0.6)";
            this.ctx.beginPath();
            this.ctx.arc(cx - r * 0.3, cy - r * 0.3, r * 0.2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = "#FFD700";
        }

        this.drawPlayer(
            state.player.x,
            state.player.y,
            state.player.width,
            state.player.grounded,
            this.runTime,
            state.player.isDashing
        );

        const badgeHeight = 50;
        const badgeWidth = 180;
        const badgeX = 20;
        const badgeY = 20;

        this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        this.ctx.beginPath();
        this.ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 25);
        this.ctx.fill();

        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 24px monospace";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "middle";
        this.ctx.shadowBlur = 0;

        this.ctx.fillStyle = "#4FC3F7";
        this.ctx.beginPath();
        this.ctx.arc(badgeX + 25, badgeY + 25, 10, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "white";
        this.ctx.fillText(`${state.score}m`, badgeX + 50, badgeY + 25);

        if (state.state === "gameover") {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.font = "bold 48px monospace";
            this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2 - 20);

            this.ctx.font = "bold 24px monospace";
            this.ctx.fillStyle = "#fbbf24";
            this.ctx.fillText(`Score: ${state.score}m`, this.width / 2, this.height / 2 + 30);

            this.ctx.fillStyle = "white";
            this.ctx.font = "20px monospace";
            this.ctx.fillText("TOCA PARA REINICIAR", this.width / 2, this.height / 2 + 80);
        }
    }
}
