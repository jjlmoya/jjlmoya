export interface WaterProfile {
  name: string;
  gh: number;
  kh: number;
  magnesiumRatio: number;
  description: string;
}

export const WATER_PROFILES: WaterProfile[] = [
  {
    name: 'SCA Ideal',
    gh: 68,
    kh: 40,
    magnesiumRatio: 1,
    description: 'El estándar de la Speciality Coffee Association para una extracción equilibrada.'
  },
  {
    name: 'Barista Hustle',
    gh: 80,
    kh: 40,
    magnesiumRatio: 1,
    description: 'Receta popularizada por Matt Perger para resaltar el dulzor y brillo.'
  },
  {
    name: 'Hendon (Hard)',
    gh: 150,
    kh: 40,
    magnesiumRatio: 0.5,
    description: 'Agua más dura para resaltar cuerpo en tuestes claros.'
  },
  {
    name: 'Melbourne',
    gh: 25,
    kh: 15,
    magnesiumRatio: 0.7,
    description: 'Agua muy blanda, ideal para cafés muy delicados y florales.'
  },
  {
    name: 'Londres (Replica)',
    gh: 220,
    kh: 160,
    magnesiumRatio: 0.3,
    description: 'Agua muy dura y alcalina, similar al grifo de Londres.'
  }
];

export interface StockSolution {
  name: string;
  caCO3Equivalent: number;
}


export const SALTS = {
  MAGNESIUM: {
    name: 'Magnesio (Epsom)',
    factor: 2.46,
    defaultConcentration: 2.46
  },
  CALCIUM: {
    name: 'Calcio (CaCl2)',
    factor: 1.47,
    defaultConcentration: 1.47
  },
  BUFFER: {
    name: 'Bicarbonato (Sodio)',
    factor: 1.68,
    defaultConcentration: 1.68
  }
};

export function calculateConcentrateAmount(
  targetMgL_CaCO3: number,
  targetLiters: number,
  stockConcentrationGPer100ml: number,
  saltFactor: number
): number {
  if (stockConcentrationGPer100ml <= 0) return 0;
  
  const mgOfSaltNeeded = targetMgL_CaCO3 * targetLiters * saltFactor;
  const mgPerMl = stockConcentrationGPer100ml * 10;
  
  return mgOfSaltNeeded / mgPerMl;
}

export function getCorrosionRisk(gh: number, kh: number): 'low' | 'medium' | 'high' {
  if (kh < 20 || gh < 20) return 'high';
  if (kh > 80 && gh > 150) return 'low';
  return 'medium';
}

export function getLimescaleRisk(gh: number, kh: number): 'low' | 'medium' | 'high' {
  if (gh > 120 || kh > 100) return 'high';
  if (gh > 70) return 'medium';
  return 'low';
}
