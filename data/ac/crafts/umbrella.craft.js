import MATERIALS from '@/data/ac/materials.data'

export default [
    {
        name: 'Stand de Paraguas',
        image: 'FtrUmbrellastand.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    },
    {
        name: 'Paraguas Manzana',
        image: 'UmbrellaApple0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.APPLE,
            quantity: 7
        }]
    }, {
        name: 'Parasol Otoño',
        image: 'UmbrellaAutumn0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.AUTUMN_LEAVE,
            quantity: 7
        }]
    }, {
        name: 'Paraguas Cereza',
        image: 'UmbrellaCherry0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.CHERRY_PETALS,
            quantity: 7
        }]
    }, {
        name: 'Parasol Hoja',
        image: 'UmbrellaLeaf0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.HERB,
            quantity: 15
        }]
    }, {
        name: 'Paraguas Seta',
        image: 'UmbrellaMushroom0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.MUSHROOM,
            quantity: 7
        }]
    }, {
        name: 'Paraguas Naranja',
        image: 'UmbrellaOrange0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.ORANGE,
            quantity: 7
        }]
    }, {
        name: 'Paraguas Melocotón',
        image: 'UmbrellaPeach0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEACH,
            quantity: 7
        }]
    }, {
        name: 'Paraguas Pera',
        image: 'UmbrellaPear0.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.PEAR,
            quantity: 7
        }]
    }
]
