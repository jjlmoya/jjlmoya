import { describe, it, expect } from "vitest";
import { CATEGORIES, getAllRegisteredTools } from "../src/i18n/toolRegistry";

type ToolEntry = { entry: { i18n: Record<string, () => Promise<{ slug: string; title: string; description: string }>> } };
type ToolMeta = { slug: string; title: string; categoryKey: string };
type CategoryMeta = { slug: string; key: string };

async function getAllToolsWithMeta(): Promise<ToolMeta[]> {
    const allTools = await getAllRegisteredTools();
    return Promise.all(
        allTools.map(async ([tool, categoryKey]: [object, string]) => {
            const content = await (tool as ToolEntry).entry.i18n.es!();
            return { slug: content.slug, title: content.title, categoryKey };
        })
    );
}

async function getAllCategoriesWithMeta(): Promise<CategoryMeta[]> {
    return Promise.all(
        CATEGORIES.map(async (cat) => {
            const content = await cat.entry.i18n.es!();
            return { slug: content.slug, key: cat.key };
        })
    );
}

const tools = await getAllToolsWithMeta();
const categories = await getAllCategoriesWithMeta();

describe("Tool slugs", () => {
    it.each(tools)("$slug — is lowercase with no spaces", ({ slug }: ToolMeta) => {
        expect(slug).toBe(slug.toLowerCase());
        expect(slug).not.toMatch(/\s/);
    });

    it("no duplicate tool slugs", () => {
        const slugs = tools.map((t: ToolMeta) => t.slug);
        const duplicates = slugs.filter((s: string, i: number) => slugs.indexOf(s) !== i);
        expect(duplicates, `Duplicates: ${duplicates.join(", ")}`).toHaveLength(0);
    });
});

describe("Category slugs", () => {
    it("no duplicate category slugs", () => {
        const slugs = categories.map((c: CategoryMeta) => c.slug);
        const duplicates = slugs.filter((s: string, i: number) => slugs.indexOf(s) !== i);
        expect(duplicates, `Duplicates: ${duplicates.join(", ")}`).toHaveLength(0);
    });
});
