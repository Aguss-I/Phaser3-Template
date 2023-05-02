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
    this.shapesRecolected = {
      ["Triangulo"]: { count: 0, score: 10 },
      ["Cuadrado"]: { count: 0, score: 20 },
      ["Rombo"]: { count: 0, score: 30 },
    };
    this.isWinner = false;
    this.isGameOver = false;
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
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
    this.scoreText = this.add.text(16, 16, "T:0/C:0/R:0", {
      fontSize: "25px",
    });
  }

  update() {
    if (this.isWinner) {
      this.scene.start("Winner");
    }
    if (this.isGameOver) {
      this.scene.start("GameOver");
    }
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
    this.shapeName = shapeGroup.texture.key;
    console.log(this.shapesRecolected);
    this.shapesRecolected[this.shapeName].count++;
    this.scoreText.setText(
      "T:" +
        this.shapesRecolected[TRIANGULO].count +
        "/C:" +
        this.shapesRecolected[CUADRADO].count +
        "/R:" +
        this.shapesRecolected[ROMBO].count
    );
    if (
      this.shapesRecolected[TRIANGULO].count >= 2 &&
      this.shapesRecolected[CUADRADO].count >= 2 &&
      this.shapesRecolected[ROMBO].count >= 2
    ) {
      this.isWinner = true;
    }
  }
  addShape() {
    const randomShape = Phaser.Math.RND.pick(SHAPES);
    const randomX = Phaser.Math.RND.between(0, 800);
    this.shapeGroup.create(randomX, 0, randomShape);
    console.log("shape is added", randomX, randomShape);
  }
}
