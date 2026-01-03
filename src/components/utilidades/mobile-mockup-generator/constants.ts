import type { DeviceConfig, Gradient } from "./types";

export const CANVAS_ASPECT = 9 / 16;
export const EXPORT_WIDTH = 1080;
export const EXPORT_HEIGHT = 1920;

export const DEVICES: Record<string, DeviceConfig> = {
    iphone: { width: 430, height: 932, radius: 55, notch: true, name: "iPhone 15 Pro Max", safeAreaTop: 54, safeAreaBottom: 34 },
    pixel: { width: 412, height: 915, radius: 32, notch: false, name: "Google Pixel 8", safeAreaTop: 36, safeAreaBottom: 15 },
};

export const GRADIENTS: Gradient[] = [
    { start: "#6366f1", end: "#a855f7", angle: 135 },
    { start: "#f43f5e", end: "#fb923c", angle: 135 },
    { start: "#0ea5e9", end: "#22c55e", angle: 135 },
    { start: "#8b5cf6", end: "#ec4899", angle: 135 },
    { start: "#1e293b", end: "#475569", angle: 135 },
];

export const GOOGLE_FONTS = ["Inter", "Outfit", "Poppins", "Montserrat", "Playfair Display"];

export const LAYOUT_PRESETS = [
    { name: "Clásico", spacing: 40, textY: 82, textX: 50, textSize: 28, deviceOffsetX: 0, deviceOffsetY: 0, rotation: 0 },
    { name: "Móvil Abajo", spacing: 40, textY: 13, textX: 50, textSize: 28, deviceOffsetX: 0, deviceOffsetY: 8, rotation: 0 },
    { name: "Móvil Arriba", spacing: 40, textY: 89, textX: 50, textSize: 28, deviceOffsetX: 0, deviceOffsetY: -7, rotation: 0 },
    { name: "Enfoque", spacing: 70, textY: 10, textX: 50, textSize: 28, deviceOffsetX: 0, deviceOffsetY: 10, rotation: 0 },
    { name: "Dynamic", spacing: 45, textY: 85, textX: 50, textSize: 28, deviceOffsetX: 0, deviceOffsetY: -5, rotation: -10 },
    { name: "Partida Izq.", spacing: 55, textY: 50, textX: 50, textSize: 28, deviceOffsetX: 40, deviceOffsetY: 0, rotation: 0 },
    { name: "Partida Der.", spacing: 55, textY: 50, textX: 50, textSize: 28, deviceOffsetX: -40, deviceOffsetY: 0, rotation: 0 },
    { name: "Imagen Izq.", spacing: 0, textY: 50, textX: 50, textSize: 44, deviceOffsetX: 50, deviceOffsetY: 0, rotation: -90 },
    { name: "Imagen Der.", spacing: 0, textY: 50, textX: 50, textSize: 44, deviceOffsetX: -50, deviceOffsetY: 0, rotation: 90 },
];
