import Tank from "./model/Tank.js";
import Invader from "./model/Invader.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "aqua";
ctx.font = "20px Arial";

const music = document.getElementById("music")
const explosion = document.getElementById("explosion")

const t = new Tank(canvas.width / 2 - 25, canvas.height - 60, 10);
let invaders = new Array();

let score = 0;

function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText("Invaders shot down: " +  score, 10, 25);
  ctx.fillText("Missiles remaining: " + t.missiles.filter(x => !x.isActive).length, 10, 50);

  t.draw(ctx)
}
function draw() {
  // if music is done, start again
  if (music.paused) {
    music.play()
  }

  // with some probability, spawn an invader
  const rand = Math.random()
  if (rand < 0.005) {
    const loc = Math.random()
    let speed = Math.random()
    speed = speed > 0.1 ? speed : 0
    invaders.push(new Invader(loc * (canvas.width - 50), 0, 5 * speed, 1))
  }

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Display update score
  ctx.fillText("Invaders shot down: " +  score, 10, 25)
  ctx.fillText("Missiles remaining: " + t.missiles.filter(x => !x.isActive).length, 10, 50)

  // draw and move the tank
  t.draw(ctx);
  t.move(canvas.width)

  // draw and move the missiles
  t.missiles.filter(x => x.isActive).forEach(x => {
    x.draw(ctx)
    x.move(canvas.height)
    const colisions = invaders.filter(y => !y.intersects(x))
    if (colisions.length < invaders.length) {
      x.isActive = false;
      invaders = colisions;
      explosion.play()
      score++;
    }
  });

  // draw and move the invaders
  invaders.forEach(x => {
    x.draw(ctx)
    x.move(canvas.width, canvas.height)
  });
}

let interval = setInterval(init, 10) // for some reason I need to set interval to get init to work

document.addEventListener("gamestart", (e) => {
  clearInterval(interval)
  interval = setInterval(draw, 10)
  music.play()
});

document.addEventListener("gameover", (e) => {
  clearInterval(interval)
  music.pause()
  ctx.fillText("GAME OVER", canvas.width / 2 - 60,  300)
})
