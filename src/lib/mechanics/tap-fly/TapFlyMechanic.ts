export interface Vector {
    x: number;
    y: number;
}

export interface Player {
    pos: Vector;
    vel: Vector;
    radius: number;
    angle: number;
}

export interface Obstacle {
    x: number;
    width: number;
    gapY: number;
    gapHeight: number;
    passed: boolean;
}

export class TapFlyMechanic {
    private player!: Player;
    private obstacles: Obstacle[] = [];
    private bounds: { width: number; height: number };
    private config: {
        gravity: number;
        jumpForce: number;
        speed: number;
        obstacleSpawnRate: number;
        obstacleGap: number;
    };
    private state: "start" | "playing" | "gameover" = "start";
    private score: number = 0;
    private frames: number = 0;

    constructor(width: number, height: number) {
        this.bounds = { width, height };
        this.config = {
            gravity: 0.5,
            jumpForce: -8,
            speed: 3,
            obstacleSpawnRate: 180,
            obstacleGap: 200,
        };
        this.reset();
    }

    public reset() {
        this.player = {
            pos: { x: this.bounds.width * 0.2, y: this.bounds.height / 2 },
            vel: { x: 0, y: 0 },
            radius: 15,
            angle: 0,
        };
        this.obstacles = [];
        this.state = "start";
        this.score = 0;
        this.frames = 0;
    }

    public tap() {
        if (this.state === "start") {
            this.state = "playing";
            this.player.vel.y = this.config.jumpForce;
        } else if (this.state === "playing") {
            this.player.vel.y = this.config.jumpForce;
        } else if (this.state === "gameover") {
            this.reset();
        }
    }

    public update() {
        if (this.state !== "playing") return;

        this.player.vel.y += this.config.gravity;
        this.player.pos.y += this.player.vel.y;
        this.player.angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, this.player.vel.y * 0.1));

        if (
            this.player.pos.y + this.player.radius > this.bounds.height ||
            this.player.pos.y - this.player.radius < 0
        ) {
            this.state = "gameover";
        }

        this.frames++;
        if (this.frames % this.config.obstacleSpawnRate === 0) {
            const gapHeight = 150;
            const minGapY = 100;
            const maxGapY = this.bounds.height - 100 - gapHeight;
            const gapY = Math.random() * (maxGapY - minGapY) + minGapY;

            this.obstacles.push({
                x: this.bounds.width,
                width: 50,
                gapY: gapY,
                gapHeight: gapHeight,
                passed: false,
            });
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];
            obs.x -= this.config.speed;

            if (
                this.player.pos.x + this.player.radius > obs.x &&
                this.player.pos.x - this.player.radius < obs.x + obs.width
            ) {
                if (
                    this.player.pos.y - this.player.radius < obs.gapY ||
                    this.player.pos.y + this.player.radius > obs.gapY + obs.gapHeight
                ) {
                    this.state = "gameover";
                }
            }

            if (!obs.passed && this.player.pos.x > obs.x + obs.width) {
                this.score++;
                obs.passed = true;
            }

            if (obs.x + obs.width < 0) {
                this.obstacles.splice(i, 1);
            }
        }
    }

    public updateBounds(width: number, height: number) {
        this.bounds = { width, height };
    }

    public getState() {
        return {
            player: this.player,
            obstacles: this.obstacles,
            state: this.state,
            score: this.score,
        };
    }
}
