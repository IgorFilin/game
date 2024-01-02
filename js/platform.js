class Platform {
  constructor(x, y, color = "red", width = 200, height = 30) {
    this.position = {
      x: x,
      y: y,
    };
    this.size = {
      width,
      height,
    };
    this.color = color;
  }
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
  create(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
}

export { Platform };
