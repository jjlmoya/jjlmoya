# Draw The Path

**Draw The Path** is a creative runner where you act as a guardian angel, drawing lines to protect the runner from environmental hazards.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/draw-the-path/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/draw-the-path/DrawThePathMechanic.ts)**

## Concept

The character runs blindly forward. The world is hostile:

- **Void:** Draw bridges to cross gaps.
- **Meteorites:** Draw roofs/shields to block falling debris.
- **Jumpers:** Draw walls or ramps to deal with bouncing enemies.

## Controls

- **Drag / Swipe:** Draw a line. Lines are physical objects that interact with both the player and enemies.

## Technical Details

- **Physics Engine:** Custom entity-component system handling gravity, velocity, and collisions.
- **Line Collision:** Uses segment-circle collision detection. Lines act as static bodies but can block dynamic threats.
- **Procedural Threats:** Spawns meteorites and enemies based on distance traveled.
