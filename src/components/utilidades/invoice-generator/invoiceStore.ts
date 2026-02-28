export interface InvoiceItem {
    id: number;
    desc: string;
    qty: number;
    price: number;
}

export const invoiceItems: InvoiceItem[] = [
    { id: 1, desc: "Servicio de desarrollo", qty: 1, price: 1500 },
];
export let nextItemId = 2;

const EDITABLE_KEY = "jjlmoya_invoice_editables";
const CONFIG_KEY = "jjlmoya_invoice_config";

export const getStaticEditables = () => Array.from(document.querySelectorAll(".editable:not(.item-desc)"));

export const saveInvoiceState = () => {
    const editables = getStaticEditables().map(el => (el as HTMLElement).innerHTML);
    const taxInput = document.getElementById("tax-input") as HTMLInputElement;
    const retInput = document.getElementById("ret-input") as HTMLInputElement;
    const currSelect = document.getElementById("inv-currency") as HTMLSelectElement;

    const config = { tax: taxInput?.value, ret: retInput?.value, currency: currSelect?.value, items: invoiceItems };
    localStorage.setItem(EDITABLE_KEY, JSON.stringify(editables));
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
};

export const loadInvoiceState = () => {
    try {
        const storedEdits = localStorage.getItem(EDITABLE_KEY);
        if (storedEdits) {
            const editables = JSON.parse(storedEdits);
            getStaticEditables().forEach((el, i) => {
                if (editables[i] !== undefined) {
                    (el as HTMLElement).innerHTML = editables[i];
                    if ((el as HTMLElement).textContent?.trim() !== "") el.classList.remove("empty");
                    else el.classList.add("empty");
                }
            });
        }

        const storedCnf = localStorage.getItem(CONFIG_KEY);
        if (storedCnf) {
            const config = JSON.parse(storedCnf);
            const taxInput = document.getElementById("tax-input") as HTMLInputElement;
            const retInput = document.getElementById("ret-input") as HTMLInputElement;
            const currSelect = document.getElementById("inv-currency") as HTMLSelectElement;

            if (config.tax !== undefined && taxInput) taxInput.value = config.tax;
            if (config.ret !== undefined && retInput) retInput.value = config.ret;
            if (config.currency !== undefined && currSelect) {
                currSelect.value = config.currency;
                document.querySelectorAll(".out-currency").forEach(el => el.textContent = config.currency);
            }
            if (config.items && Array.isArray(config.items) && config.items.length > 0) {
                invoiceItems.length = 0;
                invoiceItems.push(...config.items);
                nextItemId = Math.max(...invoiceItems.map(i => i.id)) + 1;
            }
        }
    } catch (e) {
        console.error("Error loading invoice storage", e);
    }
};

export const addInvoiceItem = () => {
    invoiceItems.push({ id: nextItemId++, desc: "", qty: 1, price: 0 });
};

export const removeInvoiceItem = (index: number) => {
    invoiceItems.splice(index, 1);
};
