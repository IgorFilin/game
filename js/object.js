import { createImage } from "./utils.js";

class GenerationObject {
  constructor(imagePath, x, y) {
    this.image = createImage(imagePath);
    this.position = {
      x,
      y,
    };
    this.size = {
      width: null,
      height: null,
    };
    this.image.onload = () => {
      this.size.width = this.image.width;
      this.size.height = this.image.height;
    };
  }
  render(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
    // Нарисовать бордер вокруг изображения
    // ctx.strokeStyle = "red"; // Цвет бордера (можете изменить на нужный)
    // ctx.lineWidth = 2; // Толщина бордера (можете изменить на нужную)

    // ctx.strokeRect(
    //   this.position.x,
    //   this.position.y,
    //   this.size.width,
    //   this.size.height
    // );
  }
}

export { GenerationObject };
