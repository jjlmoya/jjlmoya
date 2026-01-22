export class InputSystem {
    constructor(playground, entities, callbacks) {
        this.playground = playground;
        this.entities = entities;
        this.callbacks = callbacks;
        this.dragItem = null;
        this.activeListeners = { moveHandler: null, endHandler: null };

        this.setupPlayground();
    }

    setupPlayground() {
        this.playground.addEventListener("dragover", (e) => e.preventDefault());
        this.playground.addEventListener("drop", (e) => {
            e.preventDefault();
            const dataRaw = e.dataTransfer.getData("application/json");
            if (!dataRaw) return;
            const payload = JSON.parse(dataRaw);

            if (payload.type === "entity") {
                this.callbacks.onMoveEntity(payload.id, e.clientX, e.clientY);
            }
        });
    }

    makeDraggable(el, type, data) {
        console.log("[InputSystem] makeDraggable called:", {
            type,
            data,
            element: el.id || "no-id",
        });

        el.draggable = true;
        el.addEventListener("dragstart", (e) => {
            console.log("[InputSystem] dragstart (desktop):", type);
            e.dataTransfer.setData("application/json", JSON.stringify({ type, ...data }));
            e.dataTransfer.effectAllowed = type === "ingredient" ? "copy" : "move";
            if (type === "entity") el.classList.add("opacity-50");
        });

        el.addEventListener("dragend", () => {
            console.log("[InputSystem] dragend (desktop):", type);
            if (type === "entity") el.classList.remove("opacity-50");
        });

        el.addEventListener(
            "touchstart",
            (e) => {
                console.log("[InputSystem] touchstart event fired:", { type, data });
                this.handleTouchStart(e, type, data);
            },
            { passive: false }
        );

        if (type === "entity") {
            el.addEventListener("dragover", (e) => e.preventDefault());
            el.addEventListener("drop", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dataRaw = e.dataTransfer.getData("application/json");
                if (!dataRaw) return;
                const payload = JSON.parse(dataRaw);

                if (payload.type === "ingredient") {
                    this.callbacks.onDropIngredient(data.id, payload.data);
                } else if (payload.type === "entity") {
                    this.callbacks.onDropEntity(payload.id, data.id);
                }
            });
        }
    }

    handleTouchStart(e, type, data) {
        console.log("[InputSystem] handleTouchStart:", { type, data, touches: e.touches.length });

        if (e.cancelable) e.preventDefault();
        const touch = e.touches[0];

        if (type === "ingredient") {
            console.log("[InputSystem] Creating ghost for ingredient");
            const ghost = document.createElement("div");
            ghost.className =
                "fixed z-50 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white pointer-events-none shadow-xl opacity-80";
            ghost.innerHTML = `<span class="iconify text-2xl" data-icon="${data.data.icon}"></span>`;
            ghost.style.left = `${touch.clientX - 24}px`;
            ghost.style.top = `${touch.clientY - 24}px`;
            document.body.appendChild(ghost);
            this.dragItem = { type, data: data.data, ghost };
        } else if (type === "entity") {
            console.log("[InputSystem] Setting up entity drag, entity id:", data.id);

            const ent = this.entities.find((e) => e.id === data.id);
            if (!ent) {
                console.error("[InputSystem] Entity not found:", data.id);
                return;
            }

            this.dragItem = {
                type,
                entity: ent,
                offset: { x: touch.clientX - ent.x, y: touch.clientY - ent.y },
            };
            console.log("[InputSystem] Entity drag setup complete:", this.dragItem);
        }

        const moveHandler = (ev) => this.handleTouchMove(ev);
        const endHandler = (ev) => {
            this.handleTouchEnd(ev);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("touchend", endHandler);
            this.activeListeners.moveHandler = null;
            this.activeListeners.endHandler = null;
        };

        this.activeListeners.moveHandler = moveHandler;
        this.activeListeners.endHandler = endHandler;

        document.addEventListener("touchmove", moveHandler, { passive: false });
        document.addEventListener("touchend", endHandler);
        console.log("[InputSystem] Touch listeners registered");
    }

    handleTouchMove(e) {
        if (e.cancelable) e.preventDefault();
        if (!this.dragItem) return;
        const touch = e.touches[0];

        if (this.dragItem.type === "ingredient") {
            this.dragItem.ghost.style.left = `${touch.clientX - 24}px`;
            this.dragItem.ghost.style.top = `${touch.clientY - 24}px`;
        } else if (this.dragItem.type === "entity") {
            const newX = touch.clientX - this.dragItem.offset.x;
            const newY = touch.clientY - this.dragItem.offset.y;

            const el = document.getElementById(`entity-${this.dragItem.entity.id}`);
            if (el) {
                el.style.left = `${newX}px`;
                el.style.top = `${newY}px`;
            }

            this.dragItem.entity.x = newX;
            this.dragItem.entity.y = newY;
        }
    }

    handleTouchEnd(e) {
        if (!this.dragItem) return;

        const touch = e.changedTouches[0];
        const dropX = touch.clientX;
        const dropY = touch.clientY;

        if (this.dragItem.type === "ingredient") {
            const rect = this.playground.getBoundingClientRect();
            const relX = dropX - rect.left;
            const relY = dropY - rect.top;

            const target = this.entities.find((ent) => {
                const dist = Math.hypot(ent.x - relX, ent.y - relY);
                return dist < 50;
            });

            if (target) {
                this.callbacks.onDropIngredient(target.id, this.dragItem.data);
            }
            this.dragItem.ghost.remove();
        } else if (this.dragItem.type === "entity") {
            const source = this.dragItem.entity;
            const target = this.entities.find((ent) => {
                if (ent.id === source.id) return false;
                const dist = Math.hypot(ent.x - source.x, ent.y - source.y);
                return dist < 60;
            });

            if (target) {
                this.callbacks.onDropEntity(source.id, target.id);
            }
        }

        this.dragItem = null;
    }

    cleanup() {
        console.log("[InputSystem] cleanup called, current state:", {
            dragItem: this.dragItem,
            hasActiveListeners: !!(
                this.activeListeners.moveHandler || this.activeListeners.endHandler
            ),
        });

        if (this.activeListeners.moveHandler) {
            document.removeEventListener("touchmove", this.activeListeners.moveHandler);
            this.activeListeners.moveHandler = null;
            console.log("[InputSystem] Removed touchmove listener");
        }
        if (this.activeListeners.endHandler) {
            document.removeEventListener("touchend", this.activeListeners.endHandler);
            this.activeListeners.endHandler = null;
            console.log("[InputSystem] Removed touchend listener");
        }

        if (this.dragItem) {
            if (this.dragItem.ghost) {
                this.dragItem.ghost.remove();
                console.log("[InputSystem] Removed ghost element");
            }
            this.dragItem = null;
            console.log("[InputSystem] Cleared dragItem");
        }

        console.log("[InputSystem] cleanup complete");
    }
}
