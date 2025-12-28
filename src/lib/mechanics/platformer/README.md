# Platformer Mechanic 🎮

A fluid platformer mechanic with advanced movement features including double jump, wall sliding, wall jumping, and sliding.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/plataformas/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/platformer/PlatformerGame.js)**

## 🕹️ How it Works

The **Platformer** mechanic provides responsive, satisfying movement controls typical of modern 2D platformers.

### Key Features

- **Fluid Movement**: Smooth acceleration and deceleration with friction
- **Jump Controls**: Variable jump height based on button hold duration
- **Double Jump**: Air control with a second jump
- **Wall Mechanics**: Wall sliding and wall jumping for advanced movement
- **Slide**: Duck and slide with momentum boost
- **Squash & Stretch**: Visual feedback for jumps and landings
- **Particle Effects**: Visual feedback for jumps, landings, and slides

## 🛠️ Implementation Details

The platformer is built with three main classes:

- **Source Code**:
    - [`PlatformerGame.js`](./PlatformerGame.js) - Main game loop, rendering, and particle system
    - [`Player.js`](./Player.js) - Player physics, movement, and collision detection
    - [`InputHandler.js`](./InputHandler.js) - Keyboard input management
- **Demo UI**: [`plataformas.astro`](../../../pages/gamebob/mecanicas/plataformas.astro)

### Core Mechanics

#### Movement

- Horizontal acceleration with friction
- Maximum speed capping
- Skid particles when changing direction

#### Jumping

- **Ground Jump**: Standard jump from ground
- **Double Jump**: Additional jump in mid-air
- **Wall Jump**: Jump off walls with horizontal boost
- **Variable Height**: Release jump button early to fall faster

#### Collision Detection

- AABB (Axis-Aligned Bounding Box) collision
- Platform collision with direction resolution
- Wall detection for wall sliding and jumping
- Floor collision with landing detection

#### Sliding

- Activated while moving on ground
- Reduces player height (ducking)
- Momentum boost on slide start
- Increased friction for gradual slowdown

## 📝 Usage Example

```javascript
import { PlatformerGame } from "./PlatformerGame.js";

const canvas = document.getElementById("game-canvas");
const game = new PlatformerGame(canvas);
```

The game handles its own input, update loop, and rendering automatically.

### Controls

- **Arrow Keys**: Move left/right
- **Space**: Jump (hold for higher jump)
- **Shift**: Slide (while moving on ground)

## 🎨 Visual Feedback

- **Squash & Stretch**: Player deforms on jumps and landings
- **Particles**:
    - White particles on jump/landing
    - Purple particles on double jump
    - Amber particles on wall jump
    - Gray particles on slide and direction change
- **State-based rendering**: Eyes follow movement direction

## 🔧 Customization

Key parameters in `Player.js`:

```javascript
this.acceleration = 1; // Movement acceleration
this.maxSpeed = 10; // Maximum horizontal speed
this.jumpStrength = -20; // Jump force
this.weight = 1; // Gravity strength
this.friction = 0.92; // Ground friction
```
