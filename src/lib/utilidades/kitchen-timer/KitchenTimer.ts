export class KitchenTimer extends EventTarget {
    element: HTMLElement;
    private inputs: { h: HTMLInputElement; m: HTMLInputElement; s: HTMLInputElement };
    private btnToggle: HTMLButtonElement;
    private btnReset: HTMLButtonElement;
    private btnAdd1m: HTMLButtonElement;
    private btnAdd5m: HTMLButtonElement;
    private statusText: HTMLElement;
    private timerNameInput: HTMLInputElement;

    totalSeconds: number = 0;
    remainingSeconds: number = 0;
    private intervalId: number | null = null;
    isRunning: boolean = false;

    // Static context to be shared if needed, or instance based
    private audioContext: AudioContext | null = null;

    constructor(element: HTMLElement) {
        super();
        this.element = element;

        // Elements
        this.inputs = {
            h: element.querySelector('.hours') as HTMLInputElement,
            m: element.querySelector('.minutes') as HTMLInputElement,
            s: element.querySelector('.seconds') as HTMLInputElement
        };
        this.btnToggle = element.querySelector('.btn-toggle') as HTMLButtonElement;
        this.btnReset = element.querySelector('.btn-reset') as HTMLButtonElement;
        this.btnAdd1m = element.querySelector('.btn-add-1m') as HTMLButtonElement;
        this.btnAdd5m = element.querySelector('.btn-add-5m') as HTMLButtonElement;
        this.statusText = element.querySelector('.status-text') as HTMLElement;
        this.timerNameInput = element.querySelector('.timer-name') as HTMLInputElement;

        this.initEvents();
        this.validateInputs(); // Init state
    }

    private initEvents() {
        this.btnToggle.addEventListener('click', () => this.toggle());
        this.btnReset.addEventListener('click', () => this.reset());
        this.btnAdd1m.addEventListener('click', () => this.addTime(60));
        this.btnAdd5m.addEventListener('click', () => this.addTime(300));

        Object.values(this.inputs).forEach(input => {
            input.addEventListener('change', () => this.validateInputs());
            input.addEventListener('input', () => {
                if (this.isRunning) this.pause();
                this.checkStartButton();
            });
        });

        // Emit name change event for dock updates
        this.timerNameInput.addEventListener('input', () => {
            this.dispatchUpdate();
        });
    }

    private getInputSeconds(): number {
        const h = parseInt(this.inputs.h.value) || 0;
        const m = parseInt(this.inputs.m.value) || 0;
        const s = parseInt(this.inputs.s.value) || 0;
        return (h * 3600) + (m * 60) + s;
    }

    private setDisplay(totalSec: number) {
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;

        this.inputs.h.value = h.toString().padStart(2, '0');
        this.inputs.m.value = m.toString().padStart(2, '0');
        this.inputs.s.value = s.toString().padStart(2, '0');
    }

    private validateInputs() {
        let s = this.getInputSeconds();
        if (s < 0) s = 0;
        this.setDisplay(s);
        this.remainingSeconds = s;
        this.totalSeconds = s;
        this.checkStartButton();
        this.dispatchUpdate();
    }

    private addTime(seconds: number) {
        const current = this.getInputSeconds();
        this.pause();
        this.setDisplay(current + seconds);
        this.validateInputs();
    }

    toggle() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }

    start() {
        if (this.remainingSeconds <= 0) this.validateInputs();
        if (this.remainingSeconds <= 0) return;

        this.isRunning = true;
        this.updateUIState();
        this.dispatchUpdate();

        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.intervalId = window.setInterval(() => {
            this.tick();
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.updateUIState();
        this.dispatchUpdate();
    }

    reset() {
        this.pause();
        this.setDisplay(0);
        this.remainingSeconds = 0;
        this.totalSeconds = 0;
        this.statusText.textContent = "Listo";
        this.statusText.classList.remove("text-green-500", "text-red-600", "animate-pulse", "animate-bounce");
        this.statusText.classList.add("text-orange-500");
        this.element.classList.remove('ring-4', 'ring-red-500', 'bg-red-50', 'dark:bg-red-900/20');
        this.dispatchUpdate();
    }

    tick() {
        if (this.remainingSeconds > 0) {
            this.remainingSeconds--;
            this.setDisplay(this.remainingSeconds);
            this.dispatchUpdate();
        } else {
            this.timeUp();
        }
    }

    private timeUp() {
        this.pause();
        this.playAlarm();
        this.statusText.textContent = "¡TIEMPO!";
        this.statusText.classList.add("text-red-600", "animate-bounce");
        this.element.classList.add('ring-4', 'ring-red-500', 'bg-red-50', 'dark:bg-red-900/20');

        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`Temporizador Terminado de ${this.getName()}`);
        }
        this.dispatchUpdate();
    }

    private playAlarm() {
        if (!this.audioContext) return;

        const playTone = () => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext!.destination);

            osc.type = 'square';
            osc.frequency.setValueAtTime(880, this.audioContext!.currentTime);
            osc.frequency.setValueAtTime(440, this.audioContext!.currentTime + 0.2);
            osc.frequency.setValueAtTime(880, this.audioContext!.currentTime + 0.4);

            gain.gain.setValueAtTime(0.3, this.audioContext!.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.6);

            osc.start();
            osc.stop(this.audioContext!.currentTime + 0.6);
        };

        playTone();
        let count = 0;
        const alarmInterval = setInterval(() => {
            count++;
            if (count > 5) clearInterval(alarmInterval);
            playTone();
        }, 1000);
    }

    private updateUIState() {
        const btnText = this.element.querySelector('.btn-toggle .btn-text');
        if (this.isRunning) {
            this.element.querySelector('.icon-play')?.classList.add('hidden');
            this.element.querySelector('.icon-pause')?.classList.remove('hidden');
            if (btnText) btnText.textContent = 'Pausar';
            this.element.querySelector('.btn-toggle')?.classList.replace('bg-orange-500', 'bg-slate-700');
            this.statusText.textContent = "Contando...";
            this.statusText.classList.replace("text-orange-500", "text-green-500");
            Object.values(this.inputs).forEach(i => i.disabled = true);
        } else {
            this.element.querySelector('.icon-play')?.classList.remove('hidden');
            this.element.querySelector('.icon-pause')?.classList.add('hidden');
            if (btnText) btnText.textContent = 'Iniciar';
            this.element.querySelector('.btn-toggle')?.classList.replace('bg-slate-700', 'bg-orange-500');

            if (this.remainingSeconds > 0 && this.remainingSeconds < this.totalSeconds) {
                this.statusText.textContent = "Pausado";
                this.statusText.classList.replace("text-green-500", "text-orange-500");
            } else if (this.remainingSeconds === 0 && this.totalSeconds > 0) {
                // finished handled in timeUp usually
            } else {
                this.statusText.textContent = "Listo";
                this.statusText.classList.replace("text-green-500", "text-orange-500");
            }
            Object.values(this.inputs).forEach(i => i.disabled = false);
        }
        this.checkStartButton();
    }

    private checkStartButton() {
        if (this.isRunning) {
            this.btnToggle.disabled = false;
            this.btnToggle.classList.remove('opacity-50', 'cursor-not-allowed');
            return;
        }

        const currentSeconds = this.getInputSeconds();
        if (currentSeconds > 0) {
            this.btnToggle.disabled = false;
            this.btnToggle.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            this.btnToggle.disabled = true;
            this.btnToggle.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    private dispatchUpdate() {
        this.dispatchEvent(new CustomEvent('update', { detail: this }));
    }

    public getName() {
        return this.timerNameInput.value;
    }
}
