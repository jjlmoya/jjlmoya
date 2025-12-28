# Game Mechanics Library

A collection of reusable game mechanics built with TypeScript. Each mechanic is self-contained, well-documented, and ready to use in your projects.

## 📚 Available Mechanics

### [Slingshot](./slingshot)

Physics-based slingshot mechanic with drag-and-launch controls.

**Features:**

- Realistic physics (gravity, friction, bounce)
- Touch and mouse support
- Fully configurable
- Event callbacks for audio/particles

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/slingshot/) | [Documentation](./slingshot/README.md)

### [Swipe Gesture](./swipe)

Swipe gesture detection system with direction and velocity tracking.

**Features:**

- 4 or 8 direction detection
- Velocity tracking
- Configurable sensitivity
- Touch and mouse support
- Event callbacks

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/swipe/) | [Documentation](./swipe/README.md)

### [Gravity Well](./gravity-well)

Particle physics simulation where users can place gravity sources that attract floating particles.

**Features:**

- Particle system with trails
- Interactive gravity wells
- Lifetime management for wells
- Optimized performance

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/gravity-well/) | [Documentation](./gravity-well/README.md)

### [Flocking](./flocking)

Boids simulation demonstrating emergent behavior through simple rules.

**Features:**

- Separation, Alignment, and Cohesion rules
- Mouse interaction (repulsion)
- Smooth movement
- Configurable parameters

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/flocking/) | [Documentation](./flocking/README.md)

### [Tap & Fly](./tap-fly)

One-tap mechanic where the player must tap to fly upwards and avoid obstacles.

**Features:**

- Gravity and impulse physics
- Obstacle generation and collision
- Score tracking
- Game state management

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/tap-fly/) | [Documentation](./tap-fly/README.md)

### [Hold to Jump](./hold-jump)

Platformer mechanic where jump height is determined by input duration.

**Features:**

- Charge-based jump force
- Parabolic arc physics
- Platform collision detection
- Visual charge feedback

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/hold-jump/) | [Documentation](./hold-jump/README.md)

### [Clicker](./clicker)

Incremental game mechanic with resource management and upgrades.

**Features:**

- Click and auto-click income
- Upgrade system with scaling costs
- Particle effects
- Save/Load ready state structure

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/clicker/) | [Documentation](./clicker/README.md)

### [Autorunner](./autorunner)

Infinite side-scrolling runner with procedural generation.

**Features:**

- Procedural platform generation
- Physics-based jumping
- Increasing difficulty (speed)
- Obstacle collision

[View Demo](https://www.jjlmoya.es/gamebob/mecanicas/autorunner/) | [Documentation](./autorunner/README.md)

---

## 🚀 Quick Start

Each mechanic is in its own folder with:

- TypeScript source file
- Comprehensive README
- Usage examples
- API reference

```bash
# Copy the mechanic you need
cp -r src/lib/mechanics/slingshot your-project/lib/
```

## 📄 License

MIT - All mechanics are free to use in your projects

## 🤝 Contributing

New mechanics and improvements welcome!

---

Made with ❤️ by [jjlmoya](https://github.com/jjlmoya)
