# Gravity Flip Mechanic

An instant gravity inversion mechanic for runner or platformer games.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/gravity-flip/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/gravity-flip/GravityFlipMechanic.ts)**

## How it Works

The mechanic inverts the gravity vector (g → -g) when the player triggers the action (tap or space key), allowing the character to "fall" towards the ceiling or the ground.

### Key Concepts

1.  **Binary Gravity**: Gravity has only two states: down (1) or up (-1).
2.  **Grounded State**: The player can only invert gravity when touching a surface (ground or ceiling).
3.  **Boundary Collision**: The character stays within the defined vertical limits (ground and ceiling).

## Usage

```typescript
import { GravityFlipMechanic } from "./GravityFlipMechanic";

// Initialization
const mechanic = new GravityFlipMechanic(startY, {
    gravity: 0.6,
    jumpForce: 0,
    groundY: canvas.height - playerSize,
    ceilingY: 0,
});

// In the game loop
mechanic.update();
const state = mechanic.getState();

// Rendering
drawPlayer(state.y, state.gravityDir);

// Input
function onInput() {
    mechanic.flip(); // Returns true if the flip was performed
}
```

## Configuration

| Property   | Type     | Description                      |
| :--------- | :------- | :------------------------------- |
| `gravity`  | `number` | Gravity force applied per frame. |
| `groundY`  | `number` | Y position of the ground.        |
| `ceilingY` | `number` | Y position of the ceiling.       |

## State

| Property     | Type      | Description                                  |
| :----------- | :-------- | :------------------------------------------- |
| `y`          | `number`  | Current vertical position.                   |
| `vy`         | `number`  | Current vertical velocity.                   |
| `gravityDir` | `number`  | Gravity direction (1 or -1).                 |
| `isGrounded` | `boolean` | Whether the character is touching a surface. |
