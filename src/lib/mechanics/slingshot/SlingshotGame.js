import { SlingshotMechanic } from "./SlingshotMechanic";

export class SlingshotGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.mechanic = new SlingshotMechanic(
            {
                x: this.width / 2,
                y: this.height / 2,
                radius: 32,
            },
            {
                gravity: 0.4,
                friction: 0.995,
                bounceDamping: 0.8,
                dragPower: 0.15,
                maxDragDistance: 300,
                padding: { top: 0, bottom: 0, x: 0 },
            },
            {
                onBounce: (speed) => this.playBounce(speed),
                onDragStart: () => {
                    this.initAudio();
                    this.canvas.style.cursor = "grabbing";
                },
                onDragEnd: () => {
                    this.canvas.style.cursor = "grab";
                },
            }
        );

        this.mechanic.updateBounds(this.width, this.height);

        this.audioCtx = null;

        this.loop = this.loop.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);

        this.initInput();
        requestAnimationFrame(this.loop);
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleStart);
        window.addEventListener("mousemove", this.handleMove);
        window.addEventListener("mouseup", this.handleEnd);

        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                this.handleStart(e.touches[0]);
            },
            { passive: false }
        );
        window.addEventListener("touchmove", () => {}, { passive: false });

        window.addEventListener(
            "touchmove",
            (e) => {
                this.handleMove(e.touches[0]);
            },
            { passive: false }
        );
        window.addEventListener("touchend", this.handleEnd);
    }

    handleStart(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.mechanic.startDrag(x, y);
    }

    handleMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.mechanic.updateDrag(x, y);
    }

    handleEnd() {
        this.mechanic.endDrag();
    }

    initAudio() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window["webkitAudioContext"])();
        }
    }

    playBounce(speed) {
        if (!this.audioCtx) return;
        const vol = Math.min(speed / 20, 1);
        if (vol < 0.1) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "sine";
        const freq = 200 + Math.min(speed * 5, 400);

        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(vol * 0.5, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.1);
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
        this.ctx.fillStyle = "#f5f5f5";
        this.ctx.fillRect(0, 0, this.width, this.height);

        const state = this.mechanic.getState();
        const dragInfo = this.mechanic.getDragInfo();

        if (dragInfo) {
            this.ctx.beginPath();
            this.ctx.moveTo(dragInfo.anchor.x, dragInfo.anchor.y);
            this.ctx.lineTo(state.x, state.y);
            this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
            this.ctx.lineWidth = 4;
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.arc(dragInfo.anchor.x, dragInfo.anchor.y, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = "rgba(0,0,0,0.2)";
            this.ctx.fill();
        }

        this.ctx.save();
        this.ctx.translate(state.x, state.y);

        const speed = this.mechanic.getSpeed();
        const stretch = Math.min(speed * 0.02, 0.5);
        const angle = Math.atan2(state.vy, state.vx);

        this.ctx.rotate(angle);
        this.ctx.scale(1 + stretch, 1 - stretch * 0.5);

        this.ctx.beginPath();
        this.ctx.arc(4, 4, state.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(0, 0, state.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#facc15";
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "#000000";
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = "#000000";
        this.ctx.font = "900 20px Inter, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        let face = "-_-";
        const timeSinceBounce = this.mechanic.getTimeSinceBounce();

        if (this.mechanic.isDragging()) {
            face = "O_O";
        } else if (timeSinceBounce < 400) {
            face = "Ò_Ó";
        } else if (speed > 15) {
            face = ">_<";
        }

        this.ctx.fillText(face, 0, 0);

        this.ctx.restore();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.handleStart);
        window.removeEventListener("mousemove", this.handleMove);
        window.removeEventListener("mouseup", this.handleEnd);
    }
}
