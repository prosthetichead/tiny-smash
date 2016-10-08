import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#9bbc0f'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)

    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.setUserScale(2, 2, 0, 0);
    this.scale.refresh();
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Nunito','VT323', 'Share Tech Mono']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#0F380F', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    game.load.image('loaderBg', './assets/images/loader-bg.png')
    game.load.image('loaderBar', './assets/images/loader-bar.png')
    
  }
  
  render () {
    
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
