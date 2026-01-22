import { GravityFlipMechanic } from "./GravityFlipMechanic";

export class GravityFlipGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    animationId: number | null = null;
    mechanic: GravityFlipMechanic;

    player: {
        x: number;
        size: number;
        color: string;
        rotation: number;
    };

    obstacles: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        type: "spike" | "block";
        passed: boolean;
    }>;

    particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        color: string;
        size: number;
    }>;

    gameSpeed: number;
    score: number;
    isGameOver: boolean;
    frameCount: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.width = canvas.width;
        this.height = canvas.height;

        this.player = {
            x: this.width * 0.2,
            size: 30,
            color: "#00f3ff",
            rotation: 0,
        };

        this.mechanic = new GravityFlipMechanic(this.height / 2, {
            gravity: 0.6,
            jumpForce: 0,
            groundY: this.height - this.player.size,
            ceilingY: 0,
        });

        this.obstacles = [];
        this.particles = [];
        this.gameSpeed = 6;
        this.score = 0;
        this.isGameOver = false;
        this.frameCount = 0;

        this.loop = this.loop.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.initInput();
        this.handleResize();

        this.animationId = requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleInput);
        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                this.handleInput();
            },
            { passive: false }
        );

        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                this.handleInput();
            }
        });

        window.addEventListener("resize", this.handleResize);
    }

    handleResize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;

        this.mechanic.updateBounds(this.height - this.player.size, 0);

        const state = this.mechanic.getState();
        if (state.y > this.height - this.player.size) {
        }
    }

    handleInput() {
        if (this.isGameOver) {
            this.reset();
            return;
        }

        if (this.mechanic.flip()) {
            const state = this.mechanic.getState();
            this.createExplosion(
                this.player.x + this.player.size / 2,
                state.y + this.player.size / 2,
                10,
                this.player.color
            );
        }
    }

    reset() {
        this.mechanic.reset(this.height / 2);
        this.player.rotation = 0;
        this.obstacles = [];
        this.particles = [];
        this.score = 0;
        this.gameSpeed = 6;
        this.isGameOver = false;
        this.frameCount = 0;
    }

    spawnObstacle() {
        const type = Math.random() > 0.5 ? "spike" : "block";
        const isTop = Math.random() > 0.5;

        let width = 40;
        let height = 40;
        let y = 0;

        if (type === "spike") {
            width = 40;
            height = 60;
            y = isTop ? 0 : this.height - height;
        } else {
            width = 50;
            height = 100 + Math.random() * 100;
            y = isTop ? 0 : this.height - height;
        }

        this.obstacles.push({
            x: this.width,
            y: y,
            width,
            height,
            type,
            passed: false,
        });
    }

    createExplosion(x: number, y: number, count: number, color: string) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                color: color,
                size: Math.random() * 4 + 2,
            });
        }
    }

    update() {
        if (this.isGameOver) return;

        this.mechanic.update();
        const state = this.mechanic.getState();

        this.player.rotation += state.vy * 0.05;

        this.frameCount++;
        if (this.frameCount % 90 === 0) {
            this.spawnObstacle();
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];
            obs.x -= this.gameSpeed;

            if (
                this.player.x < obs.x + obs.width &&
                this.player.x + this.player.size > obs.x &&
                state.y < obs.y + obs.height &&
                state.y + this.player.size > obs.y
            ) {
                this.isGameOver = true;
                this.createExplosion(
                    this.player.x + this.player.size / 2,
                    state.y + this.player.size / 2,
                    30,
                    "#ff0055"
                );
            }

            if (!obs.passed && obs.x + obs.width < this.player.x) {
                this.score++;
                obs.passed = true;
                if (this.score % 5 === 0) this.gameSpeed += 0.5;
            }

            if (obs.x + obs.width < 0) {
                this.obstacles.splice(i, 1);
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    draw() {
        this.ctx.fillStyle = "rgba(20, 20, 20, 0.3)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        this.ctx.lineWidth = 1;
        const gridSize = 50;
        const offset = (this.frameCount * this.gameSpeed * 0.5) % gridSize;

        for (let x = -offset; x < this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }

        this.obstacles.forEach((obs) => {
            this.ctx.fillStyle = obs.type === "spike" ? "#ff0055" : "#bd00ff";

            if (obs.type === "spike") {
                this.ctx.beginPath();
                if (obs.y === 0) {
                    this.ctx.moveTo(obs.x, 0);
                    this.ctx.lineTo(obs.x + obs.width / 2, obs.height);
                    this.ctx.lineTo(obs.x + obs.width, 0);
                } else {
                    this.ctx.moveTo(obs.x, this.height);
                    this.ctx.lineTo(obs.x + obs.width / 2, this.height - obs.height);
                    this.ctx.lineTo(obs.x + obs.width, this.height);
                }
                this.ctx.fill();

                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = "#ff0055";
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            } else {
                this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = "#bd00ff";
                this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                this.ctx.shadowBlur = 0;
            }
        });

        const state = this.mechanic.getState();

        if (!this.isGameOver) {
            this.ctx.save();
            this.ctx.translate(
                this.player.x + this.player.size / 2,
                state.y + this.player.size / 2
            );
            this.ctx.rotate(this.player.rotation);

            this.ctx.fillStyle = this.player.color;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = this.player.color;
            this.ctx.fillRect(
                -this.player.size / 2,
                -this.player.size / 2,
                this.player.size,
                this.player.size
            );

            this.ctx.fillStyle = "#000";
            this.ctx.font = "bold 12px Arial";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.shadowBlur = 0;
            this.ctx.fillText(state.gravityDir === 1 ? "OwO" : "UwU", 0, 0);

            this.ctx.restore();
        }

        this.particles.forEach((p) => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        });

        this.ctx.fillStyle = "#fff";
        this.ctx.font = "bold 24px monospace";
        this.ctx.textAlign = "left";
        this.ctx.fillText(`SCORE: ${this.score}`, 20, 40);

        if (this.isGameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "#fff";
            this.ctx.font = "bold 40px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2 - 20);

            this.ctx.font = "20px monospace";
            this.ctx.fillText("Tap to Restart", this.width / 2, this.height / 2 + 30);
        }
    }

    loop() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(this.loop);
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.canvas.removeEventListener("mousedown", this.handleInput);
        window.removeEventListener("keydown", this.handleInput);
        window.removeEventListener("resize", this.handleResize);
    }
}
