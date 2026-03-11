import type { Browser, Page } from "puppeteer";
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


const CONVERTERS = [
    { path: "/utilidades/convertidor-png-a-jpg/", file: "test.png", toExtension: "jpg" },
    { path: "/utilidades/convertidor-jpg-a-png/", file: "test.jpg", toExtension: "png" },
    { path: "/utilidades/convertidor-webp-a-png/", file: "test.webp", toExtension: "png" },
    { path: "/utilidades/convertidor-webp-a-jpg/", file: "test.webp", toExtension: "jpg" },
    { path: "/utilidades/convertidor-png-a-webp/", file: "test.png", toExtension: "webp" },
    { path: "/utilidades/convertidor-jpg-a-webp/", file: "test.jpg", toExtension: "webp" },
    { path: "/utilidades/convertidor-svg-a-png/", file: "test.svg", toExtension: "png" },
    { path: "/utilidades/convertidor-svg-a-jpg/", file: "test.svg", toExtension: "jpg" },
    { path: "/utilidades/convertidor-bmp-a-jpg/", file: "test.bmp", toExtension: "jpg" },
    { path: "/utilidades/convertidor-bmp-a-png/", file: "test.bmp", toExtension: "png" },
    { path: "/utilidades/convertidor-bmp-a-webp/", file: "test.bmp", toExtension: "webp" },
    { path: "/utilidades/convertidor-avif-a-jpg/", file: "test.avif", toExtension: "jpg" },
    { path: "/utilidades/convertidor-avif-a-png/", file: "test.avif", toExtension: "png" },
    { path: "/utilidades/convertidor-avif-a-webp/", file: "test.avif", toExtension: "webp" },
    { path: "/utilidades/convertidor-gif-a-jpg/", file: "test.gif", toExtension: "jpg" },
    { path: "/utilidades/convertidor-gif-a-png/", file: "test.gif", toExtension: "png" },
    { path: "/utilidades/convertidor-gif-a-webp/", file: "test.gif", toExtension: "webp" },
    { path: "/utilidades/convertidor-png-a-ico/", file: "test.png", toExtension: "ico" },
    { path: "/utilidades/convertidor-jpg-a-ico/", file: "test.jpg", toExtension: "ico" },
    { path: "/utilidades/convertidor-webp-a-ico/", file: "test.webp", toExtension: "ico" }
];


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

    
    try {
        await sharp({ create: { width: 100, height: 100, channels: 4, background: { r: 255, g: 0, b: 0, alpha: 0.5 } } })
            .png()
            .toFile(path.join(FIXTURES_DIR, "test.png"));

        await sharp({ create: { width: 100, height: 100, channels: 4, background: { r: 0, g: 255, b: 0, alpha: 1 } } })
            .jpeg()
            .toFile(path.join(FIXTURES_DIR, "test.jpg"));

        await sharp({ create: { width: 100, height: 100, channels: 4, background: { r: 0, g: 0, b: 255, alpha: 1 } } })
            .webp()
            .toFile(path.join(FIXTURES_DIR, "test.webp"));

        await sharp({ create: { width: 100, height: 100, channels: 4, background: { r: 100, g: 100, b: 100, alpha: 1 } } })
            .avif()
            .toFile(path.join(FIXTURES_DIR, "test.avif"));

        await sharp({ create: { width: 100, height: 100, channels: 4, background: { r: 150, g: 50, b: 50, alpha: 1 } } })
            .gif()
            .toFile(path.join(FIXTURES_DIR, "test.gif"));

        fs.writeFileSync(
            path.join(FIXTURES_DIR, "test.svg"),
            '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="purple"/></svg>'
        );

        const bmpBase64 = "Qk06AAAAAAAAADYAAAAoAAAAAgAAAAIAAAABABgAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8A/wAA/wD/AAA=";
        fs.writeFileSync(path.join(FIXTURES_DIR, "test.bmp"), Buffer.from(bmpBase64, "base64"));

        console.log("✓ Test fixtures generadas");
    } catch (e) {
        console.error("✗ Error generando test fixtures:", e);
        throw e;
    }
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


async function runTests() {
    const puppeteer = await import("puppeteer");
    let browser: Browser | null = null;
    let passed = 0;
    let failed = 0;

    try {
        console.log("\n🚀 Iniciando tests E2E de convertidores...\n");

        await setup();
        await waitForServer();

        browser = await puppeteer.default.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        for (const testCase of CONVERTERS) {
            try {
                const page = await browser.newPage();
                page.on("console", (msg) => console.log("  [browser]", msg.text()));

                const client = await page.createCDPSession();
                await client.send('Page.setDownloadBehavior', {
                    behavior: 'allow',
                    downloadPath: DOWNLOADS_DIR,
                });

                await page.goto(`${SERVER_URL}${testCase.path}`, { waitUntil: "networkidle0" });

                const inputUploadHandle = await page.$('input[type="file"]');
                if (!inputUploadHandle) {
                    throw new Error("No se encontró input file");
                }

                const filePath = path.join(FIXTURES_DIR, testCase.file);
                await inputUploadHandle.uploadFile(filePath);

                await page.waitForSelector('.converter-item', { timeout: 10000 });
                const downloadBtn = await page.waitForSelector('.converter-item a.dl-btn', { timeout: 10000, visible: true });

                if (!downloadBtn) {
                    throw new Error("No se encontró botón de descarga");
                }

                await downloadBtn.click();
                await new Promise((r) => setTimeout(r, 5000));

                const downloadedFiles = fs.readdirSync(DOWNLOADS_DIR);
                const expectedExt = `.${testCase.toExtension}`;
                const fileFound = downloadedFiles.some(f => f.toLowerCase().endsWith(expectedExt));

                for (const file of downloadedFiles) {
                    fs.unlinkSync(path.join(DOWNLOADS_DIR, file));
                }

                await page.close();

                if (fileFound) {
                    console.log(`✓ ${testCase.file} → ${testCase.toExtension}`);
                    passed++;
                } else {
                    console.log(`✗ ${testCase.file} → ${testCase.toExtension} (archivo no generado)`);
                    failed++;
                }
            } catch (e) {
                console.log(`✗ ${testCase.file} → ${testCase.toExtension} (error: ${e instanceof Error ? e.message : String(e)})`);
                failed++;
            }
        }

        console.log(`\n📊 Resultados: ${passed} pasados, ${failed} fallidos\n`);

        process.exit(failed > 0 ? 1 : 0);
    } catch (e) {
        console.error("✗ Error en tests:", e);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

runTests();
