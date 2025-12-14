const fs = require('fs');
const path = require('path');


const dir = path.join(__dirname, 'src/components/conceptos/escala-de-grises/slides');


fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (!file.endsWith('.astro')) return;

        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        
        
        
        
        
        const spanRegex = /<span[\s\S]*?class="[\s\S]*?backdrop-blur-md[\s\S]*?"[\s\S]*?>\s*([\s\S]*?)\s*<\/span\s*>/i;
        
        const match = content.match(spanRegex);
        
        if (match) {
            let theme = match[1].trim(); 

            
            if (content.includes(`theme="${theme}"`)) {
                
                const cleaned = content.replace(spanRegex, '');
                if (cleaned !== content) {
                     fs.writeFileSync(filePath, cleaned, 'utf8');
                     console.log(`Cleaned leftover span in ${file}`);
                }
                return;
            }
            
            
            
            let newContent = content.replace(
                /(<NuanceSlide\s+[^>]*?)(\s*>)/, 
                `$1 theme="${theme}"$2`
            );
            
            
            newContent = newContent.replace(spanRegex, '');
            
            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Migrated ${file}: theme="${theme}"`);
            }
        }
    });
});
