export type ImageFormat = "image/png" | "image/jpeg" | "image/webp" | "image/x-icon" | "image/svg+xml";

export interface ConversionItem {
    id: string;
    file: File;
    originalSize: number;
    newSize: number;
    convertedDataUrl: string;
    originalWidth: number;
    originalHeight: number;
    targetFormat: ImageFormat;
    status: "pending" | "processing" | "completed" | "error";
    error?: string;
}

export function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

export async function processConversion(
    item: ConversionItem,
    onComplete: (item: ConversionItem, src: string) => void
): Promise<void> {
    item.status = "processing";

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                item.originalWidth = img.width;
                item.originalHeight = img.height;

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = img.width;
                canvas.height = img.height;

                if (ctx) {
                    if (item.targetFormat === "image/jpeg") {
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    ctx.drawImage(img, 0, 0);
                }

                try {
                    const dataUrl = canvas.toDataURL(item.targetFormat, 0.92);
                    item.convertedDataUrl = dataUrl;

                    const head = "data:" + item.targetFormat + ";base64,";
                    item.newSize = Math.round(((dataUrl.length - head.length) * 3) / 4);
                    item.status = "completed";
                } catch (err) {
                    item.status = "error";
                    item.error = "Fallo en la conversión";
                }

                onComplete(item, img.src);
                resolve();
            };
            img.onerror = () => {
                item.status = "error";
                item.error = "Error al cargar imagen";
                onComplete(item, "");
                resolve();
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(item.file);
    });
}

export async function processSvgToRaster(
    item: ConversionItem,
    onComplete: (item: ConversionItem, src: string) => void
): Promise<void> {
    item.status = "processing";

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const svgText = e.target?.result as string;
            const blob = new Blob([svgText], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const scale = 2;
                canvas.width = (img.width || 800) * scale;
                canvas.height = (img.height || 800) * scale;

                if (ctx) {
                    if (item.targetFormat === "image/jpeg") {
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }

                const dataUrl = canvas.toDataURL(item.targetFormat, 0.95);
                item.convertedDataUrl = dataUrl;

                const head = "data:" + item.targetFormat + ";base64,";
                item.newSize = Math.round(((dataUrl.length - head.length) * 3) / 4);
                item.status = "completed";

                URL.revokeObjectURL(url);
                onComplete(item, url);
                resolve();
            };
            img.src = url;
        };
        reader.readAsText(item.file);
    });
}
