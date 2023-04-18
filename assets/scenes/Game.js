export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    let shapesRecolected = [
      { type: "triangulo", count: 0 },
      { type: "rombo", count: 0 },
      { type: "cuadrado", count: 0 },
    ];
  }

  preload() {
    this.load.image("sky", "/assets/images/Cielo.png");
    this.load.image("platform", "/assets/images/platform.png");
    this.load.image("Ninja", "/assets/images/Ninja.png");
    this.load.image("triangulo", "/assets/images/Triangulo.png");
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    this.player = this.physics.add.sprite(340, 400, "Ninja");

    this.platformasPropias = this.physics.add.staticGroup();
    this.platformasPropias
      .create(400, 568, "platform")
      .setScale(2)
      .refreshBody();

    this.physics.add.collider(this.player, this.platformasPropias);
    this.shapeGroup = this.physics.add.group();

    this.shapeGroup = this.shapeGroup.create(340, 100, "triangulo");
    this.physics.add.collider(this.platformasPropias, this.shapeGroup);
    this.physics.add.overlap(
      this.player,
      this.shapeGroup,
      this.collectShape,
      null,
      this
    );
  }

  update() {}
  collectShape(player, shapeGroup) {
    console.log("figura recolectada");
    shapeGroup.disableBody(true, true);
  }
}
