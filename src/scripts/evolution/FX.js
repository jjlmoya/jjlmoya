export class FX {
    constructor(container) {
        this.container = container;
    }

    createExplosion(x, y, colorRGB) {
        for (let i = 0; i < 10; i++) {
            const p = document.createElement("div");
            p.className = "evo-fx-particle";
            p.style.backgroundColor = `rgb(${colorRGB})`;
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            this.container.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 50 + 20;

            p.animate(
                [
                    { transform: "translate(0,0) scale(1)", opacity: 1 },
                    {
                        transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`,
                        opacity: 0,
                    },
                ],
                { duration: 500, easing: "ease-out" }
            ).onfinish = () => p.remove();
        }
    }
}
