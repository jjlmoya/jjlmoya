export interface QueueItem {
    id: string;
    file: File;
    originalSize: number;
    newSize: number;
    compressedDataUrl: string;
    originalWidth: number;
    originalHeight: number;
    settings: {
        quality: number;
        width: number | null;
        convertToWebp: boolean;
    };
    isOriginalSelected: boolean;
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

export function processImage(
    item: QueueItem,
    onComplete: (item: QueueItem, src: string) => void
): Promise<void> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                item.originalWidth = img.width;
                item.originalHeight = img.height;

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                let targetW = img.width;
                let targetH = img.height;

                if (item.settings.width && item.settings.width < img.width) {
                    targetW = item.settings.width;
                    targetH = Math.round((img.height / img.width) * targetW);
                }

                canvas.width = targetW;
                canvas.height = targetH;
                ctx?.drawImage(img, 0, 0, targetW, targetH);

                let format = item.file.type || "image/jpeg";

                if (item.settings.convertToWebp) {
                    format = "image/webp";
                } else if (format === "image/png") {
                    item.error = "PNG no soportado sin convertir a WebP";
                    item.compressedDataUrl = "";
                    item.isOriginalSelected = true;
                    onComplete(item, img.src);
                    resolve();
                    return;
                }

                const quality = item.settings.quality / 100;

                const dataUrl = canvas.toDataURL(format, quality);

                const head = "data:" + format + ";base64,";
                const calculatedSize = Math.round(
                    ((dataUrl.length - head.length) * 3) / 4
                );

                if (
                    calculatedSize >= item.originalSize &&
                    format === item.file.type &&
                    targetW === img.width
                ) {
                    item.compressedDataUrl = e.target?.result as string;
                    item.newSize = item.originalSize;
                    item.isOriginalSelected = true;
                } else {
                    item.compressedDataUrl = dataUrl;
                    item.newSize = calculatedSize;
                    item.isOriginalSelected = false;
                }

                onComplete(item, img.src);
                resolve();
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(item.file);
    });
}
