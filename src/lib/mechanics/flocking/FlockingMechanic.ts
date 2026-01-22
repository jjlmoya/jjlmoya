export interface Vector {
    x: number;
    y: number;
}

export interface Boid {
    pos: Vector;
    vel: Vector;
    acc: Vector;
    color: string;
}

export class FlockingMechanic {
    private boids: Boid[] = [];
    private bounds: { width: number; height: number };
    private config: {
        count: number;
        maxSpeed: number;
        maxForce: number;
        perceptionRadius: number;
        separationRadius: number;
        alignWeight: number;
        cohesionWeight: number;
        separationWeight: number;
    };

    constructor(width: number, height: number) {
        this.bounds = { width, height };
        this.config = {
            count: 150,
            maxSpeed: 4,
            maxForce: 0.1,
            perceptionRadius: 50,
            separationRadius: 25,
            alignWeight: 1.0,
            cohesionWeight: 1.0,
            separationWeight: 1.5,
        };
        this.initBoids();
    }

    private initBoids() {
        const colors = ["#00f2ff", "#00c3ff", "#0077ff", "#ffffff"];
        for (let i = 0; i < this.config.count; i++) {
            this.boids.push({
                pos: {
                    x: Math.random() * this.bounds.width,
                    y: Math.random() * this.bounds.height,
                },
                vel: {
                    x: (Math.random() - 0.5) * this.config.maxSpeed,
                    y: (Math.random() - 0.5) * this.config.maxSpeed,
                },
                acc: { x: 0, y: 0 },
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
    }

    public updateBounds(width: number, height: number) {
        this.bounds = { width, height };
    }

    public update(mouseX?: number, mouseY?: number) {
        for (const boid of this.boids) {
            boid.acc.x = 0;
            boid.acc.y = 0;

            const alignment = this.align(boid);
            const cohesion = this.cohesion(boid);
            const separation = this.separation(boid);

            boid.acc.x += alignment.x * this.config.alignWeight;
            boid.acc.y += alignment.y * this.config.alignWeight;
            boid.acc.x += cohesion.x * this.config.cohesionWeight;
            boid.acc.y += cohesion.y * this.config.cohesionWeight;
            boid.acc.x += separation.x * this.config.separationWeight;
            boid.acc.y += separation.y * this.config.separationWeight;

            if (mouseX !== undefined && mouseY !== undefined) {
                const d = this.dist(boid.pos.x, boid.pos.y, mouseX, mouseY);
                if (d < 100) {
                    const repulsion = {
                        x: boid.pos.x - mouseX,
                        y: boid.pos.y - mouseY,
                    };
                    const mag = Math.sqrt(repulsion.x * repulsion.x + repulsion.y * repulsion.y);
                    repulsion.x = (repulsion.x / mag) * this.config.maxForce * 5;
                    repulsion.y = (repulsion.y / mag) * this.config.maxForce * 5;
                    boid.acc.x += repulsion.x;
                    boid.acc.y += repulsion.y;
                }
            }

            boid.vel.x += boid.acc.x;
            boid.vel.y += boid.acc.y;

            const speed = Math.sqrt(boid.vel.x * boid.vel.x + boid.vel.y * boid.vel.y);
            if (speed > this.config.maxSpeed) {
                boid.vel.x = (boid.vel.x / speed) * this.config.maxSpeed;
                boid.vel.y = (boid.vel.y / speed) * this.config.maxSpeed;
            }

            boid.pos.x += boid.vel.x;
            boid.pos.y += boid.vel.y;

            if (boid.pos.x < 0) boid.pos.x = this.bounds.width;
            if (boid.pos.x > this.bounds.width) boid.pos.x = 0;
            if (boid.pos.y < 0) boid.pos.y = this.bounds.height;
            if (boid.pos.y > this.bounds.height) boid.pos.y = 0;
        }
    }

    private align(boid: Boid): Vector {
        const steering = { x: 0, y: 0 };
        let total = 0;

        for (const other of this.boids) {
            const d = this.dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y);
            if (other !== boid && d < this.config.perceptionRadius) {
                steering.x += other.vel.x;
                steering.y += other.vel.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;

            const speed = Math.sqrt(steering.x * steering.x + steering.y * steering.y);
            if (speed > 0) {
                steering.x = (steering.x / speed) * this.config.maxSpeed;
                steering.y = (steering.y / speed) * this.config.maxSpeed;
            }

            steering.x -= boid.vel.x;
            steering.y -= boid.vel.y;

            const force = Math.sqrt(steering.x * steering.x + steering.y * steering.y);
            if (force > this.config.maxForce) {
                steering.x = (steering.x / force) * this.config.maxForce;
                steering.y = (steering.y / force) * this.config.maxForce;
            }
        }

        return steering;
    }

    private cohesion(boid: Boid): Vector {
        const steering = { x: 0, y: 0 };
        let total = 0;

        for (const other of this.boids) {
            const d = this.dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y);
            if (other !== boid && d < this.config.perceptionRadius) {
                steering.x += other.pos.x;
                steering.y += other.pos.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;

            steering.x -= boid.pos.x;
            steering.y -= boid.pos.y;

            const dist = Math.sqrt(steering.x * steering.x + steering.y * steering.y);
            if (dist > 0) {
                steering.x = (steering.x / dist) * this.config.maxSpeed;
                steering.y = (steering.y / dist) * this.config.maxSpeed;
            }

            steering.x -= boid.vel.x;
            steering.y -= boid.vel.y;

            const force = Math.sqrt(steering.x * steering.x + steering.y * steering.y);
            if (force > this.config.maxForce) {
                steering.x = (steering.x / force) * this.config.maxForce;
                steering.y = (steering.y / force) * this.config.maxForce;
            }
        }

        return steering;
    }

    private separation(boid: Boid): Vector {
        const steering = { x: 0, y: 0 };
        let total = 0;

        for (const other of this.boids) {
            const d = this.dist(boid.pos.x, boid.pos.y, other.pos.x, other.pos.y);
            if (other !== boid && d < this.config.separationRadius) {
                const diff = {
                    x: boid.pos.x - other.pos.x,
                    y: boid.pos.y - other.pos.y,
                };

                if (d > 0) {
                    diff.x /= d;
                    diff.y /= d;
                }

                steering.x += diff.x;
                steering.y += diff.y;
                total++;
            }
        }

        if (total > 0) {
            steering.x /= total;
            steering.y /= total;

            const speed = Math.sqrt(steering.x * steering.x + steering.y * steering.y);
            if (speed > 0) {
                steering.x = (steering.x / speed) * this.config.maxSpeed;
                steering.y = (steering.y / speed) * this.config.maxSpeed;
            }

            steering.x -= boid.vel.x;
            steering.y -= boid.vel.y;

            const force = Math.sqrt(steering.x * steering.x + steering.y * steering.y);
            if (force > this.config.maxForce) {
                steering.x = (steering.x / force) * this.config.maxForce;
                steering.y = (steering.y / force) * this.config.maxForce;
            }
        }

        return steering;
    }

    private dist(x1: number, y1: number, x2: number, y2: number): number {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public getBoids(): Boid[] {
        return this.boids;
    }
}
