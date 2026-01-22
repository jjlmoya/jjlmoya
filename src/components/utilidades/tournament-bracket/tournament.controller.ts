import { TournamentManager } from "./logic/manager";
import { TournamentRenderer } from "./tournament.renderer";
import { TournamentStorage } from "./logic/storage";
import { TournamentUIMediator } from "./ui/mediator";
import { SetupController } from "./logic/setup.controller";
import { ActiveController } from "./logic/active.controller";
import { TournamentSharing } from "./logic/sharing";

export class TournamentController {
    private renderer: TournamentRenderer;
    private mediator: TournamentUIMediator;

    private setupController: SetupController;
    private activeController: ActiveController;

    private currentView: "SETUP" | "ACTIVE" = "SETUP";

    constructor() {
        this.renderer = new TournamentRenderer();
        this.mediator = new TournamentUIMediator();

        this.setupController = new SetupController(
            this.mediator,
            this.renderer,
            (m) => this.startTournament(m),
            (m) => this.loadTournament(m)
        );

        this.activeController = new ActiveController(this.mediator, this.renderer);

        this.bindGlobalEvents();
        this.init();
    }

    private init() {
        this.loadCurrentTournament();
        this.updateView();
    }

    private bindGlobalEvents() {
        this.mediator.btnReset?.addEventListener("click", () => this.resetToSetup());
    }

    private startTournament(manager: TournamentManager) {
        this.currentView = "ACTIVE";

        TournamentStorage.saveCurrentId(manager.id);
        const history = TournamentStorage.loadHistory();
        TournamentStorage.saveTournament(manager, history);

        this.activeController.setManager(manager);

        this.updateView();
    }

    private loadTournament(manager: TournamentManager) {
        this.startTournament(manager);
    }

    private resetToSetup() {
        TournamentStorage.removeCurrentId();
        TournamentSharing.clearHash();
        this.currentView = "SETUP";
        this.setupController.refreshHistory();
        this.updateView();
    }

    private loadCurrentTournament() {
        const sharedTournament = TournamentSharing.loadFromHash();
        if (sharedTournament) {
            const manager = TournamentManager.fromJSON(sharedTournament);
            this.startTournament(manager);
            TournamentSharing.clearHash();
            return;
        }

        const currentId = TournamentStorage.loadCurrentId();
        if (currentId) {
            const history = TournamentStorage.loadHistory();
            const found = history.find((t) => t.id === currentId);
            if (found) {
                const manager = TournamentManager.fromJSON(found);
                this.startTournament(manager);
                return;
            }
        }
        this.currentView = "SETUP";
    }

    private updateView() {
        this.mediator.setVisibility(this.currentView);

        if (this.currentView === "SETUP") {
            this.setupController.render();
        } else {
            this.activeController.render();
        }
    }
}
