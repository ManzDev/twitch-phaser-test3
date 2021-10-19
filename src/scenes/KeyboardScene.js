import Phaser from "phaser";

const KEYS = [
  "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "ZERO", "OPEN_BRACKET", "CLOSED_BRACKET"
];

const KONAMI_CODE_KEYS = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];

export class KeyboardScene extends Phaser.Scene {
  constructor() {
    super({ key: "KeyboardScene", active: true });
  }

  preload() {
    this.load.image("keyboard", "assets/sprites/keyboard-opreem.png");
    this.load.image("keypress", "assets/sprites/key1.png");
    this.load.image("avocado", "assets/sprites/super-avocado.png");
  }

  create() {
    this.keys = [];
    this.drawKeyboard();
    this.avocado = this.add.image(450, 175, "avocado").setVisible(false);
  }

  debugKey() {
    this.input.keyboard.on("keydown", (ev) => console.log("Press: ", ev.key, ev.keyCode, ev.code));
  }

  enableAvocado() {
    this.avocado.setVisible(true);
    this.time.addEvent({
      delay: 2000,
      callback: () => this.avocado.setVisible(false)
    });
  }

  drawKeyboard() {
    this.add.image(0, 0, "keyboard").setOrigin(0);

    const y = 89;
    const spacing = 50;
    let x = 106;

    // Listen keys
    KEYS.forEach(idKey => {
      const imageKey = this.add.image(x, y, "keypress").setVisible(false);
      const key = this.input.keyboard.addKey(idKey);

      this.keys.push({ idKey, imageKey, key });
      x += spacing;
    });

    // Listen Konami Code
    this.input.keyboard.createCombo(KONAMI_CODE_KEYS, { resetOnMatch: true });
    this.input.keyboard.on("keycombomatch", (event) => this.enableAvocado());
  }

  update() {
    this.keys.forEach(({ imageKey, key }) => imageKey.setVisible(key.isDown));
  }
}
