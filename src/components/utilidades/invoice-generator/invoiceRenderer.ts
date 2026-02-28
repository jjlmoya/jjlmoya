import { invoiceItems, saveInvoiceState, removeInvoiceItem } from "./invoiceStore";
import { formatMoney, parseNumber, updateRowTotal, calculateTotalsUI } from "./invoiceMath";

export const renderInvoiceRows = () => {
    const tbody = document.getElementById("interactive-items-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    invoiceItems.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.className = "group hover:bg-slate-50 transition-colors";
        tr.innerHTML = `
            <td class="w-full pl-0 py-3 border-b border-slate-100">
                <div class="editable item-desc empty:before:content-['Añadir_descripción...'] outline-none min-w-[200px]" 
                     contenteditable="true" spellcheck="false" data-idx="${index}">${item.desc}</div>
            </td>
            <td class="text-right py-3 border-b border-slate-100 whitespace-nowrap">
                <input type="number" class="seamless-number int-qty text-right w-16" data-idx="${index}" value="${item.qty}" min="0" step="0.5" />
            </td>
            <td class="text-right py-3 border-b border-slate-100 whitespace-nowrap pr-0">
                <input type="number" class="seamless-number int-prc text-right w-24" data-idx="${index}" value="${item.price}" min="0" step="1" />
            </td>
            <td class="text-right py-3 border-b border-slate-100 whitespace-nowrap pr-0 font-medium text-slate-800">
                <span class="row-total">${formatMoney(item.qty * item.price)}</span>
            </td>
            <td class="text-right py-3 border-b border-slate-100 pl-4 no-print text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" class="text-slate-300 hover:text-rose-500 transition-colors del-row focus:opacity-100" data-idx="${index}" title="Eliminar fila">✕</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    attachRowListeners(tbody);
    calculateTotalsUI();
};

const attachRowListeners = (tbody: HTMLElement) => {
    tbody.querySelectorAll(".item-desc").forEach((el) => {
        el.addEventListener("input", (e) => {
            const target = e.target as HTMLElement;
            invoiceItems[parseInt(target.dataset.idx || "0")].desc = target.innerHTML || "";
            saveInvoiceState();
        });
    });

    const bindInput = (selector: string, field: "qty" | "price") => {
        tbody.querySelectorAll(selector).forEach((el) => {
            el.addEventListener("input", (e) => {
                const target = e.target as HTMLInputElement;
                const idx = parseInt(target.dataset.idx || "0");
                invoiceItems[idx][field] = parseNumber(target.value);
                calculateTotalsUI();
                updateRowTotal(target, idx);
                saveInvoiceState();
            });
        });
    };

    bindInput(".int-qty", "qty");
    bindInput(".int-prc", "price");

    tbody.querySelectorAll(".del-row").forEach((el) => {
        el.addEventListener("click", (e) => {
            removeInvoiceItem(parseInt((e.target as HTMLElement).dataset.idx || "0"));
            renderInvoiceRows();
            saveInvoiceState();
        });
    });
};
