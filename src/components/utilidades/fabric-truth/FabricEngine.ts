export interface Fiber {
    id: string;
    name: string;
    type: 'natural' | 'semi-synthetic' | 'synthetic';
    breathability: number; 
    durability: number;    
    warmth: number;       
    isNoble: boolean;
}

export const FIBER_DATA: Record<string, Fiber> = {
    cotton: { id: 'cotton', name: 'Algodón', type: 'natural', breathability: 8, durability: 7, warmth: 4, isNoble: false },
    silk: { id: 'silk', name: 'Seda', type: 'natural', breathability: 9, durability: 4, warmth: 6, isNoble: true },
    wool: { id: 'wool', name: 'Lana (Genérica)', type: 'natural', breathability: 7, durability: 8, warmth: 9, isNoble: true },
    merino: { id: 'merino', name: 'Lana de Merino', type: 'natural', breathability: 8, durability: 7, warmth: 9, isNoble: true },
    linen: { id: 'linen', name: 'Lino', type: 'natural', breathability: 10, durability: 6, warmth: 2, isNoble: false },
    hemp: { id: 'hemp', name: 'Cáñamo', type: 'natural', breathability: 9, durability: 9, warmth: 3, isNoble: false },
    cashmere: { id: 'cashmere', name: 'Cachemira', type: 'natural', breathability: 8, durability: 3, warmth: 10, isNoble: true },
    alpaca: { id: 'alpaca', name: 'Alpaca', type: 'natural', breathability: 8, durability: 6, warmth: 10, isNoble: true },
    viscose: { id: 'viscose', name: 'Viscosa', type: 'semi-synthetic', breathability: 7, durability: 3, warmth: 4, isNoble: false },
    rayon: { id: 'rayon', name: 'Rayón', type: 'semi-synthetic', breathability: 7, durability: 3, warmth: 4, isNoble: false },
    modal: { id: 'modal', name: 'Modal', type: 'semi-synthetic', breathability: 8, durability: 4, warmth: 4, isNoble: false },
    lyocell: { id: 'lyocell', name: 'Lyocell', type: 'semi-synthetic', breathability: 8, durability: 5, warmth: 4, isNoble: false },
    polyester: { id: 'polyester', name: 'Poliéster', type: 'synthetic', breathability: 2, durability: 9, warmth: 5, isNoble: false },
    acrylic: { id: 'acrylic', name: 'Acrílico', type: 'synthetic', breathability: 3, durability: 6, warmth: 8, isNoble: false },
    nylon: { id: 'nylon', name: 'Nailon', type: 'synthetic', breathability: 4, durability: 10, warmth: 4, isNoble: false },
    polyamide: { id: 'polyamide', name: 'Poliamida', type: 'synthetic', breathability: 4, durability: 10, warmth: 4, isNoble: false },
    elastane: { id: 'elastane', name: 'Elastano', type: 'synthetic', breathability: 3, durability: 7, warmth: 2, isNoble: false },
};

export interface CompositionRow {
    fiberId: string;
    percentage: number;
}

export interface Verdict {
    label: string;
    description: string;
    color: string; 
    intensity: number; 
}

export class FabricEngine {
    static calculateVerdict(composition: CompositionRow[]): Verdict {
        const totalPercentage = composition.reduce((acc, row) => acc + row.percentage, 0);
        if (totalPercentage === 0) return { label: 'Esperando datos', description: 'Introduce la composición para analizar.', color: 'gray', intensity: 0 };

        const polyAcrylicPerc = composition
            .filter(r => r.fiberId === 'polyester' || r.fiberId === 'acrylic')
            .reduce((acc, r) => acc + r.percentage, 0);

        const viscoseModalPerc = composition
            .filter(r => r.fiberId === 'viscose' || r.fiberId === 'modal' || r.fiberId === 'rayon')
            .reduce((acc, r) => acc + r.percentage, 0);

        const naturalBreathablePerc = composition
            .filter(r => r.fiberId === 'linen' || r.fiberId === 'cotton' || r.fiberId === 'hemp')
            .reduce((acc, r) => acc + r.percentage, 0);

        const nobleFiberPerc = composition
            .filter(r => FIBER_DATA[r.fiberId]?.isNoble)
            .reduce((acc, r) => acc + r.percentage, 0);

        const syntheticPerc = composition
            .filter(r => FIBER_DATA[r.fiberId]?.type === 'synthetic')
            .reduce((acc, r) => acc + r.percentage, 0);

        
        if (polyAcrylicPerc > 50) {
            return {
                label: 'Plástico Caro',
                description: 'La mayoría de esta prenda es petróleo. Prepárate para sudar y que aparezcan bolitas rápido.',
                color: 'red',
                intensity: polyAcrylicPerc / 100
            };
        }

        if (nobleFiberPerc > 0 && nobleFiberPerc < 10) {
            return {
                label: 'Gancho de Marketing',
                description: `Ese ${nobleFiberPerc}% de fibra noble está ahí solo para ponerlo en la etiqueta. No notarás sus beneficios.`,
                color: 'amber',
                intensity: 0.8
            };
        }

        if (viscoseModalPerc > 30) {
            return {
                label: 'Suave pero Frágil',
                description: 'Muy agradable al tacto, pero cuidado al lavarla: tiende a deformarse y encoger con facilidad.',
                color: 'yellow',
                intensity: viscoseModalPerc / 100
            };
        }

        if (naturalBreathablePerc > 70) {
            return {
                label: 'Calidad Natural',
                description: 'Prenda transpirable y duradera. Ideal para pieles sensibles y uso prolongado.',
                color: 'emerald',
                intensity: naturalBreathablePerc / 100
            };
        }

        if (syntheticPerc > 80) {
            return {
                label: 'Prenda Técnica / Ultra-Sintética',
                description: 'A menos que sea ropa de deporte específica, estás pagando por plástico puro.',
                color: 'red',
                intensity: syntheticPerc / 100
            };
        }

        if (nobleFiberPerc >= 50) {
            return {
                label: 'Lujo Real',
                description: 'Una inversión en comodidad y durabilidad. Trátala con el respeto que merece.',
                color: 'indigo',
                intensity: nobleFiberPerc / 100
            };
        }

        return {
            label: 'Mezcla Equilibrada',
            description: 'Una combinación funcional, probablemente busca balancear coste y durabilidad.',
            color: 'blue',
            intensity: 0.5
        };
    }

    static getCareWarning(composition: CompositionRow[]): string {
        const fibers = composition.map(c => FIBER_DATA[c.fiberId]).filter(Boolean);
        if (fibers.length === 0) return '';

        
        if (fibers.some(f => f.id === 'silk' || f.id === 'cashmere')) {
            return 'MUY DELICADO: Lavar a mano en frío. No usar secadora. Evitar escurrir con fuerza.';
        }
        if (fibers.some(f => f.id === 'wool' || f.id === 'alpaca' || f.id === 'merino')) {
            return 'LANAS: Lavar en frío con programa especial. Secar en plano para evitar deformaciones.';
        }
        if (fibers.some(f => f.id === 'linen')) {
            return 'LINO: Tiende a arrugarse mucho. Planchar ligeramente húmedo para mejores resultados.';
        }
        if (fibers.some(f => f.id === 'viscose' || f.id === 'modal')) {
            return 'SEMISINTÉTICOS: Se debilita en mojado. Tratar con cuidado y no centrifugar fuerte.';
        }
        return 'LAVADO ESTÁNDAR: Sigue siempre las instrucciones de la etiqueta física.';
    }

    static getAverages(composition: CompositionRow[]) {
        let b = 0, d = 0, w = 0;
        let total = 0;
        composition.forEach(r => {
            const f = FIBER_DATA[r.fiberId];
            if (f) {
                b += f.breathability * r.percentage;
                d += f.durability * r.percentage;
                w += f.warmth * r.percentage;
                total += r.percentage;
            }
        });
        if (total === 0) return { b: 0, d: 0, w: 0 };
        return { b: b / total, d: d / total, w: w / total };
    }
}
