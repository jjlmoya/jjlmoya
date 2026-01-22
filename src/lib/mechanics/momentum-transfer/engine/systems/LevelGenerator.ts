import type { Entity, Obstacle } from "../Types";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_COLOR, ENEMY_COLOR } from "../Constants";

export class LevelGenerator {
    public static initLevel(): { player: Entity; enemies: Entity[]; obstacles: Obstacle[] } {
        const w = CANVAS_WIDTH;
        const h = CANVAS_HEIGHT;

        const player: Entity = {
            id: 0,
            pos: { x: w * 0.2, y: h * 0.5 },
            vel: { x: 0, y: 0 },
            radius: 15,
            type: "player",
            isDead: false,
            color: PLAYER_COLOR,
        };

        const enemies: Entity[] = [
            {
                id: 1,
                pos: { x: w * 0.5, y: h * 0.5 },
                vel: { x: 0, y: 0 },
                radius: 25,
                type: "enemy",
                isDead: false,
                color: ENEMY_COLOR,
            },
            {
                id: 2,
                pos: { x: w * 0.6, y: h * 0.3 },
                vel: { x: 0, y: 0 },
                radius: 25,
                type: "enemy",
                isDead: false,
                color: ENEMY_COLOR,
            },
            {
                id: 3,
                pos: { x: w * 0.6, y: h * 0.7 },
                vel: { x: 0, y: 0 },
                radius: 25,
                type: "enemy",
                isDead: false,
                color: ENEMY_COLOR,
            },
            {
                id: 4,
                pos: { x: w * 0.8, y: h * 0.5 },
                vel: { x: 0, y: 0 },
                radius: 35,
                type: "enemy",
                isDead: false,
                color: ENEMY_COLOR,
            },
        ];

        const obstacles: Obstacle[] = [
            { x: w * 0.45, y: h * 0.1, width: 100, height: h * 0.2, type: "spike" },
            { x: w * 0.45, y: h * 0.7, width: 100, height: h * 0.2, type: "spike" },

            { x: w * 0.9, y: h * 0.2, width: w * 0.1, height: h * 0.6, type: "void" },

            { x: w * 0.35, y: h * 0.2, width: 20, height: 200, type: "wall" },
            { x: w * 0.35, y: h * 0.6, width: 20, height: 200, type: "wall" },
        ];

        return { player, enemies, obstacles };
    }
}
