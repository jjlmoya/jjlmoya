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
        this.instructions = document.getElementById("instructions");

        this.encyclopediaModal = document.getElementById("encyclopedia-modal");
        this.encyclopediaGrid = document.getElementById("encyclopedia-grid");
        this.encyclopediaStats = document.getElementById("encyclopedia-stats");

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
            fuego: { glow: "255, 87, 34", bg: "255, 87, 34", text: "text-orange-200" },
            agua: { glow: "33, 150, 243", bg: "33, 150, 243", text: "text-blue-200" },
            tierra: { glow: "121, 85, 72", bg: "121, 85, 72", text: "text-amber-200" },
            aire: { glow: "158, 158, 158", bg: "158, 158, 158", text: "text-slate-200" },
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
            this.instructions.style.opacity = "0";
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
        setInterval(() => {
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
                        hpBar.className = `h-full transition-all duration-300 ${pct < 30 ? "bg-red-500" : "bg-emerald-500"}`;
                    }
                }
            });
        }, 1000);
    }

    renderInventory() {
        this.inventoryContainer.innerHTML = "";
        this.base_elements.forEach((item) => {
            const el = document.createElement("div");
            el.className =
                "group flex items-center gap-3 p-3 md:p-2 rounded-lg bg-slate-800/50 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing select-none touch-manipulation";
            el.innerHTML = `
                <div class="w-10 h-10 md:w-8 md:h-8 rounded bg-slate-900 flex items-center justify-center text-xl md:text-lg border border-white/10">
                    <span class="iconify text-slate-300 group-hover:text-indigo-300" data-icon="${item.icon}"></span>
                </div>
                <div class="flex-1 min-w-0 hidden md:block">
                    <p class="text-xs font-bold text-slate-300 group-hover:text-white truncate">${item.name}</p>
                </div>
            `;

            this.inputSystem.makeDraggable(el, "ingredient", { data: item });
            this.inventoryContainer.appendChild(el);
        });
    }

    spawnEgg() {
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
            x: Math.random() * (this.playground.clientWidth - 100) + 50,
            y: Math.random() * (this.playground.clientHeight - 100) + 50,
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
        el.className =
            "absolute flex flex-col items-center justify-center w-24 h-24 cursor-grab active:cursor-grabbing transition-transform hover:scale-110 z-10 touch-none";
        el.style.left = `${entity.x}px`;
        el.style.top = `${entity.y}px`;
        el.style.transform = "translate(-50%, -50%)";

        const typeColor = this.getTypeColor(entity.data.types);
        let visualClass = `${typeColor.text} drop-shadow-[0_0_15px_rgba(${typeColor.glow},0.5)]`;
        let bgClass = `bg-slate-900/80 border-[rgba(${typeColor.bg},0.3)]`;

        if (entity.type === "poop") {
            visualClass = "text-amber-700 drop-shadow-md";
            bgClass = "bg-amber-900/20 border-amber-700/30";
        }

        let slotsHtml = "";
        if (entity.type === "creature") {
            slotsHtml = `<div class="absolute -top-4 flex gap-1">`;
            for (let i = 0; i < entity.maxStomach; i++) {
                const filled = entity.stomach[i];
                if (filled) {
                    const slotColor = this.getTypeColor(filled.types);
                    slotsHtml += `<div class="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-white" style="background-color: rgba(${slotColor.bg}, 0.8)"><span class="iconify" data-icon="${filled.icon}"></span></div>`;
                } else {
                    slotsHtml += `<div class="w-3 h-3 rounded-full bg-slate-800 border border-white/20 border-dashed"></div>`;
                }
            }
            slotsHtml += `</div>`;
        }

        const levelHtml =
            entity.type === "creature"
                ? `<div class="absolute -right-2 -top-2 w-5 h-5 rounded-full bg-amber-500 text-slate-900 text-[10px] font-black flex items-center justify-center border border-white/20 shadow-lg z-20">${entity.level}</div>`
                : "";

        const hpPct = (entity.currentHp / entity.data.stats.hp) * 100;
        const hpColor = hpPct < 30 ? "bg-red-500" : "bg-emerald-500";
        const hpBarHtml = `
            <div class="absolute -bottom-4 w-16 h-1.5 bg-slate-900/80 rounded-full overflow-hidden border border-white/10">
                <div id="hp-bar-${entity.id}" class="h-full ${hpColor} transition-all duration-300" style="width: ${hpPct}%"></div>
            </div>
        `;

        let xpBarHtml = "";
        if (entity.type === "creature") {
            const xpNeeded = entity.level * 100;
            const xpPct = (entity.xp / xpNeeded) * 100;
            xpBarHtml = `
                <div class="absolute -bottom-6 w-14 h-1 bg-slate-900/80 rounded-full overflow-hidden border border-white/10">
                    <div id="xp-bar-${entity.id}" class="h-full bg-indigo-400 transition-all duration-300" style="width: ${xpPct}%"></div>
                </div>
            `;
        }

        el.innerHTML = `
            ${levelHtml}
            ${slotsHtml}
            <div class="relative w-16 h-16 rounded-full border ${bgClass} backdrop-blur-sm flex items-center justify-center shadow-xl animate-float pointer-events-none">
                <span class="iconify text-4xl ${visualClass}" data-icon="${entity.data.icon}"></span>
                ${
                    entity.type === "creature"
                        ? `
                    <div class="absolute -bottom-2 px-2 py-0.5 bg-black/80 rounded-full text-[9px] font-bold text-white border border-white/10 whitespace-nowrap">
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
            el.classList.add("scale-125");
            setTimeout(() => el.classList.remove("scale-125"), 200);
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
            el.className = `relative p-4 rounded-xl border ${isDiscovered ? "bg-slate-800/50 border-white/10" : "bg-slate-900/50 border-white/5"} flex flex-col items-center text-center transition-all hover:scale-[1.02]`;

            if (isDiscovered) {
                const typeColor = this.getTypeColor(recipe.result.types);

                const inputsHtml = recipe.inputs
                    .map((inputId) => {
                        const data = this.getEntityData(inputId);
                        return `
                        <div class="w-8 h-8 rounded bg-slate-900 flex items-center justify-center border border-white/10" title="${data ? data.name : inputId}">
                            <span class="iconify text-slate-400" data-icon="${data ? data.icon : "mdi:help"}"></span>
                        </div>
                    `;
                    })
                    .join('<span class="text-slate-600">+</span>');

                el.innerHTML = `
                    <div class="mb-3 relative">
                        <div class="w-16 h-16 rounded-full bg-slate-900 border border-[rgba(${typeColor.bg},0.3)] flex items-center justify-center shadow-lg">
                            <span class="iconify text-3xl ${typeColor.text} drop-shadow-[0_0_10px_rgba(${typeColor.glow},0.5)]" data-icon="${recipe.result.icon}"></span>
                        </div>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-1">${recipe.result.name}</h3>
                    <p class="text-xs text-slate-400 mb-4 h-8 line-clamp-2">${recipe.result.desc}</p>
                    
                    <div class="w-full pt-3 border-t border-white/5">
                        <p class="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Receta</p>
                        <div class="flex items-center justify-center gap-2">
                            ${inputsHtml}
                        </div>
                    </div>
                `;
            } else {
                el.innerHTML = `
                    <div class="mb-3 relative opacity-20">
                        <div class="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                            <span class="iconify text-3xl text-white" data-icon="mdi:help"></span>
                        </div>
                    </div>
                    <h3 class="text-lg font-bold text-slate-700 mb-1">???</h3>
                    <p class="text-xs text-slate-800 mb-4">Bloqueado</p>
                `;
            }

            this.encyclopediaGrid.appendChild(el);
        });

        this.encyclopediaStats.textContent = `Descubiertos: ${discoveredCount}/${this.recipes.length}`;
    }
}
