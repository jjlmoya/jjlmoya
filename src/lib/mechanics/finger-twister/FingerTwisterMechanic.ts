export interface Node {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    isHeld: boolean;
    heldBy: number | null; // Pointer ID
    spawnTime: number;
}

export class FingerTwisterMechanic {
    public nodes: Node[] = [];
    public score: number = 0;
    public isGameOver: boolean = false;
    public maxNodes: number = 5; // Max simultaneous holds

    private width: number;
    private height: number;
    private nextNodeId: number = 0;
    private spawnTimer: number = 0;
    private spawnInterval: number = 120; // 2 seconds

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.reset();
    }

    public reset() {
        this.nodes = [];
        this.score = 0;
        this.isGameOver = false;
        this.nextNodeId = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 120;
        this.spawnNode(); // Start with one
    }

    public update(pointers: { id: number; x: number; y: number }[]) {
        if (this.isGameOver) return;

        // 1. Map pointers to nodes
        // Reset held status for checking
        const activeHolds = new Set<number>(); // Node IDs currently held

        for (const p of pointers) {
            // Check if this pointer is inside any node
            for (const node of this.nodes) {
                const dx = p.x - node.x;
                const dy = p.y - node.y;
                if (dx * dx + dy * dy < node.radius * node.radius) {
                    // This pointer is touching this node
                    // If node was already held by another pointer, that's fine (multi-touch overlap)
                    // But ideally one pointer -> one node? 
                    // For simplicity: if a pointer is in a node, that node is held.

                    // If node was not held, mark it held
                    if (!node.isHeld) {
                        node.isHeld = true;
                        node.heldBy = p.id;
                    }

                    // If it was held by THIS pointer, confirm it
                    if (node.heldBy === p.id) {
                        activeHolds.add(node.id);
                    }

                    // If it was held by ANOTHER pointer, but that pointer is gone?
                    // We need to be careful. 
                    // Let's simplify: A node is held if ANY pointer is on it.
                    // But "Twister" requires keeping the finger there.
                    // So we must track continuity.
                }
            }
        }

        // 2. Check for released nodes (Game Over condition)
        for (const node of this.nodes) {
            if (node.isHeld) {
                // Check if ANY pointer is currently on it
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
                    // Player let go!
                    this.isGameOver = true;
                    return;
                }
            }
        }

        // 3. Spawning
        // Only spawn if we haven't reached max nodes
        if (this.nodes.length < this.maxNodes) {
            this.spawnTimer++;
            if (this.spawnTimer >= this.spawnInterval) {
                this.spawnNode();
                this.spawnTimer = 0;
                // Increase difficulty
                if (this.spawnInterval > 60) this.spawnInterval -= 5;
            }
        }

        // 4. Scoring
        // Score increases for every frame you hold all active nodes?
        // Or just for surviving.
        if (this.nodes.length > 0 && this.nodes.every(n => n.isHeld)) {
            this.score++;
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

            // Check overlap
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
                x, y,
                radius: 40,
                color: colors[Math.floor(Math.random() * colors.length)],
                isHeld: false,
                heldBy: null,
                spawnTime: Date.now()
            });
        }
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
