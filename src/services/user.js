
const IS_FRAMEWORK = {
    framework: true
}
const getSkill = (name, level, options) => {
    return {
        name,
        level,
        ...options
    }
}

const getLang = (name, level, options) => {
    return {
        name,
        level,
        ...options
    }
}
export const user = {
    timeline: [
        {
            company: 'Indra',
            web: 'https://www.indracompany.com/',
            logo: 'https://www.elindependiente.com/wp-content/uploads/2016/11/Indra-1440x624.jpg',
            title: 'Front End Developer',
            dateIn: 'Abril 2014',
            dateOut: 'Noviembre 2015'
        },
        {
            company: 'eDreams ODIGEO',
            web: 'https://www.edreamsodigeo.com',
            logo: 'https://marketing4ecommerce.net/wp-content/uploads/2014/03/eDreams-1.jpg',
            title: 'Senior Front End Developer',
            dateIn:  'Noviembre 2015',
            dateOut: 'Enero 2018'
        },
        {
            company: 'Ávoris Travel',
            web: 'https://www.avoristravel.com',
            logo: 'https://www.preferente.com/wp-content/uploads/2018/10/%C3%A1voris.jpg',
            title: 'Full Stack Developer',
            dateIn: 'Enero 2018',
            dateOut: 'Diciembre 2020'
        },
        {
            company: 'beJAOFIT',
            web: 'https://www.bejao.fit',
            logo: 'https://trabajoenremoto.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--618999728c1caf8559cf53746317ac92aeb83dd4/bejaofit-logo.png',
            title: 'Architect & Front End (Hybrid Apps)',
            dateIn: 'Diciembre 2020',
            dateOut: ''
        }
    ],
    skills: [
        getSkill('Javascript', 5),
        getSkill('Vue3', 5, IS_FRAMEWORK),
        getSkill('Vue2', 5, IS_FRAMEWORK),
        getSkill('Nuxt', 5, IS_FRAMEWORK),
        getSkill('SEO', 5),
        getSkill('CRO', 5),
        getSkill('Maquetación', 4),
        getSkill('NodeJS', 5),
        getSkill('Patrones de Diseño', 4),
        getSkill('Capacitor', 5),
        getSkill('ReactJS', 3, IS_FRAMEWORK),
        getSkill('Angular', 3, IS_FRAMEWORK),
        getSkill('Express', 4, IS_FRAMEWORK),
        getSkill('Sequelize', 4, IS_FRAMEWORK),
    ],
    lang: [
        getLang('Castellano', 5, { maternal: true}),
        getLang('Catalán', 5, { maternal: true}),
        getLang('English', 4),
        getLang('Pусский', 2),




    ]
}
console.log(user.skills)

export const getTimeline = () => user.timeline
export const getSkills = () => user.skills