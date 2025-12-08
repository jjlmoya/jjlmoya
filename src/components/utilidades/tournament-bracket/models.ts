export interface Player {
    id: string;
    name: string;
}

export interface Match {
    id: string;
    roundIndex: number;
    matchIndex: number;
    player1: Player | null;
    player2: Player | null;
    score1?: number;
    score2?: number;
    winner: Player | null;
    nextMatchId: string | null;
    isBye?: boolean;
}

export interface Round {
    index: number;
    name: string;
    matches: Match[];
}

export interface TournamentData {
    id: string;
    name: string;
    createdAt: number;
    status: 'SETUP' | 'ACTIVE' | 'FINISHED';
    rounds: Round[];
    players: Player[];
    winner?: Player | null;
    scoreEnabled?: boolean;
}
