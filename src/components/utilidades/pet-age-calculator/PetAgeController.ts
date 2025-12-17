import { PetStrategyFactory } from './strategies';

export class PetAgeCalculatorUI {
    private shareOverlay: HTMLElement | null = null;
    private calculatorContainer: HTMLElement | null = null;

    private sharePetName: HTMLElement | null = null;
    private shareHumanAge: HTMLElement | null = null;
    private shareChronologicalAge: HTMLElement | null = null;
    private shareLifeStage: HTMLElement | null = null;
    private shareIconDog: HTMLElement | null = null;
    private shareIconCat: HTMLElement | null = null;
    private createNewBtn: HTMLElement | null = null;

    private petBtns: NodeListOf<HTMLElement> | null = null;
    private sizeBtns: NodeListOf<HTMLElement> | null = null;
    private dogSizeSelector: HTMLElement | null = null;
    private birthYearInput: HTMLInputElement | null = null;

    private humanAgeDisplay: HTMLElement | null = null;
    private lifeStageDisplay: HTMLElement | null = null;
    private nextMilestoneDisplay: HTMLElement | null = null;
    private resultPetNameSpan: HTMLElement | null = null;
    private shareBtn: HTMLElement | null = null;
    private shareText: HTMLElement | null = null;

    private petNameInput: HTMLInputElement | null = null;

    private petType: string = "dog";
    private dogSize: string = "small";
    private birthYear: number | null = null;
    private petName: string = "";

    constructor() {
        this.init = this.init.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.update = this.update.bind(this);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    public init() {
        this.cacheDOM();
        this.initState();
        this.bindEvents();
        this.checkUrlParams();
        this.update();
    }

    private cacheDOM() {
        this.shareOverlay = document.getElementById("share-overlay");
        this.calculatorContainer = document.getElementById("calculator-container");

        this.sharePetName = document.getElementById("share-pet-name");
        this.shareHumanAge = document.getElementById("share-human-age");
        this.shareChronologicalAge = document.getElementById("share-chronological-age");
        this.shareLifeStage = document.getElementById("share-life-stage");
        this.shareIconDog = document.getElementById("share-icon-dog");
        this.shareIconCat = document.getElementById("share-icon-cat");
        this.createNewBtn = document.getElementById("create-new-btn");

        this.petBtns = document.querySelectorAll(".pet-type-btn");
        this.sizeBtns = document.querySelectorAll(".size-btn");
        this.dogSizeSelector = document.getElementById("dog-size-selector");
        this.birthYearInput = document.getElementById("birth-year-input") as HTMLInputElement;

        this.humanAgeDisplay = document.getElementById("human-age");
        this.lifeStageDisplay = document.getElementById("life-stage");
        this.nextMilestoneDisplay = document.getElementById("next-milestone");

        this.petNameInput = document.getElementById("pet-name") as HTMLInputElement;
        this.resultPetNameSpan = document.getElementById("result-pet-name");
        this.shareBtn = document.getElementById("share-btn");
        this.shareText = document.getElementById("share-text");
    }

    private initState() {
        if (this.birthYearInput) {
            const currentYear = new Date().getFullYear();
            this.birthYearInput.max = currentYear.toString();
        }
    }

    private bindEvents() {
        this.createNewBtn?.addEventListener("click", () => {
            window.location.href = window.location.origin + window.location.pathname;
        });

        this.petNameInput?.addEventListener("input", (e) => {
            this.petName = (e.target as HTMLInputElement).value;
            this.update();
        });

        this.petBtns?.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const target = e.currentTarget as HTMLElement;
                this.petType = target.dataset.type || "dog";

                this.petBtns?.forEach(b => b.classList.remove("active"));
                target.classList.add("active");

                if (this.dogSizeSelector) {
                    this.dogSizeSelector.style.display = this.petType === "dog" ? "block" : "none";
                }
                this.update();
            });
        });

        this.sizeBtns?.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                this.dogSize = (e.currentTarget as HTMLElement).dataset.size || "small";
                this.sizeBtns?.forEach(b => b.classList.remove("active"));
                (e.currentTarget as HTMLElement).classList.add("active");
                this.update();
            });
        });

        this.birthYearInput?.addEventListener("input", this.handleInput);
        this.birthYearInput?.addEventListener("change", this.handleInput);
        this.birthYearInput?.addEventListener("keyup", this.handleInput);

        this.shareBtn?.addEventListener("click", () => this.shareResult());
    }

    private handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        const val = parseInt(input.value);
        const currentYear = new Date().getFullYear();

        if (!isNaN(val) && val > 1900 && val <= currentYear) {
            this.birthYear = val;
            input.classList.remove("border-red-500");
            input.classList.add("border-indigo-500");
        } else {
            this.birthYear = null;
            if (input.value.length === 4) {
                input.classList.add("border-red-500");
                input.classList.remove("border-indigo-500");
            } else {
                input.classList.remove("border-indigo-500", "border-red-500");
            }
        }
        this.update();
    }

    private checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        if (params.has("birthYear") && params.has("type")) {
            if (this.shareOverlay) {
                this.shareOverlay.classList.remove("hidden");
                this.shareOverlay.classList.add("flex");
            }
            document.body.style.overflow = 'hidden';

            if (this.calculatorContainer) this.calculatorContainer.style.display = "none";

            this.petName = params.get("name") || "Tu mascota";
            this.petType = params.get("type") || "dog";
            this.dogSize = params.get("size") || "medium";
            this.birthYear = parseInt(params.get("birthYear") || "0");

            this.renderShareCard();
        } else {
            if (this.shareOverlay) {
                this.shareOverlay.classList.add("hidden");
                this.shareOverlay.classList.remove("flex");
            }
            document.body.style.overflow = '';

            if (this.calculatorContainer) this.calculatorContainer.style.display = "block";
        }
    }

    private update() {
        if (!this.birthYear) {
            if (this.humanAgeDisplay) this.humanAgeDisplay.textContent = "--";
            if (this.lifeStageDisplay) this.lifeStageDisplay.textContent = "---";
            if (this.nextMilestoneDisplay) this.nextMilestoneDisplay.textContent = "---";
            this.updateNameDisplay();
            return;
        }

        const currentYear = new Date().getFullYear();
        const chronologicalAge = currentYear - this.birthYear;

        const strategy = PetStrategyFactory.getStrategy(this.petType);

        const humanAge = strategy.calculateHumanAge(chronologicalAge, this.dogSize);
        const lifeStage = strategy.getLifeStage(humanAge);
        const nextMilestone = strategy.getNextMilestone(chronologicalAge);

        if (this.humanAgeDisplay) this.humanAgeDisplay.textContent = humanAge.toString();
        if (this.lifeStageDisplay) this.lifeStageDisplay.textContent = lifeStage;
        if (this.nextMilestoneDisplay) this.nextMilestoneDisplay.textContent = nextMilestone;

        this.updateNameDisplay();
    }

    private updateNameDisplay() {
        if (this.resultPetNameSpan) {
            if (this.petName.trim() !== "") {
                this.resultPetNameSpan.classList.remove("hidden");
                this.resultPetNameSpan.textContent = this.petName;
            } else {
                this.resultPetNameSpan.classList.add("hidden");
            }
        }
    }

    private renderShareCard() {
        if (!this.birthYear) return;

        const currentYear = new Date().getFullYear();
        const chronologicalAge = currentYear - this.birthYear;
        const strategy = PetStrategyFactory.getStrategy(this.petType);

        const humanAge = strategy.calculateHumanAge(chronologicalAge, this.dogSize);
        const lifeStage = strategy.getLifeStage(humanAge);

        if (this.sharePetName) this.sharePetName.textContent = this.petName;
        if (this.shareHumanAge) this.shareHumanAge.textContent = humanAge.toString();
        if (this.shareChronologicalAge) this.shareChronologicalAge.textContent = chronologicalAge.toString();
        if (this.shareLifeStage) this.shareLifeStage.textContent = lifeStage;

        if (this.shareIconDog && this.shareIconCat) {
            if (this.petType === 'dog') {
                this.shareIconDog.classList.remove('hidden');
                this.shareIconCat.classList.add('hidden');
            } else {
                this.shareIconDog.classList.add('hidden');
                this.shareIconCat.classList.remove('hidden');
            }
        }
    }

    private async shareResult() {
        if (!this.birthYear) {
            if (this.birthYearInput) {
                this.birthYearInput.focus();
                this.birthYearInput.classList.add("ring-4", "ring-red-200");
                setTimeout(() => this.birthYearInput?.classList.remove("ring-4", "ring-red-200"), 500);
            }
            return;
        }

        const params = new URLSearchParams();
        if (this.petName) params.set("name", this.petName);
        params.set("type", this.petType);
        if (this.petType === "dog") params.set("size", this.dogSize);
        params.set("birthYear", this.birthYear.toString());

        const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

        try {
            await navigator.clipboard.writeText(newUrl);

            if (this.shareText) this.shareText.textContent = "¡Copiado! Abriendo tarjeta...";
            if (this.shareBtn) {
                this.shareBtn.classList.add("text-indigo-500", "bg-indigo-50");
                this.shareBtn.classList.remove("text-slate-600", "dark:text-slate-300");
            }

            setTimeout(() => {
                window.location.href = newUrl;
            }, 800);

        } catch (err) {
            console.error('Failed to copy: ', err);
            window.location.href = newUrl;
        }
    }
}
