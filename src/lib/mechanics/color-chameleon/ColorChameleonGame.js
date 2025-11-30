export class ColorChameleonGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.colors = ["#FF0055", "#00FF55", "#0055FF"]; // Neon Red, Green, Blue
        this.colorNames = ["red", "green", "blue"];

        this.reset();

        this.loop = this.loop.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.initInput();
        this.animationId = requestAnimationFrame(this.loop);
    }

    reset() {
        this.player = {
            radius: 30,
            colorIndex: 0,
            angle: 0
        };

        this.enemies = [];
        this.particles = [];
        this.score = 0;
        this.isGameOver = false;
        this.spawnTimer = 0;
        this.spawnInterval = 60; // Frames
        this.difficultyMultiplier = 1;
    }

    initInput() {
        this.canvas.addEventListener("mousedown", this.handleClick);
        this.canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.handleClick(e);
        }, { passive: false });
    }

    handleClick(e) {
        if (this.isGameOver) {
            this.reset();
            return;
        }

        // Cycle color
        this.player.colorIndex = (this.player.colorIndex + 1) % this.colors.length;

        // Add a little "pulse" effect
        this.player.radius = 35;
    }

    spawnEnemy() {
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let x, y;
        const offset = 50;

        switch (side) {
            case 0: x = Math.random() * this.width; y = -offset; break;
            case 1: x = this.width + offset; y = Math.random() * this.height; break;
            case 2: x = Math.random() * this.width; y = this.height + offset; break;
            case 3: x = -offset; y = Math.random() * this.height; break;
        }

        const colorIndex = Math.floor(Math.random() * this.colors.length);

        // Calculate velocity towards center
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const angle = Math.atan2(centerY - y, centerX - x);
        const speed = 2 + (this.difficultyMultiplier * 1.5);

        this.enemies.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 15,
            colorIndex: colorIndex,
            angle: angle
        });
    }

    createExplosion(x, y, color) {
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                color: color,
                size: Math.random() * 3 + 1
            });
        }
    }

    update() {
        if (this.isGameOver) return;

        // Player animation
        this.player.angle += 0.05;
        if (this.player.radius > 30) this.player.radius -= 0.5;

        // Spawning
        this.spawnTimer++;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = 0;
            // Increase difficulty
            if (this.spawnInterval > 20) this.spawnInterval -= 0.5;
            this.difficultyMultiplier += 0.01;
        }

        // Update Enemies
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.x += enemy.vx;
            enemy.y += enemy.vy;

            // Collision detection
            const dx = enemy.x - centerX;
            const dy = enemy.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.player.radius + enemy.radius) {
                if (enemy.colorIndex === this.player.colorIndex) {
                    // Score!
                    this.score++;
                    this.createExplosion(enemy.x, enemy.y, this.colors[enemy.colorIndex]);
                    this.enemies.splice(i, 1);
                    // Pulse player
                    this.player.radius = 38;
                } else {
                    // Game Over
                    this.isGameOver = true;
                    this.createExplosion(centerX, centerY, "#FFFFFF");
                }
            }
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.05;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    draw() {
        // Clear background with trail effect
        this.ctx.fillStyle = "rgba(20, 20, 20, 0.3)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        const centerX = this.width / 2;
        const centerY = this.height / 2;

        // Draw Player
        if (!this.isGameOver) {
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(this.player.angle);

            const color = this.colors[this.player.colorIndex];
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = color;
            this.ctx.fillStyle = color;

            // Draw a hexagon or circle
            this.ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6;
                const r = this.player.radius;
                this.ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            this.ctx.closePath();
            this.ctx.fill();

            // Inner white core
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        }

        // Draw Enemies
        for (const enemy of this.enemies) {
            this.ctx.save();
            this.ctx.translate(enemy.x, enemy.y);
            this.ctx.rotate(enemy.angle);

            const color = this.colors[enemy.colorIndex];
            this.ctx.fillStyle = color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = color;

            // Draw shape based on color to help colorblindness
            this.ctx.beginPath();
            if (enemy.colorIndex === 0) { // Red - Square
                this.ctx.rect(-10, -10, 20, 20);
            } else if (enemy.colorIndex === 1) { // Green - Triangle
                this.ctx.moveTo(0, -12);
                this.ctx.lineTo(12, 10);
                this.ctx.lineTo(-12, 10);
            } else { // Blue - Circle
                this.ctx.arc(0, 0, 12, 0, Math.PI * 2);
            }
            this.ctx.fill();
            this.ctx.restore();
        }

        // Draw Particles
        for (const p of this.particles) {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        }

        // Draw Score
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "bold 40px monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.score, centerX, 50);

        if (this.isGameOver) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "bold 30px monospace";
            this.ctx.fillText("GAME OVER", centerX, centerY - 20);
            this.ctx.font = "20px monospace";
            this.ctx.fillText("Click to Restart", centerX, centerY + 20);
        }
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
    }

    loop() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(this.loop);
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.handleClick);
        this.canvas.removeEventListener("touchstart", this.handleClick);
        cancelAnimationFrame(this.animationId);
    }
}
