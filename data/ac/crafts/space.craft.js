import MATERIALS from '@/data/ac/materials.data'
export default [
    {
        name: 'FtrStarClock',
        image: 'FtrStarClock.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Guirnalda de Estrellas',
        image: 'FtrStarDecorationWall.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STAR_FRAGMENT,
            quantity: 10
        }]
    }, {
        name: 'FtrStarLamp',
        image: 'FtrStarLamp.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'FtrStarMoonChairL',
        image: 'FtrStarMoonChairL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    },
    {
        name: 'FtrSpacecraft',
        image: 'FtrSpacecraft.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'FtrSpacesuit',
        image: 'FtrSpacesuit.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }
]
