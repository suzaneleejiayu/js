class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    this.load.image("intro", "assets/intro.png");

    this.load.audio("spaceS", "assets/spaceS.mp3");
    this.load.audio("enterS", "assets/enterS.mp3");
    this.load.audio("collectS", "assets/collectS.mp3");
    this.load.audio("finishS", "assets/finishS.wav");
    this.load.audio("gameOverS", "assets/gameOverS.wav");
    this.load.audio("bgS", "assets/bgS.mp3");

  }

  create() {
    console.log("*** preload scene");

    this.spaceSnd = this.sound.add("spaceS");
    this.enterSnd = this.sound.add("enterS");

    window.iceTarget = Phaser.Math.Between(1, 3);
    window.beanTarget = Phaser.Math.Between(1, 3);
    window.cinnamonTarget = Phaser.Math.Between(1, 3);
    window.milkTarget = Phaser.Math.Between(1, 3);

    // Add any sound and music here
    this.music = this.sound
      .add("bgS",{
        loop:true,
      })
      .setVolume(0.2)

    this.music.play()

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'intro').setOrigin(0, 0);

    // this.add.text(10, 10, "ICE TARGET: " + window.iceTarget, {
    //   font: "12px Poppins Medium",
    //   fill: "#fff5e6",
    // });

    // this.add.text(10, 30, "BEAN TARGET: " + window.beanTarget, {
    //   font: "12px Poppins Medium",
    //   fill: "#fff5e6",
    // });

    // this.add.text(10, 50, "CINAMON TARGET " + window.cinnamonTarget, {
    //   font: "12px Poppins Medium",
    //   fill: "#fff5e6",
    // });

    // this.add.text(10, 70, "MILK TARGET " + window.milkTarget, {
    //   font: "12px Poppins Medium",
    //   fill: "#fff5e6",
    // });

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");
    var key3 = this.input.keyboard.addKey(51);

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to justin scene");

        this.spaceSnd.play();

        let playerPos = {};
        playerPos.x = 337;
        playerPos.y = 916;
        playerPos.dir = "up";

        this.scene.start("justin", { playerPos: playerPos })
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

    // Create all the game animations here
  }
}
