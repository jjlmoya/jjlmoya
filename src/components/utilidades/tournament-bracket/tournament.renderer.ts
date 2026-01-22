import { SetupRenderer } from "./ui/setup";
import { MobileBracketRenderer } from "./ui/bracket-mobile";
import { DesktopBracketRenderer } from "./ui/bracket-desktop";
import type { TournamentData } from "./models";

export const COLORS = {};

export class TournamentRenderer {
    private setup: SetupRenderer;
    private mobile: MobileBracketRenderer;
    private desktop: DesktopBracketRenderer;

    constructor() {
        this.setup = new SetupRenderer();
        this.mobile = new MobileBracketRenderer();
        this.desktop = new DesktopBracketRenderer();
    }

    public updatePlayerList(players: string[], onRemove: (index: number) => void) {
        this.setup.updatePlayerList(players, onRemove);
    }

    public renderShuffleControl(isEnabled: boolean, onToggle: (val: boolean) => void) {
        this.setup.renderShuffleControl(isEnabled, onToggle);
    }

    public renderScoreControl(isEnabled: boolean, onToggle: (val: boolean) => void) {
        this.setup.renderScoreControl(isEnabled, onToggle);
    }

    public renderHistoryList(
        history: any[],
        onLoad: (id: string) => void,
        onDelete: (id: string) => void
    ) {
        this.setup.renderHistoryList(history, onLoad, onDelete);
    }

    public renderMobileView(
        data: TournamentData,
        activeRoundIndex: number,
        onTabClick: (i: number) => void
    ) {
        this.mobile.render(data, activeRoundIndex, onTabClick);
    }

    public renderDesktopView(data: TournamentData) {
        this.desktop.render(data);
    }
}
