class ending extends Phaser.Scene {

    constructor() {
        super({ key: 'ending' });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos
  }

    preload() {

      this.load.image("congrat", "assets/congrat.png");

    }

    create() {
        console.log('ending');

        this.spaceSnd = this.sound.add("spaceS");

        this.add.image(0, 0, 'congrat').setOrigin(0, 0);

        window.ice = 0
        window.milk = 0
        window.bean = 0
        window.cinnamon = 0

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to menu scene");

        this.spaceSnd.play();

        let playerPos = {};
        playerPos.x = 337;
        playerPos.y = 916;
        playerPos.dir = "up";

        this.scene.start("menu", { playerPos: playerPos })
        },
        this
    );

    // Add any text in the main page
    this.add.text(55, 455, "PRESS SPACEBAR TO RESTART", {
      font: "14px Poppins Medium",
      fill: "#804000",
    });
       }

    update() {

    }

  }
