# Neon Grapple

**Neon Grapple** is a physics-based swinging mechanic where the player must navigate an infinite level using an energy hook.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/neon-grapple/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/neon-grapple/NeonGrappleMechanic.ts)**

## Concept

The player falls constantly due to gravity. To advance and avoid falling into the void (or hitting the ceiling), they must grapple onto floating energy nodes. The core mechanic is momentum management: releasing at the right point of the arc to launch forward.

## Controls

- **Click / Touch (Hold):** Launches the hook to the nearest node and swings.
- **Release:** Detaches the hook, preserving inertia.

## Technical Details

- **Pendulum Physics:** Simplified implementation of centripetal forces and conservation of tangential velocity.
- **Procedural Generation:** Nodes are generated infinitely ahead of the player, varying in height and distance.
- **Camera:** Smooth horizontal tracking, keeping the player in the left third of the screen for maximum visibility.

## Configuration

The `NeonGrappleMechanic` class allows adjusting:

- `gravity`: Downward force.
- `swingBoost`: Speed multiplier when swinging (to compensate for friction).
- `maxRopeLength`: Maximum grappling distance.
