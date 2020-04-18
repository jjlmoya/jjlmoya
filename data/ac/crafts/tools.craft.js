import MATERIALS from '@/data/ac/materials.data'
import CATEGORY from '@/data/ac/category.data'

const WEAK_AXE = {
    name: 'Hacha Endeble',
    image: 'ToolAxeStone.png',
    height: 1,
    width: 1,
    category: [CATEGORY.TOOL],
    serie: 'nook',
    materials: [
        {
            ...MATERIALS.BRANCH,
            quantity: 5
        },
        {
            ...MATERIALS.STONE,
            quantity: 1
        }
    ]
}

const STONE_AXE = {
    name: 'Hacha de piedra',
    image: 'ToolAxeStoneNormal.png',
    height: 1,
    width: 1,
    category: [CATEGORY.TOOL],
    serie: 'nook',
    materials: [
        {
            ...MATERIALS.WEAK_AXE,
            quantity: 1
        },
        {
            ...MATERIALS.WOOD,
            quantity: 3
        }
    ]
}

const AXE = {
    name: 'Hacha',
    image: 'ToolAxe.png',
    height: 1,
    width: 1,
    category: [CATEGORY.TOOL],
    serie: 'nook',
    materials: [
        {
            ...MATERIALS.WEAK_AXE,
            quantity: 1
        },
        {
            ...MATERIALS.WOOD,
            quantity: 3
        },
        {
            ...MATERIALS.IRON_NUGGET,
            quantity: 1
        }
    ]
}

const GOLD_AXE = {
    name: 'Hacha de oro',
    image: 'ToolAxeGold.png',
    height: 1,
    width: 1,
    category: [CATEGORY.TOOL],
    serie: 'nook',
    materials: [
        {
            ...MATERIALS.GOLD_NUGGET,
            quantity: 1
        },
        {
            ...MATERIALS.AXE,
            quantity: 1
        }

    ]
}

export default [
    WEAK_AXE,
    STONE_AXE,
    AXE,
    GOLD_AXE,
    {
        name: 'Caña de Pescar',
        image: 'ToolAngling.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.WEAK_FISHING_ROD,
                quantity: 1
            },
            {
                ...MATERIALS.IRON_NUGGET,
                quantity: 1
            }
        ]
    }, {
        name: 'Varita Estrella',
        image: 'ToolChangeStick.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.STAR_FRAGMENT,
            quantity: 1
        },
        {
            ...MATERIALS.STAR_FRAGMENT_XL,
            quantity: 1
        }]
    }, {
        name: 'Caña Dorada',
        image: 'ToolFishingrodGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.FISHING_ROD,
                quantity: 1
            },
            {
                ...MATERIALS.GOLD_NUGGET,
                quantity: 1
            }
        ]
    }, {
        name: 'Caña Endeble',
        image: 'ToolFishingrodWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.BRANCH,
                quantity: 5
            }
        ]
    }, {
        name: 'Escalera',
        image: 'ToolLadder.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.WOOD,
                quantity: 4
            },
            {
                ...MATERIALS.FLEXIBLE_WOOD,
                quantity: 4
            },
            {
                ...MATERIALS.SOLID_WOOD,
                quantity: 4
            }
        ]
    }, {
        name: 'Red Endeble',
        image: 'ToolNet.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.BRANCH,
                quantity: 5
            }
        ]
    }, {
        name: 'Red Dorada',
        image: 'ToolNetGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.NET,
                quantity: 1
            },
            {
                ...MATERIALS.GOLD_NUGGET,
                quantity: 1
            }
        ]
    }, {
        name: 'Red',
        image: 'ToolNetNormal.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.WEAK_NET,
                quantity: 1
            },
            {
                ...MATERIALS.IRON_NUGGET,
                quantity: 1
            }
        ]
    }, {
        name: 'Ocarina',
        image: 'ToolOcarina.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.CLAY,
                quantity: 5
            }
        ]
    }, {
        name: 'Flauta de Pan',
        image: 'ToolPanpipe.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.CLAY,
                quantity: 5
            }
        ]
    }, {
        name: 'Pala',
        image: 'ToolScoop.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.WEAK_SHOVEL,
            quantity: 1
        },
        {
            ...MATERIALS.IRON_NUGGET,
            quantity: 1
        }]
    }, {
        name: 'Pala Dorada',
        image: 'ToolScoopGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SHOVEL,
            quantity: 1
        },
        {
            ...MATERIALS.GOLD_NUGGET,
            quantity: 1
        }]
    }, {
        name: 'Pala Endeble',
        image: 'ToolShovelWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 5
        }]
    }, {
        name: 'Tirachinas',
        image: 'ToolSlingshot.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SOLID_WOOD,
            quantity: 5
        }]
    }, {
        name: 'Tirachinas Dorado',
        image: 'ToolSlingshotGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.SLINGSHOT,
            quantity: 1
        },
        {
            ...MATERIALS.GOLD_NUGGET,
            quantity: 1
        }]
    }, {
        name: 'Varita de Anémona',
        image: 'ToolStickAnemones.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Bambú',
        image: 'ToolStickBamboo.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.BAMBU_SPRING,
            quantity: 6
        },
        {
            ...MATERIALS.STAR_FRAGMENT,
            quantity: 3
        }]
    }, {
        name: 'Varita de Crisantemo',
        image: 'ToolStickChrysanthemum.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita Cosmos',
        image: 'ToolStickCosmos.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Vara Dorada',
        image: 'ToolStickGolden.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Vara de Jacinto',
        image: 'ToolStickHyacinth.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Vara de hierro',
        image: 'ToolStickIron.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [{
            ...MATERIALS.IRON_NUGGET,
            quantity: 3
        },
        {
            ...MATERIALS.STAR_FRAGMENT,
            quantity: 3
        }]
    }, {
        name: 'Varita de setas',
        image: 'ToolStickMushroom.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de viola',
        image: 'ToolStickPansy.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Rosa',
        image: 'ToolStickRose.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Conchas',
        image: 'ToolStickShell.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Nieve',
        image: 'ToolStickSnow.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Árbol',
        image: 'ToolStickTree.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Tulipán',
        image: 'ToolStickTulip.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Madera',
        image: 'ToolStickWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Varita de Lirio',
        image: 'ToolStickYuri.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'Regadera',
        image: 'ToolWatering.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.WEAK_WATER_CANING,
                quantity: 1
            },
            {
                ...MATERIALS.IRON_NUGGET,
                quantity: 1
            }
        ]
    }, {
        name: 'Regadera de Oro',
        image: 'ToolWateringGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.WATER_CANING,
                quantity: 1
            },
            {
                ...MATERIALS.GOLD_NUGGET,
                quantity: 1
            }
        ]
    }, {
        name: 'Regadera Endeble',
        image: 'ToolWateringWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: [
            {
                ...MATERIALS.FLEXIBLE_WOOD,
                quantity: 5
            }
        ]
    }
]
