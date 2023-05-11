export default class Winner extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init() {}

  preload() {}

  create() {
    this.scoreText = this.add.text(310, 300, "Has ganado!!", {
      fontSize: "30px",
      fill: "#37EAE0",
    });
  }

  update() {}
}
