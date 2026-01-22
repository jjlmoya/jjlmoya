# Bullet-Time Painting Mechanic 🎮

A tactical shooter mechanic where time only moves when you take action, featuring a painting-like aesthetic and sector-based progression.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/bullet-time-painting/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/bullet-time-painting/BulletTimeGame.ts)**

## 🕹️ How it Works

The **Bullet-Time Painting** mechanic revolves around planning actions in a frozen time state and executing them in short bursts.

### Key Features

- **Time Freeze**: Time is paused while you plan your moves.
- **Action Queue**: Plan movement and shooting actions.
- **Burst Execution**: Actions are executed in real-time for 1 second.
- **Resource Management**: Manage Energy for actions and HP for survival.
- **Procedural Sectors**: Infinite progression through procedurally generated levels.
- **Ricochet**: Bullets bounce off walls.

## 🛠️ Implementation Details

The mechanic is built with a modular engine architecture:

- **Source Code**:
    - [`BulletTimeGame.ts`](./BulletTimeGame.ts) - Main game controller
    - [`engine/`](./engine/) - Core systems (Physics, Collision, AI, Renderer)
- **Demo UI**: [`bullet-time-painting.astro`](../../../pages/gamebob/mecanicas/bullet-time-painting.astro)

### Core Systems

#### Planning Phase

- Player selects actions (Move, Shoot) using mouse input.
- Actions consume Energy.
- Visual indicators show planned trajectory.

#### Execution Phase (Blitz)

- Game physics unpause for a fixed duration.
- Actions are applied to the player entity.
- AI enemies react and fire.
- Collision detection handles bullet impacts and wall bounces.

## 📝 Usage Example

```typescript
import { BulletTimeGame } from "./BulletTimeGame";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const game = new BulletTimeGame(canvas);
game.start();
```

### Controls

- **Left Click**: Plan Move
- **Right Click**: Plan Shoot
- **Space**: Execute Actions (Blitz)

## 🔧 Customization

Key constants in `engine/Constants.ts`:

```typescript
export const MAX_ENERGY = 100;
export const ACTION_DURATION = 60; // Frames
export const SHOOT_ENERGY_COST = 20;
export const JUMP_ENERGY_COST_PER_PIXEL = 0.1;
```
