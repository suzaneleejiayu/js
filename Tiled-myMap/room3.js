class room3 extends Phaser.Scene {

    constructor() {
        super({ key: 'room3' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
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

      this.physics.world.bounds.width = this.bgLayer.width;
      this.physics.world.bounds.height = this.bgLayer.height;

      this.player=this.physics.add.sprite(291,257,"barista-front");

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
      this.physics.add.collider(this.bgLayer, this.player);
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
      this.player.setCollideWorldBounds(true); // don't go out of the this.map
  
      // // create the arrow keys
       this.cursors = this.input.keyboard.createCursorKeys();
  
      // // camera follow player
      this.cameras.main.startFollow(this.player);
        
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
      console.log("remove goodMilk", tile.index);
      this.bottleLayer.removeTileAt(tile.x, tile.y); // remove the item
      return false;
    }
  
    removeBadMilk(player, tile) {
      console.log("remove badMilk", tile.index);
      this.bottleLayer.removeTileAt(tile.x, tile.y); // remove the item
      return false;
    }

    // Function to jumo to room1
    world(player, tile){
      console.log("world function");
      this.scene.start("world");
    }

}
