import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { sections } from "../src/data/utilities/index";

const UTILITIES_PAGES_DIR = path.join(process.cwd(), "src/pages/utilidades");

function getUtilityRoutes(): string[] {
    if (!fs.existsSync(UTILITIES_PAGES_DIR)) return [];

    const files = fs.readdirSync(UTILITIES_PAGES_DIR);
    return files
        .filter(file => file.endsWith(".astro") && file !== "index.astro")
        .map(file => {
            const name = file.replace(".astro", "");
            return `/utilidades/${name}/`;
        });
}

describe("Utility Category Integrity Tests", () => {
    const utilityRoutes = getUtilityRoutes();
    const allRegisteredUtilities = sections.flatMap(s => s.utilities);
    const registeredHrefs = allRegisteredUtilities.map(u => u.href);

    it("should ensure every utility page is registered in a category", () => {
        utilityRoutes.forEach(route => {
            const isRegistered = registeredHrefs.includes(route);
            expect(isRegistered, `Utility page "${route}" is not registered in any category in src/data/utilities/`).toBe(true);
        });
    });

    it("should ensure every utility is registered in exactly one category", () => {
        const hrefCounts = new Map<string, number>();

        sections.forEach(section => {
            section.utilities.forEach(utility => {
                const count = hrefCounts.get(utility.href) || 0;
                hrefCounts.set(utility.href, count + 1);
            });
        });

        hrefCounts.forEach((count, href) => {
            expect(count, `Utility "${href}" is registered in ${count} categories (must be exactly 1)`).toBe(1);
        });
    });

    it("should ensure no category is empty", () => {
        sections.forEach(section => {
            expect(section.utilities.length, `Category "${section.title}" has no utilities`).toBeGreaterThan(0);
        });
    });
});
