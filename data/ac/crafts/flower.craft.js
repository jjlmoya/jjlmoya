import MATERIALS from '@/data/ac/materials.data'

export default [
    {
        name: 'FtrStandflower',
        image: 'FtrStandflower.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }, {
        name: 'Cama Rosa',
        image: 'FtrFlowerBedW.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }, {
        name: 'Ventilador Anémona',
        image: 'FtrFlowerFan.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }, {
        name: 'Lámpara de Jacinto',
        image: 'FtrFlowerLamp.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }, {
        name: 'Gramófono Lirio',
        image: 'FtrFlowerRecordplayer.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: [{
            ...MATERIALS.LILY_WHITE,
            quantity: 5
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 3
        }, {
            ...MATERIALS.WOOD,
            quantity: 5
        }]
    }, {
        name: 'Ducha Cosmos',
        image: 'FtrFlowerShower.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }, {
        name: 'FtrFlowerStoolS',
        image: 'FtrFlowerStoolS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }, {
        name: 'Caja sorpresa Tulipán',
        image: 'FtrFlowerSurprisedbox.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: [{
            ...MATERIALS.TULIP_RED,
            quantity: 5
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 3
        }]
    }, {
        name: 'FtrFlowerSwag',
        image: 'FtrFlowerSwag.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }, {
        name: 'Mesa Viola',
        image: 'FtrFlowerTableS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'flower',
        materials: []
    }
]
