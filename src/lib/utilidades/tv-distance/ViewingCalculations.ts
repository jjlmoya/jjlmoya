
export interface TVSpecs {
    diagonalInches: number;
    resolution: '1080p' | '4k' | '8k';
    aspectRatio: number;
}

export interface ViewingDistance {
    optimal: number;
    min: number;
    max: number;
}

export class ViewingCalculations {
    public static getDimensionsFromDiagonal(diagonalInches: number, aspectRatio: number = 16 / 9): { width: number, height: number } {
        const diagonalCm = diagonalInches * 2.54;
        const angle = Math.atan(1 / aspectRatio);
        const height = diagonalCm * Math.sin(angle);
        const width = diagonalCm * Math.cos(angle);
        return { width, height };
    }

    public static getDistanceByAngle(widthCm: number, fieldOfViewDegrees: number): number {
        const fovRadians = (fieldOfViewDegrees * Math.PI) / 180;
        return widthCm / (2 * Math.tan(fovRadians / 2));
    }

    public static calculate(specs: TVSpecs): ViewingDistance {
        const { width: widthCm } = this.getDimensionsFromDiagonal(specs.diagonalInches);

        
        const thxDistance = this.getDistanceByAngle(widthCm, 40) / 100;
        const smpteDistance = this.getDistanceByAngle(widthCm, 30) / 100;

        
        let visualAcuityMultiplier = 1;
        if (specs.resolution === '4k') visualAcuityMultiplier = 1.5;
        if (specs.resolution === '8k') visualAcuityMultiplier = 2.5;
        if (specs.resolution === '1080p') visualAcuityMultiplier = 1.0;

        
        
        const resAdjustedOptimal = thxDistance / (visualAcuityMultiplier * 0.8 + 0.2);

        return {
            optimal: resAdjustedOptimal,
            min: resAdjustedOptimal * 0.8,
            max: smpteDistance
        };
    }
}
