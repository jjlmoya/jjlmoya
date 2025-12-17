export interface CutRequest {
    id: string;
    length: number;
    width?: number;
    quantity: number;
}

export interface StockDefinition {
    length: number;
    width?: number;
    quantity?: number;
}

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface OptimizedStock {
    stockId: number;
    stockLength: number;
    stockWidth?: number;
    cuts: (number | Rect)[];
    waste: number;
    utilization: number;
}

export interface OptimizationResult {
    totalStockUsed: number;
    totalWaste: number;
    totalCuts: number;
    stockPieces: OptimizedStock[];
}

export class CutOptimizerService {
    public static optimize1D(
        cuts: CutRequest[],
        stockLength: number,
        kerf: number = 0
    ): OptimizationResult {
        const allCuts: number[] = [];
        cuts.forEach(req => {
            for (let i = 0; i < req.quantity; i++) {
                allCuts.push(req.length);
            }
        });

        allCuts.sort((a, b) => b - a);

        const stockPieces: OptimizedStock[] = [];

        for (const cutLength of allCuts) {
            if (cutLength > stockLength) {
                continue;
            }

            let bestFitIndex = -1;
            let minWaste = Infinity;

            for (let i = 0; i < stockPieces.length; i++) {
                const piece = stockPieces[i];
                
                const currentCuts = piece.cuts as number[];

                const currentUsed = currentCuts.reduce((a, b) => a + b, 0) + (currentCuts.length > 0 ? (currentCuts.length - 1) * kerf : 0);
                const currentRemaining = stockLength - currentUsed;
                const spaceRequired = currentCuts.length > 0 ? kerf + cutLength : cutLength;

                if (currentRemaining >= spaceRequired) {
                    const potentialRemaining = currentRemaining - spaceRequired;
                    if (potentialRemaining < minWaste) {
                        minWaste = potentialRemaining;
                        bestFitIndex = i;
                    }
                }
            }

            if (bestFitIndex !== -1) {
                (stockPieces[bestFitIndex].cuts as number[]).push(cutLength);
            } else {
                stockPieces.push({
                    stockId: stockPieces.length + 1,
                    stockLength: stockLength,
                    stockWidth: undefined, 
                    cuts: [cutLength],
                    waste: 0,
                    utilization: 0
                });
            }
        }

        let totalWaste = 0;
        stockPieces.forEach(piece => {
            const currentCuts = piece.cuts as number[];
            const cutsSum = currentCuts.reduce((a, b) => a + b, 0);
            const kerfLoss = currentCuts.length > 1 ? (currentCuts.length - 1) * kerf : 0;
            const usedLength = cutsSum + kerfLoss;
            const remaining = piece.stockLength - usedLength;

            piece.waste = remaining;
            piece.utilization = usedLength / piece.stockLength;
            totalWaste += remaining;
        });

        return {
            totalStockUsed: stockPieces.length,
            totalWaste,
            totalCuts: allCuts.length,
            stockPieces
        };
    }

    public static optimize2D(
        cuts: CutRequest[],
        stockLength: number,
        stockWidth: number,
        kerf: number = 0
    ): OptimizationResult {
        
        const items: { w: number; h: number; id: string }[] = [];
        cuts.forEach(req => {
            for (let i = 0; i < req.quantity; i++) {
                items.push({ w: req.length, h: req.width || 0, id: req.id }); 
            }
        });

        
        items.sort((a, b) => (b.w * b.h) - (a.w * a.h));

        const stockPieces: OptimizedStock[] = [];
        
        const freeRectsMap: Map<number, Rect[]> = new Map();

        items.forEach(item => {
            let placed = false;

            
            for (let i = 0; i < stockPieces.length; i++) {
                const freeRects = freeRectsMap.get(i)!;
                const fit = this.findBestFit(item, freeRects);

                if (fit.index !== -1) {
                    this.placeItem(item, fit.index, fit.rotated, freeRects, kerf);
                    (stockPieces[i].cuts as Rect[]).push(fit.rect);
                    placed = true;
                    break;
                }
            }

            
            if (!placed) {
                const newId = stockPieces.length;
                const initialFreeRect: Rect = { x: 0, y: 0, w: stockLength, h: stockWidth };

                
                const fitsNormal = item.w <= stockLength && item.h <= stockWidth;
                const fitsRotated = item.h <= stockLength && item.w <= stockWidth;

                if (!fitsNormal && !fitsRotated) {
                    
                    return;
                }

                freeRectsMap.set(newId, [initialFreeRect]);
                const newPiece: OptimizedStock = {
                    stockId: newId + 1,
                    stockLength,
                    stockWidth,
                    cuts: [],
                    waste: 0,
                    utilization: 0
                };
                stockPieces.push(newPiece);

                const freeRects = freeRectsMap.get(newId)!;
                
                const rotated = !fitsNormal && fitsRotated;
                
                const w = rotated ? item.h : item.w;
                const h = rotated ? item.w : item.h;

                const placedRect: Rect = { x: 0, y: 0, w, h };
                (newPiece.cuts as Rect[]).push(placedRect);

                
                
                
                
                
                
                
                
                
                

                
                freeRects.splice(0, 1);
                this.splitFreeRect(initialFreeRect, placedRect, freeRects, kerf);
            }
        });

        
        let totalWaste = 0;
        stockPieces.forEach(piece => {
            const currentCuts = piece.cuts as Rect[];
            const usedArea = currentCuts.reduce((acc, c) => acc + (c.w * c.h), 0);
            const totalArea = stockLength * stockWidth;
            piece.utilization = usedArea / totalArea;
            piece.waste = totalArea - usedArea; 
            totalWaste += piece.waste;
        });

        return {
            totalStockUsed: stockPieces.length,
            totalCuts: items.length, 
            totalWaste, 
            stockPieces
        };
    }

    private static findBestFit(item: { w: number, h: number }, freeRects: Rect[]) {
        let bestAreaFit = Infinity;
        let bestShortSideFit = Infinity;
        let index = -1;
        let rotated = false;
        let bestRect: Rect = { x: 0, y: 0, w: 0, h: 0 };

        for (let i = 0; i < freeRects.length; i++) {
            const free = freeRects[i];

            
            if (item.w <= free.w && item.h <= free.h) {
                const leftoverHoriz = Math.abs(free.w - item.w);
                const leftoverVert = Math.abs(free.h - item.h);
                const shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                const areaFit = free.w * free.h - item.w * item.h;

                if (areaFit < bestAreaFit || (areaFit === bestAreaFit && shortSideFit < bestShortSideFit)) {
                    bestAreaFit = areaFit;
                    bestShortSideFit = shortSideFit;
                    index = i;
                    rotated = false;
                    bestRect = { x: free.x, y: free.y, w: item.w, h: item.h };
                }
            }

            
            if (item.h <= free.w && item.w <= free.h) {
                const leftoverHoriz = Math.abs(free.w - item.h);
                const leftoverVert = Math.abs(free.h - item.w);
                const shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                const areaFit = free.w * free.h - item.h * item.w;

                if (areaFit < bestAreaFit || (areaFit === bestAreaFit && shortSideFit < bestShortSideFit)) {
                    bestAreaFit = areaFit;
                    bestShortSideFit = shortSideFit;
                    index = i;
                    rotated = true;
                    bestRect = { x: free.x, y: free.y, w: item.h, h: item.w };
                }
            }
        }

        return { index, rotated, rect: bestRect };
    }

    private static placeItem(item: { w: number, h: number }, rectIndex: number, rotated: boolean, freeRects: Rect[], kerf: number) {
        const freeRect = freeRects[rectIndex];
        const w = rotated ? item.h : item.w;
        const h = rotated ? item.w : item.h;

        
        freeRects.splice(rectIndex, 1);

        const placedRect = { x: freeRect.x, y: freeRect.y, w, h };
        this.splitFreeRect(freeRect, placedRect, freeRects, kerf);
    }

    private static splitFreeRect(freeRect: Rect, placedRect: Rect, freeRects: Rect[], kerf: number) {
        
        

        
        const wRem = freeRect.w - placedRect.w - kerf;
        
        const hRem = freeRect.h - placedRect.h - kerf;

        
        

        if (wRem > 0) {
            freeRects.push({
                x: freeRect.x + placedRect.w + kerf,
                y: freeRect.y,
                w: wRem,
                h: placedRect.h
            });
        }
        if (hRem > 0) {
            freeRects.push({
                x: freeRect.x,
                y: freeRect.y + placedRect.h + kerf,
                w: freeRect.w,
                h: hRem
            });
        }
    }
}
