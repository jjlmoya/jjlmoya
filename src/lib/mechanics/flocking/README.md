# Flocking (Boids)

A simulation of the flocking behavior of birds, based on Craig Reynolds' Boids algorithm.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/flocking/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/flocking/FlockingMechanic.ts)**

## How it works

The simulation is driven by three simple rules applied to each "boid" (bird-oid object):

1.  **Separation**: Steer to avoid crowding local flockmates.
2.  **Alignment**: Steer towards the average heading of local flockmates.
3.  **Cohesion**: Steer to move towards the average position (center of mass) of local flockmates.

## Interaction

- **Mouse Interaction**: The flock is scared of the mouse cursor. Move your mouse near the boids to scatter them.

## Implementation

The `FlockingMechanic` class manages the state of all boids and applies the steering forces in each frame. It uses a spatial partitioning approach (or simple O(n^2) for low counts) to find local neighbors.

## Usage

```typescript
const mechanic = new FlockingMechanic(width, height);

// In the animation loop
mechanic.update(mouseX, mouseY);
const boids = mechanic.getBoids();
// Render boids...
```
