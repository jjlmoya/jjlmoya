# Gravity Well

A particle physics simulation where users can place gravity wells that attract floating particles.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/gravity-well/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/gravity-well/GravityWellMechanic.ts)**

## How it works

- **Particles**: Hundreds of particles float freely in space.
- **Gravity Wells**: Clicking creates a "gravity well" that exerts an attractive force on all particles.
- **Physics**: Uses a simplified universal law of gravitation to calculate forces: `F = G * (m1 * m2) / r^2`.
- **Interaction**:
    - **Click/Tap**: Creates a new gravity well.
    - **Right Click / Double Tap**: Removes all wells.
    - **Lifetime**: Wells slowly fade and disappear over time.

## Implementation

The `GravityWellMechanic` class manages:

1.  The state of all particles (position, velocity, acceleration).
2.  The list of active gravity wells.
3.  The physics update loop that applies forces and moves particles.

## Usage

```typescript
const mechanic = new GravityWellMechanic(width, height);

// In the animation loop
mechanic.update();
const particles = mechanic.getParticles();
const wells = mechanic.getWells();
// Render particles and wells...
```
