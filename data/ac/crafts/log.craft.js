import MATERIALS from '@/data/ac/materials.data'

export default [
    {
        name: 'FtrLogBedS',
        image: 'FtrLogBedS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Cama Leño',
        image: 'FtrLogBedW.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 30
        }]
    }, {
        name: 'Reloj Pared Leño',
        image: 'FtrLogClockWall.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 2
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 1
        }]
    }, {
        name: 'FtrLogShelf',
        image: 'FtrLogShelf.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Sofá Leño',
        image: 'FtrLogSofaL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FURNITURE('Sillón Leño'),
            quantity: 2
        }]
    }, {
        name: 'FtrLogSofaS',
        image: 'FtrLogSofaS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Banco Leño',
        image: 'FtrLogStoolL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 5
        }]
    }, {
        name: 'Taburete Leño',
        image: 'FtrLogStoolS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 4
        }]
    }, {
        name: 'Mesa Comedor Leño',
        image: 'FtrLogTableL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 15
        }]
    }, {
        name: 'Mesa Redonda Leño',
        image: 'FtrLogTableLRound.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 15
        }]
    }
]
