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
      //add game area walls
      this.walls = game.add.group();
      this.walls.add( new Wall({game: this.game,x: 1, y: 136, asset: null, width: 100, height: 1 }) );
      this.walls.add( new Wall({game: this.game,x: 7, y: 1, asset: null, width: 1, height: 140 }) );
      this.walls.add( new Wall({game: this.game,x: 88, y: 1, asset: null, width: 1, height: 140 }) );

      //setup the falling blocks group
      this.fallingBlocks = game.add.group();
      this.fallingBlocks.add( new Block({game: this.game, x: 8*1 , y: -8, asset:'tiles', gravity: 10, value: 5 }) );
      this.fallingBlocks.add( new Block({game: this.game, x: 8*10 , y: -8, asset:'tiles', gravity: 10, value: 4 }) );
      this.fallingBlocks.add( new Block({game: this.game, x: 8*10 , y: -20, asset:'tiles', gravity: 10, value: 5 }) );

      //add the block tile map
      this.blockMap = game.add.tilemap(null, 8,8);
      this.blockMapLayer = this.blockMap.createBlankLayer('blockMapLayer', 20,20,8,8); 
      this.blockMap.addTilesetImage('tiles');
      this.blockMap.setCollisionBetween(0, 12);
      //this.blockMap.putTile(1, 1,1);

      //add tiny
      this.tiny = new Tiny({game: this.game, x: 20, y: 1, asset: 'tiny'});
      this.game.add.existing(this.tiny);

      this.bg = game.add.sprite(0, 0, 'background');
    
      //Block Drop Timer 
      this.dropBlockEvent = game.time.events.loop(1000, ()=>{this.dropBlock(10)}, this);

      let score = this.add.text(5, 2, '3923');
      score.font = 'Share Tech Mono';
      score.fontSize = 12;
      score.fill = '#0F380F';
      score.fixedToCamera = true;
  }

  update(){
    game.physics.arcade.collide(this.tiny, this.walls);
    game.physics.arcade.collide(this.tiny, this.fallingBlocks);
    game.physics.arcade.collide(this.tiny, this.blockMapLayer);
    game.physics.arcade.collide(this.fallingBlocks, this.fallingBlocks);
    game.physics.arcade.collide(this.fallingBlocks, this.blockMapLayer, (block, tile)=>{
      this.replaceFallBlock(block);
    });
    game.physics.arcade.collide(this.fallingBlocks, this.walls, (block, wall)=>{
      this.replaceFallBlock(block);
    });

    //let blockx = this.blockMapLayer.getTileX(game.input.activePointer.worldX);
    //let blocky = this.blockMapLayer.getTileY(game.input.activePointer.worldY)
    //let block = this.blockMap.getTile(blockx, blocky);
    //this.checkBlockMatches(block);
    this.checkAllBlocksForMatches()
    //this.dropBlock();
  }

  replaceFallBlock(block){
    let x = this.blockMapLayer.getTileX(block.x+4);
    let y = this.blockMapLayer.getTileX(block.y+4);
    let value = block.value;

    this.blockMap.putTile(value, x, y);
    block.kill();
    
  }

  dropBlock(dropSpeed){
    //pick random number between 1 and 10.
    //pick random tile number
    //create a new falling block at the correct position for   
    let blockPosX = this.game.rnd.integerInRange(1, 10);
    let blockValue = this.game.rnd.integerInRange(0, 3);
    let gravity = dropSpeed || 10;

    this.fallingBlocks.add( new Block({game: this.game, x: 8*blockPosX , y: -8, asset:'tiles', gravity: gravity, value: blockValue }) );
  }

  checkAllBlocksForMatches(){
    let blockMatches = [];
    this.blockMap.forEach( (b)=>{ blockMatches = blockMatches.concat( this.checkBlockMatches(b) ) } );
    for(let i = 0; i < blockMatches.length; i++){
      console.log('removeBlock ' + blockMatches[i].x + ' ' + blockMatches[i].y )
      this.blockMap.removeTile(blockMatches[i].x, blockMatches[i].y);
    }
  }
  checkBlockMatches(block){
    let totalBlockMatches = [];
    if(block){
      
      for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){ 
                   
          let thisBlockMatches = [];
          thisBlockMatches.push(block);

          let checkx = block.x + i;
          let checky = block.y + j;
          let blockToCheck = this.blockMap.getTile(checkx, checky);
          
          while(blockToCheck && blockToCheck != block && blockToCheck.index != -1 && blockToCheck.index == block.index){
              
              thisBlockMatches.push(blockToCheck);
              checkx = blockToCheck.x + i;
              checky = blockToCheck.y + j;
              blockToCheck = this.blockMap.getTile(checkx, checky);
              
          }
          if(thisBlockMatches.length >= 3){
            totalBlockMatches = totalBlockMatches.concat(thisBlockMatches);
          }
        }
      }
    }
    return totalBlockMatches;  
  }

  render () {
    if (__DEV__) {
      //game.debug.cameraInfo(game.camera, 1, 1);
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
      //this.walls.forEachAlive(function(wall){game.debug.body(wall) })
    }
  }
}
