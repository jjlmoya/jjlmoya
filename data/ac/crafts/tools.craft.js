import MATERIALS from '@/data/ac/materials.data'
import CATEGORY from '@/data/ac/category.data'

const WEAK_AXE = {
    name: 'Hacha Endeble',
    image: '',
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
    image: '',
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
    name: 'Hacha de piedra',
    image: '',
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
    name: 'Hacha de piedra',
    image: '',
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
        name: 'ToolAngling',
        image: 'ToolAngling.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolAxe',
        image: 'ToolAxe.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolAxeGold',
        image: 'ToolAxeGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolAxeStone',
        image: 'ToolAxeStone.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolAxeStoneNormal',
        image: 'ToolAxeStoneNormal.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolChangeStick',
        image: 'ToolChangeStick.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolFishingrodGold',
        image: 'ToolFishingrodGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolFishingrodWood',
        image: 'ToolFishingrodWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolLadder',
        image: 'ToolLadder.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolNet',
        image: 'ToolNet.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolNetGold',
        image: 'ToolNetGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolNetNormal',
        image: 'ToolNetNormal.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolOcarina',
        image: 'ToolOcarina.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolPanpipe',
        image: 'ToolPanpipe.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolScoop',
        image: 'ToolScoop.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolScoopGold',
        image: 'ToolScoopGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolShovelWood',
        image: 'ToolShovelWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolSlingshot',
        image: 'ToolSlingshot.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolSlingshotGold',
        image: 'ToolSlingshotGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickAnemones',
        image: 'ToolStickAnemones.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickBamboo',
        image: 'ToolStickBamboo.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickChrysanthemum',
        image: 'ToolStickChrysanthemum.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickCosmos',
        image: 'ToolStickCosmos.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickGolden',
        image: 'ToolStickGolden.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickHyacinth',
        image: 'ToolStickHyacinth.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickIron',
        image: 'ToolStickIron.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickMushroom',
        image: 'ToolStickMushroom.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickPansy',
        image: 'ToolStickPansy.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickRose',
        image: 'ToolStickRose.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickShell',
        image: 'ToolStickShell.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickSnow',
        image: 'ToolStickSnow.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickTree',
        image: 'ToolStickTree.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickTulip',
        image: 'ToolStickTulip.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickWood',
        image: 'ToolStickWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolStickYuri',
        image: 'ToolStickYuri.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolWatering',
        image: 'ToolWatering.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolWateringGold',
        image: 'ToolWateringGold.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }, {
        name: 'ToolWateringWood',
        image: 'ToolWateringWood.png',
        height: 1,
        width: 1,
        category: [],
        serie: 'nook',
        materials: []
    }
]
