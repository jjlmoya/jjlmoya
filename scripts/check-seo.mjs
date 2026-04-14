import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const utilsDir = path.resolve(__dirname, '../../../');

function getAllSeoFiles(dir) {
  const seoFiles = [];

  function walkDir(currentPath) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const item of items) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue;

      const fullPath = path.join(currentPath, item.name);

      if (item.isDirectory()) {
        walkDir(fullPath);
      } else if (item.name === 'seo.astro') {
        seoFiles.push(fullPath);
      }
    }
  }

  walkDir(dir);
  return seoFiles;
}

function checkSeoFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  const hasDefaultLocale = /const\s*{\s*locale\s*=\s*['"]es['"]|locale\?\s*:\s*KnownLocale/.test(content);

  if (!hasDefaultLocale) {
    return {
      path: filePath,
      status: 'FAIL',
      reason: 'Missing locale default or optional locale'
    };
  }

  return {
    path: filePath,
    status: 'OK'
  };
}

const results = [];
const utilsDirs = fs.readdirSync(utilsDir).filter(d =>
  d.startsWith('jjlmoya-utils-') &&
  fs.statSync(path.join(utilsDir, d)).isDirectory()
);

for (const dir of utilsDirs) {
  const fullPath = path.join(utilsDir, dir);
  const seoFiles = getAllSeoFiles(fullPath);

  for (const seoFile of seoFiles) {
    const result = checkSeoFile(seoFile);
    results.push({
      lib: dir,
      ...result
    });
  }
}

const failures = results.filter(r => r.status === 'FAIL');
const passes = results.filter(r => r.status === 'OK');

console.log(`\n✅ SEO Files Check Results`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`Total: ${results.length}`);
console.log(`✅ OK: ${passes.length}`);
console.log(`❌ FAIL: ${failures.length}\n`);

if (failures.length > 0) {
  console.log('❌ Files with issues:\n');
  failures.forEach(f => {
    console.log(`  📁 ${f.lib}`);
    console.log(`     ${path.relative(utilsDir, f.path)}`);
    console.log(`     Reason: ${f.reason}\n`);
  });
  process.exit(1);
} else {
  console.log('✅ All SEO files are properly configured!\n');
  process.exit(0);
}
