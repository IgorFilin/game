function createImage(imagePath) {
  const playerImage = new Image();
  playerImage.src = imagePath;
  return playerImage;
}

export { createImage };
