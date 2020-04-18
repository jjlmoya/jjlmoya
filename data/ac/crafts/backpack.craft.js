import MATERIALS from '@/data/ac/materials.data'
import CATEGORY from '@/data/ac/category.data'

const BACKPACK_BASKET = {
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
}

const BACKPACK_GRASS = {
    name: 'Mochila de Mimbre',
    image: 'BagBackpackGrass0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'nook',
    materials: [{
        ...MATERIALS.HERB,
        quantity: 20
    }]
}

const BACKPACK_WOOD = {
    name: 'BACKPACK_WOOD',
    image: 'BagBackpackWood0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'nook',
    materials: []
}

const BACKPACK_ACORN = {
    name: 'BACKPACK_ACORN',
    image: 'BagShoulderAcorn0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'nook',
    materials: []
}

const BACKPACK_MAPLE = {
    name: 'BACKPACK_MAPLE',
    image: 'BagShoulderMaple0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'nook',
    materials: []
}

const BACKPACK_SHELL = {
    name: 'BACKPACK_SHELL',
    image: 'BagShoulderShell0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'nook',
    materials: []
}

const BACKPACK_SNOW = {
    name: 'BACKPACK_SHELL',
    image: 'BagShoulderSnow0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'nook',
    materials: []
}

const BACKPACK_STAR = {
    name: 'BACKPACK_STAR',
    image: 'BagShoulderStar0.png',
    height: 1,
    width: 1,
    category: [CATEGORY.CLOTH],
    serie: 'nook',
    materials: []
}

export default [
    BACKPACK_BASKET,
    BACKPACK_ACORN,
    BACKPACK_MAPLE,
    BACKPACK_STAR,
    BACKPACK_WOOD,
    BACKPACK_SNOW,
    BACKPACK_SHELL,
    BACKPACK_GRASS
]
