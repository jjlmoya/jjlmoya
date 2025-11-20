export interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Player extends Box {
    vy: number;
    grounded: boolean;
}

export interface Cloud extends Box {
    speedFactor: number;
}

export class AutorunnerMechanic {
    private player: Player;
    private platforms: Box[] = [];
    private obstacles: Box[] = [];
    private clouds: Cloud[] = [];
    private speed: number = 300;
    private gravity: number = 1500;
    private jumpForce: number = -600;
    private score: number = 0;
    private state: "playing" | "gameover" = "playing";
    private width: number;
    private height: number;
    private spawnTimer: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.player = {
            x: 100,
            y: height - 300, // Adjusted for higher ground
            width: 40,
            height: 40,
            vy: 0,
            grounded: false,
        };
        this.initLevel();
    }

    private initLevel() {
        this.platforms = [];
        this.obstacles = [];
        this.clouds = [];

        // Initial ground
        this.platforms.push({
            x: 0,
            y: this.height - 200, // Higher ground
            width: this.width * 2,
            height: 200, // Extend to bottom
        });

        // Initial clouds
        for (let i = 0; i < 5; i++) {
            this.spawnCloud(Math.random() * this.width);
        }
    }

    public jump() {
        if (this.state !== "playing") {
            this.reset();
            return;
        }
        if (this.player.grounded) {
            this.player.vy = this.jumpForce;
            this.player.grounded = false;
        }
    }

    public reset() {
        this.state = "playing";
        this.score = 0;
        this.speed = 300;
        this.player.y = this.height - 300;
        this.player.vy = 0;
        this.initLevel();
    }

    public update(dt: number) {
        if (this.state !== "playing") return;

        this.score += this.speed * dt * 0.1;
        this.speed += dt * 5; // Increase speed over time

        // Player Physics
        this.player.vy += this.gravity * dt;
        this.player.y += this.player.vy * dt;

        // Ground Collision
        this.player.grounded = false;
        for (const plat of this.platforms) {
            // AABB Check
            if (
                this.player.x < plat.x + plat.width &&
                this.player.x + this.player.width > plat.x &&
                this.player.y + this.player.height > plat.y &&
                this.player.y < plat.y + plat.height
            ) {
                // Landing Logic
                // We check if the player is falling and if their feet are within a reasonable distance of the platform top.
                // This "maxPenetration" accounts for high velocity (tunneling) and frame time variations.
                const penetration = (this.player.y + this.player.height) - plat.y;
                const maxPenetration = Math.max(40, this.player.vy * dt + 10);

                if (this.player.vy > 0 && penetration > 0 && penetration <= maxPenetration) {
                    this.player.y = plat.y - this.player.height;
                    this.player.vy = 0;
                    this.player.grounded = true;
                }
            }
        }

        // Fall death
        if (this.player.y > this.height) {
            this.state = "gameover";
        }

        // Move World
        const moveX = this.speed * dt;
        this.platforms.forEach((p) => (p.x -= moveX));
        this.obstacles.forEach((o) => (o.x -= moveX));

        // Move Clouds (Parallax)
        this.clouds.forEach(c => {
            c.x -= moveX * c.speedFactor;
            if (c.x + c.width < -100) {
                c.x = this.width + Math.random() * 200;
                c.y = Math.random() * (this.height / 2);
            }
        });

        // Cleanup offscreen (buffer of 200px)
        this.platforms = this.platforms.filter((p) => p.x + p.width > -200);
        this.obstacles = this.obstacles.filter((o) => o.x + o.width > -200);

        // Spawning
        // Ensure we always have platforms ahead
        const lastPlat = this.platforms[this.platforms.length - 1];
        if (lastPlat && lastPlat.x + lastPlat.width < this.width + 500) {
            this.spawnChunk();
        }

        // Obstacle Collision
        for (const obs of this.obstacles) {
            // Shrink hitbox slightly for fairness
            const hitboxPadding = 5;
            if (
                this.player.x + hitboxPadding < obs.x + obs.width - hitboxPadding &&
                this.player.x + this.player.width - hitboxPadding > obs.x + hitboxPadding &&
                this.player.y + this.player.height - hitboxPadding > obs.y + hitboxPadding &&
                this.player.y < obs.y + obs.height - hitboxPadding
            ) {
                this.state = "gameover";
            }
        }
    }

    private spawnChunk() {
        const lastPlat = this.platforms[this.platforms.length - 1];
        // Start spawning well off-screen
        const startX = lastPlat ? lastPlat.x + lastPlat.width : this.width;

        // Gap or Platform
        if (Math.random() > 0.3) {
            // Platform
            const width = 400 + Math.random() * 400; // Longer platforms
            const y = this.height - 200 - (Math.random() > 0.7 ? 80 : 0); // Higher base ground

            this.platforms.push({
                x: startX + (Math.random() * 150), // Small gap
                y,
                width,
                height: 400, // Extend well below screen
            });

            // Obstacle on platform
            if (Math.random() > 0.5) {
                this.obstacles.push({
                    x: startX + width / 2,
                    y: y - 40,
                    width: 30,
                    height: 40,
                });
            }
        } else {
            // Big Gap
            this.platforms.push({
                x: startX + 200 + Math.random() * 100,
                y: this.height - 200,
                width: 400,
                height: 400,
            });
        }
    }

    private spawnCloud(x: number) {
        this.clouds.push({
            x,
            y: Math.random() * (this.height / 2),
            width: 60 + Math.random() * 40,
            height: 30 + Math.random() * 20,
            speedFactor: 0.2 + Math.random() * 0.3
        });
    }

    public updateBounds(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public getState() {
        return {
            player: this.player,
            platforms: this.platforms,
            obstacles: this.obstacles,
            clouds: this.clouds,
            score: Math.floor(this.score),
            state: this.state,
            speed: this.speed
        };
    }
}
