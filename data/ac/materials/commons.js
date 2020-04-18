const WOOD = {
    name: 'Madera normal',
    image: 'wood.png'
}

const FLEXIBLE_WOOD = {
    name: 'Madera flexible',
    image: 'flexible-wood.png'
}

const SOLID_WOOD = {
    name: 'Madera rígida',
    image: 'solid-wood.png'
}

const BRANCH = {
    name: 'Rama',
    image: 'branch.png'
}

const STONE = {
    name: 'Piedra',
    image: 'stone.png'
}

const IRON_NUGGET = {
    name: 'Pepita de Hierro',
    image: 'iron-nugget.png'
}

const GOLD_NUGGET = {
    name: 'Pepita de Oro',
    image: 'gold-nugget.png'
}

const HERB = {
    name: 'Hierbajo',
    image: 'herb.png'
}

const JAPANESE_CLAM = {
    name: 'Almeja japonesa',
    image: 'clam.png'
}

const CLAY = {
    name: 'Bola de arcilla',
    image: 'clay.png'
}

const WASP_NEST = {
    name: 'Aviespero',
    image: 'wasp-nest.png'
}

const TRASH_CAN = {
    name: 'Chatarra',
    image: 'can.png'
}

const TRASH_WHEEL = {
    name: 'Neumático',
    image: 'wheel.png'
}

const TRASH_BOOT = {
    name: 'Bota',
    image: 'boot.png'
}

const STAR_FRAGMENT = {
    name: 'Fragmento de estrella',
    image: 'star-fragment.png'
}

const STAR_FRAGMENT_XL = {
    name: 'Fragmento de estrella XL',
    image: 'star-fragment-xl.png'
}

const CONSTELATION_FRAGMENT = (name) => {
    return {
        name: 'Fragmento de Constelación ' + name,
        image: 'star-fragment-xl.png'
    }
}

const FURNITURE = (name) => {
    return {
        name,
        image: 'furniture.png'
    }
}

const CLOTH = (name) => {
    return {
        name,
        image: 'cloth.png'
    }
}

const RUSTY_PIECE = {
    name: 'Pieza oxidada',
    image: 'rusty-piece.png'
}
export default {
    WOOD,
    FLEXIBLE_WOOD,
    SOLID_WOOD,
    BRANCH,
    STONE,
    IRON_NUGGET,
    GOLD_NUGGET,
    HERB,
    JAPANESE_CLAM,
    CLAY,
    WASP_NEST,
    TRASH_BOOT,
    TRASH_CAN,
    TRASH_WHEEL,
    STAR_FRAGMENT,
    STAR_FRAGMENT_XL,
    CONSTELATION_FRAGMENT,
    FURNITURE,
    RUSTY_PIECE,
    CLOTH
}
