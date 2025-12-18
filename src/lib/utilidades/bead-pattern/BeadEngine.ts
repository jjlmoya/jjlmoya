export interface BeadColor {
    r: number;
    g: number;
    b: number;
    hex: string;
}

export interface BeadPattern {
    grid: BeadColor[][];
    palette: BeadColor[];
    width: number;
    height: number;
}

export class BeadEngine {
    
    public static async processImage(
        img: HTMLImageElement,
        gridWidth: number,
        maxColors: number = 8
    ): Promise<BeadPattern> {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        
        const aspectRatio = img.height / img.width;
        const gridHeight = Math.round(gridWidth * aspectRatio);

        canvas.width = gridWidth;
        canvas.height = gridHeight;

        
        ctx.drawImage(img, 0, 0, gridWidth, gridHeight);
        const imageData = ctx.getImageData(0, 0, gridWidth, gridHeight);
        const pixels = imageData.data;

        
        const rawColors: BeadColor[] = [];
        for (let i = 0; i < pixels.length; i += 4) {
            rawColors.push({
                r: pixels[i],
                g: pixels[i + 1],
                b: pixels[i + 2],
                hex: this.rgbToHex(pixels[i], pixels[i + 1], pixels[i + 2])
            });
        }

        
        
        const palette = this.extractPalette(rawColors, maxColors);

        
        const grid: BeadColor[][] = [];
        for (let y = 0; y < gridHeight; y++) {
            const row: BeadColor[] = [];
            for (let x = 0; x < gridWidth; x++) {
                const pixel = rawColors[y * gridWidth + x];
                const closestColor = this.findClosestColor(pixel, palette);
                row.push(closestColor);
            }
            grid.push(row);
        }

        return {
            grid,
            palette,
            width: gridWidth,
            height: gridHeight
        };
    }

    private static extractPalette(colors: BeadColor[], max: number): BeadColor[] {
        
        const counts: Record<string, number> = {};
        colors.forEach(c => {
            counts[c.hex] = (counts[c.hex] || 0) + 1;
        });

        return Object.keys(counts)
            .sort((a, b) => counts[b] - counts[a])
            .slice(0, max)
            .map(hex => this.hexToRgb(hex));
    }

    private static findClosestColor(target: BeadColor, palette: BeadColor[]): BeadColor {
        let minDistance = Infinity;
        let closest = palette[0];

        for (const color of palette) {
            const dist = Math.sqrt(
                Math.pow(target.r - color.r, 2) +
                Math.pow(target.g - color.g, 2) +
                Math.pow(target.b - color.b, 2)
            );
            if (dist < minDistance) {
                minDistance = dist;
                closest = color;
            }
        }
        return closest;
    }

    private static rgbToHex(r: number, g: number, b: number): string {
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }

    private static hexToRgb(hex: string): BeadColor {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b, hex };
    }
}
