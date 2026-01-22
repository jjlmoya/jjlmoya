export class Player {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = 100;
        this.y = game.height - this.height - 100;

        this.vx = 0;
        this.vy = 0;
        this.weight = 1;
        this.friction = 0.92;
        this.acceleration = 1;
        this.maxSpeed = 10;
        this.jumpStrength = -20;

        this.onGround = false;
        this.canDoubleJump = true;
        this.isSliding = false;
        this.onWall = false;
        this.wallDir = 0;
        this.state = "IDLE";

        this.color = "#6366f1";
        this.squash = 1;
        this.stretch = 1;
    }

    update(input, dt = 1) {
        this.dt = dt;
        this.handleMovement(input, dt);
        this.applyPhysics(dt);
        this.checkCollisions(dt);
        this.handleJump(input);
        this.handleSlide(input);
        this.updateState();
        this.updateVisuals();
    }

    handleMovement(input, dt) {
        if (input.keys.left) {
            if (this.vx > 0 && this.onGround) this.createParticles(1, "#cbd5e1");
            this.vx -= this.acceleration * dt;
        } else if (input.keys.right) {
            if (this.vx < 0 && this.onGround) this.createParticles(1, "#cbd5e1");
            this.vx += this.acceleration * dt;
        } else {
            this.vx *= this.friction;
        }

        if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
        if (this.vx < -this.maxSpeed) this.vx = -this.maxSpeed;

        if (Math.abs(this.vx) < 0.1) this.vx = 0;
    }

    handleJump(input) {
        if (input.jumpPressed) {
            if (this.onGround) {
                this.jump();
            } else if (this.onWall) {
                this.wallJump();
            } else if (this.canDoubleJump) {
                this.doubleJump();
            }
            input.jumpPressed = false;
        }

        if (!input.keys.jump && this.vy < 0) {
            this.vy *= 0.5;
        }
    }

    jump() {
        this.vy = this.jumpStrength;
        this.onGround = false;
        this.squash = 0.6;
        this.stretch = 1.4;
        this.createParticles(10);
    }

    doubleJump() {
        this.vy = this.jumpStrength;
        this.canDoubleJump = false;
        this.squash = 0.7;
        this.stretch = 1.3;
        this.createParticles(5, "#a855f7");
    }

    wallJump() {
        this.vy = this.jumpStrength;
        this.vx = -this.wallDir * 10;
        this.onWall = false;
        this.canDoubleJump = true;
        this.createParticles(5, "#fbbf24");
    }

    handleSlide(input) {
        if (input.keys.slide && this.onGround && Math.abs(this.vx) > 1) {
            this.isSliding = true;
            this.height = 25;

            this.friction = 0.98;

            if (this.state !== "SLIDE") {
                this.vx *= 1.2;
                this.y += 25;
                this.createParticles(8, "#cbd5e1");
            }
        } else {
            if (this.isSliding) {
                this.y -= 25;
            }
            this.isSliding = false;
            this.height = 50;
            this.friction = 0.8;
        }
    }

    applyPhysics(dt) {
        this.vy += this.weight * dt;

        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    checkCollisions(dt) {
        this.onGround = false;
        this.onWall = false;
        this.wallDir = 0;

        const floorY = this.game.height - 50;
        if (this.y + this.height >= floorY) {
            this.y = floorY - this.height;
            this.vy = 0;
            this.onGround = true;
            this.canDoubleJump = true;
            this.handleLanding();
        }

        this.game.platforms.forEach((platform) => {
            if (this.checkRectCollision(this, platform)) {
                const prevY = this.y - this.vy * dt;
                const prevX = this.x - this.vx * dt;

                if (prevY + this.height <= platform.y && this.vy >= 0) {
                    this.y = platform.y - this.height;
                    this.vy = 0;
                    this.onGround = true;
                    this.canDoubleJump = true;
                    this.handleLanding();
                } else if (prevY >= platform.y + platform.height && this.vy < 0) {
                    this.y = platform.y + platform.height;
                    this.vy = 0;
                } else if (prevX + this.width <= platform.x && this.vx > 0) {
                    this.x = platform.x - this.width;
                    this.vx = 0;
                    this.onWall = true;
                    this.wallDir = 1;
                } else if (prevX >= platform.x + platform.width && this.vx < 0) {
                    this.x = platform.x + platform.width;
                    this.vx = 0;
                    this.onWall = true;
                    this.wallDir = -1;
                }
            }
        });

        if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
            this.onWall = true;
            this.wallDir = -1;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
            this.vx = 0;
            this.onWall = true;
            this.wallDir = 1;
        }

        if (this.onWall && !this.onGround && this.vy > 0) {
            this.vy *= 0.8;
        }
    }

    checkRectCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    handleLanding() {
        if (this.state === "FALL" || this.state === "JUMP") {
            this.squash = 1.3;
            this.stretch = 0.7;
            this.createParticles(5);
        }
    }

    updateState() {
        if (this.isSliding) {
            this.state = "SLIDE";
        } else if (this.onWall && !this.onGround) {
            this.state = "WALL_SLIDE";
        } else if (this.vy < 0) {
            this.state = "JUMP";
        } else if (this.vy > 0) {
            this.state = "FALL";
        } else if (Math.abs(this.vx) > 0.1) {
            this.state = "RUN";
        } else {
            this.state = "IDLE";
        }
    }

    updateVisuals() {
        this.squash += (1 - this.squash) * 0.1;
        this.stretch += (1 - this.stretch) * 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        const w = this.width * this.squash;
        const h = this.height * this.stretch;
        const x = this.x + (this.width - w) / 2;
        const y = this.y + (this.height - h);

        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = "white";
        const eyeOffset = this.vx >= 0 ? 5 : -5;

        if (this.onWall && !this.onGround) {
        }

        ctx.fillRect(x + w / 2 + eyeOffset, y + h / 4, 10, 10);
    }

    createParticles(count, color = "#ffffff") {
        this.game.createParticles(this.x + this.width / 2, this.y + this.height, count, color);
    }
}
