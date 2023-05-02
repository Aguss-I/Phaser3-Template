export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {}

  create() {
    this.scoreText = this.add.text(16, 16, "Has perdido", {
      fontSize: "25px",
      fill: "#37EAE0",
    });
  }

  update() {}
}
