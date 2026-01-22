import { CONSTANTS } from "./engine/Constants";
import { InputManager } from "./engine/InputManager";
import { WorldManager } from "./engine/WorldManager";
import { Renderer } from "./engine/Renderer";
import type { Particle, Upgrades } from "./engine/Types";

export class ScrollMomentumGame {
    private renderer: Renderer;
    private input: InputManager;
    private world: WorldManager;

    private isRunning: boolean = false;
    private animationId: number = 0;

    private x: number = 0;
    private y: number = 0;
    private angle: number = -Math.PI / 2;
    private velocity: number = 0;
    private angularVelocity: number = 0;

    private particles: Particle[] = [];
    private score: number = 0;
    private totalGathered: number = 0;
    private health: number = 100;
    private message: string = "";
    private messageTimer: number = 0;
    private gameOver: boolean = false;
    private cameraShake: number = 0;
    private time: number = 0;
    private pedalFlash: number = 0;

    private upgrades: Upgrades = { engine: 1, hull: 1, steering: 1 };
    private isAtBase: boolean = false;

    private readonly STORAGE_KEY = "scroll_momentum_save_v1";

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas);
        this.input = new InputManager(() => {
            if (this.gameOver) this.resetGame(false);
        });
        this.world = new WorldManager();

        window.addEventListener("resize", () => this.renderer.resize());

        this.loadGame();
        this.resetGame(true);
    }

    private loadGame() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.upgrades = data.upgrades || { engine: 1, hull: 1, steering: 1 };
                this.totalGathered = data.totalGathered || 0;
            } catch (e) {
                console.error("Error loading save", e);
            }
        }
    }

    private saveGame() {
        const data = {
            upgrades: this.upgrades,
            totalGathered: this.totalGathered,
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    private resetGame(keepPersistence: boolean = true) {
        this.x = 2500;
        this.y = 2500;
        this.angle = -Math.PI / 2;
        this.velocity = 0;
        this.angularVelocity = 0;
        this.score = 0;

        if (!keepPersistence) {
            this.totalGathered = Math.floor(this.totalGathered * 0.5);
            this.message = "MATERIAL PERDIDO EN EL IMPACTO";
            this.messageTimer = 180;
        } else {
            this.message = "LOCALIZA EL TALLER";
            this.messageTimer = 180;
        }

        this.health = 100;
        this.gameOver = false;
        this.world.initWorld();
        this.particles = [];
        this.renderer.resize();
        this.saveGame();
    }

    public start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop();
    }

    public stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
    }

    private loop() {
        if (!this.isRunning) return;
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.loop());
    }

    private update() {
        if (this.gameOver) return;

        const scroll = this.input.consumeScroll();
        if (Math.abs(scroll) > 0.001) {
            this.velocity += scroll * (4.5 + this.upgrades.engine * 0.5);
            this.pedalFlash = 0.6;
        }

        const turnSpeed = CONSTANTS.TURN_ACCEL * (1 + this.upgrades.steering * 0.2);
        if (this.input.keys["a"] || this.input.keys["A"] || this.input.keys["ArrowLeft"])
            this.angularVelocity -= turnSpeed;
        if (this.input.keys["d"] || this.input.keys["D"] || this.input.keys["ArrowRight"])
            this.angularVelocity += turnSpeed;

        this.angle += this.angularVelocity;
        this.angularVelocity *= CONSTANTS.ANGULAR_DRAG;

        this.x += Math.cos(this.angle) * this.velocity;
        this.y += Math.sin(this.angle) * this.velocity;

        const currentDrag = CONSTANTS.DRAG + this.upgrades.engine * 0.0005;
        this.velocity *= Math.min(0.998, currentDrag);

        if (this.velocity > 0.1) {
            this.particles.push({
                x: this.x - Math.cos(this.angle) * 35 + (Math.random() - 0.5) * 15,
                y: this.y - Math.sin(this.angle) * 35 + (Math.random() - 0.5) * 15,
                alpha: 1.0,
            });
        }
        this.particles.forEach((p) => (p.alpha -= 0.025));
        this.particles = this.particles.filter((p) => p.alpha > 0);

        this.checkCollisions();
        this.updateBaseInteraction();

        if (this.cameraShake > 0) this.cameraShake *= 0.92;

        if (this.velocity > CONSTANTS.WARP_SPEED && this.messageTimer === 0) {
            this.message = "IMPULSO WARP ACTIVO";
            this.messageTimer = 120;
        }

        this.time += 0.016;
        if (this.messageTimer > 0) this.messageTimer--;
        if (this.pedalFlash > 0) this.pedalFlash -= 0.04;
    }

    private updateBaseInteraction() {
        const dx = this.x - CONSTANTS.BASE_LOCATION.x;
        const dy = this.y - CONSTANTS.BASE_LOCATION.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
            if (!this.isAtBase) {
                this.isAtBase = true;
                if (this.score > 0) {
                    this.totalGathered += this.score;
                    this.score = 0;
                    this.message = "MATERIAL ALMACENADO";
                    this.messageTimer = 120;
                    this.health = Math.min(100, this.health + 30);
                    this.saveGame();
                }
            }
            this.handleUpgrades();
        } else {
            this.isAtBase = false;
        }
    }

    private handleUpgrades() {
        if (this.totalGathered >= CONSTANTS.UPGRADE_COST) {
            let upgraded = false;
            if (this.input.keys["1"]) {
                this.upgrades.engine++;
                this.totalGathered -= CONSTANTS.UPGRADE_COST;
                this.message = "MOTOR MEJORADO";
                this.messageTimer = 60;
                this.input.keys["1"] = false;
                upgraded = true;
            } else if (this.input.keys["2"]) {
                this.upgrades.hull++;
                this.totalGathered -= CONSTANTS.UPGRADE_COST;
                this.message = "CASCO REFORZADO";
                this.messageTimer = 60;
                this.input.keys["2"] = false;
                upgraded = true;
            } else if (this.input.keys["3"]) {
                this.upgrades.steering++;
                this.totalGathered -= CONSTANTS.UPGRADE_COST;
                this.message = "GIROS OPTIMIZADOS";
                this.messageTimer = 60;
                this.input.keys["3"] = false;
                upgraded = true;
            }

            if (upgraded) {
                this.saveGame();
            }
        }
    }

    private checkCollisions() {
        this.world.scrap.forEach((s) => {
            if (!s.gathered) {
                const dx = s.x - this.x;
                const dy = s.y - this.y;
                if (Math.sqrt(dx * dx + dy * dy) < 60) {
                    s.gathered = true;
                    this.score += 1;
                    this.message = "SCRAP EN BODEGA";
                    this.messageTimer = 60;
                }
            }
        });

        this.world.obstacles.forEach((o) => {
            const dx = o.x - this.x;
            const dy = o.y - this.y;
            if (Math.sqrt(dx * dx + dy * dy) < o.size / 2 + 25) {
                const damage = 35 / (1 + this.upgrades.hull * 0.5);
                this.health -= damage;
                this.velocity *= -0.3;
                this.cameraShake = 50;
                this.message = "¡COLISIÓN!";
                this.messageTimer = 60;
                if (this.health <= 0) {
                    this.gameOver = true;
                }
            }
        });
    }

    private draw() {
        this.renderer.clear();
        this.renderer.drawWorld(
            this.x,
            this.y,
            this.angle,
            this.world.stars,
            this.world.scrap,
            this.world.obstacles,
            this.world.nebulas,
            this.particles,
            this.velocity,
            this.cameraShake,
            this.time
        );
        this.renderer.drawShip(this.velocity, this.angularVelocity, this.pedalFlash);
        this.renderer.drawHUD(
            this.velocity,
            this.health,
            this.totalGathered + this.score,
            this.world.scrap,
            this.upgrades,
            this.isAtBase,
            this.x,
            this.y,
            this.angle,
            this.time
        );
        this.renderer.drawMessage(this.message, this.messageTimer);
        if (this.gameOver) this.renderer.drawGameOver();
        this.renderer.drawVignette();
    }
}
