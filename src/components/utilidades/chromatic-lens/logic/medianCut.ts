export type RGB = [number, number, number];

export interface ColorSwatch {
    rgb: RGB;
    hex: string;
}

function rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

function colorDistSq(c1: RGB, c2: RGB): number {
    return (c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2;
}

export function extractPalette(imageData: Uint8ClampedArray, pixelCount: number, colorCount: number = 5): ColorSwatch[] {
    const pixels: RGB[] = [];

    for (let i = 0; i < imageData.length; i += 4) {
        if (imageData[i + 3] < 128) continue;
        pixels.push([imageData[i], imageData[i + 1], imageData[i + 2]]);
    }

    if (pixels.length === 0) return [];

    const buckets = [pixels];

    while (buckets.length < colorCount) {
        let maxRange = -1;
        let splitIndex = -1;
        let bestChannel: 0 | 1 | 2 = 0;

        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            if (bucket.length === 0) continue;

            let minR = 255, maxR = 0;
            let minG = 255, maxG = 0;
            let minB = 255, maxB = 0;

            for (const p of bucket) {
                if (p[0] < minR) minR = p[0];
                if (p[0] > maxR) maxR = p[0];
                if (p[1] < minG) minG = p[1];
                if (p[1] > maxG) maxG = p[1];
                if (p[2] < minB) minB = p[2];
                if (p[2] > maxB) maxB = p[2];
            }

            const rangeR = maxR - minR;
            const rangeG = maxG - minG;
            const rangeB = maxB - minB;
            const maxDimension = Math.max(rangeR, rangeG, rangeB);

            if (maxDimension > maxRange) {
                maxRange = maxDimension;
                splitIndex = i;
                if (rangeR === maxDimension) bestChannel = 0;
                else if (rangeG === maxDimension) bestChannel = 1;
                else bestChannel = 2;
            }
        }

        if (splitIndex === -1) {
            break;
        }

        const bucketToSplit = buckets[splitIndex];

        bucketToSplit.sort((a, b) => a[bestChannel] - b[bestChannel]);

        const mid = Math.floor(bucketToSplit.length / 2);
        const part1 = bucketToSplit.slice(0, mid);
        const part2 = bucketToSplit.slice(mid);

        buckets.splice(splitIndex, 1, part1, part2);
    }

    return buckets.map(bucket => {
        let r = 0, g = 0, b = 0;
        for (const p of bucket) {
            r += p[0];
            g += p[1];
            b += p[2];
        }
        const count = bucket.length;
        const finalR = Math.round(r / count);
        const finalG = Math.round(g / count);
        const finalB = Math.round(b / count);

        return {
            rgb: [finalR, finalG, finalB],
            hex: rgbToHex(finalR, finalG, finalB)
        };
    });
}
