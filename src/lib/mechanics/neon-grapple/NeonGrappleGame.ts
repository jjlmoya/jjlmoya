import { NeonGrappleMechanic } from "./NeonGrappleMechanic";

export class NeonGrappleGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private mechanic: NeonGrappleMechanic;
    private isRunning: boolean = false;
    private animationId: number = 0;

    private cameraX: number = 0;

    private colors = {
        background: "#0c0a09",
        player: "#06b6d4",
        anchor: "#f472b6",
        rope: "#22d3ee",
        ropeInactive: "#334155",
    };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;

        this.mechanic = new NeonGrappleMechanic(this.canvas.width, this.canvas.height);

        this.handleResize();
        window.addEventListener("resize", () => this.handleResize());

        this.bindInput();
    }

    public start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.mechanic.reset();
        this.loop();
    }

    public stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
    }

    private loop() {
        if (!this.isRunning) return;

        this.update();
        this.draw();

        this.animationId = requestAnimationFrame(() => this.loop());
    }

    private update() {
        this.mechanic.update();

        this.cameraX = this.mechanic.player.x - this.canvas.width / 3;
    }

    private draw() {
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        this.ctx.translate(-this.cameraX, 0);

        this.drawBackground();

        if (this.mechanic.player.state === "grappling" && this.mechanic.currentAnchor) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.mechanic.player.x, this.mechanic.player.y);
            this.ctx.lineTo(this.mechanic.currentAnchor.x, this.mechanic.currentAnchor.y);
            this.ctx.strokeStyle = this.colors.rope;
            this.ctx.lineWidth = 3;
            this.ctx.lineCap = "round";
            this.ctx.stroke();

            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = this.colors.rope;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }

        for (const anchor of this.mechanic.anchors) {
            if (anchor.x < this.cameraX - 50 || anchor.x > this.cameraX + this.canvas.width + 50)
                continue;

            const isCurrent = this.mechanic.currentAnchor === anchor;

            this.ctx.beginPath();
            this.ctx.arc(anchor.x, anchor.y, anchor.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = isCurrent ? "#ffffff" : this.colors.anchor;
            this.ctx.fill();

            if (isCurrent) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = "#ffffff";
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
        }

        this.ctx.beginPath();
        this.ctx.arc(
            this.mechanic.player.x,
            this.mechanic.player.y,
            this.mechanic.player.radius,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = this.colors.player;
        this.ctx.fill();

        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = this.colors.player;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        if (this.mechanic.startingPlatform && this.mechanic.startingPlatform.active) {
            const p = this.mechanic.startingPlatform;
            this.ctx.fillStyle = "#3f3f46";
            this.ctx.fillRect(p.x, p.y, p.width, p.height);

            this.ctx.fillStyle = "#22d3ee";
            this.ctx.fillRect(p.x, p.y, p.width, 2);
        }

        this.ctx.restore();

        this.drawUI();
    }

    private drawBackground() {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        this.ctx.lineWidth = 1;

        const gridSize = 100;
        const startX = Math.floor(this.cameraX / gridSize) * gridSize;

        for (let x = startX; x < this.cameraX + this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.cameraX, this.canvas.height / 2);
        this.ctx.lineTo(this.cameraX + this.canvas.width, this.canvas.height / 2);
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        this.ctx.stroke();
    }

    private drawUI() {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "bold 24px monospace";
        this.ctx.textAlign = "left";
        this.ctx.fillText(`DIST: ${this.mechanic.score}m`, 20, 40);

        if (this.mechanic.player.state === "dead") {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "bold 48px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);

            this.ctx.font = "24px monospace";
            this.ctx.fillText(
                "Click to Restart",
                this.canvas.width / 2,
                this.canvas.height / 2 + 50
            );
        }
    }

    private bindInput() {
        const handleStart = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            if (this.mechanic.player.state === "dead") {
                this.mechanic.reset();
            } else {
                this.mechanic.grapple();
            }
        };

        const handleEnd = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            this.mechanic.release();
        };

        this.canvas.addEventListener("mousedown", handleStart);
        this.canvas.addEventListener("touchstart", handleStart, { passive: false });

        this.canvas.addEventListener("mouseup", handleEnd);
        this.canvas.addEventListener("touchend", handleEnd);

        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                if (this.mechanic.player.state === "dead") {
                    this.mechanic.reset();
                } else {
                    this.mechanic.grapple();
                }
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.code === "Space") {
                this.mechanic.release();
            }
        });
    }

    private handleResize() {
        const parent = this.canvas.parentElement;
        if (parent) {
            this.canvas.width = parent.clientWidth;
            this.canvas.height = parent.clientHeight;
            this.mechanic.resize(this.canvas.width, this.canvas.height);
        }
    }
}
