import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { sections } from "../src/data/utilities/index";

const CATEGORIES_PAGES_DIR = path.join(process.cwd(), "src/pages/utilidades/categorias");

function getCategoryPageSlugs(): string[] {
    if (!fs.existsSync(CATEGORIES_PAGES_DIR)) return [];

    const files = fs.readdirSync(CATEGORIES_PAGES_DIR);
    return files
        .filter(file => file.endsWith(".astro"))
        .map(file => file.replace(".astro", ""));
}

function titleToSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, "-");
}

describe("Category Pages Integrity Tests", () => {
    const categoryPageSlugs = getCategoryPageSlugs();
    const allCategories = sections.map(section => ({
        title: section.title,
        slug: section.slug || titleToSlug(section.title),
    }));

    it("should ensure every category has a page in src/pages/utilidades/categorias/", () => {
        const missingCategories = allCategories.filter(
            category => !categoryPageSlugs.includes(category.slug)
        );

        if (missingCategories.length > 0) {
            const missingList = missingCategories
                .map(cat => `"${cat.title}" (expected: ${cat.slug}.astro)`)
                .join("\n  ");
            expect.fail(
                `Missing category pages:\n  ${missingList}`
            );
        }
    });

    it("should ensure all category pages are registered categories", () => {
        const registeredSlugs = allCategories.map(cat => cat.slug);

        const unknownPages = categoryPageSlugs.filter(
            slug => !registeredSlugs.includes(slug)
        );

        if (unknownPages.length > 0) {
            const unknownList = unknownPages
                .map(slug => `${slug}.astro (not found in sections)`)
                .join("\n  ");
            expect.fail(
                `Unknown category pages:\n  ${unknownList}`
            );
        }
    });

    it("should list all missing category pages for quick reference", () => {
        const missingCategories = allCategories.filter(
            category => !categoryPageSlugs.includes(category.slug)
        );

        const existingCategories = allCategories.filter(
            category => categoryPageSlugs.includes(category.slug)
        );

        if (existingCategories.length > 0) {
            console.log("✓ Existing category pages:");
            existingCategories.forEach(cat => {
                console.log(`  ✓ [${cat.title}](src/pages/utilidades/categorias/${cat.slug}.astro) `);
            });
        }

        if (missingCategories.length > 0) {
            console.log("\n✗ Missing category pages that need to be created:");
            missingCategories.forEach(cat => {
                console.log(`  - src/pages/utilidades/categorias/${cat.slug}.astro (${cat.title})`);
            });
        }

        expect(missingCategories.length).toBe(0);
    });
});
