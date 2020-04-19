import MATERIALS from '@/data/ac/materials.data'

export default [
    {
        name: 'Kit de Puente',
        image: 'BridgeLogReserveKit.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.FURNITURE('Lote de Estacas'),
                quantity: 4
            },
            {
                ...MATERIALS.CLAY,
                quantity: 4
            },
            {
                ...MATERIALS.STONE,
                quantity: 4
            }
        ]
    }, {
        name: 'Kit de Campamento',
        image: 'CampsiteReserveKit.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.WOOD,
                quantity: 15
            },
            {
                ...MATERIALS.FLEXIBLE_WOOD,
                quantity: 15
            },
            {
                ...MATERIALS.SOLID_WOOD,
                quantity: 15
            },
            {
                ...MATERIALS.IRON_NUGGET,
                quantity: 15
            }
        ]
    }
]
