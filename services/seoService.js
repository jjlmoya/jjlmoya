const SEO = {
    name: 'jjlmoya',
    separator: '|'
}
export default class SeoService {
    constructor ({ title, description }) {
        this.title = `${title} ${SEO.separator} ${SEO.name}`
        this.description = description
    }
}
