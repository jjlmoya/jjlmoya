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

    private jumpDirection: number = 0; // -1 left, 1 right, 0 center/random?

    constructor(width: number, height: number) {
        this.bounds = { width, height };
        this.config = {
            gravity: 0.6,
            friction: 0.9,
            maxChargeTime: 60, // frames
            maxJumpForce: { x: 10, y: -22 }, // Adjusted for verticality
        };
        this.reset();
    }

    public reset() {
        this.player = {
            pos: { x: this.bounds.width / 2, y: this.bounds.height - 40 },
            vel: { x: 0, y: 0 },
            radius: 15,
            grounded: false,
            charging: false,
            charge: 0,
        };
        this.generatePlatforms();
    }

    private generatePlatforms() {
        this.platforms = [];
        // Ground
        this.platforms.push({
            x: 0,
            y: this.bounds.height - 20,
            width: this.bounds.width,
            height: 20,
        });

        // Tower
        let currentY = this.bounds.height - 150;
        let side = 0; // 0 left, 1 right

        // Generate 50 platforms going up
        for (let i = 0; i < 50; i++) {
            const width = 100 + Math.random() * 50;
            const x =
                side === 0
                    ? 50 + Math.random() * 50
                    : this.bounds.width - width - 50 - Math.random() * 50;

            this.platforms.push({
                x: x,
                y: currentY,
                width: width,
                height: 20,
            });

            currentY -= 120 + Math.random() * 40; // Gap between platforms
            side = 1 - side; // Switch sides
        }
    }

    public startCharge(inputX?: number) {
        if (this.player.grounded) {
            this.player.charging = true;
            this.player.charge = 0;

            if (inputX !== undefined) {
                // Determine direction based on player position relative to input
                // If click is to the right of player, jump right.
                // If click is to the left of player, jump left.
                this.jumpDirection = inputX > this.player.pos.x ? 1 : -1;
            } else {
                this.jumpDirection = 0; // Vertical only? Or random? Let's default to vertical/slight random
            }
        }
    }

    public releaseCharge() {
        if (this.player.charging && this.player.grounded) {
            const force = Math.max(0.2, this.player.charge);

            // Jump
            const xForce =
                this.jumpDirection !== 0
                    ? this.jumpDirection * this.config.maxJumpForce.x
                    : (Math.random() - 0.5) * 5; // Slight random if no direction

            this.player.vel.x = xForce * force;
            this.player.vel.y = this.config.maxJumpForce.y * force;

            this.player.grounded = false;
            this.player.charging = false;
            this.player.charge = 0;
        }
    }

    public update() {
        // Charge
        if (this.player.charging) {
            this.player.charge = Math.min(1, this.player.charge + 0.03); // Faster charge
        }

        // Physics
        this.player.vel.y += this.config.gravity;
        this.player.vel.x *= this.config.friction;

        this.player.pos.x += this.player.vel.x;
        this.player.pos.y += this.player.vel.y;

        // Bounds (Horizontal bounce)
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
                if (this.player.vel.y > 0 && this.player.pos.y < plat.y + 10 + this.player.radius) {
                    // Check if we were above the platform in previous frame roughly
                    // Actually just snapping to top is fine for this simple mechanic
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

        // Reset if fell too far below the lowest platform or ground
        // Since we have a tower, "ground" is at bounds.height - 20.
        if (this.player.pos.y > this.bounds.height + 200) {
            this.reset();
        }
    }

    public updateBounds(width: number, height: number) {
        this.bounds = { width, height };
        // Regenerate ground to match width
        if (this.platforms.length > 0) {
            this.platforms[0].width = width;
            this.platforms[0].y = height - 20;
            // We might want to regenerate the whole tower on resize to fit width better
            this.generatePlatforms();
        }
    }

    public getState() {
        return {
            player: this.player,
            platforms: this.platforms,
        };
    }
}
