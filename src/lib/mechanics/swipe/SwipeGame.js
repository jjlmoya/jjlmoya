import { SwipeGesture } from "./SwipeGesture";

export class SwipeGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.trailPoints = [];
        this.swipeCounts = {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            "up-left": 0,
            "up-right": 0,
            "down-left": 0,
            "down-right": 0,
        };
        this.lastDirection = "-";
        this.lastVelocity = 0;
        this.activeArrow = null;
        this.arrowTimer = 0;

        this.gesture = new SwipeGesture(
            this.canvas,
            {
                minDistance: 50,
                maxDuration: 500,
                preventScroll: true,
                enableDiagonals: true,
            },
            {
                onSwipeStart: (x, y) => {
                    const rect = this.canvas.getBoundingClientRect();
                    this.trailPoints = [{ x: x - rect.left, y: y - rect.top, alpha: 1 }];
                },
                onSwipeMove: (x, y) => {
                    const rect = this.canvas.getBoundingClientRect();
                    if (this.trailPoints.length > 0) {
                        this.trailPoints.push({ x: x - rect.left, y: y - rect.top, alpha: 1 });
                    }
                },
                onSwipe: (direction, velocity) => {
                    if (this.swipeCounts.hasOwnProperty(direction)) {
                        this.swipeCounts[direction]++;
                    }
                    this.lastDirection = direction.toUpperCase();
                    this.lastVelocity = velocity;
                    this.activeArrow = direction;
                    this.arrowTimer = 20;
                },
                onSwipeEnd: () => {},
            }
        );

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
    }

    loop() {
        if (this.arrowTimer > 0) {
            this.arrowTimer--;
        } else {
            this.activeArrow = null;
        }

        this.trailPoints = this.trailPoints
            .map((p) => ({ ...p, alpha: p.alpha * 0.9 }))
            .filter((p) => p.alpha > 0.01);

        this.ctx.clearRect(0, 0, this.width, this.height);

        const bgGrad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        bgGrad.addColorStop(0, "#1e1b4b");
        bgGrad.addColorStop(1, "#312e81");
        this.ctx.fillStyle = bgGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.drawArrows();

        if (this.trailPoints.length > 1) {
            const gradient = this.ctx.createLinearGradient(
                this.trailPoints[0].x,
                this.trailPoints[0].y,
                this.trailPoints[this.trailPoints.length - 1].x,
                this.trailPoints[this.trailPoints.length - 1].y
            );
            gradient.addColorStop(0, "rgba(139, 92, 246, 0.8)");
            gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.8)");
            gradient.addColorStop(1, "rgba(236, 72, 153, 0.8)");

            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 8;
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";

            this.ctx.beginPath();
            this.trailPoints.forEach((point, i) => {
                if (i === 0) this.ctx.moveTo(point.x, point.y);
                else this.ctx.lineTo(point.x, point.y);
            });
            this.ctx.stroke();

            this.ctx.shadowBlur = 0;
            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }

        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 32px monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.lastDirection, this.width / 2, 50);

        this.ctx.font = "14px monospace";
        this.ctx.fillStyle = "#94a3b8";
        this.ctx.fillText(`${this.lastVelocity.toFixed(2)} px/ms`, this.width / 2, 75);

        requestAnimationFrame(this.loop);
    }

    drawArrows() {
        const cx = this.width / 2;
        const cy = this.height / 2;

        const offset = 60;

        const arrows = [
            { dir: "up", x: 0, y: -1, color: "#22d3ee" },
            { dir: "down", x: 0, y: 1, color: "#f472b6" },
            { dir: "left", x: -1, y: 0, color: "#4ade80" },
            { dir: "right", x: 1, y: 0, color: "#facc15" },
            { dir: "up-left", x: -0.7, y: -0.7, color: "#c084fc" },
            { dir: "up-right", x: 0.7, y: -0.7, color: "#fb923c" },
            { dir: "down-left", x: -0.7, y: 0.7, color: "#2dd4bf" },
            { dir: "down-right", x: 0.7, y: 0.7, color: "#fb7185" },
        ];

        arrows.forEach((arrow) => {
            const isActive = this.activeArrow === arrow.dir;
            const scale = isActive ? 1.5 : 1;
            const alpha = isActive ? 1 : 0.2;

            this.ctx.save();
            this.ctx.translate(cx + arrow.x * offset, cy + arrow.y * offset);
            this.ctx.scale(scale, scale);

            const angle = Math.atan2(arrow.y, arrow.x);
            this.ctx.rotate(angle + Math.PI / 2);

            this.ctx.fillStyle = arrow.color;
            this.ctx.globalAlpha = alpha;

            this.ctx.beginPath();
            this.ctx.moveTo(0, -10);
            this.ctx.lineTo(8, 10);
            this.ctx.lineTo(0, 5);
            this.ctx.lineTo(-8, 10);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.restore();
        });
    }
}
