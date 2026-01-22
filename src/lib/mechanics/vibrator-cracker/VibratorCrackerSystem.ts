export class VibratorCrackerSystem {
    combination: number[] = [];
    currentNumberIndex: number = 0;
    currentAngle: number = 0;
    lastTickAngle: number = 0;
    isUnlocked: boolean = false;

    private readonly TICK_PATTERN = [15];
    private readonly SUCCESS_PATTERN = [20, 30, 20];
    private readonly UNLOCK_PATTERN = [50, 50, 50, 50, 200];

    private audioCtx: AudioContext | null = null;

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
        this.combination = [
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
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

    updateDial(angle: number): { tick: boolean; isCorrect: boolean; unlocked: boolean } {
        if (this.isUnlocked) return { tick: false, isCorrect: false, unlocked: true };

        this.currentAngle = angle;

        let degrees = ((this.currentAngle * 180) / Math.PI) % 360;
        if (degrees < 0) degrees += 360;

        const currentNumber = Math.floor((degrees / 360) * 100);

        const lastDegrees = ((this.lastTickAngle * 180) / Math.PI) % 360;
        const lastNumber = Math.floor(
            ((lastDegrees < 0 ? lastDegrees + 360 : lastDegrees) / 360) * 100
        );

        if (currentNumber !== lastNumber) {
            this.lastTickAngle = angle;

            const targetNumber = this.combination[this.currentNumberIndex];
            const isTarget = currentNumber === targetNumber;

            if (isTarget) {
                this.triggerHaptic(this.TICK_PATTERN);
                this.playClick(500);
                this.onTick?.();
            } else {
                this.triggerHaptic(this.TICK_PATTERN);
                this.playClick(400);
                this.onTick?.();
            }

            return { tick: true, isCorrect: isTarget, unlocked: false };
        }

        return { tick: false, isCorrect: false, unlocked: false };
    }

    isOnTarget(angle: number): boolean {
        if (this.isUnlocked) return false;

        let degrees = ((angle * 180) / Math.PI) % 360;
        if (degrees < 0) degrees += 360;
        const currentNumber = Math.floor((degrees / 360) * 100);

        return currentNumber === this.combination[this.currentNumberIndex];
    }

    advanceSequence(): boolean {
        if (this.isUnlocked) return false;

        this.currentNumberIndex++;

        this.triggerHaptic(this.SUCCESS_PATTERN);
        this.playClick(800);
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
            this.triggerIOSHaptic();
        }
    }

    private iosSwitch: HTMLInputElement | null = null;

    private triggerIOSHaptic() {
        if (!this.iosSwitch) {
            this.iosSwitch = document.createElement("input");
            this.iosSwitch.type = "checkbox";

            this.iosSwitch.setAttribute("switch", "true");
            this.iosSwitch.style.position = "absolute";
            this.iosSwitch.style.opacity = "0";
            this.iosSwitch.style.pointerEvents = "none";
            document.body.appendChild(this.iosSwitch);
        }

        this.iosSwitch.checked = !this.iosSwitch.checked;
    }

    private playClick(frequency: number) {
        if (!this.audioCtx) return;

        if (this.audioCtx.state === "suspended") {
            this.audioCtx.resume();
        }

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
    }
}
