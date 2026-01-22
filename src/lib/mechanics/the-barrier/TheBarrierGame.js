import { TheBarrierMechanic } from "./TheBarrierMechanic";

export class TheBarrierGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new TheBarrierMechanic(this.width, this.height);

        this.isDrawing = false;
        this.currentLine = null;

        this.loop = this.loop.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);

        this.initInput();
        this.animationId = requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleStart);
        this.canvas.addEventListener("mousemove", this.handleMove);
        window.addEventListener("mouseup", this.handleEnd);

        this.canvas.addEventListener("touchstart", this.handleStart, { passive: false });
        this.canvas.addEventListener("touchmove", this.handleMove, { passive: false });
        window.addEventListener("touchend", this.handleEnd);
    }

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    }

    handleStart(e) {
        if (e.type === "touchstart") e.preventDefault();
        const pos = this.getPos(e);
        this.isDrawing = true;
        this.currentLine = { start: pos, end: pos };
    }

    handleMove(e) {
        if (e.type === "touchmove") e.preventDefault();
        if (!this.isDrawing) return;
        const pos = this.getPos(e);
        this.currentLine.end = pos;
    }

    handleEnd() {
        if (!this.isDrawing) return;
        this.isDrawing = false;

        const dx = this.currentLine.end.x - this.currentLine.start.x;
        const dy = this.currentLine.end.y - this.currentLine.start.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 10) {
            this.mechanic.addBarrier(this.currentLine.start, this.currentLine.end);
        }

        this.currentLine = null;
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
        this.mechanic.update();
        this.draw();
        this.animationId = requestAnimationFrame(this.loop);
    }

    draw() {
        this.ctx.fillStyle = "rgba(10, 10, 20, 0.3)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        for (const p of this.mechanic.particles) {
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.lineCap = "round";
        for (const b of this.mechanic.barriers) {
            const alpha = b.life / 50;
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, alpha)})`;
            this.ctx.lineWidth = 4;
            this.ctx.beginPath();
            this.ctx.moveTo(b.start.x, b.start.y);
            this.ctx.lineTo(b.end.x, b.end.y);
            this.ctx.stroke();
        }

        if (this.isDrawing && this.currentLine) {
            this.ctx.strokeStyle = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentLine.start.x, this.currentLine.start.y);
            this.ctx.lineTo(this.currentLine.end.x, this.currentLine.end.y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.handleStart);
        this.canvas.removeEventListener("mousemove", this.handleMove);
        window.removeEventListener("mouseup", this.handleEnd);
        this.canvas.removeEventListener("touchstart", this.handleStart);
        this.canvas.removeEventListener("touchmove", this.handleMove);
        window.removeEventListener("touchend", this.handleEnd);
        cancelAnimationFrame(this.animationId);
    }
}
