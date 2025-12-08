import type { TournamentData } from "../models";


// Duplicate constants for now to avoid circular dependency mess if refactoring blindly
const THEME = {
    primary: { bg: "bg-indigo-600", text: "text-white", shadow: "shadow-md" },
    default: { bg: "bg-white", text: "text-slate-500", hover: "hover:bg-indigo-50" },
    match: {
        winner: "bg-indigo-100 text-indigo-900 font-bold shadow-inner ring-1 ring-indigo-200",
        hover: "hover:bg-slate-50",
        bye: "bg-slate-50/50 text-slate-400 italic opacity-60"
    }
};

export class MobileBracketRenderer {
    container: HTMLElement | null;

    constructor() {
        this.container = document.querySelector(".bracket-mobile");
    }

    public render(data: TournamentData, activeRoundIndex: number, onTabClick: (i: number) => void) {
        if (!this.container) return;

        const rounds = data.rounds;

        // Tabs - Adjusted negative margins for p-2 parent (0.5rem)
        let tabsHTML = `<div class="flex overflow-x-auto gap-2 p-1 no-scrollbar snap-x pb-4 sticky top-0 bg-slate-50/95 backdrop-blur z-20 mx-[-0.5rem] px-[0.5rem] mb-4">`;
        rounds.forEach((round, i) => {
            const isActive = i === activeRoundIndex;
            const activeClass = isActive
                ? THEME.primary.bg + " " + THEME.primary.text + " " + THEME.primary.shadow
                : THEME.default.bg + " " + THEME.default.text + " " + THEME.default.hover;
            tabsHTML += `
                <button 
                    class="round-tab snap-center whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeClass}"
                    data-round-index="${i}"
                >
                    ${round.name}
                </button>
            `;
        });
        tabsHTML += `</div>`;

        // Content
        let matchesHTML = `<div class="relative min-h-[500px] mt-4">`;
        rounds.forEach((round, i) => {
            const isActive = i === activeRoundIndex;
            const visibilityClass = isActive
                ? "opacity-100 z-10 pointer-events-auto relative translate-x-0"
                : "opacity-0 z-0 pointer-events-none absolute inset-0 translate-x-8";

            matchesHTML += `<div class="round-content w-full transition-all duration-300 ${visibilityClass} pb-8">`; // Added padding bottom
            matchesHTML += `<div class="flex flex-col gap-4">`; // Increased gap

            if (round.matches.length === 0) {
                matchesHTML += `<div class="text-center p-8 text-slate-400 italic">Ronda vacía</div>`;
            }

            round.matches.forEach((match) => {
                matchesHTML += this.getMatchCardHTML(match);
            });
            matchesHTML += `</div></div>`;
        });
        matchesHTML += `</div>`;

        this.container.innerHTML = tabsHTML + matchesHTML;

        // Attach Tab listeners
        const tabs = this.container.querySelectorAll('.round-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const idx = parseInt((tab as HTMLElement).dataset.roundIndex || '0');
                onTabClick(idx);
            });
        });
    }

    private getMatchCardHTML(match: any): string {
        const p1 = match.player1;
        const p2 = match.player2;
        const winnerId = match.winner?.id;
        const hasWinner = !!winnerId;

        const isDefinitiveBye = match.isBye || (match.winner && !p1) || (match.winner && !p2);

        if (isDefinitiveBye) {
            const player = p1 || p2;
            return `
             <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative w-full flex flex-col justify-center py-3 px-4">
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400"></div>
                 <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Pase Directo</span>
                 <div class="font-bold text-slate-800 text-base truncate">${player?.name || 'Esperando...'}</div>
             </div>
             `;
        }

        const p1Class = winnerId === p1?.id ? THEME.match.winner : (p1 ? THEME.match.hover : "");
        const p2Class = winnerId === p2?.id ? THEME.match.winner : (p2 ? THEME.match.hover : THEME.match.bye);

        const p1Icon = winnerId === p1?.id ? '<span class="icon-[mdi--trophy] text-indigo-600"></span>' : '';
        const p2Icon = winnerId === p2?.id ? '<span class="icon-[mdi--trophy] text-indigo-600"></span>' : '';

        const p1Disabled = !p1 ? "disabled" : "";
        const p2Disabled = !p2 ? "disabled" : "";

        const score1 = match.score1 !== undefined && match.score1 !== null ? match.score1 : '';
        const score2 = match.score2 !== undefined && match.score2 !== null ? match.score2 : '';

        return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative w-full flex flex-col justify-center">
           <div class="absolute left-0 top-0 bottom-0 w-1 bg-slate-200"></div>
           <div class="px-3 py-3 flex flex-col gap-2 w-full">
               <div class="flex items-center gap-2">
                   <button 
                        class="match-btn flex-grow flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${p1Class} ${p1Disabled ? 'cursor-default' : ''}"
                        data-match-id="${match.id}"
                        data-winner-id="${p1?.id || ""}"
                        ${p1Disabled}
                   >
                        <span class="${p1 ? "text-slate-800 font-medium" : "text-slate-300 italic"} truncate text-sm flex-grow">${p1?.name || "..."}</span>
                        ${p1Icon}
                   </button>
                   <input 
                        type="number" 
                        class="score-input w-12 h-9 text-center border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${hasWinner ? 'bg-slate-50 text-slate-400' : 'bg-white'}"
                        data-match-id="${match.id}"
                        data-player="1"
                        value="${score1}"
                        placeholder="-"
                        min="0"
                        ${!p1 || hasWinner ? 'disabled' : ''}
                   />
               </div>
               
               <div class="h-px bg-slate-100 w-full"></div>
               
               <div class="flex items-center gap-2">
                   <button 
                        class="match-btn flex-grow flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left ${p2Class} ${p2Disabled ? 'cursor-default' : ''}"
                        data-match-id="${match.id}"
                        data-winner-id="${p2?.id || ""}"
                        ${p2Disabled}
                   >
                        <span class="${p2 ? "text-slate-800 font-medium" : "text-slate-300 italic"} truncate text-sm flex-grow">${p2?.name || "..."}</span>
                        ${p2Icon}
                   </button>
                   <input 
                        type="number" 
                        class="score-input w-12 h-9 text-center border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${hasWinner ? 'bg-slate-50 text-slate-400' : 'bg-white'}"
                        data-match-id="${match.id}"
                        data-player="2"
                        value="${score2}"
                        placeholder="-"
                        min="0"
                        ${!p2 || hasWinner ? 'disabled' : ''}
                   />
               </div>
           </div>
        </div>`;
    }
}
