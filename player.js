const playerImages = {
  cost: {
    imageCost: [
      "./assets/images/Warrior_Idle_1.png",
      "./assets/images/Warrior_Idle_2.png",
      "./assets/images/Warrior_Idle_3.png",
      "./assets/images/Warrior_Idle_4.png",
      "./assets/images/Warrior_Idle_5.png",
      "./assets/images/Warrior_Idle_6.png",
    ],
    imagesNode: [],
  },
};
for (let i = 0; i < playerImages.cost.imageCost.length; i++) {
  const src = playerImages.cost.imageCost[i];
  const playerImage = new Image();
  playerImage.src = src;
  playerImages.cost.imagesNode.push(playerImage);
}
let currentImageCost = 0;

let playerImage = playerImages.cost.imagesNode[currentImageCost];

setInterval(() => {
  currentImageCost += 1;
  if (currentImageCost > playerImages.cost.imagesNode.length - 1)
    currentImageCost = 0;
  playerImage = playerImages.cost.imagesNode[currentImageCost];
}, 150);
class Player {
  constructor() {
    this.position = {
      x: 150,
      y: 50,
    };
    this.currentDirection = 1;
    this.size = {
      width: 150,
      height: 115,
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
  create(ctx) {
    // Сохраняем текущие настройки контекста
    ctx.save();
    let positionX;
    if (this.currentDirection === 1) {
      positionX = this.position.x;
    } else {
      positionX = -this.position.x - this.size.width;
    }

    // Отзеркаливаем по горизонтали
    ctx.scale(this.currentDirection, 1);

    // Рисуем отзеркаленное изображение
    ctx.drawImage(
      playerImage,
      positionX, // Позиция x отзеркаленного изображения
      this.position.y,
      this.size.width,
      this.size.height
    );

    // Восстанавливаем предыдущие настройки контекста
    ctx.restore();
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
        this.currentDirection = 1;
        break;
      case 65:
        this.keys.left.pressed = statusPressed;
        this.currentDirection = -1;
        break;
      case 32: {
        this.keys.space.pressed = statusPressed;
        break;
      }
    }
  }
  moved(platforms) {
    if (this.keys.right.pressed && this.position.x <= canvas.width / 2) {
      this.speed.x = 5;
    } else if (this.keys.left.pressed && this.position.x >= canvas.width / 4) {
      this.speed.x = -5;
    } else {
      platforms.forEach((platform) => {
        if (this.keys.right.pressed) {
          platform.position.x += -5;
        }
        if (this.keys.left.pressed) {
          platform.position.x += 5;
        }
      });
      this.speed.x = 0;
    }
    if (this.keys.space.pressed && this.speed.y === 0) {
      this.speed.y = -15;
    }
  }
}

export { Player };
