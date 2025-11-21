export type SwipeDirection =
    | "up"
    | "down"
    | "left"
    | "right"
    | "up-left"
    | "up-right"
    | "down-left"
    | "down-right";

export interface SwipeConfig {
    minDistance?: number;
    maxDuration?: number;
    threshold?: number;
    preventScroll?: boolean;
    enableDiagonals?: boolean;
}

export interface SwipeCallbacks {
    onSwipeStart?: (x: number, y: number) => void;
    onSwipeMove?: (x: number, y: number) => void;
    onSwipe?: (direction: SwipeDirection, velocity: number, distance: number) => void;
    onSwipeEnd?: () => void;
}

export interface SwipeInfo {
    direction: SwipeDirection;
    velocity: number;
    distance: number;
    duration: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

type ResolvedSwipeConfig = {
    minDistance: number;
    maxDuration: number;
    threshold: number;
    preventScroll: boolean;
    enableDiagonals: boolean;
};

export class SwipeGesture {
    private config: ResolvedSwipeConfig;
    private callbacks: SwipeCallbacks;
    private element: HTMLElement;
    private enabled: boolean = true;

    private startX: number = 0;
    private startY: number = 0;
    private startTime: number = 0;
    private isSwiping: boolean = false;
    private lastSwipe: SwipeInfo | null = null;

    private boundHandlers = {
        touchStart: this.handleTouchStart.bind(this),
        touchMove: this.handleTouchMove.bind(this),
        touchEnd: this.handleTouchEnd.bind(this),
        mouseDown: this.handleMouseDown.bind(this),
        mouseMove: this.handleMouseMove.bind(this),
        mouseUp: this.handleMouseUp.bind(this),
    };

    constructor(element: HTMLElement, config: SwipeConfig = {}, callbacks: SwipeCallbacks = {}) {
        this.element = element;
        this.config = {
            minDistance: config.minDistance ?? 50,
            maxDuration: config.maxDuration ?? 500,
            threshold: config.threshold ?? 45,
            preventScroll: config.preventScroll ?? true,
            enableDiagonals: config.enableDiagonals ?? false,
        };
        this.callbacks = callbacks;

        this.attachListeners();
    }

    private attachListeners(): void {
        this.element.addEventListener("touchstart", this.boundHandlers.touchStart, {
            passive: false,
        });
        this.element.addEventListener("touchmove", this.boundHandlers.touchMove, {
            passive: false,
        });
        this.element.addEventListener("touchend", this.boundHandlers.touchEnd);
        this.element.addEventListener("mousedown", this.boundHandlers.mouseDown);
    }

    private handleTouchStart(e: TouchEvent): void {
        if (!this.enabled) return;
        if (this.config.preventScroll) {
            e.preventDefault();
        }
        const touch = e.touches[0];
        this.startSwipe(touch.clientX, touch.clientY);
    }

    private handleTouchMove(e: TouchEvent): void {
        if (!this.enabled || !this.isSwiping) return;
        if (this.config.preventScroll) {
            e.preventDefault();
        }
        const touch = e.touches[0];
        this.callbacks.onSwipeMove?.(touch.clientX, touch.clientY);
    }

    private handleTouchEnd(e: TouchEvent): void {
        if (!this.enabled || !this.isSwiping) return;
        const touch = e.changedTouches[0];
        this.endSwipe(touch.clientX, touch.clientY);
    }

    private handleMouseDown(e: MouseEvent): void {
        if (!this.enabled) return;
        this.startSwipe(e.clientX, e.clientY);

        window.addEventListener("mousemove", this.boundHandlers.mouseMove);
        window.addEventListener("mouseup", this.boundHandlers.mouseUp);
    }

    private handleMouseMove(e: MouseEvent): void {
        if (!this.enabled || !this.isSwiping) return;
        this.callbacks.onSwipeMove?.(e.clientX, e.clientY);
    }

    private handleMouseUp(e: MouseEvent): void {
        if (!this.enabled || !this.isSwiping) return;
        this.endSwipe(e.clientX, e.clientY);

        window.removeEventListener("mousemove", this.boundHandlers.mouseMove);
        window.removeEventListener("mouseup", this.boundHandlers.mouseUp);
    }

    private startSwipe(x: number, y: number): void {
        this.startX = x;
        this.startY = y;
        this.startTime = Date.now();
        this.isSwiping = true;
        this.callbacks.onSwipeStart?.(x, y);
    }

    private endSwipe(endX: number, endY: number): void {
        if (!this.isSwiping) return;

        const deltaX = endX - this.startX;
        const deltaY = endY - this.startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const duration = Date.now() - this.startTime;

        this.isSwiping = false;
        this.callbacks.onSwipeEnd?.();

        if (distance < this.config.minDistance || duration > this.config.maxDuration) {
            return;
        }

        const direction = this.calculateDirection(deltaX, deltaY);
        const velocity = distance / duration;

        this.lastSwipe = {
            direction,
            velocity,
            distance,
            duration,
            startX: this.startX,
            startY: this.startY,
            endX,
            endY,
        };

        this.callbacks.onSwipe?.(direction, velocity, distance);
    }

    private calculateDirection(deltaX: number, deltaY: number): SwipeDirection {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const absAngle = Math.abs(angle);

        if (this.config.enableDiagonals) {
            if (angle >= -22.5 && angle < 22.5) return "right";
            if (angle >= 22.5 && angle < 67.5) return "down-right";
            if (angle >= 67.5 && angle < 112.5) return "down";
            if (angle >= 112.5 && angle < 157.5) return "down-left";
            if (absAngle >= 157.5) return "left";
            if (angle >= -157.5 && angle < -112.5) return "up-left";
            if (angle >= -112.5 && angle < -67.5) return "up";
            if (angle >= -67.5 && angle < -22.5) return "up-right";
        } else {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                return deltaX > 0 ? "right" : "left";
            } else {
                return deltaY > 0 ? "down" : "up";
            }
        }

        return "right";
    }

    enable(): void {
        this.enabled = true;
    }

    disable(): void {
        this.enabled = false;
        this.isSwiping = false;
    }

    getLastSwipe(): SwipeInfo | null {
        return this.lastSwipe ? { ...this.lastSwipe } : null;
    }

    checkIsSwiping(): boolean {
        return this.isSwiping;
    }

    destroy(): void {
        this.element.removeEventListener("touchstart", this.boundHandlers.touchStart);
        this.element.removeEventListener("touchmove", this.boundHandlers.touchMove);
        this.element.removeEventListener("touchend", this.boundHandlers.touchEnd);
        this.element.removeEventListener("mousedown", this.boundHandlers.mouseDown);
        window.removeEventListener("mousemove", this.boundHandlers.mouseMove);
        window.removeEventListener("mouseup", this.boundHandlers.mouseUp);
    }
}
