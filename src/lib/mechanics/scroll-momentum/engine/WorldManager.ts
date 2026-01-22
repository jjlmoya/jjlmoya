import { CONSTANTS } from "./Constants";
import type { Star, Scrap, Entity, Nebula } from "./Types";

export class WorldManager {
    public stars: Star[] = [];
    public scrap: Scrap[] = [];
    public obstacles: Entity[] = [];
    public nebulas: Nebula[] = [];

    constructor() {
        this.initStars();
        this.initWorld();
    }

    private initStars() {
        this.stars = [];
        for (let i = 0; i < CONSTANTS.STAR_COUNT; i++) {
            this.stars.push({
                x: (Math.random() - 0.5) * CONSTANTS.WORLD_SIZE,
                y: (Math.random() - 0.5) * CONSTANTS.WORLD_SIZE,
                size: Math.random() * 2.5,
                opacity: 0.1 + Math.random() * 0.7,
            });
        }
    }

    public initWorld() {
        this.scrap = [];
        this.obstacles = [];
        this.nebulas = [];

        for (let i = 0; i < CONSTANTS.NEBULA_COUNT; i++) {
            const colors = [
                "rgba(14, 165, 233, 0.05)",
                "rgba(139, 92, 246, 0.05)",
                "rgba(236, 72, 153, 0.05)",
            ];
            this.nebulas.push({
                x: (Math.random() - 0.5) * CONSTANTS.WORLD_SIZE,
                y: (Math.random() - 0.5) * CONSTANTS.WORLD_SIZE,
                size: 2000 + Math.random() * 3000,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        for (let i = 0; i < CONSTANTS.SCRAP_COUNT; i++) {
            this.scrap.push({
                x: (Math.random() - 0.5) * (CONSTANTS.WORLD_SIZE * 0.9),
                y: (Math.random() - 0.5) * (CONSTANTS.WORLD_SIZE * 0.9),
                size: 15 + Math.random() * 10,
                seed: Math.random(),
                gathered: false,
            });
        }

        for (let i = 0; i < CONSTANTS.OBSTACLE_COUNT; i++) {
            const range = CONSTANTS.WORLD_SIZE * 0.9;
            let ox = (Math.random() - 0.5) * range;
            const oy = (Math.random() - 0.5) * range;

            if (Math.abs(ox) < 600 && Math.abs(oy) < 600) {
                ox += 1000;
            }

            this.obstacles.push({
                x: ox,
                y: oy,
                size: 120 + Math.random() * 250,
                seed: Math.random(),
            });
        }
    }
}
