import LZString from "lz-string";
import type { TournamentData } from "../models";

export class TournamentSharing {
    private static readonly MAX_PLAYERS_TO_SHARE = 32;

    public static canShare(tournament: TournamentData): boolean {
        return tournament.players.length <= this.MAX_PLAYERS_TO_SHARE;
    }

    public static generateShareUrl(tournament: TournamentData): string | null {
        if (!this.canShare(tournament)) {
            return null;
        }

        try {
            const json = JSON.stringify(tournament);
            const compressed = LZString.compressToEncodedURIComponent(json);

            const baseUrl = window.location.origin + window.location.pathname;
            return `${baseUrl}#${compressed}`;
        } catch (error) {
            console.error("Error generating share URL:", error);
            return null;
        }
    }

    public static loadFromHash(): TournamentData | null {
        const hash = window.location.hash.slice(1);

        if (!hash) {
            return null;
        }

        try {
            const decompressed = LZString.decompressFromEncodedURIComponent(hash);

            if (!decompressed) {
                console.error("Failed to decompress tournament data");
                return null;
            }

            const tournament = JSON.parse(decompressed) as TournamentData;

            if (!this.isValidTournament(tournament)) {
                console.error("Invalid tournament data structure");
                return null;
            }

            return tournament;
        } catch (error) {
            console.error("Error loading tournament from hash:", error);
            return null;
        }
    }

    public static clearHash(): void {
        if (window.location.hash) {
            history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }

    private static isValidTournament(data: any): data is TournamentData {
        return (
            data &&
            typeof data === "object" &&
            typeof data.id === "string" &&
            typeof data.name === "string" &&
            typeof data.createdAt === "number" &&
            Array.isArray(data.players) &&
            Array.isArray(data.rounds) &&
            ["SETUP", "ACTIVE", "FINISHED"].includes(data.status)
        );
    }

    public static async copyToClipboard(url: string): Promise<boolean> {
        try {
            await navigator.clipboard.writeText(url);
            return true;
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);

            const textArea = document.createElement("textarea");
            textArea.value = url;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand("copy");
                document.body.removeChild(textArea);
                return true;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    }
}
