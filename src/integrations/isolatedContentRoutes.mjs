import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ALL_APP_ENTRIES } from '@jjlmoya/apps/data';

const require = createRequire(import.meta.url);
const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
const generatedRoot = join(projectRoot, '.astro', 'runtime-routes');

function resolvePackageRoot(packageName) {
    return resolve(dirname(require.resolve(packageName)), '..');
}

function runtimeDirectories(packageName, sourceDirectory) {
    const directory = join(resolvePackageRoot(packageName), 'src', sourceDirectory);
    return readdirSync(directory, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && existsSync(join(directory, entry.name, 'index.ts')))
        .map(entry => ({ name: entry.name, directory: join(directory, entry.name) }))
        .sort((left, right) => left.name.localeCompare(right.name));
}

function discoverRuntimes(packageName, sourceDirectory, entries, exportSuffix) {
    const runtimes = [];
    for (const runtimeDirectory of runtimeDirectories(packageName, sourceDirectory)) {
        const indexSource = readFileSync(join(runtimeDirectory.directory, 'index.ts'), 'utf8');
        const entrySource = readFileSync(join(runtimeDirectory.directory, 'entry.ts'), 'utf8');
        const exportNames = [...indexSource.matchAll(/export\s+const\s+([A-Za-z_$][\w$]*)/g)]
            .map(match => match[1])
            .filter(name => name.endsWith(exportSuffix));
        const entryId = entrySource.match(/\bid\s*:\s*['"]([^'"]+)['"]/)?.[1];
        if (exportNames.length !== 1 || !entryId) {
            throw new Error(`${packageName}/runtime/${runtimeDirectory.name} has an invalid runtime boundary`);
        }
        const entry = entries.find(candidate => candidate.id === entryId);
        if (!entry) throw new Error(`${packageName}/runtime/${runtimeDirectory.name} is missing from its data registry`);
        runtimes.push({ packageName, subpath: runtimeDirectory.name, exportName: exportNames[0], entry });
    }
    const discoveredIds = new Set(runtimes.map(runtime => runtime.entry.id));
    const missingEntries = entries.filter(entry => !discoveredIds.has(entry.id));
    if (missingEntries.length > 0) {
        throw new Error(`${packageName} has entries without a valid runtime boundary: ${missingEntries.map(entry => entry.id).join(', ')}`);
    }
    return runtimes;
}

function writeGeneratedRoute(filename, source) {
    mkdirSync(generatedRoot, { recursive: true });
    const destination = join(generatedRoot, filename);
    if (!existsSync(destination) || readFileSync(destination, 'utf8') !== source) writeFileSync(destination, source, 'utf8');
    return pathToFileURL(destination);
}

function appAdapter(runtime) {
    return `---\nimport RuntimeAppRoute from '../../src/routes/apps/RuntimeAppRoute.astro';\nimport { ${runtime.exportName} } from '${runtime.packageName}/runtime/${runtime.subpath}';\n---\n\n<RuntimeAppRoute app={${runtime.exportName}} />\n`;
}

function getMfeSitemapUrls() {
    return [
        'https://www.jjlmoya.es/conceptos/sitemap.xml',
        'https://www.jjlmoya.es/juegos/sitemap.xml',
    ];
}

function appendHreflangSitemap(distDirectory, logger) {
    const sitemapIndexPath = join(fileURLToPath(distDirectory), 'sitemap-index.xml');
    if (!existsSync(sitemapIndexPath)) {
        logger.warn(`Sitemap index was not generated at ${sitemapIndexPath}`);
        return;
    }

    const source = readFileSync(sitemapIndexPath, 'utf8');
    const sitemapUrls = ['https://www.jjlmoya.es/sitemap-utilities.xml', ...getMfeSitemapUrls()];
    const missingEntries = sitemapUrls
        .filter((sitemapUrl) => !source.includes(`<loc>${sitemapUrl}</loc>`))
        .map((sitemapUrl) => `  <sitemap>\n    <loc>${sitemapUrl}</loc>\n  </sitemap>`);
    if (missingEntries.length === 0) return;

    writeFileSync(sitemapIndexPath, source.replace('</sitemapindex>', `${missingEntries.join('\n')}\n</sitemapindex>`), 'utf8');
}

const appRuntimes = discoverRuntimes('@jjlmoya/apps', 'app', ALL_APP_ENTRIES, '_APP');

const appRoutes = [];
for (const runtime of appRuntimes) {
    const entrypoint = writeGeneratedRoute(`app-${runtime.subpath.replaceAll(/[^a-zA-Z0-9-]/g, '-')}.astro`, appAdapter(runtime));
    const loader = runtime.entry.i18n.es ?? runtime.entry.i18n.en;
    if (!loader) throw new Error(`Missing Spanish locale for ${runtime.entry.id}`);
    const content = await loader();
    appRoutes.push({ pattern: `/apps/${content.slug}`, entrypoint });
}

export default function isolatedContentRoutes() {
    return {
        name: 'jjlmoya-isolated-content-routes',
        hooks: {
            'astro:config:setup': ({ injectRoute, logger }) => {
                for (const route of appRoutes) {
                    injectRoute({ ...route, prerender: true });
                }
                logger.info(`Injected 0 utility runtimes, 0 category runtimes and ${appRuntimes.length} app runtimes`);
            },
            'astro:build:done': ({ dir, logger }) => {
                appendHreflangSitemap(dir, logger);
            },
        },
    };
}
