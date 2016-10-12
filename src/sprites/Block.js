import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset, gravity, value }) {
        super(game, x, y, asset)
        this.game = game;

        game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.gravity.y = 10;
        this.body.mass = .5;
        this.frame = value;
        this.value = value;
        //this.body.immovable = true;
    }



}