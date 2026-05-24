import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function getFiles(dirPath, files = []) {
    if (!fs.existsSync(dirPath)) return files;
    const list = fs.readdirSync(dirPath);
    for (const item of list) {
        const full = path.join(dirPath, item);
        if (fs.statSync(full).isDirectory()) {
            getFiles(full, files);
        } else {
            files.push(full);
        }
    }
    return files;
}

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

async function main() {
    const allFiles = getFiles(PUBLIC_DIR);
    const images = allFiles.filter(f => EXTENSIONS.includes(path.extname(f).toLowerCase()));
    
    let optimizedCount = 0;
    
    for (const img of images) {
        const stats = fs.statSync(img);
        if (stats.size > 600 * 1024) {
            console.log(`Optimizing ${path.relative(PUBLIC_DIR, img)}: ${(stats.size / 1024).toFixed(2)} KB`);
            const buffer = fs.readFileSync(img);
            
            let pipeline = sharp(buffer);
            
            const metadata = await pipeline.metadata();
            if (metadata.width && metadata.width > 1200) {
                pipeline = pipeline.resize(1200);
            }
            
                        const ext = path.extname(img).toLowerCase();
            
            if (ext === '.webp') {
                await pipeline.webp({ quality: 80 }).toFile(img);
            } else if (ext === '.png') {
                await pipeline.png({ quality: 80 }).toFile(img);
            } else if (ext === '.jpg' || ext === '.jpeg') {
                await pipeline.jpeg({ quality: 80 }).toFile(img);
            } else {
                await pipeline.toFile(img);
            }
            
            const newStats = fs.statSync(img);
            console.log(`Optimized to: ${(newStats.size / 1024).toFixed(2)} KB`);
            optimizedCount++;
        }
    }
    
    console.log(`Finished optimization. Optimized ${optimizedCount} images.`);
}

main();
