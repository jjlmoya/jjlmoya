import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const UTILITIES_PAGES_DIR = path.join(process.cwd(), "src/pages/utilidades");

function getAstroFiles(dir: string): string[] {
    const files = fs.readdirSync(dir);
    let astroFiles: string[] = [];

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            astroFiles = astroFiles.concat(getAstroFiles(fullPath));
        } else if (file.endsWith(".astro")) {
            if (!file.startsWith("_")) {
                astroFiles.push(fullPath);
            }
        }
    });

    return astroFiles;
}

const filesToTest = getAstroFiles(UTILITIES_PAGES_DIR);

describe("Prerender Configuration Tests", () => {
    filesToTest.forEach((filePath) => {
        const relativePath = path.relative(process.cwd(), filePath);

        it(`File ${relativePath} should have 'export const prerender = true;'`, () => {
            const content = fs.readFileSync(filePath, "utf-8");

            expect(content).toContain("export const prerender = true;");
        });
    });
});
