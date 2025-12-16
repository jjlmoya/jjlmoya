export interface RSVPWord {
    original: string;
    left: string;
    pivot: string;
    right: string;
    delayMod: number;
}

export class RSVPEngine {
    private words: RSVPWord[] = [];
    private wpm: number = 300;
    private isPlaying: boolean = false;
    private currentIndex: number = 0;
    private lastFrameTime: number = 0;
    private accumulatedTime: number = 0;
    private onWordUpdate: (word: RSVPWord) => void;
    private onComplete: () => void;
    private requestAnimationId: number | null = null;

    constructor(onWordUpdate: (word: RSVPWord) => void, onComplete: () => void) {
        this.onWordUpdate = onWordUpdate;
        this.onComplete = onComplete;
    }

    public setText(text: string) {
        const rawWords = text.trim().split(/\s+/);
        this.words = rawWords.map(w => this.processWord(w));
        this.currentIndex = 0;
    }

    public setWPM(wpm: number) {
        this.wpm = wpm;
    }

    public play() {
        if (this.isPlaying) return;
        if (this.currentIndex >= this.words.length) {
            this.currentIndex = 0;
        }
        this.isPlaying = true;
        this.lastFrameTime = performance.now();
        this.accumulatedTime = 0;
        this.loop();
    }

    public pause(rewind: boolean = true) {
        this.isPlaying = false;
        if (this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
        }
        if (rewind) {
            this.currentIndex = Math.max(0, this.currentIndex - 5);
        }
        this.updateCurrentWord();
    }

    public seek(percentage: number) {
        if (this.words.length === 0) return;
        this.currentIndex = Math.floor(this.words.length * (percentage / 100));
        this.updateCurrentWord();
    }

    public getProgress(): number {
        if (this.words.length === 0) return 0;
        return (this.currentIndex / this.words.length) * 100;
    }

    private updateCurrentWord() {
        if (this.words[this.currentIndex]) {
            this.onWordUpdate(this.words[this.currentIndex]);
        }
    }

    private processWord(word: string): RSVPWord {
        const len = word.length;
        let pivotIndex = 0;

        if (len <= 1) pivotIndex = 0;
        else {
            pivotIndex = Math.ceil((len - 1) * 0.35);
        }


        if (pivotIndex >= len) pivotIndex = len - 1;

        const left = word.slice(0, pivotIndex);
        const pivot = word[pivotIndex];
        const right = word.slice(pivotIndex + 1);

        const lastChar = word[word.length - 1];
        let delayMod = 1;
        if ('.?!'.includes(lastChar)) delayMod = 2.5;
        else if (',;:'.includes(lastChar)) delayMod = 2.0;
        else if (len > 12) delayMod = 1.5;

        return { original: word, left, pivot, right, delayMod };
    }

    private loop = () => {
        if (!this.isPlaying) return;

        const now = performance.now();
        const delta = now - this.lastFrameTime;
        this.lastFrameTime = now;
        this.accumulatedTime += delta;

        const baseInterval = 60000 / this.wpm;

        const currentWord = this.words[this.currentIndex];
        const targetDuration = baseInterval * (currentWord ? currentWord.delayMod : 1);

        if (this.accumulatedTime >= targetDuration) {
            this.accumulatedTime -= targetDuration;

            this.currentIndex++;
            if (this.currentIndex >= this.words.length) {
                this.isPlaying = false;
                this.onComplete();
                return;
            }

            this.updateCurrentWord();
        }

        this.requestAnimationId = requestAnimationFrame(this.loop);
    }
}
