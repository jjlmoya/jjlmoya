import MATERIALS from '@/data/ac/materials.data'

export default [
    {
        name: 'Taburete de Piedra',
        image: 'FtrStoneChair.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STONE,
            quantity: 3
        }]
    }, {
        name: 'Linterna de Piedra',
        image: 'FtrStonelantern.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Horno de Piedra',
        image: 'FtrStoneoven.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.CLAY,
            quantity: 8
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 2
        }, {
            ...MATERIALS.WOOD,
            quantity: 6
        }]
    }, {
        name: 'Mesa de Piedra',
        image: 'FtrStoneTable.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Roca con Agua',
        image: 'FtrStonewaterbowl.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STONE,
            quantity: 10
        }]
    }, {
        name: 'Roca con Agua y hojas',
        image: 'FtrStonewaterbowlAutumun.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STONE,
            quantity: 10
        }, {
            ...MATERIALS.AUTUMN_PETALS,
            quantity: 3
        }]
    }, {
        name: 'Roca con Agua y Pétalos',
        image: 'FtrStonewaterbowlSakura.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STONE,
            quantity: 10
        }, {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 3
        }]
    }
]
