export interface Node {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    isHeld: boolean;
    heldBy: number | null;
    spawnTime: number;
}

export class FingerTwisterMechanic {
    public nodes: Node[] = [];
    public score: number = 0;
    public isGameOver: boolean = false;
    public isWin: boolean = false;
    public maxNodes: number = 5;
    public winTimer: number = 0;

    private width: number;
    private height: number;
    private nextNodeId: number = 0;
    private spawnTimer: number = 0;
    private spawnInterval: number = 120;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.reset();
    }

    public reset() {
        this.nodes = [];
        this.score = 0;
        this.isGameOver = false;
        this.isWin = false;
        this.winTimer = 0;
        this.nextNodeId = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 120;
        this.spawnNode();
    }

    public update(pointers: { id: number; x: number; y: number }[]) {
        if (this.isGameOver || this.isWin) return;

        const activeHolds = new Set<number>();

        for (const p of pointers) {
            for (const node of this.nodes) {
                const dx = p.x - node.x;
                const dy = p.y - node.y;
                if (dx * dx + dy * dy < node.radius * node.radius) {
                    if (!node.isHeld) {
                        node.isHeld = true;
                        node.heldBy = p.id;
                    }

                    if (node.heldBy === p.id) {
                        activeHolds.add(node.id);
                    }
                }
            }
        }

        for (const node of this.nodes) {
            if (node.isHeld) {
                let stillHeld = false;
                for (const p of pointers) {
                    const dx = p.x - node.x;
                    const dy = p.y - node.y;
                    if (dx * dx + dy * dy < node.radius * node.radius) {
                        stillHeld = true;
                        break;
                    }
                }

                if (!stillHeld) {
                    this.isGameOver = true;
                    return;
                }
            }
        }

        if (this.nodes.length < this.maxNodes && this.nodes.every((n) => n.isHeld)) {
            this.spawnTimer++;
            if (this.spawnTimer >= this.spawnInterval) {
                this.spawnNode();
                this.spawnTimer = 0;

                if (this.spawnInterval > 60) this.spawnInterval -= 5;
            }
        }

        if (this.nodes.length > 0 && this.nodes.every((n) => n.isHeld)) {
            this.score++;
        }

        if (this.nodes.length === this.maxNodes && this.nodes.every((n) => n.isHeld)) {
            this.winTimer++;
            if (this.winTimer >= 300) {
                this.isWin = true;
            }
        } else {
            this.winTimer = 0;
        }
    }

    private spawnNode() {
        const margin = 60;
        let x, y, valid;
        let attempts = 0;

        do {
            x = margin + Math.random() * (this.width - margin * 2);
            y = margin + Math.random() * (this.height - margin * 2);
            valid = true;

            for (const node of this.nodes) {
                const dx = x - node.x;
                const dy = y - node.y;
                if (dx * dx + dy * dy < (node.radius * 2 + 20) ** 2) {
                    valid = false;
                    break;
                }
            }
            attempts++;
        } while (!valid && attempts < 50);

        if (valid) {
            const colors = ["#FF0055", "#00FF55", "#0055FF", "#FFFF00", "#FF00FF"];
            this.nodes.push({
                id: this.nextNodeId++,
                x,
                y,
                radius: 40,
                color: colors[Math.floor(Math.random() * colors.length)],
                isHeld: false,
                heldBy: null,
                spawnTime: Date.now(),
            });
        }
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
