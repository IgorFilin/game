import { createImage } from "./utils.js";

export class Enemy {
  constructor(x, y, image) {
    this.position = {
      x,
      y,
    };
    this.playerImage = createImage("../assets/images/ememy/Skeleton/idle.png");
    this.size = {
      width: 95,
      height: 65,
    };
    this.currentDirection = 1;
    this.status = "idle";
    this.frames = 1;
    this.idInterval;
  }

  create(ctx) {
    if (this.frames >= 4) {
      this.frames = 1;
    }
    this.frames++;
    // Сохраняем текущие настройки контекста
    // ctx.save();
    let positionX;
    if (this.currentDirection === 1) {
      positionX = this.position.x;
    } else {
      positionX = -this.position.x - this.size.width;
    }

    // Отзеркаливаем по горизонтали
    ctx.scale(this.currentDirection, 1);

    // Рисуем отзеркаленное изображение
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      this.playerImage,
      115 * this.frames,
      0,
      115,
      53,
      positionX, // Позиция x отзеркаленного изображения
      this.position.y,
      this.size.width,
      this.size.height
    );
    // Нарисовать бордер вокруг изображения
    ctx.strokeStyle = "red"; // Цвет бордера (можете изменить на нужный)
    ctx.lineWidth = 2; // Толщина бордера (можете изменить на нужную)

    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    // Восстанавливаем предыдущие настройки контекста
    // ctx.restore();
  }
}
