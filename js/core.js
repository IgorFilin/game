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

const objects = [
  new GenerationObject("./assets/images/object/background_top.png", 0, 0),
  new GenerationObject("./assets/images/object/background.png", 0, 0),
  new GenerationObject("./assets/images/object/background3.png", 0, 0),
  new GenerationObject("./assets/images/object/background4.png", 0, 0),
  new GenerationObject("./assets/images/object/background5.png", 0, 0),
  new GenerationObject("./assets/images/object/background6.png", 0, 0),
  new GenerationObject(
    "./assets/images/object/lamp.png",
    300,
    canvas.height - 165
  ),
];

const movedObject = [];

const platforms = [
  new Platform(
    "./assets/images/object/base_platform.png",
    0,
    canvas.height - 40
  ),
  new Platform(
    "./assets/images/object/base_platform.png",
    250,
    canvas.height - 40
  ),
  new Platform(
    "./assets/images/object/base_platform.png",
    500,
    canvas.height - 40
  ),
  new Platform(
    "./assets/images/object/base_platform.png",
    750,
    canvas.height - 40
  ),
  new Platform(
    "./assets/images/object/base_platform.png",
    1000,
    canvas.height - 40
  ),
  new Platform(
    "./assets/images/object/base_platform.png",
    550,
    canvas.height - 250
  ),
  new Platform(
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
  objects.forEach((object) => {
    object.render(ctx);
  });
  movedObject.forEach((object) => {
    object.render(ctx);
  });
  platforms.forEach((platform) => {
    platform.render(ctx);
    platform.collision(player, platform);
  });
  player.create(ctx);
  player.moved(platforms, movedObject);
  player.moveRender();
  // animation
  requestAnimationFrame(render);
}

render();
