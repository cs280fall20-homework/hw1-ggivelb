import Sprite from "./Sprite.js"
import Missile from "./Missile.js"

const gameStart = new CustomEvent("gamestart")

class Tank extends Sprite {
    constructor(x, y, ammoSize) {
        const img = new Image(50, 50);
        img.src = "./assets/tank.png";
        super(x, y, 50, 50, img);
        this.dx = 0

        document.addEventListener("keydown", this.keyDownHandler.bind(this))
        document.addEventListener("keyup", this.keyUpHandler.bind(this))
        this.shoot = document.getElementById("shoot")

        this.ammoSize = ammoSize
        this.missiles = new Array()
        for (var i = 0; i < ammoSize; i ++) {
            this.missiles.push(new Missile(10, 20))
        }
        this.start = false
        this.numShots = 0
    }

    keyDownHandler(e) {
        const startGame = () => {
            if (!this.start) {
                document.dispatchEvent(gameStart);
                this.start = true;
            }
        }

        if (e.key === "Right" || e.key === "ArrowRight") {
            this.dx = 4
            startGame()
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            this.dx = -4
            startGame()
        } else if (e.key === " ") {
            startGame()
            const missile = this.missiles[this.numShots % this.ammoSize]
            if (!missile.isActive) {
                missile.fire(this.x + this.width / 2 - 5, this.y)
                this.shoot.play()
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