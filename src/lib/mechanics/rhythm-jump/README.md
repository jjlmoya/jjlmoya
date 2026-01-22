# Rhythm Jump

**Rhythm Jump** is a precision runner where you must switch your character's color to interact with matching platforms.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/rhythm-jump/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/rhythm-jump/RhythmJumpMechanic.ts)**

## Concept

The player moves forward automatically. Platforms have two colors: **Cyan** and **Magenta**. The player can only land on platforms that match their current color. If the color doesn't match, they will fall through them.

## Controls

### Desktop

- **Click:** Switch Color (Cyan <-> Magenta).
- **Space:** Jump.

### Mobile

- **Tap:** Switch Color.
- **Swipe Up:** Jump.

## Technical Details

- **State Management:** The player has a `colorId` (0 or 1).
- **Selective Collisions:** The physics system ignores platforms whose `colorId` does not match the player's.
- **Hybrid Input:** Differentiated support for mouse/keyboard and touch gestures.
