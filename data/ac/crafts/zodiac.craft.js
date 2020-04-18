import MATERIALS from '@/data/ac/materials.data'

export default [{
    name: 'Jarron Acuario',
    image: 'FtrZodiacAquarius.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Mecedora Aries',
    image: 'FtrZodiacAries.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: [{
        ...MATERIALS.STAR_FRAGMENT,
        quantity: 3
    }, {
        ...MATERIALS.CONSTELATION_FRAGMENT('Aries'),
        quantity: 2
    }, {
        ...MATERIALS.GOLD_NUGGET,
        quantity: 1
    }, {
        ...MATERIALS.STONE,
        quantity: 5
    }]
}, {
    name: 'Mesita Cáncer',
    image: 'FtrZodiacCancer.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Escultura Capricornio',
    image: 'FtrZodiacCapricornus.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Armario Géminis',
    image: 'FtrZodiacGemini.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Cuadro Leo',
    image: 'FtrZodiacLeo.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Balanza Libra',
    image: 'FtrZodiacLibra.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Pedestal Piscis',
    image: 'FtrZodiacPisces.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Arco de Sagitario',
    image: 'FtrZodiacSagittarius.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Escultura Escorpio',
    image: 'FtrZodiacScorpio.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Fuente Tauro',
    image: 'FtrZodiacTaurus.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}, {
    name: 'Arpa Virgo',
    image: 'FtrZodiacVirgo.png',
    height: 1,
    width: 1,
    category: [],
    serie: 'zodiac',
    materials: []
}]
