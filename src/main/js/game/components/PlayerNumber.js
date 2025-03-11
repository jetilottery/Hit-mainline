define(require => {
  const PIXI = require('com/pixijs/pixi');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const FittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
  const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
  const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const NumberCard = require('./NumberCard');
  const fontColors = require('skbJet/componentManchester/standardIW/fontColors');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');

  const TEXT_Y_POS = 65;
  const TEXT_PADDING = 10;
  const Y_OFFSET = -15;

  var topPrize;
  //find the top prize
  msgBus.subscribe('PrizeData.PrizeStructure', function(){
    topPrize = prizeData.prizeStructure[0]/100;
  });

  require('com/gsap/TweenMax');
  const Tween = window.TweenMax;

  class PlayerNumber extends NumberCard {
    constructor() {
      super();

      // Set background and cover textures
      if (PIXI.utils.TextureCache.yourNumberValueBackground !== undefined) {
        this.background.texture = PIXI.Texture.fromFrame('yourNumberValueBackground');
      }
      const revealFrames = utils.findFrameSequence('yourNumberCover');
      this.revealAnim.textures = revealFrames.map(PIXI.Texture.from);
      const idleFrames = utils.findFrameSequence('yourNumberIdle');
      if (idleFrames.length > 0) {
        this.idleAnim.textures = idleFrames.map(PIXI.Texture.from);
      }

      //slow down the revealAnim
      this.revealAnim.animationSpeed = gameConfig.playerNumbersAnimationSpeed;

      // Add text for prize value
      this.valueText = new FittedText('XXXXXX');
      this.valueText.anchor.set(0.5);
      this.valueText.y = TEXT_Y_POS;
      this.valueText.style = textStyles.parse('prizeValueNoWin');
      this.valueText.maxWidth = this.WIDTH - TEXT_PADDING * 2;
      this.noWin.addChild(this.valueText);
      this.valueTextWin = new FittedText('XXXXXX');
      this.valueTextWin.anchor.set(0.5);
      this.valueTextWin.y = TEXT_Y_POS;
      this.valueTextWin.style = textStyles.parse('prizeValueWin');
      this.valueTextWin.maxWidth = this.WIDTH - TEXT_PADDING * 2;
      this.win.addChild(this.valueTextWin);  

      //add some hammers
      this.hammer1 = new PIXI.Sprite();
      this.hammer1.anchor.set(0.5);
      this.hammer1.texture = PIXI.Texture.fromFrame('hammer');
      this.hammer2 = new PIXI.Sprite();
      this.hammer2.anchor.set(0.5);
      this.hammer2.texture = PIXI.Texture.fromFrame('hammer');
      this.hammer1.y = -45;
      this.hammer2.y = -25;
      this.hammer1.x = this.hammer2.x = 44;
      this.hammer1.visible = this.hammer2.visible = false;
      this.addChildAt(this.hammer2, this.getChildIndex(this.resultContainer)+1);    
      this.addChildAt(this.hammer1, this.getChildIndex(this.resultContainer)+1);    

      // Offset everything to account for the value text at the bottom
      this.win.y = Y_OFFSET;
      this.noWin.y = Y_OFFSET;

      this.reset();
    }

    populate([number, value, numBonus]) {
      this.number = number;
      this.value = value;      
      this.numBonus = numBonus;

      //populate the fields
      this.valueText.text = SKBeInstant.formatCurrency(value).formattedAmount;
      this.valueTextWin.text = this.valueText.text;   

      //we need to show the number of hammers found on this turn
      //fairly straightforward, if we have 1, show 1, if we have 2, show 1 and 2
      if (this.numBonus > 0){
        this.hammer1.visible = true;
        if (this.numBonus > 1){
          this.hammer2.visible = true;
        }
      }   

      var fontLookup = [50,100,500,1000,2000,50,100,500,1000,2000];
      var prices = SKBeInstant.config.gameConfigurationDetails.availablePrices;
      //find the price point index
      var pricePointIndex = prices.indexOf(meterData.ticketCost);
      var col = fontLookup[pricePointIndex];

      //now then, let's make sure we set the right colour
      //this is fairly straightforward
      this.valueText.style = {fontFamily: 'oswald',fontSize: 30,fontWeight: 'bold',fill: fontColors('fontColourCashValueNoWin')};
      //now then, if that, with the price point appended exists in the texture cache, set it as that
      var noWinTex = 'fontColourCashValueNoWin_'+topPrize;
      if (gameConfig.pricePointSpecificAssets){
        if (PIXI.utils.TextureCache[noWinTex]){
          noWinTex = fontColors(noWinTex);
        }else{
          noWinTex = fontColors('fontColourCashValueNoWin');
        }
      }else{        
        noWinTex = fontColors('fontColourCashValueNoWin_'+col);
      }
      this.valueText.style.fill = noWinTex;
      
      //and now for the win field      
      this.valueTextWin.style = {fontFamily: 'oswald',fontSize: 30,fontWeight: 'bold',fill: fontColors('fontColourCashValueWin')};
      var winTex = 'fontColourCashValueWin'+topPrize;
      if (gameConfig.pricePointSpecificAssets){
        if (PIXI.utils.TextureCache[winTex]){
          winTex = fontColors(winTex);
        }else{
          winTex = fontColors('fontColourCashValueWin');
        }
      }else{
        winTex = fontColors('fontColourCashValueWin_'+col);
      }
      this.valueTextWin.style.fill = winTex;

      super.populate(number);
    }

    showBonus() {
      var _this = this;
      //we need to show the number of hammers found on this turn
      //fairly straightforward, if we have 1, show 1, if we have 2, show 1 and 2
      if (_this.numBonus > 0){
        Tween.fromTo(_this.hammer1.scale, 0.25, {x:1,y:1}, {x:1.5,y:1.5,yoyo:true,repeat:3});
        if (_this.numBonus > 1){
          //slight delay before pulsing hammer2, so both are not pulsing at the same time
          Tween.delayedCall(0.25, function(){
            Tween.fromTo(_this.hammer2.scale, 0.25, {x:1,y:1}, {x:1.5,y:1.5,yoyo:true,repeat:3});  
          });                  
        }
        //publish via msgBus
        //the bonus area is listening for it
        msgBus.publish('Game.BonusSymFound', _this.numBonus);
      }
    }

    reset() {
      super.reset();
      this.valueText.text = '';
      this.valueTextWin.text = '';
      this.hammer1.visible = this.hammer2.visible = false;
    }

    static fromContainer(container) {
      const card = new PlayerNumber();
      container.addChild(card);
      return card;
    }
  }

  return PlayerNumber;
});
