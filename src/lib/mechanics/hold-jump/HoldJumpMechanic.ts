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
    charge: number;
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

    private jumpDirection: number = 0;

    constructor(width: number, height: number) {
        this.bounds = { width, height };
        this.config = {
            gravity: 0.6,
            friction: 0.9,
            maxChargeTime: 60,
            maxJumpForce: { x: 10, y: -22 },
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

        this.platforms.push({
            x: 0,
            y: this.bounds.height - 20,
            width: this.bounds.width,
            height: 20,
        });

        let currentY = this.bounds.height - 150;
        let side = 0;

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

            currentY -= 120 + Math.random() * 40;
            side = 1 - side;
        }
    }

    public startCharge(inputX?: number) {
        if (this.player.grounded) {
            this.player.charging = true;
            this.player.charge = 0;

            if (inputX !== undefined) {
                this.jumpDirection = inputX > this.player.pos.x ? 1 : -1;
            } else {
                this.jumpDirection = 0;
            }
        }
    }

    public releaseCharge() {
        if (this.player.charging && this.player.grounded) {
            const force = Math.max(0.2, this.player.charge);

            const xForce =
                this.jumpDirection !== 0
                    ? this.jumpDirection * this.config.maxJumpForce.x
                    : (Math.random() - 0.5) * 5;

            this.player.vel.x = xForce * force;
            this.player.vel.y = this.config.maxJumpForce.y * force;

            this.player.grounded = false;
            this.player.charging = false;
            this.player.charge = 0;
        }
    }

    public update() {
        if (this.player.charging) {
            this.player.charge = Math.min(1, this.player.charge + 0.03);
        }

        this.player.vel.y += this.config.gravity;
        this.player.vel.x *= this.config.friction;

        this.player.pos.x += this.player.vel.x;
        this.player.pos.y += this.player.vel.y;

        if (this.player.pos.x < 0) {
            this.player.pos.x = 0;
            this.player.vel.x *= -0.5;
        } else if (this.player.pos.x > this.bounds.width) {
            this.player.pos.x = this.bounds.width;
            this.player.vel.x *= -0.5;
        }

        this.player.grounded = false;
        for (const plat of this.platforms) {
            if (
                this.player.pos.x + this.player.radius > plat.x &&
                this.player.pos.x - this.player.radius < plat.x + plat.width &&
                this.player.pos.y + this.player.radius > plat.y &&
                this.player.pos.y - this.player.radius < plat.y + plat.height
            ) {
                if (this.player.vel.y > 0 && this.player.pos.y < plat.y + 10 + this.player.radius) {
                    this.player.pos.y = plat.y - this.player.radius;
                    this.player.vel.y = 0;
                    this.player.grounded = true;

                    if (!this.player.charging) {
                        this.player.vel.x *= 0.8;
                    }
                }
            }
        }

        if (this.player.pos.y > this.bounds.height + 200) {
            this.reset();
        }
    }

    public updateBounds(width: number, height: number) {
        this.bounds = { width, height };

        if (this.platforms.length > 0) {
            this.platforms[0].width = width;
            this.platforms[0].y = height - 20;

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
