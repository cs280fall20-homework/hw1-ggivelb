import Tank from "./model/Tank.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); 

const t = new Tank(canvas.width / 2 - 25, canvas.height - 60, 50, 50, 10);


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  t.draw(ctx);
  t.missiles.filter(x => x.isActive).forEach(x => {
    x.draw(ctx)
    x.move(canvas.height)
  })
  t.move(canvas.width)
}

setInterval(draw, 10)
