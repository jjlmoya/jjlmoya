export interface SlingshotConfig {
    gravity?: number;
    friction?: number;
    bounceDamping?: number;
    dragPower?: number;
    maxDragDistance?: number;
    padding?: {
        top?: number;
        bottom?: number;
        x?: number;
    };
}

export interface SlingshotState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export interface SlingshotCallbacks {
    onBounce?: (speed: number) => void;
    onDragStart?: () => void;
    onDragEnd?: (velocity: { vx: number; vy: number }) => void;
    onUpdate?: (state: SlingshotState) => void;
}

type ResolvedSlingshotConfig = {
    gravity: number;
    friction: number;
    bounceDamping: number;
    dragPower: number;
    maxDragDistance: number;
    padding: {
        top: number;
        bottom: number;
        x: number;
    };
};

export class SlingshotMechanic {
    private config: ResolvedSlingshotConfig;
    private state: SlingshotState & {
        anchor: { x: number; y: number };
        dragging: boolean;
        lastBounceTime: number;
    };
    private callbacks: SlingshotCallbacks;
    private bounds: {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    } = { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    constructor(
        initialPosition: { x: number; y: number; radius: number },
        config: SlingshotConfig = {},
        callbacks: SlingshotCallbacks = {}
    ) {
        this.config = {
            gravity: config.gravity ?? 0.4,
            friction: config.friction ?? 0.995,
            bounceDamping: config.bounceDamping ?? 0.8,
            dragPower: config.dragPower ?? 0.15,
            maxDragDistance: config.maxDragDistance ?? 300,
            padding: {
                top: config.padding?.top ?? 120,
                bottom: config.padding?.bottom ?? 120,
                x: config.padding?.x ?? 20,
            },
        };

        this.state = {
            x: initialPosition.x,
            y: initialPosition.y,
            vx: 0,
            vy: 0,
            radius: initialPosition.radius,
            anchor: { x: initialPosition.x, y: initialPosition.y },
            dragging: false,
            lastBounceTime: 0,
        };

        this.callbacks = callbacks;
    }

    updateBounds(width: number, height: number): void {
        this.bounds = {
            minX: this.state.radius + this.config.padding.x,
            maxX: width - this.state.radius - this.config.padding.x,
            minY: this.state.radius + this.config.padding.top,
            maxY: height - this.state.radius - this.config.padding.bottom,
        };
    }

    startDrag(mouseX: number, mouseY: number): boolean {
        const dx = mouseX - this.state.x;
        const dy = mouseY - this.state.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
            this.state.dragging = true;
            this.state.anchor.x = this.state.x;
            this.state.anchor.y = this.state.y;
            this.state.vx = 0;
            this.state.vy = 0;
            this.callbacks.onDragStart?.();
            return true;
        }
        return false;
    }

    updateDrag(mouseX: number, mouseY: number): void {
        if (!this.state.dragging) return;

        let dx = mouseX - this.state.anchor.x;
        let dy = mouseY - this.state.anchor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > this.config.maxDragDistance) {
            const ratio = this.config.maxDragDistance / dist;
            dx *= ratio;
            dy *= ratio;
        }

        this.state.x = this.state.anchor.x + dx;
        this.state.y = this.state.anchor.y + dy;
    }

    endDrag(): void {
        if (!this.state.dragging) return;
        this.state.dragging = false;

        const dx = this.state.anchor.x - this.state.x;
        const dy = this.state.anchor.y - this.state.y;

        this.state.vx = dx * this.config.dragPower * 1.5;
        this.state.vy = dy * this.config.dragPower * 1.5;

        this.callbacks.onDragEnd?.({ vx: this.state.vx, vy: this.state.vy });
    }

    update(deltaTime: number = 1): void {
        if (this.state.dragging) return;

        this.state.vy += this.config.gravity * deltaTime;

        this.state.vx *= this.config.friction;
        this.state.vy *= this.config.friction;

        this.state.x += this.state.vx * deltaTime;
        this.state.y += this.state.vy * deltaTime;

        let bounced = false;
        const speed = Math.sqrt(this.state.vx ** 2 + this.state.vy ** 2);

        if (this.state.x < this.bounds.minX) {
            this.state.x = this.bounds.minX;
            this.state.vx *= -this.config.bounceDamping;
            bounced = true;
        } else if (this.state.x > this.bounds.maxX) {
            this.state.x = this.bounds.maxX;
            this.state.vx *= -this.config.bounceDamping;
            bounced = true;
        }

        if (this.state.y < this.bounds.minY) {
            this.state.y = this.bounds.minY;
            this.state.vy *= -this.config.bounceDamping;
            bounced = true;
        } else if (this.state.y > this.bounds.maxY) {
            this.state.y = this.bounds.maxY;
            this.state.vy *= -this.config.bounceDamping;

            if (Math.abs(this.state.vy) < this.config.gravity * 2) {
                this.state.vy = 0;
            } else {
                bounced = true;
            }
        }

        if (bounced) {
            this.state.lastBounceTime = Date.now();
            this.callbacks.onBounce?.(speed);
        }

        this.callbacks.onUpdate?.(this.getState());
    }

    getState(): SlingshotState {
        return {
            x: this.state.x,
            y: this.state.y,
            vx: this.state.vx,
            vy: this.state.vy,
            radius: this.state.radius,
        };
    }

    getDragInfo(): { dragging: boolean; anchor: { x: number; y: number } } | null {
        if (!this.state.dragging) return null;
        return {
            dragging: true,
            anchor: { ...this.state.anchor },
        };
    }

    getTimeSinceBounce(): number {
        return Date.now() - this.state.lastBounceTime;
    }

    getSpeed(): number {
        return Math.sqrt(this.state.vx ** 2 + this.state.vy ** 2);
    }

    isDragging(): boolean {
        return this.state.dragging;
    }
}
