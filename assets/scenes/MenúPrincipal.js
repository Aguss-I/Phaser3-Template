export default class MenúPrincipal extends Phaser.Scene {
    constructor() {
      super("MenúPrincipal");
    }
    
    init(){}

    preload(){
        this.load.image("FondoMenu", "/assets/Images/FondoMenu.jpg");
        this.load.image("botoninicio","/assets/Images/botoninicio.png");
        this.load.image("katana","/assets/Images/Katana.png");
        this.load.image("Titulo","/assets/Images/Title2.png");
        
    }
    create(){
        this.add.image(400,300,"FondoMenu");
        this.add.image(380,250,"katana").setScale(0.3);
        this.add.image(390,100,"Titulo").setScale(2);
        

        const startButton=this.add.image(390,450,"botoninicio").setScale(0.4).setInteractive();
        startButton.on("pointerover", () => {
    
    startButton.setTint(0x0000ff);
  });

  startButton.on("pointerout", () => {
    
    startButton.clearTint();
  });
         startButton.on("pointerup", () => {
            this.scene.start("Game");
        })
     }  
 }   
    
