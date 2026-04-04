/**
 * compare-seo.mts
 * Compara meta tags y JSON-LD schemas entre localhost y producción.
 * Uso: tsx scripts/compare-seo.mts [slug]
 *   Sin argumento → compara todas las páginas de utilidades
 *   Con argumento  → compara solo esa ruta, ej: /utilidades/calculadora-barriles-fiesta/
 */

import fs from 'fs';
import path from 'path';

const LOCAL = 'http://localhost:4321';
const PROD = 'https://www.jjlmoya.es';
const PAGES_DIR = path.resolve('src/pages/utilidades');
const TIMEOUT_MS = 10_000;

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetaTags {
  title: string | null;
  description: string | null;
  canonical: string | null;
  robots: string | null;
  'og:title': string | null;
  'og:description': string | null;
  'og:image': string | null;
  'og:url': string | null;
  'og:type': string | null;
  'twitter:title': string | null;
  'twitter:description': string | null;
  'twitter:image': string | null;
  'twitter:card': string | null;
}

interface PageSEO {
  meta: MetaTags;
  schemas: object[];
}

interface Diff {
  field: string;
  local: unknown;
  prod: unknown;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchHTML(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// ─── Parsers ──────────────────────────────────────────────────────────────────

function extractMeta(html: string): MetaTags {
  const tag = (attr: string, value: string): string | null => {
    const re = new RegExp(`<meta[^>]+${attr}=["']${value}["'][^>]*content=["']([^"']*?)["']`, 'i');
    const re2 = new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]*${attr}=["']${value}["']`, 'i');
    return (html.match(re) ?? html.match(re2))?.[1] ?? null;
  };

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);

  return {
    title: titleMatch?.[1]?.trim() ?? null,
    description: tag('name', 'description'),
    canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*?)["']/i)?.[1] ?? null,
    robots: tag('name', 'robots'),
    'og:title': tag('property', 'og:title'),
    'og:description': tag('property', 'og:description'),
    'og:image': tag('property', 'og:image'),
    'og:url': tag('property', 'og:url'),
    'og:type': tag('property', 'og:type'),
    'twitter:title': tag('name', 'twitter:title'),
    'twitter:description': tag('name', 'twitter:description'),
    'twitter:image': tag('name', 'twitter:image'),
    'twitter:card': tag('name', 'twitter:card'),
  };
}

function extractSchemas(html: string): object[] {
  const schemas: object[] = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(m[1]));
    } catch {
      schemas.push({ _parseError: m[1].slice(0, 80) });
    }
  }
  return schemas;
}

async function fetchPageSEO(url: string): Promise<PageSEO | null> {
  const html = await fetchHTML(url);
  if (!html) return null;
  return {
    meta: extractMeta(html),
    schemas: extractSchemas(html),
  };
}

// ─── Diff logic ───────────────────────────────────────────────────────────────

function normalizeMeta(meta: MetaTags): MetaTags {
  // Normaliza URLs absolutas eliminando el dominio para que sean comparables
  const strip = (v: string | null) =>
    v ? v.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') : v;
  return {
    ...meta,
    canonical: strip(meta.canonical),
    'og:url': strip(meta['og:url']),

    'twitter:image': strip(meta['twitter:image']),
  };
}

function diffMeta(local: MetaTags, prod: MetaTags): Diff[] {
  const diffs: Diff[] = [];
  const localN = normalizeMeta(local);
  const prodN = normalizeMeta(prod);
  for (const key of Object.keys(localN) as (keyof MetaTags)[]) {
    if (localN[key] !== prodN[key]) {
      diffs.push({ field: key, local: localN[key], prod: prodN[key] });
    }
  }
  return diffs;
}

function schemaType(s: object): string {
  return (s as Record<string, string>)['@type'] ?? 'unknown';
}

function diffSchemas(local: object[], prod: object[]): Diff[] {
  const diffs: Diff[] = [];

  const localTypes = local.map(schemaType).sort();
  const prodTypes = prod.map(schemaType).sort();

  if (JSON.stringify(localTypes) !== JSON.stringify(prodTypes)) {
    diffs.push({
      field: '@types present',
      local: localTypes,
      prod: prodTypes,
    });
  }

  // Compara cada schema por tipo
  const usedProd = new Set<number>();
  for (const ls of local) {
    const type = schemaType(ls);
    const idx = prod.findIndex((ps, i) => !usedProd.has(i) && schemaType(ps) === type);
    if (idx === -1) {
      diffs.push({ field: `schema[${type}]`, local: 'present', prod: 'MISSING' });
      continue;
    }
    usedProd.add(idx);

    // Compara campos relevantes dentro del schema
    const ls2 = ls as Record<string, unknown>;
    const ps2 = prod[idx] as Record<string, unknown>;
    for (const k of new Set([...Object.keys(ls2), ...Object.keys(ps2)])) {
      if (k === '@context') continue;
      const lv = JSON.stringify(ls2[k]);
      const pv = JSON.stringify(ps2[k]);
      if (lv !== pv) {
        diffs.push({ field: `schema[${type}].${k}`, local: ls2[k], prod: ps2[k] });
      }
    }
  }

  for (const ps of prod) {
    const type = schemaType(ps);
    const inLocal = local.some((ls) => schemaType(ls) === type);
    if (!inLocal) {
      diffs.push({ field: `schema[${type}]`, local: 'MISSING', prod: 'present' });
    }
  }

  return diffs;
}

// ─── Logger (terminal + fichero) ─────────────────────────────────────────────

const REPORTS_DIR = path.resolve('reports/seo');

function stripAnsi(str: string): string {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

let fileStream: fs.WriteStream | null = null;

function initReport(slugs: string[]) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const label = slugs.length === 1
    ? slugs[0]!.replace(/\//g, '-').replace(/^-|-$/g, '')
    : `all-${slugs.length}`;
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const file = path.join(REPORTS_DIR, `${ts}_${label}.txt`);
  fileStream = fs.createWriteStream(file, { encoding: 'utf8' });
  return file;
}

function log(line: string = '') {
  console.log(line);
  fileStream?.write(stripAnsi(line) + '\n');
}

// ─── Output ───────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bgBlue: '\x1b[44m\x1b[37m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m',
};

function printDiff(d: Diff) {
  const field = `${C.bold}${d.field}${C.reset}`;
  const local = `${C.green}LOCAL: ${JSON.stringify(d.local)}${C.reset}`;
  const prod = d.prod === 'MISSING'
    ? `${C.red}PROD: MISSING${C.reset}`
    : `${C.yellow}PROD:  ${JSON.stringify(d.prod)}${C.reset}`;
  log(`    ⚡ ${field}`);
  log(`       ${local}`);
  log(`       ${prod}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function comparePage(slug: string): Promise<{ diffs: number; error?: string }> {
  const localUrl = `${LOCAL}${slug}`;
  const prodUrl = `${PROD}${slug}`;

  const [local, prod] = await Promise.all([
    fetchPageSEO(localUrl),
    fetchPageSEO(prodUrl),
  ]);

  if (!local) return { diffs: 0, error: 'No response from LOCAL' };
  if (!prod) return { diffs: 0, error: 'No response from PROD' };

  const metaDiffs = diffMeta(local.meta, prod.meta);
  const schemaDiffs = diffSchemas(local.schemas, prod.schemas);
  const allDiffs = [...metaDiffs, ...schemaDiffs];

  if (allDiffs.length === 0) {
    log(`  ${C.bgGreen} OK ${C.reset} ${C.gray}${slug}${C.reset}`);
  } else {
    log(`  ${C.bgRed} ${allDiffs.length} DIFF${allDiffs.length > 1 ? 'S' : ''} ${C.reset} ${C.bold}${slug}${C.reset}`);
    allDiffs.forEach(printDiff);
  }

  return { diffs: allDiffs.length };
}

async function run() {
  const targetSlug = process.argv[2];

  let slugs: string[];

  if (targetSlug) {
    slugs = [targetSlug.startsWith('/') ? targetSlug : `/${targetSlug}`];
  } else {
    // Lee todos los .astro de src/pages/utilidades/*.astro (no subcarpetas)
    const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith('.astro'));
    slugs = files.map((f) => `/utilidades/${f.replace('.astro', '')}/`);
    slugs.sort();
  }

  const reportFile = initReport(slugs);

  log(`\n${C.bgBlue} SEO COMPARE: LOCAL vs PROD ${C.reset}`);
  log(`${C.gray}local: ${LOCAL}  ↔  prod: ${PROD}${C.reset}`);
  log(`${C.gray}report: ${reportFile}${C.reset}\n`);
  log(`${C.cyan}Comparando ${slugs.length} páginas...${C.reset}\n`);

  let totalDiffs = 0;
  let totalErrors = 0;
  let clean = 0;

  // Procesa en lotes de 5 para no saturar
  const BATCH = 5;
  for (let i = 0; i < slugs.length; i += BATCH) {
    const batch = slugs.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(comparePage));
    for (const r of results) {
      if (r.error) {
        totalErrors++;
        log(`  ${C.red}⚠ ${r.error}${C.reset}`);
      } else if (r.diffs === 0) {
        clean++;
      } else {
        totalDiffs += r.diffs;
      }
    }
  }

  log(`\n${C.bold}─────────────────────────────────────────${C.reset}`);
  log(`${C.bold}RESULTADO: ${slugs.length} páginas${C.reset}`);
  log(`  ${C.green}✅ Sin diferencias: ${clean}${C.reset}`);
  log(`  ${C.yellow}⚡ Con diferencias: ${slugs.length - clean - totalErrors} (Total: ${totalDiffs} cambios)${C.reset}`);
  if (totalErrors) log(`  ${C.red}⚠ Errores:          ${totalErrors}${C.reset}`);
  log(`${C.bold}─────────────────────────────────────────${C.reset}\n`);

  fileStream?.end();
  console.log(`${C.gray}📄 Reporte guardado en: ${reportFile}${C.reset}`);
}

run();
