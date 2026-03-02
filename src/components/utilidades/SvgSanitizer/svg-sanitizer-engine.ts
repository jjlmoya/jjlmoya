export interface SanitizeOptions {
    removeIds: boolean;
    removeWidthHeight: boolean;
    minify: boolean;
}

export interface SanitizeResult {
    svg: string;
    originalBytes: number;
    cleanedBytes: number;
    removedElements: number;
    removedAttrs: number;
}

const BAD_ATTRS = new Set([
    "xml:space", "version", "xmlns:dc", "xmlns:cc", "xmlns:rdf",
    "xmlns:svg", "xmlns:inkscape", "xmlns:sodipodi", "xmlns:xlink",
    "enable-background",
]);

const BAD_ATTR_PREFIXES = ["data-", "inkscape:", "sodipodi:"];
const METADATA_TAGS = ["metadata", "title", "desc"];
const NS_PATTERNS = [
    /<sodipodi:[^>]*(?:\/>|>[\s\S]*?<\/sodipodi:[^>]*>)/gi,
    /<inkscape:[^>]*(?:\/>|>[\s\S]*?<\/inkscape:[^>]*>)/gi,
];

function stripNamespacedElements(text: string): { text: string; count: number } {
    let count = 0;
    let result = text;
    for (const pattern of NS_PATTERNS) {
        result = result.replace(pattern, () => { count++; return ""; });
    }
    return { text: result, count };
}

function prettify(svg: string): string {
    let indent = 0;
    return svg
        .replace(/></g, ">\n<")
        .split("\n")
        .map((line) => {
            line = line.trim();
            if (!line) return "";
            if (line.startsWith("</")) indent = Math.max(0, indent - 1);
            const out = "  ".repeat(indent) + line;
            if (!line.startsWith("</") && !line.endsWith("/>")) indent++;
            return out;
        })
        .filter(Boolean)
        .join("\n");
}

export function sanitizeSVG(input: string, options: SanitizeOptions): SanitizeResult {
    const originalBytes = new TextEncoder().encode(input).length;
    let removedElements = 0;
    let removedAttrs = 0;

    let text = input.trim()
        .replace(/<\?xml[^?]*\?>\s*/gi, "")
        .replace(/<!DOCTYPE[^>]*>\s*/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "");

    const stripped = stripNamespacedElements(text);
    text = stripped.text;
    removedElements += stripped.count;

    const parser = new DOMParser();
    let doc = parser.parseFromString(text, "image/svg+xml");

    if (doc.querySelector("parsererror")) {
        const htmlDoc = new DOMParser().parseFromString(`<body>${text}</body>`, "text/html");
        const found = htmlDoc.querySelector("svg");
        if (!found) throw new Error("No se encontró SVG válido.");
        doc = parser.parseFromString(found.outerHTML, "image/svg+xml");
    }

    const svgEl = doc.querySelector("svg") ?? doc.documentElement;

    for (const tag of METADATA_TAGS) {
        svgEl.querySelectorAll(tag).forEach((el) => { el.remove(); removedElements++; });
    }

    svgEl.querySelectorAll("defs").forEach((defs) => {
        if (defs.children.length === 0) { defs.remove(); removedElements++; }
    });

    let changed = true;
    while (changed) {
        changed = false;
        svgEl.querySelectorAll("g").forEach((g) => {
            if (g.children.length === 0 && !g.textContent?.trim()) {
                g.remove(); removedElements++; changed = true;
            }
        });
    }

    const allEls = [svgEl, ...Array.from(svgEl.querySelectorAll("*"))];
    for (const el of allEls) {
        const toRemove: string[] = [];
        for (const attr of el.attributes) {
            const n = attr.name;
            if (
                BAD_ATTRS.has(n) ||
                BAD_ATTR_PREFIXES.some((p) => n.startsWith(p)) ||
                (options.removeIds && n === "id") ||
                (options.removeWidthHeight && el.tagName === "svg" && (n === "width" || n === "height"))
            ) {
                toRemove.push(n);
            }
        }
        toRemove.forEach((a) => { el.removeAttribute(a); removedAttrs++; });
    }

    const serializer = new XMLSerializer();
    let svg = serializer.serializeToString(svgEl);

    if (!svg.includes("xlink:href")) {
        svg = svg.replace(/\s*xmlns:xlink="[^"]*"/g, "");
    }

    svg = options.minify
        ? svg.replace(/\s+/g, " ").replace(/> </g, "><").trim()
        : prettify(svg);

    const cleanedBytes = new TextEncoder().encode(svg).length;
    return { svg, originalBytes, cleanedBytes, removedElements, removedAttrs };
}
