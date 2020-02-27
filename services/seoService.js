const SEO = {
    name: 'jjlmoya',
    separator: '|'
}
export default class SeoService {
    constructor ({ id, title, description }) {
        this.id = id
        this.title = `${title} ${SEO.separator} ${SEO.name}`
        this.description = description
    }

    getMetas () {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description
                }
            ]
        }
    }
}
