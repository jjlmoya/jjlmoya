import { DrawThePathMechanic } from "./DrawThePathMechanic";

export class DrawThePathGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private mechanic: DrawThePathMechanic;
    private isRunning: boolean = false;
    private animationId: number = 0;
    private cameraX: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.mechanic = new DrawThePathMechanic(this.canvas.width, this.canvas.height);

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
        this.mechanic.update();
        this.cameraX = this.mechanic.player.x - 150;
        this.draw();
        this.animationId = requestAnimationFrame(() => this.loop());
    }

    private draw() {
        this.ctx.fillStyle = "#0f0f1a";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(-this.cameraX, 0);

        this.drawGrid();

        this.ctx.fillStyle = "#1e1e2e";
        this.ctx.strokeStyle = "#00ffcc";
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = "#00ffcc";

        for (const p of this.mechanic.platforms) {
            this.ctx.fillRect(p.x, p.y, p.w, p.h);
            this.ctx.strokeRect(p.x, p.y, p.w, p.h);
        }
        this.ctx.shadowBlur = 0;

        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        for (const line of this.mechanic.lines) {
            if (line.points.length < 2) continue;

            this.ctx.beginPath();
            this.ctx.moveTo(line.points[0].x, line.points[0].y);
            for (let i = 1; i < line.points.length; i++) {
                this.ctx.lineTo(line.points[i].x, line.points[i].y);
            }

            this.ctx.strokeStyle = `rgba(255, 0, 128, ${line.opacity})`;
            this.ctx.lineWidth = 5;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = "#ff0080";
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }

        const pl = this.mechanic.player;

        for (let i = 1; i <= 5; i++) {
            this.ctx.fillStyle = `rgba(0, 255, 255, ${0.3 - i * 0.05})`;
            this.ctx.beginPath();
            this.ctx.arc(
                pl.x - pl.vx * i * 1.5,
                pl.y - pl.vy * i * 1.5,
                pl.radius * (1 - i * 0.1),
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }

        this.ctx.fillStyle = "#fff";
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#00ffff";
        this.ctx.beginPath();
        this.ctx.arc(pl.x, pl.y, pl.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        for (const t of this.mechanic.threats) {
            if (t.type === "meteor") {
                this.ctx.fillStyle = "#ff4400";
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = "#ff4400";
                this.ctx.beginPath();
                this.ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            } else {
                this.ctx.fillStyle = "#00ff00";
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = "#00ff00";
                this.ctx.fillRect(t.x - t.radius, t.y - t.radius, t.radius * 2, t.radius * 2);
                this.ctx.shadowBlur = 0;
            }
        }

        this.ctx.restore();

        this.drawUI();
    }

    private drawGrid() {
        const size = 100;
        const offset = this.cameraX % size;
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        for (let x = -offset; x < this.canvas.width; x += size) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }
        for (let y = 0; y < this.canvas.height; y += size) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }
        this.ctx.stroke();
    }

    private drawUI() {
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "bold 20px monospace";
        this.ctx.textAlign = "left";
        this.ctx.fillText(`DISTANCE: ${this.mechanic.score}m`, 20, 40);

        if (this.mechanic.isGameOver) {
            this.ctx.fillStyle = "rgba(0,0,0,0.8)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = "#ff0055";
            this.ctx.font = "bold 50px monospace";
            this.ctx.textAlign = "center";
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = "#ff0055";
            this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);

            this.ctx.fillStyle = "#fff";
            this.ctx.font = "20px monospace";
            this.ctx.shadowBlur = 0;
            this.ctx.fillText(
                "Click to Restart",
                this.canvas.width / 2,
                this.canvas.height / 2 + 60
            );
        }
    }

    private bindInput() {
        const getPos = (e: MouseEvent | Touch) => {
            const r = this.canvas.getBoundingClientRect();
            return {
                x: e.clientX - r.left + this.cameraX,
                y: e.clientY - r.top,
            };
        };

        const start = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            if (this.mechanic.isGameOver) {
                this.mechanic.reset();
                return;
            }
            const t =
                window.TouchEvent && e instanceof TouchEvent ? e.touches[0] : (e as MouseEvent);
            const p = getPos(t);
            this.mechanic.startLine(p.x, p.y);
        };

        const move = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            const t =
                window.TouchEvent && e instanceof TouchEvent ? e.touches[0] : (e as MouseEvent);
            const p = getPos(t);
            this.mechanic.addPoint(p.x, p.y);
        };

        const end = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            this.mechanic.endLine();
        };

        this.canvas.addEventListener("mousedown", start);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);

        this.canvas.addEventListener("touchstart", start, { passive: false });
        window.addEventListener("touchmove", move, { passive: false });
        window.addEventListener("touchend", end);
    }

    private handleResize() {
        if (this.canvas.parentElement) {
            this.canvas.width = this.canvas.parentElement.clientWidth;
            this.canvas.height = this.canvas.parentElement.clientHeight;
            this.mechanic.resize(this.canvas.width, this.canvas.height);
        }
    }
}
