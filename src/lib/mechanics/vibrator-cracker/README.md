# Vibrator Cracker

**Vibrator Cracker** is a safe-cracking simulation that uses haptic feedback (vibration) to guide the player towards the correct combination.

> **[🎮 Play Live Demo](https://www.jjlmoya.es/gamebob/mecanicas/vibrator-cracker/)**
> **[💻 View Source](https://github.com/jjlmoya/jjlmoya/blob/main/src/lib/mechanics/vibrator-cracker/VibratorCrackerSystem.ts)**

## Concept

The player must unlock a safe by finding a sequence of numbers. As you rotate the dial, the device vibrates when you pass over the correct number.

## Controls

- **Drag/Touch:** Rotate the safe dial.
- **Hold:** When you find the "sweet spot" (indicated by vibration or visual cue), hold the dial steady for 1 second to register the number.

## Technical Details

- **Haptic Feedback:** Uses the `navigator.vibrate()` API to provide physical feedback on supported devices (mostly Android).
- **Visual Fallback:** Includes a visual "tick" animation for desktop users or devices without haptics.
- **Combination Logic:** Generates a random combination and tracks progress through the sequence.
