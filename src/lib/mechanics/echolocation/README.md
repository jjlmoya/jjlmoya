# Echolocation Mechanic

A blind navigation mechanic where the player must use sound waves to reveal their surroundings.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/echolocation/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/echolocation/EcholocationMechanic.ts)**

## How it works

1.  **Rendering**: The canvas is mostly black, simulating total darkness.
2.  **Waves**: When the player emits a sound (click/space), a circle expands from their position.
3.  **Collision Detection**: We check for intersections between the expanding wave circle and the obstacles (rectangles and circles).
4.  **Visualization**: When a wave hits an obstacle, we spawn "particles" at the point of impact. These particles are drawn for a few frames, creating a fleeting visual representation of the obstacle's edge.
5.  **Win Condition**: The player must navigate to the exit zone, which is also invisible until hit by a wave.

## Key Code Concepts

- **Canvas API**: Used for all rendering. `globalCompositeOperation` or simple alpha blending is used for trails.
- **Ray-Circle Intersection**: Simplified here by checking distance from wave center to obstacle boundaries.
- **Particle System**: Simple array of particle objects with position and life properties.

## Future Improvements

- **Audio**: Add actual sound effects that change pitch/volume based on distance to obstacles.
- **Multiple Levels**: Load level data from JSON.
- **Enemies**: Moving obstacles that emit their own sound or hunt the player.
