import type { Entity, Obstacle } from "../Types";
import { STAGE_PADDING, CANVAS_WIDTH, CANVAS_HEIGHT } from "../Constants";

export class CollisionSystem {
    public static update(entities: Entity[], obstacles: Obstacle[]): void {
        entities.forEach((entity) => {
            if (entity.destroyed) return;

            if (entity.type === "bullet" || entity.type === "enemy_bullet") {
                this.handleBulletWorldCollisions(entity, obstacles);
                this.handleBulletEntityCollisions(entity, entities);
            }
        });
    }

    private static handleBulletWorldCollisions(entity: Entity, obstacles: Obstacle[]): void {
        const outOfBounds =
            entity.position.x < STAGE_PADDING ||
            entity.position.x > CANVAS_WIDTH - STAGE_PADDING ||
            entity.position.y < STAGE_PADDING ||
            entity.position.y > CANVAS_HEIGHT - STAGE_PADDING;

        if (outOfBounds) {
            entity.destroyed = true;
            return;
        }

        obstacles.forEach((obs) => {
            if (
                entity.position.x > obs.x &&
                entity.position.x < obs.x + obs.width &&
                entity.position.y > obs.y &&
                entity.position.y < obs.y + obs.height
            ) {
                entity.destroyed = true;
            }
        });
    }

    private static handleBulletEntityCollisions(bullet: Entity, entities: Entity[]): void {
        entities.forEach((other) => {
            if (other.destroyed || other === bullet) return;

            if (bullet.type === "bullet" && other.type === "enemy") {
                if (this.checkCircleCollision(bullet, other)) {
                    bullet.destroyed = true;
                    other.destroyed = true;
                }
            }

            if (bullet.type === "enemy_bullet" && other.type === "player") {
                if (this.checkCircleCollision(bullet, other)) {
                    bullet.destroyed = true;
                    if (other.hp !== undefined) {
                        other.hp--;
                        if (other.hp <= 0) {
                            other.destroyed = true;
                        }
                    } else {
                        other.destroyed = true;
                    }
                }
            }
        });
    }

    private static checkCircleCollision(e1: Entity, e2: Entity): boolean {
        const dx = e1.position.x - (e2.position.x + e2.size / 2);
        const dy = e1.position.y - (e2.position.y + e2.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (e1.size + e2.size) / 2;
    }
}
