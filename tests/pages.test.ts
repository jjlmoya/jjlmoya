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
            if (file.includes("[") || file.startsWith("_") || file.startsWith(".")) return;

            let route = baseRoute;
            const name = path.parse(file).name;

            if (name !== "index") {
                route = `${route}/${name}`;
            }

            if (route === "") route = "/";
            else if (!route.endsWith("/")) route = `${route}/`;

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

            if (path === "/404/") {
                expect([200, 404]).toContain(response.status);
            } else {
                expect(response.status).toBe(200);
            }

            const text = await response.text();

            expect(text).toContain("jjlmoya");

            expect(text.toLowerCase()).toContain("<html");
            expect(text).toContain("</html>");
        });
    });
});
