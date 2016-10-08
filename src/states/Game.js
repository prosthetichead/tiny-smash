/* globals __DEV__ */
//palet: Lightest Green #9bbc0f, Light Green #8bac0f, Dark Green #306230, Darkest Green #0F380F
import Phaser from 'phaser';
import Tiny from '../sprites/Tiny';
import Wall from '../sprites/Wall';
import Block from '../sprites/Block';
import {setResponsiveWidth} from '../utils';


export default class extends Phaser.State {
  init () {

  }
  preload () {}

  create () {
    //game.physics.arcade.gravity.y = 100

      this.tiny = new Tiny({game: this.game, x: 20,
        y: 1, asset: 'tiny'})

      this.walls = game.add.group();
      this.walls.add( new Wall({game: this.game,x: 1, y: 160, asset: null, width: 100, height: 4 }) );
      this.walls.add( new Wall({game: this.game,x: 6, y: 1, asset: null, width: 4, height: 140 }) );
      this.walls.add( new Wall({game: this.game,x: 92, y: 1, asset: null, width: 4, height: 140 }) );

      this.blocks = game.add.group();
      this.blocks.add( new Block({game: this.game, x: 10, y: 1, asset:'tiles', gravity: 10, value: 1 }) )

      this.game.add.existing(this.tiny)

      this.bg = game.add.sprite(0, 0, 'background');
    
      let score = this.add.text(5, 2, '3923');
      score.font = 'Share Tech Mono';
      score.fontSize = 12;
      score.fill = '#0F380F';
      score.fixedToCamera = true;
  }

  update(){
    game.physics.arcade.collide(this.tiny, this.walls);
    game.physics.arcade.collide(this.blocks, this.walls);
  }

  render () {
    if (__DEV__) {
      //game.debug.cameraInfo(game.camera, 1, 1);
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
     //this.walls.forEachAlive(function(wall){game.debug.body(wall) })
    }
  }
}
