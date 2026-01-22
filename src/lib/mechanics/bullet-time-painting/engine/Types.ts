export interface Vector2D {
    x: number;
    y: number;
}

export interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Entity {
    id: string;
    position: Vector2D;
    velocity: Vector2D;
    size: number;
    type: "player" | "enemy" | "bullet" | "enemy_bullet";
    destroyed: boolean;
    hp?: number;
    weaponCooldown?: number;
}

export interface Action {
    type: "move" | "shoot";
    vector: Vector2D;
}

export interface GameState {
    player: Entity;
    enemies: Entity[];
    bullets: Entity[];
    energy: number;
    hp: number;
    maxHp: number;
    level: number;
    obstacles: Obstacle[];
    isExecutionPhase: boolean;
    remainingExecutionFrames: number;
    plannedActions: Action[];
}
