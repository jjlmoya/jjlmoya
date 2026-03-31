import { calculate, type CalcResult, type Method } from './calculator';

export type Category = 'fruits' | 'geek' | 'sweets';

export interface PCState {
    method: Method;
    date: string;
    cycle: number;
    partner: boolean;
    analogyCat: Category;
    result: CalcResult | null;
}

const LS_KEY = 'pc_inputs_v1';

type Persisted = Pick<PCState, 'method' | 'date' | 'cycle' | 'partner' | 'analogyCat'>;

function loadFromStorage(): Partial<Persisted> {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

function saveToStorage(s: PCState) {
    try {
        const p: Persisted = { method: s.method, date: s.date, cycle: s.cycle, partner: s.partner, analogyCat: s.analogyCat };
        localStorage.setItem(LS_KEY, JSON.stringify(p));
    } catch { }
}

const saved = loadFromStorage();

const _state: PCState = {
    method: saved.method ?? 'fur',
    date: saved.date ?? '',
    cycle: saved.cycle ?? 28,
    partner: saved.partner ?? false,
    analogyCat: saved.analogyCat ?? 'fruits',
    result: null,
};

_state.result = calculate({ method: _state.method, date: _state.date, cycle: _state.cycle });


export function getState(): Readonly<PCState> {
    return { ..._state };
}

export function setState(patch: Partial<Omit<PCState, 'result'>>) {
    Object.assign(_state, patch);
    _state.result = calculate({ method: _state.method, date: _state.date, cycle: _state.cycle });
    saveToStorage(_state);
    document.dispatchEvent(new CustomEvent('pc:update', { detail: getState() }));
}

export function subscribe(handler: (s: Readonly<PCState>) => void): () => void {
    const listener = (e: Event) => handler((e as CustomEvent<PCState>).detail);
    document.addEventListener('pc:update', listener);
    return () => document.removeEventListener('pc:update', listener);
}
