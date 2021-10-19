import Phaser from "phaser";
import { PhaserScene } from "./scenes/PhaserScene.js";
import { KeyboardScene } from "./scenes/KeyboardScene.js";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#efefef",
  scene: [
    KeyboardScene,
    PhaserScene
  ]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);
