class beanPage extends Phaser.Scene {
  constructor() {
    super({
      key: "beanPage",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    this.load.image("beanPage", "assets/beanPage.png");

  }

  create() {
    console.log('beanPage');

    this.spaceSnd = this.sound.add("spaceS");
    this.enterSnd = this.sound.add("enterS");

    this.add.image(0, 0, 'beanPage').setOrigin(0, 0);

    window.ice = 0
    window.milk = 0
    window.bean = 0
    window.cinnamon = 0

// Check for spacebar or any key here
var spaceDown = this.input.keyboard.addKey("SPACE");
var key3 = this.input.keyboard.addKey(51);


// On spacebar event, call the world scene

spaceDown.on(
  "down",
  function () {
    console.log("Jump to milkPage scene");

    this.spaceSnd.play();

    let playerPos = {};
    playerPos.x = 337;
    playerPos.y = 916;
    playerPos.dir = "up";

    this.scene.start("milkPage", { playerPos: playerPos })
    },
    this
);

key3.on(
  "down",
  function () {
    console.log("Jump to justin scene");

    this.enterSnd.play();

    this.scene.start("menu")
    },
    this
);

// Add any text in the main page
this.add.text(55, 455, "PRESS SPACEBAR TO CONTINUE", {
  font: "14px Poppins Medium",
  fill: "#804000",
});

this.add.text(83, 520, "press '3' to skip the intro", {
  font: "13px Poppins Medium",
  fill: "#000000",
});
   }

update() {

}

}
