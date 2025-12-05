export type SportId = 'simple' | 'tennis' | 'padel' | 'pingpong' | 'volleyball' | 'basket';

export type ScoreType = 'numeric' | 'tennis';

export interface SportConfig {
    id: SportId;
    name: string;
    type: ScoreType;

    // Scoring Rules
    maxScore?: number; // e.g. 21 for pingpong (just a guide, not hard limit)
    winBy?: number; // e.g. 2

    // Structure
    hasSets?: boolean;
    hasGames?: boolean;

    // Service
    serviceRotationPoints?: number; // 0 = none, 2 = every 2 points

    // UI Config
    increments: number[]; // [1] for most, [1,2,3] for basket
    colorScheme?: string; // CSS class helper
}

export const SPORTS: Record<SportId, SportConfig> = {
    simple: {
        id: 'simple',
        name: 'Libre (Fútbol, 3 en Raya...)',
        type: 'numeric',
        increments: [1],
        serviceRotationPoints: 0
    },
    tennis: {
        id: 'tennis',
        name: 'Tenis',
        type: 'tennis',
        hasSets: true,
        hasGames: true,
        increments: [1], // Tennis logic handles 15/30/40 internally
        serviceRotationPoints: 0 // Tennis service changes every game, handled by logic
    },
    padel: {
        id: 'padel',
        name: 'Pádel',
        type: 'tennis', // Same logic as tennis
        hasSets: true,
        hasGames: true,
        increments: [1],
        serviceRotationPoints: 0
    },
    pingpong: {
        id: 'pingpong',
        name: 'Ping Pong',
        type: 'numeric',
        maxScore: 11,
        winBy: 2,
        increments: [1],
        serviceRotationPoints: 2
    },
    volleyball: {
        id: 'volleyball',
        name: 'Voleibol',
        type: 'numeric',
        maxScore: 25,
        winBy: 2,
        increments: [1],
        serviceRotationPoints: 1
    },
    basket: {
        id: 'basket',
        name: 'Baloncesto',
        type: 'numeric',
        increments: [1, 2, 3],
        serviceRotationPoints: 0
    }
};
