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
    prevPos: Point;
    color: string;
    size: number;
    life: number;
}

export interface Barrier {
    start: Point;
    end: Point;
    life: number;
    maxLife: number;
}

export class TheBarrierMechanic {
    public particles: Particle[] = [];
    public barriers: Barrier[] = [];

    private width: number;
    private height: number;
    private gravity: number = 0.2;
    private friction: number = 0.99;
    private restitution: number = 0.7;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public addBarrier(start: Point, end: Point) {
        this.barriers.push({
            start: { ...start },
            end: { ...end },
            life: 300,
            maxLife: 300,
        });
    }

    public spawnParticle(x: number, y: number) {
        const colors = ["#00FFFF", "#00CCFF", "#0099FF", "#FFFFFF"];
        this.particles.push({
            pos: { x, y },
            prevPos: { x, y },
            vel: {
                x: (Math.random() - 0.5) * 2,
                y: Math.random() * 2,
            },
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 2 + 2,
            life: 1.0,
        });
    }

    public update() {
        if (this.particles.length < 300) {
            this.spawnParticle(Math.random() * this.width, -10);
        }

        for (let i = this.barriers.length - 1; i >= 0; i--) {
            this.barriers[i].life--;
            if (this.barriers[i].life <= 0) {
                this.barriers.splice(i, 1);
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.prevPos.x = p.pos.x;
            p.prevPos.y = p.pos.y;

            p.vel.y += this.gravity;
            p.vel.x *= this.friction;
            p.vel.y *= this.friction;

            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;

            this.checkBarrierCollisions(p);

            if (p.pos.y > this.height) {
                p.pos.y = -10;
                p.pos.x = Math.random() * this.width;
                p.vel.y = Math.random() * 2;
                p.vel.x = (Math.random() - 0.5) * 2;
            }
            if (p.pos.x < 0) {
                p.pos.x = 0;
                p.vel.x *= -1;
            }
            if (p.pos.x > this.width) {
                p.pos.x = this.width;
                p.vel.x *= -1;
            }
        }
    }

    private checkBarrierCollisions(p: Particle) {
        for (const barrier of this.barriers) {
            const x1 = barrier.start.x;
            const y1 = barrier.start.y;
            const x2 = barrier.end.x;
            const y2 = barrier.end.y;

            const x3 = p.prevPos.x;
            const y3 = p.prevPos.y;
            const x4 = p.pos.x;
            const y4 = p.pos.y;

            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den === 0) continue;

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
                const dx = x2 - x1;
                const dy = y2 - y1;
                const normal = { x: -dy, y: dx };

                const len = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
                normal.x /= len;
                normal.y /= len;

                const dot = p.vel.x * normal.x + p.vel.y * normal.y;
                if (dot > 0) {
                    normal.x = -normal.x;
                    normal.y = -normal.y;
                }

                const vDotN = p.vel.x * normal.x + p.vel.y * normal.y;
                p.vel.x = (p.vel.x - 2 * vDotN * normal.x) * this.restitution;
                p.vel.y = (p.vel.y - 2 * vDotN * normal.y) * this.restitution;

                const ix = x1 + t * (x2 - x1);
                const iy = y1 + t * (y2 - y1);

                p.pos.x = ix + normal.x * (p.size + 1);
                p.pos.y = iy + normal.y * (p.size + 1);
            }
        }
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public clearBarriers() {
        this.barriers = [];
    }
}
