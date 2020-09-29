import Sprite from "./Sprite.js"

const gameOver = new CustomEvent("gameover")

class Invader extends Sprite {
    constructor(x, y, dy, wobble_size) {
        const img = new Image(50, 50)
        img.src = "./assets/Invader.png"
        super(x, y, 50, 50, img)
        this.dy = dy
        this.wobble = wobble_size
    }

    move(canvasWidth, canvasHeight) {
        this.y += this.dy
        this.handleBoundary(canvasWidth, canvasHeight)
        const rand = Math.random()
        if (rand < 0.4) {
            // wobble right
            this.x += this.wobble
        } else if (rand < 0.8) {
            // wobble left
            this.x -= this.wobble
        } // else dont wobble
    }

    handleBoundary(canvasWidth, canvasHeight) {
        if (this.y + this.height > canvasHeight) {
            document.dispatchEvent(gameOver)
        }
        if (this.x < 0) {
            this.x = 0
        } else if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width
        }
    }

    intersects(other) {
        let tw = this.width;
        let th = this.height;
        let rw = other.width;
        let rh = other.height;
        if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
          return false;
        }
        let tx = this.x;
        let ty = this.y;
        let rx = other.x;
        let ry = other.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        //      overflow || intersect
        return (
          (rw < rx || rw > tx) &&
          (rh < ry || rh > ty) &&
          (tw < tx || tw > rx) &&
          (th < ty || th > ry)
        );
    }
}

export default Invader