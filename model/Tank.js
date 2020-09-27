import Sprite from "./Sprite.js"
import Missile from "./Missile.js"

class Tank extends Sprite {
    constructor(x, y, width, height, ammoSize) {
        const img = new Image(50, 50);
        img.src = "./assets/tank.png";
        super(x, y, width, height, img);
        this.dx = 0
        document.addEventListener("keydown", this.keyDownHandler.bind(this))
        document.addEventListener("keyup", this.keyUpHandler.bind(this))
        this.ammoSize = ammoSize
        this.missiles = new Array()
        for (var i = 0; i < ammoSize; i ++) {
            this.missiles.push(new Missile(10, 30))
        }

        this.numShots = 0
    }

    keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 4
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = -4
        } else if (e.key === " ") {
            const missile = this.missiles[this.numShots % this.ammoSize]
            if (!missile.isActive) {
                missile.fire(this.x + this.width / 2 - 5, this.y)
                this.numShots++;
            }
        }
    }

    keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 0
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = 0
        }
    }

    move(canvasWidth) {
        this.x += this.dx
        this.handleBoundary(canvasWidth)
    }

    handleBoundary(canvasWidth) {
        if (this.x < 0) {
            this.x = 0
        } else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width
        }
    }
}

export default Tank