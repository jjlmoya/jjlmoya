export interface Point {
    x: number;
    y: number;
}

export interface Vector {
    x: number;
    y: number;
}

export interface Particle {
    pos: Point;
    vel: Vector;
    acc: Vector;
    color: string;
    size: number;
    width: number;
    angle: number;
}

export class MagneticFingerMechanic {
    private particles: Particle[] = [];
    private magnet: { active: boolean; pos: Point; polarity: number } = {
        active: false,
        pos: { x: 0, y: 0 },
        polarity: 1,
    };
    private bounds: { width: number; height: number };
    private config: {
        particleCount: number;
        magnetStrength: number;
        friction: number;
        maxSpeed: number;
    };

    constructor(
        width: number,
        height: number,
        config = {
            particleCount: 400,
            magnetStrength: 1500,
            friction: 0.92,
            maxSpeed: 20,
        }
    ) {
        this.bounds = { width, height };
        this.config = config;
        this.initParticles();
    }

    private initParticles() {
        const colors = ["#888888", "#AAAAAA", "#CCCCCC", "#E0E0E0", "#FFFFFF", "#A1A1A1"];

        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                pos: {
                    x: Math.random() * this.bounds.width,
                    y: Math.random() * this.bounds.height,
                },
                vel: { x: 0, y: 0 },
                acc: { x: 0, y: 0 },
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                width: Math.random() * 1.5 + 0.5,
                angle: Math.random() * Math.PI * 2,
            });
        }
    }

    public setMagnet(active: boolean, x: number, y: number) {
        this.magnet.active = active;
        this.magnet.pos = { x, y };
    }

    public setPolarity(polarity: number) {
        this.magnet.polarity = polarity;
    }

    public getPolarity(): number {
        return this.magnet.polarity;
    }

    public updateBounds(width: number, height: number) {
        this.bounds = { width, height };
    }

    public update() {
        for (const p of this.particles) {
            p.acc.x = 0;
            p.acc.y = 0;

            if (this.magnet.active) {
                const dx = this.magnet.pos.x - p.pos.x;
                const dy = this.magnet.pos.y - p.pos.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                const targetAngle = Math.atan2(dy, dx);

                let angleDiff = targetAngle - p.angle;

                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

                p.angle += angleDiff * 0.2;

                const minDist = 30;

                if (dist > 5) {
                    const effectiveDist = Math.max(dist, minDist);

                    const forceMagnitude =
                        (this.config.magnetStrength * this.magnet.polarity) / (effectiveDist * 0.8);

                    p.acc.x += (dx / dist) * forceMagnitude;
                    p.acc.y += (dy / dist) * forceMagnitude;
                }
            } else {
                p.angle += (Math.random() - 0.5) * 0.05;
            }

            p.vel.x += p.acc.x;
            p.vel.y += p.acc.y;

            p.vel.x *= 0.85;
            p.vel.y *= 0.85;

            const speed = Math.sqrt(p.vel.x * p.vel.x + p.vel.y * p.vel.y);
            if (speed > this.config.maxSpeed) {
                p.vel.x = (p.vel.x / speed) * this.config.maxSpeed;
                p.vel.y = (p.vel.y / speed) * this.config.maxSpeed;
            }

            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;

            if (p.pos.x < 0) {
                p.pos.x = 0;
                p.vel.x *= -0.5;
            }
            if (p.pos.x > this.bounds.width) {
                p.pos.x = this.bounds.width;
                p.vel.x *= -0.5;
            }
            if (p.pos.y < 0) {
                p.pos.y = 0;
                p.vel.y *= -0.5;
            }
            if (p.pos.y > this.bounds.height) {
                p.pos.y = this.bounds.height;
                p.vel.y *= -0.5;
            }
        }
    }

    public getParticles(): Particle[] {
        return this.particles;
    }
}
