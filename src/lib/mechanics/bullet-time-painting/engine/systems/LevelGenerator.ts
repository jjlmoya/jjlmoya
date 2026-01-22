import type { Obstacle, Vector2D } from "../Types";
import { CANVAS_WIDTH, CANVAS_HEIGHT, STAGE_PADDING } from "../Constants";

export class LevelGenerator {
    public static generateObstacles(level: number): Obstacle[] {
        const obstacles: Obstacle[] = [];
        const count = 4 + Math.min(level, 6);

        const minSize = 100;
        const maxSize = 300;

        for (let i = 0; i < count; i++) {
            let obs: Obstacle;
            let overlapping = true;
            let attempts = 0;

            do {
                const width = minSize + Math.random() * (maxSize - minSize);
                const height = minSize + Math.random() * (maxSize - minSize);
                obs = {
                    x:
                        STAGE_PADDING +
                        100 +
                        Math.random() * (CANVAS_WIDTH - STAGE_PADDING * 2 - width - 200),
                    y:
                        STAGE_PADDING +
                        100 +
                        Math.random() * (CANVAS_HEIGHT - STAGE_PADDING * 2 - height - 200),
                    width,
                    height,
                };

                overlapping = obstacles.some(
                    (other) =>
                        obs.x < other.x + other.width + 50 &&
                        obs.x + obs.width + 50 > other.x &&
                        obs.y < other.y + other.height + 50 &&
                        obs.y + obs.height + 50 > other.y
                );

                const centerX = CANVAS_WIDTH / 2;
                const centerY = CANVAS_HEIGHT / 2;
                if (
                    Math.abs(obs.x + obs.width / 2 - centerX) < 200 &&
                    Math.abs(obs.y + obs.height / 2 - centerY) < 200
                ) {
                    overlapping = true;
                }

                attempts++;
            } while (overlapping && attempts < 50);

            if (!overlapping) {
                obstacles.push(obs);
            }
        }
        return obstacles;
    }

    public static getEnemyCount(level: number): number {
        return 3 + Math.floor(level / 2);
    }

    public static getEnemyCooldown(level: number): number {
        return Math.max(40, 100 - level * 2);
    }

    public static getEnemySpeed(level: number): number {
        return Math.min(8, 4 + level * 0.2);
    }
}
