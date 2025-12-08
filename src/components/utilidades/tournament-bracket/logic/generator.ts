import type { Match, Player, Round } from "../models";

export class BracketGenerator {
    static generate(players: Player[]): Round[] {
        const playerCount = players.length;
        if (playerCount < 2) return [];

        // 1. Calculate dimensions
        const roundsCount = Math.ceil(Math.log2(playerCount));
        const bracketSize = Math.pow(2, roundsCount);
        const matchesCount = bracketSize / 2;
        const byesCount = bracketSize - playerCount;

        const rounds: Round[] = [];

        // 2. Create Round 0 (Sequential and Sparse)
        const round0Matches: Match[] = [];

        // We only create matches that strictly have at least one player
        // But we must respect the grid alignment (matchIndex)
        // For 5 players: A,B, C,D, E.
        // M0: A,B. M1: C,D. M2: E.
        // We need M0, M1, M2.

        // We iterate players pair by pair
        for (let i = 0; i < playerCount; i += 2) {
            const matchIndex = i / 2;
            const p1 = players[i];
            const p2 = players[i + 1] || null;

            const match: Match = {
                id: `r0-m${matchIndex}`,
                roundIndex: 0,
                matchIndex: matchIndex,
                player1: p1,
                player2: p2,
                winner: null,
                nextMatchId: null,
                isBye: !p2
            };
            round0Matches.push(match);
        }

        rounds.push({
            index: 0,
            name: this.getRoundName(0, roundsCount),
            matches: round0Matches
        });

        // 5. Generate Subsequent Rounds Structure
        let currentMatchCount = matchesCount;
        for (let r = 1; r < roundsCount; r++) {
            currentMatchCount /= 2;
            const roundMatches: Match[] = [];

            for (let m = 0; m < currentMatchCount; m++) {
                roundMatches.push({
                    id: `r${r}-m${m}`,
                    roundIndex: r,
                    matchIndex: m,
                    player1: null,
                    player2: null,
                    winner: null,
                    nextMatchId: null,
                });
            }

            rounds.push({
                index: r,
                name: this.getRoundName(r, roundsCount),
                matches: roundMatches
            });
        }

        // 6. Link Rounds
        for (let r = 0; r < roundsCount - 1; r++) {
            const currentRound = rounds[r];
            currentRound.matches.forEach(match => {
                const nextMatchIndex = Math.floor(match.matchIndex / 2);
                match.nextMatchId = `r${r + 1}-m${nextMatchIndex}`;
            });
        }

        return rounds;
    }

    private static getRoundName(index: number, totalRounds: number): string {
        if (index === totalRounds - 1) return "Final";
        if (index === totalRounds - 2) return "Semifinales";
        if (index === totalRounds - 3) return "Cuartos";
        return `Ronda ${index + 1}`;
    }
}
