export type ImageFormat = "image/png" | "image/jpeg" | "image/webp" | "image/x-icon" | "image/svg+xml" | "image/avif" | "image/gif";

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

async function pngToIcoBase64(pngBase64: string, width: number, height: number): Promise<string> {
    const response = await fetch(pngBase64);
    const arrayBuffer = await response.arrayBuffer();
    const pngArray = new Uint8Array(arrayBuffer);
    const pngSize = pngArray.length;

    const buffer = new Uint8Array(22 + pngSize);

    
    buffer[0] = 0; buffer[1] = 0;
    buffer[2] = 1; buffer[3] = 0;
    buffer[4] = 1; buffer[5] = 0;

    
    buffer[6] = width >= 256 ? 0 : width;
    buffer[7] = height >= 256 ? 0 : height;
    buffer[8] = 0;
    buffer[9] = 0;
    buffer[10] = 1; buffer[11] = 0;
    buffer[12] = 32; buffer[13] = 0;

    
    buffer[14] = pngSize & 0xFF;
    buffer[15] = (pngSize >> 8) & 0xFF;
    buffer[16] = (pngSize >> 16) & 0xFF;
    buffer[17] = (pngSize >> 24) & 0xFF;
    buffer[18] = 22;
    buffer[19] = 0;
    buffer[20] = 0;
    buffer[21] = 0;

    buffer.set(pngArray, 22);

    const blob = new Blob([buffer], { type: "image/x-icon" });
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
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
            img.onload = async () => {
                item.originalWidth = img.width;
                item.originalHeight = img.height;

                try {
                    let dataUrl = "";

                    if (item.targetFormat === "image/x-icon") {
                        
                        let size = Math.min(img.width, img.height);
                        if (size > 256) size = 256;

                        const icoCanvas = document.createElement("canvas");
                        icoCanvas.width = size;
                        icoCanvas.height = size;
                        const icoCtx = icoCanvas.getContext("2d");

                        
                        const sx = (img.width - size) / 2;
                        const sy = (img.height - size) / 2;
                        icoCtx?.drawImage(img, sx, sy, size, size, 0, 0, size, size);

                        const pngBase64 = icoCanvas.toDataURL("image/png");
                        dataUrl = await pngToIcoBase64(pngBase64, size, size);
                    } else {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext("2d");

                        if (ctx) {
                            if (item.targetFormat === "image/jpeg") {
                                ctx.fillStyle = "#FFFFFF";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                            }
                            ctx.drawImage(img, 0, 0);
                        }
                        dataUrl = canvas.toDataURL(item.targetFormat, 0.92);
                    }

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
