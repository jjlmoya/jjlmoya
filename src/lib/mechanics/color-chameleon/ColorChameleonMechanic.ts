export interface Entity {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    colorIndex: number;
    angle: number;
}

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    colorIndex: number;
    size: number;
}

export class ColorChameleonMechanic {
    public player!: { radius: number; colorIndex: number; angle: number };
    public enemies: Entity[] = [];
    public particles: Particle[] = [];
    public score: number = 0;
    public isGameOver: boolean = false;

    private width: number;
    private height: number;
    private spawnTimer: number = 0;
    private spawnInterval: number = 60;
    private difficultyMultiplier: number = 1;
    private colorCount: number;

    constructor(width: number, height: number, colorCount: number = 3) {
        this.width = width;
        this.height = height;
        this.colorCount = colorCount;
        this.reset();
    }

    public reset() {
        this.player = {
            radius: 30,
            colorIndex: 0,
            angle: 0,
        };
        this.enemies = [];
        this.particles = [];
        this.score = 0;
        this.isGameOver = false;
        this.spawnTimer = 0;
        this.spawnInterval = 60;
        this.difficultyMultiplier = 1;
    }

    public cyclePlayerColor() {
        this.player.colorIndex = (this.player.colorIndex + 1) % this.colorCount;
        this.player.radius = 35;
    }

    public update() {
        if (this.isGameOver) return;

        this.player.angle += 0.05;
        if (this.player.radius > 30) this.player.radius -= 0.5;

        this.spawnTimer++;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = 0;
            if (this.spawnInterval > 20) this.spawnInterval -= 0.5;
            this.difficultyMultiplier += 0.01;
        }

        const centerX = this.width / 2;
        const centerY = this.height / 2;

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.x += enemy.vx;
            enemy.y += enemy.vy;

            const dx = enemy.x - centerX;
            const dy = enemy.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.player.radius + enemy.radius) {
                if (enemy.colorIndex === this.player.colorIndex) {
                    this.score++;
                    this.createExplosion(enemy.x, enemy.y, enemy.colorIndex);
                    this.enemies.splice(i, 1);
                    this.player.radius = 38;
                } else {
                    this.isGameOver = true;
                    this.createExplosion(centerX, centerY, -1);
                }
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.05;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    private spawnEnemy() {
        const side = Math.floor(Math.random() * 4);
        let x = 0,
            y = 0;
        const offset = 50;

        switch (side) {
            case 0:
                x = Math.random() * this.width;
                y = -offset;
                break;
            case 1:
                x = this.width + offset;
                y = Math.random() * this.height;
                break;
            case 2:
                x = Math.random() * this.width;
                y = this.height + offset;
                break;
            case 3:
                x = -offset;
                y = Math.random() * this.height;
                break;
        }

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const angle = Math.atan2(centerY - y, centerX - x);
        const speed = 2 + this.difficultyMultiplier * 1.5;

        this.enemies.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 15,
            colorIndex: Math.floor(Math.random() * this.colorCount),
            angle: angle,
        });
    }

    private createExplosion(x: number, y: number, colorIndex: number) {
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                colorIndex: colorIndex,
                size: Math.random() * 3 + 1,
            });
        }
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
