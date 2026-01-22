import { CONSTANTS } from "./Constants";
import type { Particle, Scrap, Entity, Star, Nebula, Upgrades } from "./Types";

export class Renderer {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.resize();
    }

    public resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public clear() {
        this.ctx.fillStyle = "#010409";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public drawWorld(
        x: number,
        y: number,
        angle: number,
        stars: Star[],
        scrap: Scrap[],
        obstacles: Entity[],
        nebulas: Nebula[],
        particles: Particle[],
        velocity: number,
        cameraShake: number,
        time: number
    ) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.save();
        this.ctx.translate(centerX, centerY);

        const totalShake = cameraShake + (velocity / CONSTANTS.MAX_SPEED) * 3;
        if (totalShake > 0.5) {
            this.ctx.translate(
                (Math.random() - 0.5) * totalShake,
                (Math.random() - 0.5) * totalShake
            );
        }

        this.ctx.rotate(-angle - Math.PI / 2);
        this.ctx.translate(-x, -y);

        this.drawNebulas(nebulas);
        this.drawStars(stars);
        this.drawGrid();
        this.drawBase(time);
        this.drawParticles(particles, velocity);
        this.drawScrap(scrap, time);
        this.drawObstacles(obstacles, time);

        this.ctx.restore();
    }

    private drawNebulas(nebulas: Nebula[]) {
        nebulas.forEach((n) => {
            const grad = this.ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size);
            grad.addColorStop(0, n.color);
            grad.addColorStop(1, "transparent");
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(n.x - n.size, n.y - n.size, n.size * 2, n.size * 2);
        });
    }

    private drawStars(stars: Star[]) {
        stars.forEach((s) => {
            this.ctx.globalAlpha = s.opacity;
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(s.x, s.y, s.size, s.size);
        });
        this.ctx.globalAlpha = 1;
    }

    private drawGrid() {
        this.ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
        this.ctx.lineWidth = 1;
        for (let i = -6000; i <= 6000; i += 1000) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, -6000);
            this.ctx.lineTo(i, 6000);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(-6000, i);
            this.ctx.lineTo(6000, i);
            this.ctx.stroke();
        }
    }

    private drawBase(time: number) {
        const bx = CONSTANTS.BASE_LOCATION.x;
        const by = CONSTANTS.BASE_LOCATION.y;

        this.ctx.save();
        this.ctx.translate(bx, by);

        const pulse = 1 + Math.sin(time * 2) * 0.1;
        this.ctx.strokeStyle = "#0ea5e9";
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 150 * pulse, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.globalAlpha = 0.2;
        this.ctx.fillStyle = "#0ea5e9";
        this.ctx.fill();
        this.ctx.globalAlpha = 1;

        this.ctx.rotate(time * 0.5);
        this.ctx.fillStyle = "#f8fafc";
        this.ctx.fillRect(-40, -40, 80, 80);
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.lineWidth = 8;
        this.ctx.strokeRect(-45, -45, 90, 90);

        this.ctx.font = "bold 24px monospace";
        this.ctx.fillStyle = "#0ea5e9";
        this.ctx.textAlign = "center";
        this.ctx.rotate(-time * 0.5);
        this.ctx.fillText("TALLER", 0, -180);

        this.ctx.restore();
    }

    private drawParticles(particles: Particle[], velocity: number) {
        const warpFactor = Math.max(
            0,
            (velocity - CONSTANTS.WARP_SPEED) / (CONSTANTS.MAX_SPEED - CONSTANTS.WARP_SPEED)
        );
        particles.forEach((p) => {
            const streak = Math.max(2, velocity * (0.1 + warpFactor * 0.5));
            this.ctx.fillStyle =
                warpFactor > 0.5
                    ? `rgba(255, 255, 255, ${p.alpha})`
                    : `rgba(14, 165, 233, ${p.alpha * 0.6})`;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.fillRect(-1, 0, 2, streak);
            this.ctx.restore();
        });
    }

    private drawScrap(scrap: Scrap[], time: number) {
        scrap.forEach((s) => {
            if (!s.gathered) {
                this.ctx.save();
                this.ctx.translate(s.x, s.y);
                this.ctx.rotate(time + s.seed * 10);

                const pulse = 1 + Math.sin(time * 5) * 0.1;
                this.ctx.fillStyle = "#facc15";
                this.ctx.shadowColor = "#facc15";
                this.ctx.shadowBlur = 15;
                this.ctx.fillRect(
                    (-s.size / 2) * pulse,
                    (-s.size / 2) * pulse,
                    s.size * pulse,
                    s.size * pulse
                );

                this.ctx.strokeStyle = "#fff";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(
                    (-s.size / 2) * pulse,
                    (-s.size / 2) * pulse,
                    s.size * pulse,
                    s.size * pulse
                );
                this.ctx.restore();
            }
        });
    }

    private drawObstacles(obstacles: Entity[], time: number) {
        obstacles.forEach((o) => {
            this.ctx.save();
            this.ctx.translate(o.x, o.y);
            this.ctx.rotate(o.seed * 10 + time * 0.1);

            this.ctx.fillStyle = "#0f172a";
            this.ctx.beginPath();
            for (let n = 0; n < 8; n++) {
                const a = (n / 8) * Math.PI * 2;
                const r = (o.size / 2) * (0.8 + Math.sin(o.seed * 5 + n) * 0.2);
                const px = Math.cos(a) * r;
                const py = Math.sin(a) * r;
                if (n === 0) this.ctx.moveTo(px, py);
                else this.ctx.lineTo(px, py);
            }
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.strokeStyle = "#1e293b";
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
            this.ctx.restore();
        });
    }

    public drawShip(velocity: number, angularVelocity: number, pedalFlash: number) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(angularVelocity * 12);

        if (velocity > 0.1) {
            const flicker = Math.random();
            const thrusterLen = 15 + velocity * 0.5;
            const grad = this.ctx.createLinearGradient(0, 20, 0, 20 + thrusterLen);
            grad.addColorStop(0, `rgba(14, 165, 233, ${0.6 + pedalFlash})`);
            grad.addColorStop(0.5, "rgba(56, 189, 248, 0.3)");
            grad.addColorStop(1, "transparent");

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.moveTo(-15, 18);
            this.ctx.lineTo(0, 18 + thrusterLen * (0.9 + flicker * 0.1));
            this.ctx.lineTo(15, 18);
            this.ctx.fill();

            this.ctx.shadowColor = "#0ea5e9";
            this.ctx.shadowBlur = 20 * (pedalFlash + 0.5);
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(-8, 16, 16, 2);
            this.ctx.shadowBlur = 0;
        }

        this.ctx.fillStyle = "#f8fafc";
        this.ctx.beginPath();
        this.ctx.moveTo(0, -45);
        this.ctx.lineTo(32, 25);
        this.ctx.lineTo(0, 10);
        this.ctx.lineTo(-32, 25);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = "#cbd5e1";
        this.ctx.beginPath();
        this.ctx.moveTo(0, -45);
        this.ctx.lineTo(32, 25);
        this.ctx.lineTo(0, 10);
        this.ctx.fill();

        this.ctx.fillStyle = "#0ea5e9";
        this.ctx.globalAlpha = 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -15);
        this.ctx.lineTo(10, 5);
        this.ctx.lineTo(0, 10);
        this.ctx.lineTo(-10, 5);
        this.ctx.fill();
        this.ctx.globalAlpha = 1.0;

        this.ctx.restore();
    }

    public drawHUD(
        velocity: number,
        health: number,
        score: number,
        scrap: Scrap[],
        upgrades: Upgrades,
        isAtBase: boolean,
        playerX: number,
        playerY: number,
        playerAngle: number,
        time: number
    ) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.save();
        this.ctx.translate(centerX, centerY);

        const alpha = 0.7 + Math.sin(time * 3) * 0.1;
        this.ctx.globalAlpha = alpha;

        this.drawBars(velocity, health);
        this.drawStats(score, upgrades, isAtBase);
        this.drawPointers(scrap, playerX, playerY, playerAngle, time);

        this.ctx.restore();
    }

    private drawBars(velocity: number, health: number) {
        this.ctx.strokeStyle = "#0ea5e9";
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 85, Math.PI * 0.6, Math.PI * 1.4);
        this.ctx.stroke();

        const sA = Math.PI * 0.6 + (velocity / CONSTANTS.MAX_SPEED) * Math.PI * 0.8;
        this.ctx.fillStyle = "#0ea5e9";
        this.ctx.beginPath();
        this.ctx.arc(Math.cos(sA) * 85, Math.sin(sA) * 85, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.font = "bold 10px monospace";
        this.ctx.textAlign = "right";
        this.ctx.fillText(`POTENCIA: ${Math.floor(velocity)}`, -95, 0);

        this.ctx.beginPath();
        this.ctx.arc(0, 0, 85, Math.PI * 1.6, Math.PI * 2.4);
        this.ctx.stroke();

        const hA = Math.PI * 2.4 - (health / 100) * Math.PI * 0.8;
        this.ctx.fillStyle = health > 30 ? "#10b981" : "#ef4444";
        this.ctx.beginPath();
        this.ctx.arc(Math.cos(hA) * 85, Math.sin(hA) * 85, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.textAlign = "left";
        this.ctx.fillText(`ESTADO: ${Math.floor(health)}%`, 95, 0);
    }

    private drawStats(score: number, upgrades: Upgrades, isAtBase: boolean) {
        this.ctx.font = "bold 14px monospace";
        this.ctx.fillStyle = "#94a3b8";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`BODEGA: ${score}`, 0, 130);

        if (isAtBase) {
            this.ctx.fillStyle = "#0ea5e9";
            this.ctx.fillText("--- MEJORAS DEL TALLER (1, 2, 3) ---", 0, 160);
            this.ctx.font = "12px monospace";
            this.ctx.fillText(
                `1. MOTOR (Nivel ${upgrades.engine}) - Coste: ${CONSTANTS.UPGRADE_COST}`,
                0,
                180
            );
            this.ctx.fillText(
                `2. CASCO (Nivel ${upgrades.hull}) - Coste: ${CONSTANTS.UPGRADE_COST}`,
                0,
                200
            );
            this.ctx.fillText(
                `3. MANIOBRA (Nivel ${upgrades.steering}) - Coste: ${CONSTANTS.UPGRADE_COST}`,
                0,
                220
            );
        }
    }

    private drawPointers(
        scrap: Scrap[],
        playerX: number,
        playerY: number,
        playerAngle: number,
        time: number
    ) {
        const dxBase = CONSTANTS.BASE_LOCATION.x - playerX;
        const dyBase = CONSTANTS.BASE_LOCATION.y - playerY;
        const distBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);

        if (distBase > 300) {
            const targetAngle = Math.atan2(dyBase, dxBase);
            let relAngle = targetAngle - playerAngle;

            while (relAngle > Math.PI) relAngle -= Math.PI * 2;
            while (relAngle < -Math.PI) relAngle += Math.PI * 2;

            this.ctx.save();
            this.ctx.rotate(relAngle);
            this.ctx.fillStyle = "#0ea5e9";
            this.ctx.beginPath();
            this.ctx.moveTo(0, -145);
            this.ctx.lineTo(10, -125);
            this.ctx.lineTo(-10, -125);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.font = "bold 11px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText(`${Math.floor(distBase)}m`, 0, -155);
            this.ctx.restore();
        }

        scrap.forEach((s) => {
            if (!s.gathered) {
                const dx = s.x - playerX;
                const dy = s.y - playerY;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 1500) {
                    const targetAngle = Math.atan2(dy, dx);
                    let relAngle = targetAngle - playerAngle;

                    while (relAngle > Math.PI) relAngle -= Math.PI * 2;
                    while (relAngle < -Math.PI) relAngle += Math.PI * 2;

                    this.ctx.save();
                    this.ctx.rotate(relAngle);

                    const pulse = 0.7 + Math.sin(time * 12 + s.seed * 5) * 0.3;
                    this.ctx.fillStyle = `rgba(250, 204, 21, ${pulse})`;
                    this.ctx.shadowColor = "#facc15";
                    this.ctx.shadowBlur = pulse * 12;

                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -140);
                    this.ctx.lineTo(6, -125);
                    this.ctx.lineTo(-6, -125);
                    this.ctx.closePath();
                    this.ctx.fill();

                    this.ctx.shadowBlur = 0;
                    this.ctx.font = "bold 10px monospace";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(`${Math.floor(d)}m`, 0, -150);
                    this.ctx.restore();
                }
            }
        });
    }

    public drawVignette() {
        const g = this.ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            0,
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.max(this.canvas.width, this.canvas.height) * 0.6
        );
        g.addColorStop(0, "transparent");
        g.addColorStop(1, "rgba(1, 4, 9, 0.9)");
        this.ctx.fillStyle = g;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        for (let i = 0; i < this.canvas.height; i += 4) {
            this.ctx.fillRect(0, i, this.canvas.width, 1);
        }
    }

    public drawMessage(message: string, timer: number) {
        if (!message || timer <= 0) return;
        this.ctx.save();
        this.ctx.textAlign = "center";
        this.ctx.font = "900 48px sans-serif";
        this.ctx.fillStyle = "#fff";
        this.ctx.shadowColor = "rgba(0,0,0,0.5)";
        this.ctx.shadowBlur = 15;
        this.ctx.globalAlpha = Math.min(1, timer / 20);
        this.ctx.fillText(message, this.canvas.width / 2, this.canvas.height / 2 - 180);
        this.ctx.restore();
    }

    public drawGameOver() {
        this.ctx.save();
        this.ctx.fillStyle = "rgba(1, 4, 9, 0.95)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.textAlign = "center";

        this.ctx.fillStyle = "#ef4444";
        this.ctx.font = "900 80px sans-serif";
        this.ctx.shadowColor = "#ef4444";
        this.ctx.shadowBlur = 25;
        this.ctx.fillText("SISTEMAS APAGADOS", 0, -20);

        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = "#94a3b8";
        this.ctx.font = "24px sans-serif";
        this.ctx.fillText("Usa el SCROLL para reiniciar propulsores", 0, 60);
        this.ctx.restore();
    }
}
