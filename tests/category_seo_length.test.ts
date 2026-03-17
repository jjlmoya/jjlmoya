import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const CATEGORIES_PAGES_DIR = path.join(process.cwd(), "src/pages/utilidades/categorias");

function getCategoryFiles(): string[] {
    if (!fs.existsSync(CATEGORIES_PAGES_DIR)) return [];
    return fs.readdirSync(CATEGORIES_PAGES_DIR).filter(file => file.endsWith(".astro"));
}

function countWords(text: string): number {
    return text
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .filter(word => word.length > 0)
        .length;
}

describe("Category SEO Length Tests", () => {
    const files = getCategoryFiles();

    it("should ensure all category pages have more than 800 words in SEO slot", () => {
        const failures: string[] = [];
        const results: { file: string; words: number }[] = [];

        files.forEach(file => {
            const filePath = path.join(CATEGORIES_PAGES_DIR, file);
            const content = fs.readFileSync(filePath, "utf-8");
            
            const seoMatch = content.match(/<div slot="seo">([\s\S]*?)<\/div>\s*<\/LayoutUtilityCategory>/i);
            
            if (!seoMatch) {
                failures.push(`${file}: No <div slot="seo"> block found.`);
                return;
            }

            const seoText = seoMatch[1];
            const wordCount = countWords(seoText);
            
            results.push({ file, words: wordCount });

            if (wordCount < 800) {
                failures.push(`${file}: Has only ${wordCount} words (minimum 800 required).`);
            }
        });

        if (results.length > 0) {
            console.log("\n--- Category SEO Word Counts ---");
            results.sort((a, b) => b.words - a.words).forEach(res => {
                const status = res.words >= 800 ? "✓" : "✗";
                console.log(`${status} ${res.file.padEnd(30)} : ${res.words} words`);
            });
            console.log("--------------------------------\n");
        }

        if (failures.length > 0) {
            expect.fail(`SEO content length validation failed:\n  ${failures.join("\n  ")}`);
        }
    });
});
