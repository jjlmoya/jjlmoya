import type { DeviceConfig, MockupImage } from "./types";
import { EXPORT_WIDTH, EXPORT_HEIGHT, CANVAS_ASPECT } from "./constants";

export class RenderingEngine {
    static async drawMockup(
        canvas: HTMLCanvasElement,
        image: MockupImage,
        dataUrl: string,
        device: DeviceConfig,
        globalSettings: {
            gradient: { start: string; end: string; angle: number };
            font: string;
            safeArea: { show: boolean; color: string };
        },
        isExport: boolean = false
    ) {
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const width = isExport ? EXPORT_WIDTH : canvas.width / (window.devicePixelRatio || 1);
        const height = isExport ? EXPORT_HEIGHT : width / CANVAS_ASPECT;

        if (!isExport) {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }


        if (image.settings.bgImage) {
            const bgImg = await this.loadImage(image.settings.bgImage);
            ctx.drawImage(bgImg, 0, 0, width, height);
        } else {
            const angleRad = (globalSettings.gradient.angle - 90) * (Math.PI / 180);
            const centerX = width / 2;
            const centerY = height / 2;
            const length =
                Math.abs(width * Math.cos(angleRad)) + Math.abs(height * Math.sin(angleRad));

            const x1 = centerX - (Math.cos(angleRad) * length) / 2;
            const y1 = centerY - (Math.sin(angleRad) * length) / 2;
            const x2 = centerX + (Math.cos(angleRad) * length) / 2;
            const y2 = centerY + (Math.sin(angleRad) * length) / 2;

            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, globalSettings.gradient.start);
            gradient.addColorStop(1, globalSettings.gradient.end);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }


        const paddingScale = 0.85 - (image.settings.spacing / 100) * 0.35;
        const scale = Math.min(
            (width * paddingScale) / device.width,
            (height * paddingScale) / device.height
        );

        const scaledW = device.width * scale;
        const scaledH = device.height * scale;


        const deviceX = (width - scaledW) / 2 + (width * (image.settings.deviceOffsetX || 0)) / 100;
        const deviceY = (height - scaledH) / 2 + (height * (image.settings.deviceOffsetY || 0)) / 100;


        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 40 * scale;
        ctx.shadowOffsetY = 20 * scale;

        ctx.fillStyle = "#0f172a";
        this.roundRect(ctx, deviceX, deviceY, scaledW, scaledH, device.radius * scale);
        ctx.fill();
        ctx.restore();


        const screenInset = 8 * scale;
        const screenX = deviceX + screenInset;
        const screenY = deviceY + screenInset;
        const screenW = scaledW - screenInset * 2;
        const screenH = scaledH - screenInset * 2;

        const imgEl = await this.loadImage(dataUrl);

        ctx.save();
        this.roundRect(ctx, screenX, screenY, screenW, screenH, (device.radius - 8) * scale);
        ctx.clip();

        const imgAspect = imgEl.width / imgEl.height;
        const screenAspect = screenW / screenH;

        let drawW, drawH, drawX, drawY;
        if (imgAspect > screenAspect) {
            drawH = screenH;
            drawW = screenH * imgAspect;
            drawX = screenX - (drawW - screenW) / 2;
            drawY = screenY;
        } else {
            drawW = screenW;
            drawH = screenW / imgAspect;
            drawX = screenX;
            drawY = screenY - (drawH - screenH) / 2;
        }

        ctx.drawImage(imgEl, drawX, drawY, drawW, drawH);


        if (globalSettings.safeArea.show) {
            ctx.fillStyle = globalSettings.safeArea.color;


            if (device.safeAreaTop > 0) {
                ctx.fillRect(screenX, screenY, screenW, device.safeAreaTop * scale);
            }


            if (device.safeAreaBottom > 0) {
                ctx.fillRect(screenX, screenY + screenH - (device.safeAreaBottom * scale), screenW, device.safeAreaBottom * scale);
            }
        }

        ctx.restore();


        if (device.notch) {
            ctx.fillStyle = "#0f172a";
            const notchW = 120 * scale;
            const notchH = 35 * scale;
            const notchR = 18 * scale;
            this.roundRect(
                ctx,
                deviceX + (scaledW - notchW) / 2,
                deviceY + 12 * scale,
                notchW,
                notchH,
                notchR
            );
            ctx.fill();
        }


        if (image.settings.text) {
            ctx.save();
            ctx.translate(width * (image.settings.textX / 100), height * (image.settings.textY / 100));
            ctx.rotate((image.settings.textRotation * Math.PI) / 180);

            const fontSize = image.settings.textSize * (isExport ? 1 : 1);
            ctx.font = `bold ${fontSize}px ${globalSettings.font}`;
            ctx.fillStyle = image.settings.textColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const maxWidth = width * 0.85;
            const words = image.settings.text.split(" ");
            const lines: string[] = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
                const word = words[i];
                const width = ctx.measureText(currentLine + " " + word).width;
                if (width < maxWidth) {
                    currentLine += " " + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);

            const lineHeight = fontSize * 1.2;
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * lineHeight - ((lines.length - 1) * lineHeight) / 2);
            });
            ctx.restore();
        }
    }

    private static roundRect(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        r: number
    ) {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.closePath();
    }

    private static loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        });
    }
}
