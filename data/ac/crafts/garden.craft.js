import MATERIALS from '@/data/ac/materials.data'
// import CATEGORY from '@/data/ac/category.data'
export default [
    {
        name: 'FtrGardenChairNatural',
        image: 'FtrGardenChairNatural.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 6
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 2
        }]
    }, {
        name: 'Roca Gruesa',
        image: 'FtrGardenrock.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STONE,
            quantity: 15
        }]
    }, {
        name: 'Roca Plana',
        image: 'FtrGardenrockLow.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STONE,
            quantity: 20
        }]
    }, {
        name: 'FtrGardenrockMoss',
        image: 'FtrGardenrockMoss.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'FtrGardenrockTall',
        image: 'FtrGardenrockTall.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Mesa Madera Natual',
        image: 'FtrGardenTableNatural.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 9
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 3
        }]
    }, {
        name: 'FtrGardenTableSNatural',
        image: 'FtrGardenTableSNatural.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'FtrGardenwagon',
        image: 'FtrGardenwagon.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }
]
