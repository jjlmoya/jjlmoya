export interface GravityFlipConfig {
    gravity: number;
    jumpForce: number;
    groundY: number;
    ceilingY: number;
}

export interface GravityFlipState {
    y: number;
    vy: number;
    gravityDir: number;
    isGrounded: boolean;
}

export class GravityFlipMechanic {
    private y: number;
    private vy: number;
    private gravityDir: number;
    private isGrounded: boolean;
    private config: GravityFlipConfig;

    constructor(startY: number, config: GravityFlipConfig) {
        this.y = startY;
        this.vy = 0;
        this.gravityDir = 1;
        this.isGrounded = false;
        this.config = config;
    }

    flip() {
        if (this.isGrounded) {
            this.gravityDir *= -1;
            this.isGrounded = false;
            this.vy = 0;
            return true;
        }
        return false;
    }

    update() {
        const gravityForce = this.config.gravity * this.gravityDir;
        this.vy += gravityForce;
        this.y += this.vy;

        if (this.y >= this.config.groundY) {
            this.y = this.config.groundY;
            this.vy = 0;
            if (this.gravityDir === 1) this.isGrounded = true;
        } else if (this.y <= this.config.ceilingY) {
            this.y = this.config.ceilingY;
            this.vy = 0;
            if (this.gravityDir === -1) this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
    }

    getState(): GravityFlipState {
        return {
            y: this.y,
            vy: this.vy,
            gravityDir: this.gravityDir,
            isGrounded: this.isGrounded,
        };
    }

    reset(startY: number) {
        this.y = startY;
        this.vy = 0;
        this.gravityDir = 1;
        this.isGrounded = false;
    }

    updateBounds(groundY: number, ceilingY: number) {
        this.config.groundY = groundY;
        this.config.ceilingY = ceilingY;
    }
}
