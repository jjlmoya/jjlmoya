# One Bullet Shooter

A high-stakes top-down shooter where you only have one bullet. You must retrieve it after every shot.

## 🎮 How to Play

- **Move**: WASD or Arrow Keys
- **Aim**: Mouse
- **Shoot**: Left Click / Tap
- **Retrieve**: Walk over your bullet to pick it up again.

## 🛠️ Mechanics

- **Single Projectile**: The core mechanic is resource scarcity. You are vulnerable without your bullet.
- **Physics**: The bullet travels until it hits a wall or an enemy.
- **Risk/Reward**: Shooting an enemy kills them, but leaves you defenseless until you close the distance to retrieve the ammo.

## 📦 Usage

```javascript
import { OneBulletGame } from "./OneBulletGame";

const canvas = document.getElementById("game-canvas");
const game = new OneBulletGame(canvas);
```
