import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function camelCase(str) {
    return str.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
}

function kebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function normalizeMfeName(input) {
    let clean = input.trim();
    if (clean.startsWith('@jjlmoya/utils-')) {
        clean = clean.replace('@jjlmoya/utils-', '');
    } else if (clean.startsWith('utils-')) {
        clean = clean.replace('utils-', '');
    }
    return clean;
}

function main() {
    const rawInput = process.argv[2];
    if (!rawInput) {
        console.error('Uso: npm run mfe:add <nombre-del-mfe>');
        process.exit(1);
    }

    const key = normalizeMfeName(rawInput);
    const packageName = `@jjlmoya/utils-${key}`;
    const camelName = camelCase(key);

    const pkgPath = 'package.json';
    if (existsSync(pkgPath)) {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
        const hasDep = pkg.dependencies?.[packageName] || pkg.devDependencies?.[packageName];
        if (!hasDep) {
            console.log(`La dependencia ${packageName} no está en package.json. Añadiéndola a dependencies...`);
            pkg.dependencies = pkg.dependencies || {};
            pkg.dependencies[packageName] = 'latest';
            writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n');
        }
    }

    const isWebsite = existsSync('src/data/utilities/registry.ts');

    if (isWebsite) {
        const categoryFilePath = join('src/data/utilities/categories', `${key}.ts`);
        if (!existsSync(categoryFilePath)) {
            const categoryContent = `import { ${camelName}Category as entry } from '${packageName}/data';
import { ALL_ENTRIES } from '${packageName}/entries';
import type { CategoryDefinition } from '../types';

const categoryColor = "#0284c7";

export const ${camelName}: CategoryDefinition = {
    key: "${key}",
    packageName: "${packageName}",
    entry,
    theme: "sky",
    toolsWithColors: ALL_ENTRIES.map(toolEntry => ({ toolEntry, color: categoryColor })),
};
`;
            writeFileSync(categoryFilePath, categoryContent);
            console.log(`Creado archivo ${categoryFilePath}`);
        }

        const registryPath = 'src/data/utilities/registry.ts';
        let registryContent = readFileSync(registryPath, 'utf8');
        if (!registryContent.includes(`from './categories/${key}'`)) {
            const importLine = `import { ${camelName} } from './categories/${key}';\n`;
            registryContent = importLine + registryContent;

            const categoryMatch = registryContent.match(/export const CATEGORIES: CategoryDefinition\[\] = \[\s*/);
            if (categoryMatch) {
                const insertIndex = categoryMatch.index + categoryMatch[0].length;
                registryContent = registryContent.slice(0, insertIndex) + `    ${camelName},\n` + registryContent.slice(insertIndex);
            }
            writeFileSync(registryPath, registryContent);
            console.log(`Actualizado ${registryPath}`);
        }
    } else {
        const loaderPath = join('src/i18n/loaders', `${key}.ts`);
        if (!existsSync(loaderPath)) {
            const loaderContent = `export const CategorySEO = () => import("${packageName}/category-seo").then(module => module.default);\n`;
            writeFileSync(loaderPath, loaderContent);
            console.log(`Creado archivo ${loaderPath}`);
        }

        const registryPath = 'src/i18n/toolRegistry.ts';
        let registryContent = readFileSync(registryPath, 'utf8');
        if (!registryContent.includes(`from "${packageName}/data"`)) {
            const importLines = `import { ${camelName}Category } from "${packageName}/data";\nimport { ALL_ENTRIES as ${camelName}CategoryEntries } from "${packageName}/entries";\n`;
            
            const interfaceIndex = registryContent.indexOf('export interface ToolEntry');
            if (interfaceIndex !== -1) {
                registryContent = registryContent.slice(0, interfaceIndex) + importLines + registryContent.slice(interfaceIndex);
            } else {
                registryContent = importLines + registryContent;
            }

            const registerLine = `register(${camelName}Category, "${key}", "#0284c7", "${packageName}", ${camelName}CategoryEntries);\n`;
            const mfeIndex = registryContent.indexOf('export const MFE_UTILITY_KEYS');
            if (mfeIndex !== -1) {
                registryContent = registryContent.slice(0, mfeIndex) + registerLine + '\n' + registryContent.slice(mfeIndex);
            } else {
                registryContent += '\n' + registerLine;
            }

            writeFileSync(registryPath, registryContent);
            console.log(`Actualizado ${registryPath}`);
        }
    }

    console.log(`MFE ${key} (${packageName}) añadido correctamente.`);
}

main();
