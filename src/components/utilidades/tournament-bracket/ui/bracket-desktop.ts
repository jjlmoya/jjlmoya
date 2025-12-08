import type { TournamentData, Match } from "../models";

// Shared Theme (could be imported)
const THEME = {
    match: {
        winner: "bg-indigo-100 text-indigo-900 font-bold shadow-inner ring-1 ring-indigo-200",
        hover: "hover:bg-slate-50",
        bye: "bg-slate-50/50 text-slate-400 italic opacity-60"
    }
};

const TROPHY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" class="text-indigo-600 w-4 h-4 inline-block ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8C2.8,2 2,2.8 2,3.8V4.5C2,8.9 5.6,12.5 10,12.5V15H7V17H17V15H14V12.5C18.4,12.5 22,8.9 22,4.5V3.8C22,2.8 21.2,2 20.2,2M4,4.5V3.8C4,3.6 4.2,3.5 4.5,3.5H6C6.5,3.5 7,4 7,4.5V9.5C4.2,9.5 4,4.5 4,4.5M20,4.5C20,4.5 19.8,9.5 17,9.5V4.5C17,4 17.5,3.5 18,3.5H19.5C19.8,3.5 20,3.6 20,3.8V4.5Z" /></svg>`;

export class DesktopBracketRenderer {
    container: HTMLElement | null;

    constructor() {
        this.container = document.querySelector(".desktop-bracket-container");
    }

    public render(data: TournamentData) {
        if (!this.container) return;

        this.container.innerHTML = "";
        this.container.classList.remove("flex", "flex-row", "justify-between", "items-stretch", "gap-8", "overflow-x-auto", "p-8", "overflow-hidden");
        this.container.classList.add("relative", "w-full", "h-full", "overflow-auto", "min-h-[600px]", "bg-slate-50", "cursor-grab");

        const rounds = data.rounds;
        const columnWidth = 260;
        const gapX = 80;

        rounds.forEach((round, rIndex) => {
            const matches = round.matches;

            // Column
            const roundColumn = document.createElement("div");
            roundColumn.style.position = "absolute";
            roundColumn.style.left = `${rIndex * (columnWidth + gapX) + 60}px`;
            roundColumn.style.top = "40px";
            roundColumn.style.width = `${columnWidth}px`;

            // Header
            const header = document.createElement("div");
            header.className = "text-center font-bold text-slate-400 mb-6 uppercase tracking-wider text-xs border-b border-slate-200 pb-2 bg-slate-50/80 backdrop-blur sticky top-0 z-30";
            header.textContent = round.name;
            roundColumn.appendChild(header);

            // Matches
            matches.forEach((match, mIndex) => {
                const matchEl = document.createElement("div");

                // Position Calc
                const cardHeight = 100;
                const unitHeight = 110;
                const roundSpacing = unitHeight * Math.pow(2, rIndex);
                const initialOffset = (roundSpacing / 2) - (cardHeight / 2);

                const topPos = (mIndex * roundSpacing) + initialOffset + 40;

                matchEl.style.position = "absolute";
                matchEl.style.top = `${topPos}px`;
                matchEl.style.width = "100%";
                matchEl.innerHTML = this.getMatchCardHTML(match, data.scoreEnabled);

                roundColumn.appendChild(matchEl);
            });

            this.container?.appendChild(roundColumn);
        });

        this.renderConnectors(data, columnWidth, gapX);
        this.enableDragScroll(this.container);
    }

    private renderConnectors(data: TournamentData, colWidth: number, colGap: number) {
        if (!this.container) return;

        // Calculate SVG Size
        // Width: rounds * (width+gap)
        // Height: max matches * spacing
        const rounds = data.rounds;
        const totalWidth = rounds.length * (colWidth + colGap) + 200;
        const maxMatches = rounds[0]?.matches.length || 0;
        const totalHeight = maxMatches * 110 + 200;

        const svgns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgns, "svg");
        svg.setAttribute("class", "absolute inset-0 pointer-events-none");
        svg.style.width = `${Math.max(2000, totalWidth)}px`;
        svg.style.height = `${Math.max(2000, totalHeight)}px`;
        svg.style.zIndex = "0";

        const unitHeight = 110;
        const cardHeight = 100;

        rounds.forEach((round, rIndex) => {
            if (rIndex === rounds.length - 1) return;

            const spacing = unitHeight * Math.pow(2, rIndex);
            const nextSpacing = unitHeight * Math.pow(2, rIndex + 1);
            const offset = (spacing / 2) - (cardHeight / 2);
            const nextOffset = (nextSpacing / 2) - (cardHeight / 2);

            round.matches.forEach((match, mIndex) => {
                // My Coordinates (Right)
                const myX = (rIndex * (colWidth + colGap)) + colWidth + 60;
                const myY = (mIndex * spacing) + offset + 40 + (cardHeight / 2);

                // Target Coordinates (Left)
                const nextMatchIdx = Math.floor(mIndex / 2);
                const nextX = ((rIndex + 1) * (colWidth + colGap)) + 60;
                const nextY = (nextMatchIdx * nextSpacing) + nextOffset + 40 + (cardHeight / 2);

                // Draw Path
                const midX = myX + (colGap / 2);

                const path = document.createElementNS(svgns, "path");
                const d = `M ${myX} ${myY} L ${midX} ${myY} L ${midX} ${nextY} L ${nextX} ${nextY}`;

                path.setAttribute("d", d);
                path.setAttribute("stroke", "#cbd5e1"); // slate-300
                path.setAttribute("stroke-width", "2");
                path.setAttribute("fill", "none");
                svg.appendChild(path);
            });
        });

        this.container.appendChild(svg);
    }

    private getMatchCardHTML(match: Match, scoreEnabled?: boolean): string {
        const p1 = match.player1;
        const p2 = match.player2;
        const winnerId = match.winner?.id;
        const isBye = match.isBye;

        if (isBye) {
            return `
             <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative group w-full h-[100px] flex flex-col justify-center">
                <div class="absolute top-1/2 -right-1.5 w-3 h-3 bg-indigo-200 rounded-full transform -translate-y-1/2 border-2 border-white box-content"></div>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400"></div>
                <div class="px-4 py-3">
                     <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 block">Pase Directo</span>
                     <div class="font-bold text-slate-800 text-base truncate">${p1?.name}</div>
                </div>
             </div>
             `;
        }

        const p1Class = (winnerId && winnerId === p1?.id) ? THEME.match.winner : (p1 ? THEME.match.hover : "");
        const p2Class = (winnerId && winnerId === p2?.id) ? THEME.match.winner : (p2 ? THEME.match.hover : THEME.match.bye);

        const p1Icon = (winnerId && winnerId === p1?.id) ? TROPHY_ICON : '';
        const p2Icon = (winnerId && winnerId === p2?.id) ? TROPHY_ICON : '';
        const p1Disabled = !p1 ? "disabled" : "";
        const p2Disabled = !p2 ? "disabled" : "";

        // P1 Input
        let p1Input = '';
        if (scoreEnabled && p1 && p2) {
            const val = (match.score1 !== undefined && match.score1 !== null) ? match.score1 : '';
            p1Input = `<input type="number" class="score-input w-12 text-center text-sm font-bold bg-slate-50 border border-slate-200 rounded p-0.5 focus:border-indigo-400 focus:outline-none" 
                        data-match-id="${match.id}" data-player="1" value="${val}" onclick="event.stopPropagation()">`;
        }

        // P2 Input
        let p2Input = '';
        if (scoreEnabled && p1 && p2) {
            const val = (match.score2 !== undefined && match.score2 !== null) ? match.score2 : '';
            p2Input = `<input type="number" class="score-input w-12 text-center text-sm font-bold bg-slate-50 border border-slate-200 rounded p-0.5 focus:border-indigo-400 focus:outline-none" 
                        data-match-id="${match.id}" data-player="2" value="${val}" onclick="event.stopPropagation()">`;
        }

        // If inputs exist, we need to adjust layout. 
        // We can place the input inside the button or next to it.
        // Current button takes full width.
        // Let's modify the inner HTML of the "button".
        // Wait, button type="button" wrapped around input is bad.
        // We should move input OUT of button or use div.
        // But the whole row is clickable to select winner in NO-SCORE mode.
        // In SCORE mode, can we still click to select winner? Yes, manual override.
        // So we can have input on the right side.

        return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative group w-full h-[100px] flex flex-col justify-center hover:shadow-md transition-shadow z-10">
           <!-- Connector Dots -->
            <div class="absolute top-1/2 -left-1.5 w-3 h-3 bg-slate-200 rounded-full transform -translate-y-1/2 border-2 border-white box-content"></div>
            <div class="absolute top-1/2 -right-1.5 w-3 h-3 bg-slate-200 rounded-full transform -translate-y-1/2 border-2 border-white box-content"></div>

           <div class="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 group-hover:bg-indigo-300 transition-colors"></div>
           <div class="px-2 flex flex-col gap-1 w-full">
               <div class="w-full flex items-center gap-2">
                   <button 
                        class="match-btn flex-grow flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors text-left ${p1Class} ${p1Disabled ? 'cursor-default' : ''}"
                        data-match-id="${match.id}"
                        data-winner-id="${p1?.id || ""}"
                        ${p1Disabled}
                   >
                        <span class="${p1 ? "text-slate-800 font-medium" : "text-slate-300 italic"} truncate text-sm max-w-[80%]">${p1?.name || "..."}</span>
                        ${p1Icon}
                   </button>
                   ${p1Input}
               </div>
               
               <div class="h-px bg-slate-50 w-full mx-auto"></div>
               
               <div class="w-full flex items-center gap-2">
                   <button 
                        class="match-btn flex-grow flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors text-left ${p2Class} ${p2Disabled ? 'cursor-default' : ''}"
                        data-match-id="${match.id}"
                        data-winner-id="${p2?.id || ""}"
                        ${p2Disabled}
                   >
                        <span class="${p2 ? "text-slate-800 font-medium" : "text-slate-300 italic"} truncate text-sm max-w-[80%]">${p2?.name || "..."}</span>
                        ${p2Icon}
                   </button>
                   ${p2Input}
               </div>
           </div>
        </div>`;
    }

    private enableDragScroll(ele: HTMLElement) {
        let pos = { top: 0, left: 0, x: 0, y: 0 };

        const mouseDownHandler = (e: MouseEvent) => {
            ele.classList.add('cursor-grabbing');
            ele.classList.remove('cursor-grab');

            pos = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                x: e.clientX,
                y: e.clientY,
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = (e: MouseEvent) => {
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;
            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = () => {
            ele.classList.remove('cursor-grabbing');
            ele.classList.add('cursor-grab');
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        ele.onmousedown = mouseDownHandler;
    }
}
