# Size Matters Mechanic

A mechanic where the player's size determines their mass, gravity, and interaction with the world. Grow to smash, shrink to float.

## 🎮 Features

- **Variable Mass Physics**: Mass and gravity scale dynamically with size.
- **Dual State Gameplay**:
    - **Big**: Heavy, fast falling, breaks specific obstacles.
    - **Small**: Light, floaty, fits through small gaps.
- **Procedural Generation**: Infinite obstacle generation based on player state.
- **Particle Effects**: Satisfying smash effects when breaking obstacles.

## 📦 Installation

```bash
# Copy the SizeMattersGame.js file to your project
cp SizeMattersGame.js your-project/lib/
```

## 🚀 Basic Usage

```javascript
import { SizeMattersGame } from "./lib/size-matters/SizeMattersGame";

const canvas = document.getElementById("gameCanvas");
const game = new SizeMattersGame(canvas);

// Handle resizing
window.addEventListener("resize", () => {
    game.resize();
});
```

## ⚙️ Mechanics Details

### Physics Model

The physics engine uses a simplified model where:

- **Mass** is proportional to `size / 10`.
- **Gravity** scales linearly from `100` (min size) to `600` (max size).
- **Terminal Velocity** is higher for larger sizes.

### Controls

- **Input**: Mouse click or Touch hold.
- **Action**:
    - **Hold**: Grow towards `maxSize`.
    - **Release**: Shrink towards `minSize`.
- **Horizontal Movement**: Follows mouse/touch X position.

## 🎯 API Reference

### `SizeMattersGame`

- `constructor(canvas)`: Initializes the game on the provided canvas.
- `resize()`: Adjusts internal dimensions to match the canvas display size.
- `destroy()`: Stops the game loop and cleans up listeners.

## 📄 License

MIT - Use freely in your projects

## 🔗 Demo

[View interactive demo](https://www.jjlmoya.es/gamebob/mecanicas/size-matters)
[View Source Code](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/size-matters/SizeMattersGame.js)

---

Made with ❤️ by [jjlmoya](https://github.com/jjlmoya)
