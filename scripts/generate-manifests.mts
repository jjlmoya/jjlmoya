import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const utilDir = path.join(rootDir, "public/utilidades");

function extractImageFromPage(pagePath: string): string | null {
    try {
        const content = fs.readFileSync(pagePath, "utf-8");
        const match = content.match(/image="([^"]+)"/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}

async function getImageDimensions(imagePath: string): Promise<string | null> {
    try {
        const fullPath = path.resolve(rootDir, `public${imagePath}`);
        const metadata = await sharp(fullPath).metadata();
        if (metadata.width && metadata.height) {
            return `${metadata.width}x${metadata.height}`;
        }
    } catch {
        return null;
    }
    return null;
}

// Parse dinámico - extraer todas las utilidades
async function generateManifests() {
    // Importar dinámicamente el módulo de utilidades (cross-platform file:// URL)
    const indexPath = path.resolve(rootDir, "src/data/utilities/index.ts");
    const fileUrl = pathToFileURL(indexPath).href;
    const { sections } = await import(fileUrl);

    // Crear directorio si no existe
    if (!fs.existsSync(utilDir)) {
        fs.mkdirSync(utilDir, { recursive: true });
    }

    let count = 0;

    for (const section of sections) {
        for (const utility of section.utilities) {
            const slug = utility.href
                .replace(/^\/utilidades\//, "")
                .replace(/\/$/, "");

            const pagePath = path.resolve(rootDir, `src/pages/utilidades/${slug}.astro`);
            const imageUrl = extractImageFromPage(pagePath) || `/images/utilities/${slug}.webp`;
            const imageSizes = await getImageDimensions(imageUrl) || "512x512";

            const manifest = {
                name: utility.title,
                short_name:
                    utility.title.length > 12
                        ? utility.title.substring(0, 12)
                        : utility.title,
                description: utility.description,
                start_url: utility.href,
                scope: utility.href,
                icons: [
                    {
                        src: imageUrl,
                        sizes: imageSizes,
                        type: "image/webp",
                        purpose: "any",
                    },
                ],
                theme_color: "#0f172a",
                background_color: "#0f172a",
                display: "standalone",
                orientation: "portrait",
            };

            const slugDir = path.join(utilDir, slug);
            if (!fs.existsSync(slugDir)) {
                fs.mkdirSync(slugDir, { recursive: true });
            }

            const manifestPath = path.join(slugDir, "manifest.json");
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
            count++;
        }
    }

    console.log(`✓ Generated ${count} manifest files`);
}

generateManifests().catch(console.error);
