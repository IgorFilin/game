const canvas = document.querySelector("#canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
class Player {
  constructor() {
    this.position = {
      x: 50,
      y: 50,
    };
    this.size = {
      width: 50,
      height: 50,
    };
    this.gravity = 0.4;
    this.speed = {
      x: 0,
      y: 0,
    };
    this.keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
      space: {
        pressed: false,
      },
    };
  }
  create() {
    ctx.fillStyle = "black";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
  moveRender() {
    this.position.y += this.speed.y;
    this.position.x += this.speed.x;
    if (this.position.y + this.size.height < canvas.height) {
      this.speed.y += this.gravity;
    } else {
      this.speed.y = 0;
      this.position.y = canvas.height - this.size.height;
    }
  }
  resize() {
    this.position.y = canvas.height - this.size.height;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  move(keyCode, statusPressed = true) {
    switch (keyCode) {
      case 68:
        this.keys.right.pressed = statusPressed;
        break;
      case 65:
        this.keys.left.pressed = statusPressed;
        break;
      case 32: {
        this.keys.space.pressed = statusPressed;
        break;
      }
    }
  }
  moved() {
    if (this.keys.right.pressed) {
      this.speed.x = 5;
    } else if (this.keys.left.pressed) {
      this.speed.x = -5;
    } else {
      this.speed.x = 0;
    }
    if (this.keys.space.pressed && this.speed.y === 0) {
      this.speed.y = -15;
    }
  }
}

class Platform {
  constructor(x, y, color, width, height) {
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

const player = new Player();

const platform = new Platform(550, 1150, "red", 200, 20);

// render функция
let is = false;

function render() {
  // initial
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.create();
  player.moved();
  player.moveRender();
  platform.create();
  // game loop
  if (
    player.position.y + player.size.height <= platform.position.y &&
    player.position.y + player.size.height + player.speed.y >=
      platform.position.y &&
    player.position.x + player.size.height >= platform.position.x &&
    player.position.x <= platform.position.x + platform.size.width
  ) {
    player.speed.y = 0;
  }

  requestAnimationFrame(render);
}

render();
