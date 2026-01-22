import { Format } from "./Format.js";

export class UIManager {
    constructor(engine) {
        this.engine = engine;
        this.draggedBizId = null;
        this.touchElement = null;

        this.cam = { x: -1800, y: -1800, scale: 0.8 };
        this.isPanning = false;
        this.hasMovedWhilePanning = false;
        this.lastPanPos = { x: 0, y: 0 };
        this.BLOCK_SIZE = 80;

        this.els = {
            debt: document.getElementById("debt-count-val"),
            growth: document.getElementById("debt-growth-val"),
            bank: document.getElementById("bank-count-val"),
            income: document.getElementById("income-count-val"),
            list: document.getElementById("biz-list-ui"),
            layer: document.getElementById("buildings-layer"),
            icons: document.getElementById("passives-icons-bar"),
            summary: document.getElementById("biz-summary"),
            map: document.getElementById("city-map"),
            viewport: document.getElementById("city-viewport"),
        };

        this.CURRENCY_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" style="display:inline-block; vertical-align:middle; margin-left:2px; opacity:0.8; flex-shrink:0;" fill="currentColor"><path d="M12 2L4 12l8 10 8-10z"/></svg>`;

        this.initEvents();
        this.applyCamera();
        this.render();
    }

    applyCamera() {
        const transform = `translate3d(${this.cam.x}px, ${this.cam.y}px, 0) scale(${this.cam.scale})`;
        if (this.els.map) this.els.map.style.transform = transform;
        if (this.els.layer) this.els.layer.style.transform = transform;
    }

    centerMap() {
        if (this.els.viewport) {
            const w = this.els.viewport.offsetWidth || window.innerWidth;
            const h = this.els.viewport.offsetHeight || 400;
            this.cam.x = w / 2 - (4000 * this.cam.scale) / 2;
            this.cam.y = h / 2 - (4000 * this.cam.scale) / 2;
            this.applyCamera();
            this.saveCamera();
        }
    }

    zoom(factor) {
        const oldScale = this.cam.scale;
        this.cam.scale = Math.min(Math.max(this.cam.scale * factor, 0.15), 2.5);

        if (this.els.viewport) {
            const w = this.els.viewport.offsetWidth;
            const h = this.els.viewport.offsetHeight;
            const cx = w / 2;
            const cy = h / 2;
            this.cam.x = cx - (cx - this.cam.x) * (this.cam.scale / oldScale);
            this.cam.y = cy - (cy - this.cam.y) * (this.cam.scale / oldScale);
        }
        this.applyCamera();
        this.saveCamera();
    }

    saveCamera() {
        if (this.engine && this.engine.persistence) {
            this.engine.persistence.save();
        }
    }

    getIcon(id, size = 24) {
        const raw = UIManager.SVGS[id];
        if (raw) return raw.replace("<svg ", `<svg width="${size}" height="${size}" `);
        return `<span class="iconify" style="display:inline-block; width:${size}px; height:${size}px;" data-icon="${id}"></span>`;
    }

    initEvents() {
        const viewport = this.els.viewport;
        if (!viewport) return;

        viewport.addEventListener("mousedown", (e) => {
            if (this.draggedBizId) return;
            if (e.target.closest(".zoom-btn")) return;
            this.isPanning = true;
            this.hasMovedWhilePanning = false;
            this.lastPanPos = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener("mousemove", (e) => {
            if (this.isPanning) {
                const dx = e.clientX - this.lastPanPos.x;
                const dy = e.clientY - this.lastPanPos.y;
                if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                    this.hasMovedWhilePanning = true;
                    this.cam.x += dx;
                    this.cam.y += dy;
                    this.lastPanPos = { x: e.clientX, y: e.clientY };
                    this.applyCamera();
                }
            }
        });

        window.addEventListener("mouseup", () => {
            if (this.isPanning) {
                this.isPanning = false;
                if (this.hasMovedWhilePanning) this.saveCamera();
            }
        });

        viewport.addEventListener("click", (e) => {
            const slot = e.target.closest(".grid-slot");
            if (slot) {
                const x = parseInt(slot.dataset.x);
                const y = parseInt(slot.dataset.y);
                const data = this.engine.grid.get(`${x},${y}`);

                if (data && !this.hasMovedWhilePanning && !this.draggedBizId) {
                    this.showBuildingDetails(x, y, data);
                    return;
                }
            }

            if (
                !this.hasMovedWhilePanning &&
                !this.draggedBizId &&
                !e.target.closest(".zoom-btn") &&
                !e.target.closest(".building-info-modal")
            ) {
                this.handleClick(e);
            }
        });

        viewport.addEventListener(
            "wheel",
            (e) => {
                if (this.draggedBizId) return;
                e.preventDefault();
                this.zoom(e.deltaY > 0 ? 0.9 : 1.1);
            },
            { passive: false }
        );

        let lastTouchDist = 0;
        viewport.addEventListener(
            "touchstart",
            (e) => {
                if (e.target.closest(".zoom-btn")) return;
                if (e.touches.length === 1) {
                    this.isPanning = true;
                    this.hasMovedWhilePanning = false;
                    this.lastPanPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                } else if (e.touches.length === 2) {
                    lastTouchDist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            },
            { passive: false }
        );

        viewport.addEventListener(
            "touchmove",
            (e) => {
                if (this.draggedBizId) return;
                if (e.touches.length === 1 && this.isPanning) {
                    const dx = e.touches[0].clientX - this.lastPanPos.x;
                    const dy = e.touches[0].clientY - this.lastPanPos.y;
                    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                        this.hasMovedWhilePanning = true;
                        this.cam.x += dx;
                        this.cam.y += dy;
                        this.lastPanPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                        this.applyCamera();
                    }
                    e.preventDefault();
                } else if (e.touches.length === 2) {
                    const dist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    this.zoom(dist / lastTouchDist);
                    lastTouchDist = dist;
                    e.preventDefault();
                }
            },
            { passive: false }
        );

        viewport.addEventListener("touchend", () => {
            if (this.isPanning) {
                this.isPanning = false;
                if (this.hasMovedWhilePanning) this.saveCamera();
            }
        });

        window.setTab = (tab) => {
            if (!this.engine) return;
            this.engine.activeTab = tab;
            document
                .querySelectorAll(".tab-btn")
                .forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
            this.render();
        };

        document.addEventListener("dragend", () => {
            this.draggedBizId = null;
            this.clearHighlights();
        });
    }

    clearHighlights() {
        document.querySelectorAll(".grid-slot").forEach((s) => {
            s.classList.remove("preview-ok", "preview-error");
        });
    }

    handleClick(e) {
        if (!this.engine) return;
        this.engine.bank.add(this.engine.clickPower);
        this.engine.debt.sub(this.engine.clickPower);
        this.showMoneyPop(e.clientX, e.clientY, this.engine.clickPower);
        this.updateStats();
    }

    showMoneyPop(x, y, amt) {
        const pop = document.createElement("div");
        pop.className = "money-pop";
        pop.style.cssText = `position:fixed; display:flex; align-items:center; gap:4px; pointer-events:none; left:${x}px; top:${y}px; z-index:9999;`;
        pop.innerHTML = `+${Format.num(amt)} ${this.CURRENCY_SVG}`;
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 800);
    }

    showBuildingIncome(gx, gy, amt) {
        const halfBlock = this.BLOCK_SIZE / 2;
        const vx = (gx * this.BLOCK_SIZE + halfBlock) * this.cam.scale + this.cam.x;
        const vy = (gy * this.BLOCK_SIZE + halfBlock) * this.cam.scale + this.cam.y;

        if (vx < 0 || vx > window.innerWidth || vy < 0 || vy > window.innerHeight) return;

        const pop = document.createElement("div");
        pop.className = "money-pop building-income";
        pop.style.cssText = `position:fixed; font-size:12px; font-weight:900; color:var(--success); pointer-events:none; left:${vx}px; top:${vy}px; z-index:400;`;
        pop.innerHTML = `+${Format.num(amt)} ${this.CURRENCY_SVG}`;
        document.body.appendChild(pop);

        setTimeout(() => pop.remove(), 1500);
    }

    showBuildingDetails(gx, gy, data) {
        const b = this.engine.getBusiness(data.bizId);
        if (!b) return;

        const existing = document.querySelector(".building-info-modal");
        if (existing) existing.remove();

        const info = document.createElement("div");
        info.className = "building-info-modal";
        info.style.cssText = `position:fixed; left:50%; top:40%; transform:translate(-50%, -50%); width:300px; background:white; border-radius:24px; padding:24px; z-index:2000; box-shadow:0 30px 60px rgba(0,0,0,0.4); border:1px solid #f1f5f9; animation: spawnPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);`;

        const synergyInfo =
            b.proximityMult > 1
                ? `<div style="margin-top:12px; padding:10px; background:rgba(16, 185, 129, 0.1); border-radius:12px; font-size:11px; color:var(--success); font-weight:800; display:flex; align-items:center; gap:8px;">🚀 SINERGIA ACTIVA: x${b.proximityMult.toFixed(1)}</div>`
                : "";

        info.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
                <div style="background:#f1f5f9; width:56px; height:56px; border-radius:18px; display:flex; align-items:center; justify-content:center; color:var(--accent);">${this.getIcon(b.icon, 32)}</div>
                <button class="close-modal-btn" style="background:#f1f5f9; border:none; width:32px; height:32px; border-radius:50%; font-size:16px; font-weight:900; color:#94a3b8; cursor:pointer; display:flex; align-items:center; justify-content:center;">×</button>
            </div>
            
            <div style="margin-bottom:20px;">
                <h3 style="margin:0; font-size:18px; font-weight:950; letter-spacing:-0.02em;">${data.name}</h3>
                <p style="margin:4px 0 0; font-size:12px; color:#64748b; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">Sector: ${b.name}</p>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                <div style="background:#f8fafc; padding:14px; border-radius:18px;">
                    <div style="font-size:10px; color:#94a3b8; font-weight:800; text-transform:uppercase; margin-bottom:4px;">Producción</div>
                    <div style="font-size:16px; font-weight:950; color:var(--success);">+${Format.num(b.getInstanceIncome())}/s</div>
                </div>
                <div style="background:#f8fafc; padding:14px; border-radius:18px;">
                    <div style="font-size:10px; color:#94a3b8; font-weight:800; text-transform:uppercase; margin-bottom:4px;">Nivel Sector</div>
                    <div style="font-size:16px; font-weight:950; color:var(--accent);">Lvl ${b.lvl}</div>
                </div>
            </div>
            
            ${synergyInfo}
            
            <div style="margin-top:20px; padding:12px; background:#f8fafc; border-radius:12px;">
                 <div style="font-size:11px; color:#64748b; font-style:italic; line-height:1.4;">"${b.description}"</div>
            </div>
        `;
        document.body.appendChild(info);

        info.querySelector(".close-modal-btn").onclick = () => info.remove();

        const closer = (e) => {
            if (!info.contains(e.target)) {
                info.remove();
                window.removeEventListener("mousedown", closer);
            }
        };
        setTimeout(() => window.addEventListener("mousedown", closer), 10);
    }

    updateStats() {
        if (!this.engine) return;
        if (this.els.debt) this.els.debt.innerText = Format.num(this.engine.debt.value);
        if (this.els.bank)
            this.els.bank.innerHTML = `${Format.num(this.engine.bank.value)}<span>${this.CURRENCY_SVG}</span>`;
        if (this.els.income)
            this.els.income.innerHTML = `+${Format.num(this.engine.getTotalIncome())}/s`;
        if (this.els.growth)
            this.els.growth.innerText = `+${(this.engine.debtGrowthRate * 1000).toFixed(2)}%/s`;
        if (this.els.summary) this.els.summary.innerText = `${this.engine.buildingCount} Sedes`;
    }

    renderGrid() {
        if (!this.els.layer || !this.engine) return;
        this.els.layer.innerHTML = "";
        const DIM = 50;

        const layer = this.els.layer;
        layer.style.display = "grid";
        layer.style.gridTemplateColumns = `repeat(${DIM}, ${this.BLOCK_SIZE}px)`;
        layer.style.gridTemplateRows = `repeat(${DIM}, ${this.BLOCK_SIZE}px)`;
        layer.style.width = "4000px";
        layer.style.height = "4000px";
        layer.style.position = "absolute";
        layer.style.inset = "0";
        layer.style.pointerEvents = "none";

        for (let y = 0; y < DIM; y++) {
            for (let x = 0; x < DIM; x++) {
                const slot = document.createElement("div");
                slot.className = "grid-slot";
                slot.dataset.x = x;
                slot.dataset.y = y;

                const isRoad = x % 4 === 0 || y % 4 === 0;
                slot.style.cssText = `background:${isRoad ? "#94a3b8" : "rgba(255,255,255,0.3)"}; border: 1px solid rgba(0,0,0,0.05); display:flex; align-items:center; justify-content:center; position:relative; pointer-events:auto;`;

                slot.ondragover = (e) => {
                    e.preventDefault();
                    if (!this.draggedBizId) return;
                    const b = this.engine.getBusiness(this.draggedBizId);
                    if (!b) return;
                    const cellType = isRoad ? "road" : "block";
                    const ok = b.allowedOn === cellType && !this.engine.grid.has(`${x},${y}`);
                    slot.classList.add(ok ? "preview-ok" : "preview-error");
                };
                slot.ondragleave = () => {
                    slot.classList.remove("preview-ok", "preview-error");
                };
                slot.ondrop = (e) => {
                    e.preventDefault();
                    slot.classList.remove("preview-ok", "preview-error");
                    if (this.draggedBizId) {
                        const success = this.engine.placeBuilding(x, y, this.draggedBizId);
                        if (success) {
                            this.draggedBizId = null;
                            this.render();
                        }
                    }
                };

                const data = this.engine.grid.get(`${x},${y}`);
                if (data) {
                    const b = this.engine.getBusiness(data.bizId);
                    if (b) {
                        const bonus = b.proximityMult > 1;
                        slot.innerHTML = `<div class="building-placed" style="background:${isRoad ? "transparent" : "white"}; padding:8px; border-radius:12px; transform: scale(${isRoad ? 1.2 : 1}); color:${bonus ? "var(--success)" : "var(--accent)"};">${this.getIcon(b.icon, isRoad ? 40 : 32)}</div>`;
                        if (bonus) slot.style.background = "rgba(16, 185, 129, 0.1)";
                    }
                }
                this.els.layer.appendChild(slot);
            }
        }
    }

    render() {
        if (!this.els.list || !this.engine) return;
        this.els.list.innerHTML = "";
        const tab = this.engine.activeTab;
        if (tab === "biz") this.renderBusinesses();
        else if (tab === "passives") this.renderPassives();
        else if (tab === "ops") this.renderOperations();
        this.updateAffordabilities();

        this.renderGrid();
        this.renderIcons();
    }

    renderBusinesses() {
        this.engine.businesses.forEach((b, idx) => {
            const isVisible = idx === 0 || this.engine.businesses[idx - 1].lvl > 0;
            if (!isVisible) return;
            const can = this.engine.bank.canAfford(b.currentCost);
            const item = document.createElement("div");
            item.className = `biz-item ${can ? "active" : "locked"}`;
            item.draggable = can;
            item.id = `biz-${b.id}`;
            item.ondragstart = (e) => {
                this.draggedBizId = b.id;
                e.dataTransfer.setData("text/plain", b.id);

                const ghost = document.createElement("div");
                ghost.style.cssText = `width:48px; height:48px; background:white; border:2px solid var(--accent); border-radius:14px; display:flex; align-items:center; justify-content:center; color:var(--accent); position:absolute; top:-100px; left:-100px; box-shadow: 0 8px 20px rgba(0,0,0,0.2);`;
                ghost.innerHTML = this.getIcon(b.icon, 32);
                document.body.appendChild(ghost);
                e.dataTransfer.setDragImage(ghost, 24, 24);
                setTimeout(() => ghost.remove(), 0);
            };

            item.innerHTML = `
                <div style="display:flex; align-items:center; flex-grow:1; min-width:0; pointer-events:none;">
                    <div class="biz-thumb" style="background:#f1f5f9; border-radius:12px; height:40px; width:40px; display:flex; align-items:center; justify-content:center;">${this.getIcon(b.icon, 20)}</div>
                    <div class="biz-body" style="padding:0 12px; flex-grow:1; min-width:0;">
                        <h4 style="margin:0; font-size:12px; font-weight:800;">${b.name} <span class="biz-lvl" style="color:var(--accent);">x${b.lvl}</span></h4>
                        <p style="margin:0; font-size:9px; opacity:0.6;">${b.instances.length} sedes construidas</p>
                    </div>
                </div>
                </div>
                <div class="biz-meta" style="flex-shrink:0; pointer-events:none;">
                    <div class="biz-cost" style="font-size:13px; font-weight:950;">${Format.num(b.currentCost)} ${this.CURRENCY_SVG}</div>
                </div>
                <div class="drag-handle" style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; color:#cbd5e1; margin-left:8px; touch-action:none;">
                    ${this.getIcon("mdi:drag-vertical", 24)}
                </div>
            `;

            const handle = item.querySelector(".drag-handle");
            if (handle) {
                handle.ontouchstart = (e) => {
                    if (!this.engine.bank.canAfford(b.currentCost)) return;
                    this.draggedBizId = b.id;

                    this.touchElement = document.createElement("div");
                    this.touchElement.className = "dragging-clone-icon";
                    this.touchElement.style.cssText = `position:fixed; width:56px; height:56px; z-index:9999; transform: translate(-50%, -50%); left:${e.touches[0].clientX}px; top:${e.touches[0].clientY}px; pointer-events:none; background:white; border:2.5px solid var(--accent); border-radius:16px; display:flex; align-items:center; justify-content:center; box-shadow: 0 12px 40px rgba(0,0,0,0.3); color:var(--accent);`;
                    this.touchElement.innerHTML = this.getIcon(b.icon, 32);
                    document.body.appendChild(this.touchElement);
                    e.stopPropagation();
                    e.preventDefault();
                };

                handle.ontouchmove = (e) => {
                    if (!this.touchElement) return;
                    const touch = e.touches[0];
                    this.touchElement.style.left = touch.clientX + "px";
                    this.touchElement.style.top = touch.clientY + "px";
                    const target = document.elementFromPoint(touch.clientX, touch.clientY);
                    const slot = target ? target.closest(".grid-slot") : null;

                    this.clearHighlights();
                    if (slot) {
                        const bx = this.engine.getBusiness(this.draggedBizId);
                        const isRoad = slot.dataset.x % 4 === 0 || slot.dataset.y % 4 === 0;
                        const ok =
                            bx.allowedOn === (isRoad ? "road" : "block") &&
                            !this.engine.grid.has(`${slot.dataset.x},${slot.dataset.y}`);
                        slot.classList.add(ok ? "preview-ok" : "preview-error");
                    }
                    e.preventDefault();
                };

                handle.ontouchend = (e) => {
                    if (!this.touchElement) return;
                    const touch = e.changedTouches[0];
                    const target = document.elementFromPoint(touch.clientX, touch.clientY);
                    const slot = target ? target.closest(".grid-slot") : null;
                    if (slot)
                        this.engine.placeBuilding(
                            parseInt(slot.dataset.x),
                            parseInt(slot.dataset.y),
                            this.draggedBizId
                        );

                    this.touchElement.remove();
                    this.touchElement = null;
                    this.draggedBizId = null;
                    this.render();
                };
            }
            this.els.list.appendChild(item);
        });
    }

    renderPassives() {
        this.engine.businesses.forEach((b) => {
            const next = this.engine.passives
                .filter((p) => p.bId === b.id)
                .find((p) => !p.purchased);
            if (next && next.isUnlocked(this.engine)) {
                const can = this.engine.bank.canAfford(next.cost);
                const item = document.createElement("div");
                item.className = `biz-item ${can ? "active" : "locked"}`;
                item.id = `pass-${next.id}`;
                item.onclick = () => this.engine.buyPassive(next.id);
                item.innerHTML = `
                    <div style="display:flex; align-items:center; flex-grow:1; min-width:0;">
                        <div class="biz-thumb" style="background:#f1f5f9; border-radius:12px; height:40px; width:40px; display:flex; align-items:center; justify-content:center; color:var(--accent);">${this.getIcon(next.icon, 20)}</div>
                        <div class="biz-body" style="padding:0 12px; flex-grow:1;">
                            <h4 style="margin:0; font-size:12px; font-weight:800;">${next.name} <span class="biz-lvl">R${next.rank}</span></h4>
                            <p style="margin:0; font-size:9px; opacity:0.6;">${next.description}</p>
                        </div>
                    </div>
                    <div class="biz-meta">
                        <div class="biz-cost" style="font-size:13px; font-weight:950; color:var(--accent);">${Format.num(next.cost)} ${this.CURRENCY_SVG}</div>
                    </div>
                `;
                this.els.list.appendChild(item);
            }
        });
    }

    renderOperations() {
        this.engine.operations.forEach((op) => {
            if (op.type === "payment" && !this.engine.bank.canAfford(op.cost)) return;
            const item = document.createElement("div");
            item.className = "biz-item active";
            item.id = `op-${op.id}`;
            item.onclick = () => this.engine.runOperation(op.id);
            item.innerHTML = `
                <div style="display:flex; align-items:center; flex-grow:1;">
                    <div class="biz-thumb" style="background:#fff1f2; border-radius:12px; height:40px; width:40px; display:flex; align-items:center; justify-content:center; color:var(--danger);">${this.getIcon(op.type === "payment" ? "mdi:trending-down" : "mdi:cog", 20)}</div>
                    <div class="biz-body" style="padding:0 12px; flex-grow:1;">
                        <h4 style="margin:0; font-size:12px; font-weight:800;">${op.name}</h4>
                        <p style="margin:0; font-size:9px; opacity:0.6;">${op.description}</p>
                    </div>
                </div>
                <div class="biz-meta">
                    <div class="biz-cost" style="font-size:13px; font-weight:950; color:var(--danger);">${Format.num(op.cost)} ${this.CURRENCY_SVG}</div>
                </div>
            `;
            this.els.list.appendChild(item);
        });
    }

    renderIcons() {
        if (!this.els.icons || !this.engine) return;
        this.els.icons.innerHTML = "";
        this.engine.passives
            .filter((p) => p.purchased)
            .forEach((p) => {
                const d = document.createElement("div");
                d.className = "p-icon-chip";
                d.style.color = "var(--accent)";
                d.innerHTML = this.getIcon(p.icon, 14);
                this.els.icons.appendChild(d);
            });
    }

    updateAffordabilities() {
        if (!this.engine) return;
        const tab = this.engine.activeTab;

        if (tab === "biz") {
            this.engine.businesses.forEach((b) => {
                const el = document.getElementById(`biz-${b.id}`);
                if (el) {
                    const can = this.engine.bank.canAfford(b.currentCost);
                    el.classList.toggle("active", can);
                    el.classList.toggle("locked", !can);
                    el.draggable = can;
                }
            });
        } else if (tab === "passives") {
            this.engine.businesses.forEach((b) => {
                const next = this.engine.passives
                    .filter((p) => p.bId === b.id)
                    .find((p) => !p.purchased);
                if (next) {
                    const el = document.getElementById(`pass-${next.id}`);
                    if (el && next.isUnlocked(this.engine)) {
                        const can = this.engine.bank.canAfford(next.cost);
                        el.classList.toggle("active", can);
                        el.classList.toggle("locked", !can);
                    }
                }
            });
        } else if (tab === "ops") {
            this.engine.operations.forEach((op) => {
                const el = document.getElementById(`op-${op.id}`);
                if (el) {
                    const can = this.engine.bank.canAfford(op.cost);
                    el.classList.toggle("active", can);
                    el.classList.toggle("locked", !can);
                }
            });
        }
    }

    static SVGS = {
        "mdi:store-outline": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        "mdi:food-burger": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 11h8"/><path d="M10 15h4"/></svg>`,
        "mdi:washing-machine": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v4l2 2"/></svg>`,
        "mdi:dumbbell": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v18M18 3v18M3 12h18"/><rect x="4" y="7" width="4" height="2"/><rect x="4" y="15" width="4" height="2"/><rect x="16" y="7" width="4" height="2"/><rect x="16" y="15" width="4" height="2"/></svg>`,
        "mdi:office-building": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="8" y2="6"/><line x1="12" y1="6" x2="12" y2="6"/><line x1="16" y1="6" x2="16" y2="6"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/></svg>`,
        "mdi:brain": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.04-2.44 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.04-2.44A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.04-2.44 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2.04-2.44A2.5 2.5 0 0 0 14.5 2z"/></svg>`,
        "mdi:truck-delivery": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
        "mdi:medical-bag": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`,
        "mdi:domain": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m-18 0l2-4h14l2 4M5 21V11m14 10V11M9 21V11m6 10V11"/></svg>`,
        "mdi:satellite-variant": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 7L9 3M17 11L21 15M2 11l9 9M11 2l9 9M8 12c-2 2-2 5 0 7s5 2 7 0M12 8c2-2 5-2 7 0s2 5 0 7"/></svg>`,
        "mdi:atom": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>`,
        "mdi:city-variant-outline": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M13 21V9l6 3v9M8 9h2M8 12h2M8 15h2M16 15h2"/></svg>`,
        "mdi:eye-outline": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
        "mdi:shield-plus": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
        "mdi:vector-combine": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="10" height="10" rx="2"/><rect x="11" y="11" width="10" height="10" rx="2"/></svg>`,
        "mdi:cog": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>`,
        "mdi:trending-down": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`,
        "mdi:pill": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
        "mdi:dna": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 12h8"/><path d="M7 19h10"/><path d="M10 5h4"/><path d="M19 8.5c0 3-5 3-5 6s5 3 5 6"/><path d="M5 8.5c0 3 5 3 5 6s-5 3-5 6"/></svg>`,
        "mdi:lightning-bolt": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
        "mdi:drag-vertical": `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
    };
}
