import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ALL_APP_ENTRIES } from '@jjlmoya/apps/data';
import { CATEGORIES } from '../i18n/toolRegistry.ts';

const require = createRequire(import.meta.url);
const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
const generatedRoot = join(projectRoot, '.astro', 'runtime-routes');

function categoryExportName(packageName) {
    const dataSource = readFileSync(join(resolvePackageRoot(packageName), 'src', 'data.ts'), 'utf8');
    const exportedConst = [...dataSource.matchAll(/export\s+const\s+([A-Za-z_$][\w$]*Category)\b/g)]
        .map(match => match[1]);
    if (exportedConst.length > 0) return exportedConst.at(-1);

    const categoryExports = dataSource.match(/export\s*{([^}]+)}\s*from\s*['"]\.\/category['"]/)?.[1]
        .split(',')
        .map(value => value.trim().split(/\s+as\s+/).at(-1))
        .filter(name => name?.endsWith('Category')) ?? [];
    if (categoryExports.length === 0) throw new Error(`${packageName}/data does not export a category entry`);
    return categoryExports[0];
}

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

function utilityAdapter(runtime, category) {
    const entryExport = categoryExportName(category.packageName);
    return `---\nimport RuntimeUtilityRoute from '../../src/routes/utilities/RuntimeUtilityRoute.astro';\nimport { ${runtime.exportName} } from '${runtime.packageName}/runtime/${runtime.subpath}';\nimport { ${entryExport} as categoryEntry } from '${category.packageName}/data';\nimport { ALL_ENTRIES as categoryEntries } from '${category.packageName}/entries';\n---\n\n<RuntimeUtilityRoute tool={${runtime.exportName}} {categoryEntry} {categoryEntries} categoryColor="${category.color}" categoryKey="${category.key}" />\n`;
}

function categoryAdapter(category) {
    const entryExport = categoryExportName(category.packageName);
    return `---\nimport RuntimeCategoryRoute from '../../src/routes/utilities/RuntimeCategoryRoute.astro';\nimport CategorySEO from '${category.packageName}/category-seo';\nimport { ${entryExport} as categoryEntry } from '${category.packageName}/data';\nimport { ALL_ENTRIES as categoryEntries } from '${category.packageName}/entries';\n---\n\n<RuntimeCategoryRoute {CategorySEO} {categoryEntry} {categoryEntries} categoryColor="${category.color}" categoryKey="${category.key}" />\n`;
}

function appAdapter(runtime) {
    return `---\nimport RuntimeAppRoute from '../../src/routes/apps/RuntimeAppRoute.astro';\nimport { ${runtime.exportName} } from '${runtime.packageName}/runtime/${runtime.subpath}';\n---\n\n<RuntimeAppRoute app={${runtime.exportName}} />\n`;
}

const utilityRuntimeGroups = CATEGORIES.map(category => ({
    category,
    runtimes: discoverRuntimes(category.packageName, 'tool', category.tools, '_TOOL'),
}));
const appRuntimes = discoverRuntimes('@jjlmoya/apps', 'app', ALL_APP_ENTRIES, '_APP');

const utilityRoutes = [];
for (const { category, runtimes } of utilityRuntimeGroups) {
    for (const runtime of runtimes) {
        const entrypoint = writeGeneratedRoute(
            `${category.key}-${runtime.subpath.replaceAll(/[^a-zA-Z0-9-]/g, '-')}.astro`,
            utilityAdapter(runtime, category),
        );
        const loader = runtime.entry.i18n.es ?? runtime.entry.i18n.en;
        if (!loader) throw new Error(`Missing Spanish locale for ${runtime.entry.id}`);
        const content = await loader();
        utilityRoutes.push({ pattern: `/utilidades/${content.slug}`, entrypoint });
    }
}

const categoryRoutes = [];
for (const category of CATEGORIES) {
    const entrypoint = writeGeneratedRoute(
        `category-${category.key}.astro`,
        categoryAdapter(category),
    );
    const loader = category.entry.i18n.es ?? category.entry.i18n.en;
    if (!loader) throw new Error(`Missing Spanish category locale for ${category.key}`);
    const content = await loader();
    categoryRoutes.push({ pattern: `/utilidades/categorias/${content.slug}`, entrypoint });
}

const appRoutes = [];
for (const runtime of appRuntimes) {
    const entrypoint = writeGeneratedRoute(`app-${runtime.subpath.replaceAll(/[^a-zA-Z0-9-]/g, '-')}.astro`, appAdapter(runtime));
    const loader = runtime.entry.i18n.es ?? runtime.entry.i18n.en;
    if (!loader) throw new Error(`Missing Spanish locale for ${runtime.entry.id}`);
    const content = await loader();
    appRoutes.push({ pattern: `/apps/${content.slug}`, entrypoint });
}

export default function isolatedContentRoutes() {
    const utilityCount = utilityRuntimeGroups.reduce((total, group) => total + group.runtimes.length, 0);
    return {
        name: 'jjlmoya-isolated-content-routes',
        hooks: {
            'astro:config:setup': ({ injectRoute, logger }) => {
                for (const route of [...utilityRoutes, ...categoryRoutes, ...appRoutes]) {
                    injectRoute({ ...route, prerender: true });
                }
                logger.info(`Injected ${utilityCount} utility runtimes, ${categoryRoutes.length} category runtimes and ${appRuntimes.length} app runtimes`);
            },
        },
    };
}
