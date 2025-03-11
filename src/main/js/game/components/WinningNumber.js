define((require) => {
  const PIXI = require('com/pixijs/pixi');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const NumberCard = require('./NumberCard');
  
  class WinningNumber extends NumberCard {
    constructor() {
      super();
      if (PIXI.utils.TextureCache.luckyNumberBackground !== undefined) {
        this.background.texture = PIXI.Texture.fromFrame('luckyNumberBackground');
      }
      var revealFrames = utils.findFrameSequence('luckyNumberCover');
      this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
      var idleFrames = utils.findFrameSequence('luckyNumberIdle');
      if (idleFrames) {
        this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
      }

      //HITGA-67 - Lucky Number text position
      //to allow space for the hammer, the number is positioned further down in the PNG than normal
      //so move the number up slightly for the winning numbers, as hammers are not collected on these
      this.resultContainer.y -= 5;

      //slow down the revealAnim
      this.revealAnim.animationSpeed = gameConfig.winningNumbersAnimationSpeed;

      this.reset();
    }

    static fromContainer(container) {
      const card = new WinningNumber();
      container.addChild(card);
      return card;
    }
  }

  return WinningNumber;
});
