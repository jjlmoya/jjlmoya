import { EntityManager } from "./engine/EntityManager";
import { InputManager } from "./engine/InputManager";
import { Renderer } from "./engine/Renderer";
import { PhysicsSystem } from "./engine/systems/PhysicsSystem";
import { AISystem } from "./engine/systems/AISystem";
import { CollisionSystem } from "./engine/systems/CollisionSystem";
import { LevelGenerator } from "./engine/systems/LevelGenerator";
import type { GameState, Action, Entity } from "./engine/Types";
import {
    MAX_ENERGY,
    ACTION_DURATION,
    SHOOT_ENERGY_COST,
    JUMP_ENERGY_COST_PER_PIXEL,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SAVE_KEY,
    MAX_HP,
} from "./engine/Constants";

export class BulletTimeGame {
    private entityManager: EntityManager;
    private inputManager: InputManager;
    private renderer: Renderer;
    private state: GameState;
    private animationId: number | null = null;

    constructor(canvas: HTMLCanvasElement) {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d")!;
        this.entityManager = new EntityManager();
        this.renderer = new Renderer(ctx);

        const savedLevel = this.loadLevel();
        const level = savedLevel || 1;
        const obstacles = LevelGenerator.generateObstacles(level);

        this.entityManager.reset(level, obstacles);
        const player = this.entityManager.getPlayer();

        this.state = {
            player: player!,
            enemies: [],
            bullets: [],
            energy: MAX_ENERGY,
            hp: player?.hp || MAX_HP,
            maxHp: MAX_HP,
            level: level,
            obstacles: obstacles,
            isExecutionPhase: false,
            remainingExecutionFrames: 0,
            plannedActions: [],
        };

        this.inputManager = new InputManager(this.handleActionCreated.bind(this));
        this.inputManager.attach(canvas);
        this.loop = this.loop.bind(this);
    }

    private saveLevel(level: number): void {
        localStorage.setItem(SAVE_KEY, level.toString());
    }

    private loadLevel(): number | null {
        const saved = localStorage.getItem(SAVE_KEY);
        return saved ? parseInt(saved) : null;
    }

    public resize(): void {
        const canvas = (this.renderer as any).ctx.canvas as HTMLCanvasElement;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    }

    private handleActionCreated(action: Action): void {
        if (this.state.isExecutionPhase || !this.state.player) return;

        let cost = 0;
        const mag = Math.sqrt(
            action.vector.x * action.vector.x + action.vector.y * action.vector.y
        );

        if (action.type === "move") {
            cost = mag * 5 * JUMP_ENERGY_COST_PER_PIXEL;
        } else {
            cost = SHOOT_ENERGY_COST;
        }

        if (this.state.energy >= cost - 0.01) {
            this.state.energy -= cost;
            if (this.state.energy < 0) this.state.energy = 0;
            this.state.plannedActions.push(action);
        }
    }

    public start(): void {
        if (this.animationId) return;
        this.loop();
    }

    public stop(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    public playAction(): void {
        if (this.state.isExecutionPhase || !this.state.player) return;
        this.state.isExecutionPhase = true;
        this.state.remainingExecutionFrames = ACTION_DURATION;

        const player = this.state.player;
        const playerCenter = {
            x: player.position.x + player.size / 2,
            y: player.position.y + player.size / 2,
        };

        this.state.plannedActions.forEach((action) => {
            if (action.type === "move") {
                player.velocity.x += action.vector.x;
                player.velocity.y += action.vector.y;
            } else {
                const mag = Math.sqrt(
                    action.vector.x * action.vector.x + action.vector.y * action.vector.y
                );
                const normalizedVel = {
                    x: (action.vector.x / (mag || 1)) * 15,
                    y: (action.vector.y / (mag || 1)) * 15,
                };
                this.entityManager.addBullet(
                    { x: playerCenter.x, y: playerCenter.y },
                    normalizedVel,
                    "bullet"
                );
            }
        });

        this.state.plannedActions = [];
    }

    private nextLevel(): void {
        this.state.level++;
        this.saveLevel(this.state.level);
        this.state.obstacles = LevelGenerator.generateObstacles(this.state.level);
        this.entityManager.reset(this.state.level, this.state.obstacles);
        this.state.player = this.entityManager.getPlayer()!;
        this.state.energy = MAX_ENERGY;
    }

    private loop(): void {
        this.update();
        this.render();
        this.animationId = requestAnimationFrame(this.loop);
    }

    private update(): void {
        const entities = this.entityManager.getEntities();
        const player = this.entityManager.getPlayer();

        if (this.state.isExecutionPhase) {
            entities.forEach((entity) => {
                PhysicsSystem.update(entity, this.state.obstacles);

                if (entity.type === "enemy") {
                    AISystem.update(entity, player, (b: Entity) => {
                        this.entityManager.addBullet(b.position, b.velocity, "enemy_bullet");
                    });
                }
            });

            CollisionSystem.update(entities, this.state.obstacles);
            this.entityManager.cleanDestroyed();

            this.state.remainingExecutionFrames--;
            if (this.state.remainingExecutionFrames <= 0) {
                this.state.isExecutionPhase = false;
                this.state.energy = MAX_ENERGY;

                const enemies = entities.filter((e) => e.type === "enemy");
                if (enemies.length === 0) {
                    this.nextLevel();
                }
            }
        }

        if (!player && !this.state.isExecutionPhase) {
            this.entityManager.reset(this.state.level, this.state.obstacles);
            this.state.player = this.entityManager.getPlayer()!;
            this.state.energy = MAX_ENERGY;
        } else if (player) {
            this.state.player = player;
            this.state.hp = player.hp || 0;
        }

        this.state.enemies = entities.filter((e) => e.type === "enemy");
        this.state.bullets = entities.filter(
            (e) => e.type === "bullet" || e.type === "enemy_bullet"
        );
    }

    private render(): void {
        const activeDrawing = this.inputManager.getActiveDrawing();
        this.renderer.render(this.state, activeDrawing);
    }
}
