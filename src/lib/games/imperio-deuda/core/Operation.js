export class Operation {
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.cost = config.cost;
        this.description = config.description;
        this.effect = config.effect;
    }
}
