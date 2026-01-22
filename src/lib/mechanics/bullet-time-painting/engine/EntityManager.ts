import type { Entity, Vector2D, Obstacle } from "./Types";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PLAYER_SIZE,
    ENEMY_SIZE,
    BULLET_SIZE,
    STAGE_PADDING,
    MAX_HP,
} from "./Constants";
import { LevelGenerator } from "./systems/LevelGenerator";

export class EntityManager {
    private entities: Entity[] = [];
    private nextId = 0;

    constructor() {
        this.reset(1, []);
    }

    private generateId(): string {
        return (this.nextId++).toString();
    }

    public reset(level: number, obstacles: Obstacle[]): void {
        this.nextId = 0;
        this.entities = [];
        this.spawnPlayer();
        this.spawnInitialEnemies(level, obstacles);
    }

    private spawnPlayer(): void {
        this.entities.push({
            id: this.generateId(),
            position: {
                x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
                y: CANVAS_HEIGHT / 2 - PLAYER_SIZE / 2,
            },
            velocity: { x: 0, y: 0 },
            size: PLAYER_SIZE,
            type: "player",
            destroyed: false,
            hp: MAX_HP,
        });
    }

    private spawnInitialEnemies(level: number, obstacles: Obstacle[]): void {
        const enemyCount = LevelGenerator.getEnemyCount(level);
        const margin = STAGE_PADDING + 40;

        for (let i = 0; i < enemyCount; i++) {
            let pos: Vector2D;
            let invalidPos = true;
            let attempts = 0;

            do {
                pos = {
                    x: margin + Math.random() * (CANVAS_WIDTH - margin * 2),
                    y: margin + Math.random() * (CANVAS_HEIGHT - margin * 2),
                };

                const inObstacle = obstacles.some(
                    (obs) =>
                        pos.x < obs.x + obs.width + 20 &&
                        pos.x + ENEMY_SIZE > obs.x - 20 &&
                        pos.y < obs.y + obs.height + 20 &&
                        pos.y + ENEMY_SIZE > obs.y - 20
                );

                const distToCenter = Math.sqrt(
                    Math.pow(pos.x - CANVAS_WIDTH / 2, 2) + Math.pow(pos.y - CANVAS_HEIGHT / 2, 2)
                );

                invalidPos = inObstacle || distToCenter < 400;
                attempts++;
            } while (invalidPos && attempts < 100);

            const speed = LevelGenerator.getEnemySpeed(level);
            this.entities.push({
                id: this.generateId(),
                position: pos,
                velocity: {
                    x: (Math.random() - 0.5) * speed,
                    y: (Math.random() - 0.5) * speed,
                },
                size: ENEMY_SIZE,
                type: "enemy",
                destroyed: false,
                weaponCooldown: Math.random() * LevelGenerator.getEnemyCooldown(level),
            });
        }
    }

    public getEntities(): Entity[] {
        return this.entities;
    }

    public cleanDestroyed(): void {
        this.entities = this.entities.filter((e) => !e.destroyed);
    }

    public getPlayer(): Entity | undefined {
        return this.entities.find((e) => e.type === "player");
    }

    public addBullet(
        position: Vector2D,
        velocity: Vector2D,
        type: "bullet" | "enemy_bullet"
    ): void {
        this.entities.push({
            id: this.generateId(),
            position: { ...position },
            velocity: { ...velocity },
            size: BULLET_SIZE,
            type,
            destroyed: false,
        });
    }
}
