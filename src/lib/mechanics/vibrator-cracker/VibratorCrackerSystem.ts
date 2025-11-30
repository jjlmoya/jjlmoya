export class VibratorCrackerSystem {
    combination: number[] = [];
    currentNumberIndex: number = 0;
    currentAngle: number = 0;
    lastTickAngle: number = 0;
    isUnlocked: boolean = false;

    // Haptic patterns
    private readonly TICK_PATTERN = [15]; // Increased from 5ms
    private readonly SUCCESS_PATTERN = [20, 30, 20]; // Increased and distinct
    private readonly UNLOCK_PATTERN = [50, 50, 50, 50, 200];

    // Audio context for fallback
    private audioCtx: AudioContext | null = null;

    // Callbacks for visual feedback
    onTick?: () => void;
    onSuccess?: () => void;

    constructor() {
        this.generateCombination();
        this.initAudio();
    }

    private initAudio() {
        try {
            this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.warn("Web Audio API not supported");
        }
    }

    private generateCombination() {
        // Generate 3 random numbers between 0 and 99
        this.combination = [
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100)
        ];
        console.log("Safe Combination:", this.combination);
    }

    reset() {
        this.generateCombination();
        this.currentNumberIndex = 0;
        this.isUnlocked = false;
        this.currentAngle = 0;
        this.lastTickAngle = 0;
    }

    // Returns true if a tick happened
    updateDial(angle: number): { tick: boolean, isCorrect: boolean, unlocked: boolean } {
        if (this.isUnlocked) return { tick: false, isCorrect: false, unlocked: true };

        this.currentAngle = angle;

        // Normalize angle to 0-360 degrees
        let degrees = (this.currentAngle * 180 / Math.PI) % 360;
        if (degrees < 0) degrees += 360;

        // Map 0-360 to 0-100 numbers
        const currentNumber = Math.floor((degrees / 360) * 100);

        // Check if we moved enough to trigger a tick (every number change)
        const lastDegrees = (this.lastTickAngle * 180 / Math.PI) % 360;
        const lastNumber = Math.floor(((lastDegrees < 0 ? lastDegrees + 360 : lastDegrees) / 360) * 100);

        if (currentNumber !== lastNumber) {
            this.lastTickAngle = angle;

            const targetNumber = this.combination[this.currentNumberIndex];
            const isTarget = currentNumber === targetNumber;

            if (isTarget) {
                // Subtle hint, but not the full success pattern yet
                this.triggerHaptic(this.TICK_PATTERN);
                this.playClick(500); // Slightly higher pitch
                this.onTick?.();
            } else {
                this.triggerHaptic(this.TICK_PATTERN);
                this.playClick(400); // Normal click
                this.onTick?.();
            }

            return { tick: true, isCorrect: isTarget, unlocked: false };
        }

        return { tick: false, isCorrect: false, unlocked: false };
    }

    isOnTarget(angle: number): boolean {
        if (this.isUnlocked) return false;

        // Normalize angle
        let degrees = (angle * 180 / Math.PI) % 360;
        if (degrees < 0) degrees += 360;
        const currentNumber = Math.floor((degrees / 360) * 100);

        return currentNumber === this.combination[this.currentNumberIndex];
    }

    advanceSequence(): boolean {
        if (this.isUnlocked) return false;

        this.currentNumberIndex++;

        // Play success haptic/sound for finding a number
        this.triggerHaptic(this.SUCCESS_PATTERN);
        this.playClick(800); // High pitch success
        this.onSuccess?.();

        if (this.currentNumberIndex >= this.combination.length) {
            this.isUnlocked = true;
            this.triggerHaptic(this.UNLOCK_PATTERN);
            return true;
        }
        return false;
    }

    private triggerHaptic(pattern: number[]) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        } else {
            // iOS Workaround
            this.triggerIOSHaptic();
        }
    }

    private iosSwitch: HTMLInputElement | null = null;

    private triggerIOSHaptic() {
        // Create the switch input if it doesn't exist
        if (!this.iosSwitch) {
            this.iosSwitch = document.createElement("input");
            this.iosSwitch.type = "checkbox";
            // @ts-ignore - 'switch' is a non-standard attribute for iOS
            this.iosSwitch.setAttribute("switch", "true");
            this.iosSwitch.style.position = "absolute";
            this.iosSwitch.style.opacity = "0";
            this.iosSwitch.style.pointerEvents = "none";
            document.body.appendChild(this.iosSwitch);
        }

        // Toggle to trigger haptic
        this.iosSwitch.checked = !this.iosSwitch.checked;
    }

    private playClick(frequency: number) {
        if (!this.audioCtx) return;

        // Resume context if suspended (browser policy)
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
    }
}
