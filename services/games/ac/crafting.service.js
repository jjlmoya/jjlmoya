import CRAFTS from '@/data/ac/craft.data'

export default class CraftingService {
    constructor ({ category }) {
        this.crafts = CRAFTS
        this.category = category
    }

    getCrafts () {
        return this.crafts
    }
}
