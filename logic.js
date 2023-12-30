const canvas = document.querySelector("#canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

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
    this.gravity = 0.5;
    this.speed = 0;
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
    if (this.position.y + this.size.height <= canvas.height) {
      this.position.y += this.speed;
      this.speed += this.gravity;
    } else this.speed = 0;
  }
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.create();
    this.moveGravity();
    requestAnimationFrame(() => this.render());
  }
}

const player = new Player();

// function render() {
//   player.render();

//   console.log("render");
// }

player.render();
