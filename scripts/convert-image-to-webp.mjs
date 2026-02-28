import sharp from 'sharp';
import fs from 'fs';
import path from 'path';


const args = process.argv.slice(2);
if (args.length < 2) {
    console.error("Usage: node scripts/convert-image-to-webp.mjs <input-path> <output-path>");
    process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1];

async function convertImage() {
    try {
        if (!fs.existsSync(inputPath)) {
            console.error(`Error: Input file does not exist at ${inputPath}`);
            process.exit(1);
        }

        
        const outDir = path.dirname(outputPath);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        await sharp(inputPath)
            .webp({ quality: 90 })
            .toFile(outputPath);

        console.log(`Successfully converted. Saved to: ${outputPath}`);
    } catch (err) {
        console.error("Failed executing sharp:", err);
        process.exit(1);
    }
}

convertImage();
