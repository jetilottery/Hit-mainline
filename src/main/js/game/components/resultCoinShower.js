define(require => {
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const particleConfig = require('game/components/utils/particleConfig');
  const rollupUtils = require('game/components/utils/rollupUtils');
  const orientation = require('skbJet/componentManchester/standardIW/orientation');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');

  //set up a coin shower
  let coinShowerConfig = new particleConfig.fountain();
  coinShowerConfig.fountainSettings = {
      animatedParticlePrefix: 'hitCoin00',
      isAnimated: true, 
      startFrame: 1,
      endFrame: 11,
      nonAnimatedImages: [],
      frameRate: 24,
      spawnPosLandscapeAnchor: {x: 0.5, y: 1},
      spawnPosPortraitAnchor: {x: 0.3, y: 1.4}
  };
  coinShowerConfig.speed.start = 1650;
  coinShowerConfig.emitterLifetime = 2;
  coinShowerConfig.scale.start = coinShowerConfig.scale.start;
  coinShowerConfig.scale.end = coinShowerConfig.scale.end;
  coinShowerConfig.scale.minimumScaleMultiplier = coinShowerConfig.scale.minimumScaleMultiplier;

  coinShowerConfig.frequency = 0.09;

  function init(){
    //HITGA-81 - Coin shower, the coins go above PLAY AGAIN and behind the OK button, is this by design?
    //create emitter on the buttonBar rather than the result plaque, this puts the coin shower above all buttons
    //but behind the footer
    displayList.buttonBar.emitter = rollupUtils.createEmitter(
      displayList.buttonBar, 
      coinShowerConfig, 
      coinShowerConfig.fountainSettings.animatedParticlePrefix,
      coinShowerConfig.fountainSettings.nonAnimatedImages, 
      coinShowerConfig.fountainSettings.isAnimated, 
      {startFrame: coinShowerConfig.fountainSettings.startFrame, endFrame: coinShowerConfig.fountainSettings.endFrame, isSingleNumFormat: false, frameRate: coinShowerConfig.fountainSettings.frameRate}
    );

    //position it
    if (orientation.get() === 'landscape'){
      displayList.buttonBar.emitter.spawnPos.x = 720;
      displayList.buttonBar.emitter.spawnPos.y = 150;
    }else{
      displayList.buttonBar.emitter.spawnPos.x = 405;
      displayList.buttonBar.emitter.spawnPos.y = 150;
    }

    displayList.buttonBar.emitter.emit = false;
  }

  function onEnterResultScreenState(){
    if (gameConfig.showResultScreen && meterData.totalWin > 0){
      displayList.buttonBar.emitter.emit = true;
    }
  }

  function updatePositioning(){
    if (!displayList.buttonBar){return;}
    if (orientation.get() === 'landscape'){
      displayList.buttonBar.emitter.spawnPos.x = 720;
      displayList.buttonBar.emitter.spawnPos.y = 150;
    }else{
      displayList.buttonBar.emitter.spawnPos.x = 405;
      displayList.buttonBar.emitter.spawnPos.y = 150;
    }
  }

  msgBus.subscribe('jLottery.enterResultScreenState', onEnterResultScreenState);
  msgBus.subscribe('GameSize.OrientationChange', updatePositioning);

  return {
    init:init
  };
});
