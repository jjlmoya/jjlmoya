import MATERIALS from '@/data/ac/materials.data'
// import CATEGORY from '@/data/ac/category.data'

export default [
    {
        name: 'Cama de Construcciones',
        image: 'FtrBlockBedS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Juguete de Construcciones',
        image: 'FtrBlockBrick.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 3
        }]
    }, {
        name: 'Banco de Construcciones',
        image: 'FtrBlockChairL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Sillita de Construcciones',
        image: 'FtrBlockChairS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FURNITURE('Juguete de Construcciones'),
            quantity: 1
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 3
        }]
    }, {
        name: 'Cómoda de Construcciones',
        image: 'FtrBlockChest.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FURNITURE('Juguete de Construcciones'),
            quantity: 1
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 12
        }]
    }, {
        name: 'Reloj de Construcciones',
        image: 'FtrBlockClock.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Cadena de Construcciones',
        image: 'FtrBlockCompo.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FURNITURE('Juguete de Construcciones'),
            quantity: 1
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 5
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 3
        }]
    }, {
        name: 'Estantería de Construcciones',
        image: 'FtrBlockShelf.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FURNITURE('Juguete de Construcciones'),
            quantity: 1
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 3
        }]
    }, {
        name: 'Taburete de Construcciones',
        image: 'FtrBlockStoolS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Mesa de Construcciones',
        image: 'FtrBlockTableL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FURNITURE('Juguete de Construcciones'),
            quantity: 1
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 8
        }]
    }
]
