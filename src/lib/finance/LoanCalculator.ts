export interface LoanInput {
    amount: number;
    annualInterestRate: number;
    years: number;
    monthlyExtraPayment?: number;
}

export interface LoanResult {
    monthlyPayment: number;
    totalInterest: number;
    totalPaid: number;
    amortizationTable: AmortizationRow[];
    yearsSaved: number;
    monthsSaved: number;
    interestSaved: number;
    originalTotalInterest: number;
    actualDurationMonths: number;
}

export interface AmortizationRow {
    month: number;
    payment: number;
    interest: number;
    principal: number;
    extraPayment: number;
    remainingBalance: number;
}

export class LoanCalculator {
    static calculate(input: LoanInput): LoanResult {
        const { amount, annualInterestRate, years, monthlyExtraPayment = 0 } = input;
        const monthlyRate = annualInterestRate / 100 / 12;
        const totalMonths = years * 12;

        let monthlyPaymentBase = 0;

        if (monthlyRate === 0) {
            monthlyPaymentBase = amount / totalMonths;
        } else {
            monthlyPaymentBase = amount *
                (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }

        
        let originalTotalInterest = 0;
        let tempBalance = amount;
        for (let i = 0; i < totalMonths; i++) {
            const interest = tempBalance * monthlyRate;
            originalTotalInterest += interest;
            tempBalance -= (monthlyPaymentBase - interest);
        }

        
        const amortizationTable: AmortizationRow[] = [];
        let remainingBalance = amount;
        let totalInterest = 0;
        let actualMonths = 0;

        for (let month = 1; month <= totalMonths; month++) {
            
            const interestPayment = remainingBalance * monthlyRate;

            
            let principalPayment = monthlyPaymentBase - interestPayment;

            
            
            let currentExtra = monthlyExtraPayment;

            
            if ((principalPayment + currentExtra) > remainingBalance) {
                
                
                
                
                
                
                if (principalPayment > remainingBalance) {
                    principalPayment = remainingBalance;
                    currentExtra = 0;
                } else {
                    currentExtra = remainingBalance - principalPayment;
                }
                remainingBalance = 0;
            } else {
                remainingBalance -= (principalPayment + currentExtra);
            }

            
            if (remainingBalance < 0.01) remainingBalance = 0;

            totalInterest += interestPayment;
            actualMonths = month;

            amortizationTable.push({
                month,
                payment: Number((principalPayment + interestPayment + currentExtra).toFixed(2)),
                interest: Number(interestPayment.toFixed(2)),
                principal: Number(principalPayment.toFixed(2)),
                extraPayment: Number(currentExtra.toFixed(2)),
                remainingBalance: Number(remainingBalance.toFixed(2))
            });

            if (remainingBalance <= 0) break;
        }

        const stats = {
            monthlyPayment: Number(monthlyPaymentBase.toFixed(2)),
            totalInterest: Number(totalInterest.toFixed(2)),
            totalPaid: Number((amount + totalInterest).toFixed(2)),
            amortizationTable,
            
            originalTotalInterest: Number(originalTotalInterest.toFixed(2)),
            interestSaved: Number((originalTotalInterest - totalInterest).toFixed(2)),
            actualDurationMonths: actualMonths,
            monthsSaved: totalMonths - actualMonths,
            yearsSaved: Number(((totalMonths - actualMonths) / 12).toFixed(1))
        };

        return stats;
    }
}
