import { createImage } from "./../utils.js";

const playerImages = {
  cost: {
    imagesPath: [
      "./assets/images/player/Warrior_Idle_1.png",
      "./assets/images/player/Warrior_Idle_2.png",
      "./assets/images/player/Warrior_Idle_3.png",
      "./assets/images/player/Warrior_Idle_4.png",
      "./assets/images/player/Warrior_Idle_5.png",
      "./assets/images/player/Warrior_Idle_6.png",
    ],
    imagesNode: [],
  },
  jump: {
    imagesPath: [
      "./assets/images/player/Warrior_Jump_1.png",
      "./assets/images/player/Warrior_Jump_2.png",
      "./assets/images/player/Warrior_Jump_3.png",
    ],
    imagesNode: [],
  },
  run: {
    imagesPath: [
      "./assets/images/player/Warrior_Run_1.png",
      "./assets/images/player/Warrior_Run_2.png",
      "./assets/images/player/Warrior_Run_3.png",
      "./assets/images/player/Warrior_Run_4.png",
      "./assets/images/player/Warrior_Run_5.png",
      "./assets/images/player/Warrior_Run_6.png",
      "./assets/images/player/Warrior_Run_7.png",
      "./assets/images/player/Warrior_Run_8.png",
    ],
    imagesNode: [],
  },
};

for (const key in playerImages) {
  for (let i = 0; i < playerImages[key].imagesPath.length; i++) {
    playerImages[key].imagesNode.push(
      createImage(playerImages[key].imagesPath[i])
    );
  }
}

export { playerImages };
