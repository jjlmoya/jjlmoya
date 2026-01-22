import { CONSTANTS } from "./Constants";

export class InputManager {
    public keys: { [key: string]: boolean } = {};
    public scrollAccumulator: number = 0;
    private onRestart?: () => void;

    constructor(onRestart?: () => void) {
        this.onRestart = onRestart;
        this.setupListeners();
    }

    private setupListeners() {
        window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
        window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
        window.addEventListener(
            "wheel",
            (e) => {
                e.preventDefault();
                if (Math.abs(e.deltaY) > 0) {
                    this.scrollAccumulator += -Math.sign(e.deltaY) * CONSTANTS.SCROLL_SENSITIVITY;
                }
                if (this.onRestart) this.onRestart();
            },
            { passive: false }
        );

        window.addEventListener("mousedown", () => {
            if (this.onRestart) this.onRestart();
        });
    }

    public consumeScroll(): number {
        const value = this.scrollAccumulator;
        this.scrollAccumulator *= 0.5;
        return value;
    }
}
