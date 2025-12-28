# Autorunner Mechanic 🏃

A fast-paced infinite runner mechanic with procedural generation, physics-based movement, and parallax scrolling.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/autorunner/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/autorunner/AutorunnerMechanic.ts)**

## 🕹️ How it Works

The **Autorunner** mechanic automatically moves the player forward (or rather, the world backward) while they must jump to avoid obstacles and gaps.

### Key Features

- **Procedural Generation**: Platforms and obstacles are generated infinitely as the player progresses.
- **Physics System**: Gravity, jumping, and collision detection with "coyote time" and penetration tolerance.
- **Parallax Background**: Multi-layered scrolling background (clouds) for depth and speed sensation.
- **Progressive Difficulty**: The game speed increases gradually over time.
- **Score Tracking**: Distance traveled is tracked as the score.

## 🛠️ Implementation Details

The `AutorunnerMechanic` class handles the physics simulation and world generation.

- **Source Code**: [`AutorunnerMechanic.ts`](./AutorunnerMechanic.ts)
- **Demo UI**: [`autorunner.astro`](../../../pages/gamebob/mecanicas/autorunner.astro)

### Usage Example

```typescript
import { AutorunnerMechanic } from "./AutorunnerMechanic";

const game = new AutorunnerMechanic(window.innerWidth, window.innerHeight);

// Handle Input
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") game.jump();
});

// Game Loop
function loop(dt: number) {
    game.update(dt);
    const state = game.getState();

    // Render state.player, state.platforms, etc.
}
```
