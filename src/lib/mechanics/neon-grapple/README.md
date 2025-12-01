
# Neon Grapple

**Neon Grapple** es una mecánica de balanceo basada en físicas donde el jugador debe navegar por un nivel infinito utilizando un gancho de energía.

## Concepto
El jugador cae constantemente debido a la gravedad. Para avanzar y evitar caer al vacío (o tocar el techo), debe engancharse a nodos de energía flotantes. La mecánica principal es la gestión del momento: soltarse en el punto justo del arco para salir disparado hacia adelante.

## Controles
- **Click / Toque (Mantener):** Lanza el gancho al nodo más cercano y se balancea.
- **Soltar:** Desengancha el gancho, conservando la inercia.

## Detalles Técnicos
- **Físicas de Péndulo:** Implementación simplificada de fuerzas centrípetas y conservación de la velocidad tangencial.
- **Generación Procedural:** Los nodos se generan infinitamente delante del jugador, variando en altura y distancia.
- **Cámara:** Seguimiento suave horizontal, manteniendo al jugador en el tercio izquierdo de la pantalla para máxima visibilidad.

## Configuración
La clase `NeonGrappleMechanic` permite ajustar:
- `gravity`: Fuerza de caída.
- `swingBoost`: Multiplicador de velocidad al balancearse (para compensar fricción).
- `maxRopeLength`: Distancia máxima de enganche.
