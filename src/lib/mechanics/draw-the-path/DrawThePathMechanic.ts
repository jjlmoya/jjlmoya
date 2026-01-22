export interface Point {
    x: number;
    y: number;
}

export interface Line {
    points: Point[];
    id: number;
    createdAt: number;
    opacity: number;
}

export interface Platform {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface Entity {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    type: "player" | "meteor" | "jumper";
    active: boolean;
    grounded: boolean;
}

export class DrawThePathMechanic {
    public player: Entity;
    public lines: Line[] = [];
    public currentLine: Line | null = null;
    public platforms: Platform[] = [];
    public threats: Entity[] = [];

    public isGameOver: boolean = false;
    public score: number = 0;
    public width: number;
    public height: number;

    private gravity = 0.8;
    private runSpeed = 8;
    private jumpForce = -15;
    private lineLifeTime = 3000;

    private lastPlatformX: number = 0;
    private nextThreatX: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.player = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            radius: 10,
            type: "player",
            active: false,
            grounded: false,
        };

        this.reset();
    }

    public reset() {
        this.isGameOver = false;
        this.score = 0;
        this.lines = [];
        this.currentLine = null;
        this.platforms = [];
        this.threats = [];

        this.lastPlatformX = 0;
        this.addPlatform(0, this.height - 150, 1000);

        this.player = {
            x: 100,
            y: this.height - 300,
            vx: this.runSpeed,
            vy: 0,
            radius: 15,
            type: "player",
            active: true,
            grounded: false,
        };

        this.nextThreatX = 1500;
    }

    public update() {
        if (this.isGameOver) return;

        const now = performance.now();

        for (let i = this.lines.length - 1; i >= 0; i--) {
            const line = this.lines[i];
            if (line === this.currentLine) continue;

            const age = now - line.createdAt;
            if (age > this.lineLifeTime) {
                this.lines.splice(i, 1);
            } else {
                line.opacity = 1 - age / this.lineLifeTime;
            }
        }

        this.generateWorld();

        this.updateEntity(this.player);

        for (let i = this.threats.length - 1; i >= 0; i--) {
            const t = this.threats[i];
            this.updateEntity(t);

            if (t.y > this.height + 200 || t.x < this.player.x - 1000) {
                this.threats.splice(i, 1);
                continue;
            }

            if (t.active && this.checkCollisionCircle(this.player, t)) {
                this.isGameOver = true;
            }
        }

        if (this.player.y > this.height + 200) {
            this.isGameOver = true;
        }

        this.score = Math.floor(this.player.x / 100);
    }

    private updateEntity(e: Entity) {
        if (e.type === "player") {
            e.vx = this.runSpeed;
        }
        e.vy += this.gravity;

        let nextX = e.x + e.vx;
        let nextY = e.y + e.vy;
        let grounded = false;

        for (const plat of this.platforms) {
            if (nextX > plat.x && nextX < plat.x + plat.w) {
                if (e.y + e.radius <= plat.y && nextY + e.radius >= plat.y) {
                    nextY = plat.y - e.radius;
                    e.vy = 0;
                    grounded = true;
                }
            }
        }

        for (const line of this.lines) {
            for (let i = 0; i < line.points.length - 1; i++) {
                const p1 = line.points[i];
                const p2 = line.points[i + 1];

                const minX = Math.min(p1.x, p2.x) - e.radius - 10;
                const maxX = Math.max(p1.x, p2.x) + e.radius + 10;
                const minY = Math.min(p1.y, p2.y) - e.radius - 10;
                const maxY = Math.max(p1.y, p2.y) + e.radius + 10;

                if (nextX < minX || nextX > maxX || nextY < minY || nextY > maxY) continue;

                const closest = this.getClosestPoint(p1, p2, { x: nextX, y: nextY });
                const dx = nextX - closest.x;
                const dy = nextY - closest.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < e.radius) {
                    if (e.type === "meteor") {
                    }

                    const overlap = e.radius - dist;

                    let nx = dx / dist;
                    let ny = dy / dist;

                    if (dist === 0) {
                        nx = 0;
                        ny = -1;
                    }

                    nextX += nx * overlap;
                    nextY += ny * overlap;

                    const vDotN = e.vx * nx + e.vy * ny;
                    if (vDotN < 0) {
                        e.vx -= vDotN * nx;
                        e.vy -= vDotN * ny;
                    }

                    if (ny < -0.5) {
                        grounded = true;
                    }
                }
            }
        }

        e.x = nextX;
        e.y = nextY;
        e.grounded = grounded;

        if (e.type === "jumper" && grounded) {
            e.vy = this.jumpForce;
        }
    }

    private generateWorld() {
        const buffer = 1500;
        if (this.lastPlatformX < this.player.x + buffer) {
            if (Math.random() > 0.3) {
                const gap = 100 + Math.random() * 200;
                const width = 400 + Math.random() * 600;
                const yChange = (Math.random() - 0.5) * 300;
                let y = this.height - 150 + yChange;
                y = Math.max(200, Math.min(this.height - 100, y));

                this.addPlatform(this.lastPlatformX + gap, y, width);
            } else {
                this.lastPlatformX += 400 + Math.random() * 300;
            }
        }

        if (
            this.platforms.length > 0 &&
            this.platforms[0].x + this.platforms[0].w < this.player.x - 1000
        ) {
            this.platforms.shift();
        }

        if (this.player.x > this.nextThreatX) {
            this.spawnThreat();
            this.nextThreatX += 800 + Math.random() * 1000;
        }
    }

    private addPlatform(x: number, y: number, w: number) {
        this.platforms.push({ x, y, w, h: 40 });
        this.lastPlatformX = x + w;
    }

    private spawnThreat() {
        const type = Math.random() > 0.5 ? "meteor" : "jumper";
        const x = this.player.x + 1200;

        if (type === "meteor") {
            this.threats.push({
                x: x,
                y: -100,
                vx: -3,
                vy: 5,
                radius: 25,
                type: "meteor",
                active: true,
                grounded: false,
            });
        } else {
            this.threats.push({
                x: x,
                y: 100,
                vx: -2,
                vy: 0,
                radius: 20,
                type: "jumper",
                active: true,
                grounded: false,
            });
        }
    }

    public startLine(x: number, y: number) {
        if (this.isGameOver) return;
        this.currentLine = {
            points: [{ x, y }],
            id: Date.now(),
            createdAt: performance.now(),
            opacity: 1,
        };
        this.lines.push(this.currentLine);
    }

    public addPoint(x: number, y: number) {
        if (!this.currentLine || this.isGameOver) return;
        const last = this.currentLine.points[this.currentLine.points.length - 1];
        const dist = Math.hypot(x - last.x, y - last.y);
        if (dist > 10) {
            this.currentLine.points.push({ x, y });
        }
    }

    public endLine() {
        this.currentLine = null;
    }

    public resize(w: number, h: number) {
        this.width = w;
        this.height = h;
    }

    private checkCollisionCircle(a: Entity, b: Entity): boolean {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy < (a.radius + b.radius) ** 2;
    }

    private getClosestPoint(p1: Point, p2: Point, p: Point): Point {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const t = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy);
        const clampedT = Math.max(0, Math.min(1, t));
        return {
            x: p1.x + clampedT * dx,
            y: p1.y + clampedT * dy,
        };
    }
}
