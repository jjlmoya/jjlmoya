export class GiveawayEngine {
    private rawParticipants: string[] = [];
    private excludeList: string[] = [];
    private allowDuplicates: boolean = false;

    private processedParticipants: string[] = [];

    constructor() {
        this.process();
    }

    public setParticipantsFromText(text: string): void {
        this.rawParticipants = text
            .split(/\n/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        this.process();
    }

    public setBlacklistFromText(text: string): void {
        this.excludeList = text
            .split(/[\n,]/)
            .map((s) => s.trim().toLowerCase())
            .filter((s) => s.length > 0);
        this.process();
    }

    public setAllowDuplicates(allow: boolean): void {
        this.allowDuplicates = allow;
        this.process();
    }

    private process(): void {
        const tempMap = new Map<string, number>();

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

            if (this.excludeList.includes(name.toLowerCase())) {
                continue;
            }

            if (this.allowDuplicates) {
                const expansion = Array(weight).fill(name);
                this.processedParticipants.push(...expansion);
            } else {
                const currentW = tempMap.get(name) || 0;
                tempMap.set(name, currentW + weight);
            }
        }

        this.processedParticipants = [];

        if (this.allowDuplicates) {
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
            const entries: { name: string; weight: number }[] = [];

            for (const line of this.rawParticipants) {
                let name = line;
                let weight = 1;
                const match = line.match(weightRegex);
                if (match) {
                    name = match[1].trim();
                    const wStr = match[2] || match[3];

                    weight = Math.min(parseInt(wStr, 10), 1000);
                    if (isNaN(weight) || weight < 1) weight = 1;
                }

                if (this.excludeList.includes(name.toLowerCase())) continue;

                entries.push({ name, weight });
            }

            if (!this.allowDuplicates) {
                const merged = new Map<string, number>();
                for (const e of entries) {
                    merged.set(e.name, (merged.get(e.name) || 0) + e.weight);
                }

                merged.forEach((w, n) => {
                    for (let i = 0; i < w; i++) this.processedParticipants.push(n);
                });
            } else {
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

        const availableIndices = Array.from(
            { length: this.processedParticipants.length },
            (_, i) => i
        );
        const winners: string[] = [];
        const numToPick = Math.min(count, availableIndices.length);

        for (let i = 0; i < numToPick; i++) {
            let randomIndex;

            if (typeof crypto !== "undefined" && crypto.getRandomValues) {
                const array = new Uint32Array(1);
                crypto.getRandomValues(array);
                randomIndex = array[0] % availableIndices.length;
            } else {
                randomIndex = Math.floor(Math.random() * availableIndices.length);
            }

            const winningIndex = availableIndices[randomIndex];
            winners.push(this.processedParticipants[winningIndex]);

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
