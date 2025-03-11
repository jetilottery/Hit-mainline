define(require => {
  const PIXI = require('com/pixijs/pixi');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const bonusGame = require('game/components/bonusGame');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');
  const numberState = require('game/state/numbers');
  require('com/gsap/TweenMax');
  const Tween = window.TweenMax;

  let numberOfHammersFound = 0;
  //complete for when we have populated the correct number of hammers
  let complete;

  function init() {
    //let's add the hammers
    for (var i = 1; i < 6; i++){
      displayList['bonusHammer'+i].texture = PIXI.Texture.fromFrame('hammerCollected');
      //hide it as well
      displayList['bonusHammer'+i].visible = false;
    }

    //HITGA-79 - GAV - The pulsing BONUS text is a little plain and easy to miss.
    //let's add the selector animation
    var sparkleFrames = utils.findFrameSequence('bonusSparkles');
    displayList.bonusSparkles.textures = sparkleFrames.map(PIXI.Texture.from);
    displayList.bonusSparkles.visible = false;
    displayList.bonusSparkles.loop = true;
    displayList.bonusSparkles.gotoAndStop(0);
  }

  function playStopSparkles(play){
    displayList.bonusSparkles.visible = play;
    if (play){
      displayList.bonusSparkles.gotoAndPlay(1);
    }else{
      displayList.bonusSparkles.gotoAndStop(0);
    }
  }

  function reset() {
    for (var i = 1; i < 6; i++){
      displayList['bonusHammer'+i].visible = false;
    }
    numberOfHammersFound = 0;
    //make sure the sparkles are stopped and hidden
    playStopSparkles(false);
  }
  
  function hammerFound(numBonus){
    //right, if we have one, easy
    //just show it, then increment numberOfHammersFound
    if (numBonus === 1){
      showHammer();
    }else{
      //it can only be 2
      showHammer();
      Tween.delayedCall(0.25, showHammer);
    }    
  }

  function showHammer(){
    //play sound
    audio.play('hammerCollect');
    numberOfHammersFound++;
    displayList['bonusHammer'+numberOfHammersFound].visible = true;    
    //pulse it a little
    Tween.to(displayList['bonusHammer'+numberOfHammersFound].scale, 0.25, {x:1.5,y:1.5,yoyo:true,repeat:3});
    //and play a sound if we've found them all
    if (numberOfHammersFound === 5){
      audio.play('BonusActivated');
      //now we need to pulse the bonus text
      Tween.to(displayList.bonusLabel.scale, 0.5, {x:1.4,y:1.4,yoyo:true,repeat:-1});
      //and play the bonus sparkles
      playStopSparkles(true);
    }

    //update the total
    bonusGame.update(numberOfHammersFound);

    //HITGA-123 - HIT_SQA_IQA: 29000 error message pop up for some scenarios.
    //if the number of hammers shown tallies with the number in the state
    //we are showing the correct number of hammers
    if (numberState.bonus === numberOfHammersFound){
      completeCard();
    }
  }

  function completeCard() {
    if (complete) {
      complete();
    }
  }

  //for when the bonus card has been fully populated
  async function bonusCardPopulated() {
    if (numberState.bonus !== numberOfHammersFound){
      await new Promise(c => {
        complete = c;
      });
    }    
  }

  msgBus.subscribe('Game.BonusSymFound', hammerFound);

  return {
    init,
    reset,
    bonusCardPopulated:bonusCardPopulated
  };
});
