import { createImage } from "./utils.js";

class GenerationObject {
  constructor(x, y, imagePath) {
    this.x = x;
    this.y = y;
    this.image = createImage(imagePath);
  }
  render(ctx) {
    ctx.drawImage(this.image, this.x, this.y);
  }
}
