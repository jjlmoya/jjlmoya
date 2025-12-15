import fs from "node:fs";
import path from "node:path";
import projects from "../../data/projects.json";

export interface SearchResult {
    id: string;
    title: string;
    url: string;
    description: string;
    category: "Utilidad" | "Concepto" | "Proyecto" | "Página";
    icon: string;
}

function normalizeTitle(filename: string): string {
    return filename
        .replace(".astro", "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ensureTrailingSlash(url: string): string {
    return url.endsWith("/") ? url : `${url}/`;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith(".astro")) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

export function getSearchIndex(): SearchResult[] {
    const results: SearchResult[] = [];
    const pagesDir = path.join(process.cwd(), "src/pages");

    
    if (!fs.existsSync(pagesDir)) {
        console.warn("SearchIndex: src/pages directory not found");
        return [];
    }

    const pageFiles = getAllFiles(pagesDir);

    pageFiles.forEach((absolutePath) => {
        
        const normalizedPath = absolutePath.split(path.sep).join("/");
        
        const relativePart = normalizedPath.split("/src/pages")[1];

        
        if (!relativePart) return;

        
        
        const virtualPath = `/src/pages${relativePart}`;

        if (virtualPath.includes("404") || virtualPath.includes("[") || virtualPath.includes("index.astro")) {
            if (virtualPath.endsWith("/pages/index.astro")) {
                results.push({
                    id: "home",
                    title: "Inicio",
                    url: "/",
                    description: "Página principal",
                    category: "Página",
                    icon: "mdi:home",
                });
            }
            
            return;
        }

        const rawUrl = virtualPath
            .replace("/src/pages", "")
            .replace(".astro", "")
            .replace(/\/index$/, "");

        const url = ensureTrailingSlash(rawUrl);
        const filename = virtualPath.split("/").pop() || "";

        let title = normalizeTitle(filename);
        let category: SearchResult["category"] = "Página";
        let icon = "mdi:file-document-outline";
        let description = "";

        if (virtualPath.includes("/utilidades/")) {
            category = "Utilidad";
            icon = "mdi:tools";
            description = "Herramienta de utilidad";
        } else if (virtualPath.includes("/conceptos/")) {
            category = "Concepto";
            icon = "mdi:lightbulb-outline";
            description = "Concepto experimental";
        } else if (virtualPath.includes("/gamebob/")) {
            category = "Página";
            icon = "mdi:gamepad-variant";
            title = `GameBob ${title}`;
        } else if (virtualPath.includes("/charlas/")) {
            category = "Página";
            icon = "mdi:microphone";
            title = "Charlas";
        }

        if (url === "/utilidades/") title = "Utilidades";
        if (url === "/conceptos/") title = "Conceptos";
        if (url === "/proyectos/") title = "Proyectos";

        results.push({
            id: url,
            title,
            url,
            description,
            category,
            icon,
        });
    });

    projects.forEach((project) => {
        results.push({
            id: `project-${project.url}`,
            title: project.title,
            url: ensureTrailingSlash(project.url),
            description: project.description,
            category: "Proyecto",
            icon: "mdi:briefcase-outline",
        });
    });

    return results;
}
