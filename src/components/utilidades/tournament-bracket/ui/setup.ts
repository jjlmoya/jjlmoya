const CROWN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" /></svg>`;
const TRASH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;
const TOURNAMENT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="text-xl w-5 h-5 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2v2h5v4H2v2h5c1.11 0 2-.89 2-2V7h5v10H9v-1c0-1.11-.89-2-2-2H2v2h5v4H2v2h5c1.11 0 2-.89 2-2v-1h5c1.11 0 2-.89 2-2v-4h6v-2h-6V7c0-1.11-.89-2-2-2H9V4c0-1.11-.89-2-2-2z" /></svg>`;
const CLOCK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20C7.6 20 4 16.4 4 12S7.6 4 12 4S20 7.6 20 12S16.4 20 12 20M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22S22 17.5 22 12S17.5 2 12 2M16.2 16.2L11 11V7H12.5V10.2L17 14.9L16.2 16.2Z" /></svg>`;


export class SetupRenderer {
    listPlayers: HTMLElement | null;
    countPlayers: HTMLElement | null;
    btnGenerate: HTMLButtonElement | null;
    shuffleWrapper: HTMLElement | null;
    historyContainer: HTMLElement | null;

    constructor() {
        this.listPlayers = document.getElementById("player-list");
        this.countPlayers = document.getElementById("player-count");
        this.btnGenerate = document.getElementById("generate-btn") as HTMLButtonElement;
        this.shuffleWrapper = document.getElementById("shuffle-wrapper");
        this.historyContainer = document.getElementById("history-container");
    }

    public updatePlayerList(players: string[], onRemove: (index: number) => void) {
        if (!this.listPlayers || !this.countPlayers || !this.btnGenerate) return;

        this.countPlayers.textContent = players.length.toString();
        const clearBtn = document.getElementById('clear-players-btn');

        if (players.length === 0) {
            this.listPlayers.innerHTML =
                '<li class="text-center text-slate-400 italic text-sm py-4 border-2 border-dashed border-slate-100 rounded-xl">La lista está vacía</li>';
            this.disableGenerateBtn();
            if (clearBtn) clearBtn.classList.add('hidden');
            return;
        }

        if (clearBtn) clearBtn.classList.remove('hidden');
        this.listPlayers.innerHTML = "";

        
        const fragment = document.createDocumentFragment();

        players.forEach((player, i) => {
            const li = document.createElement("li");
            li.className =
                "flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-slate-700 text-sm animate-fade-in group hover:border-indigo-200 transition-colors";

            const nameSpan = document.createElement("span");
            nameSpan.textContent = player;
            nameSpan.className = "font-medium truncate pr-4";

            const delBtn = document.createElement("button");
            delBtn.innerHTML = "<span class='icon-[mdi--trash-can-outline]'></span>";
            delBtn.className = "text-slate-400 hover:text-red-500 transition-colors text-lg p-1 opacity-80 hover:opacity-100";
            delBtn.onclick = () => onRemove(i);

            li.appendChild(nameSpan);
            li.appendChild(delBtn);
            fragment.appendChild(li);
        });

        this.listPlayers.appendChild(fragment);

        if (players.length >= 2) {
            this.enableGenerateBtn(players.length);
        } else {
            this.disableGenerateBtn();
        }
    }

    private disableGenerateBtn() {
        if (this.btnGenerate) {
            this.btnGenerate.disabled = true;
            this.btnGenerate.classList.add("opacity-50", "cursor-not-allowed");
            this.btnGenerate.innerHTML = `${TOURNAMENT_ICON} Generar Cuadro`;
        }
    }

    private enableGenerateBtn(count: number) {
        if (this.btnGenerate) {
            this.btnGenerate.disabled = false;
            this.btnGenerate.classList.remove("opacity-50", "cursor-not-allowed");
            this.btnGenerate.innerHTML = `${TOURNAMENT_ICON} Generar Cuadro (${count})`;
        }
    }

    public renderShuffleControl(isEnabled: boolean, onToggle: (val: boolean) => void) {
        if (!this.shuffleWrapper) return;

        
        if (!this.shuffleWrapper.querySelector('#shuffle-check')) {
            
            const container = document.createElement('div');
            container.className = "flex flex-col gap-2";
            container.innerHTML = `
                <label class="flex items-center justify-center gap-3 cursor-pointer select-none group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div class="relative">
                        <input type="checkbox" id="shuffle-check" class="peer sr-only">
                        <div class="block bg-slate-200 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors"></div>
                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
                    </div>
                    <span class="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">Aleatorizar emparejamientos</span>
                </label>
                
                 <label class="flex items-center justify-center gap-3 cursor-pointer select-none group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div class="relative">
                        <input type="checkbox" id="score-check" class="peer sr-only">
                        <div class="block bg-slate-200 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors"></div>
                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
                    </div>
                    <span class="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">Activar Marcadores (Opcional)</span>
                </label>
            `;
            this.shuffleWrapper.appendChild(container);

            const shuffleParams = this.shuffleWrapper.querySelector('#shuffle-check') as HTMLInputElement;
            shuffleParams?.addEventListener('change', (e) => {
                onToggle((e.target as HTMLInputElement).checked);
            });
        }

        
        const check = this.shuffleWrapper.querySelector('#shuffle-check') as HTMLInputElement;
        if (check) check.checked = isEnabled;
    }

    public renderScoreControl(isEnabled: boolean, onToggle: (val: boolean) => void) {
        if (!this.shuffleWrapper) return;
        
        
        
        
        

        const scoreCheck = this.shuffleWrapper.querySelector('#score-check') as HTMLInputElement;
        if (scoreCheck) {
            scoreCheck.checked = isEnabled;
            
            
            
            
            
            
            scoreCheck.onchange = (e) => onToggle((e.target as HTMLInputElement).checked);
        }
    }

    public renderHistoryList(history: any[], onLoad: (id: string) => void, onDelete: (id: string) => void) {
        if (!this.historyContainer) return;

        if (history.length === 0) {
            this.historyContainer.innerHTML = '<div class="text-center text-slate-400 text-xs py-8 italic bg-slate-50 rounded-xl border border-dashed border-slate-100">No hay torneos anteriores</div>';
            return;
        }

        this.historyContainer.innerHTML = '';
        const sorted = [...history].sort((a, b) => b.createdAt - a.createdAt);

        const fragment = document.createDocumentFragment();
        sorted.forEach(item => {
            const el = document.createElement('div');
            el.className = "flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-all group animate-fade-in";

            const date = new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            const finished = item.status === 'FINISHED';

            let statusHtml = '';
            if (finished && item.winner) {
                statusHtml = `<span class="text-green-600 flex items-center gap-1 font-bold text-[10px] bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">${CROWN_ICON} ${item.winner.name}</span>`;
            } else if (finished) {
                statusHtml = '<span class="text-green-500 icon-[mdi--check-circle-outline]" title="Finalizado"></span>';
            } else {
                statusHtml = `<span class="text-orange-400" title="En Curso">${CLOCK_ICON}</span>`;
            }

            el.innerHTML = `
                <button class="text-left flex-grow flex flex-col gap-1 load-btn overflow-hidden" data-id="${item.id}">
                    <span class="font-bold text-slate-700 text-sm truncate w-full pr-2">${item.name}</span>
                    <span class="text-[10px] text-slate-400 flex items-center gap-1 flex-wrap">
                        ${date}
                        ${statusHtml}
                    </span>
                </button>
                <button class="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 delete-btn p-2 rounded-lg transition-colors ml-2 shadow-sm" data-id="${item.id}" title="Borrar Torneo">
                    ${TRASH_ICON}
                </button>
            `;

            el.querySelector('.load-btn')?.addEventListener('click', () => onLoad(item.id));
            el.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                onDelete(item.id);
            });

            fragment.appendChild(el);
        });
        this.historyContainer.appendChild(fragment);
    }
}
