import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#9bbc0f'; //remove later
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    game.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    game.load.spritesheet('tiny', 'assets/images/tiny.png', 8, 16);
    game.load.spritesheet('tiles', 'assets/images/tiles.png', 8,8 );
    game.load.image('background', 'assets/images/background.png');
    this.load.image('mushroom', 'assets/images/mushroom2.png');
  }

  create () {
    game.state.start('Game')
    //let title = this.add.text(5, 2, 'Tiny Smash');
    
    
  }

}
