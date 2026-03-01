export const STORAGE_KEY = "jjlmoya_prompts";

export type PromptItem = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    isStarred?: boolean;
};

export function loadPrompts(): PromptItem[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const parsed: PromptItem[] = data ? JSON.parse(data) : [];
        return parsed.sort((a, b) => {
            if (a.isStarred && !b.isStarred) return -1;
            if (!a.isStarred && b.isStarred) return 1;
            return 0;
        });
    } catch (e) {
        console.error("Error loading prompts", e);
        return [];
    }
}

export function savePrompts(items: PromptItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function deletePrompt(id: string): void {
    const items = loadPrompts();
    savePrompts(items.filter((p) => p.id !== id));
}

export function updatePrompt(id: string, updates: Partial<PromptItem>): void {
    const items = loadPrompts();
    const index = items.findIndex((p) => p.id === id);
    if (index !== -1) {
        items[index] = { ...items[index], ...updates };
        savePrompts(items);
    }
}

export function addPrompt(item: Omit<PromptItem, "id">): void {
    const items = loadPrompts();
    items.unshift({ ...item, id: crypto.randomUUID() });
    savePrompts(items);
}
