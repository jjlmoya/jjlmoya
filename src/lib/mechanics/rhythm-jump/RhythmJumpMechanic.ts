export interface Player {
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    isGrounded: boolean;
    state: "running" | "jumping" | "falling" | "dead";
    colorId: 0 | 1;
}

export interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
    colorId: 0 | 1;
}

export class RhythmJumpMechanic {
    public player!: Player;
    public platforms: Platform[] = [];
    public score: number = 0;
    public distance: number = 0;

    private gravity: number = 0.6;
    private jumpForce: number = -12;
    private speed: number = 7;
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.reset();
    }

    public reset() {
        this.player = {
            x: 100,
            y: this.height / 2,
            vx: this.speed,
            vy: 0,
            width: 30,
            height: 30,
            isGrounded: false,
            state: "running",
            colorId: 0,
        };
        this.platforms = [];
        this.score = 0;
        this.distance = 0;

        this.platforms.push({
            x: 0,
            y: this.height - 100,
            width: 1000,
            height: 50,
            colorId: 0,
        });

        this.generatePlatforms(1000);
    }

    public toggleColor() {
        if (this.player.state === "dead") return;
        this.player.colorId = this.player.colorId === 0 ? 1 : 0;
    }

    public update(timeScale: number = 1) {
        if (this.player.state === "dead") return;

        this.player.vy += this.gravity * timeScale;
        this.player.y += this.player.vy * timeScale;
        this.player.x += this.player.vx * timeScale;

        this.player.isGrounded = false;
        for (const p of this.platforms) {
            if (p.colorId !== this.player.colorId) continue;

            if (
                this.player.x + this.player.width > p.x &&
                this.player.x < p.x + p.width &&
                this.player.y + this.player.height >= p.y &&
                this.player.y + this.player.height <= p.y + p.height + 20 &&
                this.player.vy >= 0
            ) {
                this.player.y = p.y - this.player.height;
                this.player.vy = 0;
                this.player.isGrounded = true;
                this.player.state = "running";
            }
        }

        if (this.player.y > this.height) {
            this.player.state = "dead";
        }

        this.distance = Math.floor(this.player.x / 100);
        this.score = this.distance;

        this.managePlatforms();
    }

    public jump() {
        if (this.player.state === "dead") return;

        if (this.player.isGrounded) {
            this.player.vy = this.jumpForce;
            this.player.state = "jumping";
            this.player.isGrounded = false;
        }
    }

    private managePlatforms() {
        this.platforms = this.platforms.filter((p) => p.x + p.width > this.player.x - 200);

        const lastP = this.platforms[this.platforms.length - 1];
        if (lastP.x < this.player.x + this.width + 200) {
            this.generatePlatforms(lastP.x + lastP.width);
        }
    }

    private generatePlatforms(startX: number) {
        const currentX = startX;
        const gap = 150;

        const width = 300 + Math.random() * 200;
        const y = this.height - 100 - Math.random() * 150;

        const colorId = Math.random() > 0.5 ? 0 : 1;

        this.platforms.push({
            x: currentX + gap,
            y: y,
            width: width,
            height: 50,
            colorId: colorId as 0 | 1,
        });
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
