import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Store } from "./store";
import { RenderingEngine } from "./rendering";
import {
    DEVICES,
    GRADIENTS,
    GOOGLE_FONTS,
    EXPORT_WIDTH,
    EXPORT_HEIGHT,
    LAYOUT_PRESETS,
} from "./constants";
import type { MockupImage, MockupVariant } from "./types";

export class App {
    store = new Store();
    currentTargetId: string | null = null;
    isAddingVariant: boolean = false;
    isReplacingBackground: boolean = false;

    uploadInput = document.getElementById("imageUpload") as HTMLInputElement;
    previewGrid = document.getElementById("previewGrid")!;
    emptyState = document.getElementById("emptyState")!;
    fontSelect = document.getElementById("fontSelect") as HTMLSelectElement;
    gradientStart = document.getElementById("gradientStart") as HTMLInputElement;
    gradientEnd = document.getElementById("gradientEnd") as HTMLInputElement;
    gradientAngle = document.getElementById("gradientAngle") as HTMLInputElement;
    angleValue = document.getElementById("angleValue")!;
    gradientPresets = document.getElementById("gradientPresets")!;
    downloadBtn = document.getElementById("downloadAll")!;
    clearBtn = document.getElementById("clearAll")!;
    deviceBtns = document.querySelectorAll("[data-device]");
    replaceInput = document.getElementById("replaceInput") as HTMLInputElement;
    safeAreaToggle = document.getElementById("safeAreaToggle")!;
    safeAreaDot = document.getElementById("safeAreaDot")!;
    safeAreaColorInput = document.getElementById("safeAreaColor") as HTMLInputElement;
    massReplaceBtn = document.getElementById("massReplaceBtn")!;
    massReplaceInput = document.getElementById("massReplaceInput") as HTMLInputElement;

    constructor() {
        this.init();
    }

    async init() {
        this.loadFonts();
        this.setupEventListeners();
        this.syncUIWithStore();
        this.renderPresets();
        this.updateVisibility();
        this.renderGrid();

        (window as any).clearBg = (id: string) => {
            const img = this.store.images.find((i) => i.id === id);
            if (img) {
                img.settings.bgImage = null;
                this.store.save();
                this.renderGrid();
            }
        };
    }

    setupEventListeners() {
        this.uploadInput.addEventListener("change", (e) => this.handleUpload(e));

        this.fontSelect.addEventListener("change", () => {
            this.store.font = this.fontSelect.value;
            this.store.save();
            this.renderGrid();
        });

        this.gradientStart.addEventListener("input", () => this.updateColors());
        this.gradientEnd.addEventListener("input", () => this.updateColors());
        this.gradientAngle.addEventListener("input", () => {
            this.angleValue.textContent = `${this.gradientAngle.value}°`;
            this.updateColors();
        });

        document.getElementById("swapColors")?.addEventListener("click", () => {
            const tmp = this.gradientStart.value;
            this.gradientStart.value = this.gradientEnd.value;
            this.gradientEnd.value = tmp;
            this.updateColors();
        });

        this.deviceBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.store.device = (btn as HTMLElement).dataset.device || "iphone";
                this.store.save();
                this.updateDeviceButtons();
                this.renderGrid();
            });
        });

        this.clearBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de eliminar todos los mockups?")) {
                this.store.images = [];
                this.store.save();
                this.updateVisibility();
                this.renderGrid();
            }
        });

        this.downloadBtn.addEventListener("click", () => this.exportZip());

        this.safeAreaToggle.addEventListener("click", () => {
            this.store.showSafeArea = !this.store.showSafeArea;
            this.store.save();
            this.updateSafeAreaUI();
            this.renderGrid();
        });

        this.safeAreaColorInput.addEventListener("input", () => {
            this.store.safeAreaColor = this.safeAreaColorInput.value;
            this.store.save();
            this.renderGrid();
        });

        this.massReplaceBtn.addEventListener("click", () => this.massReplaceInput.click());
        this.massReplaceInput.addEventListener("change", (e) => this.handleMassReplace(e));

        this.previewGrid.addEventListener("input", (e) => {
            const target = e.target as HTMLElement;
            const id = target.dataset.imgId;
            const type = target.dataset.type;
            const img = this.store.images.find((i) => i.id === id);

            if (img && type) {
                const input = target as HTMLInputElement;
                if (type === "text") img.settings.text = (target as HTMLTextAreaElement).value;
                if (type === "spacing") img.settings.spacing = parseInt(input.value);
                if (type === "textSize") img.settings.textSize = parseInt(input.value);
                if (type === "textRotation") img.settings.textRotation = parseInt(input.value);
                if (type === "textY") img.settings.textY = parseInt(input.value);
                if (type === "textX") img.settings.textX = parseInt(input.value);
                if (type === "textColor") img.settings.textColor = input.value;
                if (type === "deviceOffsetX") img.settings.deviceOffsetX = parseInt(input.value);
                if (type === "deviceOffsetY") img.settings.deviceOffsetY = parseInt(input.value);

                const label = this.previewGrid.querySelector(`[data-label-for="${type}-${id}"]`);
                if (label) {
                    const suffix = type === "textSize" ? "px" : type === "textRotation" ? "°" : "%";
                    label.textContent = `${input.value}${suffix}`;
                }

                this.refreshSingle(img);
                this.store.save();
            }
        });

        this.previewGrid.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            const deleteBtn = target.closest(".delete-img");
            const duplicateBtn = target.closest(".duplicate-img");
            const addVariantBtn = target.closest(".add-variant-btn");
            const variantTab = target.closest(".variant-tab");
            const deleteVariant = target.closest(".delete-variant");

            if (deleteBtn) {
                const id = (deleteBtn as HTMLElement).dataset.imgId;
                this.store.images = this.store.images.filter((i) => i.id !== id);
                this.store.save();
                this.updateVisibility();
                this.renderGrid();
            }

            if (duplicateBtn) {
                const id = (duplicateBtn as HTMLElement).dataset.imgId;
                const originalIndex = this.store.images.findIndex((img) => img.id === id);
                const original = this.store.images[originalIndex];
                if (original) {
                    const copy: MockupImage = {
                        ...original,
                        id: Math.random().toString(36).substr(2, 9),
                        settings: { ...original.settings },
                        variants: original.variants.map((v) => ({
                            ...v,
                            id: Math.random().toString(36).substr(2, 9),
                        })),
                    };
                    this.store.images.splice(originalIndex + 1, 0, copy);
                    this.store.save();
                    this.renderGrid();
                }
            }

            const replaceBtn = target.closest(".replace-img-btn");
            if (replaceBtn) {
                this.currentTargetId = (replaceBtn as HTMLElement).dataset.imgId || null;
                this.isAddingVariant = false;
                this.isReplacingBackground = false;
                this.replaceInput.click();
            }

            const replaceBgBtn = target.closest(".replace-bg-btn");
            if (replaceBgBtn) {
                this.currentTargetId = (replaceBgBtn as HTMLElement).dataset.imgId || null;
                this.isAddingVariant = false;
                this.isReplacingBackground = true;
                this.replaceInput.click();
            }

            if (addVariantBtn) {
                this.currentTargetId = (addVariantBtn as HTMLElement).dataset.imgId || null;
                this.isAddingVariant = true;
                this.isReplacingBackground = false;
                this.replaceInput.click();
            }

            if (variantTab && !deleteVariant) {
                const imgId = (variantTab as HTMLElement).dataset.imgId;
                const varId = (variantTab as HTMLElement).dataset.varId;
                const img = this.store.images.find((i) => i.id === imgId);
                if (img && varId) {
                    img.activeVariantId = varId;
                    this.renderGrid();
                }
            }

            if (deleteVariant) {
                const imgId = (deleteVariant as HTMLElement).dataset.imgId;
                const varId = (deleteVariant as HTMLElement).dataset.varId;
                const img = this.store.images.find((i) => i.id === imgId);
                if (img && varId && img.variants.length > 1) {
                    img.variants = img.variants.filter((v) => v.id !== varId);
                    if (img.activeVariantId === varId) img.activeVariantId = img.variants[0].id;
                    this.store.save();
                    this.renderGrid();
                }
            }

            const resetText = target.closest(".reset-text-btn");
            if (resetText) {
                const id = (resetText as HTMLElement).dataset.imgId;
                const img = this.store.images.find((i) => i.id === id);
                if (img) {
                    img.settings.textSize = 28;
                    img.settings.textY = 82;
                    img.settings.textX = 50;
                    img.settings.textRotation = 0;
                    img.settings.textColor = "#ffffff";
                    this.store.save();
                    this.renderGrid();
                }
            }

            const resetDevice = target.closest(".reset-device-btn");
            if (resetDevice) {
                const id = (resetDevice as HTMLElement).dataset.imgId;
                const img = this.store.images.find((i) => i.id === id);
                if (img) {
                    img.settings.spacing = 40;
                    img.settings.deviceOffsetX = 0;
                    img.settings.deviceOffsetY = 0;
                    this.store.save();
                    this.renderGrid();
                }
            }

            const presetBtn = target.closest(".layout-preset-btn");
            if (presetBtn) {
                const id = (presetBtn as HTMLElement).dataset.imgId;
                const index = parseInt((presetBtn as HTMLElement).dataset.presetIndex || "0");
                const img = this.store.images.find((i) => i.id === id);
                const preset = LAYOUT_PRESETS[index];
                if (img && preset) {
                    img.settings.spacing = preset.spacing;
                    img.settings.textY = preset.textY;
                    img.settings.textX = preset.textX;
                    img.settings.textSize = (preset as any).textSize || img.settings.textSize;
                    img.settings.deviceOffsetX = preset.deviceOffsetX;
                    img.settings.deviceOffsetY = preset.deviceOffsetY;
                    img.settings.textRotation = preset.rotation;
                    this.store.save();
                    this.renderGrid();
                }
            }
        });

        this.replaceInput.addEventListener("change", async (e) => {
            if (!this.currentTargetId) return;
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const dataUrl = await this.readFile(file);
            const img = this.store.images.find((i) => i.id === this.currentTargetId);
            if (img) {
                if (this.isReplacingBackground) {
                    img.settings.bgImage = dataUrl;
                } else if (this.isAddingVariant) {
                    const existingLangs = img.variants.map((v) => v.language);
                    let newLang = "EN";
                    if (existingLangs.includes("EN")) newLang = "FR";
                    if (existingLangs.includes("FR")) newLang = "DE";
                    if (existingLangs.includes("DE")) newLang = "IT";
                    if (existingLangs.includes(newLang)) newLang = `V${img.variants.length + 1}`;

                    const newVariant: MockupVariant = {
                        id: Math.random().toString(36).substr(2, 9),
                        language: newLang,
                        dataUrl: dataUrl,
                    };
                    img.variants.push(newVariant);
                    img.activeVariantId = newVariant.id;
                } else {
                    const variant =
                        img.variants.find((v) => v.id === img.activeVariantId) || img.variants[0];
                    if (variant) {
                        variant.dataUrl = dataUrl;
                    }
                }
                this.store.save();
                this.renderGrid();
            }
            this.replaceInput.value = "";
            this.currentTargetId = null;
        });
    }

    async handleUpload(e: Event) {
        const files = (e.target as HTMLInputElement).files;
        if (!files) return;

        for (const file of Array.from(files)) {
            const dataUrl = await this.readFile(file);
            const variantId = Math.random().toString(36).substr(2, 9);
            this.store.images.push({
                id: Math.random().toString(36).substr(2, 9),
                variants: [
                    {
                        id: variantId,
                        language: "ES",
                        dataUrl: dataUrl,
                    },
                ],
                activeVariantId: variantId,
                settings: {
                    text: "",
                    spacing: 40,
                    textSize: 28,
                    textColor: "#ffffff",
                    textRotation: 0,
                    textY: 82,
                    textX: 50,
                    deviceOffsetX: 0,
                    deviceOffsetY: 0,
                    bgImage: null,
                },
            });
        }

        this.store.save();
        this.updateVisibility();
        this.renderGrid();
    }

    async handleMassReplace(e: Event) {
        const files = (e.target as HTMLInputElement).files;
        if (!files) return;

        const fileList = Array.from(files);
        for (let i = 0; i < fileList.length; i++) {
            const dataUrl = await this.readFile(fileList[i]);

            if (this.store.images[i]) {
                const img = this.store.images[i];
                const variant =
                    img.variants.find((v) => v.id === img.activeVariantId) || img.variants[0];
                if (variant) {
                    variant.dataUrl = dataUrl;
                }
            } else {
                const variantId = Math.random().toString(36).substr(2, 9);
                this.store.images.push({
                    id: Math.random().toString(36).substr(2, 9),
                    variants: [
                        {
                            id: variantId,
                            language: "ES",
                            dataUrl: dataUrl,
                        },
                    ],
                    activeVariantId: variantId,
                    settings: {
                        text: "",
                        spacing: 40,
                        textSize: 28,
                        textColor: "#ffffff",
                        textRotation: 0,
                        textY: 82,
                        textX: 50,
                        deviceOffsetX: 0,
                        deviceOffsetY: 0,
                        bgImage: null,
                    },
                });
            }
        }

        this.store.save();
        this.updateVisibility();
        this.renderGrid();
        this.massReplaceInput.value = "";
    }

    updateColors() {
        this.store.gradient = {
            start: this.gradientStart.value,
            end: this.gradientEnd.value,
            angle: parseInt(this.gradientAngle.value),
        };
        this.store.save();
        this.refreshAll();
    }

    updateSafeAreaUI() {
        if (this.store.showSafeArea) {
            this.safeAreaToggle.classList.replace("bg-slate-200", "bg-indigo-600");
            this.safeAreaToggle.classList.replace("dark:bg-slate-800", "bg-indigo-600");
            this.safeAreaDot.style.transform = "translateX(1.25rem)";
        } else {
            this.safeAreaToggle.classList.replace("bg-indigo-600", "bg-slate-200");
            this.safeAreaDot.style.transform = "translateX(0)";
        }
    }

    syncUIWithStore() {
        this.fontSelect.value = this.store.font;
        this.gradientStart.value = this.store.gradient.start;
        this.gradientEnd.value = this.store.gradient.end;
        this.gradientAngle.value = this.store.gradient.angle.toString();
        this.angleValue.textContent = `${this.store.gradient.angle}°`;
        this.safeAreaColorInput.value = this.store.safeAreaColor;
        this.updateSafeAreaUI();
        this.updateDeviceButtons();
    }

    updateDeviceButtons() {
        this.deviceBtns.forEach((btn) => {
            const isActive = (btn as HTMLElement).dataset.device === this.store.device;
            btn.classList.toggle("active", isActive);
        });
    }

    renderPresets() {
        this.gradientPresets.innerHTML = GRADIENTS.map(
            (g) => `
            <button 
                class="w-full aspect-square rounded-lg border-2 border-transparent hover:scale-110 transition-transform shadow-sm"
                style="background: linear-gradient(135deg, ${g.start}, ${g.end})"
                data-start="${g.start}" data-end="${g.end}"
            ></button>
        `
        ).join("");

        this.gradientPresets.querySelectorAll("button").forEach((btn) => {
            btn.addEventListener("click", () => {
                this.gradientStart.value = btn.dataset.start!;
                this.gradientEnd.value = btn.dataset.end!;
                this.updateColors();
            });
        });
    }

    updateVisibility() {
        const hasImages = this.store.images.length > 0;
        this.emptyState.classList.toggle("hidden", hasImages);
        this.previewGrid.classList.toggle("hidden", !hasImages);
        this.downloadBtn.classList.toggle("hidden", !hasImages);
        this.clearBtn.classList.toggle("hidden", !hasImages);
    }

    renderGrid() {
        this.previewGrid.innerHTML = this.store.images
            .map((img) => {
                const activeVariant =
                    img.variants.find((v) => v.id === img.activeVariantId) || img.variants[0];
                return `
            <div class="glass-card rounded-[2.5rem] p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative group/card">
                <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                    <button data-img-id="${img.id}" class="duplicate-img p-2 bg-white dark:bg-slate-900 shadow-lg rounded-xl hover:scale-110 transition-transform text-indigo-600" title="Duplicar Escena">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    </button>
                    <button data-img-id="${img.id}" class="replace-img-btn p-2 bg-white dark:bg-slate-900 shadow-lg rounded-xl hover:scale-110 transition-transform text-amber-600" title="Sustituir Captura Actual">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </button>
                </div>

                <div class="aspect-[9/16] bg-slate-100 dark:bg-slate-900/50 rounded-3xl overflow-hidden shadow-inner ring-1 ring-slate-200 dark:ring-slate-800 relative">
                    <canvas id="canvas-${img.id}" class="w-full h-full object-contain"></canvas>
                </div>
                
                <div class="space-y-6">
                    <!-- Layout Presets Section -->
                    <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                        <h4 class="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Layouts Maestros</h4>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            ${LAYOUT_PRESETS.map(
                                (p, idx) => `
                                <button 
                                    data-img-id="${img.id}" 
                                    data-preset-index="${idx}"
                                    class="layout-preset-btn px-2 py-2.5 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-indigo-950/20 hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:text-indigo-600 transition-all leading-tight active:scale-95"
                                >
                                    ${p.name}
                                </button>
                            `
                            ).join("")}
                        </div>
                    </div>

                    <!-- Text Section -->
                    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                        <div class="flex items-center justify-between">
                            <h4 class="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Branding & Copys</h4>
                            <button data-img-id="${img.id}" class="reset-text-btn p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all" title="Resetear Texto">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </button>
                        </div>
                        
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex-1">
                                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block ml-1">Color</label>
                                <div class="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
                                    <input 
                                        type="color" 
                                        value="${img.settings.textColor}" 
                                        data-img-id="${img.id}" 
                                        data-type="textColor"
                                        class="w-6 h-6 rounded-lg cursor-pointer border-none bg-transparent"
                                    />
                                    <span class="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">${img.settings.textColor.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <textarea 
                                data-img-id="${img.id}" 
                                data-type="text"
                                placeholder="Escribe el copy aquí..."
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:border-indigo-500 transition-all font-medium min-h-[80px] resize-none"
                            >${img.settings.text}</textarea>
                        </div>

                        <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                            ${this.renderRangeInput(img, "textSize", "Tamaño", 10, 120, "px")}
                            ${this.renderRangeInput(img, "textX", "Eje X", 0, 100, "%")}
                            ${this.renderRangeInput(img, "textY", "Eje Y", 0, 100, "%")}
                            ${this.renderRangeInput(img, "textRotation", "Giro", -90, 90, "°")}
                        </div>
                    </div>

                    <!-- Device Section -->
                    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                        <div class="flex items-center justify-between">
                            <h4 class="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Layout Dispositivo</h4>
                            <button data-img-id="${img.id}" class="reset-device-btn p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all" title="Resetear Posición">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </button>
                        </div>

                        <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                            ${this.renderRangeInput(img, "spacing", "Escala", 0, 100, "%")}
                            ${this.renderRangeInput(img, "deviceOffsetX", "Eje X", -50, 50, "%")}
                            ${this.renderRangeInput(img, "deviceOffsetY", "Eje Y", -50, 50, "%")}
                        </div>
                    </div>

                    <!-- Scene Section -->
                    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                        <h4 class="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Atrezzo & Fondo</h4>
                        <div class="flex gap-2">
                            <button 
                                data-img-id="${img.id}"
                                class="replace-bg-btn flex-1 py-2 text-[10px] font-bold tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all uppercase flex items-center justify-center gap-2"
                            >
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                Fondo Especial
                            </button>
                            ${
                                img.settings.bgImage
                                    ? `
                                <button 
                                    data-img-id="${img.id}"
                                    onclick="window.clearBg('${img.id}')"
                                    class="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            `
                                    : ""
                            }
                        </div>
                    </div>

                    <button 
                        data-img-id="${img.id}"
                        class="delete-img w-full py-3 text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all uppercase"
                    >
                        Eliminar Escena
                    </button>
                </div>
            </div>
        `;
            })
            .join("");

        this.refreshAll();
    }

    renderRangeInput(
        img: MockupImage,
        type: string,
        label: string,
        min: number,
        max: number,
        suffix: string
    ) {
        const val = (img.settings as any)[type];
        return `
            <div class="space-y-1">
                <div class="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>${label}</span>
                    <span data-label-for="${type}-${img.id}">${val}${suffix}</span>
                </div>
                <input 
                    type="range" min="${min}" max="${max}" value="${val}" 
                    data-img-id="${img.id}" data-type="${type}"
                    class="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            </div>
        `;
    }

    refreshAll() {
        this.store.images.forEach((img) => this.refreshSingle(img));
    }

    refreshSingle(image: MockupImage) {
        const canvas = document.getElementById(`canvas-${image.id}`) as HTMLCanvasElement;
        if (!canvas) return;

        const variant =
            image.variants.find((v) => v.id === image.activeVariantId) || image.variants[0];
        if (!variant) return;

        RenderingEngine.drawMockup(canvas, image, variant.dataUrl, DEVICES[this.store.device], {
            gradient: this.store.gradient,
            font: this.store.font,
            safeArea: {
                show: this.store.showSafeArea,
                color: this.store.safeAreaColor,
            },
        });
    }

    async exportZip() {
        const zip = new JSZip();
        const originalHTML = this.downloadBtn.innerHTML;
        this.downloadBtn.innerHTML = `Procesando...`;
        this.downloadBtn.setAttribute("disabled", "true");

        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = EXPORT_WIDTH;
        offscreenCanvas.height = EXPORT_HEIGHT;

        for (let i = 0; i < this.store.images.length; i++) {
            const img = this.store.images[i];
            for (const variant of img.variants) {
                await RenderingEngine.drawMockup(
                    offscreenCanvas,
                    img,
                    variant.dataUrl,
                    DEVICES[this.store.device],
                    {
                        gradient: this.store.gradient,
                        font: this.store.font,
                        safeArea: {
                            show: this.store.showSafeArea,
                            color: this.store.safeAreaColor,
                        },
                    },
                    true
                );

                const blob = await new Promise<Blob>((resolve) =>
                    offscreenCanvas.toBlob((b) => resolve(b!), "image/png", 1.0)
                );
                const variantSuffix =
                    img.variants.length > 1 ? `-${variant.language.toUpperCase()}` : "";
                zip.file(`mockup-${i + 1}${variantSuffix}.png`, blob);
            }
        }

        const timestamp = new Date()
            .toISOString()
            .replace(/[:\-]|\..+/g, "")
            .replace("T", "_");
        const deviceTag = this.store.device === "iphone" ? "ios" : "android";
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${timestamp}-store-mocks-${deviceTag}.zip`);

        this.downloadBtn.innerHTML = `Listo!`;
        setTimeout(() => {
            this.downloadBtn.innerHTML = originalHTML;
            this.downloadBtn.removeAttribute("disabled");
        }, 2000);
    }

    readFile(file: File): Promise<string> {
        return new Promise((r) => {
            const reader = new FileReader();
            reader.onload = (e) => r(e.target?.result as string);
            reader.readAsDataURL(file);
        });
    }

    loadFonts() {
        GOOGLE_FONTS.forEach((f) => {
            const link = document.createElement("link");
            link.href = `https://fonts.googleapis.com/css2?family=${f.replace(
                " ",
                "+"
            )}:wght@400;700&display=swap`;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        });
    }
}
