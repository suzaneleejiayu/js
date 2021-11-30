﻿var config = {
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
    scene: [main, world, room1, room2, room3]
};

var game = new Phaser.Game(config);