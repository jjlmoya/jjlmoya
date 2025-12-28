# Magnetic Finger

A physics simulation where the user controls a magnetic field to attract or repel metallic particles (iron filings).

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/magnetic-finger/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/magnetic-finger/MagneticFingerMechanic.ts)**

## How it works

- **Particles**: Hundreds of line segments simulate iron filings.
- **Magnetism**: A "finger" acts as a magnetic pole that can attract or repel particles.
- **Alignment**: Particles rotate to align themselves with the magnetic field lines.
- **Physics**: High friction (overdamped) movement simulates particles moving through a resistive medium or sliding on a surface.

## Implementation

The `MagneticFingerMechanic` class handles the pure physics simulation:

1.  **Field Calculation**: Calculates forces based on distance and polarity (`F ~ 1/r`).
2.  **Orientation**: Updates particle angle to face the magnetic source.
3.  **Integration**: Updates velocity and position with heavy damping.

## Usage

```typescript
const mechanic = new MagneticFingerMechanic(width, height);

// Input
mechanic.setMagnet(true, x, y); // Activate magnet at position
mechanic.setPolarity(1); // 1 for attract, -1 for repel

// Update Loop
mechanic.update();
const particles = mechanic.getParticles();
// ... render particles ...
```
