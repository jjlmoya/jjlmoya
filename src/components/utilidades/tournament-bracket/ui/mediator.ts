export class TournamentUIMediator {
    setupView: HTMLElement | null;
    bracketView: HTMLElement | null;
    activeControls: HTMLElement | null;

    inputName: HTMLInputElement | null;
    inputPlayer: HTMLInputElement | null;
    btnAdd: HTMLButtonElement | null;
    btnGenerate: HTMLButtonElement | null;
    btnReset: HTMLButtonElement | null;
    btnClearPlayers: HTMLButtonElement | null;
    btnNextMatch: HTMLButtonElement | null;

    titleDisplay: HTMLElement | null;
    dateDisplay: HTMLElement | null;

    constructor() {
        this.setupView = document.getElementById("setup-view");
        this.bracketView = document.getElementById("bracket-view");
        this.activeControls = document.getElementById("active-controls");

        this.inputName = document.getElementById("tournament-name-input") as HTMLInputElement;
        this.inputPlayer = document.getElementById("new-player-input") as HTMLInputElement;
        this.btnAdd = document.getElementById("add-player-btn") as HTMLButtonElement;
        this.btnGenerate = document.getElementById("generate-btn") as HTMLButtonElement;
        this.btnReset = document.getElementById("reset-btn") as HTMLButtonElement;
        this.btnClearPlayers = document.getElementById("clear-players-btn") as HTMLButtonElement;
        this.btnNextMatch = document.getElementById("next-match-btn") as HTMLButtonElement;

        this.titleDisplay = document.getElementById("tournament-title-display");
        this.dateDisplay = document.getElementById("tournament-date-display");
    }

    setVisibility(state: 'SETUP' | 'ACTIVE') {
        if (state === 'ACTIVE') {
            this.setupView?.classList.add("hidden");
            this.setupView?.classList.remove("flex");
            this.bracketView?.classList.remove("hidden");
            this.bracketView?.classList.add("flex");
            this.activeControls?.classList.remove("hidden");
            this.activeControls?.classList.add("flex");
        } else {
            this.setupView?.classList.remove("hidden");
            this.setupView?.classList.add("flex");
            this.bracketView?.classList.add("hidden");
            this.bracketView?.classList.remove("flex");
            this.activeControls?.classList.add("hidden");
            this.activeControls?.classList.remove("flex");
        }
    }

    updateHeader(name: string, date: string) {
        if (this.titleDisplay) {
            // Only update text if we are NOT currently editing (checked by presence of input)
            if (!this.titleDisplay.querySelector('input')) {
                this.titleDisplay.textContent = name;
                // Add explicit edit hint/icon? 
                // Let's just append a small pencil icon if not present
                // But textContent clears it. 
                // Let's use innerHTML to include icon
                this.titleDisplay.innerHTML = `${name} <span class="icon-[mdi--pencil] text-slate-400 text-sm ml-2 opacity-50 hover:opacity-100 cursor-pointer" title="Editar Nombre"></span>`;
            }
        }
        if (this.dateDisplay) this.dateDisplay.textContent = date;
    }

    enableTitleEditing(onSave: (newName: string) => void) {
        if (!this.titleDisplay) return;

        this.titleDisplay.addEventListener("click", (e) => {
            // Prevent if already editing
            if (this.titleDisplay?.querySelector('input')) return;

            const icon = e.target as HTMLElement;
            // Allow clicking container or icon

            const currentName = this.titleDisplay?.innerText.trim().replace('Editar Nombre', '') || "";
            // innerText might include the icon text if accessible? No, icon is span. 
            // Actually innerText of container includes "name". 

            // More robust: Get the text node? 
            // Or just use the value from ActiveController's render? 
            // But we don't have it here. 
            // Let's just grab textContent of the wrapper, removing the icon part if needed.
            // Since we set innerHTML = name + icon, textContent will be name + nothing (if icon has no text).
            const rawText = this.titleDisplay?.textContent || "";

            const input = document.createElement('input');
            input.type = 'text';
            input.value = rawText.trim();
            input.className = "bg-transparent border-b-2 border-indigo-500 text-slate-800 font-bold text-center focus:outline-none min-w-[200px] w-auto inline-block";

            // Replace content
            if (this.titleDisplay) {
                this.titleDisplay.innerHTML = '';
                this.titleDisplay.appendChild(input);
                input.focus();

                const finish = () => {
                    const newName = input.value.trim();
                    if (newName) {
                        onSave(newName);
                    } else {
                        onSave(rawText); // Revert
                    }
                };

                input.onblur = finish;
                input.onkeydown = (ev) => {
                    if (ev.key === 'Enter') {
                        input.blur();
                    }
                };

                input.onclick = (ev) => ev.stopPropagation();
            }
        });
    }

    getPlayerInput(): string {
        return this.inputPlayer?.value || "";
    }

    clearPlayerInput() {
        if (this.inputPlayer) {
            this.inputPlayer.value = "";
            this.inputPlayer.focus();
        }
    }

    getTournamentName(): string {
        return this.inputName?.value.trim() || `Torneo ${new Date().toLocaleDateString()}`;
    }

    showVictoryToast() {
        const toast = document.createElement("div");
        toast.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-2xl text-xl font-bold z-50 animate-bounce flex items-center gap-3";
        toast.innerHTML = `<span class="icon-[mdi--trophy] text-3xl text-yellow-300"></span> <span>¡Torneo Finalizado!</span> <span class="icon-[mdi--trophy] text-3xl text-yellow-300"></span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
        const colors = {
            success: 'bg-emerald-600',
            error: 'bg-red-600',
            info: 'bg-indigo-600'
        };

        const icons = {
            success: 'mdi--check-circle',
            error: 'mdi--alert-circle',
            info: 'mdi--information'
        };

        const toast = document.createElement("div");
        toast.className = `fixed bottom-8 left-1/2 transform -translate-x-1/2 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium z-50 flex items-center gap-2 animate-fade-in`;
        toast.innerHTML = `<span class="icon-[${icons[type]}] text-lg"></span> <span>${message}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 300ms';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}
