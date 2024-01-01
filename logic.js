import { Player } from "./player.js";
const canvas = document.querySelector("#canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = 1360;

class Platform {
  constructor(x, y, color = "red", width = 200, height = 30) {
    this.position = {
      x: x,
      y: y,
    };
    this.size = {
      width,
      height,
    };
    this.color = color;
  }
  create() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
}

// Слушатели событий
const player = new Player();

addEventListener("resize", () => {
  player.resize();
});

addEventListener("keydown", (e) => {
  // 68 right, 65 left, 32 up
  player.move(e.keyCode);
});

addEventListener("keyup", (e) => {
  player.move(e.keyCode, false);
});

const platforms = [new Platform(550, 1150), new Platform(750, 950)];

// render функция

function render() {
  // initial
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.create(ctx);
  player.moved(platforms);
  player.moveRender();
  platforms.forEach((platform) => {
    platform.create();
  });
  // game loop
  // platform collision
  platforms.forEach((platform) => {
    if (
      player.position.y + player.size.height <= platform.position.y &&
      player.position.y + player.size.height + player.speed.y >=
        platform.position.y &&
      player.position.x + player.size.height >= platform.position.x &&
      player.position.x <= platform.position.x + platform.size.width
    ) {
      player.speed.y = 0;
    }
  });

  requestAnimationFrame(render);
}

render();
