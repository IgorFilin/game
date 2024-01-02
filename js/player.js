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
  jump: {
    imageCost: [
      "./assets/images/Warrior_Jump_1.png",
      "./assets/images/Warrior_Jump_2.png",
      "./assets/images/Warrior_Jump_3.png",
    ],
    imagesNode: [],
  },
  run: {
    imageCost: [
      "./assets/images/Warrior_Run_1.png",
      "./assets/images/Warrior_Run_2.png",
      "./assets/images/Warrior_Run_3.png",
      "./assets/images/Warrior_Run_4.png",
      "./assets/images/Warrior_Run_5.png",
      "./assets/images/Warrior_Run_6.png",
      "./assets/images/Warrior_Run_7.png",
      "./assets/images/Warrior_Run_8.png",
    ],
    imagesNode: [],
  },
};
for (let i = 0; i < playerImages.jump.imageCost.length; i++) {
  const src = playerImages.jump.imageCost[i];
  const playerImage = new Image();
  playerImage.src = src;
  playerImages.jump.imagesNode.push(playerImage);
}
for (let i = 0; i < playerImages.cost.imageCost.length; i++) {
  const src = playerImages.cost.imageCost[i];
  const playerImage = new Image();
  playerImage.src = src;
  playerImages.cost.imagesNode.push(playerImage);
}
for (let i = 0; i < playerImages.run.imageCost.length; i++) {
  const src = playerImages.run.imageCost[i];
  const playerImage = new Image();
  playerImage.src = src;
  playerImages.run.imagesNode.push(playerImage);
}

let currentImagesPack = "cost";
let playerImage;
let intervalId;
class Player {
  constructor() {
    this.position = {
      x: 150,
      y: 50,
    };
    this.currentDirection = 1;
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
    if (this.speed.y > 0) {
      // isOnImages = false;
      currentImagesPack = "jump";
    } else if (this.speed.x > 0 || this.speed.x < 0) {
      currentImagesPack = "run";
    } else {
      // isOnImages = true;
      currentImagesPack = "cost";
    }

    if (!intervalId) {
      let currentImageCost = 0;

      playerImage =
        playerImages[currentImagesPack].imagesNode[currentImageCost];

      intervalId = setInterval(() => {
        console.log("INTERVAL");
        currentImageCost += 1;
        if (
          currentImageCost >
          playerImages[currentImagesPack].imagesNode.length - 1
        )
          currentImageCost = 0;
        playerImage =
          playerImages[currentImagesPack].imagesNode[currentImageCost];
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
