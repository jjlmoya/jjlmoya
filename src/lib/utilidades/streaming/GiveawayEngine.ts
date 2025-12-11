export class GiveawayEngine {
    private rawParticipants: string[] = [];
    private excludeList: string[] = [];
    private allowDuplicates: boolean = false;
    private winner: string | null = null;
    private processedParticipants: string[] = [];

    constructor() {
        this.process();
    }

    public setParticipantsFromText(text: string): void {
        // Split by newline and remove empty lines
        this.rawParticipants = text.split(/\n/).map(s => s.trim()).filter(s => s.length > 0);
        this.process();
    }

    public setBlacklistFromText(text: string): void {
        this.excludeList = text.split(/[\n,]/).map(s => s.trim().toLowerCase()).filter(s => s.length > 0);
        this.process();
    }

    public setAllowDuplicates(allow: boolean): void {
        this.allowDuplicates = allow;
        this.process();
    }

    private process(): void {
        const tempMap = new Map<string, number>();
        // Regex for: "Name * 5", "Name x5", "Name (x5)"
        // Captures: Group 1 (Name), Group 2/3 (Number)
        const weightRegex = /^(.+?)(?:\s+[\*x]\s*(\d+)|\s*\(\s*[x\*]?\s*(\d+)\s*\))$/i;

        for (const line of this.rawParticipants) {
            let name = line;
            let weight = 1;

            const match = line.match(weightRegex);
            if (match) {
                name = match[1].trim();
                const wStr = match[2] || match[3];
                weight = parseInt(wStr, 10);
                if (isNaN(weight) || weight < 1) weight = 1;
            }

            // 1. Filter Blacklist
            if (this.excludeList.includes(name.toLowerCase())) {
                continue;
            }

            if (this.allowDuplicates) {
                // If duplicates allowed, we treat them as distinct entries? 
                // Actually, for weighted logic to work consistently, we stick to the expanded list concept.
                // But if "Allow Duplicates" is ON, we effectively just append to the list.
                // However, we can't easily append to a Map if keys are names.
                // So let's build a list of objects first if allowDuplicates is ON?
                // The prompt logic was: "If !allowDuplicates, list = [...new Set(list)]"

                // Let's refine:
                // If allowDuplicates is TRUE: We blindly expand every line.
                // If allowDuplicates is FALSE: We merge by name (summing weights).

                // Implementation for ALLOW DUPLICATES = TRUE:
                // We don't merge. We just expand this line's weight immediately.
                const expansion = Array(weight).fill(name);
                this.processedParticipants.push(...expansion); // This will happen in a loop, need to clear array first.
            } else {
                // ALLOW DUPLICATES = FALSE: Merge weights.
                const currentW = tempMap.get(name) || 0;
                tempMap.set(name, currentW + weight);
            }
        }

        this.processedParticipants = [];

        if (this.allowDuplicates) {
            // Logic handled within loop? Actually cleaner to do it here to assume empty start.
            for (const line of this.rawParticipants) {
                let name = line;
                let weight = 1;
                const match = line.match(weightRegex);
                if (match) {
                    name = match[1].trim();
                    const wStr = match[2] || match[3];
                    weight = parseInt(wStr, 10);
                }

                if (this.excludeList.includes(name.toLowerCase())) continue;

                for (let i = 0; i < weight; i++) this.processedParticipants.push(name);
            }
        } else {
            // Re-process for the merging strategy
            // NOTE: Doing this double pass logic in the 'if' above was messy. Rewriting loop.

            // --- CONDENSED LOGIC ---
            // We need to support the "Merge" case primarily.
            // If allowDuplicates is TRUE, we treat "Juan" and "Juan" as distinct sources of tickets.
            // "Juan * 2" and "Juan" -> 2+1 = 3 tickets total.

            // Actually, Map approach works for BOTH if we use a unique key for "allow duplicates" (like index)?
            // No, simpler:

            const entries: { name: string, weight: number }[] = [];

            for (const line of this.rawParticipants) {
                let name = line;
                let weight = 1;
                const match = line.match(weightRegex);
                if (match) {
                    name = match[1].trim();
                    const wStr = match[2] || match[3];
                    // Limit max weight to prevent crashes (e.g. *999999)
                    weight = Math.min(parseInt(wStr, 10), 1000);
                    if (isNaN(weight) || weight < 1) weight = 1;
                }

                if (this.excludeList.includes(name.toLowerCase())) continue;

                entries.push({ name, weight });
            }

            if (!this.allowDuplicates) {
                // MERGE BY NAME
                const merged = new Map<string, number>();
                for (const e of entries) {
                    merged.set(e.name, (merged.get(e.name) || 0) + e.weight);
                }
                // Expand Map
                merged.forEach((w, n) => {
                    for (let i = 0; i < w; i++) this.processedParticipants.push(n);
                });
            } else {
                // DIRECT EXPANSION
                for (const e of entries) {
                    for (let i = 0; i < e.weight; i++) this.processedParticipants.push(e.name);
                }
            }
        }
    }

    public getParticipants(): string[] {
        return this.processedParticipants;
    }

    public getCount(): number {
        return this.processedParticipants.length;
    }

    public pickWinner(): string | null {
        const winners = this.pickWinners(1);
        return winners.length > 0 ? winners[0] : null;
    }

    public pickWinners(count: number = 1): string[] {
        if (this.processedParticipants.length === 0) return [];

        // Pool of available indices to avoid picking the exact same "ticket" twice
        const availableIndices = Array.from({ length: this.processedParticipants.length }, (_, i) => i);
        const winners: string[] = [];
        const numToPick = Math.min(count, availableIndices.length);

        for (let i = 0; i < numToPick; i++) {
            let randomIndex;
            // Secure random index selection
            if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
                const array = new Uint32Array(1);
                crypto.getRandomValues(array);
                randomIndex = array[0] % availableIndices.length;
            } else {
                randomIndex = Math.floor(Math.random() * availableIndices.length);
            }

            const winningIndex = availableIndices[randomIndex];
            winners.push(this.processedParticipants[winningIndex]);

            // Remove used index from pool
            availableIndices.splice(randomIndex, 1);
        }

        return winners;
    }

    public removeParticipant(name: string): void {
        const weightRegex = /^(.+?)(?:\s+[\*x]\s*(\d+)|\s*\(\s*[x\*]?\s*(\d+)\s*\))$/i;

        this.rawParticipants = this.rawParticipants.filter((line) => {
            let extractedName = line;
            const match = line.match(weightRegex);
            if (match) {
                extractedName = match[1].trim();
            }
            return extractedName.toLowerCase() !== name.toLowerCase();
        });

        this.process();
    }
}
