export type MaterialType = "stone" | "metal" | "wood" | "cloth";

export interface Surface {
    x: number;
    y: number;
    w: number;
    h: number;
    material: MaterialType;
}

interface RaySegment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    angle: number;
    length: number;
    cumulativeDist: number;
}

interface PulseRay {
    segments: RaySegment[];
    totalLength: number;
}

interface Pulse {
    rays: PulseRay[];
    age: number;
    speed: number;
    maxDist: number;
    color: string;
    active: boolean;
}

export class EcholocationSystem {
    pulses: Pulse[] = [];
    surfaces: Surface[] = [];

    materialProps: Record<MaterialType, { reflectivity: number; absorption: number }> = {
        stone: { reflectivity: 0.98, absorption: 0 },
        metal: { reflectivity: 1.0, absorption: 0 },
        wood: { reflectivity: 0.9, absorption: 0 },
        cloth: { reflectivity: 0.6, absorption: 0.1 },
    };

    constructor() {}

    setSurfaces(surfaces: Surface[]) {
        this.surfaces = surfaces;
    }

    emit(x: number, y: number, radius: number, rayCount: number, color: string, speed: number) {
        const pulseRays: PulseRay[] = [];

        for (let i = 0; i < rayCount; i++) {
            const angle = ((Math.PI * 2) / rayCount) * i;
            const rayPath = this.calculateRayPath(x, y, angle, radius);
            pulseRays.push(rayPath);
        }

        this.pulses.push({
            rays: pulseRays,
            age: 0,
            speed: speed,
            maxDist: radius,
            color: color,
            active: true,
        });
    }

    calculateRayPath(
        startX: number,
        startY: number,
        startAngle: number,
        maxDist: number
    ): PulseRay {
        const segments: RaySegment[] = [];
        let currentX = startX;
        let currentY = startY;
        let currentAngle = startAngle;
        let distRemaining = maxDist;
        let cumulativeDist = 0;

        const maxBounces = 15;

        for (let b = 0; b <= maxBounces; b++) {
            if (distRemaining <= 0.1) break;

            const dx = Math.cos(currentAngle);
            const dy = Math.sin(currentAngle);

            const hit = this.raycast(currentX, currentY, dx, dy, distRemaining);

            if (hit) {
                const segLength = hit.dist;

                segments.push({
                    x1: currentX,
                    y1: currentY,
                    x2: hit.x,
                    y2: hit.y,
                    angle: currentAngle,
                    length: segLength,
                    cumulativeDist: cumulativeDist,
                });

                cumulativeDist += segLength;
                distRemaining -= segLength;

                const nx = hit.nx;
                const ny = hit.ny;

                const dot = dx * nx + dy * ny;
                const rx = dx - 2 * dot * nx;
                const ry = dy - 2 * dot * ny;

                currentAngle = Math.atan2(ry, rx);

                currentX = hit.x + nx * 2.0;
                currentY = hit.y + ny * 2.0;

                const props = this.materialProps[hit.surface.material];
                distRemaining *= props.reflectivity;

                if (Math.random() < props.absorption) {
                    distRemaining = 0;
                }
            } else {
                segments.push({
                    x1: currentX,
                    y1: currentY,
                    x2: currentX + dx * distRemaining,
                    y2: currentY + dy * distRemaining,
                    angle: currentAngle,
                    length: distRemaining,
                    cumulativeDist: cumulativeDist,
                });
                break;
            }
        }

        return {
            segments,
            totalLength: segments.reduce((acc, s) => acc + s.length, 0),
        };
    }

    raycast(x: number, y: number, dx: number, dy: number, maxDist: number) {
        let closestHit: {
            x: number;
            y: number;
            dist: number;
            surface: Surface;
            nx: number;
            ny: number;
        } | null = null;

        for (const plat of this.surfaces) {
            const hit = this.intersectRayRect(x, y, dx, dy, plat);
            if (hit) {
                if (hit.dist <= maxDist) {
                    if (!closestHit || hit.dist < closestHit.dist) {
                        closestHit = {
                            x: hit.x,
                            y: hit.y,
                            dist: hit.dist,
                            surface: plat,
                            nx: hit.nx,
                            ny: hit.ny,
                        };
                    }
                }
            }
        }
        return closestHit;
    }

    intersectRayRect(ox: number, oy: number, dx: number, dy: number, rect: Surface) {
        let tmin = -Infinity;
        let tmax = Infinity;
        let nx = 0;
        let ny = 0;

        if (dx !== 0) {
            const tx1 = (rect.x - ox) / dx;
            const tx2 = (rect.x + rect.w - ox) / dx;

            const t1 = Math.min(tx1, tx2);
            const t2 = Math.max(tx1, tx2);

            if (t1 > tmin) {
                tmin = t1;
                nx = dx > 0 ? -1 : 1;
                ny = 0;
            }

            tmax = Math.min(tmax, t2);
        } else {
            if (ox < rect.x || ox > rect.x + rect.w) return null;
        }

        if (dy !== 0) {
            const ty1 = (rect.y - oy) / dy;
            const ty2 = (rect.y + rect.h - oy) / dy;

            const t1 = Math.min(ty1, ty2);
            const t2 = Math.max(ty1, ty2);

            if (t1 > tmin) {
                tmin = t1;
                nx = 0;
                ny = dy > 0 ? -1 : 1;
            }

            tmax = Math.min(tmax, t2);
        } else {
            if (oy < rect.y || oy > rect.y + rect.h) return null;
        }

        if (tmax >= tmin && tmin > 0.001) {
            const hitX = ox + tmin * dx;
            const hitY = oy + tmin * dy;
            return { x: hitX, y: hitY, nx, ny, dist: tmin };
        }

        return null;
    }

    update() {
        for (let i = this.pulses.length - 1; i >= 0; i--) {
            const p = this.pulses[i];
            p.age++;

            if (p.age * p.speed > p.maxDist) {
                p.active = false;
                this.pulses.splice(i, 1);
                continue;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.pulses.forEach((p) => {
            const currentDist = p.age * p.speed;
            const prevDist = Math.max(0, (p.age - 1) * p.speed);

            const opacity = Math.max(0, (1 - currentDist / p.maxDist) * 0.5);

            ctx.globalAlpha = opacity;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";

            for (const ray of p.rays) {
                let segStartDist = 0;

                for (const seg of ray.segments) {
                    const segEndDist = segStartDist + seg.length;

                    const drawStart = Math.max(prevDist, segStartDist);
                    const drawEnd = Math.min(currentDist, segEndDist);

                    if (drawStart < drawEnd) {
                        const distOnSegStart = drawStart - segStartDist;
                        const distOnSegEnd = drawEnd - segStartDist;

                        const x1 = seg.x1 + Math.cos(seg.angle) * distOnSegStart;
                        const y1 = seg.y1 + Math.sin(seg.angle) * distOnSegStart;
                        const x2 = seg.x1 + Math.cos(seg.angle) * distOnSegEnd;
                        const y2 = seg.y1 + Math.sin(seg.angle) * distOnSegEnd;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }

                    segStartDist = segEndDist;
                }
            }
            ctx.globalAlpha = 1.0;
        });
    }
}
