import { Player } from "./player/player.js";
import { Enemy } from "./enemy.js";
import { Platform } from "./platform.js";
import { GenerationObject } from "./object.js";

const canvas = document.querySelector("#canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 756;

// данные

const staticBackgroundObjects = [
  // new GenerationObject("./assets/images/object/background_top.png", 0, 0),
  new GenerationObject("./assets/images/object/background_new.png", 0, 0),
  //  new GenerationObject("./assets/images/object/background.png", 0, 0),
  //  new GenerationObject("./assets/images/object/background3.png", 0, 0),
  //  new GenerationObject("./assets/images/object/background4.png", 0, 0),
  //  new GenerationObject("./assets/images/object/background5.png", 0, 0),
  //  new GenerationObject("./assets/images/object/background6.png", 0, 0),
];

// Создание сущностей
let movedObject = [];

let platforms = [];

let player;

let enemy;

function init() {
  platforms = [
    new Platform(
      "./assets/images/object/base_platform1.png",
      0,
      canvas.height - 55
    ),
    new Platform(
      "./assets/images/object/base_platform1.png",
      400,
      canvas.height - 55
    ),
    new Platform(
      "./assets/images/object/base_platform1.png",
      750,
      canvas.height - 55
    ),
    new Platform(
      "./assets/images/object/base_platform1.png",
      1000,
      canvas.height - 55
    ),
    new Platform(
      "./assets/images/object/base_platform1.png",
      1500,
      canvas.height - 55
    ),
    new Platform(
      "./assets/images/object/base_platform1.png",
      550,
      canvas.height - 250
    ),
    new Platform(
      "./assets/images/object/base_platform1.png",
      350,
      canvas.height - 450
    ),
    new Platform(
      "./assets/images/object/base_platform1.png",
      1250,
      canvas.height - 250
    ),
  ];
  player = new Player();
  enemy = new Enemy(250, canvas.height - 120);
  movedObject = [];
}

// Слушатели событий

addEventListener("keydown", (e) => {
  // 68 right, 65 left, 32 up
  player.pressedKeysMove(e.keyCode);
});

addEventListener("keyup", (e) => {
  player.pressedKeysMove(e.keyCode, false);
});

//engine
function engine() {
  if (!player) {
    init();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  staticBackgroundObjects.forEach((object) => {
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
  player.moved(platforms, movedObject, canvas);
  player.moveRender();
  if (player.position.y + player.size.height >= canvas.height) {
    init();
  }
  enemy.create(ctx);
}

// gameLoop функция

function gameLoop() {
  engine();
  requestAnimationFrame(gameLoop);
}

gameLoop();
