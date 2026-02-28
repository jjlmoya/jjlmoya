import { loadInvoiceState, saveInvoiceState, addInvoiceItem, invoiceItems } from "./invoiceStore";
import { calculateTotalsUI } from "./invoiceMath";
import { renderInvoiceRows } from "./invoiceRenderer";

export function initInvoiceGenerator() {
    const tbody = document.getElementById("interactive-items-body");
    const btnAddRow = document.getElementById("btn-add-row");
    const taxInput = document.getElementById("tax-input") as HTMLInputElement;
    const retInput = document.getElementById("ret-input") as HTMLInputElement;
    const currSelect = document.getElementById("inv-currency") as HTMLSelectElement;
    const printBtn = document.getElementById("btn-print-invoice");

    if (!tbody || !btnAddRow || !taxInput || !retInput || !currSelect) return;

    const setupEditables = () => {
        document.querySelectorAll(".editable").forEach((el) => {
            el.addEventListener("input", (e: Event) => {
                const target = e.currentTarget as HTMLElement;
                if (target.textContent?.trim() === "") target.classList.add("empty");
                else target.classList.remove("empty");

                if (!target.classList.contains("item-desc")) saveInvoiceState();
            });

            if (!el.classList.contains("whitespace-pre-wrap")) {
                el.addEventListener("keydown", (e: Event) => {
                    const kEvent = e as KeyboardEvent;
                    if (kEvent.key === "Enter") {
                        kEvent.preventDefault();
                        (kEvent.currentTarget as HTMLElement).blur();
                    }
                });
            }
        });
    };

    setupEditables();

    btnAddRow.addEventListener("click", () => {
        addInvoiceItem();
        renderInvoiceRows();
        saveInvoiceState();
        setTimeout(() => {
            (tbody.querySelector(`[data-idx="${invoiceItems.length - 1}"]`) as HTMLElement)?.focus();
        }, 50);
    });

    const triggerUpdate = () => { calculateTotalsUI(); saveInvoiceState(); };
    taxInput.addEventListener("input", triggerUpdate);
    retInput.addEventListener("input", triggerUpdate);

    currSelect.addEventListener("change", () => {
        document.querySelectorAll(".out-currency").forEach(el => el.textContent = currSelect.value);
        saveInvoiceState();
    });

    printBtn?.addEventListener("click", () => window.print());

    loadInvoiceState();

    const dateInput = document.getElementById("inv-date-input") as HTMLInputElement;
    if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();

    document.querySelectorAll(".item-desc").forEach((el) => {
        if (el.textContent?.trim() === "") el.classList.add("empty");
        else el.classList.remove("empty");
    });

    renderInvoiceRows();
}
