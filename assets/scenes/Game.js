import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
} from "../scenes/util.js";
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
    this.load.image(TRIANGULO, "/assets/images/Triangulo.png");
    this.load.image(CUADRADO, "/assets/images/Cuadrado.png");
    this.load.image(ROMBO, "/assets/images/Rombo.png");
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

    this.physics.add.collider(this.platformasPropias, this.shapeGroup);
    this.physics.add.overlap(
      this.player,
      this.shapeGroup,
      this.collectShape,
      null,
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.addEvent({
      delay: 1000,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_MOVEMENTS.x);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
    }
  }
  collectShape(player, shapeGroup) {
    console.log("figura recolectada");
    shapeGroup.disableBody(true, true);
  }
  addShape() {
    const randomShape = Phaser.Math.RND.pick(SHAPES);
    const randomX = Phaser.Math.RND.between(0, 800);
    this.shapeGroup.create(randomX, 0, randomShape);
    console.log("shape is added", randomX, randomShape);
  }
}
