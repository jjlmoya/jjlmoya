import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "http://localhost:4321";
const PAGES_DIR = path.join(process.cwd(), "src/pages");

function getPages(dir: string, baseRoute: string = ""): string[] {
    const files = fs.readdirSync(dir);
    let pages: string[] = [];

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            pages = pages.concat(getPages(fullPath, `${baseRoute}/${file}`));
        } else if (file.endsWith(".astro") || file.endsWith(".md") || file.endsWith(".html")) {
            // Ignore dynamic routes (containing [) and hidden files
            if (file.includes("[") || file.startsWith("_") || file.startsWith(".")) return;

            let route = baseRoute;
            const name = path.parse(file).name;

            if (name !== "index") {
                route = `${route}/${name}`;
            }

            // Ensure trailing slash
            if (route === "") route = "/";
            else if (!route.endsWith("/")) route = `${route}/`;

            // Normalize double slashes
            route = route.replace(/\/+/g, "/");

            pages.push(route);
        }
    });

    return pages;
}

const pages = getPages(PAGES_DIR);
console.log(`Found ${pages.length} pages to test:`, pages);

describe("Page Availability Tests", () => {
    pages.forEach((path) => {
        it(`should load ${path} correctly`, async () => {
            const response = await fetch(`${BASE_URL}${path}`);

            // 404 page is a special case
            if (path === "/404/") {
                expect(response.status).toBe(404);
            } else {
                expect(response.status).toBe(200);
            }

            const text = await response.text();

            // Check for common elements
            // 1. Header is present (contains "jjlmoya")
            expect(text).toContain("jjlmoya");

            // 2. Footer is present (contains current year)
            const year = new Date().getFullYear().toString();
            expect(text).toContain(year);

            // 3. HTML structure is valid
            // Check for <html tag (case insensitive by converting text to lower case)
            expect(text.toLowerCase()).toContain("<html");
            expect(text).toContain("</html>");
        });
    });
});
