import { Player } from "./player/player.js";
import { Platform } from "./platform.js";
import { GenerationObject } from "./object.js";

const canvas = document.querySelector("#canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 756;

// Создание сущностей
const player = new Player();

// const platforms = [new Platform(550, 350), new Platform(750, 600)];

const objects = [
  new GenerationObject("./assets/images/object/background_top.png", 0, 0),
  new GenerationObject("./assets/images/object/background.png", 0, 0),
  new GenerationObject(
    "./assets/images/object/base_platform.png",
    0,
    canvas.height - 40
  ),
  new GenerationObject(
    "./assets/images/object/base_platform.png",
    250,
    canvas.height - 40
  ),
  new GenerationObject(
    "./assets/images/object/base_platform.png",
    500,
    canvas.height - 40
  ),
  new GenerationObject(
    "./assets/images/object/base_platform.png",
    750,
    canvas.height - 40
  ),
  new GenerationObject(
    "./assets/images/object/base_platform.png",
    1000,
    canvas.height - 40
  ),
  new GenerationObject(
    "./assets/images/object/base_platform.png",
    550,
    canvas.height - 250
  ),
  new GenerationObject(
    "./assets/images/object/base_platform.png",
    350,
    canvas.height - 450
  ),
];

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
  // platforms.forEach((platform) => {
  //   platform.create(ctx);
  //   platform.collision(player, platform);
  // });
  objects.forEach((object) => {
    object.render(ctx);
    object.collision(player, object);
  });
  player.create(ctx);
  player.moved();
  player.moveRender();
  // animation
  requestAnimationFrame(render);
}

render();
