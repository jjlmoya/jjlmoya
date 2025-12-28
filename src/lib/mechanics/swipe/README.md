# Swipe Gesture Mechanic

A reusable swipe gesture detection system for games and interactive applications. Detect swipe direction, velocity, and customize sensitivity.

## 🎮 Features

- **4 or 8 Directions**: Cardinal directions (up/down/left/right) or include diagonals
- **Velocity Tracking**: Get swipe speed for dynamic responses
- **Configurable**: Adjust sensitivity, duration, and thresholds
- **Touch & Mouse**: Works with both touch and mouse events
- **TypeScript**: Full type safety
- **Zero Dependencies**: Pure JavaScript/TypeScript
- **Event Callbacks**: React to swipe start, swipe, and swipe end

## 📦 Installation

```bash
# Copy the SwipeGesture.ts file to your project
cp SwipeGesture.ts your-project/lib/
```

## 🚀 Basic Usage

```typescript
import { SwipeGesture } from "./lib/swipe/SwipeGesture";

const swipeArea = document.getElementById("swipe-area")!;

const swipe = new SwipeGesture(
    swipeArea,
    {
        minDistance: 50,
        maxDuration: 500,
        preventScroll: true,
    },
    {
        onSwipe: (direction, velocity, distance) => {
            console.log(`Swiped ${direction}!`);
            console.log(`Velocity: ${velocity.toFixed(2)} px/ms`);
            console.log(`Distance: ${distance.toFixed(0)} px`);
        },
    }
);
```

## 🎨 Interactive Demo

```typescript
const swipe = new SwipeGesture(
    element,
    { minDistance: 50 },
    {
        onSwipeStart: (x, y) => {
            console.log("Swipe started at:", x, y);
        },
        onSwipe: (direction, velocity) => {
            // Animate based on direction
            if (direction === "left") {
                nextCard();
            } else if (direction === "right") {
                previousCard();
            }
        },
        onSwipeEnd: () => {
            console.log("Swipe ended");
        },
    }
);
```

## ⚙️ Configuration

### SwipeConfig

| Property          | Type    | Default | Description                            |
| ----------------- | ------- | ------- | -------------------------------------- |
| `minDistance`     | number  | 50      | Minimum swipe distance in pixels       |
| `maxDuration`     | number  | 500     | Maximum swipe duration in milliseconds |
| `threshold`       | number  | 45      | Direction threshold angle in degrees   |
| `preventScroll`   | boolean | true    | Prevent default scroll behavior        |
| `enableDiagonals` | boolean | false   | Enable 8-direction detection           |

### SwipeCallbacks

```typescript
interface SwipeCallbacks {
    onSwipeStart?: (x: number, y: number) => void;
    onSwipe?: (direction: SwipeDirection, velocity: number, distance: number) => void;
    onSwipeEnd?: () => void;
}
```

### SwipeDirection

```typescript
type SwipeDirection =
    | "up"
    | "down"
    | "left"
    | "right" // 4 directions
    | "up-left"
    | "up-right" // Diagonals (if enabled)
    | "down-left"
    | "down-right";
```

## 🎯 API Reference

### Methods

- `enable()`: Enable swipe detection
- `disable()`: Disable swipe detection
- `getLastSwipe()`: Get info about the last swipe
- `isSwiping()`: Check if currently swiping
- `destroy()`: Clean up event listeners

### SwipeInfo

```typescript
interface SwipeInfo {
    direction: SwipeDirection;
    velocity: number; // pixels per millisecond
    distance: number; // total distance in pixels
    duration: number; // duration in milliseconds
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
```

## 📱 Touch Support

Touch events are automatically supported. The mechanic prevents default scroll behavior by default to avoid conflicts.

```typescript
// Disable scroll prevention if needed
const swipe = new SwipeGesture(element, { preventScroll: false });
```

## 🎮 Use Cases

### Card Swipe (Tinder-style)

```typescript
const swipe = new SwipeGesture(
    cardElement,
    { minDistance: 100 },
    {
        onSwipe: (direction, velocity) => {
            if (direction === "right") {
                likeCard(velocity);
            } else if (direction === "left") {
                dislikeCard(velocity);
            }
        },
    }
);
```

### Menu Navigation

```typescript
const swipe = new SwipeGesture(
    menuElement,
    { minDistance: 80 },
    {
        onSwipe: (direction) => {
            switch (direction) {
                case "left":
                    nextPage();
                    break;
                case "right":
                    previousPage();
                    break;
                case "up":
                    scrollDown();
                    break;
                case "down":
                    scrollUp();
                    break;
            }
        },
    }
);
```

### Fruit Ninja Style

```typescript
const swipe = new SwipeGesture(
    gameArea,
    {
        minDistance: 30,
        maxDuration: 300,
        enableDiagonals: true,
    },
    {
        onSwipe: (direction, velocity, distance) => {
            sliceFruit(direction, velocity);
            createSlashEffect(direction, distance);
        },
    }
);
```

## 🎨 Visual Feedback

```typescript
let trail: HTMLElement[] = [];

const swipe = new SwipeGesture(
    canvas,
    {},
    {
        onSwipeStart: (x, y) => {
            trail = [];
            addTrailPoint(x, y);
        },
        onSwipe: (direction, velocity) => {
            showArrow(direction);
            playSound(velocity);
        },
        onSwipeEnd: () => {
            clearTrail();
        },
    }
);
```

## 🔧 Advanced: 8-Direction Detection

```typescript
const swipe = new SwipeGesture(
    element,
    {
        enableDiagonals: true,
        threshold: 45, // Angle threshold for diagonals
    },
    {
        onSwipe: (direction) => {
            // Now receives: up, down, left, right,
            // up-left, up-right, down-left, down-right
            handleDirection(direction);
        },
    }
);
```

## 📄 License

MIT - Use freely in your projects

## 🤝 Contributing

Improvements welcome! Pull requests appreciated.

## 🔗 Demo

[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/swipe/)
[View Source Code](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/swipe/SwipeGesture.ts)

---

Made with ❤️ by [jjlmoya](https://github.com/jjlmoya)
