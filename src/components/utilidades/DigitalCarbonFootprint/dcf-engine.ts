export interface DCFRating {
    label: string;
    color: string;
    pct: number;
    desc: string;
}

export interface DCFResult {
    url: string;
    bytes: number;
    co2g: number;
    energyWh: number;
    co2Year: number;
    trees: string;
    km: string;
    pageSize: string;
    rating: DCFRating;
    tips: string[];
}

const NET_KWH_PER_GB = 0.81;
const DEVICE_KWH_PER_GB = 0.52;
const CARBON_G_PER_KWH = 442;
const RETURN_RATIO = 0.75;

export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function calcCO2(bytes: number): { co2g: number; energyWh: number } {
    const gb = (bytes / 1e9) * RETURN_RATIO;
    const energyKwh = (NET_KWH_PER_GB + DEVICE_KWH_PER_GB) * gb;
    return { co2g: energyKwh * CARBON_G_PER_KWH, energyWh: energyKwh * 1000 };
}

function getRating(co2g: number): DCFRating {
    if (co2g < 0.1) return { label: "A+", color: "#10b981", pct: 5, desc: "Excelente. Esta página consume muy poca energía comparada con la media global." };
    if (co2g < 0.2) return { label: "A", color: "#22c55e", pct: 15, desc: "Muy buena eficiencia. La página está bien optimizada y tiene un impacto mínimo." };
    if (co2g < 0.5) return { label: "B", color: "#84cc16", pct: 35, desc: "Eficiencia aceptable. Hay margen de mejora pero está por debajo de la media." };
    if (co2g < 1.0) return { label: "C", color: "#f59e0b", pct: 58, desc: "En la media. La página consume lo esperado en la web actual." };
    if (co2g < 2.0) return { label: "D", color: "#f97316", pct: 72, desc: "Por encima de la media. Considera optimizar imágenes, scripts y fuentes." };
    if (co2g < 4.0) return { label: "E", color: "#ef4444", pct: 88, desc: "Alto impacto. El peso de la página es significativo y debería reducirse." };
    return { label: "F", color: "#dc2626", pct: 98, desc: "Impacto muy alto. Hay una gran oportunidad de reducir el tamaño de la página." };
}

function getTips(bytes: number): string[] {
    const tips: string[] = [];
    const kb = bytes / 1024;
    if (kb > 500) tips.push("Convierte imágenes a WebP o AVIF para reducir hasta un 70% su peso.");
    if (kb > 200) tips.push("Activa Brotli o GZIP en el servidor para comprimir HTML, CSS y JS.");
    if (kb > 300) tips.push("Usa lazy loading en imágenes y vídeos que estén fuera del viewport.");
    tips.push("Elige un hosting con energía renovable certificada (Cloudflare, Netlify, Vercel).");
    tips.push("Elimina scripts de analítica y widgets de terceros que no sean imprescindibles.");
    if (kb > 1000) tips.push("Revisa las fuentes web: carga solo los pesos tipográficos que realmente usas.");
    tips.push("Configura cabeceras de caché HTTP largas para que las visitas recurrentes no re-descarguen recursos.");
    return tips;
}

async function tryProxy(proxyUrl: string): Promise<number> {
    const resp = await fetch(proxyUrl, { signal: AbortSignal.timeout(10000) });
    if (!resp.ok) throw new Error("bad_response");
    const text = await resp.text();
    let html = text;
    try {
        const json = JSON.parse(text) as Record<string, unknown>;
        html = (json.contents ?? json.body ?? text) as string;
    } catch {
        html = text;
    }
    if (!html || html.length < 100) throw new Error("empty");
    return Math.round(new TextEncoder().encode(html).length * 5.5);
}

export async function estimatePageSize(url: string): Promise<number> {
    const encoded = encodeURIComponent(url);
    const proxies = [
        `https://api.allorigins.win/get?url=${encoded}`,
        `https://corsproxy.io/?${encoded}`,
        `https://api.codetabs.com/v1/proxy/?quest=${encoded}`,
    ];
    for (const proxy of proxies) {
        try { return await tryProxy(proxy); } catch { continue; }
    }
    throw new Error("all_proxies_failed");
}

export function buildResult(url: string, bytes: number): DCFResult {
    const { co2g, energyWh } = calcCO2(bytes);
    const co2Year = (co2g * 100_000) / 1000;
    return {
        url,
        bytes,
        co2g,
        energyWh,
        co2Year,
        trees: (co2Year / 21).toFixed(1),
        km: (co2Year / 0.21).toFixed(0),
        pageSize: formatBytes(bytes),
        rating: getRating(co2g),
        tips: getTips(bytes),
    };
}
