class menu extends Phaser.Scene {
  constructor() {
    super({
      key: "menu",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    this.load.image("menu", "assets/menu.png");

  }

  create() {
    console.log("*** preload scene");

    this.spaceSnd = this.sound.add("spaceS");

    window.iceTarget = Phaser.Math.Between(1, 3);
    window.beanTarget = Phaser.Math.Between(1, 3);
    window.cinnamonTarget = Phaser.Math.Between(1, 3);
    window.milkTarget = Phaser.Math.Between(1, 3);

    // Add image and text
    this.add.image(0, 0, 'menu').setOrigin(0, 0);

    this.add.text(110, 280, "ICE TARGET: " + window.iceTarget, {
      font: "12px Poppins Medium",
      fill: "#000000",
    });

    this.add.text(110, 300, "BEAN TARGET: " + window.beanTarget, {
      font: "12px Poppins Medium",
      fill: "#000000",
    });

    this.add.text(110, 320, "CINAMON TARGET " + window.cinnamonTarget, {
      font: "12px Poppins Medium",
      fill: "#000000",
    });

    this.add.text(110, 340, "MILK TARGET " + window.milkTarget, {
      font: "12px Poppins Medium",
      fill: "#000000",
    });

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
    this.add.text(55, 455, "PRESS SPACEBAR TO START!!!", {
      font: "14px Poppins Medium",
      fill: "#804000",
    });

    // Create all the game animations here
  }
}
