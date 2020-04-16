const MENU = [{
    name: 'About Me',
    submenu: [
        {
            name: 'C. Vitae',
            link: './docs/cv.pdf',
            target: '_blank'
        },
        {
            name: 'Companies',
            link: ''
        }
    ]
},
{
    name: 'Skills',
    submenu: [
        {
            name: 'Languages',
            link: ''
        },
        {
            name: 'Code',
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
    name: 'Health',
    submenu: [
        {
            name: 'Recipes',
            link: ''
        },
        {
            name: 'Workouts',
            link: ''
        },
        {
            name: 'IMC',
            link: ''
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
