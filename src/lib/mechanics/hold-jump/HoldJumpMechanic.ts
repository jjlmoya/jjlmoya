export interface Vector {
    x: number;
    y: number;
}

export interface Player {
    pos: Vector;
    vel: Vector;
    radius: number;
    grounded: boolean;
    charging: boolean;
    charge: number; // 0 to 1
}

export interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class HoldJumpMechanic {
    private player!: Player;
    private platforms: Platform[] = [];
    private bounds: { width: number; height: number };
    private config: {
        gravity: number;
        friction: number;
        maxChargeTime: number;
        maxJumpForce: Vector;
    };

    constructor(width: number, height: number) {
        this.bounds = { width, height };
        this.config = {
            gravity: 0.6,
            friction: 0.9,
            maxChargeTime: 60, // frames
            maxJumpForce: { x: 15, y: -20 },
        };
        this.reset();
    }

    public reset() {
        this.player = {
            pos: { x: 100, y: this.bounds.height - 100 },
            vel: { x: 0, y: 0 },
            radius: 20,
            grounded: false,
            charging: false,
            charge: 0,
        };
        this.generatePlatforms();
    }

    private generatePlatforms() {
        this.platforms = [
            { x: 0, y: this.bounds.height - 20, width: this.bounds.width, height: 20 }, // Ground
            { x: 200, y: this.bounds.height - 150, width: 100, height: 20 },
            { x: 400, y: this.bounds.height - 300, width: 100, height: 20 },
            { x: 600, y: this.bounds.height - 450, width: 100, height: 20 },
            { x: 800, y: this.bounds.height - 300, width: 100, height: 20 },
        ];
    }

    public startCharge() {
        if (this.player.grounded) {
            this.player.charging = true;
            this.player.charge = 0;
        }
    }

    public releaseCharge() {
        if (this.player.charging && this.player.grounded) {
            const force = Math.max(0.2, this.player.charge);
            // Jump forward and up
            this.player.vel.x = this.config.maxJumpForce.x * force;
            this.player.vel.y = this.config.maxJumpForce.y * force;
            this.player.grounded = false;
            this.player.charging = false;
            this.player.charge = 0;
        }
    }

    public update() {
        // Charge
        if (this.player.charging) {
            this.player.charge = Math.min(1, this.player.charge + 0.02);
        }

        // Physics
        this.player.vel.y += this.config.gravity;
        this.player.vel.x *= this.config.friction;

        this.player.pos.x += this.player.vel.x;
        this.player.pos.y += this.player.vel.y;

        // Bounds
        if (this.player.pos.x < 0) {
            this.player.pos.x = 0;
            this.player.vel.x *= -0.5;
        } else if (this.player.pos.x > this.bounds.width) {
            this.player.pos.x = this.bounds.width;
            this.player.vel.x *= -0.5;
        }

        // Platform Collision
        this.player.grounded = false;
        for (const plat of this.platforms) {
            if (
                this.player.pos.x + this.player.radius > plat.x &&
                this.player.pos.x - this.player.radius < plat.x + plat.width &&
                this.player.pos.y + this.player.radius > plat.y &&
                this.player.pos.y - this.player.radius < plat.y + plat.height
            ) {
                // Simple collision resolution (only top for now for landing)
                if (this.player.vel.y > 0 && this.player.pos.y < plat.y + 10) {
                    this.player.pos.y = plat.y - this.player.radius;
                    this.player.vel.y = 0;
                    this.player.grounded = true;
                    // Stop horizontal if grounded (friction)
                    if (!this.player.charging) {
                        this.player.vel.x *= 0.8;
                    }
                }
            }
        }

        // Reset if fell too far
        if (this.player.pos.y > this.bounds.height + 100) {
            this.reset();
        }
    }

    public updateBounds(width: number, height: number) {
        this.bounds = { width, height };
        // Regenerate ground to match width
        if (this.platforms.length > 0) {
            this.platforms[0].width = width;
            this.platforms[0].y = height - 20;
        }
    }

    public getState() {
        return {
            player: this.player,
            platforms: this.platforms,
        };
    }
}
