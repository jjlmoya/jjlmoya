import fs from 'fs';
import path from 'path';

const UTILITIES_DIR = path.resolve('src/data/utilities');
const PAGES_DIR = path.resolve('src/pages/utilidades');

interface UtilityInfo {
    title: string;
    slug: string;
    migrated: boolean;
    tailwind: boolean | null;
}

function getMainToolComponentPaths(astroContent: string, astroFilePath: string): string[] {
    const paths: string[] = [];
    const importRegex = /import\s+(\w+)\s+from\s+["']([^"']+)["']/g;
    let match;
    
    // Lista de componentes que NO son la herramienta principal
    const blacklistedNames = ['LayoutUtility', 'UtilityHeader', 'Bibliography', 'FAQ', 'HowTo', 'LibraryUtilityLayout'];

    while ((match = importRegex.exec(astroContent)) !== null) {
        const componentName = match[1];
        const importPath = match[2];
        
        if (blacklistedNames.includes(componentName) || componentName.endsWith('SEO')) continue;

        if (importPath.startsWith('.') || importPath.startsWith('/')) {
             const fullPath = path.resolve(path.dirname(astroFilePath), importPath);
             if (fullPath.includes('src' + path.sep + 'components' + path.sep + 'utilidades')) {
                 paths.push(fullPath);
                 if (!fullPath.endsWith('.astro')) {
                      if (fs.existsSync(fullPath + '.astro')) paths.push(fullPath + '.astro');
                 }
             }
        }
    }
    return paths;
}

function checkTailwind(content: string): boolean {
    const twPatterns = [
        /\b(?:bg|text|p|m|w|h|gap|rounded|shadow|border|opacity|z|leading|tracking|top|left|right|bottom)-[a-z0-9]/,
        /\b(?:flex|grid|block|inline|hidden|relative|absolute|fixed|sticky)\b/,
        /[a-z]+:([a-z0-9-]+)/
    ];
    
    const classMatches = content.match(/class(?:Name)?=["'`]([^"'`]+)["'`](?:\s*|(?=\/|>|}))/g);
    if (!classMatches) return false;
    
    let score = 0;
    for (const match of classMatches) {
        const classesStr = match.split(/["'`]/)[1];
        const classes = classesStr.split(/\s+/);
        for (const c of classes) {
            if (twPatterns.some(p => p.test(c))) {
                score++;
            }
        }
    }
    return score > 2;
}

async function run() {
    const files = fs.readdirSync(UTILITIES_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
    
    const categories: Record<string, UtilityInfo[]> = {};

    for (const file of files) {
        const filePath = path.join(UTILITIES_DIR, file);
        const dataContent = fs.readFileSync(filePath, 'utf8');
        
        const titleMatch = dataContent.match(/title:\s*"([^"]+)"/);
        const categoryTitle = titleMatch ? titleMatch[1] : file.replace('.ts', '');
        
        const utilities: UtilityInfo[] = [];
        const utilityBlockRegex = /\{[\s\S]*?href:\s*['"]\/utilidades\/([^/]+)\/['"][\s\S]*?\}/g;
        let match;
        while ((match = utilityBlockRegex.exec(dataContent)) !== null) {
            const block = match[0];
            const slug = match[1];
            
            const tMatch = block.match(/title:\s*([^,\n}]+)/);
            let title = tMatch ? tMatch[1].replace(/['"`]/g, '').trim() : slug;
            if (title.includes('.') || title.length > 50) {
                 title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            }

            const astroPath = path.join(PAGES_DIR, `${slug}.astro`);
            if (fs.existsSync(astroPath)) {
                const astroContent = fs.readFileSync(astroPath, 'utf8');
                
                const isMigrated = astroContent.includes('@jjlmoya/utils-') || 
                                 astroContent.includes('LibraryUtilityLayout') ||
                                 dataContent.includes('@jjlmoya/utils-');
                
                let usesTailwind = false;
                if (!isMigrated) {
                    const toolComponents = getMainToolComponentPaths(astroContent, astroPath);
                    
                    if (toolComponents.length === 0) {
                        // Si no hay componentes importados (raro), miramos el propio Astro
                        usesTailwind = checkTailwind(astroContent);
                    } else {
                        for (const cp of toolComponents) {
                            if (fs.existsSync(cp)) {
                                const compContent = fs.readFileSync(cp, 'utf8');
                                if (checkTailwind(compContent)) {
                                    usesTailwind = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                utilities.push({
                    title,
                    slug,
                    migrated: !!isMigrated,
                    tailwind: isMigrated ? null : usesTailwind
                });
            }
        }

        if (utilities.length > 0) {
            categories[categoryTitle] = (categories[categoryTitle] || []).concat(utilities);
        }
    }

    // Informe final
    console.log('\x1b[1m\n=================================================');
    console.log('       LISTADO DE UTILIDADES POR CATEGORÍA       ');
    console.log('=================================================\x1b[0m\n');

    let total = 0;
    let migratedCount = 0;
    let notMigratedTWCount = 0;
    let notMigratedNoTWCount = 0;

    const sortedCategories = Object.keys(categories).sort();

    for (const category of sortedCategories) {
        const utils = categories[category];
        console.log(`\x1b[1m\x1b[44m\x1b[37m 📂 ${category.toUpperCase().padEnd(45)} \x1b[0m`);
        
        const migrated = utils.filter(u => u.migrated);
        const notMigratedTW = utils.filter(u => !u.migrated && u.tailwind);
        const notMigratedNoTW = utils.filter(u => !u.migrated && !u.tailwind);

        if (migrated.length > 0) {
            console.log('  \x1b[32m✅ MIGRATED A LIBRERÍA:\x1b[0m');
            migrated.forEach(u => {
                console.log(`     - ${u.title.padEnd(40)} [${u.slug}]`);
                migratedCount++;
            });
        }

        if (notMigratedTW.length > 0 || notMigratedNoTW.length > 0) {
            console.log('  \x1b[33m❌ NO MIGRATED:\x1b[0m');
            
            if (notMigratedTW.length > 0) {
                console.log('     \x1b[36m🔹 Con Tailwind:\x1b[0m');
                notMigratedTW.forEach(u => {
                    console.log(`        - ${u.title.padEnd(37)} [${u.slug}]`);
                    notMigratedTWCount++;
                });
            }
            
            if (notMigratedNoTW.length > 0) {
                console.log('     \x1b[35m🔸 Sin Tailwind:\x1b[0m');
                notMigratedNoTW.forEach(u => {
                    console.log(`        - ${u.title.padEnd(37)} [${u.slug}]`);
                    notMigratedNoTWCount++;
                });
            }
        }
        console.log('');
        total += utils.length;
    }

    console.log('\x1b[1m=================================================');
    console.log(`TOTAL UTILIDADES: ${total}`);
    console.log(`\x1b[32m✅ Migradas:     ${migratedCount}\x1b[0m`);
    console.log(`\x1b[33m❌ No Migradas:  ${notMigratedTWCount + notMigratedNoTWCount}\x1b[0m`);
    console.log(`   \x1b[36m- Con Tailwind: ${notMigratedTWCount}\x1b[0m`);
    console.log(`   \x1b[35m- Sin Tailwind: ${notMigratedNoTWCount}\x1b[0m`);
    console.log('=================================================\x1b[0m\n');
}

run();
