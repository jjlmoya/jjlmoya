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
        id: "gpt-5.4-pro",
        name: "GPT-5.4 Pro",
        input: 30.0,
        output: 180.0,
        group: "OpenAI",
        description: "Razonamiento profundo con hardware especializado para tareas críticas.",
    },
    {
        id: "gpt-5.4-standard",
        name: "GPT-5.4 Standard",
        input: 2.50,
        output: 15.0,
        group: "OpenAI",
        description: "El estándar de oro en inteligencia para aplicaciones generales.",
    },
    {
        id: "gpt-5.2-reasoning",
        name: "GPT-5.2 Reasoning",
        input: 1.75,
        output: 14.0,
        group: "OpenAI",
        description: "Optimizado para lógica compleja y pensamiento estructurado.",
    },
    {
        id: "claude-4.6-opus",
        name: "Claude 4.6 Opus",
        input: 5.0,
        output: 25.0,
        group: "Anthropic",
        description: "Líder en matices lingüísticos y razonamiento ético complejo.",
    },
    {
        id: "claude-4.6-sonnet",
        name: "Claude 4.6 Sonnet",
        input: 3.0,
        output: 15.0,
        group: "Anthropic",
        description: "Velocidad y precisión técnica inigualables para desarrolladores.",
    },
    {
        id: "claude-4.6-haiku",
        name: "Claude 4.6 Haiku",
        input: 1.0,
        output: 5.0,
        group: "Anthropic",
        description: "Eficiencia sub-segundo para automatización masiva.",
    },
    {
        id: "gemini-3-pro",
        name: "Gemini 3 Pro",
        input: 2.0,
        output: 12.0,
        group: "Google",
        description: "Ventana de contexto multimodal de 2M+ tokens.",
    },
    {
        id: "gemini-3-flash",
        name: "Gemini 3 Flash",
        input: 0.1,
        output: 0.4,
        group: "Google",
        description: "Inferencia ultrarrápida al coste más bajo del mercado.",
    },
    {
        id: "llama-4-maverick",
        name: "Llama 4 Maverick (405B)",
        input: 0.15,
        output: 0.60,
        group: "Meta",
        description: "Potencia Open Source de grado empresarial.",
    },
    {
        id: "llama-4-scout",
        name: "Llama 4 Scout (70B)",
        input: 0.08,
        output: 0.30,
        group: "Meta",
        description: "Eficiencia balanceada para despliegues locales y API.",
    },
    {
        id: "deepseek-v4",
        name: "DeepSeek-V4",
        input: 0.10,
        output: 0.20,
        group: "DeepSeek",
        description: "Optimización extrema para codificación y matemáticas.",
    },
];
