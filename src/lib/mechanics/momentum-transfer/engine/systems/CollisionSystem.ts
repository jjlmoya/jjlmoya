import type { Entity, Obstacle } from "../Types";

export class CollisionSystem {
    public static checkEntityCollisions(player: Entity, enemies: Entity[]) {
        for (const enemy of enemies) {
            const dx = enemy.pos.x - player.pos.x;
            const dy = enemy.pos.y - player.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < player.radius + enemy.radius) {
                CollisionSystem.resolveMomentumTransfer(player, enemy);
            }
        }
    }

    public static checkEnemyCollisions(enemies: Entity[]) {
        for (let i = 0; i < enemies.length; i++) {
            for (let j = i + 1; j < enemies.length; j++) {
                const e1 = enemies[i];
                const e2 = enemies[j];
                const dx = e2.pos.x - e1.pos.x;
                const dy = e2.pos.y - e1.pos.y;
                const distSq = dx * dx + dy * dy;
                const minDist = e1.radius + e2.radius;

                if (distSq < minDist * minDist) {
                    CollisionSystem.resolveMomentumTransfer(e1, e2);
                }
            }
        }
    }

    private static resolveMomentumTransfer(e1: Entity, e2: Entity) {
        const speed1 = Math.sqrt(e1.vel.x ** 2 + e1.vel.y ** 2);
        const speed2 = Math.sqrt(e2.vel.x ** 2 + e2.vel.y ** 2);

        if (speed1 > speed2) {
            e2.vel = { ...e1.vel };
            e1.vel = { x: 0, y: 0 };
        } else if (speed2 > speed1) {
            e1.vel = { ...e2.vel };
            e2.vel = { x: 0, y: 0 };
        } else {
            const temp = { ...e1.vel };
            e1.vel = { ...e2.vel };
            e2.vel = temp;
        }

        const dx = e2.pos.x - e1.pos.x;
        const dy = e2.pos.y - e1.pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const overlap = e1.radius + e2.radius - dist;

        if (dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const sepX = nx * overlap * 0.51;
            const sepY = ny * overlap * 0.51;

            e1.pos.x -= sepX;
            e1.pos.y -= sepY;
            e2.pos.x += sepX;
            e2.pos.y += sepY;
        }
    }

    public static checkObstacleCollisions(entities: Entity[], obstacles: Obstacle[]) {
        entities.forEach((entity) => {
            if (entity.isDead) return;

            for (const obs of obstacles) {
                const closestX = Math.max(obs.x, Math.min(entity.pos.x, obs.x + obs.width));
                const closestY = Math.max(obs.y, Math.min(entity.pos.y, obs.y + obs.height));

                const dx = entity.pos.x - closestX;
                const dy = entity.pos.y - closestY;
                const distanceSq = dx * dx + dy * dy;

                if (distanceSq < entity.radius * entity.radius) {
                    if (obs.type === "wall") {
                        CollisionSystem.resolveWallCollision(entity, obs);
                    } else if (obs.type === "spike" || obs.type === "void") {
                        entity.isDead = true;

                        entity.vel = { x: 0, y: 0 };
                    }
                }
            }
        });
    }

    private static resolveWallCollision(entity: Entity, wall: Obstacle) {
        const closestX = Math.max(wall.x, Math.min(entity.pos.x, wall.x + wall.width));
        const closestY = Math.max(wall.y, Math.min(entity.pos.y, wall.y + wall.height));

        const dx = entity.pos.x - closestX;
        const dy = entity.pos.y - closestY;

        if (dx === 0 && dy === 0) {
            const dLeft = Math.abs(entity.pos.x - wall.x);
            const dRight = Math.abs(entity.pos.x - (wall.x + wall.width));
            const dTop = Math.abs(entity.pos.y - wall.y);
            const dBottom = Math.abs(entity.pos.y - (wall.y + wall.height));

            const min = Math.min(dLeft, dRight, dTop, dBottom);

            if (min === dLeft) {
                entity.pos.x = wall.x - entity.radius;
                entity.vel.x *= -1;
            } else if (min === dRight) {
                entity.pos.x = wall.x + wall.width + entity.radius;
                entity.vel.x *= -1;
            } else if (min === dTop) {
                entity.pos.y = wall.y - entity.radius;
                entity.vel.y *= -1;
            } else {
                entity.pos.y = wall.y + wall.height + entity.radius;
                entity.vel.y *= -1;
            }
            return;
        }

        const dist = Math.sqrt(dx * dx + dy * dy);
        const overlap = entity.radius - dist;

        if (overlap > 0) {
            const nx = dx / dist;
            const ny = dy / dist;

            entity.pos.x += nx * overlap;
            entity.pos.y += ny * overlap;

            const dot = entity.vel.x * nx + entity.vel.y * ny;

            entity.vel.x = entity.vel.x - 2 * dot * nx;
            entity.vel.y = entity.vel.y - 2 * dot * ny;

            entity.vel.x *= 0.9;
            entity.vel.y *= 0.9;
        }
    }
}
