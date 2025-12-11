const fs = require('fs');
const path = require('path');

// Target directory
const dir = path.join(__dirname, 'src/components/conceptos/escala-de-grises/slides');

// Process
fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (!file.endsWith('.astro')) return;

        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Robust Regex to match the manual span we used in most components
        // Accounts for newlines/spaces between attributes and content
        // Looking for the "backdrop-blur-md" class as the key identifier
        // Regex logic:
        // <span [anything] class="[anything]backdrop-blur-md[anything]" [anything] > [whitespace] (CAPTURE) [whitespace] </span>
        const spanRegex = /<span[\s\S]*?class="[\s\S]*?backdrop-blur-md[\s\S]*?"[\s\S]*?>\s*([\s\S]*?)\s*<\/span\s*>/i;
        
        const match = content.match(spanRegex);
        
        if (match) {
            let theme = match[1].trim(); // Captured text (e.g., "Educación")

            // idempotency check: don't double add theme
            if (content.includes(`theme="${theme}"`)) {
                // just delete span if it still exists (cleanup)
                const cleaned = content.replace(spanRegex, '');
                if (cleaned !== content) {
                     fs.writeFileSync(filePath, cleaned, 'utf8');
                     console.log(`Cleaned leftover span in ${file}`);
                }
                return;
            }
            
            // 1. Add theme="..." prop to <NuanceSlide ... >
            // Find the opening tag and inject the prop
            let newContent = content.replace(
                /(<NuanceSlide\s+[^>]*?)(\s*>)/, 
                `$1 theme="${theme}"$2`
            );
            
            // 2. Remove the manual span
            newContent = newContent.replace(spanRegex, '');
            
            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Migrated ${file}: theme="${theme}"`);
            }
        }
    });
});
