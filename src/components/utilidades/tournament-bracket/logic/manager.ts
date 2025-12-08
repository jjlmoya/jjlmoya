import type { Match, Player, Round, TournamentData } from "../models";
import { BracketGenerator } from "./generator";

export class TournamentManager implements TournamentData {
    public id: string;
    public name: string;
    public createdAt: number;
    public status: 'SETUP' | 'ACTIVE' | 'FINISHED';
    public rounds: Round[];
    public players: Player[];
    public winner?: Player | null;
    public scoreEnabled: boolean = false;

    constructor(players: string[] = [], name: string = "Torneo Sin Nombre", id: string = "", createdAt: number = 0) {
        this.id = id || crypto.randomUUID();
        this.name = name;
        this.createdAt = createdAt || Date.now();
        this.players = players.map((p, i) => ({ id: `p-${i}-${Date.now()}`, name: p }));
        this.status = 'SETUP';
        this.rounds = [];
    }

    public shufflePlayers(): void {
        for (let i = this.players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
        }
    }

    public startTournament(): void {
        if (this.players.length < 2) return;
        this.rounds = BracketGenerator.generate(this.players);
        this.status = 'ACTIVE';
        this.resolveWalkovers();
    }

    public setScore(matchId: string, score1: number | null, score2: number | null): void {
        let match: Match | undefined;


        for (let i = 0; i < this.rounds.length; i++) {
            const m = this.rounds[i].matches.find((m) => m.id === matchId);
            if (m) {
                match = m;

                break;
            }
        }

        if (!match) return;

        // Update scores (allowing null/undefined to clear them or part of them)
        if (score1 !== null) match.score1 = score1;
        if (score2 !== null) match.score2 = score2;

        // Only determine winner if BOTH scores are present
        if (match.score1 !== undefined && match.score1 !== null && match.score2 !== undefined && match.score2 !== null) {
            if (match.score1 > match.score2 && match.player1) {
                this.setWinner(matchId, match.player1.id);
            } else if (match.score2 > match.score1 && match.player2) {
                this.setWinner(matchId, match.player2.id);
            }
        }
    }

    public setWinner(matchId: string, winnerId: string): void {
        let match: Match | undefined;
        let roundIndex = -1;

        // Find match
        for (let i = 0; i < this.rounds.length; i++) {
            const m = this.rounds[i].matches.find((m) => m.id === matchId);
            if (m) {
                match = m;
                roundIndex = i;
                break;
            }
        }

        if (!match || roundIndex === -1) return;

        let winner: Player | null | undefined = null;
        if (match.player1?.id === winnerId) winner = match.player1;
        else if (match.player2?.id === winnerId) winner = match.player2;

        if (!winner) return;

        // Update current match
        match.winner = winner;

        // Propagate to next match
        if (match.nextMatchId) {
            this.propagateToNextRound(match.nextMatchId, roundIndex + 1, winner, match.matchIndex);
        }

        this.checkStatus();
    }

    private propagateToNextRound(nextMatchId: string, nextRoundIndex: number, player: Player, originatingMatchIndex: number) {
        if (nextRoundIndex >= this.rounds.length) return;

        const nextRound = this.rounds[nextRoundIndex];
        const nextMatch = nextRound.matches.find((m) => m.id === nextMatchId);

        if (nextMatch) {
            // Determine slot
            const isPlayer1Slot = originatingMatchIndex % 2 === 0;

            // Check if we actully need to update (optimization)
            const currentPlayerInSlot = isPlayer1Slot ? nextMatch.player1 : nextMatch.player2;

            // If the player is different, we MUST update and reset the next match's winner
            if (currentPlayerInSlot?.id !== player.id) {
                if (isPlayer1Slot) {
                    nextMatch.player1 = player;
                } else {
                    nextMatch.player2 = player;
                }

                // IMPORTANT: Reset winner of this next match because the matchup changed
                nextMatch.winner = null;

                // Recursively clear future rounds
                if (nextMatch.nextMatchId) {
                    this.clearFutureRound(nextMatch.nextMatchId, nextRoundIndex + 1, nextMatch.matchIndex);
                }
            }
        }
    }

    private clearFutureRound(matchId: string, roundIndex: number, originatingMatchIndex: number) {
        if (roundIndex >= this.rounds.length) return;

        const round = this.rounds[roundIndex];
        const match = round.matches.find(m => m.id === matchId);

        if (match) {
            const isPlayer1Slot = originatingMatchIndex % 2 === 0;

            // Clear the slot
            if (isPlayer1Slot) {
                match.player1 = null;
            } else {
                match.player2 = null;
            }

            match.winner = null;

            // Recurse
            if (match.nextMatchId) {
                this.clearFutureRound(match.nextMatchId, roundIndex + 1, match.matchIndex);
            }
        }
    }

    private resolveWalkovers() {
        // We iterate potentially multiple times if a walkover triggers another
        let changed = true;
        while (changed) {
            changed = false;
            this.rounds.forEach(round => {
                round.matches.forEach(match => {
                    if (match.winner) return;

                    // Case 1: Simple Bye (P1 vs null)
                    if (match.player1 && !match.player2) {
                        // Check if P2 is *permanently* missing
                        // In Round 0, !player2 means they didn't exist -> Bye
                        if (round.index === 0) {
                            this.setWinner(match.id, match.player1.id);
                            changed = true;
                        } else {
                            // In later rounds, P2 might be coming from a previous match
                            // We need to check if that source match exists
                            const sourceMatchIndex = match.matchIndex * 2 + 1;
                            const prevRound = this.rounds[round.index - 1];
                            const sourceMatch = prevRound?.matches.find(m => m.matchIndex === sourceMatchIndex);

                            // If source match doesn't exist (because we sparse populated), then P2 will NEVER come.
                            if (!sourceMatch) {
                                this.setWinner(match.id, match.player1.id);
                                changed = true;
                            }
                        }
                    }

                    // Case 2: Double Void? (null vs null)
                    // If sparse populated, this shouldn't happen for created matches unless logic fails.
                    // But if P1 is missing:
                    if (!match.player1 && match.player2) {
                        // Similar logic for P1 source
                        if (round.index === 0) {
                            this.setWinner(match.id, match.player2.id);
                            changed = true;
                        } else {
                            const sourceMatchIndex = match.matchIndex * 2;
                            const prevRound = this.rounds[round.index - 1];
                            const sourceMatch = prevRound?.matches.find(m => m.matchIndex === sourceMatchIndex);

                            if (!sourceMatch) {
                                this.setWinner(match.id, match.player2.id);
                                changed = true;
                            }
                        }
                    }
                });
            });
        }
    }

    private checkStatus(): void {
        const lastRound = this.rounds[this.rounds.length - 1];
        if (lastRound && lastRound.matches.every((m) => m.winner)) {
            this.status = 'FINISHED';
            if (lastRound.matches.length === 1) {
                this.winner = lastRound.matches[0].winner;
            }
        }
    }

    // Serialization
    toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            players: this.players,
            rounds: this.rounds,
            status: this.status,
            winner: this.winner,
            scoreEnabled: this.scoreEnabled
        };
    }

    static fromJSON(json: any): TournamentManager {
        const manager = new TournamentManager();
        if (json) {
            manager.id = json.id || manager.id;
            manager.name = json.name || manager.name;
            manager.createdAt = json.createdAt || manager.createdAt;
            manager.players = json.players || [];
            manager.rounds = json.rounds || [];
            manager.status = json.status || 'SETUP';
            manager.winner = json.winner || null;
            manager.scoreEnabled = json.scoreEnabled || false;
        }
        return manager;
    }
}

