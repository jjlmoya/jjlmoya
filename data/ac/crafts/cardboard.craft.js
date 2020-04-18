import MATERIALS from '@/data/ac/materials.data'
export default [
    {
        name: 'FtrCardboardBedS',
        image: 'FtrCardboardBedS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'FtrCardboardChairS',
        image: 'FtrCardboardChairS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'FtrCardboardSofaL',
        image: 'FtrCardboardSofaL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Mesa de Cartón',
        image: 'FtrCardboardTableL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.FURNITURE('Caja de cartón'),
            quantity: 4
        }]
    }
]
