import { playerImages } from "./data.js";

class Player {
  constructor() {
    this.position = {
      x: 250,
      y: 50,
    };
    this.extremePoints = {
      positive: 700,
      negative: 200,
    };
    this.currentDirection = 1;
    this.currentImagesPack = "cost";
    this.intervalId;
    this.playerImage;
    this.timeOutCamera;
    this.size = {
      width: 37,
      height: 50,
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
    // Изменения пака изображений для анимации разных действий персонажа
    if (this.speed.y !== 0) {
      this.currentImagesPack = "jump";
    } else if (
      this.keys.right.pressed ||
      (this.keys.left.pressed && this.speed.y <= 0)
    ) {
      this.currentImagesPack = "run";
    } else {
      this.currentImagesPack = "cost";
    }

    // Запуск интервала для анимирования персонажа с помощью пака картинок
    if (!this.intervalId) {
      let currentImageCost = 0;

      this.playerImage =
        playerImages[this.currentImagesPack].imagesNode[currentImageCost];

      if (!this.size.width && !this.size.height) {
        this.size.width = this.playerImage.width;
        this.size.height = this.playerImage.height;
      }

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
  pressedKeysMove(keyCode, statusPressed = true) {
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
  moveCamera(objects, movedObject, canvas) {
    if (
      (this.speed.x === 0 && this.position.x <= this.extremePoints.negative) ||
      this.position.x >= this.extremePoints.positive
    ) {
      let centerPosition = canvas.width / 2;
      let idInterval;

      let direction = -this.currentDirection;
      console.log(idInterval);
      if (!this.timeOutCamera && !idInterval) {
        this.timeOutCamera = setTimeout(() => {
          console.log("debug", this.timeOutCamera);
          // logic moved camera
          idInterval = setInterval(() => {
            this.position.x += direction;
            objects.forEach((object) => {
              object.position.x += direction;
            });
            movedObject.forEach((object) => {
              object.position.x += direction;
            });
            if (
              centerPosition === this.position.x ||
              this.currentDirection === direction
            ) {
              clearInterval(idInterval);
              this.timeOutCamera = null;
            }
          }, 0.5);
          //
        }, 400);
        // } else {
        //   clearTimeout(this.timeOutCamera);
        //   this.timeOutCamera = null;
        // }
      }
    }
    if (this.keys.right.pressed || this.keys.left.pressed) {
      this.timeOutCamera = null;
      clearTimeout(this.timeOutCamera);
    }
  }
  moved(objects, movedObject, canvas) {
    if (this.keys.right.pressed) {
      if (this.position.x < this.extremePoints.positive) {
        this.speed.x = 3;
      } else {
        objects.forEach((object) => {
          object.position.x -= 3;
        });
        movedObject.forEach((object) => {
          object.position.x -= 2;
        });
        this.speed.x = 0;
      }
    } else if (this.keys.left.pressed) {
      if (this.position.x > this.extremePoints.negative) {
        this.speed.x = -3;
      } else {
        objects.forEach((object) => {
          object.position.x += 3;
        });
        movedObject.forEach((object) => {
          object.position.x += 2;
        });
        this.speed.x = 0;
      }
    } else {
      this.moveCamera(objects, movedObject, canvas);
      this.speed.x = 0;
    }
    if (this.keys.space.pressed && this.speed.y === 0) {
      this.speed.y = -10;
    }
  }
}

export { Player };
