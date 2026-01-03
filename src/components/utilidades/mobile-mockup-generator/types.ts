export interface DeviceConfig {
    width: number;
    height: number;
    radius: number;
    notch: boolean;
    name: string;
    safeAreaTop: number;
    safeAreaBottom: number;
}

export interface MockupVariant {
    id: string;
    language: string;
    dataUrl: string;
}

export interface MockupSettings {
    text: string;
    spacing: number;
    textSize: number;
    textColor: string;
    textRotation: number;
    textY: number;
    textX: number;
    deviceOffsetX: number;
    deviceOffsetY: number;
    bgImage?: string | null;
}

export interface MockupImage {
    id: string;
    variants: MockupVariant[];
    activeVariantId: string;
    settings: MockupSettings;
}

export interface Gradient {
    start: string;
    end: string;
    angle: number;
}
