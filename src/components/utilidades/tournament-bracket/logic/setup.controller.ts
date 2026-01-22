import { TournamentUIMediator } from "../ui/mediator";
import { TournamentRenderer } from "../tournament.renderer";
import { TournamentStorage } from "./storage";
import { TournamentManager } from "./manager";

export class SetupController {
    private players: string[] = [];
    private isScoreEnabled: boolean = false;
    private isShuffleEnabled: boolean = false;
    private history: any[] = [];

    constructor(
        private mediator: TournamentUIMediator,
        private renderer: TournamentRenderer,
        private onStartTournament: (manager: TournamentManager) => void,
        private onLoadTournament: (manager: TournamentManager) => void
    ) {
        this.loadHistory();
        this.bindEvents();
    }

    private bindEvents() {
        this.mediator.btnAdd?.addEventListener("click", () => this.addPlayer());
        this.mediator.inputPlayer?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.addPlayer();
        });

        this.mediator.btnClearPlayers?.addEventListener("click", () => {
            if (confirm("¿Borrar toda la lista de jugadores?")) {
                this.players = [];
                this.render();
            }
        });

        this.mediator.btnGenerate?.addEventListener("click", () => this.generateTournament());
    }

    public render() {
        this.renderer.updatePlayerList(this.players, (i) => this.removePlayer(i));
        this.renderer.renderShuffleControl(
            this.isShuffleEnabled,
            (val) => (this.isShuffleEnabled = val)
        );
        this.renderer.renderScoreControl(this.isScoreEnabled, (val) => (this.isScoreEnabled = val));
        this.renderer.renderHistoryList(
            this.history,
            (id) => this.loadTournament(id),
            (id) => this.deleteTournament(id)
        );
    }

    public refreshHistory() {
        this.loadHistory();
        this.render();
    }

    private addPlayer() {
        const rawValue = this.mediator.getPlayerInput();
        const names = rawValue
            .split(",")
            .map((n) => n.trim())
            .filter((n) => n.length > 0);

        if (names.length > 0) {
            this.players.push(...names);
            this.mediator.clearPlayerInput();
            this.render();
        }
    }

    private removePlayer(index: number) {
        this.players.splice(index, 1);
        this.render();
    }

    private generateTournament() {
        if (this.players.length < 2) {
            alert("Necesitas al menos 2 jugadores.");
            return;
        }

        const name = this.mediator.getTournamentName();
        const manager = new TournamentManager([...this.players], name);

        if (this.isShuffleEnabled) manager.shufflePlayers();
        manager.scoreEnabled = this.isScoreEnabled;

        manager.startTournament();
        this.onStartTournament(manager);
    }

    private loadHistory() {
        this.history = TournamentStorage.loadHistory();
    }

    private loadTournament(id: string) {
        const found = this.history.find((t) => t.id === id);
        if (found) {
            const manager = TournamentManager.fromJSON(found);
            this.onLoadTournament(manager);
        } else {
            alert("No se pudo cargar el torneo.");
        }
    }

    private deleteTournament(id: string) {
        if (!confirm("¿Borrar este torneo del historial permanentemente?")) return;

        this.history = this.history.filter((t) => t.id !== id);
        TournamentStorage.saveHistory(this.history);

        this.render();
    }
}
