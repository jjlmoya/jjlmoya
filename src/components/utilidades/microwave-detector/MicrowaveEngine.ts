export interface PingResult {
    latency: number;
    jitter: number;
    timestamp: number;
}

export class MicrowaveEngine {
    private lastPings: number[] = [];
    private maxHistory = 100;

    async measurePing(): Promise<PingResult> {
        const start = performance.now();
        try {
            
            
            await fetch(`/?nocache=${Math.random()}`, {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store'
            });
            const end = performance.now();
            const latency = end - start;

            this.lastPings.push(latency);
            if (this.lastPings.length > this.maxHistory) this.lastPings.shift();

            const jitter = this.calculateJitter();

            return {
                latency,
                jitter,
                timestamp: Date.now()
            };
        } catch (e) {
            console.error("Ping failed", e);
            return { latency: 0, jitter: 0, timestamp: Date.now() };
        }
    }

    private calculateJitter(): number {
        if (this.lastPings.length < 2) return 0;
        let diffSum = 0;
        for (let i = 1; i < this.lastPings.length; i++) {
            diffSum += Math.abs(this.lastPings[i] - this.lastPings[i - 1]);
        }
        return diffSum / (this.lastPings.length - 1);
    }

    static getInterferenceLevel(jitter: number): { label: string, color: string, description: string } {
        if (jitter < 2) return {
            label: 'Señal Limpia',
            color: 'emerald',
            description: 'Tu conexión es estable. No hay interferencias electromagnéticas significativas detectadas.'
        };
        if (jitter < 10) return {
            label: 'Interferencia Leve',
            color: 'yellow',
            description: 'Se detecta algo de ruido en la señal. Podría ser actividad normal o dispositivos Bluetooth cercanos.'
        };
        if (jitter < 30) return {
            label: 'Interferencia Alta',
            color: 'orange',
            description: 'Ruido electromagnético considerable detectado. Si el microondas está encendido, es posible que tenga fugas leves.'
        };
        return {
            label: 'FUGA CRÍTICA / RUIDO EXTREMO',
            color: 'red',
            description: 'Inestabilidad masiva en la señal. Si estás junto al microondas, apágalo: la protección RF podría estar degradada.'
        };
    }
}
