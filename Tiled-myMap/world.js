class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {}

  preload() {
    // Step 1, load JSON
    this.load.atlas("barista-front","assets/barista-front.png","assets/barista-front.json");
    this.load.atlas("barista-left","assets/barista-left.png","assets/barista-left.json");
    this.load.atlas("barista-right","assets/barista-right.png","assets/barista-right.json");
    this.load.atlas("barista-back","assets/barista-back.png","assets/barista-back.json");

    this.load.tilemapTiledJSON("world","assets/myTileMap.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("building", "assets/buildingTS.png");
    this.load.image("village", "assets/villageTS.png");
    this.load.image("wall", "assets/wallTS.png");
    this.load.image("milk", "assets/milkTS.png");
  }

  create() {
    console.log("*** world scene");
    this.anims.create({
      key:'down',
      frames:[
        {key:'barista-front',frame:'front(1)'},
        {key:'barista-front',frame:'front(2)'},
        {key:'barista-front',frame:'front(3)'},
      ],
      frameRate:6,
      reapet:-1
    })

    this.anims.create({
      key:'left',
      frames:[
        {key:'barista-left',frame:'left(1)'},
        {key:'barista-left',frame:'left(2)'},
        {key:'barista-left',frame:'left(3)'},

      ],
      frameRate:6,
      reapet:-1
    })

    this.anims.create({
      key:'right',
      frames:[
        {key:'barista-right',frame:'right(1)'},
        {key:'barista-right',frame:'right(2)'},
        {key:'barista-right',frame:'right(3)'},


      ],
      frameRate:6,
      reapet:-1
    })

    this.anims.create({
      key:'up',
      frames:[
        {key:'barista-back',frame:'back(1)'},
        {key:'barista-back',frame:'back(2)'},
        {key:'barista-back',frame:'back(3)'},


      ],
      frameRate:6,
      reapet:-1
    })

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:"world"});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildingTiles = map.addTilesetImage("buildingTS", "building");
    let villageTiles = map.addTilesetImage("villageTS", "village");
    let wallTiles = map.addTilesetImage("wallTS", "wall");
    let milkTiles = map.addTilesetImage("milkTS", "milk");

    // Step 5  Load in layers by layers
    this.grassLayer = map.createLayer(
      "grassLayer",
      [buildingTiles, villageTiles, wallTiles,milkTiles],
      0,
      0
    );
  
    this.filedLayer = map.createLayer(
      "filedLayer",
      [buildingTiles, villageTiles, wallTiles,milkTiles],
      0,
      0
    );


    this.farmLayer = map.createLayer(
      "farmLayer",
      [buildingTiles, villageTiles, wallTiles,milkTiles],
      0,
      0
    );

    this.factoryLayer = map.createLayer(
      "factoryLayer",
      [buildingTiles, villageTiles, wallTiles,milkTiles],
      0,
      0
    );

    this.roadLayer = map.createLayer(
      "roadLayer",
      [buildingTiles, villageTiles, wallTiles,milkTiles],
      0,
      0
    );

    this.shopLayer = map.createLayer(
      "shopLayer",
      [buildingTiles, villageTiles, wallTiles,milkTiles],
      0,
      0
    );

    this.itemLayer = map.createLayer(
      "itemLayer",
      [buildingTiles, villageTiles, wallTiles,milkTiles],
      0,
      0
    );
    // Add main player here with physics.add.sprite
    this.player=this.physics.add.sprite(340,900,"barista-front");

    window.player = this.player;
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,

    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.world.bounds.width = this.grassLayer.width;
    this.physics.world.bounds.height = this.grassLayer.height;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    //enable debug
    window.player = this.player;

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    this.farmLayer.setCollisionByExclusion(-1, true)
    this.factoryLayer.setCollisionByExclusion(-1, true)
    this.shopLayer.setCollisionByExclusion(-1, true)
    this.itemLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.farmLayer);
    this.physics.add.collider(this.player, this.factoryLayer);
    this.physics.add.collider(this.player, this.shopLayer);
    this.physics.add.collider(this.player, this.itemLayer);


  } /////////////////// end of create //////////////////////////////

  update(){

    //check for iceMap
    if( this.player.x > 128 && 
        this.player.x < 158 && 
        this.player.y > 680 && 
        this.player.y < 691
      ) {
           this.room1()
      }
      
    //check for coffeeMap
    if( this.player.x > 126 && 
      this.player.x < 155 && 
      this.player.y > 335 && 
      this.player.y < 352
    ) {
         this.room2()
    }

    //check for milkMap
    if( this.player.x > 796 && 
      this.player.x < 830 && 
      this.player.y > 304 && 
      this.player.y < 320
    ) {
         this.room3()
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
  } /////////////////// end of update //////////////////////////////

  

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1");
  }

  room2(player, tile) {
    console.log("room2 function");
    this.scene.start("room2");
  }

  room3(player, tile) {
    console.log("room3 function");
    this.scene.start("room3");
  }
  
} //////////// end of class world ////////////////////////
