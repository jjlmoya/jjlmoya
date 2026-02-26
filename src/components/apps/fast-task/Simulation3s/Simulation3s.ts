class Simulation3s {
    private timerElement: HTMLElement | null;
    private progressBar: HTMLElement | null;
    private steps: NodeListOf<HTMLElement>;
    private isMobileLine: boolean = false;
    private isRunning: boolean = false;
    private startTime: number = 0;
    private readonly duration: number = 3000;
    private readonly pauseDuration: number = 2000;
    private observer: IntersectionObserver;
    private frameId: number | null = null;

    constructor() {
        this.timerElement = document.getElementById("sim-timer");
        this.progressBar = document.getElementById("sim-progress");
        this.steps = document.querySelectorAll(".sim-step");

        this.isMobileLine = window.innerWidth <= 768;
        window.addEventListener("resize", () => {
            this.isMobileLine = window.innerWidth <= 768;
        });

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.startAnimation();
                    } else {
                        this.stopAnimation();
                    }
                });
            },
            { threshold: 0.3 }
        );

        const section = document.getElementById("simulation-3s");
        if (section) {
            this.observer.observe(section);
        }
    }

    private startAnimation() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startTime = performance.now();
        this.animate(performance.now());
    }

    private stopAnimation() {
        this.isRunning = false;
        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }

    private animate(currentTime: number) {
        if (!this.isRunning) return;

        let elapsed = currentTime - this.startTime;

        if (elapsed > this.duration + this.pauseDuration) {
            this.startTime = currentTime;
            elapsed = 0;
        }

        const simElapsed = Math.min(elapsed, this.duration);

        if (this.timerElement) {
            this.timerElement.textContent = (simElapsed / 1000).toFixed(2) + "s";
        }

        const progress = (simElapsed / this.duration) * 100;

        const progDesk = document.getElementById("sim-progress-desk");
        if (progDesk) progDesk.style.width = `${progress}%`;

        const progMob = document.getElementById("sim-progress-mob");
        if (progMob) progMob.style.height = `${progress}%`;

        if (simElapsed < 1000) {
            this.setActiveStep(0);
        } else if (simElapsed < 2000) {
            this.setActiveStep(1);
        } else if (simElapsed < 3000) {
            this.setActiveStep(2);
        } else {
            this.setAllCompleted();
        }

        this.frameId = requestAnimationFrame(this.animate.bind(this));
    }

    private setActiveStep(index: number) {
        this.steps.forEach((step, i) => {
            if (i === index) {
                step.classList.add("active");
                step.classList.remove("completed");
            } else if (i < index) {
                step.classList.add("active");
                step.classList.add("completed");
                step.classList.remove("active");
            } else {
                step.classList.remove("active");
                step.classList.remove("completed");
            }
        });
    }

    private setAllCompleted() {
        this.steps.forEach((step) => {
            step.classList.remove("active");
            step.classList.add("completed");
        });
    }
}

const initSimulation = () => {
    new Simulation3s();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSimulation);
} else {
    initSimulation();
}

document.addEventListener(
    "astro:page-load",
    () => {
        if (document.getElementById("simulation-3s")) {
            new Simulation3s();
        }
    },
    { once: false }
);
