import type { MockupImage, Gradient } from "./types";

export class Store {
    images: MockupImage[] = [];
    device: string = "iphone";
    font: string = "Inter";
    gradient: Gradient = {
        start: "#6366f1",
        end: "#a855f7",
        angle: 135,
    };
    showSafeArea: boolean = false;
    safeAreaColor: string = "#000000";

    constructor() {
        this.load();
    }

    save() {
        try {
            localStorage.setItem(
                "mockup_pro_settings",
                JSON.stringify({
                    device: this.device,
                    font: this.font,
                    gradient: this.gradient,
                    showSafeArea: this.showSafeArea,
                    safeAreaColor: this.safeAreaColor,
                    images: this.images,
                })
            );
        } catch (e) {
            console.warn("Storage limit exceeded, settings not saved to disk", e);
        }
    }

    load() {
        const saved = localStorage.getItem("mockup_pro_settings");
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.device = data.device || "iphone";
                this.font = data.font || "Inter";
                this.showSafeArea = !!data.showSafeArea;
                this.safeAreaColor = data.safeAreaColor || "#000000";
                if (data.gradient) {
                    this.gradient = {
                        start: data.gradient.start || this.gradient.start,
                        end: data.gradient.end || this.gradient.end,
                        angle: typeof data.gradient.angle === "number" ? data.gradient.angle : 135,
                    };
                }

                this.images = (data.images || []).map((img: any) => {
                    if (!img.variants) {
                        const variantId = Math.random().toString(36).substr(2, 9);
                        return {
                            id: img.id,
                            variants: [
                                {
                                    id: variantId,
                                    language: img.language || "ES",
                                    dataUrl: img.dataUrl,
                                },
                            ],
                            activeVariantId: variantId,
                            settings: {
                                ...img.settings,
                                deviceOffsetX: img.settings.deviceOffsetX || 0,
                                deviceOffsetY: img.settings.deviceOffsetY || 0,
                                bgImage: img.settings.bgImage || null,
                            },
                        };
                    }

                    img.settings.deviceOffsetX = img.settings.deviceOffsetX || 0;
                    img.settings.deviceOffsetY = img.settings.deviceOffsetY || 0;
                    img.settings.textX = img.settings.textX || 50;
                    img.settings.bgImage = img.settings.bgImage || null;
                    return img;
                });
            } catch (e) {
                console.error("Error loading store", e);
            }
        }
    }
}
