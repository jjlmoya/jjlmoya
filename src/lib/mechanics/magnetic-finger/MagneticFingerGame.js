import { MagneticFingerMechanic } from "./MagneticFingerMechanic";

export class MagneticFingerGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new MagneticFingerMechanic(this.width, this.height);
        this.isDragging = false;

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
        this.isDragging = true;
        const { x, y } = this.getPos(e);
        this.mechanic.setMagnet(true, x, y);
    }

    handleMove(e) {
        if (e.type === "touchmove") e.preventDefault();
        if (!this.isDragging) return;
        const { x, y } = this.getPos(e);
        this.mechanic.setMagnet(true, x, y);
    }

    handleEnd() {
        this.isDragging = false;
        this.mechanic.setMagnet(false, 0, 0);
    }

    setPolarity(polarity) {
        this.mechanic.setPolarity(polarity);
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
        this.animationId = requestAnimationFrame(this.loop);
    }

    draw() {
        this.ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        const particles = this.mechanic.getParticles();

        this.ctx.lineCap = "round";

        for (const p of particles) {
            this.ctx.save();
            this.ctx.translate(p.pos.x, p.pos.y);
            this.ctx.rotate(p.angle);

            this.ctx.beginPath();
            this.ctx.moveTo(-p.size / 2, 0);
            this.ctx.lineTo(p.size / 2, 0);

            this.ctx.strokeStyle = p.color;
            this.ctx.lineWidth = p.width;
            this.ctx.stroke();

            this.ctx.restore();
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
