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
  initialize() {
    this.position.y += this.speed;
    this.speed += this.gravity;
  }
  render() {
    this.create();
    this.initialize();
  }
}

const player = new Player();

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.render();
  requestAnimationFrame(render);
}

render();
