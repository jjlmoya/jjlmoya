import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { CATEGORIES, getAllRegisteredTools } from "../src/i18n/toolRegistry";

const IMAGES_DIR = path.resolve("public/images/utilities");
const CATEGORY_IMAGES_DIR = path.join(IMAGES_DIR, "category");

type ToolEntry = { entry: { i18n: Record<string, () => Promise<{ slug: string; title: string; description: string }>> } };

async function getAllToolsWithMeta() {
    const allTools = getAllRegisteredTools();
    return Promise.all(
        allTools.map(async ([tool, categoryKey]) => {
            const content = await (tool as ToolEntry).entry.i18n.es!();
            return { slug: content.slug, title: content.title, categoryKey };
        })
    );
}

async function getAllCategoriesWithMeta() {
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
    it.each(tools)("$slug — is lowercase with no spaces", ({ slug }) => {
        expect(slug).toBe(slug.toLowerCase());
        expect(slug).not.toMatch(/\s/);
    });

    it.each(tools)("$slug — has image in public/images/utilities/", ({ slug }) => {
        expect(fs.existsSync(path.join(IMAGES_DIR, `${slug}.webp`)), `Missing: ${slug}.webp`).toBe(true);
    });

    it("no duplicate tool slugs", () => {
        const slugs = tools.map(t => t.slug);
        const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
        expect(duplicates, `Duplicates: ${duplicates.join(", ")}`).toHaveLength(0);
    });
});

describe("Category slugs", () => {
    it.each(categories)("$slug — has image in public/images/utilities/category/", ({ slug }) => {
        expect(fs.existsSync(path.join(CATEGORY_IMAGES_DIR, `${slug}.webp`)), `Missing: ${slug}.webp`).toBe(true);
    });

    it("no duplicate category slugs", () => {
        const slugs = categories.map(c => c.slug);
        const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
        expect(duplicates, `Duplicates: ${duplicates.join(", ")}`).toHaveLength(0);
    });
});
