import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset, width, height}) {
        super(game, x, y, asset)
        this.game = game;


        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.immovable = true;
        this.body.width = width;
        this.body.height = height;
    }
}   