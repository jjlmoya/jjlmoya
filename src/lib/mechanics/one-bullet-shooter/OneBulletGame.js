export class OneBulletGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.lastTime = 0;
        this.accumulator = 0;
        this.step = 1 / 60;

        this.player = {
            x: this.width / 2,
            y: this.height / 2,
            radius: 15,
            speed: 300,
            color: "#4ade80",
            angle: 0,
            hasBullet: true,
        };

        this.bullet = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            radius: 5,
            speed: 800,
            state: "ready",
            color: "#facc15",
        };

        this.enemies = [];
        this.particles = [];
        this.enemySpawnTimer = 0;
        this.enemySpawnInterval = 2;

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            ArrowUp: false,
            ArrowLeft: false,
            ArrowDown: false,
            ArrowRight: false,
        };

        this.mouse = { x: 0, y: 0 };

        this.score = 0;
        this.gameOver = false;

        this.initInput();
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    initInput() {
        window.addEventListener("keydown", (e) => {
            if (this.keys.hasOwnProperty(e.key)) this.keys[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            if (this.keys.hasOwnProperty(e.key)) this.keys[e.key] = false;
        });

        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener("mousedown", () => {
            this.shoot();
        });

        this.canvas.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                const rect = this.canvas.getBoundingClientRect();
                const touch = e.touches[0];
                this.mouse.x = touch.clientX - rect.left;
                this.mouse.y = touch.clientY - rect.top;
                this.shoot();
            },
            { passive: false }
        );
    }

    shoot() {
        if (this.gameOver) {
            this.reset();
            return;
        }

        if (this.player.hasBullet) {
            this.player.hasBullet = false;
            this.bullet.state = "fired";
            this.bullet.x = this.player.x;
            this.bullet.y = this.player.y;

            const angle = Math.atan2(this.mouse.y - this.player.y, this.mouse.x - this.player.x);

            this.bullet.vx = Math.cos(angle) * this.bullet.speed;
            this.bullet.vy = Math.sin(angle) * this.bullet.speed;

            this.createParticles(this.player.x, this.player.y, 5, "#4ade80");
        }
    }

    reset() {
        this.player.x = this.width / 2;
        this.player.y = this.height / 2;
        this.player.hasBullet = true;
        this.bullet.state = "ready";
        this.enemies = [];
        this.particles = [];
        this.score = 0;
        this.gameOver = false;
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    update(dt) {
        if (this.gameOver) return;

        let dx = 0;
        let dy = 0;

        if (this.keys.w || this.keys.ArrowUp) dy -= 1;
        if (this.keys.s || this.keys.ArrowDown) dy += 1;
        if (this.keys.a || this.keys.ArrowLeft) dx -= 1;
        if (this.keys.d || this.keys.ArrowRight) dx += 1;

        if (dx !== 0 || dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;

            this.player.x += dx * this.player.speed * dt;
            this.player.y += dy * this.player.speed * dt;

            this.player.x = Math.max(
                this.player.radius,
                Math.min(this.width - this.player.radius, this.player.x)
            );
            this.player.y = Math.max(
                this.player.radius,
                Math.min(this.height - this.player.radius, this.player.y)
            );
        }

        this.player.angle = Math.atan2(this.mouse.y - this.player.y, this.mouse.x - this.player.x);

        if (this.bullet.state === "fired") {
            this.bullet.x += this.bullet.vx * dt;
            this.bullet.y += this.bullet.vy * dt;

            if (
                this.bullet.x < this.bullet.radius ||
                this.bullet.x > this.width - this.bullet.radius ||
                this.bullet.y < this.bullet.radius ||
                this.bullet.y > this.height - this.bullet.radius
            ) {
                this.bullet.state = "stuck";
                this.bullet.vx = 0;
                this.bullet.vy = 0;

                this.bullet.x = Math.max(
                    this.bullet.radius,
                    Math.min(this.width - this.bullet.radius, this.bullet.x)
                );
                this.bullet.y = Math.max(
                    this.bullet.radius,
                    Math.min(this.height - this.bullet.radius, this.bullet.y)
                );

                this.createParticles(this.bullet.x, this.bullet.y, 10, "#facc15");
            }
        } else if (this.bullet.state === "stuck") {
            const dist = Math.hypot(this.player.x - this.bullet.x, this.player.y - this.bullet.y);
            if (dist < this.player.radius + this.bullet.radius + 10) {
                this.player.hasBullet = true;
                this.bullet.state = "ready";
                this.createParticles(this.player.x, this.player.y, 10, "#4ade80");
            }
        }

        this.enemySpawnTimer += dt;
        if (this.enemySpawnTimer > this.enemySpawnInterval) {
            this.enemySpawnTimer = 0;
            this.spawnEnemy();

            if (this.enemySpawnInterval > 0.5) this.enemySpawnInterval -= 0.05;
        }

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];

            const angle = Math.atan2(this.player.y - enemy.y, this.player.x - enemy.x);
            enemy.x += Math.cos(angle) * enemy.speed * dt;
            enemy.y += Math.sin(angle) * enemy.speed * dt;

            const distPlayer = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);
            if (distPlayer < this.player.radius + enemy.radius) {
                this.gameOver = true;
                this.createParticles(this.player.x, this.player.y, 50, "#ef4444");
            }

            if (this.bullet.state === "fired") {
                const distBullet = Math.hypot(this.bullet.x - enemy.x, this.bullet.y - enemy.y);
                if (distBullet < this.bullet.radius + enemy.radius) {
                    this.enemies.splice(i, 1);
                    this.bullet.state = "stuck";
                    this.bullet.vx = 0;
                    this.bullet.vy = 0;
                    this.score++;
                    this.createParticles(enemy.x, enemy.y, 20, "#ef4444");
                    continue;
                }
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    spawnEnemy() {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        const buffer = 30;

        switch (side) {
            case 0:
                x = Math.random() * this.width;
                y = -buffer;
                break;
            case 1:
                x = this.width + buffer;
                y = Math.random() * this.height;
                break;
            case 2:
                x = Math.random() * this.width;
                y = this.height + buffer;
                break;
            case 3:
                x = -buffer;
                y = Math.random() * this.height;
                break;
        }

        this.enemies.push({
            x,
            y,
            radius: 15,
            speed: 100 + Math.random() * 50 + this.score * 5,
            color: "#ef4444",
        });
    }

    createParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.5 + Math.random() * 0.5,
                color: color,
                size: Math.random() * 3 + 1,
            });
        }
    }

    draw() {
        this.ctx.fillStyle = "#1e1e2e";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.particles.forEach((p) => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;

        if (!this.player.hasBullet) {
            this.ctx.fillStyle = this.bullet.color;
            this.ctx.beginPath();
            this.ctx.arc(this.bullet.x, this.bullet.y, this.bullet.radius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = this.bullet.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }

        if (!this.gameOver) {
            this.ctx.save();
            this.ctx.translate(this.player.x, this.player.y);
            this.ctx.rotate(this.player.angle);

            this.ctx.fillStyle = this.player.color;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, this.player.radius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.fillStyle = "#ffffff";
            this.ctx.fillRect(0, -2, this.player.radius + 5, 4);

            if (this.player.hasBullet) {
                this.ctx.fillStyle = this.bullet.color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        this.enemies.forEach((enemy) => {
            this.ctx.fillStyle = enemy.color;
            this.ctx.beginPath();
            this.ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "20px Inter, sans-serif";
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);

        if (this.gameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "40px Inter, sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2 - 20);

            this.ctx.font = "20px Inter, sans-serif";
            this.ctx.fillText("Click to Restart", this.width / 2, this.height / 2 + 30);
            this.ctx.textAlign = "left";
        }
    }

    loop(timestamp) {
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        if (dt < 0.1) {
            this.update(dt);
        }

        this.draw();
        requestAnimationFrame(this.loop);
    }

    destroy() {}
}
