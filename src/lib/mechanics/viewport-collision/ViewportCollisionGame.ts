import { ViewportCollisionMechanic } from "./ViewportCollisionMechanic";

export class ViewportCollisionGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private mechanic: ViewportCollisionMechanic;
    private animationId: number | null = null;
    private isRunning: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get 2D context");
        this.ctx = ctx;

        this.mechanic = new ViewportCollisionMechanic(canvas.width, canvas.height);

        this.loop = this.loop.bind(this);
        this.resize = this.resize.bind(this);

        this.init();
    }

    private init() {
        this.resize();
        this.start();

        window.addEventListener("resize", this.resize);
    }

    public resize() {
        const rect = this.canvas.parentElement?.getBoundingClientRect();
        if (!rect) return;

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        this.mechanic.updateBounds(rect.width, rect.height);
    }

    public start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    }

    public stop() {
        this.isRunning = false;
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        window.removeEventListener("resize", this.resize);
    }

    private loop() {
        if (!this.isRunning) return;

        this.mechanic.update();
        this.draw();

        this.animationId = requestAnimationFrame(this.loop);
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const particles = this.mechanic.getParticles();
        for (const p of particles) {
            this.ctx.save();
            this.ctx.translate(p.pos.x, p.pos.y);
            this.ctx.rotate(p.visualRotation);

            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();

            const size = p.radius * 2;
            const r = p.radius * 0.4;
            this.ctx.roundRect(-p.radius, -p.radius, size, size, r);
            this.ctx.fill();

            this.ctx.fillStyle = "rgba(0,0,0,0.2)";
            this.ctx.beginPath();
            this.ctx.arc(0, 0, p.radius * 0.5, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();

            const speed = Math.sqrt(p.vel.x * p.vel.x + p.vel.y * p.vel.y);
            if (speed > 5) {
                this.ctx.beginPath();
                this.ctx.moveTo(p.pos.x, p.pos.y);
                this.ctx.lineTo(p.pos.x - p.vel.x * 2, p.pos.y - p.vel.y * 2);
                this.ctx.strokeStyle = p.color;
                this.ctx.globalAlpha = 0.5;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                this.ctx.globalAlpha = 1.0;
            }
        }
    }

    public dispose() {
        this.stop();
    }
}
