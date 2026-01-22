import { Player } from "./Player.js";
import { InputHandler } from "./InputHandler.js";

export class PlatformerGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        this.width = canvas.width = rect.width;
        this.height = canvas.height = rect.height;

        this.input = new InputHandler();
        this.player = new Player(this);

        this.particles = [];

        this.platforms = [
            { x: 200, y: 400, width: 200, height: 20 },
            { x: 500, y: 300, width: 200, height: 20 },
            { x: 50, y: 250, width: 100, height: 20 },
            { x: 700, y: 150, width: 20, height: 200 },

            { x: 0, y: this.height - 50, width: this.width, height: 50 },
        ];

        this.debugState = document.getElementById("debug-state");
        this.debugVelX = document.getElementById("debug-vel-x");
        this.debugVelY = document.getElementById("debug-vel-y");

        this.lastTime = 0;
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        this.width = this.canvas.width = rect.width;
        this.height = this.canvas.height = rect.height;

        const ground = this.platforms.find((p) => p.height === 50 && p.y >= this.height - 100);
        if (ground) {
            ground.y = this.height - 50;
            ground.width = this.width;
        } else {
            this.platforms.push({ x: 0, y: this.height - 50, width: this.width, height: 50 });
        }
    }

    update(deltaTime) {
        const dt = deltaTime / 16.67;

        this.player.update(this.input, dt);

        this.particles.forEach((particle, index) => {
            particle.update(dt);
            if (particle.markedForDeletion) this.particles.splice(index, 1);
        });

        this.updateDebugUI();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = "#1e293b";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = "#334155";
        this.platforms.forEach((platform) => {
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });

        this.player.draw(this.ctx);

        this.particles.forEach((particle) => particle.draw(this.ctx));
    }

    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        if (deltaTime < 100) {
            this.update(deltaTime);
        }

        this.draw();
        requestAnimationFrame(this.animate);
    }

    createParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this, x, y, color));
        }
    }

    updateDebugUI() {
        if (this.debugState) this.debugState.innerText = this.player.state;
        if (this.debugVelX) this.debugVelX.innerText = this.player.vx.toFixed(2);
        if (this.debugVelY) this.debugVelY.innerText = this.player.vy.toFixed(2);
    }
}

class Particle {
    constructor(game, x, y, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -2 - 1;
        this.markedForDeletion = false;
    }

    update(dt) {
        this.x += this.speedX * dt;
        this.y += this.speedY * dt;
        this.size *= 0.95;
        if (this.size < 0.5) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
