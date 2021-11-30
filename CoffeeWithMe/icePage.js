class icePage extends Phaser.Scene {
  constructor() {
    super({
      key: "icePage",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    this.load.image("icePage", "assets/icePage.png");

  }

  create() {
    console.log('icePage');

    this.add.image(0, 0, 'icePage').setOrigin(0, 0);

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
    console.log("Jump to beanPage scene");

    let playerPos = {};
    playerPos.x = 337;
    playerPos.y = 916;
    playerPos.dir = "up";

    this.scene.start("beanPage", { playerPos: playerPos })
    },
    this
);

// Add any text in the main page
this.add.text(55, 455, "PRESS SPACEBAR TO CONTINUE", {
  font: "14px Poppins Medium",
  fill: "#804000",
});
   }

update() {

}

}
