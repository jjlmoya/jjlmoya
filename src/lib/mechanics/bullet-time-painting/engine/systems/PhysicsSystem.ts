import type { Entity, Vector2D, Obstacle } from "../Types";
import { CANVAS_WIDTH, CANVAS_HEIGHT, STAGE_PADDING, MOVEMENT_DRAG } from "../Constants";

export class PhysicsSystem {
    public static update(entity: Entity, obstacles: Obstacle[]): void {
        const prevPos = { ...entity.position };

        entity.position.x += entity.velocity.x;
        entity.position.y += entity.velocity.y;

        if (entity.type === "player" || entity.type === "enemy") {
            entity.velocity.x *= MOVEMENT_DRAG;
            entity.velocity.y *= MOVEMENT_DRAG;

            const speed = Math.sqrt(
                entity.velocity.x * entity.velocity.x + entity.velocity.y * entity.velocity.y
            );
            const maxSpeed = entity.type === "player" ? 18 : 6;
            if (speed > maxSpeed) {
                entity.velocity.x = (entity.velocity.x / speed) * maxSpeed;
                entity.velocity.y = (entity.velocity.y / speed) * maxSpeed;
            }
        }

        this.handleObstacleCollisions(entity, prevPos, obstacles);
        this.handleBounds(entity);
    }

    private static handleObstacleCollisions(
        entity: Entity,
        prevPos: Vector2D,
        obstacles: Obstacle[]
    ): void {
        const isBullet = entity.type === "bullet" || entity.type === "enemy_bullet";

        obstacles.forEach((obs) => {
            if (
                entity.position.x < obs.x + obs.width &&
                entity.position.x + entity.size > obs.x &&
                entity.position.y < obs.y + obs.height &&
                entity.position.y + entity.size > obs.y
            ) {
                if (isBullet) {
                    entity.destroyed = true;
                    return;
                }

                const wasAbove = prevPos.y + entity.size <= obs.y;
                const wasBelow = prevPos.y >= obs.y + obs.height;
                const wasLeft = prevPos.x + entity.size <= obs.x;
                const wasRight = prevPos.x >= obs.x + obs.width;

                if (wasAbove) {
                    entity.position.y = obs.y - entity.size;
                    entity.velocity.y *= -0.2;
                } else if (wasBelow) {
                    entity.position.y = obs.y + obs.height;
                    entity.velocity.y *= -0.2;
                } else if (wasLeft) {
                    entity.position.x = obs.x - entity.size;
                    entity.velocity.x *= -0.2;
                } else if (wasRight) {
                    entity.position.x = obs.x + obs.width;
                    entity.velocity.x *= -0.2;
                }
            }
        });
    }

    private static handleBounds(entity: Entity): void {
        const minX = STAGE_PADDING;
        const maxX = CANVAS_WIDTH - STAGE_PADDING - entity.size;
        const minY = STAGE_PADDING;
        const maxY = CANVAS_HEIGHT - STAGE_PADDING - entity.size;

        const isBullet = entity.type === "bullet" || entity.type === "enemy_bullet";

        if (isBullet) {
            if (
                entity.position.x < minX ||
                entity.position.x > maxX ||
                entity.position.y < minY ||
                entity.position.y > maxY
            ) {
                entity.destroyed = true;
            }
            return;
        }

        if (entity.position.x < minX) {
            entity.position.x = minX;
            entity.velocity.x *= -0.5;
        }
        if (entity.position.x > maxX) {
            entity.position.x = maxX;
            entity.velocity.x *= -0.5;
        }
        if (entity.position.y < minY) {
            entity.position.y = minY;
            entity.velocity.y *= -0.5;
        }
        if (entity.position.y > maxY) {
            entity.position.y = maxY;
            entity.velocity.y *= -0.5;
        }
    }
}
