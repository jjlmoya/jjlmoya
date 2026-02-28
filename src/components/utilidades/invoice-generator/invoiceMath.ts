import { invoiceItems } from "./invoiceStore";

export function formatMoney(num: number): string {
    return num.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function parseNumber(str: string): number {
    const val = parseFloat(str) || 0;
    return val >= 0 ? val : 0;
}

export const updateRowTotal = (inputEl: HTMLElement, itemIdx: number) => {
    const row = inputEl.closest("tr");
    const totalEl = row?.querySelector(".row-total");
    const item = invoiceItems[itemIdx];
    if (totalEl && item) {
        totalEl.textContent = formatMoney(item.qty * item.price);
    }
};

export const calculateTotalsUI = () => {
    const taxInput = document.getElementById("tax-input") as HTMLInputElement;
    const retInput = document.getElementById("ret-input") as HTMLInputElement;
    if (!taxInput || !retInput) return;

    const subtotal = invoiceItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const taxPct = parseNumber(taxInput.value);
    const retPct = parseNumber(retInput.value);

    const taxVal = subtotal * (taxPct / 100);
    const retVal = subtotal * (retPct / 100);
    const total = subtotal + taxVal - retVal;

    const safeSet = (id: string, val: string) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    safeSet("out-subtotal", formatMoney(subtotal));
    safeSet("out-tax-val", formatMoney(taxVal));
    safeSet("out-ret-val", formatMoney(retVal));
    safeSet("out-total", formatMoney(total));

    taxInput.style.width = Math.max(2, taxInput.value.length + 0.5) + "ch";
    retInput.style.width = Math.max(2, retInput.value.length + 0.5) + "ch";
};
