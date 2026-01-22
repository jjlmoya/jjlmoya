export interface Vector {
    x: number;
    y: number;
}

export interface Particle {
    pos: Vector;
    vel: Vector;
    radius: number;
    color: string;
    mass: number;
    visualRotation: number;
    visualRotationSpeed: number;
}

export class ViewportCollisionMechanic {
    private particles: Particle[] = [];
    private bounds: { width: number; height: number };
    private prevBounds: { width: number; height: number };

    private readonly FRICTION = 0.99;
    private readonly BOUNCE_DAMPING = 0.8;
    private readonly WALL_PUSH_FORCE = 1.8;

    constructor(width: number, height: number, particleCount: number = 20) {
        this.bounds = { width, height };
        this.prevBounds = { width, height };
        this.initParticles(particleCount);
    }

    private initParticles(count: number) {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#33FFF0"];

        for (let i = 0; i < count; i++) {
            this.particles.push({
                pos: {
                    x: this.bounds.width * 0.2 + Math.random() * this.bounds.width * 0.6,
                    y: this.bounds.height * 0.2 + Math.random() * this.bounds.height * 0.6,
                },
                vel: {
                    x: (Math.random() - 0.5) * 10,
                    y: (Math.random() - 0.5) * 10,
                },
                radius: 15 + Math.random() * 25,
                color: colors[Math.floor(Math.random() * colors.length)],
                mass: 1,
                visualRotation: Math.random() * Math.PI * 2,
                visualRotationSpeed: (Math.random() - 0.5) * 0.1,
            });
        }
    }

    public updateBounds(width: number, height: number) {
        this.prevBounds = { ...this.bounds };
        this.bounds = { width, height };
    }

    public update() {
        const wallVelX = this.bounds.width - this.prevBounds.width;
        const wallVelY = this.bounds.height - this.prevBounds.height;

        for (const p of this.particles) {
            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;
            p.vel.x *= this.FRICTION;
            p.vel.y *= this.FRICTION;
            p.visualRotation += p.visualRotationSpeed;

            if (p.pos.x + p.radius > this.bounds.width) {
                p.pos.x = this.bounds.width - p.radius;

                if (p.vel.x > 0) {
                    p.vel.x *= -this.BOUNCE_DAMPING;
                }

                if (wallVelX < 0) {
                    p.vel.x += wallVelX * this.WALL_PUSH_FORCE;
                    p.vel.y += (Math.random() - 0.5) * Math.abs(wallVelX) * 2;
                }
            }

            if (p.pos.y + p.radius > this.bounds.height) {
                p.pos.y = this.bounds.height - p.radius;
                if (p.vel.y > 0) {
                    p.vel.y *= -this.BOUNCE_DAMPING;
                }
                if (wallVelY < 0) {
                    p.vel.y += wallVelY * this.WALL_PUSH_FORCE;
                    p.vel.x += (Math.random() - 0.5) * Math.abs(wallVelY) * 2;
                }
            }

            if (p.pos.x - p.radius < 0) {
                p.pos.x = p.radius;
                if (p.vel.x < 0) {
                    p.vel.x *= -this.BOUNCE_DAMPING;
                }
            }

            if (p.pos.y - p.radius < 0) {
                p.pos.y = p.radius;
                if (p.vel.y < 0) {
                    p.vel.y *= -this.BOUNCE_DAMPING;
                }
            }

            for (const other of this.particles) {
                if (p === other) continue;

                const dx = other.pos.x - p.pos.x;
                const dy = other.pos.y - p.pos.y;
                const distSq = dx * dx + dy * dy;
                const minDist = p.radius + other.radius;

                if (distSq < minDist * minDist && distSq > 0) {
                    const dist = Math.sqrt(distSq);
                    const overlap = minDist - dist;
                    const nx = dx / dist;
                    const ny = dy / dist;

                    const separateFactor = 0.5;
                    p.pos.x -= nx * overlap * separateFactor;
                    p.pos.y -= ny * overlap * separateFactor;
                    other.pos.x += nx * overlap * separateFactor;
                    other.pos.y += ny * overlap * separateFactor;

                    const relVelX = other.vel.x - p.vel.x;
                    const relVelY = other.vel.y - p.vel.y;
                    const velAlongNormal = relVelX * nx + relVelY * ny;

                    if (velAlongNormal < 0) {
                        const j = -(1 + this.BOUNCE_DAMPING) * velAlongNormal;
                        const impulse = j / 2;
                        p.vel.x -= impulse * nx;
                        p.vel.y -= impulse * ny;
                        other.vel.x += impulse * nx;
                        other.vel.y += impulse * ny;
                    }
                }
            }
        }
        this.prevBounds = { ...this.bounds };
    }

    public getParticles() {
        return this.particles;
    }
}
