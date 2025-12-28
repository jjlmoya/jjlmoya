# Finger Twister

A multitouch chaos mechanic where the user must hold multiple nodes simultaneously with different fingers.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/finger-twister/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/finger-twister/FingerTwisterMechanic.ts)**

## How it works

- **Nodes**: Colored circles appear on the screen.
- **Hold**: You must touch and hold a node to keep it active.
- **Multitouch**: New nodes appear while you are holding others, requiring you to use multiple fingers (or nose!).
- **Game Over**: If you release a node that is currently active, the game ends.

## Implementation

The `FingerTwisterMechanic` class manages the game logic:

1.  **Pointer Tracking**: Maps active touch points to nodes.
2.  **State Validation**: Checks if any previously held node has lost its pointer contact.
3.  **Spawning**: Adds new nodes over time to increase difficulty.

## Usage

```typescript
const mechanic = new FingerTwisterMechanic(width, height);

// Input: Array of active pointers {id, x, y}
mechanic.update(activePointers);

// Render
const nodes = mechanic.nodes;
// ... draw nodes ...
```
