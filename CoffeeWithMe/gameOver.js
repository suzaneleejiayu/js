class gameOver extends Phaser.Scene {

    constructor() {
        super({ key: 'gameOver' });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos
  }

    preload() {

      this.load.image("over", "assets/over.png");

    }

    create() {
        console.log('gameOver');

        this.spaceSnd = this.sound.add("spaceS");

        this.add.image(0, 0, 'over').setOrigin(0, 0);

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
        console.log("Jump to world scene");

        this.spaceSnd.play();

        let playerPos = {};
        playerPos.x = 337;
        playerPos.y = 916;
        playerPos.dir = "up";

        this.scene.start("world", { playerPos: playerPos })
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
