export class InflationCalculator {
    
    private static readonly INFLATION_DATA: Record<number, number> = {
        1980: 15.6, 1981: 14.6, 1982: 14.4, 1983: 12.2, 1984: 11.3,
        1985: 8.8, 1986: 8.8, 1987: 5.2, 1988: 4.8, 1989: 6.8,
        1990: 6.7, 1991: 5.9, 1992: 5.9, 1993: 4.6, 1994: 4.7,
        1995: 4.7, 1996: 3.6, 1997: 2.0, 1998: 1.8, 1999: 2.3,
        2000: 3.4, 2001: 3.6, 2002: 3.0, 2003: 3.0, 2004: 3.0,
        2005: 3.7, 2006: 3.5, 2007: 2.8, 2008: 4.1, 2009: -0.3,
        2010: 1.8, 2011: 3.2, 2012: 2.4, 2013: 1.4, 2014: -0.2,
        2015: -0.5, 2016: -0.2, 2017: 2.0, 2018: 1.7, 2019: 0.7,
        2020: -0.3, 2021: 6.5, 2022: 5.7, 2023: 3.1, 2024: 2.8, 
        2025: 2.2 
    };

    
    static calculate(amount: number, startYear: number, endYear: number = 2025): number {
        if (startYear === endYear) return amount;

        let multiplier = 1;
        const start = Math.min(startYear, endYear);
        const end = Math.max(startYear, endYear);

        for (let year = start + 1; year <= end; year++) {
            const inflation = this.INFLATION_DATA[year] || 2.0;
            multiplier *= (1 + inflation / 100);
        }

        if (startYear < endYear) {
            
            return Number((amount * multiplier).toFixed(2));
        } else {
            
            return Number((amount / multiplier).toFixed(2));
        }
    }

    static getAvailableYears(): number[] {
        return Object.keys(this.INFLATION_DATA).map(Number).sort((a, b) => a - b);
    }
}
