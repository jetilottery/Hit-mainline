define(require => {
  const PIXI = require('com/pixijs/pixi');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const particleConfig = require('game/components/utils/particleConfig');
  const rollupUtils = require('game/components/utils/rollupUtils');
  const app = require('skbJet/componentManchester/standardIW/app');
  require('com/gsap/TweenMax');
  require('com/gsap/easing/EasePack');  
  const Tween = window.TweenMax;

  //promises
  //complete for when we have finished the bonus game
  let winAllComplete;
  let winAllFound = false;
  let winAllValue = 0;
  let matchInterval;
  let matchCounter = 1;
  let coinShowerContainer;
  let coinShowerEmitter;

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
  coinShowerConfig.speed.start = 1150;
  coinShowerConfig.speed.start = 1150;

  coinShowerConfig.scale.start = coinShowerConfig.scale.start;
  coinShowerConfig.scale.end = coinShowerConfig.scale.end;
  coinShowerConfig.scale.minimumScaleMultiplier = coinShowerConfig.scale.minimumScaleMultiplier;

  coinShowerConfig.frequency = 0.08;

  function completeWinAll() {
    if (winAllComplete) {
      winAllComplete();
    }
  }

  function init(){
    //create container
    coinShowerContainer = new PIXI.Container();
    displayList.winAllContainer.visible = false;
    displayList.winAllContainer.alpha = 0;
    coinShowerContainer.visible = false;
    coinShowerContainer.alpha = 0;
    
    //add the container to the app stage
    //app.stage.children.length-5 is high up enough to be above the button bar
    app.stage.addChildAt(coinShowerContainer, app.stage.children.length-5);

    coinShowerEmitter = rollupUtils.createEmitter(
      coinShowerContainer, 
      coinShowerConfig, 
      coinShowerConfig.fountainSettings.animatedParticlePrefix,
      coinShowerConfig.fountainSettings.nonAnimatedImages, 
      coinShowerConfig.fountainSettings.isAnimated, 
      {startFrame: coinShowerConfig.fountainSettings.startFrame, endFrame: coinShowerConfig.fountainSettings.endFrame, isSingleNumFormat: false, frameRate: coinShowerConfig.fountainSettings.frameRate}
    );
    coinShowerEmitter.spawnPos.y = -290;
    coinShowerEmitter.emit = false;
  }

  function show(inVal){
    //position first
    position();
    //now show
    displayList.winAllContainer.visible = true;
    coinShowerContainer.visible = true;
    Tween.fromTo(displayList.winAllContainer, 0.5, {alpha:0}, {alpha:1, onUpdate:function(){
      coinShowerContainer.alpha = displayList.winAllContainer.alpha;
    },onComplete:function(){
      coinShowerContainer.alpha = displayList.winAllContainer.alpha;
      startRollup(inVal);
    }});
  }  

  function startRollup(inVal){
    //find the duration
    //for values $500 and below, use winAllRollupLowerDurationInSeconds
    //for values above, use winAllRollupHigherDurationInSeconds
    var delay = (inVal <= 500) ? gameConfig.winAllRollupLowerDurationInSeconds : gameConfig.winAllRollupHigherDurationInSeconds;
    Tween.to({currentWinValue: 0}, delay, {
        currentWinValue: inVal, onStart:function(){
          //HITGA-109 - HIT_IQA: The sound of gold COINS falling could not be stopped when WIN ALL scenario happens for siteID 0.
          //play rollup sound on tween start instead of separately
          audio.play('rollUp', true);
        },onUpdate: function () {
          displayList.winAllValue.text = SKBeInstant.formatCurrency(this.target.currentWinValue).formattedAmount;
        },
        onComplete: rollUpWinMeterComplete
    });    
  }

  function rollUpWinMeterComplete(){    
    //stop rollup sound
    audio.stop('rollUp');
    //hide after a short delay
    Tween.delayedCall(2.5, hide);
  }

  function hide(){
    //stop coin shower
    toggleCoinShower(false);
    Tween.fromTo(displayList.winAllContainer, 0.5, {alpha:1}, {alpha:0, onUpdate:function(){
      coinShowerContainer.alpha = displayList.winAllContainer.alpha;
    },onComplete:function(){
      displayList.winAllContainer.visible = false;
      displayList.winAllContainer.alpha = 0;
      coinShowerContainer.visible = false;
      coinShowerContainer.alpha = 0;
      completeWinAll();
    }});
  }

  async function complete() {
    console.log('complete');

    //we should know by now whether we are able to trigger Win All or not
    if (winAllFound){
      setAllToWin();
      //start coin shower
      toggleCoinShower(true);
      await new Promise(c => {
        winAllComplete = c;
      });
    }   

    displayList.winAllValue.text = "";
    winAllFound = false;
    winAllValue = 0;
    matchCounter = 1;
  }

  //we need to run through each number and set it to match
  function setAllToWin(){
    matchInterval = setInterval(setOne, 100);
  }

  function setOne(){
    clearInterval(matchInterval);
    //publish
    msgBus.publish('Game.WinAllMatch', (matchCounter-1));
    if (matchCounter < 15){
      matchCounter++;
      matchInterval = setInterval(setOne, gameConfig.winAllHighlightInterval*1000);
    }else{
      matchCounter = 1;
      //finally show
      show(winAllValue);
    }    
  }
  
  function winAllActivated(inObj){
    winAllFound = inObj.winAllFound;
    winAllValue = inObj.winAllValue;
  }

  function toggleCoinShower(enable){
    coinShowerEmitter.emit = enable;
  }

  function position(){
    if (!coinShowerContainer){return;}
    coinShowerContainer.x = displayList.winAllContainer.x;
    coinShowerContainer.y = displayList.winAllContainer.y;
  }

  msgBus.subscribe('winAllActivated', winAllActivated);
  msgBus.subscribe('GameSize.OrientationChange', position);

  return {
    init,
    complete,
    hide,
    show
  };
});
