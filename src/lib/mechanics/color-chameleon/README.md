# Color Chameleon

A fast-paced arcade mechanic where the player must match their color to absorb incoming enemies.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/color-chameleon/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/color-chameleon/ColorChameleonMechanic.ts)**

## How it works

- **Core Loop**: Enemies of different "types" (colors) spawn and move towards the player.
- **Matching**: The player must change their state to match the incoming enemy type to absorb it.
- **Fail State**: Colliding with an enemy of a different type triggers a game over.
- **Progression**: Enemies spawn faster and move faster over time.

## Implementation

The `ColorChameleonMechanic` class is a pure logic implementation that manages:

1.  **State**: Player state, list of enemies, particles, and score.
2.  **Spawning**: Logic for spawning enemies at the edges of the screen.
3.  **Collision**: Detecting overlaps between player and enemies.
4.  **Game Loop**: Updating positions and handling game over conditions.

It is completely decoupled from the rendering layer (Canvas, DOM).

## Usage

```typescript
// Initialize with dimensions and number of color types
const mechanic = new ColorChameleonMechanic(width, height, 3);

// Input
mechanic.cyclePlayerColor();

// Update Loop
mechanic.update();

// Render (read-only access to state)
const player = mechanic.player;
const enemies = mechanic.enemies;
// ... draw entities ...
```
