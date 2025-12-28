# Hold to Jump

A platformer mechanic where jump height and distance are determined by how long the player holds the input.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/hold-jump/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/hold-jump/HoldJumpMechanic.ts)**

## How it works

- **Charge**: Holding down the input charges the jump power (0% to 100%).
- **Release**: Releasing the input executes the jump.
- **Physics**: The character follows a parabolic arc based on the initial velocity vector.
- **Platforms**: Simple collision detection allows the character to land on platforms.

## Implementation

The `HoldJumpMechanic` class manages:

1.  **Physics**: Velocity, gravity, friction, and position updates.
2.  **Input Handling**: Tracks "charging" state and calculates jump force on release.
3.  **Collision**: Checks for intersections with platform rectangles.

## Usage

```typescript
const mechanic = new HoldJumpMechanic(width, height);

// Input
mechanic.startCharge();
mechanic.releaseCharge();

// Loop
mechanic.update();
const state = mechanic.getState();
// Render state.player, state.platforms...
```
