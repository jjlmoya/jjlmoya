import { TournamentManager } from "./manager";

const STORAGE_KEY_HISTORY = "tournament_history_v2";
const STORAGE_KEY_CURRENT = "tournament_current_id_v2";

export class TournamentStorage {
    static loadHistory(): any[] {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Failed to load history", e);
            return [];
        }
    }

    static saveHistory(history: any[]) {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    }

    static loadCurrentId(): string | null {
        return localStorage.getItem(STORAGE_KEY_CURRENT);
    }

    static saveCurrentId(id: string) {
        localStorage.setItem(STORAGE_KEY_CURRENT, id);
    }

    static removeCurrentId() {
        localStorage.removeItem(STORAGE_KEY_CURRENT);
    }

    static saveTournament(manager: TournamentManager, history: any[]): any[] {
        const idx = history.findIndex((t) => t.id === manager.id);
        const json = manager.toJSON();
        const newHistory = [...history];

        if (idx >= 0) {
            newHistory[idx] = json;
        } else {
            newHistory.push(json);
        }

        this.saveHistory(newHistory);
        this.saveCurrentId(manager.id);

        return newHistory;
    }
}
