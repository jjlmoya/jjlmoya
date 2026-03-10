interface Preset {
    id: string;
    name: string;
    width: number;
    height: number;
    platform: string;
}

export class SocialResizer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement | null = null;
    private currentPreset: Preset;

    private scale: number = 1.0;
    private posX: number = 0;
    private posY: number = 0;
    private isDragging: boolean = false;
    private lastMouseX: number = 0;
    private lastMouseY: number = 0;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
        this.currentPreset = { id: "ig-square", name: "Post Cuadrado", width: 1080, height: 1080, platform: "Instagram" };

        this.initEventListeners();
    }

    private initEventListeners() {
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        window.addEventListener("mousemove", (e) => this.onMouseMove(e));
        window.addEventListener("mouseup", () => this.onMouseUp());
        this.canvas.addEventListener("wheel", (e) => this.onWheel(e), { passive: false });
    }

    public loadImage(file: File): Promise<void> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.image = img;
                    this.resetPosition();
                    this.draw();
                    resolve();
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    }

    private resetPosition() {
        if (!this.image) return;

        const presetRatio = this.currentPreset.width / this.currentPreset.height;
        const imgRatio = this.image.width / this.image.height;

        if (imgRatio > presetRatio) {
            this.scale = this.currentPreset.height / this.image.height;
        } else {
            this.scale = this.currentPreset.width / this.image.width;
        }

        this.posX = (this.currentPreset.width - this.image.width * this.scale) / 2;
        this.posY = (this.currentPreset.height - this.image.height * this.scale) / 2;
    }

    public setPreset(preset: Preset) {
        this.currentPreset = preset;
        this.canvas.width = preset.width;
        this.canvas.height = preset.height;
        this.resetPosition();
        this.draw();
    }

    public setScale(newScale: number) {
        const oldScale = this.scale;
        this.scale = newScale;

        const centerX = this.currentPreset.width / 2;
        const centerY = this.currentPreset.height / 2;

        this.posX = centerX - (centerX - this.posX) * (this.scale / oldScale);
        this.posY = centerY - (centerY - this.posY) * (this.scale / oldScale);

        this.draw();
    }

    private draw() {
        if (!this.image) return;

        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.image.width * this.scale,
            this.image.height * this.scale
        );
    }

    private onMouseDown(e: MouseEvent) {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }

    private onMouseMove(e: MouseEvent) {
        if (!this.isDragging || !this.image) return;

        const deltaX = e.clientX - this.lastMouseX;
        const deltaY = e.clientY - this.lastMouseY;

        const rect = this.canvas.getBoundingClientRect();
        const factorX = this.canvas.width / rect.width;
        const factorY = this.canvas.height / rect.height;

        this.posX += deltaX * factorX;
        this.posY += deltaY * factorY;

        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;

        this.draw();
    }

    private onMouseUp() {
        this.isDragging = false;
    }

    private onWheel(e: WheelEvent) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.95 : 1.05;
        this.setScale(this.scale * delta);

        const zoomRange = document.getElementById("zoom-range") as HTMLInputElement;
        if (zoomRange) {
            zoomRange.value = (this.scale * 100).toString();
        }
    }

    public download() {
        if (!this.image) return;
        const link = document.createElement("a");
        link.download = `jjlmoya-${this.currentPreset.id}.jpg`;
        link.href = this.canvas.toDataURL("image/jpeg", 0.9);
        link.click();
    }
}
