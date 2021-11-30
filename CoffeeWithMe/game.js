var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 10,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preload, world, room1, room2, room3, gameOver, ending, menu, justin, story, mechanism, icePage, beanPage, milkPage, finishPage]
};

var game = new Phaser.Game(config);

 window.ice = 0
 window.milk = 0
 window.bean = 0
 window.cinnamon = 0