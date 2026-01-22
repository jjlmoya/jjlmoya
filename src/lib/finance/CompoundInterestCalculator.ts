export interface CompoundInterestInput {
    initialPrincipal: number;
    monthlyContribution: number;
    annualInterestRate: number;
    years: number;
}

export interface YearlyResult {
    year: number;
    invested: number;
    interest: number;
    total: number;
}

export class CompoundInterestCalculator {
    static calculate(input: CompoundInterestInput): YearlyResult[] {
        const { initialPrincipal, monthlyContribution, annualInterestRate, years } = input;
        const monthlyRate = annualInterestRate / 100 / 12;
        const results: YearlyResult[] = [];

        let currentBalance = initialPrincipal;
        let totalInvested = initialPrincipal;

        for (let year = 1; year <= years; year++) {
            for (let month = 1; month <= 12; month++) {
                currentBalance = currentBalance * (1 + monthlyRate) + monthlyContribution;
                totalInvested += monthlyContribution;
            }

            results.push({
                year,
                invested: Number(totalInvested.toFixed(2)),
                interest: Number((currentBalance - totalInvested).toFixed(2)),
                total: Number(currentBalance.toFixed(2)),
            });
        }

        return results;
    }
}
