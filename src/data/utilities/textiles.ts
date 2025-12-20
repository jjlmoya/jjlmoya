import type { SectionData } from './types';

export interface WashingSymbol {
    id: string;
    description: string;
    icon: string;
    category: 'washing' | 'bleaching' | 'drying' | 'ironing' | 'professional';
}

export interface TextileData {
    name: string;
    description: string;
    family: 'natural' | 'synthetic' | 'artificial';
    origin: string;
    breathability: number;
    durability: number;
    warmth: number;
    washing: string;
    drying: string;
    ironing: string;
    donts: string[];
    sos: string;
    icon: string;
    color: string;
    isNoble?: boolean;
}

export type TextileFiber = TextileData;

export interface BurnTestResult {
    fiberId: string;
    flame: string;
    odor: string;
    smoke: string;
    residue: string;
}

export interface ChemicalAgent {
    id: string;
    name: string;
    description: string;
    warning?: string;
}

export interface StainProtocol {
    agentId: string;
    temperature: string;
    method: string;
    notes?: string;
}

export interface StainType {
    id: string;
    name: string;
    category: 'organic' | 'protein' | 'oil' | 'synthetic' | 'mineral';
    protocols: {
        natural: StainProtocol;
        synthetic: StainProtocol;
        delicate: StainProtocol;
    };
}


export const TEXTILE_DATA: Record<string, TextileData> = {
    cotton: {
        name: 'Algodón',
        description: 'Fibra vegetal natural, suave y transpirable. El rey de los básicos.',
        family: 'natural',
        origin: 'Cápsula de la planta de algodón (Gosypium)',
        breathability: 9,
        durability: 7,
        warmth: 4,
        washing: 'Agua fría o templada (encoge con calor). Permite centrifugado fuerte.',
        drying: 'Secadora a temp media o aire libre (sol directo puede amarillear blancos).',
        ironing: 'Plancha alta con vapor mientras está húmedo.',
        donts: ['Dejar húmedo mucho tiempo (moho)', 'Lejía excesiva (debilita fibra)'],
        sos: '¿Encogido? Remoja en agua tibia con acondicionador para pelo y estira suavemente.',
        icon: 'mdi:tshirt-crew',
        color: '#60A5FA',
        isNoble: false
    },
    linen: {
        name: 'Lino',
        description: 'Fibra vegetal muy fuerte, fresca y con arruga característica.',
        family: 'natural',
        origin: 'Tallo de la planta de lino',
        breathability: 10,
        durability: 9,
        warmth: 2,
        washing: 'Ciclo delicado, no llenar mucho el tambor (necesita agua para no romperse).',
        drying: 'Aire libre. NUNCA secadora (rompe las fibras y marca arrugas eternas).',
        ironing: 'Plancha máxima temperatura, siempre con la prenda muy húmeda.',
        donts: ['Centrifugado fuerte', 'Doblar siempre por el mismo sitio (se corta)'],
        sos: '¿Brillo por planchado? Pasa un paño con vinagre blanco.',
        icon: 'mdi:leaf',
        color: '#A7F3D0',
        isNoble: true
    },
    wool: {
        name: 'Lana / Merino',
        description: 'Fibra animal proteica, aislante térmico excelente y elástica.',
        family: 'natural',
        origin: 'Vellón de oveja',
        breathability: 8,
        durability: 6,
        warmth: 10,
        washing: 'A mano o ciclo lana. Jabón neutro. NUNCA agua caliente (se afieltra).',
        drying: 'Horizontal sobre toalla. Nunca colgar (se deforma).',
        ironing: 'Vapor vertical o plancha media con paño encima.',
        donts: ['Agua caliente', 'Frotar o retorcer', 'Lejía (la disuelve)'],
        sos: '¿Afieltrada? Casi imposible, pero remojo con suavizante puede relajar algo.',
        icon: 'mdi:sheep',
        color: '#FCD34D',
        isNoble: true
    },
    silk: {
        name: 'Seda',
        description: 'Fibra animal de filamento continuo. Brillo natural y tacto seco.',
        family: 'natural',
        origin: 'Capullo del gusano de seda',
        breathability: 7,
        durability: 5,
        warmth: 6,
        washing: 'A mano en agua fría con champú neutro. No retorcer.',
        drying: 'Enrollar en toalla para quitar humedad. Secar a la sombra.',
        ironing: 'Plancha baja, del revés y sin vapor directo.',
        donts: ['Sol directo (quema)', 'Perfume/Desodorante (mancha)', 'Agua (hace cercos)'],
        sos: '¿Mancha de agua? Frota suavemente la seda contra sí misma.',
        icon: 'mdi:ticket-percent',
        color: '#F472B6',
        isNoble: true
    },
    cashmere: {
        name: 'Cashmere',
        description: 'Fibra de lujo de cabra de Cachemira. Extremadamente suave, ligera y 8 veces más cálida que la lana.',
        family: 'natural',
        origin: 'Capa inferior del pelo de la cabra Hircus (Mongolia/China)',
        breathability: 9,
        durability: 5,
        warmth: 10,
        washing: 'ESTRICTAMENTE a mano con champú de bebé. Agua fría. Nunca frotar.',
        drying: 'Horizontal sobre toalla, dándole forma. Jamás colgar.',
        ironing: 'Vapor vertical sin tocar la prenda o plancha tibia con paño.',
        donts: ['Lavadora (incluso programa lana)', 'Suavizante', 'Roces continuos (bolitas)'],
        sos: '¿Pilling (bolitas)? Es inevitable en cashmere real. Usa un peine específico o quítalas a mano.',
        icon: 'mdi:crown',
        color: '#F59E0B',
        isNoble: true
    },
    mohair: {
        name: 'Mohair',
        description: 'La "fibra de diamante" de la cabra de Angora. Brillo natural, muy resistente y elástica.',
        family: 'natural',
        origin: 'Pelo de cabra de Angora',
        breathability: 8,
        durability: 9,
        warmth: 9,
        washing: 'A mano en agua tibia. No agitar excesivamente (se puede fieltrar).',
        drying: 'Horizontal. Cepillar suavemente cuando esté casi seco para levantar el pelo.',
        ironing: 'Vapor vertical. No aplastar el pelo con la plancha.',
        donts: ['Agua muy caliente', 'Lejía', 'Planchar en seco'],
        sos: '¿Pelo aplastado? Agítalo vigorosamente y aplica vapor vertical.',
        icon: 'mdi:shimmer',
        color: '#14B8A6',
        isNoble: true
    },
    angora: {
        name: 'Angora',
        description: 'Pelo del conejo de Angora. Conocido por su efecto "halo" esponjoso, ligereza extrema y calidez superior.',
        family: 'natural',
        origin: 'Conejo de Angora',
        breathability: 8,
        durability: 4,
        warmth: 10,
        washing: 'EXTREMA PRECAUCIÓN. A mano, agua fría, detergente neutro. No sumergir mucho tiempo.',
        drying: 'Horizontal sobre toalla. Evitar cualquier agitación.',
        ironing: 'Solo vapor vertical a distancia. El calor directo aplasta el halo.',
        donts: ['Fricción (se deshace)', 'Lavadora', 'Calor directo'],
        sos: '¿Ha perdido pelusa? Mételo en una bolsa en el congelador 24h para fijar el pelo.',
        icon: 'mdi:rabbit',
        color: '#F9FAFB',
        isNoble: true
    },
    alpaca: {
        name: 'Alpaca',
        description: 'Tesoro de los Andes. Fibra hueca, térmica, hipoalergénica (sin lanolina) y sedosa.',
        family: 'natural',
        origin: 'Alpaca (camélido sudamericano)',
        breathability: 9,
        durability: 8,
        warmth: 10,
        washing: 'A mano en agua fría. Admite lavados menos frecuentes (repele olores).',
        drying: 'Horizontal. No exponer al sol directo.',
        ironing: 'Temp baja/media con paño. Vapor ayuda a recuperar forma.',
        donts: ['Colgar mojado (se estira)', 'Lejía', 'Guardar sucio (polillas)'],
        sos: '¿Áspera? Un enjuague ligero con vinagre blanco restaura el pH y suavidad.',
        icon: 'mdi:image-filter-hdr',
        color: '#9F7AEA',
        isNoble: true
    },
    polyester: {
        name: 'Poliéster',
        description: 'Fibra sintética de petróleo. Resistente, no arruga, no respira.',
        family: 'synthetic',
        origin: 'Polímeros derivados del petróleo',
        breathability: 2,
        durability: 10,
        warmth: 5,
        washing: 'Agua tibia/fría. Admite todo, pero atrapa olores y grasas.',
        drying: 'Secadora baja o aire. Seca muy rápido.',
        ironing: 'Plancha baja/media. Cuidado, se funde.',
        donts: ['Calor excesivo', 'Suavizante (crea capa cerosa que atrapa más olor)'],
        sos: '¿Olor persistente? Remojo en agua con vinagre antes de lavar.',
        icon: 'mdi:oil',
        color: '#94A3B8',
        isNoble: false
    },
    viscose: {
        name: 'Viscosa / Rayón',
        description: 'Semisintética de celulosa regenerada. Tacto seda, muy absorbente.',
        family: 'artificial',
        origin: 'Pulpa de madera tratada químicamente',
        breathability: 8,
        durability: 4,
        warmth: 3,
        washing: 'Delicado en frío. Se vuelve muy débil mojada.',
        drying: 'Horizontal o percha acolchada. No secadora.',
        ironing: 'Media, del revés. Sin vapor directo si es posible.',
        donts: ['Retorcer mojada (se rompe)', 'Remojos largos'],
        sos: '¿Encogida y dura? Plancha con mucho vapor para relajar la fibra.',
        icon: 'mdi:forest',
        color: '#C084FC',
        isNoble: false
    },
    nylon: {
        name: 'Nailon (Poliamida)',
        description: 'Sintética muy resistente a tracción y abrasión. ',
        family: 'synthetic',
        origin: 'Derivado del petróleo (poliamida)',
        breathability: 3,
        durability: 10,
        warmth: 4,
        washing: 'Ciclo normal. Cuidado con mezclar colores (los absorbe).',
        drying: 'Aire libre. Secadora baja.',
        ironing: 'Muy baja. Se funde rapidísimo.',
        donts: ['Lejía (amarillea)', 'Secar al sol directo (se "pasa")'],
        sos: '¿Grisáceo? Lavar con blanqueador oxigenado.',
        icon: 'mdi:parachute',
        color: '#2DD4BF',
        isNoble: false
    },
    acrylic: {
        name: 'Acrílico',
        description: 'Sintético imitación lana. Suave, caliente, hace bolas.',
        family: 'synthetic',
        origin: 'Poliacupacrilonitrilo',
        breathability: 4,
        durability: 6,
        warmth: 8,
        washing: 'Agua templada. Mucho suavizante para estática.',
        drying: 'Aire. El calor deforma la prenda permanentemente.',
        ironing: 'No planchar',
        donts: ['Suavizante (rompe fibras)', 'Escurrir fuerte', 'Calor'],
        sos: 'Si ha perdido elasticidad, es irreversible (las fibras se han roto).',
        icon: 'mdi:resize',
        color: '#450A0A',
        isNoble: false
    }
};

export const CHEMICAL_AGENTS: Record<string, ChemicalAgent> = {
    percarbonate: {
        id: 'percarbonate',
        name: 'Percarbonato de Sodio',
        description: 'Blanqueador oxigenado biodegradable. Libera oxígeno activo al disolverse.',
        warning: 'Evitar en fibras de proteína (seda, lana) a altas concentraciones.'
    },
    isopropyl: {
        id: 'isopropyl',
        name: 'Alcohol Isopropílico',
        description: 'Solvente eficaz para pigmentos y grasas ligeras.',
        warning: 'Puede dañar el brillo en sedas y disolver algunos acrílicos si no se diluye.'
    },
    acetone: {
        id: 'acetone',
        name: 'Acetona',
        description: 'Solvente potente para lacas y pegamentos.',
        warning: 'PROHIBIDO en acetatos y triacetatos (disuelve la fibra).'
    },
    enzyme: {
        id: 'enzyme',
        name: 'Detergente Enzimático',
        description: 'Contiene proteasas que rompen manchas biológicas.',
        warning: 'Uso con precaución en lana y seda (son proteínas).'
    },
    vinegar: {
        id: 'vinegar',
        name: 'Vinagre Blanco',
        description: 'Ácido acético suave para neutralizar olores y fijar colores.',
    }
};

export const STAIN_DATA: StainType[] = [
    {
        id: 'wine',
        name: 'Vino Tinto / Fruta',
        category: 'organic',
        protocols: {
            natural: { agentId: 'percarbonate', temperature: '40-60°C', method: 'Remojo prolongado' },
            synthetic: { agentId: 'percarbonate', temperature: '40°C', method: 'Pasta directa' },
            delicate: { agentId: 'vinegar', temperature: 'Fría', method: 'Aclarado con agua con gas y vinagre', notes: 'No frotar' }
        }
    },
    {
        id: 'blood',
        name: 'Sangre',
        category: 'protein',
        protocols: {
            natural: { agentId: 'enzyme', temperature: 'Fría', method: 'Remojo en agua salada y luego enzima' },
            synthetic: { agentId: 'enzyme', temperature: 'Fría', method: 'Aplicación directa' },
            delicate: { agentId: 'vinegar', temperature: 'Fría', method: 'Aclarado inmediato, evitar calor' }
        }
    },
    {
        id: 'grease',
        name: 'Grasa / Aceite',
        category: 'oil',
        protocols: {
            natural: { agentId: 'isopropyl', temperature: '40°C', method: 'Disolver con alcohol y luego lavar' },
            synthetic: { agentId: 'isopropyl', temperature: '40°C', method: 'Poner papel absorbente debajo' },
            delicate: { agentId: 'isopropyl', temperature: 'Fría', method: 'Diluir alcohol al 50%' }
        }
    },
    {
        id: 'ink',
        name: 'Tinta / Marcador',
        category: 'synthetic',
        protocols: {
            natural: { agentId: 'isopropyl', temperature: 'Ambiente', method: 'Esponjar desde fuera hacia dentro' },
            synthetic: { agentId: 'isopropyl', temperature: 'Ambiente', method: 'Precaución con la dispersión' },
            delicate: { agentId: 'isopropyl', temperature: 'Fría', method: 'Diluir y probar en zona oculta' }
        }
    }
];

export const BURN_OPTIONS = {
    flame: {
        cellulosic: 'Arde RÁPIDO y con BRILLO (Llama amarilla). No se funde. Sigue ardiendo al retirar.',
        protein: 'Arde LENTAMENTE, chisporrotea y se ENCOGE alejándose de la llama. Se autoextingue al retirar.',
        synthetic: 'Se FUNDE y contrae rápidamente, gotea como plástico derretido. Llama humeante.'
    },
    odor: {
        paper: 'Papel quemado, madera, hojas secas.',
        hair: 'Pelo quemado, cuerno quemado, plumas.',
        chemical_sweet: 'Químico AROMÁTICO (dulce, afrutado).',
        chemical_sharp: 'Químico ACRE (vinagre, lacre).',
        chemical_fishy: 'Químico AGRIO (pescado, carne asada).',
        vegetable: 'Vegetales cocidos (apio).'
    },
    residue: {
        ash_soft: 'Ceniza GRIS/NEGRA fina, suave y volátil (se deshace al tocar).',
        ash_shape: 'Ceniza GRIS mantiene forma de la fibra (friable).',
        bead_crushable: 'Masa negra hueca/quebradiza (se pulveriza fácilmente con los dedos).',
        bead_hard: 'Bola DURA y vítrea. Imposible de romper con los dedos.',
        bead_irregular: 'Masa negra DURA e irregular.'
    },
    smoke: {
        white_gray: 'Blanco / Gris claro.',
        gray: 'Gris medio.',
        black: 'Negro DENSO y oscuro.'
    }
};

export const BURN_TEST_DATA: BurnTestResult[] = [
    {
        fiberId: 'cotton',
        flame: BURN_OPTIONS.flame.cellulosic,
        odor: BURN_OPTIONS.odor.paper,
        smoke: BURN_OPTIONS.smoke.white_gray,
        residue: BURN_OPTIONS.residue.ash_soft
    },
    {
        fiberId: 'linen',
        flame: BURN_OPTIONS.flame.cellulosic,
        odor: BURN_OPTIONS.odor.paper,
        smoke: BURN_OPTIONS.smoke.white_gray,
        residue: BURN_OPTIONS.residue.ash_shape
    },
    {
        fiberId: 'wool',
        flame: BURN_OPTIONS.flame.protein,
        odor: BURN_OPTIONS.odor.hair,
        smoke: BURN_OPTIONS.smoke.gray,
        residue: BURN_OPTIONS.residue.bead_crushable
    },
    {
        fiberId: 'silk',
        flame: BURN_OPTIONS.flame.protein,
        odor: BURN_OPTIONS.odor.hair,
        smoke: BURN_OPTIONS.smoke.gray,
        residue: BURN_OPTIONS.residue.bead_crushable
    },
    {
        fiberId: 'cashmere',
        flame: BURN_OPTIONS.flame.protein,
        odor: BURN_OPTIONS.odor.hair,
        smoke: BURN_OPTIONS.smoke.gray,
        residue: BURN_OPTIONS.residue.bead_crushable
    },
    {
        fiberId: 'mohair',
        flame: BURN_OPTIONS.flame.protein,
        odor: BURN_OPTIONS.odor.hair,
        smoke: BURN_OPTIONS.smoke.gray,
        residue: BURN_OPTIONS.residue.bead_crushable
    },
    {
        fiberId: 'angora',
        flame: BURN_OPTIONS.flame.protein,
        odor: BURN_OPTIONS.odor.hair,
        smoke: BURN_OPTIONS.smoke.gray,
        residue: BURN_OPTIONS.residue.bead_crushable
    },
    {
        fiberId: 'alpaca',
        flame: BURN_OPTIONS.flame.protein,
        odor: BURN_OPTIONS.odor.hair,
        smoke: BURN_OPTIONS.smoke.gray,
        residue: BURN_OPTIONS.residue.bead_crushable
    },
    {
        fiberId: 'polyester',
        flame: BURN_OPTIONS.flame.synthetic,
        odor: BURN_OPTIONS.odor.chemical_sweet,
        smoke: BURN_OPTIONS.smoke.black,
        residue: BURN_OPTIONS.residue.bead_hard
    },
    {
        fiberId: 'nylon',
        flame: BURN_OPTIONS.flame.synthetic,
        odor: BURN_OPTIONS.odor.vegetable,
        smoke: BURN_OPTIONS.smoke.white_gray,
        residue: BURN_OPTIONS.residue.bead_hard
    },
    {
        fiberId: 'acrylic',
        flame: BURN_OPTIONS.flame.synthetic,
        odor: BURN_OPTIONS.odor.chemical_fishy,
        smoke: BURN_OPTIONS.smoke.black,
        residue: BURN_OPTIONS.residue.bead_irregular
    }
];

export const textileSection: SectionData = {
    title: 'Textiles',
    icon: 'mdi:texture',
    theme: 'indigo',
    utilities: [
        {
            href: '/utilidades/veracidad-textil/',
            iconBg: 'mdi:tag-text-outline',
            iconFg: 'mdi:microscope',
            title: 'Veracidad Textil',
            description: '¿Calidad o plástico? Analiza la etiqueta de tu ropa.',
            color: '#6366f1'
        },
        {
            href: '/utilidades/guia-lavado-textil/',
            iconBg: 'mdi:washing-machine',
            iconFg: 'mdi:water-check',
            title: 'Maestro Textil',
            description: 'Guía científica para lavar y cuidar cada tipo de fibra.',
            color: '#3b82f6'
        },
        {
            href: '/utilidades/protocolo-quimico-manchas/',
            iconBg: 'mdi:test-tube',
            iconFg: 'mdi:iv-bag',
            title: 'Química de Manchas',
            description: 'Protocolos científicos para eliminar manchas según el tipo de fibra.',
            color: '#8b5cf6'
        },
        {
            href: '/utilidades/identificador-fibras-combustion/',
            iconBg: 'mdi:fire',
            iconFg: 'mdi:microscope',
            title: 'Prueba de Combustión',
            description: 'Identifica la composición real de una tela quemando una pequeña muestra.',
            color: '#ef4444'
        }
    ]
};
