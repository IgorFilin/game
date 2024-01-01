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
    this.gravity = 1;
    this.speed = {
      x: 0,
      y: 0,
    };
  }
  create() {
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
  moveGravity() {
    this.position.y += this.speed.y;
    this.position.x += this.speed.x;

    if (this.position.y + this.size.height <= canvas.height) {
      this.speed.y += this.gravity;
    } else {
      this.speed.y = 0;
      this.position.y = canvas.height - this.size.height;
    }
  }
  move(keyCode) {
    switch (keyCode) {
      case 39:
        this.speed.x += 7;
        break;
      case 37:
        this.speed.x -= 7;
        break;
      case 38: {
        this.speed.y -= 15;
        break;
      }
    }
  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.create();
    this.moveGravity();
    requestAnimationFrame(() => this.render());
  }
}

// Слушатели событий

addEventListener("resize", () => {
  player.position.y = 0;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener("keydown", (e) => {
  // 39 right, 37 left, 38 up
  player.move(e.keyCode);
});

addEventListener("keyup", () => {
  player.speed.x = 0;
});

const player = new Player();

player.render();
