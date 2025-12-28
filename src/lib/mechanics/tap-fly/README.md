# Tap & Fly

A one-tap mechanic where the player must tap to fly upwards and avoid obstacles, similar to Flappy Bird.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/tap-fly/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/tap-fly/TapFlyMechanic.ts)**

## How it works

- **Gravity**: Constantly pulls the player down.
- **Tap**: Applies an upward impulse (jump force) to counteract gravity.
- **Obstacles**: Moving pipes or walls with gaps that the player must navigate through.
- **Score**: Increases as the player successfully passes obstacles.

## Implementation

The `TapFlyMechanic` class manages:

1.  **Physics**: Velocity, gravity, and position updates.
2.  **Game State**: Start, Playing, Game Over states.
3.  **Obstacle Spawning**: Generates obstacles at regular intervals with randomized gap positions.
4.  **Collision Detection**: Checks for intersections between the player (circle) and obstacles (rectangles) or screen bounds.

## Usage

```typescript
const mechanic = new TapFlyMechanic(width, height);

// Input
mechanic.tap();

// Loop
mechanic.update();
const state = mechanic.getState();
// Render state.player, state.obstacles...
```
