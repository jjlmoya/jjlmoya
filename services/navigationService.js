const MENU = [{
    name: 'Sobre Mi',
    submenu: [
        {
            name: 'C.V.',
            link: './docs/cv.pdf',
            target: '_blank'
        },
        {
            name: 'Empresas',
            link: ''
        }
    ]
},
{
    name: 'Habilidades',
    submenu: [
        {
            name: 'Idiomas',
            link: ''
        },
        {
            name: 'Código',
            link: ''
        }
    ]
},
{
    name: 'Experimental',
    submenu: [
        {
            name: '1',
            link: ''
        },
        {
            name: '2',
            link: ''
        }
    ]
},
{
    name: 'IRL',
    submenu: [
        {
            name: 'Cocina',
            link: ''
        },
        {
            name: 'Fitness',
            link: ''
        },
        {
            name: 'IMC',
            link: ''
        },
        {
            name: 'Huerto',
            link: 'irl/huerto'
        }
    ]
}
]
export default class NavigationService {
    constructor () {
        this.menu = MENU
    }

    getMenus () {
        return this.menu
    }
}
