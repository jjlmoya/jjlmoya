import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "http://localhost:4321";
const PAGES_DIR = path.join(process.cwd(), "src/pages");

const FORBIDDEN_IMAGES = [
    "favicon.png",
    "favicon.webp",
    "favicon.ico",
    "apple-touch-icon.png",
    "favicon-96x96.png",
];

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

describe("SEO: Verificación de Imágenes Open Graph", () => {
    pages.forEach((pagePath) => {
        if (pagePath === "/" || pagePath === "/404/") return;

        it(`La página "${pagePath}" debe tener una imagen OG personalizada (no el favicon)`, async () => {
            let response;
            try {
                response = await fetch(`${BASE_URL}${pagePath}`);
            } catch (e) {
                throw new Error(
                    `No se pudo conectar con ${BASE_URL}. ¿Está el servidor dev en marcha?`
                );
            }

            expect(
                response.status,
                `La página ${pagePath} devolvió un error ${response.status}`
            ).toBe(200);

            const text = await response.text();

            const ogImageMatch = text.match(/<meta property="og:image" content="([^"]+)"/);
            const twitterImageMatch = text.match(
                /<meta property="twitter:image" content="([^"]+)"/
            );

            expect(
                ogImageMatch,
                `CRÍTICO: La página "${pagePath}" NO tiene la etiqueta <meta property="og:image">`
            ).not.toBeNull();
            expect(
                twitterImageMatch,
                `CRÍTICO: La página "${pagePath}" NO tiene la etiqueta <meta property="twitter:image">`
            ).not.toBeNull();

            const ogImage = ogImageMatch![1].toLowerCase();
            const twitterImage = twitterImageMatch![1].toLowerCase();

            FORBIDDEN_IMAGES.forEach((forbidden) => {
                const isForbiddenOG = ogImage.endsWith(forbidden.toLowerCase());
                const isForbiddenTwitter = twitterImage.endsWith(forbidden.toLowerCase());

                expect(
                    isForbiddenOG,
                    `FALLO DE SEO: La etiqueta <meta property="og:image"> en "${pagePath}" usa un archivo prohibido ("${forbidden}"). CADA PÁGINA debe tener una imagen promocional dedicada.`
                ).toBe(false);

                expect(
                    isForbiddenTwitter,
                    `FALLO DE SEO: La etiqueta <meta property="twitter:image"> en "${pagePath}" usa un archivo prohibido ("${forbidden}"). CADA PÁGINA debe tener una imagen promocional dedicada.`
                ).toBe(false);
            });

            expect(
                ogImage.length,
                `La URL de la imagen OG en "${pagePath}" está vacía`
            ).toBeGreaterThan(10);
        });
    });
});
