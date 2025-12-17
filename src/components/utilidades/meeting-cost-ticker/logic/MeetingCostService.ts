export type SalaryType = 'annual' | 'hourly';

export interface MeetingConfig {
    attendees: number;
    salary: number;
    salaryType: SalaryType;
}

export class MeetingCostService {
    private static readonly ANNUAL_HOURS = 1750;

    public static calculateBurnRatePerSecond(config: MeetingConfig): number {
        const hourlyRatePerPerson = this.getHourlyRate(config.salary, config.salaryType);
        const totalHourlyRate = hourlyRatePerPerson * config.attendees;
        return totalHourlyRate / 3600;
    }

    private static getHourlyRate(salary: number, type: SalaryType): number {
        if (type === 'hourly') {
            return salary;
        }
        return salary / this.ANNUAL_HOURS;
    }

    public static formatCurrency(amount: number): string {
        return amount.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}
