import Sprite from "./Sprite.js"

class Missile extends Sprite {
    constructor(width, height) {
        const img = new Image(50, 50);
        img.src = "./assets/missile.png";
        super(0, 0, width, height, img);
        this.dy = -5
        this.isActive = false
    }

    fire(x, y) {
        this.isActive = true
        this.x = x
        this.y = y
    }

    move(canvasHeight) {
        this.y += this.dy
        this.handleBoundary(canvasHeight)
    }

    handleBoundary(canvasHeight) {
        if (this.y + this.height < 0) {
            this.isActive = false
        }
    }
}

export default Missile