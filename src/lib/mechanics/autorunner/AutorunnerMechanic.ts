export interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Player extends Box {
    vy: number;
    grounded: boolean;
    jumps: number;
    isDashing: boolean;
}

export interface Cloud extends Box {
    speedFactor: number;
}

export interface Coin extends Box {
    collected: boolean;
}

export class AutorunnerMechanic {
    private player: Player;
    private platforms: Box[] = [];
    private obstacles: Box[] = [];
    private clouds: Cloud[] = [];
    private coins: Coin[] = [];
    private speed: number = 400;
    private gravity: number = 1800;
    private jumpForce: number = -700;
    private score: number = 0;
    private state: "playing" | "gameover" = "playing";
    private width: number;
    private height: number;
    private maxJumps: number = 2;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.player = {
            x: 100,
            y: height - 300,
            width: 40,
            height: 40,
            vy: 0,
            grounded: false,
            jumps: 0,
            isDashing: false,
        };
        this.initLevel();
    }

    private initLevel() {
        this.platforms = [];
        this.obstacles = [];
        this.clouds = [];
        this.coins = [];

        this.platforms.push({
            x: 0,
            y: this.height - 100,
            width: this.width * 2,
            height: 200,
        });

        for (let i = 0; i < 5; i++) {
            this.spawnCloud(Math.random() * this.width);
        }
    }

    public jump() {
        if (this.state !== "playing") {
            this.reset();
            return;
        }

        if (this.player.grounded || this.player.jumps < this.maxJumps) {
            this.player.vy = this.jumpForce;
            this.player.grounded = false;
            this.player.jumps++;
            this.player.isDashing = false;
        }
    }

    public dash() {
        if (this.state === "playing" && !this.player.grounded) {
            this.player.vy = 1200;
            this.player.isDashing = true;
        }
    }

    public reset() {
        this.state = "playing";
        this.score = 0;
        this.speed = 400;
        this.player.y = this.height - 300;
        this.player.vy = 0;
        this.player.jumps = 0;
        this.initLevel();
    }

    public update(dt: number) {
        if (this.state !== "playing") return;

        this.score += this.speed * dt * 0.05;
        this.speed += dt * 10;

        this.player.vy += this.gravity * dt;
        this.player.y += this.player.vy * dt;

        this.player.grounded = false;
        for (const plat of this.platforms) {
            if (
                this.player.x < plat.x + plat.width &&
                this.player.x + this.player.width > plat.x &&
                this.player.y + this.player.height > plat.y &&
                this.player.y < plat.y + plat.height
            ) {
                const penetration = this.player.y + this.player.height - plat.y;
                const maxPenetration = Math.max(40, this.player.vy * dt + 20);

                if (this.player.vy > 0 && penetration > 0 && penetration <= maxPenetration) {
                    this.player.y = plat.y - this.player.height;
                    this.player.vy = 0;
                    this.player.grounded = true;
                    this.player.jumps = 0;
                    this.player.isDashing = false;
                }
            }
        }

        if (this.player.y > this.height) {
            this.state = "gameover";
        }

        const moveX = this.speed * dt;
        this.platforms.forEach((p) => (p.x -= moveX));
        this.obstacles.forEach((o) => (o.x -= moveX));
        this.coins.forEach((c) => (c.x -= moveX));

        this.clouds.forEach((c) => {
            c.x -= moveX * c.speedFactor;
            if (c.x + c.width < -100) {
                c.x = this.width + Math.random() * 200;
                c.y = Math.random() * (this.height / 2);
            }
        });

        this.platforms = this.platforms.filter((p) => p.x + p.width > -200);
        this.obstacles = this.obstacles.filter((o) => o.x + o.width > -200);
        this.coins = this.coins.filter((c) => c.x + c.width > -200 && !c.collected);

        const lastPlat = this.platforms[this.platforms.length - 1];
        if (lastPlat && lastPlat.x + lastPlat.width < this.width + 500) {
            this.spawnChunk();
        }

        const hitboxPadding = 8;
        for (const obs of this.obstacles) {
            if (
                this.player.x + hitboxPadding < obs.x + obs.width - hitboxPadding &&
                this.player.x + this.player.width - hitboxPadding > obs.x + hitboxPadding &&
                this.player.y + this.player.height - hitboxPadding > obs.y + hitboxPadding &&
                this.player.y < obs.y + obs.height - hitboxPadding
            ) {
                this.state = "gameover";
            }
        }

        for (const coin of this.coins) {
            if (
                !coin.collected &&
                this.player.x < coin.x + coin.width &&
                this.player.x + this.player.width > coin.x &&
                this.player.y < coin.y + coin.height &&
                this.player.y + this.player.height > coin.y
            ) {
                coin.collected = true;
                this.score += 100;
            }
        }
    }

    private spawnChunk() {
        const lastPlat = this.platforms[this.platforms.length - 1];
        const startX = lastPlat ? lastPlat.x + lastPlat.width : this.width;

        const gapSize = 100 + Math.random() * 150;
        const platWidth = 400 + Math.random() * 600;

        let y = this.height - 100;
        if (lastPlat) {
            const delta = (Math.random() - 0.5) * 150;

            const minY = this.height - 250;
            const maxY = this.height - 80;
            y = Math.max(minY, Math.min(maxY, lastPlat.y + delta));
        }

        this.platforms.push({
            x: startX + gapSize,
            y,
            width: platWidth,
            height: 400,
        });

        const numObstacles = Math.floor(platWidth / 300);

        const coinPattern = Math.random();

        for (let i = 0; i < numObstacles; i++) {
            const obsX = startX + gapSize + 200 + i * 300 + Math.random() * 100;

            if (Math.random() > 0.4) {
                this.obstacles.push({
                    x: obsX,
                    y: y - 40,
                    width: 30,
                    height: 40,
                });

                this.coins.push({ x: obsX, y: y - 120, width: 20, height: 20, collected: false });
                this.coins.push({
                    x: obsX - 30,
                    y: y - 100,
                    width: 20,
                    height: 20,
                    collected: false,
                });
                this.coins.push({
                    x: obsX + 30,
                    y: y - 100,
                    width: 20,
                    height: 20,
                    collected: false,
                });
            } else {
                if (coinPattern < 0.3) {
                    this.coins.push({
                        x: obsX,
                        y: y - 30,
                        width: 20,
                        height: 20,
                        collected: false,
                    });
                    this.coins.push({
                        x: obsX + 30,
                        y: y - 30,
                        width: 20,
                        height: 20,
                        collected: false,
                    });
                    this.coins.push({
                        x: obsX + 60,
                        y: y - 30,
                        width: 20,
                        height: 20,
                        collected: false,
                    });
                } else if (coinPattern < 0.6) {
                    this.coins.push({
                        x: obsX,
                        y: y - 30,
                        width: 20,
                        height: 20,
                        collected: false,
                    });
                    this.coins.push({
                        x: obsX + 30,
                        y: y - 60,
                        width: 20,
                        height: 20,
                        collected: false,
                    });
                    this.coins.push({
                        x: obsX + 60,
                        y: y - 30,
                        width: 20,
                        height: 20,
                        collected: false,
                    });
                } else {
                    this.coins.push({
                        x: obsX + 30,
                        y: y - 150,
                        width: 20,
                        height: 20,
                        collected: false,
                    });
                }
            }
        }
    }

    private spawnCloud(x: number) {
        this.clouds.push({
            x,
            y: Math.random() * (this.height / 2),
            width: 60 + Math.random() * 40,
            height: 30 + Math.random() * 20,
            speedFactor: 0.2 + Math.random() * 0.3,
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
            coins: this.coins,
            score: Math.floor(this.score),
            state: this.state,
            speed: this.speed,
        };
    }
}
