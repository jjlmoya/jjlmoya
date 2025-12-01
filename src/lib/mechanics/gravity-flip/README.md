# Gravity Flip Mechanic

Una mecánica de inversión de gravedad instantánea para juegos tipo runner o plataformas.

## Cómo funciona

La mecánica invierte el vector de gravedad (g → -g) cuando el jugador activa la acción (tap o tecla espacio), permitiendo al personaje "caer" hacia el techo o el suelo.

### Conceptos Clave

1.  **Gravedad Binaria**: La gravedad solo tiene dos estados: hacia abajo (1) o hacia arriba (-1).
2.  **Estado "Grounded"**: El jugador solo puede invertir la gravedad cuando está tocando una superficie (suelo o techo).
3.  **Colisión de Límites**: El personaje se mantiene dentro de los límites verticales definidos (suelo y techo).

## Uso

```typescript
import { GravityFlipMechanic } from "./GravityFlipMechanic";

// Inicialización
const mechanic = new GravityFlipMechanic(startY, {
    gravity: 0.6,
    jumpForce: 0,
    groundY: canvas.height - playerSize,
    ceilingY: 0
});

// En el bucle de juego
mechanic.update();
const state = mechanic.getState();

// Renderizado
drawPlayer(state.y, state.gravityDir);

// Input
function onInput() {
    mechanic.flip(); // Retorna true si se realizó la inversión
}
```

## Configuración

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `gravity` | `number` | Fuerza de gravedad aplicada por frame. |
| `groundY` | `number` | Posición Y del suelo. |
| `ceilingY` | `number` | Posición Y del techo. |

## Estado (State)

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `y` | `number` | Posición vertical actual. |
| `vy` | `number` | Velocidad vertical actual. |
| `gravityDir` | `number` | Dirección de la gravedad (1 o -1). |
| `isGrounded` | `boolean` | Si el personaje está tocando una superficie. |
