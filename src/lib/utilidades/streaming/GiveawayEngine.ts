export class GiveawayEngine {
    private participants: string[] = [];
    private winner: string | null = null;

    constructor(initialParticipants: string[] = []) {
        this.participants = this.cleanList(initialParticipants);
    }

    /**
     * Parse a raw string (e.g. from textarea) into a list of names.
     * Splits by newlines and commas.
     */
    public setParticipantsFromText(text: string): void {
        const raw = text.split(/[\n,]/).map(s => s.trim()).filter(s => s.length > 0);
        this.participants = [...new Set(raw)]; // Remove duplicates
    }

    public getParticipants(): string[] {
        return this.participants;
    }

    public getCount(): number {
        return this.participants.length;
    }

    public pickWinner(): string | null {
        if (this.participants.length === 0) return null;

        // Use crypto.getRandomValues if available for better randomness
        let index;
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            index = array[0] % this.participants.length;
        } else {
            index = Math.floor(Math.random() * this.participants.length);
        }

        this.winner = this.participants[index];
        return this.winner;
    }

    public removeParticipant(name: string): void {
        this.participants = this.participants.filter(p => p !== name);
    }

    private cleanList(list: string[]): string[] {
        return [...new Set(list.map(s => s.trim()).filter(s => s.length > 0))];
    }
}
