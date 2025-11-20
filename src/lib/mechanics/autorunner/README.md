# Autorunner Mechanic

A side-scrolling platformer mechanic where the player automatically runs forward and must jump to avoid obstacles and gaps.

## How it works

- **Auto-run**: The player character (or the world) moves at a constant speed that increases over time.
- **Jump**: Tapping or clicking makes the player jump. Only possible when grounded.
- **Procedural Generation**: Platforms and obstacles are generated infinitely as the player progresses.
- **Collision**: Hitting an obstacle or falling off the screen results in a game over.

## Implementation

The `AutorunnerMechanic` class manages:
1.  **Physics**: Gravity, velocity, and collision detection (AABB).
2.  **Level Generation**: Spawns platforms and obstacles ahead of the player view.
3.  **Game Loop**: Updates positions, checks collisions, and manages game state.

## Usage

```typescript
const mechanic = new AutorunnerMechanic(width, height);

// Interaction
mechanic.jump();

// Loop
mechanic.update(deltaTimeInSeconds);
const state = mechanic.getState();
// Render state.player, state.platforms...
```
