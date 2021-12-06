class room3 extends Phaser.Scene {

    constructor() {
        super({ key: 'room3' });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos
  }

    preload() {
        //Step 1 : load JSON
        this.load.tilemapTiledJSON("room3","assets/milkTileMap.json");

        // Step 2 : Preload any images here, nickname, filename
        this.load.image("factory", "assets/factoryTS.png");
        this.load.image("milk", "assets/milkTS.png");
        this.load.image("wall", "assets/wallTS.png");
    }

    create() {
        console.log('*** room3 scene');

        //audio
        this.collectSnd = this.sound.add("collectS");
        this.gameOverSnd = this.sound.add("gameOverS");

        let map = this.make.tilemap({key:"room3"});

       // Step 4 Load the game tiles
       // 1st parameter is name in Tiled,
       // 2nd parameter is key in Preload
       let factoryTiles = map.addTilesetImage("factoryTS", "factory");
       let milkTiles = map.addTilesetImage("milkTS", "milk");
       let wallTiles = map.addTilesetImage("wallTS", "wall");

        let tileArray = [wallTiles,milkTiles,factoryTiles]

    // Step 5  Load in layers by layers
    this.bgLayer = map.createLayer(
      "bgLayer",
      tileArray,
      0,
      0
    );
    
    this.wallLayer = map.createLayer(
      "wallLayer",
      tileArray,
      0,
      0
    );

    this.itemLayer = map.createLayer(
      "itemLayer",
      tileArray,
      0,
      0
    );

    this.bottleLayer = map.createLayer(
      "bottleLayer",
      tileArray,
      0,
      0
    );

      // this.player=this.physics.add.sprite(291,257,"barista-front");
      this.player = this.physics.add.sprite(

        this.playerPos.x,
  
        this.playerPos.y,
  
        this.playerPos.dir
  
      ).setSize(20,30)


      window.player = this.player;
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.delayOneSec,
        callbackScope: this,
        loop: false,
  
      });

      // setTileIndexCallback
      this.bottleLayer.setTileIndexCallback(1124, this.removeGoodMilk, this);
      this.bottleLayer.setTileIndexCallback(1117, this.removeBadMilk, this);

      //enable debug
      window.player = this.player;

      // this.playerwill collide with the level tiles
      this.physics.add.collider(this.bottleLayer, this.player);
      this.physics.add.collider(this.itemLayer, this.player);
      this.physics.add.collider(this.wallLayer, this.player);
      this.physics.add.collider(this.bgLayer, this.player);
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
      this.physics.world.bounds.width = this.bgLayer.width;
      this.physics.world.bounds.height = this.bgLayer.height;
      this.player.setCollideWorldBounds(true); // don't go out of the this.map
  
      // // create the arrow keys
       this.cursors = this.input.keyboard.createCursorKeys();
  
      // // camera follow player
      this.cameras.main.startFollow(this.player);

      this.itemLayer.setCollisionByExclusion(-1, true)
      this.wallLayer.setCollisionByExclusion(-1, true)
      this.bgLayer.setCollisionByExclusion(-1, true)

      this.iceCount = this.add.text(10,10, "ice " + window.ice, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
      this.beanCount = this.add.text(10,28, "bean " + window.bean, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
      this.cinnamonCount = this.add.text(10,46, "cinnamon " + window.cinnamon, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
      this.milkCount = this.add.text(10,64, "milk " + window.milk, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
    }

    update() {

    //check for milkeMap exit
    if( this.player.x > 241 && 
      this.player.x < 334 && 
      this.player.y > 284
    ) {
         this.world()
    }      

      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play("left", true); // walk left
      } 
      else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play("right", true);
      } else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-200);
        this.player.anims.play("up", true);
        //console.log('up');
      } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(200);
        this.player.anims.play("down", true);
        //console.log('down');
      } else {
        this.player.anims.stop();
        this.player.body.setVelocity(0, 0);
      }
    }/////////////////// end of update //////////////////////////////

    removeGoodMilk(player, tile) {

      this.collectSnd.play();
      this.bottleLayer.removeTileAt(tile.x, tile.y); // remove the item

      window.milk++
      console.log('milk', window.milk)

      this.milkCount.setText( "milk " + window.milk)
    }
  
    removeBadMilk(player, tile) {
      console.log("remove badmilk", tile.index);
      this.bottleLayer.removeTileAt(tile.x, tile.y); // remove the item
      this.scene.start("gameOver");
      this.gameOverSnd.play();
    }

    // Function to jumo to room1
    world(player, tile){
      console.log("world function");
      let playerPos ={};
      playerPos.x = 816;
      playerPos.y = 326;
      playerPos.dir = "down";
      
      this.scene.start("world", { playerPos: playerPos });
    }

}
