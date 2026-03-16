export const GLOSSARY = [
  {
    term: 'Dureza Total (GH)',
    description: 'La suma de Calcio y Magnesio. El Magnesio resalta el dulzor y la complejidad, mientras que el Calcio aporta cuerpo y textura.',
    effect: 'Cuerpo y Dulzor'
  },
  {
    term: 'Alcalinidad (KH)',
    description: 'Capacidad del agua para neutralizar ácidos. Un KH alto apaga la acidez del café; un KH bajo hace que el café sepa agrio.',
    effect: 'Control de Acidez'
  },
  {
    term: 'Sustancias Sólidas (TDS)',
    description: 'Total de sólidos disueltos. En agua mineralizada, es la suma de todas nuestras sales añadidas.',
    effect: 'Intensidad Total'
  },
  {
    term: 'Magnesio',
    description: 'Extrae compuestos de sabor más complejos y frutales. Es el mineral favorito para cafés de especialidad.',
    effect: 'Fruta y Notas Florales'
  },
  {
    term: 'Calcio',
    description: 'Extrae de forma más pesada. Ayuda a dar esa sensación sedosa en boca.',
    effect: 'Textura'
  }
];

export const SAFETY_MESSAGES = {
  corrosion: {
    high: 'Peligro: Agua muy agresiva. Puede corroer calderas y componentes de cobre/acero.',
    medium: 'Aceptable: Riesgo moderado de corrosión. Recomendado para filtros, con cuidado en máquinas.',
    low: 'Seguro: El agua tiene suficiente capacidad buffer para proteger los metales.'
  },
  scale: {
    high: 'Peligro: Formación de cal inminente. Usar solo en métodos de filtrado manual (V60, Aeropress).',
    medium: 'Precaución: Puede generar depósitos de cal a largo plazo en máquinas de espresso.',
    low: 'Seguro: No hay riesgo significativo de incrustaciones de cal.'
  }
};
