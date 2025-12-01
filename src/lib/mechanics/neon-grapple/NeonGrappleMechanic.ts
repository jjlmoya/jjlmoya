
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
    state: 'falling' | 'grappling' | 'dead';
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
    private friction: number = 0.995; // Reduced friction significantly
    private width: number;
    private height: number;

    // Configuration
    private maxRopeLength: number = 500; // Increased range
    private minRopeLength: number = 50;
    private swingBoost: number = 1.02; // Increased boost

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.reset();
    }

    public reset() {
        this.player = {
            x: 100,
            y: this.height / 2 - 40, // Start on platform
            vx: 0, // Start stationary
            vy: 0,
            radius: 15,
            state: 'falling'
        };

        // Create starting platform under player
        this.startingPlatform = {
            x: 50,
            y: this.height / 2,
            width: 300,
            height: 20,
            active: true
        };

        this.anchors = [];
        this.currentAnchor = null;
        this.score = 0;
        this.distanceTraveled = 0;

        // Generate initial anchors
        this.generateAnchors(0);
    }

    public update() {
        if (this.player.state === 'dead') return;

        // Apply Gravity
        this.player.vy += this.gravity;

        // Apply Friction (Air resistance)
        this.player.vx *= this.friction;
        this.player.vy *= this.friction;

        // Fake Physics: Minimum horizontal velocity to prevent getting stuck
        // Only apply if we are moving (not on start platform)
        if (this.player.x > 350 || !this.startingPlatform?.active) {
            if (this.player.vx < 4) {
                this.player.vx += 0.1;
            }
        }

        // Physics Step
        if (this.player.state === 'grappling' && this.currentAnchor) {
            this.applyGrapplePhysics();
            // Disable platform if we grapple
            if (this.startingPlatform) this.startingPlatform.active = false;
        } else if (this.startingPlatform && this.startingPlatform.active) {
            // Platform collision
            if (this.player.x < this.startingPlatform.x + this.startingPlatform.width &&
                this.player.y + this.player.radius >= this.startingPlatform.y &&
                this.player.y - this.player.radius <= this.startingPlatform.y + this.startingPlatform.height &&
                this.player.vy >= 0) {

                this.player.y = this.startingPlatform.y - this.player.radius;
                this.player.vy = 0;

                // Auto-run on platform
                if (this.player.vx < 6) this.player.vx += 0.2;
            } else if (this.player.x > this.startingPlatform.x + this.startingPlatform.width) {
                // Left the platform
                this.startingPlatform.active = false;
            }
        }

        // Move Player
        this.player.x += this.player.vx;
        this.player.y += this.player.vy;

        // Bounds Check (Death)
        if (this.player.y > this.height + this.player.radius || this.player.y < -this.height) {
            this.player.state = 'dead';
        }

        // Update Score/Distance
        this.distanceTraveled += this.player.vx;
        this.score = Math.floor(this.distanceTraveled / 100);

        // Procedural Generation
        this.manageAnchors();
    }

    public grapple(): boolean {
        if (this.player.state === 'dead') return false;

        // Find nearest anchor within range
        let nearest: Anchor | null = null;
        let minDist = Infinity;

        // We prioritize anchors in front of the player and somewhat above
        for (const anchor of this.anchors) {
            if (anchor.x < this.player.x - 100) continue; // Ignore anchors far behind

            const dx = anchor.x - this.player.x;
            const dy = anchor.y - this.player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.maxRopeLength && dist > this.minRopeLength) {
                // Simple heuristic: prioritize closest
                if (dist < minDist) {
                    minDist = dist;
                    nearest = anchor;
                }
            }
        }

        if (nearest) {
            this.currentAnchor = nearest;
            this.player.state = 'grappling';
            this.ropeLength = minDist;
            return true;
        }

        return false;
    }

    public release() {
        if (this.player.state === 'grappling') {
            this.player.state = 'falling';
            this.currentAnchor = null;

            // Add a little "pop" on release to make it feel responsive
            // this.player.vy -= 2; 
        }
    }

    private applyGrapplePhysics() {
        if (!this.currentAnchor) return;

        const dx = this.player.x - this.currentAnchor.x;
        const dy = this.player.y - this.currentAnchor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Rope Constraint (Rigid rope mostly, maybe slightly elastic logic visually, but rigid physics)
        if (dist > this.ropeLength) {
            const angle = Math.atan2(dy, dx);

            // Position correction (Hard constraint)
            this.player.x = this.currentAnchor.x + Math.cos(angle) * this.ropeLength;
            this.player.y = this.currentAnchor.y + Math.sin(angle) * this.ropeLength;

            // Velocity correction: Remove radial velocity (outward component)
            // Project velocity onto the tangent vector
            // Tangent is (-sin, cos) or (sin, -cos)
            const tx = -Math.sin(angle);
            const ty = Math.cos(angle);

            const dot = this.player.vx * tx + this.player.vy * ty;

            this.player.vx = tx * dot * this.swingBoost;
            this.player.vy = ty * dot * this.swingBoost;
        }
    }

    private manageAnchors() {
        // Remove old anchors
        this.anchors = this.anchors.filter(a => a.x > this.player.x - this.width);

        // Add new anchors
        const lastAnchorX = this.anchors.length > 0 ? this.anchors[this.anchors.length - 1].x : this.player.x;

        if (lastAnchorX < this.player.x + this.width * 1.5) {
            this.generateAnchors(lastAnchorX);
        }
    }

    private generateAnchors(startX: number) {
        let currentX = startX;
        // Ensure we always have anchors ahead
        while (currentX < this.player.x + this.width * 2) {
            const gap = 200 + Math.random() * 300; // Random distance between anchors
            currentX += gap;

            // Height variation: mostly in the upper half/third of the screen
            const minY = 50;
            const maxY = this.height * 0.6;
            const y = minY + Math.random() * (maxY - minY);

            this.anchors.push({
                x: currentX,
                y: y,
                radius: 10,
                active: true
            });
        }
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
