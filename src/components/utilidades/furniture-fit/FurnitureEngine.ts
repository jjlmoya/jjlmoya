export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface FitResult {
    fits: boolean;
    reason: string;
    clearance: number;
    maxDiagonal: number;
}

export class FurnitureEngine {
    static calculateFit(object: Dimensions, container: Dimensions, margin: number = 2): FitResult {
        const adjW = container.width - margin;
        const adjH = container.height - margin;
        const adjD = container.depth - margin;

        const objDims = [object.width, object.height, object.depth].sort((a, b) => a - b);
        const conDims = [adjW, adjH, adjD].sort((a, b) => a - b);

        if (objDims[0] <= conDims[0] && objDims[1] <= conDims[1] && objDims[2] <= conDims[2]) {
            return {
                fits: true,
                reason: "El mueble cabe perfectamente de forma directa.",
                clearance: Math.min(
                    conDims[0] - objDims[0],
                    conDims[1] - objDims[1],
                    conDims[2] - objDims[2]
                ),
                maxDiagonal: 0,
            };
        }

        const con3DDiagonal = Math.sqrt(adjW ** 2 + adjH ** 2 + adjD ** 2);
        const objMaxLength = Math.max(...objDims);

        const otherTwoObj = objDims.filter((_, i) => i < 2);
        const otherTwoCon = conDims.filter((_, i) => i < 2);

        if (
            objMaxLength <= con3DDiagonal &&
            otherTwoObj[0] <= otherTwoCon[0] &&
            otherTwoObj[1] <= otherTwoCon[1]
        ) {
            return {
                fits: true,
                reason: "Cabe inclinado diagonalmente (Teorema de Pitágoras 3D).",
                clearance: con3DDiagonal - objMaxLength,
                maxDiagonal: con3DDiagonal,
            };
        }

        const diagonals = [
            Math.sqrt(adjW ** 2 + adjH ** 2),
            Math.sqrt(adjW ** 2 + adjD ** 2),
            Math.sqrt(adjH ** 2 + adjD ** 2),
        ];
        const maxPlaneDiag = Math.max(...diagonals);

        if (objMaxLength <= maxPlaneDiag && otherTwoObj[0] <= otherTwoCon[0]) {
            return {
                fits: true,
                reason: "Cabe inclinado en uno de los planos laterales.",
                clearance: maxPlaneDiag - objMaxLength,
                maxDiagonal: maxPlaneDiag,
            };
        }

        return {
            fits: false,
            reason: "El mueble es demasiado grande incluso para entrar en diagonal.",
            clearance: 0,
            maxDiagonal: con3DDiagonal,
        };
    }
}
