import type { Entity } from "../Types";
import { FRICTION, STOP_THRESHOLD, CANVAS_WIDTH, CANVAS_HEIGHT } from "../Constants";

export class PhysicsSystem {
    public static update(entity: Entity) {
        entity.pos.x += entity.vel.x;
        entity.pos.y += entity.vel.y;

        entity.vel.x *= FRICTION;
        entity.vel.y *= FRICTION;

        if (Math.abs(entity.vel.x) < STOP_THRESHOLD) entity.vel.x = 0;
        if (Math.abs(entity.vel.y) < STOP_THRESHOLD) entity.vel.y = 0;

        if (entity.pos.x - entity.radius < 0) {
            entity.pos.x = entity.radius;
            entity.vel.x *= -1;
        }
        if (entity.pos.x + entity.radius > CANVAS_WIDTH) {
            entity.pos.x = CANVAS_WIDTH - entity.radius;
            entity.vel.x *= -1;
        }
        if (entity.pos.y - entity.radius < 0) {
            entity.pos.y = entity.radius;
            entity.vel.y *= -1;
        }
        if (entity.pos.y + entity.radius > CANVAS_HEIGHT) {
            entity.pos.y = CANVAS_HEIGHT - entity.radius;
            entity.vel.y *= -1;
        }
    }
}
