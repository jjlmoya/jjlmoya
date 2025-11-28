export class InputHandler {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            jump: false,
            slide: false,
        };

        this.jumpPressed = false;

        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        switch (e.code) {
            case "ArrowLeft":
            case "KeyA":
                this.keys.left = true;
                break;
            case "ArrowRight":
            case "KeyD":
                this.keys.right = true;
                break;
            case "ArrowUp":
            case "KeyW":
            case "Space":
                if (!this.keys.jump) {
                    this.jumpPressed = true;
                }
                this.keys.jump = true;
                break;
            case "ArrowDown":
            case "KeyS":
            case "ShiftLeft":
            case "ShiftRight":
                this.keys.down = true;
                this.keys.slide = true;
                break;
        }
    }

    handleKeyUp(e) {
        switch (e.code) {
            case "ArrowLeft":
            case "KeyA":
                this.keys.left = false;
                break;
            case "ArrowRight":
            case "KeyD":
                this.keys.right = false;
                break;
            case "ArrowUp":
            case "KeyW":
            case "Space":
                this.keys.jump = false;
                this.jumpPressed = false;
                break;
            case "ArrowDown":
            case "KeyS":
            case "ShiftLeft":
            case "ShiftRight":
                this.keys.down = false;
                this.keys.slide = false;
                break;
        }
    }
}
