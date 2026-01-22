import type { Vector2 } from "./Types";
import { MAX_DRAG_DISTANCE } from "./Constants";

export class InputManager {
    private canvas: HTMLCanvasElement;
    private onDragStart: (pos: Vector2) => void;
    private onDragMove: (pos: Vector2) => void;
    private onDragEnd: (start: Vector2, end: Vector2) => void;

    private isDragging: boolean = false;
    private dragStart: Vector2 = { x: 0, y: 0 };
    private dragCurrent: Vector2 = { x: 0, y: 0 };

    constructor(
        canvas: HTMLCanvasElement,
        onDragStart: (pos: Vector2) => void,
        onDragMove: (pos: Vector2) => void,
        onDragEnd: (start: Vector2, end: Vector2) => void
    ) {
        this.canvas = canvas;
        this.onDragStart = onDragStart;
        this.onDragMove = onDragMove;
        this.onDragEnd = onDragEnd;

        this.attachEvents();
    }

    private attachEvents() {
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
        window.addEventListener("mouseup", this.handleMouseUp.bind(this));

        this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this), {
            passive: false,
        });
        window.addEventListener("touchmove", this.handleTouchMove.bind(this), { passive: false });
        window.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    public detach() {
        this.canvas.removeEventListener("mousedown", this.handleMouseDown.bind(this));
        window.removeEventListener("mousemove", this.handleMouseMove.bind(this));
        window.removeEventListener("mouseup", this.handleMouseUp.bind(this));

        this.canvas.removeEventListener("touchstart", this.handleTouchStart.bind(this));
        window.removeEventListener("touchmove", this.handleTouchMove.bind(this));
        window.removeEventListener("touchend", this.handleTouchEnd.bind(this));
    }

    private getPos(e: MouseEvent | TouchEvent): Vector2 {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        let clientX, clientY;

        if (e instanceof TouchEvent) {
            const touch = e.touches[0] || e.changedTouches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY,
        };
    }

    private handleMouseDown(e: MouseEvent) {
        const pos = this.getPos(e);
        this.isDragging = true;
        this.dragStart = pos;
        this.dragCurrent = pos;
        this.onDragStart(pos);
    }

    private handleMouseMove(e: MouseEvent) {
        if (!this.isDragging) return;
        const pos = this.getPos(e);
        this.dragCurrent = pos;
        this.onDragMove(pos);
    }

    private handleMouseUp(e: MouseEvent) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.onDragEnd(this.dragStart, this.dragCurrent);
    }

    private handleTouchStart(e: TouchEvent) {
        e.preventDefault();
        const pos = this.getPos(e);
        this.isDragging = true;
        this.dragStart = pos;
        this.dragCurrent = pos;
        this.onDragStart(pos);
    }

    private handleTouchMove(e: TouchEvent) {
        if (!this.isDragging) return;
        e.preventDefault();
        const pos = this.getPos(e);
        this.dragCurrent = pos;
        this.onDragMove(pos);
    }

    private handleTouchEnd(e: TouchEvent) {
        if (!this.isDragging) return;
        this.isDragging = false;

        this.onDragEnd(this.dragStart, this.dragCurrent);
    }
}
