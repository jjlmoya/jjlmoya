# Clicker Mechanic 🖱️

A robust incremental game mechanic featuring currency accumulation, passive income, and an upgrade system.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/clicker/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/clicker/ClickerMechanic.ts)**

## 🕹️ How it Works

The **Clicker** mechanic is the foundation of idle/incremental games. Players generate currency by clicking manually or purchasing upgrades that generate currency over time (passive income).

### Key Features

- **Manual Clicking**: Generate currency with every click.
- **Passive Income**: "Auto-Clickers" generate currency automatically every second.
- **Upgrade System**: Purchase upgrades to increase click power or auto-click rate.
- **Dynamic Costs**: Upgrade costs increase exponentially with each purchase.
- **Persistence**: Game state (currency, upgrades) is saved automatically to `localStorage`.
- **Visual Feedback**: Floating numbers and particle effects on click.

## 🛠️ Implementation Details

The core logic is encapsulated in the `ClickerMechanic` class, separating game rules from the UI.

- **Source Code**: [`ClickerMechanic.ts`](./ClickerMechanic.ts)
- **Demo UI**: [`clicker.astro`](../../../pages/gamebob/mecanicas/clicker.astro)

### Usage Example

```typescript
import { ClickerMechanic } from "./ClickerMechanic";

// Initialize
const game = new ClickerMechanic();

// Handle Click
canvas.addEventListener("mousedown", (e) => {
    const reward = game.click(e.clientX, e.clientY);
    console.log(`Gained ${reward} coins!`);
});

// Game Loop
function loop(dt: number) {
    game.update(dt); // Handles passive income
    render(game.getState());
}
```
