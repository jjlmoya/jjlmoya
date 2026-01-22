import { FlockingMechanic } from "./FlockingMechanic";

export class FlockingGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new FlockingMechanic(this.width, this.height);

        this.mouseX = undefined;
        this.mouseY = undefined;

        this.loop = this.loop.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);

        this.initInput();
        requestAnimationFrame(this.loop);
    }

    initInput() {
        window.addEventListener("mousemove", this.handleMove);
        window.addEventListener("mouseleave", this.handleLeave);

        window.addEventListener(
            "touchmove",
            (e) => {
                this.handleMove(e.touches[0]);
            },
            { passive: false }
        );

        window.addEventListener("touchend", this.handleLeave);
    }

    handleMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    handleLeave() {
        this.mouseX = undefined;
        this.mouseY = undefined;
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
        this.mechanic.update(this.mouseX, this.mouseY);
        this.draw();
        requestAnimationFrame(this.loop);
    }

    draw() {
        this.ctx.fillStyle = "#0a0a0a";
        this.ctx.fillRect(0, 0, this.width, this.height);

        const boids = this.mechanic.getBoids();
        for (const boid of boids) {
            const angle = Math.atan2(boid.vel.y, boid.vel.x);

            this.ctx.save();
            this.ctx.translate(boid.pos.x, boid.pos.y);
            this.ctx.rotate(angle);

            this.ctx.beginPath();
            this.ctx.moveTo(6, 0);
            this.ctx.lineTo(-4, 3);
            this.ctx.lineTo(-4, -3);
            this.ctx.closePath();

            this.ctx.fillStyle = boid.color;
            this.ctx.fill();

            this.ctx.restore();
        }
    }

    destroy() {
        window.removeEventListener("mousemove", this.handleMove);
        window.removeEventListener("mouseleave", this.handleLeave);
    }
}
