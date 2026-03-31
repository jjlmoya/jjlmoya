interface LMSData {
    L: number;
    M: number;
    S: number;
}

export type TableSet = Record<number, LMSData>;

export interface GenderData {
    weight: TableSet;
    height: TableSet;
    bmi: TableSet;
}

export const boys: GenderData = {
    weight: {
        0: { L: 0.3487, M: 3.3464, S: 0.14602 },
        3: { L: 0.053, M: 6.3912, S: 0.11899 },
        6: { L: -0.0939, M: 7.8978, S: 0.11218 },
        12: { L: -0.2285, M: 9.6483, S: 0.10955 },
        24: { L: -0.3204, M: 12.152, S: 0.11299 },
        36: { L: -0.3475, M: 14.2858, S: 0.1172 },
        48: { L: -0.3667, M: 16.32, S: 0.12188 },
        60: { L: -0.3807, M: 18.28, S: 0.12643 }
    },
    height: {
        0: { L: 1.0, M: 49.88, S: 0.03795 },
        6: { L: 1.0, M: 67.6, S: 0.03544 },
        12: { L: 1.0, M: 75.7, S: 0.03478 },
        24: { L: 1.0, M: 87.8, S: 0.03487 },
        60: { L: 1.0, M: 110.0, S: 0.0377 }
    },
    bmi: {
        0: { L: -1.025, M: 13.409, S: 0.0911 },
        6: { L: -1.821, M: 17.311, S: 0.0827 },
        12: { L: -1.988, M: 16.837, S: 0.0818 },
        24: { L: -2.008, M: 15.772, S: 0.0815 },
        60: { L: -1.968, M: 15.11, S: 0.083 }
    }
};

export const girls: GenderData = {
    weight: {
        0: { L: 0.1704, M: 3.2322, S: 0.14171 },
        6: { L: -0.1601, M: 7.298, S: 0.11863 },
        12: { L: -0.3259, M: 8.948, S: 0.11812 },
        60: { L: -0.5235, M: 18.232, S: 0.13845 }
    },
    height: {
        0: { L: 1.0, M: 49.15, S: 0.03816 },
        12: { L: 1.0, M: 74.0, S: 0.03603 },
        60: { L: 1.0, M: 109.4, S: 0.04018 }
    },
    bmi: {
        0: { L: -0.63, M: 13.31, S: 0.090 },
        12: { L: -1.5, M: 16.35, S: 0.085 },
        60: { L: -1.9, M: 15.2, S: 0.087 }
    }
};

export function interpolateLMS(month: number, data: TableSet): LMSData {
    const keys = Object.keys(data).map(Number).sort((a, b) => a - b);
    if (month <= keys[0]) return data[keys[0]];
    if (month >= keys[keys.length - 1]) return data[keys[keys.length - 1]];

    for (let i = 0; i < keys.length - 1; i++) {
        const t1 = keys[i];
        const t2 = keys[i + 1];
        if (month >= t1 && month <= t2) {
            const p = (month - t1) / (t2 - t1);
            const l1 = data[t1];
            const l2 = data[t2];
            return {
                L: l1.L + p * (l2.L - l1.L),
                M: l1.M + p * (l2.M - l1.M),
                S: l1.S + p * (l2.S - l1.S)
            };
        }
    }
    return data[keys[0]];
}
