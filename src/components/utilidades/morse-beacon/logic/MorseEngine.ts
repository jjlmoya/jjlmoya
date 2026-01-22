export type MorseSignal = "." | "-" | " ";

export const MORSE_DICTIONARY: Record<string, string> = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
};

export interface MorseConfig {
    wpm: number;
}

export class MorseBit {
    type: "dot" | "dash" | "gap" | "charSpace" | "wordSpace";
    duration: number;
    isActive: boolean;

    constructor(type: "dot" | "dash" | "gap" | "charSpace" | "wordSpace", unit: number) {
        this.type = type;
        this.isActive = type === "dot" || type === "dash";

        switch (type) {
            case "dot":
                this.duration = unit;
                break;
            case "dash":
                this.duration = unit * 3;
                break;
            case "gap":
                this.duration = unit;
                break;
            case "charSpace":
                this.duration = unit * 3;
                break;
            case "wordSpace":
                this.duration = unit * 7;
                break;
        }
    }
}

export class MorseEngine {
    private unit: number;
    private isPlaying: boolean = false;
    private stopSignal: boolean = false;
    private onStateChange: (active: boolean, bit: MorseBit | null) => void;

    constructor(wpm: number = 15, onStateChange: (active: boolean, bit: MorseBit | null) => void) {
        this.unit = 1200 / wpm;
        this.onStateChange = onStateChange;
    }

    public static textToMorse(text: string): string {
        return text
            .toUpperCase()
            .split("")
            .map((char) => {
                if (char === " ") return "/";
                return MORSE_DICTIONARY[char] || "?";
            })
            .join(" ");
    }

    public static compileSequence(text: string, wpm: number): MorseBit[] {
        const unit = 1200 / wpm;
        const sequence: MorseBit[] = [];
        const normalized = text.toUpperCase();

        for (let i = 0; i < normalized.length; i++) {
            const char = normalized[i];

            if (char === " ") {
                sequence.push(new MorseBit("wordSpace", unit));
                continue;
            }

            const code = MORSE_DICTIONARY[char];
            if (!code) continue;

            const bits = code.split("");
            for (let j = 0; j < bits.length; j++) {
                const bit = bits[j];
                if (bit === ".") sequence.push(new MorseBit("dot", unit));
                if (bit === "-") sequence.push(new MorseBit("dash", unit));

                if (j < bits.length - 1) {
                    sequence.push(new MorseBit("gap", unit));
                }
            }

            if (i < normalized.length - 1 && normalized[i + 1] !== " ") {
                sequence.push(new MorseBit("charSpace", unit));
            }
        }

        return sequence;
    }

    public stop() {
        this.stopSignal = true;
    }

    public async transmit(sequence: MorseBit[], loop: boolean = false): Promise<void> {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.stopSignal = false;

        do {
            for (const bit of sequence) {
                if (this.stopSignal) break;

                this.onStateChange(bit.isActive, bit);

                if (bit.isActive && navigator.vibrate) {
                    navigator.vibrate(bit.duration);
                }

                await this.wait(bit.duration);

                if (bit.isActive) {
                    this.onStateChange(false, null);
                }
            }

            if (loop && !this.stopSignal) {
                await this.wait(this.unit * 7);
            }
        } while (loop && !this.stopSignal);

        this.isPlaying = false;
        this.onStateChange(false, null);
    }

    private wait(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public isActive(): boolean {
        return this.isPlaying;
    }
}
