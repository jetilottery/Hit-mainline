define(require => {
  const PIXI = require('com/pixijs/pixi');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const orientation = require('skbJet/componentManchester/standardIW/orientation');
  require('com/gsap/plugins/PixiPlugin');

  const numberOfPlayerNumbers = 15;
  const numberOfLuckyNumbers = 4;

  let pricePointIndex;

  const nonSpecificLookup = ['purple','red','blue','orange','gold','purple','red','blue','orange','gold'];  
  const backgroundLookup = ['red','blue','orange','orange','gold','red','blue','orange','orange','gold'];
  const selectionLookup = ['red','blue','darkBlue','gold','purple','red','blue','darkBlue','gold','purple'];
  const bonusBGLookup = ['red','blue','darkBlue','gold','purple','red','blue','darkBlue','gold','purple'];
  const luckyLookup = ['purple','red','blue','orange','gold','purple','red','blue','orange','gold'];

  function updateManager() {
    const inValue = prizeData.prizeStructure[0]/100;

    //find the index
    var prices = SKBeInstant.config.gameConfigurationDetails.availablePrices;
    pricePointIndex = prices.indexOf(meterData.ticketCost);

    //generate texture IDs
    var newBackground = (orientation.get() === 'landscape') ? 'landscape_background_'+inValue : 'portrait_background_'+inValue;
    var newSelectionBackground = (orientation.get() === 'landscape') ? 'selectionBackgrounds_'+inValue : 'selectionBackgroundsPortrait_'+inValue;
    var newLogo = (orientation.get() === 'landscape') ? 'landscape_gameLogo_'+inValue : 'portrait_gameLogo_'+inValue;
    var newBonusBG = (orientation.get() === 'landscape') ? 'bonusBackground_'+inValue : 'bonusBackground_'+inValue;
    var newWinningNumberBG = (orientation.get() === 'landscape') ? 'luckyNumberBackground_'+inValue : 'luckyNumberBackground_'+inValue;
    var newYourNumberBG = (orientation.get() === 'landscape') ? 'yourNumberValueBackground_'+inValue : 'yourNumberValueBackground_'+inValue;
    //call with new texture IDs
    updateBackground(newBackground);
    updateSelectionBackgrounds(newSelectionBackground);
    updateLogo(newLogo);
    updateBonusBG(newBonusBG);
    updateWinningNumberBG(newWinningNumberBG);
    updateYourNumberBG(newYourNumberBG);
    updateWinningNumberAnims(inValue);
    updatePlayerNumberAnims(inValue);
  }

  function updateBackground(inTex){
    //see if we're using price point specific assets
    var newBG;
    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[inTex] !== undefined) {
        newBG = inTex;
      }else{
        newBG = (orientation.get() === 'landscape') ? 'landscape_background' : 'portrait_background';
      }
    }else{
      //find the colour
      var col = backgroundLookup[pricePointIndex];
      var landscapeString = "landscape_"+col+"Background";
      var portraitString = "portrait_"+col+"Background";
      newBG = (orientation.get() === 'landscape') ? landscapeString : portraitString;
    }

    displayList.background.texture = PIXI.Texture.fromFrame(newBG);
  }

  function updateSelectionBackgrounds(inTex){
    //see if we're using price point specific assets
    var newBG;
    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[inTex] !== undefined) {
        newBG = inTex;
      }else{
        newBG = (orientation.get() === 'landscape') ? 'selectionBackgrounds' : 'selectionBackgroundsPortrait';
      }
    }else{
      //find the colour
      var col = selectionLookup[pricePointIndex];
      var landscapeString = "landscape_"+col+"SelBG";
      var portraitString = "portrait_"+col+"SelBG";
      newBG = (orientation.get() === 'landscape') ? landscapeString : portraitString;
    }

    displayList.selectionBackgrounds.texture = PIXI.Texture.fromFrame(newBG);
  }

  function updateLogo(inTex){
    //see if we're using price point specific assets
    var newLogo;
    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[inTex] !== undefined) {
        newLogo = inTex;
      }else{
        newLogo = (orientation.get() === 'landscape') ? 'landscape_gameLogo' : 'portrait_gameLogo';
      }
    }else{
      //find the colour
        var col = nonSpecificLookup[pricePointIndex];
        var landscapeString = "landscape_"+col+"Logo";
        var portraitString = "portrait_"+col+"Logo";
        newLogo = (orientation.get() === 'landscape') ? landscapeString : portraitString;
    }

    displayList.logo.texture = PIXI.Texture.fromFrame(newLogo);
  }

  function updateBonusBG(inTex){
    //see if we're using price point specific assets
    var newBG;
    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[inTex] !== undefined) {
        newBG = inTex;
      }else{
        newBG = 'bonusBackground';
      }
    }else{
      //find the colour
      var col = bonusBGLookup[pricePointIndex];
      var landscapeString = col+"BonusBG";
      var portraitString = col+"BonusBG";
      newBG = (orientation.get() === 'landscape') ? landscapeString : portraitString;
    }

    displayList.bonusCardBG.texture = PIXI.Texture.fromFrame(newBG);
  }

  function updateWinningNumberBG(inTex){
    //see if we're using price point specific assets
    var newBG;
    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[inTex] !== undefined) {
        newBG = inTex;
      }else{
        newBG = 'luckyNumberBackground';
      }
    }else{
      //find the colour
      var col = luckyLookup[pricePointIndex];
      var tempString = col+"LuckyBG";
      newBG = tempString;
    }

    for (var i = 1; i < 5; i++){
      if (displayList['winningNumber'+i].children[0] && displayList['winningNumber'+i].children[0].background){
        displayList['winningNumber'+i].children[0].background.texture = PIXI.Texture.fromFrame(newBG);
      }      
    }
  }

  function updateYourNumberBG(inTex){
    //see if we're using price point specific assets
    var newBG;
    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[inTex] !== undefined) {
        newBG = inTex;
      }else{
        newBG = 'yourNumberValueBackground';
      }
    }else{
      //find the colour
      var col = luckyLookup[pricePointIndex];
      var tempString = col+"PlayerBG";
      newBG = tempString;
    }

    for (var i = 1; i < 16; i++){
      if (displayList['playerNumber'+i].children[0] && displayList['playerNumber'+i].children[0].background){
        displayList['playerNumber'+i].children[0].background.texture = PIXI.Texture.fromFrame(newBG);
      }      
    }
  }

  function updateWinningNumberAnims(inVal){
    var thisTex;
    var prizeString = inVal.toString()+'_luckyNumberCover';

    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[prizeString]){
        thisTex = prizeString;
      }else{
        thisTex = 'luckyNumberCover';
      }
    }else{
      //find the colour
      var col1 = luckyLookup[pricePointIndex];
      var tempSeq = col1+"_luckyNumberCover";
      thisTex = tempSeq;
    }

    var revealFrames = utils.findFrameSequence(thisTex);
    for (var i = 1; i < numberOfLuckyNumbers+1; i++){
      if (displayList['winningNumber'+i].children[0]){
        displayList['winningNumber'+i].children[0].revealAnim.textures = revealFrames.map(PIXI.Texture.from);
      }

      //do the cover
      var newLuckyCover;
      if (gameConfig.pricePointSpecificAssets){
        if (PIXI.utils.TextureCache['luckyNumberCoverStatic_'+inVal.toString()] !== undefined) {
          newLuckyCover = 'luckyNumberCoverStatic_'+inVal.toString();
        }else{
          newLuckyCover = 'luckyNumberCoverStatic';
        }
      }else{
        //find the colour
        var col2 = luckyLookup[pricePointIndex];
        var tempString = col2+"LuckyCover";
        newLuckyCover = tempString;
      }

      if (displayList['winningNumber'+i].children[0]){displayList['winningNumber'+i].children[0].cover.texture = PIXI.Texture.fromFrame(newLuckyCover);}
    }
  }

  function updatePlayerNumberAnims(inVal){
    var thisTex;
    var prizeString = inVal.toString()+'_yourNumberCover';

    if (gameConfig.pricePointSpecificAssets){
      if (PIXI.utils.TextureCache[prizeString]){
        thisTex = prizeString;
      }else{
        thisTex = 'yourNumberCover';
      }
    }else{
      //find the colour
      var col1 = luckyLookup[pricePointIndex];
      var tempSeq = col1+"_yourNumberCover";
      thisTex = tempSeq;
    }
    
    var revealFrames = utils.findFrameSequence(thisTex);
    for (var i = 1; i < numberOfPlayerNumbers+1; i++){
      if (displayList['playerNumber'+i].children[0]){
        displayList['playerNumber'+i].children[0].revealAnim.textures = revealFrames.map(PIXI.Texture.from);
      }

      //do the cover
      var newWinningCover;
      if (gameConfig.pricePointSpecificAssets){
        if (PIXI.utils.TextureCache['yourNumberCoverStatic_'+inVal.toString()] !== undefined) {
          newWinningCover = 'yourNumberCoverStatic_'+inVal.toString();
        }else{
          newWinningCover = 'yourNumberCoverStatic';
        }
      }else{
        //find the colour
        var col2 = luckyLookup[pricePointIndex];
        var tempString = col2+"WinningCover";
        newWinningCover = tempString;
      }

      if (displayList['playerNumber'+i].children[0]){displayList['playerNumber'+i].children[0].cover.texture = PIXI.Texture.fromFrame(newWinningCover);}
    }    
  }

  msgBus.subscribe('PrizeData.PrizeStructure', updateManager);
  msgBus.subscribe('GameSize.OrientationChange', updateManager);

  return {
    init:updateManager
  };
});
