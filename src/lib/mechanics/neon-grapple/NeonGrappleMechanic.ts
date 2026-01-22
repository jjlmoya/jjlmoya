export interface Point {
    x: number;
    y: number;
}

export interface Player {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    state: "falling" | "grappling" | "dead";
}

export interface Anchor {
    x: number;
    y: number;
    radius: number;
    active: boolean;
}

export interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
}

export class NeonGrappleMechanic {
    public player!: Player;
    public anchors: Anchor[] = [];
    public currentAnchor: Anchor | null = null;
    public startingPlatform: Platform | null = null;
    public ropeLength: number = 0;

    public score: number = 0;
    public distanceTraveled: number = 0;

    private gravity: number = 0.5;
    private friction: number = 0.995;
    private width: number;
    private height: number;

    private maxRopeLength: number = 500;
    private minRopeLength: number = 50;
    private swingBoost: number = 1.02;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.reset();
    }

    public reset() {
        this.player = {
            x: 100,
            y: this.height / 2 - 40,
            vx: 0,
            vy: 0,
            radius: 15,
            state: "falling",
        };

        this.startingPlatform = {
            x: 50,
            y: this.height / 2,
            width: 300,
            height: 20,
            active: true,
        };

        this.anchors = [];
        this.currentAnchor = null;
        this.score = 0;
        this.distanceTraveled = 0;

        this.generateAnchors(0);
    }

    public update() {
        if (this.player.state === "dead") return;

        this.player.vy += this.gravity;

        this.player.vx *= this.friction;
        this.player.vy *= this.friction;

        if (this.player.x > 350 || !this.startingPlatform?.active) {
            if (this.player.vx < 4) {
                this.player.vx += 0.1;
            }
        }

        if (this.player.state === "grappling" && this.currentAnchor) {
            this.applyGrapplePhysics();

            if (this.startingPlatform) this.startingPlatform.active = false;
        } else if (this.startingPlatform && this.startingPlatform.active) {
            if (
                this.player.x < this.startingPlatform.x + this.startingPlatform.width &&
                this.player.y + this.player.radius >= this.startingPlatform.y &&
                this.player.y - this.player.radius <=
                    this.startingPlatform.y + this.startingPlatform.height &&
                this.player.vy >= 0
            ) {
                this.player.y = this.startingPlatform.y - this.player.radius;
                this.player.vy = 0;

                if (this.player.vx < 6) this.player.vx += 0.2;
            } else if (this.player.x > this.startingPlatform.x + this.startingPlatform.width) {
                this.startingPlatform.active = false;
            }
        }

        this.player.x += this.player.vx;
        this.player.y += this.player.vy;

        if (this.player.y > this.height + this.player.radius || this.player.y < -this.height) {
            this.player.state = "dead";
        }

        this.distanceTraveled += this.player.vx;
        this.score = Math.floor(this.distanceTraveled / 100);

        this.manageAnchors();
    }

    public grapple(): boolean {
        if (this.player.state === "dead") return false;

        let nearest: Anchor | null = null;
        let minDist = Infinity;

        for (const anchor of this.anchors) {
            if (anchor.x < this.player.x - 100) continue;

            const dx = anchor.x - this.player.x;
            const dy = anchor.y - this.player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.maxRopeLength && dist > this.minRopeLength) {
                if (dist < minDist) {
                    minDist = dist;
                    nearest = anchor;
                }
            }
        }

        if (nearest) {
            this.currentAnchor = nearest;
            this.player.state = "grappling";
            this.ropeLength = minDist;
            return true;
        }

        return false;
    }

    public release() {
        if (this.player.state === "grappling") {
            this.player.state = "falling";
            this.currentAnchor = null;
        }
    }

    private applyGrapplePhysics() {
        if (!this.currentAnchor) return;

        const dx = this.player.x - this.currentAnchor.x;
        const dy = this.player.y - this.currentAnchor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > this.ropeLength) {
            const angle = Math.atan2(dy, dx);

            this.player.x = this.currentAnchor.x + Math.cos(angle) * this.ropeLength;
            this.player.y = this.currentAnchor.y + Math.sin(angle) * this.ropeLength;

            const tx = -Math.sin(angle);
            const ty = Math.cos(angle);

            const dot = this.player.vx * tx + this.player.vy * ty;

            this.player.vx = tx * dot * this.swingBoost;
            this.player.vy = ty * dot * this.swingBoost;
        }
    }

    private manageAnchors() {
        this.anchors = this.anchors.filter((a) => a.x > this.player.x - this.width);

        const lastAnchorX =
            this.anchors.length > 0 ? this.anchors[this.anchors.length - 1].x : this.player.x;

        if (lastAnchorX < this.player.x + this.width * 1.5) {
            this.generateAnchors(lastAnchorX);
        }
    }

    private generateAnchors(startX: number) {
        let currentX = startX;

        while (currentX < this.player.x + this.width * 2) {
            const gap = 200 + Math.random() * 300;
            currentX += gap;

            const minY = 50;
            const maxY = this.height * 0.6;
            const y = minY + Math.random() * (maxY - minY);

            this.anchors.push({
                x: currentX,
                y: y,
                radius: 10,
                active: true,
            });
        }
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
