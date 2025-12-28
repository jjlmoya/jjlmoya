export interface Entity {
    x: number;
    y: number;
    size: number;
    seed: number;
}

export interface Scrap extends Entity {
    gathered: boolean;
}

export interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
}

export interface Particle {
    x: number;
    y: number;
    alpha: number;
}

export interface Nebula {
    x: number;
    y: number;
    size: number;
    color: string;
}

export interface Upgrades {
    engine: number;
    hull: number;
    steering: number;
}
