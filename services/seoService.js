const SEO = {
    name: 'jjlmoya',
    separator: '|'
}
export default class SeoService {
    constructor ({ id, title, description, full }) {
        this.id = id
        this.title = full ? `${title} ${SEO.separator} ${SEO.name}` : `${title} `
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
