
import { RhythmJumpMechanic } from "./RhythmJumpMechanic";

export class RhythmJumpGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private mechanic: RhythmJumpMechanic;
    private isRunning: boolean = false;
    private animationId: number = 0;
    private lastTime: number = 0;

    // Camera
    private cameraX: number = 0;

    // Colors
    private colors = {
        bg: '#0f172a', // slate-900
        c0: '#22d3ee', // cyan-400
        c1: '#d946ef', // fuchsia-500
        c0Ghost: 'rgba(34, 211, 238, 0.2)',
        c1Ghost: 'rgba(217, 70, 239, 0.2)'
    };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.mechanic = new RhythmJumpMechanic(this.canvas.width, this.canvas.height);

        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        this.bindInput();
    }

    public start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.mechanic.reset();
        this.lastTime = performance.now();
        this.loop();
    }

    public stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
    }

    private loop() {
        if (!this.isRunning) return;

        const now = performance.now();
        const dt = Math.min((now - this.lastTime), 100); // Cap dt to prevent huge jumps
        this.lastTime = now;

        // Calculate timeScale (1.0 at 60fps)
        // 1000ms / 60fps = 16.66ms per frame
        const timeScale = dt / (1000 / 60);

        this.update(timeScale);
        this.draw();

        this.animationId = requestAnimationFrame(() => this.loop());
    }

    private update(timeScale: number) {
        this.mechanic.update(timeScale);
        this.cameraX = this.mechanic.player.x - 100;
    }

    private draw() {
        // Clear
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(-this.cameraX, 0);

        // Draw Platforms
        for (const p of this.mechanic.platforms) {
            const isMatching = p.colorId === this.mechanic.player.colorId;

            if (p.colorId === 0) {
                this.ctx.fillStyle = isMatching ? this.colors.c0 : this.colors.c0Ghost;
                if (isMatching) {
                    this.ctx.shadowBlur = 15;
                    this.ctx.shadowColor = this.colors.c0;
                }
            } else {
                this.ctx.fillStyle = isMatching ? this.colors.c1 : this.colors.c1Ghost;
                if (isMatching) {
                    this.ctx.shadowBlur = 15;
                    this.ctx.shadowColor = this.colors.c1;
                }
            }

            this.ctx.fillRect(p.x, p.y, p.width, p.height);
            this.ctx.shadowBlur = 0;

            // Outline
            this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            this.ctx.strokeRect(p.x, p.y, p.width, p.height);
        }

        // Draw Player
        const playerColor = this.mechanic.player.colorId === 0 ? this.colors.c0 : this.colors.c1;
        this.ctx.fillStyle = playerColor;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = playerColor;
        this.ctx.fillRect(this.mechanic.player.x, this.mechanic.player.y, this.mechanic.player.width, this.mechanic.player.height);
        this.ctx.shadowBlur = 0;

        this.ctx.restore();

        // UI
        this.drawUI();
    }

    private drawUI() {
        // Score
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 24px monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`SCORE: ${this.mechanic.score}`, 20, 40);

        // Color Indicator (Current State)
        const indSize = 30;
        const x = this.canvas.width - 50;
        const y = 30;

        this.ctx.fillStyle = this.mechanic.player.colorId === 0 ? this.colors.c0 : this.colors.c1;
        this.ctx.beginPath();
        this.ctx.arc(x, y, indSize / 2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Game Over
        if (this.mechanic.player.state === 'dead') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 40px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.font = '20px monospace';
            this.ctx.fillText('Click to Restart', this.canvas.width / 2, this.canvas.height / 2 + 50);
        }
    }

    private bindInput() {
        // Desktop: Click to toggle, Space to jump
        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            if (this.mechanic.player.state === 'dead') {
                this.mechanic.reset();
            } else {
                this.mechanic.toggleColor();
            }
        };

        const handleKey = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.mechanic.player.state === 'dead') {
                    this.mechanic.reset();
                } else {
                    this.mechanic.jump();
                }
            }
        };

        this.canvas.addEventListener('mousedown', handleClick);
        window.addEventListener('keydown', handleKey);

        // Mobile: Touch handling
        let touchStartY = 0;
        let touchStartX = 0;
        const SWIPE_THRESHOLD = 30;

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: false });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.mechanic.player.state === 'dead') {
                this.mechanic.reset();
                return;
            }

            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;

            const dy = touchEndY - touchStartY;
            const dx = touchEndX - touchStartX;

            // Check for swipe up (negative dy)
            if (dy < -SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
                this.mechanic.jump();
            } else {
                // Treat as tap
                this.mechanic.toggleColor();
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
