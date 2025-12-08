import type { Match, Player, Round } from "../models";

export class BracketGenerator {
    static generate(players: Player[]): Round[] {
        const playerCount = players.length;
        if (playerCount < 2) return [];

        const roundsCount = Math.ceil(Math.log2(playerCount));
        const bracketSize = Math.pow(2, roundsCount);
        const firstRoundMatches = bracketSize / 2;
        const byesCount = bracketSize - playerCount;

        const rounds: Round[] = [];

        const round0Matches: Match[] = [];

        for (let m = 0; m < firstRoundMatches; m++) {
            const p1Index = m * 2;
            const p2Index = m * 2 + 1;

            const p1 = p1Index < playerCount ? players[p1Index] : null;
            const p2 = p2Index < playerCount ? players[p2Index] : null;

            if (!p1 && !p2) {
                continue;
            }

            const match: Match = {
                id: `r0-m${m}`,
                roundIndex: 0,
                matchIndex: m,
                player1: p1,
                player2: p2,
                winner: null,
                nextMatchId: null,
                isBye: (p1 !== null && p2 === null) || (p1 === null && p2 !== null)
            };
            round0Matches.push(match);
        }

        rounds.push({
            index: 0,
            name: this.getRoundName(0, roundsCount),
            matches: round0Matches
        });

        for (let r = 1; r < roundsCount; r++) {
            const prevRound = rounds[r - 1];
            const roundMatches: Match[] = [];

            const maxMatchIndex = Math.max(...prevRound.matches.map(m => m.matchIndex));
            const expectedMatchCount = Math.ceil((maxMatchIndex + 1) / 2);

            for (let m = 0; m < expectedMatchCount; m++) {
                const source1Index = m * 2;
                const source2Index = m * 2 + 1;

                const hasSource1 = prevRound.matches.some(match => match.matchIndex === source1Index);
                const hasSource2 = prevRound.matches.some(match => match.matchIndex === source2Index);

                if (!hasSource1 && !hasSource2) {
                    continue;
                }

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
