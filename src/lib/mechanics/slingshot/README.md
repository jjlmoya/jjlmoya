# Slingshot Mechanic

A reusable physics-based slingshot mechanic for games. Drag, stretch, and launch objects with realistic physics.

## 🎮 Features

- **Realistic Physics**: Configurable gravity, friction, and bounce
- **Touch Control**: Works with mouse and touch events
- **Fully Configurable**: Adjust all physics parameters
- **TypeScript**: Full type safety
- **Zero Dependencies**: Pure JavaScript/TypeScript
- **Event Callbacks**: Integrate audio, particles, and more

## 📦 Installation

```bash
# Copy the SlingshotMechanic.ts file to your project
cp SlingshotMechanic.ts your-project/lib/
```

## 🚀 Basic Usage

```typescript
import { SlingshotMechanic } from "./lib/slingshot/SlingshotMechanic";

// Create instance
const slingshot = new SlingshotMechanic(
    { x: 400, y: 300, radius: 32 }, // Initial position
    {
        gravity: 0.4,
        friction: 0.995,
        bounceDamping: 0.8,
        dragPower: 0.15,
        maxDragDistance: 300,
        padding: { top: 120, bottom: 120, x: 20 },
    },
    {
        onBounce: (speed) => console.log("Bounce!", speed),
        onDragStart: () => console.log("Drag started"),
        onDragEnd: (velocity) => console.log("Launched!", velocity),
    }
);

// In your game loop
function gameLoop(time) {
    const dt = calculateDeltaTime(time);
    slingshot.update(dt);

    const state = slingshot.getState();
    renderObject(state.x, state.y);

    requestAnimationFrame(gameLoop);
}

// Input events
canvas.addEventListener("mousedown", (e) => {
    slingshot.startDrag(e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", (e) => {
    slingshot.updateDrag(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", () => {
    slingshot.endDrag();
});
```

## 🎨 Rendering Example

```typescript
function render() {
    const state = slingshot.getState();
    const speed = slingshot.getSpeed();

    // Draw object
    ctx.beginPath();
    ctx.arc(state.x, state.y, state.radius, 0, Math.PI * 2);
    ctx.fillStyle = speed > 15 ? "red" : "yellow";
    ctx.fill();

    // Draw rope when dragging
    const dragInfo = slingshot.getDragInfo();
    if (dragInfo) {
        ctx.beginPath();
        ctx.moveTo(dragInfo.anchor.x, dragInfo.anchor.y);
        ctx.lineTo(state.x, state.y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.stroke();
    }
}
```

## ⚙️ Configuration

### SlingshotConfig

| Property          | Type   | Default | Description                   |
| ----------------- | ------ | ------- | ----------------------------- |
| `gravity`         | number | 0.4     | Gravity force                 |
| `friction`        | number | 0.995   | Air resistance (0-1)          |
| `bounceDamping`   | number | 0.8     | Velocity loss on bounce (0-1) |
| `dragPower`       | number | 0.15    | Launch force multiplier       |
| `maxDragDistance` | number | 300     | Maximum stretch distance      |
| `padding.top`     | number | 120     | Top margin                    |
| `padding.bottom`  | number | 120     | Bottom margin                 |
| `padding.x`       | number | 20      | Side margins                  |

### Callbacks

```typescript
interface SlingshotCallbacks {
    onBounce?: (speed: number) => void;
    onDragStart?: () => void;
    onDragEnd?: (velocity: { vx: number; vy: number }) => void;
    onUpdate?: (state: SlingshotState) => void;
}
```

## 🎯 API Reference

### Methods

- `startDrag(x, y)`: Start dragging
- `updateDrag(x, y)`: Update drag position
- `endDrag()`: End drag and launch
- `update(deltaTime)`: Update physics (call every frame)
- `getState()`: Get current state
- `getDragInfo()`: Get drag info (or null)
- `getSpeed()`: Get current speed
- `getTimeSinceBounce()`: Time since last bounce
- `isDragging()`: Check if dragging
- `updateBounds(width, height)`: Update bounds (on resize)

## 📱 Touch Support

```typescript
// Touch events
canvas.addEventListener(
    "touchstart",
    (e) => {
        const touch = e.touches[0];
        slingshot.startDrag(touch.clientX, touch.clientY);
    },
    { passive: false }
);

canvas.addEventListener(
    "touchmove",
    (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        slingshot.updateDrag(touch.clientX, touch.clientY);
    },
    { passive: false }
);

canvas.addEventListener("touchend", () => {
    slingshot.endDrag();
});
```

## 🔊 Audio Integration

```typescript
const slingshot = new SlingshotMechanic(initialPos, config, {
    onBounce: (speed) => {
        const volume = Math.min(speed / 20, 1);
        playSound("bounce", volume);
    },
    onDragEnd: (velocity) => {
        playSound("launch");
    },
});
```

## 🎨 Visual Effects

```typescript
const slingshot = new SlingshotMechanic(initialPos, config, {
    onBounce: (speed) => {
        createParticles(state.x, state.y, speed);
        shakeScreen(speed * 0.1);
    },
});

// Face expressions based on state
function getFaceExpression() {
    if (slingshot.isDragging()) return "O_O";
    if (slingshot.getTimeSinceBounce() < 400) return "Ò_Ó";
    if (slingshot.getSpeed() > 15) return ">_<";
    return "-_-";
}
```

## 📄 License

MIT - Use freely in your projects

## 🤝 Contributing

Improvements welcome! Pull requests appreciated.

## 🔗 Demo

[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/slingshot/)
[View Source Code](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/slingshot/SlingshotMechanic.ts)

---

Made with ❤️ by [jjlmoya](https://github.com/jjlmoya)
