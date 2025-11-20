# Clicker Mechanic

A classic incremental game mechanic where players click to earn currency and buy upgrades to automate the process.

## How it works

- **Click**: Clicking the main target generates currency based on "Click Power".
- **Upgrades**: Players can spend currency to buy upgrades.
    - **Click Upgrades**: Increase the amount of currency earned per click.
    - **Auto Upgrades**: Automatically generate currency over time (GPS - Gold Per Second).
- **Scaling Costs**: Upgrade costs increase exponentially with each purchase.

## Implementation

The `ClickerMechanic` class manages:
1.  **Economy**: Tracks currency, income rates, and costs.
2.  **Upgrades**: Manages a list of available upgrades, their costs, and effects.
3.  **Game Loop**: Handles auto-generation of currency based on delta time.
4.  **Particles**: Simple visual feedback system for clicks.

## Usage

```typescript
const mechanic = new ClickerMechanic();

// Interaction
mechanic.click(x, y);
mechanic.buyUpgrade("cursor");

// Loop
mechanic.update(deltaTimeInSeconds);
const state = mechanic.getState();
// Render state.currency, state.upgrades...
```
