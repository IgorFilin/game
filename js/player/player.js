import { playerImages } from "./data.js";

class Player {
  constructor() {
    this.position = {
      x: 150,
      y: 50,
    };
    this.currentDirection = 1;
    this.currentImagesPack = "cost";
    this.intervalId;
    this.playerImage;
    this.size = {
      width: 150,
      height: 110,
    };
    this.gravity = 0.2;
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
    if (this.speed.y !== 0) {
      this.currentImagesPack = "jump";
    } else if (this.speed.x > 0 || this.speed.x < 0) {
      this.currentImagesPack = "run";
    } else {
      this.currentImagesPack = "cost";
    }

    if (!this.intervalId) {
      let currentImageCost = 0;

      this.playerImage =
        playerImages[this.currentImagesPack].imagesNode[currentImageCost];

      this.intervalId = setInterval(() => {
        currentImageCost += 1;
        if (
          currentImageCost >
          playerImages[this.currentImagesPack].imagesNode.length - 1
        )
          currentImageCost = 0;
        this.playerImage =
          playerImages[this.currentImagesPack].imagesNode[currentImageCost];
      }, 150);
    }
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
      this.playerImage,
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
  moved() {
    if (this.keys.right.pressed) {
      this.speed.x = 5;
    } else if (this.keys.left.pressed) {
      this.speed.x = -5;
    } else {
      this.speed.x = 0;
    }
    if (this.keys.space.pressed && this.speed.y === 0) {
      this.speed.y = -10;
    }
  }
}

export { Player };