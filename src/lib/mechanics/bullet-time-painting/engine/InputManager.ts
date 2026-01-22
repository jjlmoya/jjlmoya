import type { Vector2D, Action } from "./Types";

export class InputManager {
    private isDrawing = false;
    private startPos: Vector2D | null = null;
    private currentPos: Vector2D | null = null;
    private drawingType: "move" | "shoot" = "move";
    private onActionCreated: (action: Action) => void;
    private canvas: HTMLCanvasElement | null = null;

    constructor(onActionCreated: (action: Action) => void) {
        this.onActionCreated = onActionCreated;
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }

    public attach(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        canvas.addEventListener("mousedown", this.handleMouseDown);
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
        canvas.addEventListener("contextmenu", this.handleContextMenu);
    }

    private handleContextMenu(e: MouseEvent): void {
        e.preventDefault();
    }

    private handleMouseDown(e: MouseEvent): void {
        this.isDrawing = true;
        this.drawingType = e.button === 2 ? "shoot" : "move";
        this.startPos = this.getMousePos(e);
        this.currentPos = { ...this.startPos };
    }

    private handleMouseMove(e: MouseEvent): void {
        if (!this.isDrawing) return;
        this.currentPos = this.getMousePos(e);
    }

    private handleMouseUp(e: MouseEvent): void {
        if (!this.isDrawing || !this.startPos || !this.currentPos) return;

        const endPos = this.getMousePos(e);
        const rawVector = {
            x: (endPos.x - this.startPos.x) / 5,
            y: (endPos.y - this.startPos.y) / 5,
        };

        const vector = { ...rawVector };
        const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        if (this.drawingType === "move" && mag > 18) {
            vector.x = (vector.x / mag) * 18;
            vector.y = (vector.y / mag) * 18;
        }

        this.onActionCreated({
            type: this.drawingType,
            vector,
        });

        this.isDrawing = false;
        this.startPos = null;
        this.currentPos = null;
    }

    private getMousePos(e: MouseEvent): Vector2D {
        if (!this.canvas) return { x: 0, y: 0 };
        const rect = this.canvas.getBoundingClientRect();

        const displayWidth = rect.width;
        const displayHeight = rect.height;
        const internalWidth = this.canvas.width;
        const internalHeight = this.canvas.height;

        const scale = Math.min(displayWidth / internalWidth, displayHeight / internalHeight);
        const actualWidth = internalWidth * scale;
        const actualHeight = internalHeight * scale;

        const offsetX = (displayWidth - actualWidth) / 2;
        const offsetY = (displayHeight - actualHeight) / 2;

        const mouseX = e.clientX - rect.left - offsetX;
        const mouseY = e.clientY - rect.top - offsetY;

        return {
            x: (mouseX / actualWidth) * internalWidth,
            y: (mouseY / actualHeight) * internalHeight,
        };
    }

    public getActiveDrawing(): any {
        if (!this.isDrawing || !this.startPos || !this.currentPos) return null;

        const rawEnd = this.currentPos;
        const dx = rawEnd.x - this.startPos.x;
        const dy = rawEnd.y - this.startPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 90;
        let finalEnd = rawEnd;

        if (this.drawingType === "move" && dist > maxDist) {
            finalEnd = {
                x: this.startPos.x + (dx / dist) * maxDist,
                y: this.startPos.y + (dy / dist) * maxDist,
            };
        }

        return {
            start: this.startPos,
            end: finalEnd,
            type: this.drawingType,
        };
    }
}
