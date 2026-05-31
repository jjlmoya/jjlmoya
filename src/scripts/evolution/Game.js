import { BattleSystem } from "./BattleSystem.js";
import { InputSystem } from "./InputSystem.js";
import { FX } from "./FX.js";

export class Game {
    constructor(config) {
        this.base_elements = config.base_elements;
        this.recipes = config.recipes;
        this.entities = [];
        this.nextId = 1;

        this.playground = document.getElementById("playground");
        this.entitiesLayer = document.getElementById("entities-layer");
        this.inventoryContainer = document.getElementById("inventory");
        this.instructions = document.getElementById("stone-tutorial");

        this.encyclopediaModal = document.getElementById("encyclopedia-modal");
        this.encyclopediaGrid = document.getElementById("encyclopedia-grid");
        this.encyclopediaStats = document.getElementById("encyclopedia-stats");

        if (!this.playground || !this.entitiesLayer || !this.inventoryContainer) {
            console.warn("[Game] Required elements missing. Aborting init.");
            return;
        }

        this.fx = new FX(this.entitiesLayer);
        this.battleSystem = new BattleSystem({
            overlay: document.getElementById("battle-overlay"),
            closeBtn: document.getElementById("close-battle"),
            actionText: document.getElementById("battle-action-text"),
            f1: {
                visual: document.getElementById("f1-visual"),
                name: document.getElementById("f1-name"),
                hpBar: document.getElementById("f1-hp-bar"),
                hpText: document.getElementById("f1-hp-text"),
            },
            f2: {
                visual: document.getElementById("f2-visual"),
                name: document.getElementById("f2-name"),
                hpBar: document.getElementById("f2-hp-bar"),
                hpText: document.getElementById("f2-hp-text"),
            },
        });

        this.inputSystem = new InputSystem(this.playground, this.entities, {
            onDropIngredient: (entityId, ingredient) => this.feedEntity(entityId, ingredient),
            onDropEntity: (sourceId, targetId) => this.handleEntityCollision(sourceId, targetId),
            onMoveEntity: (id, clientX, clientY) => this.moveEntity(id, clientX, clientY),
        });

        this.battleSystem.onBattleStart = () => {
            this.inputSystem.cleanup();
        };
        this.battleSystem.onClose = () => {
            this.inputSystem.cleanup();
        };

        this.renderInventory();
        this.setupControls();
        this.startPassiveHealing();

        this.loadGame();
        this.loadEncyclopedia();
    }

    getTypeColor(types) {
        const typeColors = {
            fuego: { glow: "255, 87, 34", bg: "255, 87, 34", class: "evo-type-fuego" },
            agua: { glow: "33, 150, 243", bg: "33, 150, 243", class: "evo-type-agua" },
            tierra: { glow: "121, 85, 72", bg: "121, 85, 72", class: "evo-type-tierra" },
            aire: { glow: "158, 158, 158", bg: "158, 158, 158", class: "evo-type-aire" },
        };

        const primaryType = types && types[0] ? types[0] : "aire";
        return typeColors[primaryType] || typeColors.aire;
    }

    saveGame() {
        const saveData = {
            entities: this.entities.map((e) => ({
                id: e.id,
                type: e.type,
                data: e.data,
                x: e.x,
                y: e.y,
                stomach: e.stomach,
                level: e.level,
                xp: e.xp,
                maxStomach: e.maxStomach,
                currentHp: e.currentHp,
            })),
            nextId: this.nextId,
        };
        localStorage.setItem("evolution_game_save", JSON.stringify(saveData));
    }

    loadGame() {
        const saved = localStorage.getItem("evolution_game_save");
        if (saved) {
            try {
                const saveData = JSON.parse(saved);
                this.nextId = saveData.nextId || 1;

                this.entities.length = 0;
                saveData.entities.forEach((e) => {
                    this.entities.push({
                        ...e,
                        inBattle: false,
                    });
                });

                this.renderEntities();
            } catch (e) {
                console.error("Failed to load save:", e);
                this.spawnEgg();
            }
        } else {
            this.spawnEgg();
        }
    }

    saveEncyclopedia() {
        localStorage.setItem(
            "evolution_encyclopedia",
            JSON.stringify([...this.discoveredCreatures])
        );
    }

    loadEncyclopedia() {
        const saved = localStorage.getItem("evolution_encyclopedia");
        if (saved) {
            try {
                this.discoveredCreatures = new Set(JSON.parse(saved));
            } catch (e) {
                this.discoveredCreatures = new Set();
            }
        } else {
            this.discoveredCreatures = new Set();
        }
    }

    setupControls() {
        document.getElementById("spawn-egg-btn").addEventListener("click", () => {
            this.spawnEgg();
            if (this.instructions) {
                this.instructions.style.opacity = "0";
            }
        });

        document.getElementById("clear-btn").addEventListener("click", () => {
            this.entities.length = 0;
            this.renderEntities();
            this.saveGame();
        });

        const openBtn = document.getElementById("encyclopedia-btn");
        const closeBtn = document.getElementById("close-encyclopedia");

        openBtn.addEventListener("click", () => {
            this.renderEncyclopedia();
            this.encyclopediaModal.style.opacity = "1";
            this.encyclopediaModal.style.pointerEvents = "auto";
        });

        closeBtn.addEventListener("click", () => {
            this.encyclopediaModal.style.opacity = "0";
            this.encyclopediaModal.style.pointerEvents = "none";
        });
    }

    startPassiveHealing() {
        this.healingInterval = setInterval(() => {
            this.entities.forEach((entity) => {
                if (entity.currentHp <= 0 || entity.inBattle) return;

                const maxHp = entity.data.stats.hp;
                if (entity.currentHp < maxHp) {
                    const healAmount = Math.max(1, Math.floor(maxHp * 0.02));
                    entity.currentHp = Math.min(maxHp, entity.currentHp + healAmount);

                    const hpBar = document.getElementById(`hp-bar-${entity.id}`);
                    if (hpBar) {
                        const pct = (entity.currentHp / maxHp) * 100;
                        hpBar.style.width = `${pct}%`;
                        hpBar.className = "evo-entity-hp-bar " + (pct < 30 ? "evo-hp-bar--low" : "evo-hp-bar--ok");
                    }
                }
            });
        }, 1000);
    }

    destroy() {
        if (this.healingInterval) {
            clearInterval(this.healingInterval);
        }
        if (this.inputSystem) {
            this.inputSystem.cleanup();
        }
    }

    renderInventory() {
        this.inventoryContainer.innerHTML = "";
        this.base_elements.forEach((item) => {
            const el = document.createElement("div");
            el.className = "evo-inventory-item";
            el.innerHTML = `
                <div class="evo-inventory-icon-box">
                    <span class="iconify evo-inventory-icon" data-icon="${item.icon}"></span>
                </div>
                <div class="evo-inventory-name-box">
                    <p class="evo-inventory-name">${item.name}</p>
                </div>
            `;

            this.inputSystem.makeDraggable(el, "ingredient", { data: item });
            this.inventoryContainer.appendChild(el);
        });
    }

    spawnEgg() {
        const width = this.playground ? this.playground.clientWidth : 800;
        const height = this.playground ? this.playground.clientHeight : 600;
        const finalWidth = width > 100 ? width : 800;
        const finalHeight = height > 100 ? height : 600;

        this.spawnEntity({
            type: "creature",
            data: {
                id: "egg",
                name: "Huevo",
                icon: "mdi:egg",
                desc: "...",
                stats: { atk: 10, def: 5, hp: 100 },
                types: ["normal"],
            },
            x: Math.random() * (finalWidth - 100) + 50,
            y: Math.random() * (finalHeight - 100) + 50,
        });
    }

    spawnEntity(props) {
        const entity = {
            id: this.nextId++,
            type: props.type,
            data: props.data,
            x: props.x,
            y: props.y,
            stomach: [],
            level: 1,
            xp: 0,
            maxStomach: 1,
            currentHp: props.data.stats ? props.data.stats.hp : 100,
            inBattle: false,
        };
        this.entities.push(entity);
        this.renderEntity(entity);
        this.saveGame();
    }

    renderEntity(entity) {
        const existing = document.getElementById(`entity-${entity.id}`);
        if (existing) existing.remove();

        const el = document.createElement("div");
        el.id = `entity-${entity.id}`;
        el.className = "evo-entity";
        el.style.left = `${entity.x}px`;
        el.style.top = `${entity.y}px`;
        el.style.transform = "translate(-50%, -50%)";

        const typeColor = this.getTypeColor(entity.data.types);
        
        let entityTypeClass = typeColor.class;
        let isPoop = entity.type === "poop";
        if (isPoop) {
            entityTypeClass = "evo-type-poop";
        }

        let slotsHtml = "";
        if (entity.type === "creature") {
            slotsHtml = `<div class="evo-entity-slots">`;
            for (let i = 0; i < entity.maxStomach; i++) {
                const filled = entity.stomach[i];
                if (filled) {
                    const slotColor = this.getTypeColor(filled.types);
                    slotsHtml += `<div class="evo-entity-slot evo-entity-slot--filled ${slotColor.class}" style="background-color: rgba(${slotColor.bg}, 0.8)"><span class="iconify" data-icon="${filled.icon}"></span></div>`;
                } else {
                    slotsHtml += `<div class="evo-entity-slot evo-entity-slot--empty"></div>`;
                }
            }
            slotsHtml += `</div>`;
        }

        const levelHtml =
            entity.type === "creature"
                ? `<div class="evo-entity-level">${entity.level}</div>`
                : "";

        const hpPct = (entity.currentHp / entity.data.stats.hp) * 100;
        const hpColorClass = hpPct < 30 ? "evo-hp-bar--low" : "evo-hp-bar--ok";
        const hpBarHtml = `
            <div class="evo-entity-hp-container">
                <div id="hp-bar-${entity.id}" class="evo-entity-hp-bar ${hpColorClass}" style="width: ${hpPct}%"></div>
            </div>
        `;

        let xpBarHtml = "";
        if (entity.type === "creature") {
            const xpNeeded = entity.level * 100;
            const xpPct = (entity.xp / xpNeeded) * 100;
            xpBarHtml = `
                <div class="evo-entity-xp-container">
                    <div id="xp-bar-${entity.id}" class="evo-entity-xp-bar" style="width: ${xpPct}%"></div>
                </div>
            `;
        }

        el.innerHTML = `
            ${levelHtml}
            ${slotsHtml}
            <div class="evo-entity-visual ${entityTypeClass}" style="--type-glow: ${typeColor.glow}; --type-bg: ${typeColor.bg};">
                <span class="iconify evo-entity-icon" data-icon="${entity.data.icon}"></span>
                ${
                    entity.type === "creature"
                        ? `
                    <div class="evo-entity-name">
                        ${entity.data.name}
                    </div>
                `
                        : ""
                }
            </div>
            ${hpBarHtml}
            ${xpBarHtml}
        `;

        this.inputSystem.makeDraggable(el, "entity", { id: entity.id });
        this.entitiesLayer.appendChild(el);
    }

    renderEntities() {
        this.entitiesLayer.innerHTML = "";
        this.entities.forEach((e) => this.renderEntity(e));
    }

    moveEntity(id, clientX, clientY) {
        const ent = this.entities.find((e) => e.id === id);
        if (ent) {
            const rect = this.playground.getBoundingClientRect();
            ent.x = clientX - rect.left;
            ent.y = clientY - rect.top;

            const el = document.getElementById(`entity-${ent.id}`);
            if (el) {
                el.style.left = `${ent.x}px`;
                el.style.top = `${ent.y}px`;
            }
            this.saveGame();
        }
    }

    feedEntity(entityId, ingredient) {
        const entity = this.entities.find((e) => e.id === entityId);
        if (!entity || entity.type !== "creature") return;

        let canFeed = false;

        if (entity.stomach.length < entity.maxStomach) {
            canFeed = true;
        } else if (entity.data.id === "egg" && entity.stomach.length === 1) {
            const i1 = entity.stomach[0];
            const i2 = ingredient;
            const recipe = this.recipes.find(
                (r) =>
                    (r.inputs[0] === i1.id && r.inputs[1] === i2.id) ||
                    (r.inputs[0] === i2.id && r.inputs[1] === i1.id)
            );
            if (recipe) canFeed = true;
        }

        if (!canFeed) {
            const el = document.getElementById(`entity-${entity.id}`);
            if (el) {
                el.animate(
                    [
                        { transform: "translate(-50%, -50%) translateX(0)" },
                        { transform: "translate(-50%, -50%) translateX(-5px)" },
                        { transform: "translate(-50%, -50%) translateX(5px)" },
                        { transform: "translate(-50%, -50%) translateX(0)" },
                    ],
                    { duration: 300 }
                );
            }
            return;
        }

        const el = document.getElementById(`entity-${entity.id}`);
        if (el) {
            el.classList.add("evo-entity--feeding");
            setTimeout(() => el.classList.remove("evo-entity--feeding"), 200);
        }

        entity.stomach.push(ingredient);

        if (entity.data.id === "egg" && entity.stomach.length === 1) {
            entity.data.name = `Huevo de ${ingredient.name}`;
            if (ingredient.types && ingredient.types.length > 0) {
                entity.data.types = ingredient.types;
            }
        }

        this.checkEvolution(entity);
        this.renderEntity(entity);
        this.saveGame();
    }

    checkEvolution(entity) {
        if (entity.data.id !== "egg") return;
        if (entity.stomach.length < 2) return;

        let recipe = null;
        for (let i = 0; i < entity.stomach.length; i++) {
            for (let j = i + 1; j < entity.stomach.length; j++) {
                const i1 = entity.stomach[i];
                const i2 = entity.stomach[j];

                const r = this.recipes.find(
                    (rec) =>
                        (rec.inputs[0] === i1.id && rec.inputs[1] === i2.id) ||
                        (rec.inputs[0] === i2.id && rec.inputs[1] === i1.id)
                );

                if (r) {
                    recipe = r;
                    break;
                }
            }
            if (recipe) break;
        }

        if (recipe) {
            entity.data = recipe.result;
            entity.currentHp = recipe.result.stats.hp;
            entity.stomach = [];
            this.fx.createExplosion(entity.x, entity.y, "232, 121, 249");
            this.unlockRecipe(recipe);
            this.saveGame();
        } else if (entity.stomach.length >= entity.maxStomach && entity.data.id === "egg") {
            entity.type = "poop";
            entity.data = {
                id: "poop",
                name: "Caca",
                icon: "mdi:emoticon-poop",
                desc: "Huele mal.",
                stats: { atk: 0, def: 0, hp: 1 },
                types: ["normal"],
            };
            entity.stomach = [];
            this.fx.createExplosion(entity.x, entity.y, "120, 53, 15");
            this.saveGame();
        }
    }

    handleEntityCollision(sourceId, targetId) {
        const source = this.entities.find((e) => e.id === sourceId);
        const target = this.entities.find((e) => e.id === targetId);

        if (!source || !target) return;

        if (sourceId === targetId) return;

        const canFight = (e) =>
            (e.type === "creature" && e.data.id !== "egg") ||
            e.type === "poop" ||
            (e.data.id === "egg" && e.stomach.length > 0);

        if (canFight(source) && canFight(target)) {
            source.inBattle = true;
            target.inBattle = true;

            this.battleSystem.start(source, target, (winner, loser) => {
                source.inBattle = false;
                target.inBattle = false;

                this.gainXp(winner, 50);

                if (loser.type === "poop" || loser.currentHp <= 0) {
                    const loserIndex = this.entities.findIndex((e) => e.id === loser.id);
                    if (loserIndex !== -1) {
                        this.entities.splice(loserIndex, 1);
                    }
                }

                this.renderEntities();
                this.saveGame();
            });
        }
    }

    gainXp(entity, amount) {
        entity.xp += amount;
        const xpNeeded = entity.level * 100;

        if (entity.xp >= xpNeeded) {
            entity.level++;
            entity.xp -= xpNeeded;
            entity.maxStomach++;
            this.fx.createExplosion(entity.x, entity.y, "255, 215, 0");
            entity.currentHp = entity.data.stats.hp;
            this.renderEntity(entity);
            this.saveGame();
        } else {
            const xpBar = document.getElementById(`xp-bar-${entity.id}`);
            if (xpBar) {
                const pct = (entity.xp / xpNeeded) * 100;
                xpBar.style.width = `${pct}%`;
            }
            this.saveGame();
        }
    }

    getEntityData(id) {
        const base = this.base_elements.find((e) => e.id === id);
        if (base) return base;
        const recipe = this.recipes.find((r) => r.result.id === id);
        if (recipe) return recipe.result;
        return null;
    }

    unlockRecipe(recipe) {
        if (!this.discoveredCreatures.has(recipe.result.id)) {
            this.discoveredCreatures.add(recipe.result.id);
            this.saveEncyclopedia();
        }
    }

    renderEncyclopedia() {
        this.encyclopediaGrid.innerHTML = "";
        let discoveredCount = 0;

        this.recipes.forEach((recipe) => {
            const isDiscovered = this.discoveredCreatures.has(recipe.result.id);
            if (isDiscovered) discoveredCount++;

            const el = document.createElement("div");
            el.className = "evo-enc-card " + (isDiscovered ? "evo-enc-card--discovered" : "evo-enc-card--locked");

            if (isDiscovered) {
                const typeColor = this.getTypeColor(recipe.result.types);

                const inputsHtml = recipe.inputs
                    .map((inputId) => {
                        const data = this.getEntityData(inputId);
                        return `
                        <div class="evo-enc-recipe-input" title="${data ? data.name : inputId}">
                            <span class="iconify" data-icon="${data ? data.icon : "mdi:help"}"></span>
                        </div>
                    `;
                    })
                    .join('<span class="evo-enc-recipe-plus">+</span>');

                el.innerHTML = `
                    <div class="evo-enc-card-icon-box-wrapper">
                        <div class="evo-enc-card-icon-box ${typeColor.class}" style="--type-bg: ${typeColor.bg}; --type-glow: ${typeColor.glow}">
                            <span class="iconify" data-icon="${recipe.result.icon}"></span>
                        </div>
                    </div>
                    <h3 class="evo-enc-recipe-title">${recipe.result.name}</h3>
                    <p class="evo-enc-recipe-desc">${recipe.result.desc}</p>
                    
                    <div class="evo-enc-recipe-inputs-container">
                        <p class="evo-enc-recipe-label">Receta</p>
                        <div class="evo-enc-recipe-inputs">
                            ${inputsHtml}
                        </div>
                    </div>
                `;
            } else {
                el.innerHTML = `
                    <div class="evo-enc-card-icon-box-wrapper evo-locked">
                        <div class="evo-enc-card-icon-box">
                            <span class="iconify" data-icon="mdi:help"></span>
                        </div>
                    </div>
                    <h3 class="evo-locked-title">???</h3>
                    <p class="evo-locked-desc">Bloqueado</p>
                `;
            }

            this.encyclopediaGrid.appendChild(el);
        });

        this.encyclopediaStats.textContent = `Descubiertos: ${discoveredCount}/${this.recipes.length}`;
    }
}
