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
        let list = [...this.rawParticipants];

        // 1. Filter Blacklist
        if (this.excludeList.length > 0) {
            list = list.filter(p => !this.excludeList.includes(p.toLowerCase()));
        }

        // 2. Handle Duplicates
        if (!this.allowDuplicates) {
            list = [...new Set(list)];
        }

        this.processedParticipants = list;
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
}
