export interface GrindMethod {
  id: string;
  name: string;
  icon: string;
  reference: string;
  minMicras: number;
  maxMicras: number;
  description: string;
  rangeIndex: number; 
}

export interface Grinder {
  id: string;
  name: string;
  brand: string;
  type: 'clicks' | 'numeric' | 'stepped';
  uniformity: number;
  ranges: Record<string, string>; 
}

export const GRIND_METHODS: GrindMethod[] = [
  {
    id: 'ibrik',
    name: 'Ibrik (Turco)',
    icon: 'mdi:coffee-maker-outline',
    reference: 'Talco / Harina fina',
    minMicras: 100,
    maxMicras: 300,
    description: 'Polvo extra fino, casi como harina. Vital para la suspensión del café turco.',
    rangeIndex: 1
  },
  {
    id: 'espresso',
    name: 'Espresso',
    icon: 'mdi:coffee-maker',
    reference: 'Sal fina',
    minMicras: 300,
    maxMicras: 500,
    description: 'Extracción a alta presión, requiere molienda muy fina para crear resistencia.',
    rangeIndex: 2
  },
  {
    id: 'moka',
    name: 'Moka / Aeropress',
    icon: 'mdi:coffee-maker-outline',
    reference: 'Sal de mesa',
    minMicras: 500,
    maxMicras: 700,
    description: 'Presión media o inmersión híbrida. Textura versátil y equilibrada.',
    rangeIndex: 3
  },
  {
    id: 'v60',
    name: 'V60 / Filtro',
    icon: 'mdi:filter-variant',
    reference: 'Azúcar granulada',
    minMicras: 700,
    maxMicras: 900,
    description: 'Métodos de goteo manual, el estándar para resaltar dulzor y acidez.',
    rangeIndex: 4
  },
  {
    id: 'chemex',
    name: 'Chemex / Clever',
    icon: 'mdi:flask-outline',
    reference: 'Arena gruesa',
    minMicras: 900,
    maxMicras: 1200,
    description: 'Filtros gruesos o inmersión breve. Requiere flujo constante.',
    rangeIndex: 5
  },
  {
    id: 'french-press',
    name: 'Prensa Francesa',
    icon: 'mdi:coffee',
    reference: 'Sal gorda',
    minMicras: 1200,
    maxMicras: 1500,
    description: 'Inmersión prolongada, necesita partículas grandes para filtrar con malla.',
    rangeIndex: 6
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    icon: 'mdi:snowflake',
    reference: 'Granos de pimienta',
    minMicras: 1500,
    maxMicras: 1600,
    description: 'Extracción en frío durante horas, requiere la molienda más gruesa posible.',
    rangeIndex: 7
  }
];

export const GRINDERS: Grinder[] = [
  {
    id: 'generic',
    name: 'Cualquier Molino (μm)',
    brand: 'Genérico',
    type: 'numeric',
    uniformity: 0.7,
    ranges: {
      ibrik: '100-300',
      espresso: '300-500',
      moka: '500-700',
      v60: '700-900',
      chemex: '900-1200',
      'french-press': '1200-1500',
      'cold-brew': '1500+'
    }
  },
  {
    id: 'comandante-c40',
    name: 'C40 MK3/MK4',
    brand: 'Comandante',
    type: 'clicks',
    uniformity: 0.95,
    ranges: {
      espresso: '10-15',
      moka: '15-20',
      v60: '20-25',
      chemex: '25-30',
      'french-press': '28-32',
      'cold-brew': '32+'
    }
  },
  {
    id: 'baratza-encore',
    name: 'Encore',
    brand: 'Baratza',
    type: 'numeric',
    uniformity: 0.75,
    ranges: {
      moka: '8-12',
      v60: '14-20',
      chemex: '20-24',
      'french-press': '28-32',
      'cold-brew': '30+'
    }
  },
  {
    id: 'graef-cm800',
    name: 'CM800',
    brand: 'Graef',
    type: 'numeric',
    uniformity: 0.7,
    ranges: {
      espresso: '1-4',
      moka: '5-10',
      v60: '12-18',
      chemex: '20-25',
      'french-press': '30-35'
    }
  },
  {
    id: 'hario-skerton',
    name: 'Skerton (Standard)',
    brand: 'Hario',
    type: 'clicks',
    uniformity: 0.4,
    ranges: {
      moka: '2-4',
      v60: '6-8',
      chemex: '8-10',
      'french-press': '12-15'
    }
  },
  {
    id: 'timemore-c2',
    name: 'Chestnut C2/C3',
    brand: 'Timemore',
    type: 'clicks',
    uniformity: 0.85,
    ranges: {
      espresso: '7-10',
      moka: '11-14',
      v60: '15-20',
      chemex: '21-24',
      'french-press': '24-28',
      'cold-brew': '28+'
    }
  },
  {
    id: 'fellow-ode-g2',
    name: 'Ode Gen 2',
    brand: 'Fellow',
    type: 'numeric',
    uniformity: 0.92,
    ranges: {
      v60: '4-6',
      chemex: '6-8',
      'french-press': '9-11',
      'cold-brew': '11'
    }
  }
];

export function getComparison(fromId: string, toId: string): string {
  const from = GRIND_METHODS.find(m => m.id === fromId);
  const to = GRIND_METHODS.find(m => m.id === toId);
  
  if (!from || !to) return '';
  
  if (from.rangeIndex < to.rangeIndex) {
    return 'Debes moler más GRUESO (partículas más grandes).';
  } else if (from.rangeIndex > to.rangeIndex) {
    return 'Debes moler más FINO (partículas más pequeñas).';
  } else {
    return 'La molienda es similar, realiza ajustes finos según sabor.';
  }
}
