import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "http://localhost:4321";
const UTILIDADES_DIR = path.join(process.cwd(), "src/pages/utilidades");

function getUtilityPages(): string[] {
    return fs
        .readdirSync(UTILIDADES_DIR)
        .filter((f) => {
            if (!f.endsWith(".astro") || f.startsWith("_") || f.startsWith(".") || f === "index.astro") return false;
            const content = fs.readFileSync(path.join(UTILIDADES_DIR, f), "utf8");
            return content.includes("@jjlmoya/utils-");
        })
        .map((f) => `/utilidades/${path.parse(f).name}/`);
}

function extractJsonLd(html: string): object[] {
    const schemas: object[] = [];
    const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
        try {
            const parsed = JSON.parse(m[1]);
            if (Array.isArray(parsed)) schemas.push(...parsed);
            else schemas.push(parsed);
        } catch { }
    }
    return schemas;
}

const htmlCache = new Map<string, string | null>();

async function getHtml(pagePath: string): Promise<string | null> {
    if (htmlCache.has(pagePath)) return htmlCache.get(pagePath)!;
    try {
        const response = await fetch(`${BASE_URL}${pagePath}`);
        const html = response.ok ? await response.text() : null;
        htmlCache.set(pagePath, html);
        return html;
    } catch {
        htmlCache.set(pagePath, null);
        return null;
    }
}

const pages = getUtilityPages();

describe.skip("Utilidades migradas — SEO completo", () => {

    it(`[${pages.length} páginas] responden 200`, async () => {
        const failing: string[] = [];
        await Promise.all(pages.map(async (p) => {
            const html = await getHtml(p);
            if (html === null) failing.push(p);
        }));
        if (failing.length) throw new Error(`\n\nPáginas sin respuesta 200:\n${failing.map(p => `  ✗ ${p}`).join("\n")}\n`);
    });

    it(`[${pages.length} páginas] tienen sección FAQ`, async () => {
        const failing: string[] = [];
        await Promise.all(pages.map(async (p) => {
            const html = await getHtml(p);
            if (!html) return;
            const has = html.includes("Preguntas") || html.includes("FAQ") || html.includes("faq");
            if (!has) failing.push(p);
        }));
        if (failing.length) throw new Error(`\n\nSin sección FAQ:\n${failing.map(p => `  ✗ ${p}`).join("\n")}\n`);
    });

    it(`[${pages.length} páginas] tienen bibliografía`, async () => {
        const failing: string[] = [];
        await Promise.all(pages.map(async (p) => {
            const html = await getHtml(p);
            if (!html) return;
            const has = html.includes("Bibliograf") || html.includes("bibliography") || html.includes("Fuentes");
            if (!has) failing.push(p);
        }));
        if (failing.length) throw new Error(`\n\nSin bibliografía:\n${failing.map(p => `  ✗ ${p}`).join("\n")}\n`);
    });

    it(`[${pages.length} páginas] tienen JSON-LD FAQPage + WebApplication`, async () => {
        const missingFaq: string[] = [];
        const missingApp: string[] = [];
        await Promise.all(pages.map(async (p) => {
            const html = await getHtml(p);
            if (!html) return;
            const types = extractJsonLd(html).map((s) => (s as Record<string, string>)["@type"]);
            if (!types.includes("FAQPage")) missingFaq.push(p);
            if (!types.includes("WebApplication") && !types.includes("SoftwareApplication")) missingApp.push(p);
        }));

        const report: string[] = [];
        if (missingFaq.length) report.push(`Sin FAQPage schema:\n${missingFaq.map(p => `  ✗ ${p}`).join("\n")}`);
        if (missingApp.length) report.push(`Sin WebApplication schema:\n${missingApp.map(p => `  ✗ ${p}`).join("\n")}`);

        if (report.length) throw new Error(`\n\n${report.join("\n\n")}\n`);
    });

});
