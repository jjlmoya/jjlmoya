import { FingerTwisterMechanic } from "./FingerTwisterMechanic";

export class FingerTwisterGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new FingerTwisterMechanic(this.width, this.height);

        this.pointers = [];

        this.loop = this.loop.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);

        this.initInput();
        this.animationId = requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("touchstart", this.handleStart, { passive: false });
        this.canvas.addEventListener("touchmove", this.handleMove, { passive: false });
        this.canvas.addEventListener("touchend", this.handleEnd);
        this.canvas.addEventListener("touchcancel", this.handleEnd);

        this.canvas.addEventListener("mousedown", (e) => {
            this.handleStart({
                preventDefault: () => {},
                changedTouches: [{ identifier: 999, clientX: e.clientX, clientY: e.clientY }],
            });
        });
        this.canvas.addEventListener("mousemove", (e) => {
            if (this.pointers.find((p) => p.id === 999)) {
                this.handleMove({
                    preventDefault: () => {},
                    changedTouches: [{ identifier: 999, clientX: e.clientX, clientY: e.clientY }],
                });
            }
        });
        this.canvas.addEventListener("mouseup", (e) => {
            this.handleEnd({
                preventDefault: () => {},
                changedTouches: [{ identifier: 999, clientX: e.clientX, clientY: e.clientY }],
            });
        });
    }

    getPos(clientPos) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: clientPos.clientX - rect.left,
            y: clientPos.clientY - rect.top,
        };
    }

    handleStart(e) {
        e.preventDefault();

        if (this.mechanic.isGameOver || this.mechanic.isWin) {
            this.mechanic.reset();
            this.pointers = [];
            return;
        }

        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const t = touches[i];
            const pos = this.getPos(t);
            this.pointers.push({ id: t.identifier, x: pos.x, y: pos.y });
        }
    }

    handleMove(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const t = touches[i];
            const idx = this.pointers.findIndex((p) => p.id === t.identifier);
            if (idx !== -1) {
                const pos = this.getPos(t);
                this.pointers[idx].x = pos.x;
                this.pointers[idx].y = pos.y;
            }
        }
    }

    handleEnd(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const t = touches[i];
            const idx = this.pointers.findIndex((p) => p.id === t.identifier);
            if (idx !== -1) {
                this.pointers.splice(idx, 1);
            }
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
        this.mechanic.update(this.pointers);
        this.draw();
        this.animationId = requestAnimationFrame(this.loop);
    }

    draw() {
        this.ctx.fillStyle = "#1a1a1a";
        this.ctx.fillRect(0, 0, this.width, this.height);

        for (const node of this.mechanic.nodes) {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

            if (node.isHeld) {
                this.ctx.fillStyle = node.color;
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = node.color;
            } else {
                this.ctx.fillStyle = "transparent";
                this.ctx.strokeStyle = node.color;
                this.ctx.lineWidth = 4;
                this.ctx.shadowBlur = 0;
                this.ctx.stroke();

                const pulse = (Math.sin(Date.now() / 200) + 1) * 0.5;
                this.ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.3})`;
                this.ctx.fill();
            }

            if (node.isHeld) {
                this.ctx.fill();
            }
        }

        for (const p of this.pointers) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }

        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "bold 40px monospace";
        this.ctx.textAlign = "center";
        this.ctx.shadowBlur = 0;
        this.ctx.fillText(Math.floor(this.mechanic.score / 60), this.width / 2, 50);

        if (this.mechanic.isGameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "#FF0055";
            this.ctx.font = "bold 40px monospace";
            this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2 - 20);

            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "20px monospace";
            this.ctx.fillText("Tap to Restart", this.width / 2, this.height / 2 + 30);
        }

        if (this.mechanic.isWin) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "#00FF55";
            this.ctx.font = "bold 40px monospace";
            this.ctx.fillText("YOU WIN!", this.width / 2, this.height / 2 - 20);

            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "20px monospace";
            this.ctx.fillText("Tap to Restart", this.width / 2, this.height / 2 + 30);
        }
    }

    destroy() {
        this.canvas.removeEventListener("touchstart", this.handleStart);
        this.canvas.removeEventListener("touchmove", this.handleMove);
        this.canvas.removeEventListener("touchend", this.handleEnd);
        this.canvas.removeEventListener("touchcancel", this.handleEnd);

        cancelAnimationFrame(this.animationId);
    }
}
