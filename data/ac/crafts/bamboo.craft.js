import MATERIALS from '@/data/ac/materials.data'
import CATEGORY from '@/data/ac/category.data'
export default [
    {
        name: 'Mochila de Cesta',
        image: 'BagBackpackBasket0.png',
        height: 1,
        width: 1,
        category: [CATEGORY.CLOTH],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 6
        }]
    },
    {
        name: 'Esfera de Bambú',
        image: 'FtrBambooBall.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 3
        }]
    }, {
        name: 'Cesta de Bambú',
        image: 'FtrBambooBasket.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 7
        }]
    }, {
        name: 'Portavelas de Bambú',
        image: 'FtrBambooCandle.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 3
        }, {
            ...MATERIALS.CLAY,
            quantity: 2
        }]
    }, {
        name: 'FtrBambooCarstop',
        image: 'FtrBambooCarstop.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Banco de Bambú',
        image: 'FtrBambooChairL.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU,
            quantity: 8
        }]
    }, {
        name: 'Xilófono de Bambú',
        image: 'FtrBamboodrum.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 3
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 2
        }]
    }, {
        name: 'Adorno colgante de Bambú',
        image: 'FtrBambooFlowerwall.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 1
        }]
    }, {
        name: 'Lámpara de Bambú',
        image: 'FtrBambooLamp.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 8
        }]
    }, {
        name: 'FtrBambooLunch',
        image: 'FtrBambooLunch.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Altavoz de Bambú',
        image: 'FtrBambooMusic.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 3
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 1
        }]
    }, {
        name: 'Separador de Bambú',
        image: 'FtrBambooScreen.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 7
        }, {
            ...MATERIALS.STONE,
            quantity: 6
        }]
    }, {
        name: 'Estantería de Bambú',
        image: 'FtrBambooShelf.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Lámpara Brote de B.',
        image: 'FtrBambooshootLamp.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 4
        }, {
            ...MATERIALS.BAMBU_ROOT,
            quantity: 5
        }, {
            ...MATERIALS.CLAY,
            quantity: 4
        }]
    }, {
        name: 'Somen Bambú',
        image: 'FtrBambooSomen.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 7
        }, {
            ...MATERIALS.WOOD,
            quantity: 3
        }]
    }, {
        name: 'Taburete de Bambú',
        image: 'FtrBambooStool.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU,
            quantity: 5
        }]
    }, {
        name: 'Lámpara de Bambú',
        image: 'FtrBambooSurprisedbox.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 6
        }]
    },
    {
        name: 'Alfombra de Bambú',
        image: 'RugRectBambooM00.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 6
        }]
    }, {
        name: 'Alfombra B. Oscura',
        image: 'RugRectBambooM01.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU,
            quantity: 6
        }]
    }, {
        name: 'Hervidor de Bambú',
        image: 'FtrBasketsteamer.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 6
        }]
    }, {
        name: 'Hogar',
        image: 'FtrIrori.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU,
            quantity: 2
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 5
        }, {
            ...MATERIALS.CLAY,
            quantity: 4
        }, {
            ...MATERIALS.SOLID_WOOD,
            quantity: 5
        }]
    }
]
