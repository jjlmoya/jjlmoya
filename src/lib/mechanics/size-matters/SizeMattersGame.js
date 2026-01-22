export class SizeMattersGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.player = {
            x: this.width / 2,
            y: 100,
            size: 20,
            minSize: 10,
            maxSize: 60,
            vy: 0,
            vx: 0,
            isGrowing: false,
        };

        this.cameraY = 0;
        this.score = 0;
        this.obstacles = [];
        this.particles = [];
        this.isRunning = true;
        this.lastTime = 0;

        this.bindInput();
        this.generateInitialObstacles();
        this.resize();
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    bindInput() {
        const startGrow = (e) => {
            e.preventDefault();
            this.player.isGrowing = true;
        };
        const stopGrow = (e) => {
            e.preventDefault();
            this.player.isGrowing = false;
        };

        this.canvas.addEventListener("mousedown", startGrow);
        this.canvas.addEventListener("mouseup", stopGrow);
        this.canvas.addEventListener("touchstart", startGrow, { passive: false });
        this.canvas.addEventListener("touchend", stopGrow);

        const updateX = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const targetX = clientX - rect.left;

            this.player.targetX = targetX;
        };

        this.canvas.addEventListener("mousemove", updateX);
        this.canvas.addEventListener("touchmove", updateX, { passive: false });
    }

    generateInitialObstacles() {
        for (let i = 0; i < 10; i++) {
            this.addObstacle(400 + i * 300);
        }
    }

    addObstacle(y) {
        const type = Math.random() > 0.5 ? "gap" : "breakable";
        if (type === "gap") {
            const gapWidth = 40;
            const gapX = Math.random() * (this.width - gapWidth);
            this.obstacles.push({
                y: y,
                h: 20,
                type: "gap",
                gapX: gapX,
                gapWidth: gapWidth,
                passed: false,
            });
        } else {
            const width = 100 + Math.random() * 100;
            const x = Math.random() * (this.width - width);
            this.obstacles.push({
                y: y,
                x: x,
                w: width,
                h: 20,
                type: "breakable",
                broken: false,
                passed: false,
            });
        }
    }

    update(dt) {
        if (!this.isRunning) return;

        const growSpeed = 100 * dt;
        if (this.player.isGrowing) {
            this.player.size = Math.min(this.player.size + growSpeed, this.player.maxSize);
        } else {
            this.player.size = Math.max(this.player.size - growSpeed, this.player.minSize);
        }

        const gravity = 500 * (this.player.size / this.player.maxSize) + 100;

        this.player.vy += gravity * dt;

        this.player.vy *= 0.99;

        this.player.y += this.player.vy * dt;

        if (this.player.targetX !== undefined) {
            const dx = this.player.targetX - this.player.x;
            this.player.x += dx * 5 * dt;
        }

        if (this.player.x < this.player.size) this.player.x = this.player.size;
        if (this.player.x > this.width - this.player.size)
            this.player.x = this.width - this.player.size;

        this.cameraY = this.player.y - 200;

        this.obstacles.forEach((obs) => {
            if (obs.y < this.cameraY - 100) {
                obs.remove = true;
                this.addObstacle(this.obstacles[this.obstacles.length - 1].y + 300);
            }

            if (obs.type === "breakable" && !obs.broken) {
                if (
                    this.checkRectCircle(
                        obs.x,
                        obs.y,
                        obs.w,
                        obs.h,
                        this.player.x,
                        this.player.y,
                        this.player.size / 2
                    )
                ) {
                    if (this.player.size > 40) {
                        obs.broken = true;
                        this.createParticles(obs.x + obs.w / 2, obs.y, "white");
                        this.score += 10;

                        this.player.vy *= 0.5;
                    } else {
                        this.player.y = obs.y - this.player.size / 2;
                        this.player.vy = 0;
                    }
                }
            } else if (obs.type === "gap") {
                if (
                    this.checkRectCircle(
                        0,
                        obs.y,
                        obs.gapX,
                        obs.h,
                        this.player.x,
                        this.player.y,
                        this.player.size / 2
                    )
                ) {
                    this.player.y = obs.y - this.player.size / 2;
                    this.player.vy = 0;
                }

                if (
                    this.checkRectCircle(
                        obs.gapX + obs.gapWidth,
                        obs.y,
                        this.width - (obs.gapX + obs.gapWidth),
                        obs.h,
                        this.player.x,
                        this.player.y,
                        this.player.size / 2
                    )
                ) {
                    this.player.y = obs.y - this.player.size / 2;
                    this.player.vy = 0;
                }
            }
        });

        this.obstacles = this.obstacles.filter((o) => !o.remove);

        this.particles.forEach((p) => {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
        });
        this.particles = this.particles.filter((p) => p.life > 0);
    }

    checkRectCircle(rx, ry, rw, rh, cx, cy, cr) {
        const distX = Math.abs(cx - rx - rw / 2);
        const distY = Math.abs(cy - ry - rh / 2);

        if (distX > rw / 2 + cr) {
            return false;
        }
        if (distY > rh / 2 + cr) {
            return false;
        }

        if (distX <= rw / 2) {
            return true;
        }
        if (distY <= rh / 2) {
            return true;
        }

        const dx = distX - rw / 2;
        const dy = distY - rh / 2;
        return dx * dx + dy * dy <= cr * cr;
    }

    createParticles(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 200,
                vy: (Math.random() - 0.5) * 200,
                life: 0.5,
                color: color,
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.save();

        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        this.ctx.lineWidth = 1;
        const gridSize = 50;
        const offsetY = Math.floor(this.cameraY) % gridSize;

        for (let x = 0; x < this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (let y = -offsetY; y < this.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }

        this.ctx.translate(0, -this.cameraY);

        this.obstacles.forEach((obs) => {
            if (obs.type === "breakable") {
                if (!obs.broken) {
                    this.ctx.fillStyle = "#ef4444";
                    this.ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

                    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
                    this.ctx.beginPath();
                    this.ctx.moveTo(obs.x, obs.y);
                    this.ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
                    this.ctx.stroke();
                }
            } else if (obs.type === "gap") {
                this.ctx.fillStyle = "#3b82f6";
                this.ctx.fillRect(0, obs.y, obs.gapX, obs.h);
                this.ctx.fillRect(
                    obs.gapX + obs.gapWidth,
                    obs.y,
                    this.width - (obs.gapX + obs.gapWidth),
                    obs.h
                );
            }
        });

        this.particles.forEach((p) => {
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life * 2;
            this.ctx.fillRect(p.x, p.y, 4, 4);
            this.ctx.globalAlpha = 1;
        });

        this.ctx.fillStyle = this.player.isGrowing ? "#fbbf24" : "#10b981";
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.size / 2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = this.player.isGrowing ? "#fbbf24" : "#10b981";
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        this.ctx.restore();

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px monospace";
        this.ctx.textBaseline = "top";
        this.ctx.textAlign = "left";
        this.ctx.fillText(`SCORE: ${this.score}`, 20, 20);
        this.ctx.fillText(`SIZE: ${Math.round(this.player.size)}`, 20, 50);

        if (this.cameraY < 200) {
            this.ctx.fillStyle = "rgba(255,255,255,0.5)";
            this.ctx.textAlign = "center";
            this.ctx.fillText("HOLD to GROW & SMASH", this.width / 2, this.height / 2);
            this.ctx.fillText("RELEASE to SHRINK & FLOAT", this.width / 2, this.height / 2 + 30);
        }
    }

    loop(timestamp) {
        if (!this.isRunning) return;
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;

        this.update(dt);
        this.draw();

        requestAnimationFrame(this.loop);
    }

    destroy() {
        this.isRunning = false;
    }
}
