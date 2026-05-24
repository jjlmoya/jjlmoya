import fs from 'fs';
import path from 'path';

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
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp'];

function formatSize(bytes) {
    return (bytes / 1024).toFixed(2) + ' KB';
}

function main() {
    const allFiles = getFiles(PUBLIC_DIR);
    const images = allFiles.filter(f => EXTENSIONS.includes(path.extname(f).toLowerCase()));
    
    let totalSize = 0;
    let largeCount = 0;
    const results = [];

    for (const img of images) {
        const size = fs.statSync(img).size;
        totalSize += size;
        const relativePath = path.relative(PUBLIC_DIR, img);
        const sizeText = formatSize(size);
        const tooLarge = size > 600 * 1024;
        if (tooLarge) {
            largeCount++;
        }
        results.push({ path: relativePath, size, sizeText, tooLarge });
    }

    results.sort((a, b) => b.size - a.size);

    console.log('\n--- IMAGES EXCEEDING 600 KB ---');
    results.filter(r => r.tooLarge).forEach(r => {
        console.log(`${r.path} -> ${r.sizeText}`);
    });

    console.log('\n--- ALL IMAGES ---');
    results.forEach(r => {
        const marker = r.tooLarge ? '[WARNING] ' : '';
        console.log(`${marker}${r.path} -> ${r.sizeText}`);
    });

    console.log('\n--- SUMMARY ---');
    console.log(`Total images: ${images.length}`);
    console.log(`Images exceeding 600 KB: ${largeCount}`);
    console.log(`Total size: ${formatSize(totalSize)}`);
}

main();
