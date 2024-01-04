import { GenerationObject } from "./object.js";
class Platform extends GenerationObject {
  collision(player, platform) {
    if (
      player.position.y + player.size.height <= platform.position.y &&
      player.position.y + player.size.height + player.speed.y >=
        platform.position.y &&
      player.position.x + player.size.height >= platform.position.x &&
      player.position.x <= platform.position.x + platform.size.width
    ) {
      player.speed.y = 0;
    }
  }
}

export { Platform };
