export type SportId = "simple" | "tennis" | "padel" | "pingpong" | "volleyball" | "basket";

export type ScoreType = "numeric" | "tennis";

export interface SportConfig {
    id: SportId;
    name: string;
    type: ScoreType;

    maxScore?: number;
    winBy?: number;

    hasSets?: boolean;
    hasGames?: boolean;

    serviceRotationPoints?: number;

    increments: number[];
    colorScheme?: string;
}

export const SPORTS: Record<SportId, SportConfig> = {
    simple: {
        id: "simple",
        name: "Libre (Fútbol, 3 en Raya...)",
        type: "numeric",
        increments: [1],
        serviceRotationPoints: 0,
    },
    tennis: {
        id: "tennis",
        name: "Tenis",
        type: "tennis",
        hasSets: true,
        hasGames: true,
        increments: [1],
        serviceRotationPoints: 0,
    },
    padel: {
        id: "padel",
        name: "Pádel",
        type: "tennis",
        hasSets: true,
        hasGames: true,
        increments: [1],
        serviceRotationPoints: 0,
    },
    pingpong: {
        id: "pingpong",
        name: "Ping Pong",
        type: "numeric",
        maxScore: 11,
        winBy: 2,
        increments: [1],
        serviceRotationPoints: 2,
    },
    volleyball: {
        id: "volleyball",
        name: "Voleibol",
        type: "numeric",
        maxScore: 25,
        winBy: 2,
        increments: [1],
        serviceRotationPoints: 1,
    },
    basket: {
        id: "basket",
        name: "Baloncesto",
        type: "numeric",
        increments: [1, 2, 3],
        serviceRotationPoints: 0,
    },
};
