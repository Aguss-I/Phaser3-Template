export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {}

  create() {
    this.scoreText = this.add.text(310, 300, "Has perdido", {
      fontSize: "25px",
      fill: "#37EAE0",
    });
  }

  update() {}
}
