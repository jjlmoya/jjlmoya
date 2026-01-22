export function formatMoney(amount: number): string {
    const minimumFractionDigits = amount < 0.01 ? 6 : 4;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits,
    }).format(amount);
}

export function estimateWords(tokens: number): number {
    return Math.round(tokens * 0.75);
}

import type { LLMModel } from "./data";

export function calculateCost(model: LLMModel, inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens / 1_000_000) * model.input;
    const outputCost = (outputTokens / 1_000_000) * model.output;
    return inputCost + outputCost;
}
