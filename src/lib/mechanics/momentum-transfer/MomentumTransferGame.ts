import { Renderer } from "./engine/Renderer";
import { InputManager } from "./engine/InputManager";
import { PhysicsSystem } from "./engine/systems/PhysicsSystem";
import { CollisionSystem } from "./engine/systems/CollisionSystem";
import { LevelGenerator } from "./engine/systems/LevelGenerator";
import type { GameState, Vector2 } from "./engine/Types";
import { DRAG_POWER } from "./engine/Constants";

export class MomentumTransferGame {
    private renderer: Renderer;
    private inputManager: InputManager;
    private animationId: number | null = null;
    private state: GameState;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);

        const levelData = LevelGenerator.initLevel();
        this.state = {
            player: levelData.player,
            enemies: levelData.enemies,
            obstacles: levelData.obstacles,
            isDragging: false,
            dragStart: { x: 0, y: 0 },
            dragCurrent: { x: 0, y: 0 },
            resetting: false,
        };

        this.inputManager = new InputManager(
            canvas,
            this.handleDragStart.bind(this),
            this.handleDragMove.bind(this),
            this.handleDragEnd.bind(this)
        );
    }

    private handleDragStart(pos: Vector2) {
        const dx = pos.x - this.state.player.pos.x;
        const dy = pos.y - this.state.player.pos.y;
        if (dx * dx + dy * dy < this.state.player.radius * this.state.player.radius * 100) {
            this.state.isDragging = true;
            this.state.dragStart = pos;
        }
    }

    private handleDragMove(pos: Vector2) {
        if (this.state.isDragging) {
            this.state.dragCurrent = pos;
        }
    }

    private handleDragEnd(start: Vector2, end: Vector2) {
        if (this.state.isDragging) {
            this.state.isDragging = false;

            const dx = start.x - end.x;
            const dy = start.y - end.y;

            this.state.player.vel.x = dx * DRAG_POWER;
            this.state.player.vel.y = dy * DRAG_POWER;
        }
    }

    public start() {
        if (!this.animationId) {
            this.loop();
        }
    }

    public stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
            this.inputManager.detach();
        }
    }

    private loop = () => {
        this.update();
        this.renderer.render(this.state);
        this.animationId = requestAnimationFrame(this.loop);
    };

    private update() {
        PhysicsSystem.update(this.state.player);
        this.state.enemies.forEach((e) => PhysicsSystem.update(e));

        CollisionSystem.checkEntityCollisions(this.state.player, this.state.enemies);
        CollisionSystem.checkEnemyCollisions(this.state.enemies);
        CollisionSystem.checkObstacleCollisions(
            [this.state.player, ...this.state.enemies],
            this.state.obstacles
        );

        this.state.enemies = this.state.enemies.filter((e) => !e.isDead);

        if (this.state.player.isDead) {
            this.reset();
        }

        if (this.state.enemies.length === 0 && !this.state.resetting) {
            this.state.resetting = true;

            setTimeout(() => this.reset(), 1000);
        }
    }

    private reset() {
        const levelData = LevelGenerator.initLevel();
        this.state.player = levelData.player;
        this.state.enemies = levelData.enemies;
        this.state.resetting = false;

        this.state.player.vel = { x: 0, y: 0 };
        this.state.player.isDead = false;
    }
}
