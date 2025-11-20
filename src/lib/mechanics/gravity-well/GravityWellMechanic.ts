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
    mass: number;
}

export interface GravityWell {
    pos: Point;
    mass: number;
    radius: number;
    lifetime: number;
    maxLifetime: number;
}

export class GravityWellMechanic {
    private particles: Particle[] = [];
    private wells: GravityWell[] = [];
    private bounds: { width: number; height: number };
    private config: {
        particleCount: number;
        gravityConstant: number;
        friction: number;
        maxSpeed: number;
    };

    constructor(
        width: number,
        height: number,
        config = {
            particleCount: 200,
            gravityConstant: 0.5,
            friction: 0.99,
            maxSpeed: 12,
        }
    ) {
        this.bounds = { width, height };
        this.config = config;
        this.initParticles();
    }

    private initParticles() {
        const colors = ["#FF3366", "#33CCFF", "#FFCC33", "#33FF99", "#CC33FF"];

        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                pos: {
                    x: Math.random() * this.bounds.width,
                    y: Math.random() * this.bounds.height,
                },
                vel: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                },
                acc: { x: 0, y: 0 },
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 3 + 1,
                mass: Math.random() * 2 + 1,
            });
        }
    }

    public addWell(x: number, y: number, mass: number = 1000, lifetime: number = 300) {
        this.wells.push({
            pos: { x, y },
            mass: mass,
            radius: Math.sqrt(mass) * 0.5,
            lifetime: lifetime,
            maxLifetime: lifetime,
        });
    }

    public removeWell(index: number) {
        if (index >= 0 && index < this.wells.length) {
            this.wells.splice(index, 1);
        }
    }

    public clearWells() {
        this.wells = [];
    }

    public updateBounds(width: number, height: number) {
        this.bounds = { width, height };
    }

    public update() {
        for (let i = this.wells.length - 1; i >= 0; i--) {
            this.wells[i].lifetime--;
            if (this.wells[i].lifetime <= 0) {
                this.wells.splice(i, 1);
            }
        }

        for (const p of this.particles) {
            p.acc.x = 0;
            p.acc.y = 0;

            for (const well of this.wells) {
                const dx = well.pos.x - p.pos.x;
                const dy = well.pos.y - p.pos.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                if (dist > 5) {
                    const force = (this.config.gravityConstant * well.mass) / distSq;
                    p.acc.x += (dx / dist) * force;
                    p.acc.y += (dy / dist) * force;
                }
            }

            p.vel.x += p.acc.x;
            p.vel.y += p.acc.y;

            p.vel.x *= this.config.friction;
            p.vel.y *= this.config.friction;

            const speed = Math.sqrt(p.vel.x * p.vel.x + p.vel.y * p.vel.y);
            if (speed > this.config.maxSpeed) {
                p.vel.x = (p.vel.x / speed) * this.config.maxSpeed;
                p.vel.y = (p.vel.y / speed) * this.config.maxSpeed;
            }

            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;

            if (p.pos.x < 0) p.pos.x = this.bounds.width;
            if (p.pos.x > this.bounds.width) p.pos.x = 0;
            if (p.pos.y < 0) p.pos.y = this.bounds.height;
            if (p.pos.y > this.bounds.height) p.pos.y = 0;
        }
    }

    public getParticles(): Particle[] {
        return this.particles;
    }

    public getWells(): GravityWell[] {
        return this.wells;
    }
}
