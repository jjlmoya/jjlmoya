
type ParsedLine = {
    original: string;
    amount: number | null;
    unit: string | null;
    ingredient: string;
    prefix: string; 
};


const NUMBER_REGEX = /(\d+[\.,]\d+|\d+\/\d+|\d+)/;

function parseLine(line: string): ParsedLine {
    
    const cleanLine = line.trim();
    if (!cleanLine)
        return { original: line, amount: null, unit: null, ingredient: "", prefix: "" };

    const match = cleanLine.match(NUMBER_REGEX);

    if (!match) {
        return { original: line, amount: null, unit: null, ingredient: cleanLine, prefix: "" };
    }

    const numberStr = match[0];
    const index = match.index || 0;

    const prefix = cleanLine.substring(0, index);
    const rest = cleanLine.substring(index + numberStr.length); 

    let amount = 0;
    if (numberStr.includes("/")) {
        const [num, den] = numberStr.split("/");
        if (parseFloat(den) !== 0) {
            amount = parseFloat(num) / parseFloat(den);
        } else {
            amount = parseFloat(num);
        }
    } else {
        amount = parseFloat(numberStr.replace(",", "."));
    }

    return {
        original: line,
        amount: amount,
        unit: null,
        ingredient: rest,
        prefix: prefix,
    };
}

function formatAmount(amount: number): string {
    if (Number.isInteger(amount)) return amount.toString();
    const rounded = Math.round(amount * 100) / 100;
    return rounded.toString().replace(".", ",");
}

export function initRescaler() {
    
    const originalInput = document.getElementById("original-servings") as HTMLInputElement;
    const targetInput = document.getElementById("target-servings") as HTMLInputElement;
    const ingredientsInput = document.getElementById("ingredients-input") as HTMLTextAreaElement;
    const multiplierDisplay = document.getElementById("multiplier-display") as HTMLSpanElement;
    const resultsContainer = document.getElementById("results-container") as HTMLDivElement;
    const copyBtn = document.getElementById("copy-btn") as HTMLButtonElement;

    if (!originalInput || !targetInput || !ingredientsInput || !multiplierDisplay || !resultsContainer || !copyBtn) return;

    function update() {
        const original = parseFloat(originalInput.value) || 1;
        const target = parseFloat(targetInput.value) || 1;

        let ratio = 1;
        if (original > 0) {
            ratio = target / original;
        }

        
        multiplierDisplay.textContent = `${ratio.toFixed(2).replace(".", ",")}x`;

        
        const text = ingredientsInput.value;
        const lines = text.split("\n");

        resultsContainer.innerHTML = "";

        if (!text.trim()) {
            resultsContainer.innerHTML =
                '<div class="h-full flex flex-col items-center justify-center text-gray-500 space-y-4 opacity-50"><span class="icon-[mdi--pot-steam] text-4xl"></span><p>Tus ingredientes ajustados aparecerán aquí...</p></div>';
            return;
        }

        lines.forEach((line) => {
            const parsed = parseLine(line);

            if (parsed.amount !== null) {
                const newAmount = parsed.amount * ratio;
                const formatted = formatAmount(newAmount);

                const row = document.createElement('div');
                row.className = "flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border-l-4 border-transparent hover:border-orange-500";
                row.innerHTML = `
                    <span class="text-gray-400 dark:text-gray-500 text-xs truncate max-w-[30%] line-through opacity-75">${parsed.original}</span>
                    <span class="text-gray-900 dark:text-gray-100 font-medium">
                        ${parsed.prefix}<span class="text-orange-600 dark:text-orange-400 font-bold text-lg">${formatted}</span>${parsed.ingredient}
                    </span>
                 `;
                resultsContainer.appendChild(row);
            } else if (line.trim()) {
                const row = document.createElement('div');
                row.className = "text-gray-500 dark:text-gray-400 italic text-sm p-2 bg-transparent";
                row.textContent = line;
                resultsContainer.appendChild(row);
            }
        });
    }

    
    originalInput.addEventListener('input', update);
    targetInput.addEventListener('input', update);
    ingredientsInput.addEventListener('input', update);

    
    if (!ingredientsInput.value.trim()) {
        ingredientsInput.value = "200g Harina\n100ml Leche\n2 Huevos";
        update();
    }


    
    copyBtn.addEventListener('click', () => {
        const lines: string[] = [];
        const original = parseFloat(originalInput.value) || 1;
        const target = parseFloat(targetInput.value) || 1;
        const ratio = (original > 0) ? target / original : 1;
        const text = ingredientsInput.value;

        text.split('\n').forEach(line => {
            const parsed = parseLine(line);
            if (parsed.amount !== null) {
                const newAmount = parsed.amount * ratio;
                lines.push(`${parsed.prefix}${formatAmount(newAmount)}${parsed.ingredient}`);
            } else {
                lines.push(line);
            }
        });

        navigator.clipboard.writeText(lines.join('\n')).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span class="icon-[mdi--check]"></span> Copiado!';
            copyBtn.classList.add('bg-green-600', 'text-white', 'hover:bg-green-700');
            copyBtn.classList.remove('bg-gray-700', 'hover:bg-gray-600');
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('bg-green-600', 'text-white', 'hover:bg-green-700');
                copyBtn.classList.add('bg-gray-700', 'hover:bg-gray-600');
            }, 2000);
        });
    });
}
