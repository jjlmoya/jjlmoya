export type Method = 'fur' | 'conception';

export interface CalcInput {
    method: Method;
    date: string;
    cycle: number;
}

export interface CalcResult {
    weeks: number;
    days: number;
    trimester: 1 | 2 | 3;
    edd: Date;
    valid: boolean;
    outOfRange?: 'future' | 'too-old';
}

export function calculate(input: CalcInput): CalcResult | null {
    if (!input.date) return null;

    const inputDate = new Date(input.date);
    if (isNaN(inputDate.getTime())) return null;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const gestStart = new Date(inputDate);
    const edd = new Date(inputDate);

    if (input.method === 'fur') {
        edd.setDate(edd.getDate() + 280 + (input.cycle - 28));
    } else {
        gestStart.setDate(gestStart.getDate() - 14);
        edd.setDate(edd.getDate() + 266);
    }

    const totalDays = Math.floor((now.getTime() - gestStart.getTime()) / 86400000);
    if (totalDays < 0)   return { weeks: 0, days: 0, trimester: 1 as const, edd, valid: false, outOfRange: 'future'   as const };
    if (totalDays > 300) return { weeks: 0, days: 0, trimester: 1 as const, edd, valid: false, outOfRange: 'too-old' as const };

    const weeks = Math.floor(totalDays / 7);
    const days  = totalDays % 7;
    const trimester: 1 | 2 | 3 = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;

    return { weeks, days, trimester, edd, valid: true };
}
