export interface CareInstructions {
    id: string;
    fiber: string;
    maxTemp: string;
    drying: 'horizontal' | 'vertical' | 'padded-vertical';
    ironing: string;
    donts: string[];
    sos: string;
    icon: string;
}

export const TEXTILE_CARE_DATA: Record<string, CareInstructions> = {
    merino: {
        id: 'merino',
        fiber: 'Lana Merino',
        maxTemp: '30°C',
        drying: 'horizontal',
        ironing: 'Solo vapor',
        donts: ['Suavizantes', 'Colgar en percha', 'Centrifugado fuerte'],
        sos: 'Si se ha encogido, sumérgelo en agua tibia con acondicionador de pelo durante 30 min y estira suavemente.',
        icon: 'mdi:sheep'
    },
    wool: {
        id: 'wool',
        fiber: 'Lana (Genérica)',
        maxTemp: '30°C',
        drying: 'horizontal',
        ironing: 'Baja (con traño húmedo)',
        donts: ['Agua caliente', 'Secadora', 'Retorcer'],
        sos: 'Usa vapor para recuperar la esponjosidad si se ha apelmazado.',
        icon: 'mdi:texture-box'
    },
    mohair: {
        id: 'mohair',
        fiber: 'Mohair',
        maxTemp: 'Fría',
        drying: 'horizontal',
        ironing: 'No planchar (solo vapor)',
        donts: ['Fricción fuerte', 'Colgar húmedo', 'Calor directo'],
        sos: 'Cepilla con un cepillo de cerdas suaves para levantar el pelo si se ve aplastado.',
        icon: 'mdi:auto-fix'
    },
    silk: {
        id: 'silk',
        fiber: 'Seda Naturtal',
        maxTemp: 'Fría',
        drying: 'padded-vertical',
        ironing: 'Muy baja (del revés)',
        donts: ['Retorcer', 'Escurrir', 'Luz solar directa'],
        sos: 'Para recuperar el brillo, añade una cucharada de vinagre blanco al último aclarado.',
        icon: 'mdi:sparkles'
    },
    linen: {
        id: 'linen',
        fiber: 'Lino',
        maxTemp: '40-60°C',
        drying: 'vertical',
        ironing: 'Alta (húmedo)',
        donts: ['Secado excesivo', 'Doblado húmedo'],
        sos: 'Si está muy arrugado, mételo en una bolsa en la nevera unas horas antes de planchar.',
        icon: 'mdi:leaf'
    },
    alpaca: {
        id: 'alpaca',
        fiber: 'Alpaca',
        maxTemp: '<20°C',
        drying: 'horizontal',
        ironing: 'Sin contacto (vapor)',
        donts: ['Agitación', 'Calor', 'Frotar fuerte'],
        sos: 'Usa champú de bebé en lugar de detergente para mantener las fibras suaves.',
        icon: 'mdi:texture'
    },
    cotton: {
        id: 'cotton',
        fiber: 'Algodón',
        maxTemp: '60°C',
        drying: 'vertical',
        ironing: 'Alta',
        donts: ['Lejía (en color)', 'Mezclar con toallas'],
        sos: 'Para eliminar manchas de sudor amarillas, usa una pasta de bicarbonato y limón antes de lavar.',
        icon: 'mdi:dots-vertical'
    },
    polyester: {
        id: 'polyester',
        fiber: 'Poliéster',
        maxTemp: '40°C',
        drying: 'vertical',
        ironing: 'Baja',
        donts: ['Plancha caliente (derrite)', 'Limpieza en seco'],
        sos: 'Para eliminar la electricidad estática, toca un objeto metálico o usa suavizante específico.',
        icon: 'mdi:bottle-wine-outline'
    },
    acrylic: {
        id: 'acrylic',
        fiber: 'Acrílico',
        maxTemp: '30°C',
        drying: 'vertical',
        ironing: 'Muy baja',
        donts: ['Secadora caliente', 'Vapor excesivo'],
        sos: 'Si aparecen bolitas, usa un quitapelusas eléctrico con cuidado.',
        icon: 'mdi:flask-outline'
    },
    nylon: {
        id: 'nylon',
        fiber: 'Nailon / Poliamida',
        maxTemp: '30°C',
        drying: 'vertical',
        ironing: 'Baja',
        donts: ['Lejía', 'Luz solar prolongada (amarillea)'],
        sos: 'Lava junto con otros sintéticos para evitar transferencias de color.',
        icon: 'mdi:parachute'
    },
    elastane: {
        id: 'elastane',
        fiber: 'Elastano (Lycra/Spandex)',
        maxTemp: 'Fría',
        drying: 'vertical',
        ironing: 'No planchar',
        donts: ['Suavizante (rompe fibras)', 'Escurrir fuerte', 'Calor'],
        sos: 'Si ha perdido elasticidad, es irreversible (las fibras se han roto), intenta no estirarlo más.',
        icon: 'mdi:reflex'
    },
    viscose: {
        id: 'viscose',
        fiber: 'Viscosa / Rayón',
        maxTemp: '30°C',
        drying: 'vertical',
        ironing: 'Baja',
        donts: ['Centrifugado fuerte', 'Escurrir a mano'],
        sos: 'Si la prenda parece "acartonada" al secarse, planchar con vapor para recuperar la caída.',
        icon: 'mdi:waves'
    },
    cashmere: {
        id: 'cashmere',
        fiber: 'Cachemira',
        maxTemp: '<20°C',
        drying: 'horizontal',
        ironing: 'Baja (del revés)',
        donts: ['Lavado frecuente', 'Fricción'],
        sos: 'Usa un peine para cachemira para eliminar las bolitas, nunca una cuchilla.',
        icon: 'mdi:diamond-stone'
    }
};
