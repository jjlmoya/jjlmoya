import type { Entity, GameState, Vector2D, Obstacle } from "./Types";
import { COLORS, CANVAS_WIDTH, CANVAS_HEIGHT, MAX_ENERGY, STAGE_PADDING } from "./Constants";

export class Renderer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public render(state: GameState, activeDrawing: any): void {
        this.clear();
        this.drawFloor();
        this.drawObstacles(state.obstacles);
        this.drawEntities(state.enemies);
        this.drawBullets(state.bullets);
        this.drawPlayer(state.player);

        if (!state.isExecutionPhase && state.player) {
            const playerCenter = {
                x: state.player.position.x + state.player.size / 2,
                y: state.player.position.y + state.player.size / 2,
            };

            state.plannedActions.forEach((action) => {
                this.drawArrow(playerCenter, action.vector, action.type, true);
            });

            if (activeDrawing) {
                const vector = {
                    x: (activeDrawing.end.x - activeDrawing.start.x) / 5,
                    y: (activeDrawing.end.y - activeDrawing.start.y) / 5,
                };
                this.drawArrow(playerCenter, vector, activeDrawing.type, false);
            }
        }

        if (state.isExecutionPhase) {
            this.drawExecutionOverlay();
        }
    }

    private clear(): void {
        this.ctx.fillStyle = COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    private drawFloor(): void {
        this.ctx.strokeStyle = COLORS.GRID;
        this.ctx.lineWidth = 1;
        const cellSize = 80;
        for (let x = 0; x < CANVAS_WIDTH; x += cellSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, CANVAS_HEIGHT);
            this.ctx.stroke();
        }
        for (let y = 0; y < CANVAS_HEIGHT; y += cellSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(CANVAS_WIDTH, y);
            this.ctx.stroke();
        }

        this.ctx.strokeStyle = COLORS.UI_ACCENT;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(
            STAGE_PADDING,
            STAGE_PADDING,
            CANVAS_WIDTH - STAGE_PADDING * 2,
            CANVAS_HEIGHT - STAGE_PADDING * 2
        );
    }

    private drawObstacles(obstacles: Obstacle[]): void {
        obstacles.forEach((obs) => {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            this.ctx.fillRect(obs.x + 10, obs.y + 10, obs.width, obs.height);
            this.ctx.fillStyle = COLORS.OBSTACLE;
            this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            this.ctx.strokeStyle = COLORS.OBSTACLE_BORDER;
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
        });
    }

    private drawEntities(entities: Entity[]): void {
        entities.forEach((entity) => {
            this.ctx.save();
            this.ctx.translate(
                entity.position.x + entity.size / 2,
                entity.position.y + entity.size / 2
            );
            this.ctx.fillStyle = COLORS.ENEMY;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = COLORS.ENEMY;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, entity.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
            const angle = Math.atan2(entity.velocity.y, entity.velocity.x);
            this.ctx.rotate(angle);
            this.ctx.fillStyle = "#111";
            this.ctx.fillRect(entity.size / 4, -entity.size / 6, entity.size / 2, entity.size / 3);
            this.ctx.strokeStyle = "#fff";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(
                entity.size / 4,
                -entity.size / 6,
                entity.size / 2,
                entity.size / 3
            );
            this.ctx.restore();
        });
    }

    private drawBullets(bullets: Entity[]): void {
        bullets.forEach((bullet) => {
            this.ctx.fillStyle = bullet.type === "bullet" ? COLORS.BULLET : COLORS.ENEMY_BULLET;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = bullet.type === "bullet" ? COLORS.BULLET : COLORS.ENEMY_BULLET;
            this.ctx.beginPath();
            this.ctx.arc(bullet.position.x, bullet.position.y, bullet.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }

    private drawPlayer(player: Entity | undefined): void {
        if (!player) return;
        this.ctx.save();
        this.ctx.translate(
            player.position.x + player.size / 2,
            player.position.y + player.size / 2
        );
        this.ctx.fillStyle = COLORS.PLAYER;
        this.ctx.shadowBlur = 25;
        this.ctx.shadowColor = COLORS.PLAYER;
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            const r = player.size / 2;
            if (i === 0) this.ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
            else this.ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.restore();
    }

    private drawExecutionOverlay(): void {
        this.ctx.fillStyle = "rgba(0, 255, 210, 0.05)";
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    private drawArrow(
        origin: Vector2D,
        vector: Vector2D,
        type: "move" | "shoot",
        persistent: boolean
    ): void {
        let endX: number;
        let endY: number;

        if (type === "shoot") {
            const fixedLength = 60;
            const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            const ux = mag > 0 ? vector.x / mag : 0;
            const uy = mag > 0 ? vector.y / mag : 0;
            endX = origin.x + ux * fixedLength;
            endY = origin.y + uy * fixedLength;
        } else {
            endX = origin.x + vector.x * 5;
            endY = origin.y + vector.y * 5;
        }

        this.ctx.strokeStyle = type === "move" ? COLORS.PLAYER : COLORS.BULLET;
        this.ctx.lineWidth = persistent ? 2 : 4;
        this.ctx.globalAlpha = persistent ? 0.6 : 1.0;
        this.ctx.shadowBlur = persistent ? 5 : 15;
        this.ctx.shadowColor = this.ctx.strokeStyle;

        this.ctx.beginPath();
        this.ctx.moveTo(origin.x, origin.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();

        const angle = Math.atan2(endY - origin.y, endX - origin.x);
        const headSize = persistent ? 8 : 12;
        this.ctx.beginPath();
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - headSize * Math.cos(angle - Math.PI / 6),
            endY - headSize * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            endX - headSize * Math.cos(angle + Math.PI / 6),
            endY - headSize * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.closePath();
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.fill();

        this.ctx.globalAlpha = 1.0;
        this.ctx.shadowBlur = 0;
    }
}
