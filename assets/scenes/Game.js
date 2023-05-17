import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
  CRUZ,
  POINTS_PERCENTAGE,
  POINTS_PERCENTAGE_VALUE_START,
} from "../scenes/util.js";
export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.shapesRecolected = {
      ["Triangulo"]: { count: 0, score: 10 },
      ["Cuadrado"]: { count: 0, score: 20 },
      ["Rombo"]: { count: 0, score: 30 },
      ["Cruz"]:{count:0, score: -10},
    };
    this.isWinner = false;
    this.isGameOver = false;
    this.timer = 30;
    this.score= 0;
    
    
    
  }

  preload() {
    this.load.image("sky", "/assets/images/Cielo.jpg");
    this.load.image("platform", "/assets/images/platform.png");
    this.load.image("Ninja", "/assets/images/Ninja.png");
    this.load.image(TRIANGULO, "/assets/images/Triangulo.png");
    this.load.image(CUADRADO, "/assets/images/Cuadrado.png");
    this.load.image(ROMBO, "/assets/images/Rombo.png");
    this.load.image(CRUZ,"/assets/Images/Cruz.png");
    
    
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    this.player = this.physics.add.sprite(340, 400, "Ninja");

    this.platformasPropias = this.physics.add.staticGroup();
    this.platformasPropias
      .create(400, 568, "platform")
      .setScale(2)
      .refreshBody();
      this.platformasPropias
      .create(600, 400, "platform")
      .setScale(1)
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
    this.scoreText = this.add.text(16, 16, "CR:0/T:0/C:0/R:0", {
      fontSize: "25px",
    });
    
    
    this.time.addEvent({
      delay: 1000,
      callback: this.timmer,
      callbackScope: this,
      loop: true,
    });
   
    this.timeText = this.add.text(600, 16, "Tiempo " + this.timer, {
      fontSize: "30px",
    });
    this.scoreTotal=this.add.text(15,60,"ScoreTotal"+this.score,{
      fontSize:"20px",
    })
    this.physics.add.collider(this.platformasPropias,this.shapeGroup)
    this.physics.add.overlap(
      this.platformasPropias,
      this.shapeGroup,
      this.reduce,
      null,
      this
    )
    
    
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
    const shapeName = shapeGroup.texture.key;
    const percentage = shapeGroup.getData(POINTS_PERCENTAGE);
    const scoreNow = this.shapesRecolected[shapeName].score * percentage;
    this.score= this.score + scoreNow
    console.log(this.shapesRecolected);
    this.shapesRecolected[shapeName].count++;
    this.scoreText.setText(
    
      
      "CR:"+
      this.shapesRecolected[CRUZ].count +
      "/T:" +
        this.shapesRecolected[TRIANGULO].count +
        "/C:" +
        this.shapesRecolected[CUADRADO].count +
        "/R:" +
        this.shapesRecolected[ROMBO].count
    );
    
    this.scoreTotal.setText(
      "ScoreTotal:"+
      this.score
    )
    if (
      this.shapesRecolected[TRIANGULO].count >= 2 &&
      this.shapesRecolected[CUADRADO].count >= 2 &&
      this.shapesRecolected[ROMBO].count >= 2
    ) {
      this.isWinner = true;
      
     
    }
    if(
      this.score>=100

      
    ){
      this.isWinner= true;
    }
    
    

    
    }
    
  
  addShape() {
    const randomShape = Phaser.Math.RND.pick(SHAPES);
    const randomX = Phaser.Math.RND.between(0, 800);
    this.shapeGroup.create(randomX, 0, randomShape)
    .setCircle(32,0,0)
    .setBounce(0.8)
    .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);
    
    console.log("shape is added", randomX, randomShape);
  }
  timmer() {
    this.timer--;
    console.log(this.timer);
    this.timeText.setText("Tiempo " + this.timer);
    if(this.timer==0){
      this.isGameOver= true;
    }
  }
  reduce(platformasPropias,shapeGroup){
    const newPercentage = shapeGroup.getData(POINTS_PERCENTAGE) - 0.25;
    console.log(shapeGroup.texture.key, newPercentage);
    shapeGroup.setData(POINTS_PERCENTAGE, newPercentage);
    if (newPercentage <= 0) {
      shapeGroup.disableBody(true, true);
      return;
      
      
    }
    const text = this.add.text(shapeGroup.body.position.x+10, shapeGroup.body.position.y, "- 25%", {
      fontSize: "22px",
      fontStyle: "bold",
      fill: "red",
    });
    setTimeout(() => {
      text.destroy();
    }, 200);
  }

  
  
}