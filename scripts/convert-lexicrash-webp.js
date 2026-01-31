import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const sourceDir = './public/assets/apps/lexi-crash';

async function convertToWebP() {
    const files = await readdir(sourceDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    console.log(`Found ${pngFiles.length} PNG files to convert`);

    for (const file of pngFiles) {
        const inputPath = join(sourceDir, file);
        const outputPath = join(sourceDir, file.replace('.png', '.webp'));

        console.log(`Converting ${file}...`);

        await sharp(inputPath)
            .webp({ quality: 90 })
            .toFile(outputPath);

        console.log(`✓ Created ${file.replace('.png', '.webp')}`);
    }

    console.log('\n✅ All images converted to WebP!');
}

convertToWebP().catch(console.error);
