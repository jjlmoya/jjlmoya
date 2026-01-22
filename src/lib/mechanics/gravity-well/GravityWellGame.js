import { GravityWellMechanic } from "./GravityWellMechanic";

export class GravityWellGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new GravityWellMechanic(this.width, this.height, {
            particleCount: 400,
            gravityConstant: 25,
            friction: 0.96,
            maxSpeed: 15,
        });

        this.loop = this.loop.bind(this);
        this.handleInput = this.handleInput.bind(this);

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
    }

    handleInput(e) {
        if (e.type === "touchstart") {
            e.preventDefault();
        }

        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        this.mechanic.addWell(x, y);
    }

    clearWells() {
        this.mechanic.clearWells();
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
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        const wells = this.mechanic.getWells();
        for (const well of wells) {
            const opacity = well.lifetime / well.maxLifetime;
            this.ctx.beginPath();
            this.ctx.arc(
                well.pos.x,
                well.pos.y,
                well.radius * (0.5 + 0.5 * opacity),
                0,
                Math.PI * 2
            );
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * opacity})`;
            this.ctx.fill();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * opacity})`;
            this.ctx.stroke();
        }

        const particles = this.mechanic.getParticles();
        for (const p of particles) {
            this.ctx.beginPath();
            this.ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        }
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.handleInput);
        this.canvas.removeEventListener("touchstart", this.handleInput);
    }
}
