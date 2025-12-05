export interface LoanInput {
    amount: number;
    annualInterestRate: number;
    years: number;
}

export interface LoanResult {
    monthlyPayment: number;
    totalInterest: number;
    totalPaid: number;
    amortizationTable: AmortizationRow[];
}

export interface AmortizationRow {
    month: number;
    payment: number;
    interest: number;
    principal: number;
    remainingBalance: number;
}

export class LoanCalculator {
    static calculate(input: LoanInput): LoanResult {
        const { amount, annualInterestRate, years } = input;
        const monthlyRate = annualInterestRate / 100 / 12;
        const totalMonths = years * 12;

        let monthlyPayment = 0;

        if (monthlyRate === 0) {
            monthlyPayment = amount / totalMonths;
        } else {
            // French amortization formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
            monthlyPayment = amount *
                (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }

        const amortizationTable: AmortizationRow[] = [];
        let remainingBalance = amount;
        let totalInterest = 0;

        for (let month = 1; month <= totalMonths; month++) {
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;

            remainingBalance -= principalPayment;
            if (remainingBalance < 0) remainingBalance = 0; // Floating point fix

            totalInterest += interestPayment;

            amortizationTable.push({
                month,
                payment: Number(monthlyPayment.toFixed(2)),
                interest: Number(interestPayment.toFixed(2)),
                principal: Number(principalPayment.toFixed(2)),
                remainingBalance: Number(remainingBalance.toFixed(2))
            });
        }

        return {
            monthlyPayment: Number(monthlyPayment.toFixed(2)),
            totalInterest: Number(totalInterest.toFixed(2)),
            totalPaid: Number((amount + totalInterest).toFixed(2)),
            amortizationTable
        };
    }
}
