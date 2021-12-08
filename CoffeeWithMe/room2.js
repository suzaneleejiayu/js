class room2 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }

    init(data) {
       this.playerPos = data.playerPos
    }

    preload() {
        //Step 1 : load JSON
        this.load.tilemapTiledJSON("room2","assets/coffeeTileMap.json");

        // Step 2 : Preload any images here, nickname, filename
        this.load.image("milk", "assets/milkTS.png");
        this.load.image("wall", "assets/wallTS.png");
    }

    create() {
        console.log('*** room2 scene');

        //audio
        this.collectSnd = this.sound.add("collectS");

        let map = this.make.tilemap({key:"room2"});

       // Step 4 Load the game tiles
       // 1st parameter is name in Tiled,
       // 2nd parameter is key in Preload
       let milkTiles = map.addTilesetImage("milkTS", "milk");
       let wallTiles = map.addTilesetImage("wallTS", "wall");

        let tileArray = [wallTiles,milkTiles]

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

    this.collectLayer = map.createLayer(
      "collectLayer",
      tileArray,
      0,
      0
    );

      // this.player=this.physics.add.sprite(341,257,"barista-front");
      this.player = this.physics.add.sprite(

        this.playerPos.x,
  
        this.playerPos.y,
  
        this.playerPos.dir
  
      ).setSize(20,30)

      //enable debug
      window.player = this.player;
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.delayOneSec,
        callbackScope: this,
        loop: false,
  
      });

      // setTileIndexCallback
      this.collectLayer.setTileIndexCallback(1099, this.removeCinnamon, this);
      this.collectLayer.setTileIndexCallback(873, this.removeBean, this);
  
      // this.playerwill collide with the level tiles
      this.physics.add.collider(this.collectLayer, this.player);
      this.physics.add.collider(this.itemLayer, this.player);
      this.physics.add.collider(this.wallLayer, this.player);
      this.physics.add.collider(this.bgLayer, this.player);
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
      this.physics.world.bounds.width = this.bgLayer.width;
      this.physics.world.bounds.height = this.bgLayer.height;
      this.player.setCollideWorldBounds(true); // don't go out of the this.map
  
      // create the arrow keys
       this.cursors = this.input.keyboard.createCursorKeys();
  
      // camera follow player
      this.cameras.main.startFollow(this.player);

      this.itemLayer.setCollisionByExclusion(-1, true)
      this.wallLayer.setCollisionByExclusion(-1, true)
      this.bgLayer.setCollisionByExclusion(-1, true)

      this.iceCount = this.add.text(10,10, "ice " + window.ice, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
      this.beanCount = this.add.text(10,28, "bean " + window.bean, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
      this.cinnamonCount = this.add.text(10,46, "cinnamon " + window.cinnamon, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
      this.milkCount = this.add.text(10,64, "milk " + window.milk, { font: '12px Poppins Medium', fill: '#ffffff' }).setScrollFactor(0);
        
    }/////////////////// end of create //////////////////////////////

    update() {

    //check for coffeeMap exit
    if( this.player.x > 297 && 
      this.player.x < 370 && 
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

    removeCinnamon(player, tile) {

      this.collectSnd.play();
      this.collectLayer.removeTileAt(tile.x, tile.y); // remove the item

      window.cinnamon++
      console.log('cinnamon', window.cinnamon)

      this.cinnamonCount.setText( "cinnamon " + window.cinnamon)
    }
  
    removeBean(player, tile) {

      this.collectSnd.play();
      this.collectLayer.removeTileAt(tile.x, tile.y); // remove the item

      window.bean++
      console.log('bean', window.bean)

      this.beanCount.setText( "bean " + window.bean)
    }

    // Function to jump to room2
    world(player, tile){
      console.log("world function");
      let playerPos ={};
      playerPos.x = 143;
      playerPos.y = 356;
      playerPos.dir = "down";
      
      this.scene.start("world", { playerPos: playerPos });
    }

}
