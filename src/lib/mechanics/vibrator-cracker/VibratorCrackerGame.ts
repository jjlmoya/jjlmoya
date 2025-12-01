import { VibratorCrackerSystem } from "./VibratorCrackerSystem";

export class VibratorCrackerGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    system: VibratorCrackerSystem;

    width: number = 0;
    height: number = 0;
    centerX: number = 0;
    centerY: number = 0;

    isDragging: boolean = false;
    lastMouseAngle: number = 0;
    dialRotation: number = 0;

    // Hold to unlock logic
    holdTimer: number = 0;
    readonly HOLD_DURATION: number = 1000; // ms
    lastTime: number = 0;

    // Visual feedback for ticks
    tickAnim: number = 0;

    private _boundOnPointerMove: (e: MouseEvent | TouchEvent) => void;
    private _boundOnPointerUp: (e: MouseEvent | TouchEvent) => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.system = new VibratorCrackerSystem();

        // Visual feedback callbacks
        this.system.onTick = () => {
            this.tickAnim = 1.0;
        };

        this.resize();

        // Bind methods once to allow removal later
        this._boundOnPointerMove = (e: any) => {
            if (e.type === "touchmove") {
                if (this.isDragging) {
                    e.preventDefault();
                    this.onPointerMove(e.touches[0]);
                }
            } else {
                this.onPointerMove(e);
            }
        };
        this._boundOnPointerUp = () => this.onPointerUp();

        this.bindEvents();
        this.lastTime = performance.now();
        this.loop();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    bindEvents() {
        // Mouse
        this.canvas.addEventListener("mousedown", this.onPointerDown.bind(this));
        window.addEventListener("mousemove", this._boundOnPointerMove);
        window.addEventListener("mouseup", this._boundOnPointerUp);

        // Touch
        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                const touch = e.touches[0];
                const dx = touch.clientX - this.canvas.getBoundingClientRect().left - this.centerX;
                const dy = touch.clientY - this.canvas.getBoundingClientRect().top - this.centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Only prevent default if touching the dial
                if (dist < 150) {
                    e.preventDefault();
                    this.onPointerDown(touch);
                }
            },
            { passive: false }
        );

        window.addEventListener("touchmove", this._boundOnPointerMove, { passive: false });
        window.addEventListener("touchend", this._boundOnPointerUp);
    }

    destroy() {
        window.removeEventListener("mousemove", this._boundOnPointerMove);
        window.removeEventListener("mouseup", this._boundOnPointerUp);
        window.removeEventListener("touchmove", this._boundOnPointerMove);
        window.removeEventListener("touchend", this._boundOnPointerUp);
    }

    onPointerDown(e: MouseEvent | Touch) {
        const dx = e.clientX - this.canvas.getBoundingClientRect().left - this.centerX;
        const dy = e.clientY - this.canvas.getBoundingClientRect().top - this.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Only grab if inside the dial (radius approx 120)
        if (dist < 150) {
            this.isDragging = true;
            this.lastMouseAngle = Math.atan2(dy, dx);
        }
    }

    onPointerMove(e: MouseEvent | Touch) {
        if (!this.isDragging) return;

        const rect = this.canvas.getBoundingClientRect();
        const dx = e.clientX - rect.left - this.centerX;
        const dy = e.clientY - rect.top - this.centerY;

        const currentMouseAngle = Math.atan2(dy, dx);
        let deltaAngle = currentMouseAngle - this.lastMouseAngle;

        // Handle wrap around
        if (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
        if (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;

        this.dialRotation += deltaAngle;
        this.lastMouseAngle = currentMouseAngle;

        // Update System
        this.system.updateDial(this.dialRotation);
    }

    onPointerUp() {
        this.isDragging = false;
    }

    loop() {
        const now = performance.now();
        const dt = now - this.lastTime;
        this.lastTime = now;

        this.update(dt);
        this.draw();
        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt: number) {
        if (this.system.isUnlocked) return;

        if (this.system.isOnTarget(this.dialRotation)) {
            this.holdTimer += dt;
            if (this.holdTimer >= this.HOLD_DURATION) {
                this.system.advanceSequence();
                this.holdTimer = 0;
            }
        } else {
            this.holdTimer = 0;
        }

        // Decay tick animation
        if (this.tickAnim > 0) {
            this.tickAnim -= dt * 0.01; // Decay speed
            if (this.tickAnim < 0) this.tickAnim = 0;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Background
        this.ctx.fillStyle = "#111";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw Safe Dial
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.dialRotation);

        // Dial Body
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 120, 0, Math.PI * 2);
        this.ctx.fillStyle = "#333";
        this.ctx.fill();
        this.ctx.strokeStyle = "#555";
        this.ctx.lineWidth = 5;
        this.ctx.stroke();

        // Ticks
        this.ctx.fillStyle = "#fff";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "12px monospace";

        for (let i = 0; i < 100; i += 5) {
            const angle = (i / 100) * Math.PI * 2;
            const isMajor = i % 10 === 0;
            const tickLen = isMajor ? 15 : 8;

            const x1 = Math.cos(angle) * (110 - tickLen);
            const y1 = Math.sin(angle) * (110 - tickLen);
            const x2 = Math.cos(angle) * 110;
            const y2 = Math.sin(angle) * 110;

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = isMajor ? "#fff" : "#888";
            this.ctx.lineWidth = isMajor ? 2 : 1;
            this.ctx.stroke();

            if (isMajor) {
                const tx = Math.cos(angle) * 85;
                const ty = Math.sin(angle) * 85;
                this.ctx.save();
                this.ctx.translate(tx, ty);
                this.ctx.rotate(angle + Math.PI / 2);
                this.ctx.fillText(i.toString(), 0, 0);
                this.ctx.restore();
            }
        }

        // Knob
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 40, 0, Math.PI * 2);
        this.ctx.fillStyle = "#222";
        this.ctx.fill();
        this.ctx.strokeStyle = "#444";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.restore();

        // Indicator (Fixed at top)
        const indicatorOffset = this.tickAnim * 5; // Move up by 5px on tick
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY - 130 - indicatorOffset);
        this.ctx.lineTo(this.centerX - 10, this.centerY - 150 - indicatorOffset);
        this.ctx.lineTo(this.centerX + 10, this.centerY - 150 - indicatorOffset);
        this.ctx.closePath();

        // Indicator color changes when holding
        if (this.holdTimer > 0 && !this.system.isUnlocked) {
            // Pulse or change color based on progress
            const progress = Math.min(1, this.holdTimer / this.HOLD_DURATION);
            const r = 225;
            const g = Math.floor(29 + (255 - 29) * progress);
            const b = Math.floor(72 + (0 - 72) * progress);
            this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

            // Draw progress ring around indicator?
            this.ctx.fill();

            // Draw progress arc
            this.ctx.beginPath();
            this.ctx.arc(
                this.centerX,
                this.centerY - 140 - indicatorOffset,
                15,
                -Math.PI / 2,
                -Math.PI / 2 + Math.PI * 2 * progress
            );
            this.ctx.strokeStyle = "#4ade80";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        } else {
            this.ctx.fillStyle = "#e11d48"; // Red indicator
            this.ctx.fill();
        }

        // Status / Combination Progress
        this.drawStatus();
    }

    drawStatus() {
        this.ctx.fillStyle = "#0fa";
        this.ctx.font = "20px monospace";
        this.ctx.textAlign = "center";

        if (this.system.isUnlocked) {
            this.ctx.fillStyle = "#4ade80";
            this.ctx.font = "bold 30px sans-serif";
            this.ctx.fillText("UNLOCKED!", this.centerX, this.height - 50);
        } else {
            const found = this.system.currentNumberIndex;
            const total = this.system.combination.length;

            let dots = "";
            for (let i = 0; i < total; i++) {
                dots += i < found ? "● " : "○ ";
            }

            this.ctx.fillText(dots.trim(), this.centerX, this.height - 50);
        }
    }
}
