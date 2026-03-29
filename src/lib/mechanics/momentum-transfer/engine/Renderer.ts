import type { GameState, Obstacle } from "./Types";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    BG_COLOR,
    OBS_WALL_COLOR,
    OBS_SPIKE_COLOR,
} from "./Constants";

export class Renderer {
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!;

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    }

    public render(state: GameState) {
        this.clear();
        this.drawObstacles(state.obstacles);
        this.drawDragLine(state);
        this.drawEntity(state.player);
        state.enemies.forEach((enemy) => this.drawEntity(enemy));

        if (state.enemies.length === 0) {
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "bold 80px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText("¡NIVEL LIMPIO!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        }
    }

    private clear() {
        this.ctx.fillStyle = BG_COLOR;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    private drawObstacles(obstacles: Obstacle[]) {
        obstacles.forEach((obs) => {
            this.ctx.save();
            if (obs.type === "wall") {
                this.ctx.fillStyle = OBS_WALL_COLOR;
                this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                this.ctx.strokeStyle = "#aaa";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
            } else if (obs.type === "spike") {
                this.ctx.fillStyle = OBS_SPIKE_COLOR;
                this.ctx.beginPath();
                const spikeSize = 20;
                const rows = Math.ceil(obs.height / spikeSize);
                const cols = Math.ceil(obs.width / spikeSize);

                this.ctx.fillStyle = "#300";
                this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

                this.ctx.fillStyle = "#f44";
                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        const sx = obs.x + i * spikeSize;
                        const sy = obs.y + j * spikeSize;
                        if (
                            sx + spikeSize > obs.x + obs.width ||
                            sy + spikeSize > obs.y + obs.height
                        )
                            continue;

                        this.ctx.beginPath();
                        this.ctx.moveTo(sx + spikeSize / 2, sy);
                        this.ctx.lineTo(sx + spikeSize, sy + spikeSize);
                        this.ctx.lineTo(sx, sy + spikeSize);
                        this.ctx.fill();
                    }
                }

                this.ctx.strokeStyle = "#f00";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
            } else {
                this.ctx.fillStyle = "#050505";
                this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

                this.ctx.strokeStyle = "#1a1a1a";
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                for (let i = 0; i < obs.width + obs.height; i += 20) {
                    this.ctx.moveTo(obs.x + i, obs.y);
                    this.ctx.lineTo(obs.x, obs.y + i);
                }
                this.ctx.stroke();

                this.ctx.strokeStyle = "#333";
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 5]);
                this.ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
                this.ctx.setLineDash([]);
            }
            this.ctx.restore();
        });
    }

    private drawDragLine(state: GameState) {
        if (state.isDragging) {
            this.ctx.beginPath();
            this.ctx.moveTo(state.player.pos.x, state.player.pos.y);
            this.ctx.lineTo(state.dragCurrent.x, state.dragCurrent.y);
            this.ctx.strokeStyle = "#fff";
            this.ctx.setLineDash([10, 10]);
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    private drawEntity(entity: any) {
        this.ctx.save();
        this.ctx.translate(entity.pos.x, entity.pos.y);
        this.ctx.fillStyle = entity.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, entity.radius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = entity.color;
        this.ctx.stroke();

        this.ctx.restore();
    }
}
