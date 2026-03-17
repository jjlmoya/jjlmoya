#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

async function main() {
    const sectionsDir = path.join(rootDir, "src/data/utilities");
    const pagesDir = path.join(rootDir, "src/pages/utilidades/categorias");

    if (!fs.existsSync(pagesDir)) {
        fs.mkdirSync(pagesDir, { recursive: true });
        console.log(`✓ Created directory: ${pagesDir}`);
    }

    const indexPath = path.join(sectionsDir, "index.ts");
    const indexContent = fs.readFileSync(indexPath, "utf-8");

    const sectionImports = indexContent
        .split("\n")
        .filter(line => line.includes("Section"))
        .filter(line => line.includes("import"));

    const sectionsToProcess = [];

    for (const importLine of sectionImports) {
        const match = importLine.match(/import\s+{\s*(\w+Section)\s*}\s+from\s+["']\.\/([^"']+)["']/);
        if (match) {
            const [, varName, filePath] = match;
            const modulePath = path.join(sectionsDir, `${filePath}.ts`);

            if (fs.existsSync(modulePath)) {
                const moduleContent = fs.readFileSync(modulePath, "utf-8");
                const titleMatch = moduleContent.match(/title:\s*["']([^"']+)["']/);
                const themeMatch = moduleContent.match(/theme:\s*["']([^"']+)["']/);

                if (titleMatch) {
                    const title = titleMatch[1];
                    const theme = themeMatch ? themeMatch[1] : "indigo";
                    const slug = titleToSlug(title);

                    sectionsToProcess.push({
                        title,
                        slug,
                        theme,
                        varName,
                        filePath,
                    });
                }
            }
        }
    }

    for (const section of sectionsToProcess) {
        const pageContent = generateCategoryPage(section);
        const pageFile = path.join(pagesDir, `${section.slug}.astro`);

        if (!fs.existsSync(pageFile)) {
            fs.writeFileSync(pageFile, pageContent);
            console.log(`✓ Created: src/pages/utilidades/categorias/${section.slug}.astro`);
        } else {
            console.log(`⊘ Already exists: src/pages/utilidades/categorias/${section.slug}.astro`);
        }
    }

    console.log(`\n✓ Done! ${sectionsToProcess.length} category pages processed.`);
}

function titleToSlug(title) {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[&]/g, "y")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

function generateCategoryPage(section) {
    const { title, slug, theme, varName, filePath } = section;
    const pascalSlug = slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

    const gradientFrom = getGradientColor(theme, "100");
    const gradientTo = getGradientColor(theme, "200");

    return `---
export const prerender = true;
import LayoutUtilityCategory from "../../../layouts/LayoutUtilityCategory.astro";
import SEOArticle from "../../../components/ui/seo/SEOArticle.astro";
import SEOTitle from "../../../components/ui/seo/SEOTitle.astro";
import SEOList from "../../../components/ui/seo/SEOList.astro";
import SEOTip from "../../../components/ui/seo/SEOTip.astro";
import { ${varName} } from "../../../data/utilities/${filePath}";

const categoryColor = "${getThemeColor(theme)}";
---

<LayoutUtilityCategory
    title="Utilidades de ${title}"
    description="Herramientas científicas y calculadoras online gratis para ${title.toLowerCase()}. Calcula, convierte y optimiza con precisión."
    image="/images/utilities/category/${slug}.webp"
    utilities={${varName}.utilities}
    theme="${theme}"
    categoryColor={categoryColor}
>
    <div slot="seo">
        <SEOArticle>
            <SEOTitle title="¿Por qué usar herramientas especializadas en ${title.toLowerCase()}?" level={2} />

            <p>
                En el mundo de ${title.toLowerCase()}, la precisión es fundamental. Cada medida, cada cálculo, cada conversión afecta directamente al resultado final. Nuestras herramientas están diseñadas para eliminar la adivinanza y proporcionar <strong>resultados exactos basados en ciencia comprobada</strong>.
            </p>

            <p>
                Desde profesionales hasta entusiastas, todos comparten una característica común: la necesidad de <strong>reproducibilidad</strong>. No se trata de suerte; se trata de control técnico, mediciones exactas y comprensión profunda de los procesos involucrados.
            </p>

            <SEOTitle title="Herramientas disponibles en ${title}" level={2} />
            <p>
                Esta sección reúne las calculadoras y utilidades más prácticas para ${title.toLowerCase()}. Cada herramienta ha sido cuidadosamente diseñada para ofrecer máxima precisión y facilidad de uso.
            </p>

            <SEOTip title="Consejo Profesional">
                <p>
                    La consistencia en ${title.toLowerCase()} surge del conocimiento técnico. Cuando entiendes las variables que influyen en tus procesos, puedes controlarlas y mejorar constantemente. Utiliza estas herramientas no solo para obtener resultados inmediatos, sino para comprender mejor cómo funcionan los principios subyacentes.
                </p>
            </SEOTip>

            <SEOTitle title="Precisión, reproducibilidad y excelencia" level={2} />
            <p>
                El verdadero dominio en cualquier campo surge de la combinación de conocimiento teórico y herramientas prácticas. Nuestras calculadoras te permiten:
            </p>

            <SEOList items={[
                "<strong>Eliminar errores:</strong> Automatiza cálculos complejos y evita equivocaciones humanas.",
                "<strong>Ahorrar tiempo:</strong> Obtén resultados al instante en lugar de hacer cálculos manuales.",
                "<strong>Aprender:</strong> Comprende los factores que influyen en cada resultado.",
                "<strong>Mejorar:</strong> Experimenta, mide y optimiza tus procesos con datos exactos."
            ]} />

            <p class="text-xs text-slate-400 mt-16 text-center italic">
                Estas herramientas integran estándares técnicos reconocidos, fórmulas científicas validadas y mejores prácticas de la industria.
            </p>
        </SEOArticle>
    </div>
</LayoutUtilityCategory>
`;
}

function getThemeColor(theme) {
    const colors = {
        orange: "#f97316",
        amber: "#f59e0b",
        yellow: "#eab308",
        lime: "#84cc16",
        green: "#22c55e",
        emerald: "#10b981",
        teal: "#14b8a6",
        cyan: "#06b6d4",
        blue: "#0ea5e9",
        indigo: "#6366f1",
        purple: "#a855f7",
        pink: "#ec4899",
        red: "#ef4444",
    };
    return colors[theme] || "#6366f1";
}

function getGradientColor(theme, intensity) {
    const gradients = {
        orange: { 100: "from-orange-100", 200: "to-orange-200" },
        amber: { 100: "from-amber-100", 200: "to-amber-200" },
        yellow: { 100: "from-yellow-100", 200: "to-yellow-200" },
        lime: { 100: "from-lime-100", 200: "to-lime-200" },
        green: { 100: "from-green-100", 200: "to-green-200" },
        emerald: { 100: "from-emerald-100", 200: "to-emerald-200" },
        teal: { 100: "from-teal-100", 200: "to-teal-200" },
        cyan: { 100: "from-cyan-100", 200: "to-cyan-200" },
        blue: { 100: "from-blue-100", 200: "to-blue-200" },
        indigo: { 100: "from-indigo-100", 200: "to-indigo-200" },
        purple: { 100: "from-purple-100", 200: "to-purple-200" },
        pink: { 100: "from-pink-100", 200: "to-pink-200" },
        red: { 100: "from-red-100", 200: "to-red-200" },
    };
    return gradients[theme]?.[intensity] || "from-indigo-100";
}

main().catch(console.error);
