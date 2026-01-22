export interface LLMModel {
    id: string;
    name: string;
    input: number;
    output: number;
    group: string;
    description: string;
}

export const models: LLMModel[] = [
    {
        id: "gpt-5.2-pro",
        name: "GPT-5.2 Pro",
        input: 21.0,
        output: 168.0,
        group: "OpenAI",
        description: "Máxima capacidad de razonamiento y creatividad.",
    },
    {
        id: "gpt-5.2",
        name: "GPT-5.2",
        input: 1.75,
        output: 14.0,
        group: "OpenAI",
        description: "Equilibrio perfecto entre inteligencia y velocidad.",
    },
    {
        id: "gpt-5-mini",
        name: "GPT-5 Mini",
        input: 0.25,
        output: 2.0,
        group: "OpenAI",
        description: "Ideal para tareas cotidianas y asistentes rápidos.",
    },
    {
        id: "gpt-5-nano",
        name: "GPT-5 Nano",
        input: 0.05,
        output: 0.4,
        group: "OpenAI",
        description: "Eficiencia extrema para tareas masivas.",
    },
    {
        id: "gemini-3-pro",
        name: "Gemini 3 Pro",
        input: 2.0,
        output: 12.0,
        group: "Google",
        description: "Ventana de contexto ultra larga (hasta ~200k tokens).",
    },
    {
        id: "gemini-3-pro-hi",
        name: "Gemini 3 Pro High",
        input: 4.0,
        output: 18.0,
        group: "Google",
        description: "Variante optimizada para contextos superiores a 200k tokens.",
    },
    {
        id: "gemini-3-flash",
        name: "Gemini 3 Flash",
        input: 0.5,
        output: 3.0,
        group: "Google",
        description: "Velocidad de respuesta instantánea y multimodalidad.",
    },
    {
        id: "claude-opus-4.5",
        name: "Claude Opus 4.5",
        input: 5.0,
        output: 25.0,
        group: "Anthropic",
        description: "El modelo más inteligente para tareas complejas.",
    },
    {
        id: "claude-opus-4",
        name: "Claude Opus 4",
        input: 15.0,
        output: 75.0,
        group: "Anthropic",
        description: "Versión anterior con alta capacidad de comprensión.",
    },
    {
        id: "claude-sonnet-4.5",
        name: "Claude Sonnet 4.5",
        input: 3.0,
        output: 15.0,
        group: "Anthropic",
        description: "Rendimiento excepcional en codificación y redacción.",
    },
    {
        id: "claude-sonnet-4",
        name: "Claude Sonnet 4",
        input: 3.0,
        output: 15.0,
        group: "Anthropic",
        description: "Modelo equilibrado para empresas.",
    },
    {
        id: "claude-haiku-4.5",
        name: "Claude Haiku 4.5",
        input: 1.0,
        output: 5.0,
        group: "Anthropic",
        description: "Respuesta sub-segundo con inteligencia mejorada.",
    },
    {
        id: "deepseek-v3",
        name: "DeepSeek-V3",
        input: 0.14,
        output: 0.28,
        group: "DeepSeek",
        description: "Liderando el rendimiento en código open source.",
    },
    {
        id: "grok-4.1-fast",
        name: "Grok 4.1 Fast",
        input: 0.2,
        output: 0.5,
        group: "Groq",
        description: "Inferencia a la velocidad del rayo con hardware LPU.",
    },
];
