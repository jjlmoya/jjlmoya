import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import sharp from "sharp";

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== "node_modules" && file !== ".git" && file !== "dist") {
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

const PUBLIC_DIR = path.resolve(__dirname, "../public");
const SRC_DIR = path.resolve(__dirname, "../src");

describe("Image Assets Integrity", () => {
    it("should only contain WebP images in public/ (except .ico and .svg)", async () => {
        const files = getAllFiles(PUBLIC_DIR);

        const validDataFiles = files.filter((f) => !path.basename(f).startsWith("."));

        const errors: string[] = [];
        const checkedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp"];

        for (const file of validDataFiles) {
            const ext = path.extname(file).toLowerCase();

            if (checkedExtensions.includes(ext)) {
                if (ext !== ".webp") {
                    errors.push(
                        `File ${path.relative(PUBLIC_DIR, file)} has invalid extension '${ext}'. Should be '.webp'.`
                    );
                } else {
                    try {
                        const metadata = await sharp(file).metadata();
                        if (metadata.format !== "webp") {
                            errors.push(
                                `File ${path.relative(PUBLIC_DIR, file)} has extension .webp but is actually ${metadata.format}.`
                            );
                        }
                    } catch (err: any) {
                        errors.push(
                            `Could not read metadata for ${path.relative(PUBLIC_DIR, file)}: ${err.message}`
                        );
                    }
                }
            }
        }

        expect(
            errors,
            `Found ${errors.length} image issues in public/:\n${errors.join("\n")}`
        ).toEqual([]);
    });

    it("should not reference non-webp images in src/** code", () => {
        const files = getAllFiles(SRC_DIR);
        const errors: string[] = [];

        const forbiddenPatterns = [/\.png/i, /\.jpg/i, /\.jpeg/i, /\.gif/i, /\.bmp/i];

        for (const file of files) {
            if ([".webp", ".ico", ".png", ".jpg"].includes(path.extname(file).toLowerCase()))
                continue;

            const content = fs.readFileSync(file, "utf8");
            const lines = content.split("\n");

            lines.forEach((line, index) => {
                if (line.includes("http://") || line.includes("https://")) return;

                forbiddenPatterns.forEach((pattern) => {
                    if (pattern.test(line)) {
                        errors.push(
                            `File ${path.relative(SRC_DIR, file)}:${index + 1} references forbidden image format: ${line.trim()}`
                        );
                    }
                });
            });
        }

        expect(
            errors,
            `Found ${errors.length} forbidden image references in src/:\n${errors.join("\n")}`
        ).toEqual([]);
    });
});
