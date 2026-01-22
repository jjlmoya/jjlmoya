export class BattleSystem {
    constructor(ui) {
        this.ui = ui;
        this.onBattleEnd = null;
        this.onBattleStart = null;
        this.onClose = null;

        this.ui.closeBtn.addEventListener("click", () => this.close());

        this.typeChart = {
            fuego: { tierra: 2, aire: 2, agua: 0.5, fuego: 0.5 },
            agua: { fuego: 2, tierra: 2, agua: 0.5, aire: 0.5 },
            tierra: { aire: 2, agua: 2, tierra: 0.5, fuego: 0.5 },
            aire: { agua: 2, fuego: 2, aire: 0.5, tierra: 0.5 },
        };
    }

    getEffectiveness(attackerType, defenderType) {
        if (!this.typeChart[attackerType]) return 1;
        return this.typeChart[attackerType][defenderType] || 1;
    }

    getTypeColor(types) {
        const typeColors = {
            fuego: "255, 87, 34",
            agua: "33, 150, 243",
            tierra: "121, 85, 72",
            aire: "158, 158, 158",
        };
        const primaryType = types && types[0] ? types[0] : "aire";
        return typeColors[primaryType] || typeColors.aire;
    }

    start(fighter1, fighter2, onBattleEnd) {
        this.onBattleEnd = onBattleEnd;

        if (this.onBattleStart) this.onBattleStart();

        this.ui.overlay.classList.remove("opacity-0", "pointer-events-none");
        this.ui.closeBtn.classList.add("hidden");
        this.ui.actionText.innerText = "¡COMIENZA LA PELEA!";

        const f1Color = this.getTypeColor(fighter1.data.types);
        const f2Color = this.getTypeColor(fighter2.data.types);

        this.ui.f1.visual.innerHTML = `<span class="iconify w-full h-full" data-icon="${fighter1.data.icon}" style="color: rgb(${f1Color}); filter: drop-shadow(0 0 10px rgba(${f1Color}, 0.6))"></span>`;
        this.ui.f2.visual.innerHTML = `<span class="iconify w-full h-full" data-icon="${fighter2.data.icon}" style="color: rgb(${f2Color}); filter: drop-shadow(0 0 10px rgba(${f2Color}, 0.6))"></span>`;
        this.ui.f1.name.innerText = `${fighter1.data.name} (Lvl ${fighter1.level})`;
        this.ui.f2.name.innerText = `${fighter2.data.name} (Lvl ${fighter2.level})`;

        let hp1 = fighter1.currentHp;
        let hp2 = fighter2.currentHp;
        const maxHp1 = fighter1.data.stats.hp;
        const maxHp2 = fighter2.data.stats.hp;

        const updateHp = () => {
            this.ui.f1.hpBar.style.width = `${(hp1 / maxHp1) * 100}%`;
            this.ui.f2.hpBar.style.width = `${(hp2 / maxHp2) * 100}%`;
            this.ui.f1.hpText.innerText = `${Math.floor(hp1)}/${maxHp1}`;
            this.ui.f2.hpText.innerText = `${Math.floor(hp2)}/${maxHp2}`;
        };
        updateHp();

        let turn = 0;
        const battleInterval = setInterval(() => {
            turn++;
            const isF1Turn = turn % 2 !== 0;
            const attacker = isF1Turn ? fighter1 : fighter2;
            const defender = isF1Turn ? fighter2 : fighter1;
            const attackerDiv = isF1Turn
                ? document.getElementById("fighter-1")
                : document.getElementById("fighter-2");
            const defenderDiv = isF1Turn
                ? document.getElementById("fighter-2")
                : document.getElementById("fighter-1");

            if (attackerDiv) {
                attackerDiv.classList.add(isF1Turn ? "attack-lunge-right" : "attack-lunge-left");
                setTimeout(
                    () => attackerDiv.classList.remove("attack-lunge-right", "attack-lunge-left"),
                    200
                );
            }

            const atkStat = attacker.data.stats.atk || 10;
            const defStat = defender.data.stats.def || 0;

            const atkType = (attacker.data.types && attacker.data.types[0]) || "normal";
            const defTypes = defender.data.types || ["normal"];

            let typeMult = 1;
            defTypes.forEach((dt) => {
                typeMult *= this.getEffectiveness(atkType, dt);
            });

            const isCrit = Math.random() < 0.0625;
            const critMult = isCrit ? 1.5 : 1;

            let dmg = Math.max(1, atkStat - defStat * 0.5);
            dmg = dmg * typeMult * critMult;
            dmg += Math.random() * 5;

            if (isF1Turn) hp2 = Math.max(0, hp2 - dmg);
            else hp1 = Math.max(0, hp1 - dmg);

            fighter1.currentHp = hp1;
            fighter2.currentHp = hp2;

            updateHp();

            setTimeout(() => {
                if (defenderDiv) {
                    defenderDiv.classList.add("hit-shake");
                    setTimeout(() => defenderDiv.classList.remove("hit-shake"), 300);
                }

                let msg = `¡${attacker.data.name} golpea! -${Math.floor(dmg)}`;
                let color = isF1Turn ? "#818cf8" : "#f87171";

                if (isCrit) {
                    msg += " ¡CRÍTICO!";
                    color = "#fbbf24";
                } else if (typeMult > 1) {
                    msg += " ¡Es muy eficaz!";
                } else if (typeMult < 1) {
                    msg += " No es muy eficaz...";
                    color = "#94a3b8";
                }

                this.ui.actionText.innerText = msg;
                this.ui.actionText.style.color = color;
            }, 100);

            if (hp1 <= 0 || hp2 <= 0) {
                clearInterval(battleInterval);
                const winner = hp1 > 0 ? fighter1 : fighter2;
                const loser = hp1 > 0 ? fighter2 : fighter1;

                setTimeout(() => {
                    this.ui.actionText.innerText = `¡${winner.data.name} GANA!`;
                    this.ui.actionText.style.color = "#fbbf24";
                    this.ui.closeBtn.classList.remove("hidden");

                    if (this.onBattleEnd) this.onBattleEnd(winner, loser);
                }, 600);
            }
        }, 800);
    }

    close() {
        this.ui.overlay.classList.add("opacity-0", "pointer-events-none");
        if (this.onClose) this.onClose();
    }
}
