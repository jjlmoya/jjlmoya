import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const COLOR = {
  RESET: '\x1b[0m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  CYAN: '\x1b[36m',
  RED: '\x1b[31m',
  BOLD: '\x1b[1m',
  DIM: '\x1b[2m',
};

const SLUG_RE = /slug\s*:\s*['"`]([^'"`]+)['"`]/;

function extractSlug(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const match = content.match(SLUG_RE);
  return match ? match[1] : null;
}

function findToolInRepo(repoPath, toolId) {
  const toolPath = join(repoPath, 'src', 'tool', toolId);
  if (!existsSync(toolPath)) return null;

  const i18nPath = join(toolPath, 'i18n');
  if (!existsSync(i18nPath)) return null;

  return i18nPath;
}

function getLocalesFromDir(i18nPath) {
  const files = readdirSync(i18nPath).filter(f => f.endsWith('.ts'));
  const locales = {};

  for (const file of files) {
    const locale = file.replace('.ts', '');
    const slug = extractSlug(join(i18nPath, file));
    if (slug) locales[locale] = slug;
  }

  return locales;
}

function findUtilsRepos(baseDir) {
  const entries = readdirSync(baseDir, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && e.name.startsWith('jjlmoya-utils-'))
    .map(e => ({ name: e.name, path: join(baseDir, e.name) }));
}

function resolveToolSlugs(repos, toolId) {
  for (const repo of repos) {
    const i18nPath = findToolInRepo(repo.path, toolId);
    if (!i18nPath) continue;

    const locales = getLocalesFromDir(i18nPath);
    return { repo: repo.name, locales };
  }

  return null;
}

function printToolResult(toolId, result) {
  if (!result) {
    console.error(`${COLOR.RED}[NOT FOUND]${COLOR.RESET} "${toolId}"`);
    return;
  }

  console.log(`\n${COLOR.BOLD}${COLOR.CYAN}${toolId}${COLOR.RESET} ${COLOR.DIM}(${result.repo})${COLOR.RESET}\n`);

  const entries = Object.entries(result.locales).sort(([a], [b]) => a.localeCompare(b));
  const maxLocale = Math.max(...entries.map(([l]) => l.length));

  for (const [locale, slug] of entries) {
    const pad = ' '.repeat(maxLocale - locale.length + 1);
    console.log(`  ${COLOR.GREEN}${locale}${COLOR.RESET}${pad}${slug}`);
  }

  console.log();
}

function main() {
  const toolIds = process.argv.slice(2);

  if (toolIds.length === 0) {
    console.error(`${COLOR.RED}Uso: node scripts/tool-slugs.mjs <tool-id> [tool-id2] ...${COLOR.RESET}`);
    console.error(`${COLOR.DIM}Ejemplo: node scripts/tool-slugs.mjs lacto-fermentation-salt-calculator spherification-bath-calculator${COLOR.RESET}`);
    process.exit(1);
  }

  const baseDir = resolve(process.cwd(), '..');
  const repos = findUtilsRepos(baseDir);

  if (repos.length === 0) {
    console.error(`${COLOR.RED}No se encontraron repositorios jjlmoya-utils-* en ${baseDir}${COLOR.RESET}`);
    process.exit(1);
  }

  let anyNotFound = false;

  for (const toolId of toolIds) {
    const result = resolveToolSlugs(repos, toolId);
    printToolResult(toolId, result);
    if (!result) anyNotFound = true;
  }

  if (anyNotFound) {
    console.log(`${COLOR.DIM}Repositorios buscados: ${repos.map(r => r.name).join(', ')}${COLOR.RESET}`);
    process.exit(1);
  }
}

main();
