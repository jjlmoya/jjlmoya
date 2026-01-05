export class Passive {
    constructor(config) {
        this.id = config.id || "unknown";
        this.bId = config.bId || "";
        this.rank = config.rank || 1;
        this.name = config.name || "Mejora";
        this.cost = Number(config.cost) || 0;
        this.requiredLvl = Number(config.requiredLvl) || 0;
        this.otherReq = config.otherReq || null;
        this.icon = config.icon || "mdi:plus";
        this.description = config.description || "";
        this.effect = config.effect || (() => { });
        this.purchased = false;
    }

    isUnlocked(engine) {
        if (!engine || typeof engine.getBusiness !== 'function') return false;

        const b = engine.getBusiness(this.bId);
        if (!b || b.lvl < this.requiredLvl) return false;

        if (this.otherReq) {
            const other = engine.getBusiness(this.otherReq.bId);
            if (!other || other.lvl < this.otherReq.lvl) return false;
        }

        return true;
    }
}
