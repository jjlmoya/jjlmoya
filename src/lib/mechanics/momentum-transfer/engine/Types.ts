export interface Vector2 {
    x: number;
    y: number;
}

export interface Entity {
    id: number;
    pos: Vector2;
    vel: Vector2;
    radius: number;
    type: "player" | "enemy";
    isDead: boolean;
    color: string;
}

export interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    type: "wall" | "spike" | "void";
}

export interface GameState {
    player: Entity;
    enemies: Entity[];
    obstacles: Obstacle[];
    isDragging: boolean;
    dragStart: Vector2;
    dragCurrent: Vector2;
    resetting: boolean;
}
