# Momentum Transfer Mechanic 🎮

An arcade physics mechanic where you defeat enemies not by hitting them, but by transferring your momentum into them, launching them into hazards.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/momentum-transfer/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/momentum-transfer/MomentumTransferGame.ts)**

## 🕹️ How it Works

The **Momentum Transfer** mechanic mimics elastic collisions (like billiards) but with a twist: you aim to stop dead and send your target flying into danger.

### Key Features

- **Elastic Physics**: Real-time momentum conservation and transfer.
- **Stop-Dead Mechanic**: Hitting an enemy with higher speed stops you instantly, transferring all kinetic energy to them.
- **Drag & Launch**: Intuitive slingshot-style controls.
- **Hazard Interactions**: Pits (voids) and spikes are the only way to eliminate enemies.
- **Chain Reactions**: Enemies collide with each other, creating chaotic chain reactions.

## 🛠️ Implementation Details

The mechanic uses a custom physics engine built for this specific interaction:

- **Source Code**:
    - [`MomentumTransferGame.ts`](./MomentumTransferGame.ts) - Main game loop
    - [`engine/`](./engine/) - Physics, Collision, and Rendering systems
- **Demo UI**: [`momentum-transfer.astro`](../../../pages/gamebob/mecanicas/momentum-transfer.astro)

### Core Systems

#### Physics & Collision

- Custom elastic collision resolution in `CollisionSystem.ts`.
- detects `speed` difference to determine who stops and who flies.
- Continuous collision detection for fast-moving objects (approximated).

#### Hazard Logic

- **Spikes**: Instant death for any entity.
- **Void**: Instant death for enemies; Player can "jump" over if moving fast enough (configurable).

## 📝 Usage Example

```typescript
import { MomentumTransferGame } from "./MomentumTransferGame";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const game = new MomentumTransferGame(canvas);
game.start();
```

### Controls

- **Click & Drag**: Aim and launch player.
- **Release**: Fire.

## 🔧 Customization

Key constants in `engine/Constants.ts`:

```typescript
export const FRICTION = 0.98;
export const DRAG_POWER = 0.15;
export const STOP_THRESHOLD = 0.1;
```
