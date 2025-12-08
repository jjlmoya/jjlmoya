import { TournamentUIMediator } from "../ui/mediator";
import { TournamentRenderer } from "../tournament.renderer";
import { TournamentManager } from "./manager";
import { TournamentStorage } from "./storage";
import { TournamentNavigator } from "../ui/navigator";

export class ActiveController {
    private activeRoundMobile: number = 0;
    private manager: TournamentManager | null = null;
    // We need to keep history updated when matches change
    private history: any[] = [];

    constructor(
        private mediator: TournamentUIMediator,
        private renderer: TournamentRenderer
    ) {
        this.bindEvents();
        this.history = TournamentStorage.loadHistory();
    }

    public setManager(manager: TournamentManager) {
        this.manager = manager;
        this.activeRoundMobile = 0;
    }

    private bindEvents() {
        this.mediator.btnNextMatch?.addEventListener("click", () => this.scrollToNextMatch());

        this.mediator.enableTitleEditing((newName) => {
            if (this.manager && newName !== this.manager.name) {
                this.manager.name = newName;
                this.saveCurrentState();
                this.render();
            } else {
                // Even if unchanged, re-render to restore view from input
                this.render();
            }
        });

        // Match listeners are dynamic, so they are attached during render
    }

    public render() {
        if (!this.manager) return;

        this.mediator.updateHeader(
            this.manager.name,
            new Date(this.manager.createdAt).toLocaleDateString()
        );

        this.renderer.renderMobileView(this.manager, this.activeRoundMobile, (i) => {
            this.activeRoundMobile = i;
            this.render();
        });

        this.renderer.renderDesktopView(this.manager);

        this.attachMatchListeners();
    }

    private attachMatchListeners() {
        // Winner Selection Buttons
        document.querySelectorAll(".match-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const target = e.currentTarget as HTMLElement;
                const matchId = target.dataset.matchId;
                const winnerId = target.dataset.winnerId;
                if (matchId && winnerId && !target.hasAttribute('disabled')) {
                    this.selectWinner(matchId, winnerId);
                }
            });
        });

        // Score Inputs
        document.querySelectorAll(".score-input").forEach((input) => {
            input.addEventListener("change", (e) => {
                const target = e.target as HTMLInputElement;
                const matchId = target.dataset.matchId;
                const playerNum = target.dataset.player; // "1" or "2"

                if (matchId && playerNum) {
                    this.updateScore(matchId, playerNum, target.value);
                }
            });
            // Prepare inputs to not propagate clicks
            input.addEventListener("click", (e) => e.stopPropagation());
        });
    }

    private updateScore(matchId: string, playerNum: string, value: string) {
        if (!this.manager) return;

        // Find current match to get existing scores
        const match = this.findMatch(matchId);
        if (!match) return;

        // Keep existing value if not the one being updated (careful with 0 being falsy)
        let s1: number | null = (match.score1 !== undefined && match.score1 !== null) ? match.score1 : null;
        let s2: number | null = (match.score2 !== undefined && match.score2 !== null) ? match.score2 : null;

        // Parse new value
        let val: number | null = null;
        if (value.trim() !== "") {
            val = parseInt(value);
            if (isNaN(val)) val = null;
        }

        if (playerNum === "1") s1 = val;
        else s2 = val;

        this.manager.setScore(matchId, s1, s2);
        this.saveCurrentState();
        this.render();

        if (this.manager.status === 'FINISHED') {
            this.mediator.showVictoryToast();
        }
    }

    private findMatch(matchId: string) {
        if (!this.manager) return null;
        for (const round of this.manager.rounds) {
            const m = round.matches.find(m => m.id === matchId);
            if (m) return m;
        }
        return null;
    }

    private selectWinner(matchId: string, winnerId: string) {
        if (!this.manager) return;

        this.manager.setWinner(matchId, winnerId);
        this.saveCurrentState();
        this.render();

        if (this.manager.status === 'FINISHED') {
            this.mediator.showVictoryToast();
        }
    }

    private saveCurrentState() {
        if (!this.manager) return;
        this.history = TournamentStorage.loadHistory(); // Refresh to ensure we have latest
        this.history = TournamentStorage.saveTournament(this.manager, this.history);
    }

    private scrollToNextMatch() {
        if (!this.manager) return;

        const nextMatch = TournamentNavigator.findNextPlayableMatch(this.manager);

        if (!nextMatch) {
            if (!TournamentNavigator.isTournamentUnfinished(this.manager)) {
                this.mediator.showVictoryToast();
            }
            return;
        }

        TournamentNavigator.scrollToMatch(
            nextMatch.id,
            this.manager,
            this.activeRoundMobile,
            {
                onMobileRoundChange: (i: number) => {
                    this.activeRoundMobile = i;
                    this.render();
                },
                onShowToast: () => this.mediator.showVictoryToast()
            }
        );
    }
}
