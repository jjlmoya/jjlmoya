import { EcholocationSystem, type Surface } from "./EcholocationSystem";

export class EcholocationGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    player: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        width: number;
        height: number;
        grounded: boolean;
    };
    gravity: number = 0.6;
    friction: number = 0.8;
    jumpForce: number = -12;
    speed: number = 1;

    platforms: Surface[] = [];
    exit: { x: number; y: number; w: number; h: number } | null = null;

    echoSystem: EcholocationSystem;

    keys: { [key: string]: boolean } = {};

    audioCtx: AudioContext | null = null;
    isRunning: boolean = false;
    animationId: number = 0;

    waveSpeed: number = 12;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")!;

        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.player = {
            x: 50,
            y: 50,
            vx: 0,
            vy: 0,
            width: 20,
            height: 20,
            grounded: false,
        };

        this.echoSystem = new EcholocationSystem();

        this.initLevel();
        this.addListeners();

        this.isRunning = true;
        this.loop();
    }

    initAudio() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.audioCtx.state === "suspended") {
            this.audioCtx.resume();
        }
    }

    playTone(
        freq: number,
        type: "sine" | "square" | "sawtooth" | "triangle",
        duration: number,
        vol: number = 0.1
    ) {
        if (!this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.initLevel();
    }

    initLevel() {
        this.platforms = [];
        const w = this.width;
        const h = this.height;

        this.platforms.push({ x: 0, y: 0, w: w, h: 20, material: "stone" });
        this.platforms.push({ x: 0, y: h - 20, w: w, h: 20, material: "stone" });
        this.platforms.push({ x: 0, y: 0, w: 20, h: h, material: "stone" });
        this.platforms.push({ x: w - 20, y: 0, w: 20, h: h, material: "stone" });

        this.platforms.push({ x: 100, y: h - 100, w: 200, h: 20, material: "wood" });
        this.platforms.push({ x: 400, y: h - 200, w: 150, h: 20, material: "metal" });
        this.platforms.push({ x: 150, y: h - 300, w: 150, h: 20, material: "cloth" });
        this.platforms.push({ x: 500, y: h - 400, w: 20, h: 100, material: "stone" });
        this.platforms.push({ x: 600, y: h - 150, w: 100, h: 20, material: "wood" });

        this.echoSystem.setSurfaces(this.platforms);

        this.exit = { x: w - 80, y: h - 80, w: 40, h: 40 };

        this.player.x = 50;
        this.player.y = h - 100;
        this.player.vx = 0;
        this.player.vy = 0;
    }

    addListeners() {
        const startAudio = () => {
            this.initAudio();
            window.removeEventListener("click", startAudio);
            window.removeEventListener("keydown", startAudio);
        };
        window.addEventListener("click", startAudio);
        window.addEventListener("keydown", startAudio);

        window.addEventListener("keydown", (e) => {
            this.keys[e.code] = true;

            if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
                if (this.player.grounded) {
                    this.player.vy = this.jumpForce;
                    this.player.grounded = false;
                    this.emitSound(this.player.x + 10, this.player.y + 10, 300, 180, "jump");
                }
            }

            if (e.code === "KeyZ" || e.code === "Enter") {
                this.emitSound(this.player.x + 10, this.player.y + 10, 800, 720, "shout");
            }
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.code] = false;
        });

        document.getElementById("restartBtn")?.addEventListener("click", () => {
            document.getElementById("winMessage")?.classList.add("hidden");
            this.initLevel();
            this.isRunning = true;
            this.loop();
        });
    }

    emitSound(
        x: number,
        y: number,
        radius: number,
        rayCount: number,
        type: "step" | "jump" | "land" | "shout" | "bump" = "step"
    ) {
        if (type === "step") this.playTone(100 + Math.random() * 50, "triangle", 0.05, 0.05);
        if (type === "jump") this.playTone(300, "sine", 0.2, 0.1);
        if (type === "land") this.playTone(150, "square", 0.1, 0.1);
        if (type === "shout") this.playTone(400 + Math.random() * 100, "sawtooth", 0.3, 0.1);
        if (type === "bump") this.playTone(80, "square", 0.1, 0.1);

        const color = type === "shout" ? "#ffffff" : "#34d399";

        const exaggeratedRayCount = rayCount * 6;
        const exaggeratedRadius = radius * 2.5;

        this.echoSystem.emit(x, y, exaggeratedRadius, exaggeratedRayCount, color, this.waveSpeed);
    }

    update() {
        if (!this.isRunning) return;

        if (this.keys["ArrowLeft"] || this.keys["KeyA"]) {
            this.player.vx -= this.speed;
            if (Math.random() > 0.9 && this.player.grounded) {
                this.emitSound(this.player.x + 10, this.player.y + 20, 250, 64, "step");
            }
        }
        if (this.keys["ArrowRight"] || this.keys["KeyD"]) {
            this.player.vx += this.speed;
            if (Math.random() > 0.9 && this.player.grounded) {
                this.emitSound(this.player.x + 10, this.player.y + 20, 250, 64, "step");
            }
        }

        this.player.vx *= this.friction;
        this.player.vy += this.gravity;

        this.player.x += this.player.vx;
        this.checkCollision("x");

        this.player.y += this.player.vy;
        this.checkCollision("y");

        if (
            this.exit &&
            this.player.x < this.exit.x + this.exit.w &&
            this.player.x + this.player.width > this.exit.x &&
            this.player.y < this.exit.y + this.exit.h &&
            this.player.y + this.player.height > this.exit.y
        ) {
            this.isRunning = false;
            document.getElementById("winMessage")?.classList.remove("hidden");
        }

        this.echoSystem.update();
    }

    checkCollision(axis: "x" | "y") {
        for (const plat of this.platforms) {
            if (
                this.rectIntersect(
                    this.player.x,
                    this.player.y,
                    this.player.width,
                    this.player.height,
                    plat.x,
                    plat.y,
                    plat.w,
                    plat.h
                )
            ) {
                if (axis === "x") {
                    if (this.player.vx > 0) {
                        this.player.x = plat.x - this.player.width;
                        if (Math.abs(this.player.vx) > 1)
                            this.emitSound(this.player.x + 20, this.player.y + 10, 120, 60, "bump");
                    } else {
                        this.player.x = plat.x + plat.w;
                        if (Math.abs(this.player.vx) > 1)
                            this.emitSound(this.player.x, this.player.y + 10, 120, 60, "bump");
                    }
                    this.player.vx = 0;
                } else {
                    if (this.player.vy > 0) {
                        this.player.y = plat.y - this.player.height;
                        this.player.grounded = true;

                        if (this.player.vy > 2)
                            this.emitSound(
                                this.player.x + 10,
                                this.player.y + 20,
                                150,
                                100,
                                "land"
                            );
                        this.player.vy = 0;
                    } else {
                        this.player.y = plat.y + plat.h;
                        this.player.vy = 0;
                        this.emitSound(this.player.x + 10, this.player.y, 100, 40, "bump");
                    }
                }
            }
        }
    }

    rectIntersect(
        x1: number,
        y1: number,
        w1: number,
        h1: number,
        x2: number,
        y2: number,
        w2: number,
        h2: number
    ) {
        return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
    }

    draw() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.echoSystem.draw(this.ctx);

        this.ctx.strokeStyle = "#222";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);

        if (this.exit) {
            this.ctx.strokeStyle = "#110000";
            this.ctx.strokeRect(this.exit.x, this.exit.y, this.exit.w, this.exit.h);
        }
    }

    loop() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.loop());
    }
}
