import { TEXTILE_DATA, type TextileFiber } from "../../../../data/utilities/textiles";

export type Fiber = TextileFiber;

export const FIBER_DATA = TEXTILE_DATA;

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
            .filter(r => r.fiberId === 'viscose' || r.fiberId === 'modal')
            .reduce((acc, r) => acc + r.percentage, 0);

        const naturalBreathablePerc = composition
            .filter(r => r.fiberId === 'linen' || r.fiberId === 'cotton' || r.fiberId === 'hemp')
            .reduce((acc, r) => acc + r.percentage, 0);

        const nobleFiberPerc = composition
            .filter(r => FIBER_DATA[r.fiberId]?.isNoble)
            .reduce((acc, r) => acc + r.percentage, 0);

        const syntheticPerc = composition
            .filter(r => FIBER_DATA[r.fiberId]?.family === 'synthetic')
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
        // Check IDs directly from composition
        const has = (id: string) => composition.some(c => c.fiberId === id);
        const hasAny = (ids: string[]) => composition.some(c => ids.includes(c.fiberId));

        if (composition.length === 0) return '';

        if (hasAny(['silk', 'cashmere'])) {
            return 'MUY DELICADO: Lavar a mano en frío. No usar secadora. Evitar escurrir con fuerza.';
        }
        if (hasAny(['wool', 'alpaca', 'merino', 'mohair'])) {
            return 'LANAS / PELO NOBLE: Lavar en frío con programa especial. Secar en plano para evitar deformaciones. No usar secadora.';
        }
        if (has('linen')) {
            return 'LINO: Tiende a arrugarse mucho. Planchar ligeramente húmedo para mejores resultados.';
        }
        if (hasAny(['viscose', 'modal'])) {
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
