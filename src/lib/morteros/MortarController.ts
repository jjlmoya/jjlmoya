import { MortarCalculator, VITRUVIAN_PHASES } from "./MortarCalculator";
import type { MortarState, PhaseKey, MaterialType } from "./types";

export class MortarController {
    private state: MortarState = {
        phase: "trullissatio",
        materialType: "cal",
        calType: "pasta",
        materialKg: 150,
    };

    private elements: {
        columnSections: NodeListOf<Element>;
        phaseName: HTMLElement | null;
        phaseDesc: HTMLElement | null;
        materialBtns: NodeListOf<Element>;
        calTypeSwitch: HTMLInputElement | null;
        calTypeContainer: HTMLElement | null;
        materialSlider: HTMLInputElement | null;
        quantityValue: HTMLElement | null;
        sackPile: HTMLElement | null;
        mortarCoverage: HTMLElement | null;
        mortarTexture: HTMLElement | null;
        coverageValue: HTMLElement | null;
        thicknessValue: HTMLElement | null;
        layersValue: HTMLElement | null;
        complementaryLabel: HTMLElement | null;
        complementaryValue: HTMLElement | null;
        ratioDisplay: HTMLElement | null;
        grainCards: NodeListOf<Element>;
    };

    constructor() {
        console.log("MortarController constructor called");
        this.elements = {
            columnSections: document.querySelectorAll(".column-section"),
            phaseName: document.getElementById("phase-name"),
            phaseDesc: document.getElementById("phase-desc"),
            materialBtns: document.querySelectorAll(".material-btn"),
            calTypeSwitch: document.getElementById("cal-type-switch") as HTMLInputElement,
            calTypeContainer: document.getElementById("cal-type-container"),
            materialSlider: document.getElementById("material-slider") as HTMLInputElement,
            quantityValue: document.getElementById("quantity-value"),
            sackPile: document.getElementById("sack-pile"),
            mortarCoverage: document.getElementById("mortar-coverage"),
            mortarTexture: document.getElementById("mortar-texture"),
            coverageValue: document.getElementById("coverage-value"),
            thicknessValue: document.getElementById("thickness-value"),
            layersValue: document.getElementById("layers-value"),
            complementaryLabel: document.getElementById("complementary-label"),
            complementaryValue: document.getElementById("complementary-value"),
            ratioDisplay: document.getElementById("ratio-display"),
            grainCards: document.querySelectorAll(".grain-card"),
        };

        this.init();
    }

    private init() {
        this.attachEventListeners();
        this.updateUI();
    }

    private attachEventListeners() {
        this.elements.columnSections.forEach((section) => {
            section.addEventListener("click", () => {
                const phase = section.getAttribute("data-phase");
                if (phase) {
                    this.state.phase = phase as PhaseKey;
                    this.updateUI();
                }
            });
        });

        this.elements.materialBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const material = btn.getAttribute("data-material");
                if (material) {
                    this.state.materialType = material as MaterialType;
                    this.updateUI();
                }
            });
        });

        if (this.elements.calTypeSwitch) {
            this.elements.calTypeSwitch.addEventListener("change", (e) => {
                const target = e.target as HTMLInputElement;
                this.state.calType = target.checked ? "polvo" : "pasta";
                this.updateUI();
            });
        }

        if (this.elements.materialSlider) {
            this.elements.materialSlider.addEventListener("input", (e) => {
                const target = e.target as HTMLInputElement;
                this.state.materialKg = parseInt(target.value);
                this.updateUI();
            });
        }
    }

    private updateUI() {
        const phase = VITRUVIAN_PHASES[this.state.phase];
        const result = MortarCalculator.calculate(this.state);

        // Update phase info
        if (this.elements.phaseName) this.elements.phaseName.textContent = phase.name;
        if (this.elements.phaseDesc) this.elements.phaseDesc.textContent = phase.description;

        // Update column selection
        this.elements.columnSections.forEach((section) => {
            const sectionPhase = section.getAttribute("data-phase");
            if (sectionPhase === this.state.phase) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // Update material buttons
        this.elements.materialBtns.forEach((btn) => {
            const material = btn.getAttribute("data-material");
            if (material === this.state.materialType) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Show/hide cal type toggle
        if (this.elements.calTypeContainer) {
            this.elements.calTypeContainer.style.display =
                this.state.materialType === "cal" ? "block" : "none";
        }

        // Update quantity display
        if (this.elements.quantityValue)
            this.elements.quantityValue.textContent = this.state.materialKg.toString();

        // Update sack pile visualization
        this.updateSackPile();

        // Update coverage display
        if (this.elements.coverageValue)
            this.elements.coverageValue.textContent = result.coverageArea.toFixed(1);

        // Update wall visualization
        this.updateWallVisualization(result.coverageArea);

        // Update complementary material
        if (this.elements.complementaryLabel)
            this.elements.complementaryLabel.textContent = result.complementaryName;
        if (this.elements.complementaryValue)
            this.elements.complementaryValue.textContent = Math.round(
                result.complementaryAmount
            ).toString();
        if (this.elements.ratioDisplay)
            this.elements.ratioDisplay.textContent = result.ratioText;

        // Update technical details
        if (this.elements.thicknessValue)
            this.elements.thicknessValue.textContent = `${phase.thickness} mm`;
        if (this.elements.layersValue)
            this.elements.layersValue.textContent = `${phase.layers} ${phase.layers === 1 ? "mano" : "manos"}`;

        // Update granulometry cards highlighting
        this.updateGranulometryCards();
    }

    private updateGranulometryCards() {
        this.elements.grainCards.forEach((card) => {
            const grainType = card.getAttribute("data-grain-type");
            if (grainType === this.state.phase) {
                card.classList.add("active");
            } else {
                card.classList.remove("active");
            }
        });
    }

    private updateSackPile() {
        if (!this.elements.sackPile) return;

        const totalSacks = this.state.materialKg / 25;
        const fullSacks = Math.floor(totalSacks);
        const hasHalfSack = totalSacks - fullSacks >= 0.25;

        let svg = "";
        const sackWidth = 40;
        const sackHeight = 50;
        const cols = 4;

        // Draw full sacks
        for (let i = 0; i < fullSacks; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = 30 + col * (sackWidth + 10);
            const y = 150 - row * (sackHeight - 10);

            svg += `
                <rect x="${x}" y="${y}" width="${sackWidth}" height="${sackHeight}" 
                      fill="${this.state.materialType === "cal" ? "#f5f5f5" : "#e6c288"}" 
                      stroke="#333" stroke-width="1.5" rx="3"/>
                <line x1="${x + 5}" y1="${y + 15}" x2="${x + sackWidth - 5}" y2="${y + 15}" 
                      stroke="#333" stroke-width="1" opacity="0.3"/>
                <line x1="${x + 5}" y1="${y + 25}" x2="${x + sackWidth - 5}" y2="${y + 25}" 
                      stroke="#333" stroke-width="1" opacity="0.3"/>
            `;
        }

        // Draw half sack if needed
        if (hasHalfSack) {
            const i = fullSacks;
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = 30 + col * (sackWidth + 10);
            const y = 150 - row * (sackHeight - 10);

            const halfColor = this.state.materialType === "cal" ? "#f5f5f5" : "#e6c288";
            const lightColor = this.state.materialType === "cal" ? "#fafafa" : "#f0d5a8";

            svg += `
                <defs>
                    <clipPath id="half-sack-clip">
                        <polygon points="${x},${y} ${x + sackWidth},${y} ${x + sackWidth},${y + sackHeight} ${x},${y + sackHeight / 2}" />
                    </clipPath>
                </defs>
                <rect x="${x}" y="${y}" width="${sackWidth}" height="${sackHeight}" 
                      fill="${lightColor}" 
                      stroke="#333" stroke-width="1.5" stroke-dasharray="3,3" rx="3"/>
                <rect x="${x}" y="${y}" width="${sackWidth}" height="${sackHeight}" 
                      fill="${halfColor}" 
                      clip-path="url(#half-sack-clip)"
                      stroke="none"/>
                <line x1="${x}" y1="${y + sackHeight / 2}" x2="${x + sackWidth}" y2="${y + sackHeight}" 
                      stroke="#333" stroke-width="1.5"/>
                <line x1="${x + 5}" y1="${y + 15}" x2="${x + sackWidth - 5}" y2="${y + 15}" 
                      stroke="#333" stroke-width="1" opacity="0.3"/>
            `;
        }

        this.elements.sackPile.innerHTML = svg;
    }

    private updateWallVisualization(coverage: number) {
        if (!this.elements.mortarCoverage || !this.elements.mortarTexture) return;

        const phase = VITRUVIAN_PHASES[this.state.phase];
        const maxCoverage = 50;
        const coverageRatio = Math.min(coverage / maxCoverage, 1);

        const maxWidth = 300;
        const maxHeight = 400;
        const width = maxWidth * Math.sqrt(coverageRatio);
        const height = maxHeight * Math.sqrt(coverageRatio);

        const x = (maxWidth - width) / 2;
        const y = (maxHeight - height) / 2;

        this.elements.mortarCoverage.setAttribute("x", x.toString());
        this.elements.mortarCoverage.setAttribute("y", y.toString());
        this.elements.mortarCoverage.setAttribute("width", width.toString());
        this.elements.mortarCoverage.setAttribute("height", height.toString());
        this.elements.mortarCoverage.setAttribute("fill", phase.color);

        this.elements.mortarTexture.setAttribute("x", x.toString());
        this.elements.mortarTexture.setAttribute("y", y.toString());
        this.elements.mortarTexture.setAttribute("width", width.toString());
        this.elements.mortarTexture.setAttribute("height", height.toString());
        this.elements.mortarTexture.setAttribute("fill", `url(#${phase.texture})`);
    }
}
