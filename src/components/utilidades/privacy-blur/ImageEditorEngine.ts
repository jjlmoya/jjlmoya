
export interface Layer {
    id: number;
    type: 'pixel' | 'blur' | 'solid';
    x: number;
    y: number;
    w: number;
    h: number;
    intensity: number;
}

declare const faceapi: any;

export class ImageEditorEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement | null = null;
    private layers: Layer[] = [];

    private loader: HTMLElement | null;
    private loaderText: HTMLElement | null;
    private btnUndo: HTMLButtonElement | null;
    private canvasContainer: HTMLElement | null;
    private emptyState: HTMLElement | null;
    private btnDownload: HTMLButtonElement | null;

    private isDragging = false;
    private startX = 0;
    private startY = 0;
    private currentSelection: { x: number, y: number, w: number, h: number } | null = null;
    private tool: 'pixel' | 'blur' | 'solid' = 'pixel';
    private intensity = 10;
    private isFaceApiLoaded = false;

    constructor(
        canvasId: string,
        loaderId: string,
        loaderTextId: string,
        btnUndoId: string,
        canvasContainerId: string,
        emptyStateId: string,
        btnDownloadId: string
    ) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;

        this.loader = document.getElementById(loaderId);
        this.loaderText = document.getElementById(loaderTextId);
        this.btnUndo = document.getElementById(btnUndoId) as HTMLButtonElement;
        this.btnDownload = document.getElementById(btnDownloadId) as HTMLButtonElement;
        this.canvasContainer = document.getElementById(canvasContainerId);
        this.emptyState = document.getElementById(emptyStateId);

        this.initCanvasListeners();
    }

    public loadImage(file: File) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                this.image = img;
                this.layers = [];
                this.canvas.width = img.naturalWidth;
                this.canvas.height = img.naturalHeight;

                this.redraw();

                if (this.canvasContainer) this.canvasContainer.classList.remove('hidden');
                if (this.emptyState) this.emptyState.classList.add('hidden');
                if (this.btnDownload) this.btnDownload.removeAttribute('disabled');
                this.updateUndoState();
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    }

    public setTool(tool: string) {
        this.tool = tool as any;
    }

    public setIntensity(val: number) {
        this.intensity = val;
        if (this.layers.length > 0) {
            const lastLayer = this.layers[this.layers.length - 1];
            lastLayer.intensity = this.intensity;
            this.redraw();
        }
    }

    public undo() {
        if (this.layers.length === 0) return;
        this.layers.pop();
        this.redraw();
        this.updateUndoState();
    }

    public download() {
        if (!this.image) return;
        const link = document.createElement('a');
        link.download = `privacidad-protegida-${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }

    public async detectFaces() {
        if (!this.image) return;
        if (this.loader) this.loader.classList.remove('hidden');

        try {
            if (typeof faceapi === 'undefined') {
                throw new Error("FaceAPI not loaded");
            }

            if (!this.isFaceApiLoaded) {
                if (this.loaderText) this.loaderText.textContent = "Descargando modelos (solo una vez)...";
                await faceapi.loadTinyFaceDetectorModel('https://justadudewhohacks.github.io/face-api.js/models');
                this.isFaceApiLoaded = true;
            }

            if (this.loaderText) this.loaderText.textContent = "Analizando píxeles localmente...";

            const detections = await faceapi.detectAllFaces(
                this.image,
                new faceapi.TinyFaceDetectorOptions({ inputSize: 608, scoreThreshold: 0.4 })
            );

            if (detections.length === 0) {
                alert('No se detectaron rostros automáticamente.');
            } else {
                detections.forEach((d: any) => {
                    const { x, y, width, height } = d.box;
                    const pad = width * 0.15;
                    this.layers.push({
                        id: Date.now() + Math.random(),
                        type: this.tool,
                        x: x - pad,
                        y: y - pad * 1.5,
                        w: width + pad * 2,
                        h: height + pad * 2,
                        intensity: this.intensity
                    });
                });
                this.redraw();
                this.updateUndoState();
            }

        } catch (e) {
            console.error(e);
            alert("Error al iniciar detección facial local.");
        } finally {
            if (this.loader) this.loader.classList.add('hidden');
        }
    }

    private initCanvasListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.startSelection(e));
        this.canvas.addEventListener('mousemove', (e) => this.updateSelection(e));
        this.canvas.addEventListener('mouseup', () => this.endSelection());
        this.canvas.addEventListener('mouseleave', () => this.cancelSelection());

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.startSelection({ clientX: touch.clientX, clientY: touch.clientY } as any, rect);
        }, { passive: false });
    }

    private startSelection(e: MouseEvent, rectOverride?: DOMRect) {
        if (!this.image) return;
        this.isDragging = true;
        const rect = rectOverride || this.canvas.getBoundingClientRect();

        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        this.startX = (e.clientX - rect.left) * scaleX;
        this.startY = (e.clientY - rect.top) * scaleY;

        this.currentSelection = { x: this.startX, y: this.startY, w: 0, h: 0 };
    }

    private updateSelection(e: MouseEvent) {
        if (!this.isDragging || !this.image) return;

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const currentX = (e.clientX - rect.left) * scaleX;
        const currentY = (e.clientY - rect.top) * scaleY;

        const x = Math.min(this.startX, currentX);
        const y = Math.min(this.startY, currentY);
        const w = Math.abs(currentX - this.startX);
        const h = Math.abs(currentY - this.startY);

        this.currentSelection = { x, y, w, h };
        this.redraw();
    }

    private endSelection() {
        if (!this.isDragging || !this.currentSelection) return;
        this.isDragging = false;

        const { w, h } = this.currentSelection;

        if (w > 5 && h > 5) {
            this.layers.push({
                id: Date.now(),
                type: this.tool,
                x: this.currentSelection.x,
                y: this.currentSelection.y,
                w: this.currentSelection.w,
                h: this.currentSelection.h,
                intensity: this.intensity
            });
            this.updateUndoState();
        }

        this.currentSelection = null;
        this.redraw();
    }

    private cancelSelection() {
        this.isDragging = false;
        this.currentSelection = null;
        this.redraw();
    }

    private redraw() {
        if (!this.image) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.filter = 'none';
        this.ctx.drawImage(this.image, 0, 0);

        this.layers.forEach(layer => this.applyLayer(layer));

        if (this.currentSelection) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(this.currentSelection.x, this.currentSelection.y, this.currentSelection.w, this.currentSelection.h);
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.strokeRect(this.currentSelection.x - 1, this.currentSelection.y - 1, this.currentSelection.w + 2, this.currentSelection.h + 2);
        }
    }

    private applyLayer(layer: Layer) {
        if (layer.intensity === 0) {
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.drawImage(
                this.image!,
                layer.x, layer.y, layer.w, layer.h,
                layer.x, layer.y, layer.w, layer.h
            );
            return;
        }

        if (layer.type === 'solid') {
            this.ctx.fillStyle = '#000000';
            this.ctx.fillRect(layer.x, layer.y, layer.w, layer.h);
        } else if (layer.type === 'blur') {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(layer.x, layer.y, layer.w, layer.h);
            this.ctx.clip();
            this.ctx.filter = `blur(${layer.intensity * 2}px)`;
            this.ctx.drawImage(this.image!, 0, 0);
            this.ctx.restore();
            this.ctx.filter = 'none';
        } else if (layer.type === 'pixel') {
            const size = Math.max(2, layer.intensity);
            const w = Math.floor(layer.w);
            const h = Math.floor(layer.h);

            const scaledW = w / size;
            const scaledH = h / size;

            this.ctx.imageSmoothingEnabled = false;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = w;
            tempCanvas.height = h;
            const tCtx = tempCanvas.getContext('2d')!;
            tCtx.imageSmoothingEnabled = false;

            tCtx.drawImage(this.image!, layer.x, layer.y, w, h, 0, 0, scaledW, scaledH);

            this.ctx.drawImage(tempCanvas, 0, 0, scaledW, scaledH, layer.x, layer.y, w, h);
            this.ctx.imageSmoothingEnabled = true;
        }
    }

    private updateUndoState() {
        if (this.btnUndo) this.btnUndo.disabled = this.layers.length === 0;
    }
}
