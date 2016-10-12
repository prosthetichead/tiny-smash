import Phaser from 'phaser'

let facing = 'right';
let cursors, jumpButton
let jumpTimer = 0;

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game;
    //apply gravity to the game no that tiny is here
    
    //enable physics on tiny
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 100;
    //add tinys animations
    this.walkRight = this.animations.add('right', [0,1], 12, true);
    this.walkLeft = this.animations.add('left', [2,3], 12, true);

    //this.animations.play('walk-right', 5, true);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
  }

  update () {
    this.body.velocity.x = 0;
    
    if (cursors.left.isDown){
      this.body.velocity.x = -50;
      if (facing != 'left'){
        this.animations.play('left');
        facing = 'left';
      }
    }
    else if (cursors.right.isDown){
      this.body.velocity.x = 50;
      if (facing != 'right'){
        this.animations.play('right');
        facing = 'right';
      }
    }
    else{
      if (facing != 'idle') {
        if (facing == 'right'){
          this.frame = 0;
        }
        else if (facing == 'left')
          this.frame = 2;
      }
      this.animations.stop();
      facing = 'idle';
    }

    if (jumpButton.isDown && game.time.now > jumpTimer){
      this.body.velocity.y = -50;
      jumpTimer = game.time.now + 750;
    }

  }

}