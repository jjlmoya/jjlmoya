# The Barrier

A physics simulation where users can draw temporary barriers to redirect a continuous flow of falling particles.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/the-barrier/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/the-barrier/TheBarrierMechanic.ts)**

## How it works

- **Particles**: Fall from the top of the screen under simulated gravity.
- **Barriers**: Users draw line segments that act as solid obstacles.
- **Reflection**: Particles bounce off barriers based on the angle of incidence.
- **Lifetime**: Barriers are temporary and fade away after a few seconds, requiring active maintenance of the flow.

## Implementation

The `TheBarrierMechanic` class handles the pure physics simulation:

1.  **Ray Casting**: Uses continuous collision detection (ray casting) between the particle's previous and current position against all barrier segments to prevent tunneling.
2.  **Reflection**: Calculates the reflection vector `v' = v - 2(v·n)n` upon collision.
3.  **State Management**: Handles particle spawning, movement, and barrier lifecycle.

## Usage

```typescript
const mechanic = new TheBarrierMechanic(width, height);

// Input
mechanic.addBarrier({ x: 0, y: 0 }, { x: 100, y: 100 });

// Update Loop
mechanic.update();
const particles = mechanic.particles;
const barriers = mechanic.barriers;
// ... render ...
```
