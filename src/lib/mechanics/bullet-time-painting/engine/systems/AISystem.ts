import type { Entity } from "../Types";
import { ENEMY_BULLET_SPEED, BULLET_SIZE } from "../Constants";

export class AISystem {
    public static update(
        enemy: Entity,
        player: Entity | undefined,
        addBullet: (b: Entity) => void
    ): void {
        if (!player || enemy.type !== "enemy" || enemy.destroyed) return;

        if (enemy.weaponCooldown! > 0) {
            enemy.weaponCooldown!--;
        } else {
            this.shoot(enemy, player, addBullet);
            enemy.weaponCooldown = 60 + Math.random() * 60;
        }

        const dx = player.position.x - enemy.position.x;
        const dy = player.position.y - enemy.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const targetDist = 400;
        if (dist > targetDist + 50) {
            enemy.velocity.x += (dx / dist) * 0.4;
            enemy.velocity.y += (dy / dist) * 0.4;
        } else if (dist < targetDist - 50) {
            enemy.velocity.x -= (dx / dist) * 0.3;
            enemy.velocity.y -= (dy / dist) * 0.3;
        }

        const time = Date.now() * 0.002;
        enemy.velocity.x += Math.cos(time + parseInt(enemy.id)) * 0.2;
        enemy.velocity.y += Math.sin(time + parseInt(enemy.id)) * 0.2;

        const speed = Math.sqrt(
            enemy.velocity.x * enemy.velocity.x + enemy.velocity.y * enemy.velocity.y
        );
        if (speed > 6) {
            enemy.velocity.x = (enemy.velocity.x / speed) * 6;
            enemy.velocity.y = (enemy.velocity.y / speed) * 6;
        }
    }

    private static shoot(enemy: Entity, player: Entity, addBullet: (b: Entity) => void): void {
        const dx = player.position.x - enemy.position.x;
        const dy = player.position.y - enemy.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const offset = (Math.random() - 0.5) * 0.1;
        const vx = dx / dist + offset;
        const vy = dy / dist + offset;
        const mag = Math.sqrt(vx * vx + vy * vy);

        const velocity = {
            x: (vx / mag) * ENEMY_BULLET_SPEED,
            y: (vy / mag) * ENEMY_BULLET_SPEED,
        };

        addBullet({
            id: Math.random().toString(),
            position: {
                x: enemy.position.x + enemy.size / 2,
                y: enemy.position.y + enemy.size / 2,
            },
            velocity,
            size: BULLET_SIZE,
            type: "enemy_bullet",
            destroyed: false,
        });
    }
}
