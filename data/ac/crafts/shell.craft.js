import MATERIALS from '@/data/ac/materials.data'

export default [
    {
        name: 'Arco Concha Marina',
        image: 'FtrShellArch.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Cama Concha Marina',
        image: 'FtrShellBedW.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Fuente Conchas Marinas',
        image: 'FtrShellFountain.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.GIANT_CLAM,
            quantity: 3
        }, {
            ...MATERIALS.STONE,
            quantity: 5
        }]
    }, {
        name: 'Lámpara Concha Marina',
        image: 'FtrShellLamp.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Cadena Concha Marina',
        image: 'FtrShellMusic.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Pantalla Concha Marina',
        image: 'FtrShellScreen.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Herramientas Concha Marina',
        image: 'FtrShellStoolS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Mesa Conchas Marinas',
        image: 'FtrShellTableL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.DOLLAR,
            quantity: 7
        }, {
            ...MATERIALS.CLAY,
            quantity: 3
        }]
    }, {
        name: 'Alfombra Concha Marina',
        image: 'RugOtherShellM00.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.GIANT_CLAM,
            quantity: 3
        }]
    }
]
