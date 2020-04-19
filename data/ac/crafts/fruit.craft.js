import MATERIALS from '@/data/ac/materials.data'

export default [
    {
        name: 'FtrFruitbasket',
        image: 'FtrFruitbasket.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Cama Pera',
        image: 'FtrFruitsBedS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEAR,
            quantity: 10
        }, {
            ...MATERIALS.WOOD,
            quantity: 5
        }]
    }, {
        name: 'Caja sorpresa Melocotón',
        image: 'FtrFruitsBox.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEAR,
            quantity: 10
        }, {
            ...MATERIALS.FLEXIBLE_WOOD,
            quantity: 4
        }]
    }, {
        name: 'Silla Manzana',
        image: 'FtrFruitsChairApple.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.APPLE,
            quantity: 10
        }, {
            ...MATERIALS.WOOD,
            quantity: 4
        }]
    }, {
        name: 'Silla Melocotón',
        image: 'FtrFruitsChairPeach.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEAR,
            quantity: 10
        }, {
            ...MATERIALS.WOOD,
            quantity: 5
        }]
    }, {
        name: 'Reloj Naranja',
        image: 'FtrFruitsClockW.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.ORANGE,
            quantity: 10
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 2
        }]
    }, {
        name: 'Armario Pera',
        image: 'FtrFruitsClosetLR.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEAR,
            quantity: 10
        }, {
            ...MATERIALS.WOOD,
            quantity: 5
        }]
    }, {
        name: 'Lámpara Cereza',
        image: 'FtrFruitsLampW.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.CHERRY,
            quantity: 10
        }, {
            ...MATERIALS.WOOD,
            quantity: 5
        }]
    }, {
        name: 'Cadena Cereza',
        image: 'FtrFruitsMusic.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.CHERRY_PETALS,
            quantity: 10
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 2
        }]
    }, {
        name: 'Tabla Naranja',
        image: 'FtrFruitsTableS.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.ORANGE,
            quantity: 10
        }, {
            ...MATERIALS.WOOD,
            quantity: 5
        }]
    }, {
        name: 'Tele Manzana',
        image: 'FtrFruitsTV.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.APPLE,
            quantity: 10
        }, {
            ...MATERIALS.IRON_NUGGET,
            quantity: 2
        }]
    }, {
        name: 'Jarro de Agua afrutada',
        image: 'FtrFruitswater.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.PEAR,
                quantity: 2
            },
            {
                ...MATERIALS.APPLE,
                quantity: 2
            }, {
                ...MATERIALS.ORANGE,
                quantity: 2
            }, {
                ...MATERIALS.PEACH,
                quantity: 2
            },
            {
                ...MATERIALS.COCONUT,
                quantity: 2
            }, {
                ...MATERIALS.CHERRY,
                quantity: 2
            }
        ]
    }, {
        name: 'Alfombra Pera',
        image: 'RugOtherPearM00.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEAR,
            quantity: 7
        }]
    }, {
        name: 'Top Pera',
        image: 'TopsTexOnepieceAlineNPear0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Alfombra Manzana',
        image: 'RugOtherAppleM00.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.APPLE,
            quantity: 7
        }]
    }, {
        name: 'Top Manzana',
        image: 'TopsTexOnepieceAlineNApple0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Alfombra Melocotón',
        image: 'TopsTexOnepieceAlineNPeach0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEAR,
            quantity: 7
        }]
    }, {
        name: 'Top Melocotón',
        image: 'RugOtherPeachM00.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEACH,
            quantity: 7
        }]
    }, {
        name: 'Top Cereza',
        image: 'TopsTexOnepieceAlineNCherry0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Top Naranja',
        image: 'TopsTexOnepieceAlineNOrange.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Alfombra Cereza',
        image: 'RugOtherCherryM00.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.CHERRY_PETALS,
            quantity: 7
        }]
    }, {
        name: 'Alfombra Naranja',
        image: 'RugOtherOrangeM00.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.ORANGE,
            quantity: 7
        }]
    }
]
