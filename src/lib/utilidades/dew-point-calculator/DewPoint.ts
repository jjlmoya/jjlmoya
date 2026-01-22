export class DewPointCalculator {
    private static readonly B = 17.625;
    private static readonly C = 243.04;

    public static calculate(temperature: number, humidity: number): number {
        if (humidity <= 0) return -Infinity;
        if (humidity > 100) humidity = 100;

        const alpha = Math.log(humidity / 100) + (this.B * temperature) / (this.C + temperature);
        const dewPoint = (this.C * alpha) / (this.B - alpha);

        return Math.round(dewPoint * 10) / 10;
    }

    public static getMoldRisk(
        temperature: number,
        dewPoint: number
    ): "low" | "medium" | "high" | "extreme" {
        const difference = temperature - dewPoint;

        if (difference > 5) return "low";
        if (difference > 3) return "medium";
        if (difference > 1) return "high";
        return "extreme";
    }
}
