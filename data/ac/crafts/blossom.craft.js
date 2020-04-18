import MATERIALS from '@/data/ac/materials.data'
import CATEGORY from '@/data/ac/category.data'

const PILE_BLOSSOM = {
    name: 'Pila de cerezos',
    image: 'FtrSakuraPetal.png',
    height: 1,
    width: 1,
    category: [CATEGORY.FURNITURE],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 5
        }
    ]
}

const BLOSSOM_BONSAI = {
    name: 'Cerezo en flor bonsái',
    image: 'FtrBonsaiSakura.png',
    height: 1,
    width: 1,
    category: [CATEGORY.FURNITURE, CATEGORY.OBJECT],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 6
        },
        {
            ...MATERIALS.SOLID_WOOD,
            quantity: 2
        },
        {
            ...MATERIALS.HERB,
            quantity: 3
        },
        {
            ...MATERIALS.CLAY,
            quantity: 3
        }
    ]
}

const BLOSSOM_FLOWERS = {
    name: 'Jarrón de cerezo',
    image: 'FtrSakuraBranch.png',
    height: 1,
    width: 1,
    category: [CATEGORY.FURNITURE],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 8
        },
        {
            ...MATERIALS.BRANCH,
            quantity: 4
        },
        {
            ...MATERIALS.CLAY,
            quantity: 5
        }
    ]
}

const PICNIC_SET = {
    name: 'Set de pícnic',
    image: 'FtrSakuraPicnicset.png',
    height: 1,
    width: 1,
    category: [CATEGORY.FURNITURE, CATEGORY.OBJECT],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 10
        }
    ]
}

const BLOSSOM_LANTERN = {
    name: 'Farol flor de cerezo',
    image: 'FtrSakuraLantern.png',
    height: 1,
    width: 1,
    category: [CATEGORY.FURNITURE],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 6
        },
        {
            ...MATERIALS.SOLID_WOOD,
            quantity: 4
        }
    ]
}

const BLOSSOM_CLOCK = {
    name: 'Reloj flor de cerezo',
    image: 'FtrSakuraClockW.png',
    height: 1,
    width: 1,
    category: [CATEGORY.WALL_OBJECT],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 5
        },
        {
            ...MATERIALS.IRON_NUGGET,
            quantity: 1
        }
    ]
}

const BLOSSOM_FLOWERS_WALL = {
    name: 'Pared de cerezos',
    image: 'RoomSpWallSakura00.png',
    height: 1,
    width: 1,
    category: [CATEGORY.WALL_FLOOR],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 10
        },
        {
            ...MATERIALS.SOLID_WOOD,
            quantity: 5
        }
    ]
}
const BLOSSOM_WALL = {
    name: 'Pared de cerezo',
    image: 'RoomTexWallSolidWood00.png',
    height: 1,
    width: 1,
    category: [CATEGORY.WALL_FLOOR],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 5
        },
        {
            ...MATERIALS.WOOD,
            quantity: 10
        }
    ]
}

const BLOSSOM_FLOWERS_FLOOR = {
    name: 'Suelo de cerezos',
    image: 'RoomTexFloorSakura00.png',
    height: 1,
    width: 1,
    category: [CATEGORY.WALL_FLOOR],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 10
        },
        {
            ...MATERIALS.HERB,
            quantity: 20
        }
    ]
}

const BLOSSOM_FLOOR = {
    name: 'Suelo de cerezo',
    image: 'RoomTexFloorSolidWood00.png',
    height: 1,
    width: 1,
    category: [CATEGORY.WALL_FLOOR],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 5
        },
        {
            ...MATERIALS.WOOD,
            quantity: 10
        }
    ]
}

const BLOSSOM_UMBRELLA = {
    name: 'Paraguas de cerezo',
    image: 'UmbrellaCherryblossom0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 7
        }
    ]
}

const BLOSSOM_PURSE = {
    name: 'Bolsito de cerezo',
    image: 'BagShoulderCherryblossoms0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 6
        }
    ]
}

const BLOSSOM_WAND = {
    name: 'Varita de cerezo',
    image: 'ToolStickCherryblossom.png',
    height: 1,
    width: 1,
    category: [CATEGORY.TOOL],
    serie: 'blossom',
    materials: [
        {
            ...MATERIALS.CHERRY_PETALS,
            quantity: 3
        },
        {
            ...MATERIALS.STAR_FRAGMENT,
            quantity: 3
        }
    ]
}

export default [
    PILE_BLOSSOM,
    BLOSSOM_BONSAI,
    BLOSSOM_FLOWERS,
    PICNIC_SET,
    BLOSSOM_LANTERN,
    BLOSSOM_CLOCK,
    BLOSSOM_FLOWERS_WALL,
    BLOSSOM_WALL,
    BLOSSOM_FLOWERS_FLOOR,
    BLOSSOM_FLOOR,
    BLOSSOM_UMBRELLA,
    BLOSSOM_PURSE,
    BLOSSOM_WAND
]
