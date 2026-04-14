import fs from 'fs';
import path from 'path';

const results = {
  utilities: { ok: [], missing: [] },
  categories: { ok: [], missing: [] }
};

function checkSEO(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  const hasSEO =
    /class=["'][^"']*seo/i.test(content) ||
    /data-seo/i.test(content) ||
    /Preguntas Frecuentes|FAQ|How to|Cómo|Paso|step/i.test(content);

  return hasSEO;
}

function scanDirectory(dirPath, type) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const indexPath = path.join(dirPath, entry.name, 'index.html');

      if (fs.existsSync(indexPath)) {
        const hasSEO = checkSEO(indexPath);

        if (hasSEO) {
          results[type].ok.push(entry.name);
        } else {
          results[type].missing.push(entry.name);
        }
      }
    }
  });
}

scanDirectory('./dist/client/utilidades', 'utilities');
scanDirectory('./dist/client/utilidades/categorias', 'categories');

console.log(`\n✅ SEO Content Verification (Build)\n`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

console.log(`\n📚 UTILITIES:`);
console.log(`   Total: ${results.utilities.ok.length + results.utilities.missing.length}`);
console.log(`   ✅ With SEO: ${results.utilities.ok.length}`);
console.log(`   ❌ Missing SEO: ${results.utilities.missing.length}`);

console.log(`\n📂 CATEGORIES:`);
console.log(`   Total: ${results.categories.ok.length + results.categories.missing.length}`);
console.log(`   ✅ With SEO: ${results.categories.ok.length}`);
console.log(`   ❌ Missing SEO: ${results.categories.missing.length}`);

const totalMissing = results.utilities.missing.length + results.categories.missing.length;

if (totalMissing > 0) {
  console.log(`\n❌ Missing SEO in:\n`);
  if (results.utilities.missing.length > 0) {
    console.log(`   Utilities:`);
    results.utilities.missing.forEach(name => console.log(`     - ${name}`));
  }
  if (results.categories.missing.length > 0) {
    console.log(`   Categories:`);
    results.categories.missing.forEach(name => console.log(`     - ${name}`));
  }
  console.log();
  process.exit(1);
} else {
  console.log(`\n✅ All utilities and categories have SEO content!\n`);
  process.exit(0);
}
