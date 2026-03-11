import type { Browser } from "puppeteer";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIXTURES_DIR = path.resolve(__dirname, "./fixtures");
const DOWNLOADS_DIR = path.resolve(__dirname, "./downloads");
const SERVER_PORT = 4321;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;

const testCase = { path: "/utilidades/convertidor-jpg-a-webp/", file: "test.jpg", toExtension: "webp" };

async function setup() {
    if (!fs.existsSync(FIXTURES_DIR)) {
        fs.mkdirSync(FIXTURES_DIR, { recursive: true });
    }

    if (!fs.existsSync(DOWNLOADS_DIR)) {
        fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
    } else {
        const files = fs.readdirSync(DOWNLOADS_DIR);
        for (const file of files) {
            fs.unlinkSync(path.join(DOWNLOADS_DIR, file));
        }
    }

    await sharp({ create: { width: 100, height: 100, channels: 4, background: { r: 0, g: 255, b: 0, alpha: 1 } } })
        .jpeg()
        .toFile(path.join(FIXTURES_DIR, "test.jpg"));

    console.log("✓ Test fixture generado");
}

async function waitForServer(maxRetries = 30) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const res = await fetch(SERVER_URL);
            if (res.ok) {
                console.log("✓ Servidor disponible");
                return true;
            }
        } catch (e) { }
        process.stdout.write(".");
        await new Promise((r) => setTimeout(r, 1000));
    }
    throw new Error("El servidor no está disponible en " + SERVER_URL);
}

async function runDebug() {
    const puppeteer = await import("puppeteer");
    let browser: Browser | null = null;

    try {
        console.log("\n🔍 Debuggeando test.jpg → webp...\n");

        await setup();
        await waitForServer();

        browser = await puppeteer.default.launch({
            headless: false,  
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        page.on("console", (msg) => console.log("  [browser]", msg.text()));

        const client = await page.createCDPSession();
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: DOWNLOADS_DIR,
        });

        console.log("→ Navegando a", testCase.path);
        await page.goto(`${SERVER_URL}${testCase.path}`, { waitUntil: "networkidle0" });

        console.log("→ Buscando input");
        const inputUploadHandle = await page.$('input[type="file"]');
        if (!inputUploadHandle) {
            throw new Error("No se encontró input file");
        }

        const filePath = path.join(FIXTURES_DIR, testCase.file);
        console.log("→ Subiendo archivo", testCase.file);
        await inputUploadHandle.uploadFile(filePath);

        console.log("→ Esperando .converter-item");
        await page.waitForSelector('.converter-item', { timeout: 10000 });

        console.log("→ Esperando botón de descarga");
        const downloadBtn = await page.waitForSelector('.converter-item a.dl-btn', { timeout: 10000, visible: true });

        if (!downloadBtn) {
            throw new Error("No se encontró botón de descarga");
        }

        console.log("→ Haciendo clic en descargar");
        await downloadBtn.click();

        console.log("→ Esperando 5 segundos para descargar...");
        await new Promise((r) => setTimeout(r, 5000));

        const downloadedFiles = fs.readdirSync(DOWNLOADS_DIR);
        const expectedExt = `.${testCase.toExtension}`;
        const fileFound = downloadedFiles.some(f => f.toLowerCase().endsWith(expectedExt));

        console.log("→ Archivos en descargas:", downloadedFiles);
        console.log("→ Buscando extensión:", expectedExt);
        console.log("→ Archivo encontrado:", fileFound);

        if (fileFound) {
            console.log("\n✓ TEST PASÓ!");
        } else {
            console.log("\n✗ TEST FALLÓ - No se generó el archivo");
        }

        await page.close();
        process.exit(fileFound ? 0 : 1);
    } catch (e) {
        console.error("✗ Error:", e instanceof Error ? e.message : String(e));
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

runDebug();
