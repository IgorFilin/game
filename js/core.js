import { Player } from "./player/player.js";
import { Platform } from "./platform.js";

const canvas = document.querySelector("#canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 756;

// Создание сущностей
const player = new Player();

const platforms = [new Platform(550, 350), new Platform(750, 600)];

// Слушатели событий

addEventListener("keydown", (e) => {
  // 68 right, 65 left, 32 up
  player.move(e.keyCode);
});

addEventListener("keyup", (e) => {
  player.move(e.keyCode, false);
});

// render функция

function render() {
  // initial
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.create(ctx);
  player.moved(platforms);
  player.moveRender();
  platforms.forEach((platform) => {
    platform.create(ctx);
    platform.collision(player, platform);
  });

  // animation
  requestAnimationFrame(render);
}

render();
