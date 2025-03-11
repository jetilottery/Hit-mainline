define(require => {
  const PIXI = require('com/pixijs/pixi');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const BonusPig = require('game/components/BonusPig');
  const PigIndicator = require('game/components/PigIndicator');
  const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
  const PrizeLevel = require('game/components/PrizeLevel');
  const numberState = require('game/state/numbers');
  const bonusOutcomes = require('game/components/bonusOutcomes');
  const utils = require('skbJet/componentManchester/standardIW/layout/utils');
  const orientation = require('skbJet/componentManchester/standardIW/orientation');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
  const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const particleConfig = require('game/components/utils/particleConfig');
  const app = require('skbJet/componentManchester/standardIW/app');
  require('com/gsap/TweenMax');
  require('com/gsap/plugins/PixiPlugin');
  const Tween = window.TweenMax;

  let pigs;
  let pigIndicators;
  let prizeLevels;  
  let bonusData;
  let numberOfHammers = 0;

  let idleTween;

  let revealCounter = 0;
  let autoRevealOrder = [];

  let bonusScenario = [];
  let numOfPigsPressed = 0;
  let prizeRevealedArr = [];
  let numOfLosers = 0;
  let totalBonusPrize = 0;
  let pigPressedArr = [];
  let prizeTable = [];
  let unformattedPrizeTable = [];
  let prizeArr = [];
  let particleEmitter;

  //find the top prize
  msgBus.subscribe('PrizeData.PrizeTable', function(){
    prizeTable = [];
    unformattedPrizeTable = [];
    prizeTable.push(SKBeInstant.formatCurrency(prizeData.prizeTable.IW1).formattedAmount);
    prizeTable.push(SKBeInstant.formatCurrency(prizeData.prizeTable.IW2).formattedAmount);
    prizeTable.push(SKBeInstant.formatCurrency(prizeData.prizeTable.IW3).formattedAmount);
    prizeTable.push(SKBeInstant.formatCurrency(prizeData.prizeTable.IW4).formattedAmount);
    unformattedPrizeTable.push(prizeData.prizeTable.IW1);
    unformattedPrizeTable.push(prizeData.prizeTable.IW2);
    unformattedPrizeTable.push(prizeData.prizeTable.IW3);
    unformattedPrizeTable.push(prizeData.prizeTable.IW4);
    populatePrizeTable();
  });

  function randomIdleDuration() {
    return (
      gameConfig.bonusItemIdleInterval -
      gameConfig.idleIntervalVariation +
      Math.random() * gameConfig.idleIntervalVariation * 2
    );
  }

  function init() {
      idleTween = Tween.to({}, randomIdleDuration(), {
        onComplete: promptIdle,
        paused: true,
      });

      displayList.bonusGameContainer.visible = false;
      //create and add the pigs to the container
      pigs = [
        BonusPig.fromContainer(displayList.playerPig1),
        BonusPig.fromContainer(displayList.playerPig2),
        BonusPig.fromContainer(displayList.playerPig3),
        BonusPig.fromContainer(displayList.playerPig4),
        BonusPig.fromContainer(displayList.playerPig5),
        BonusPig.fromContainer(displayList.playerPig6),
        BonusPig.fromContainer(displayList.playerPig7),
        BonusPig.fromContainer(displayList.playerPig8),
        BonusPig.fromContainer(displayList.playerPig9),
        BonusPig.fromContainer(displayList.playerPig10),
        BonusPig.fromContainer(displayList.playerPig11),
        BonusPig.fromContainer(displayList.playerPig12),
      ];

      for (var j = 0; j < pigs.length; j++){
        pigs[j].num = (j+1);
      }

      //now we need to create the indicators
      pigIndicators = [
        fromContainer(PigIndicator, displayList.pigIndicator1),
        fromContainer(PigIndicator, displayList.pigIndicator2),
        fromContainer(PigIndicator, displayList.pigIndicator3),
      ];

      //and the prize table
      //wow this one is going to be fun, as we have to generate it all dynamically
      //so let's look at the prize table... in the ticket this would be IW1-4
      prizeLevels = [
        fromContainer(PrizeLevel, displayList.prizeLevel1),
        fromContainer(PrizeLevel, displayList.prizeLevel2),
        fromContainer(PrizeLevel, displayList.prizeLevel3),
        fromContainer(PrizeLevel, displayList.prizeLevel4),
        fromContainer(PrizeLevel, displayList.prizeLevel5),
        fromContainer(PrizeLevel, displayList.prizeLevel6),
      ];

      //let's add the selector animation
      var selectorFrames = utils.findFrameSequence('selector');
      displayList.selectorAnim.textures = selectorFrames.map(PIXI.Texture.from);
      displayList.selectorAnim.visible = false;
      displayList.selectorAnim.gotoAndStop(0);
      //coin shower
      var coinFrames = utils.findFrameSequence('coinshower');
      displayList.coinShower.textures = coinFrames.map(PIXI.Texture.from);
      displayList.coinShower.animationSpeed = gameConfig.bonusCoinBurstAnimationSpeed;
      displayList.coinShower.visible = false;
      displayList.coinShower.gotoAndStop(0);

      //generate the prize table
      populatePrizeTable();

      //create the particle emitter
      particleEmitter = createEmitter(displayList.prizeParticles);
      particleEmitter.emit = false;
      console.log(particleEmitter);
  }

  function createEmitter(inContainer){
      var emitterConfig = particleConfig.prizeTableEffect;
      var particlesImgArray = [];
      var emitter;

      particlesImgArray.push(PIXI.Texture.fromFrame("bonusSparkle"));
      emitter = new PIXI.particles.Emitter(inContainer, particlesImgArray, emitterConfig);
       
      var ticker = app.ticker;
      var enabled = true;
      var tickHandler = function(){if(enabled){emitter.update(ticker.elapsedMS * 0.001);}};
      ticker.add(tickHandler);
      // Start the update
      // update();
      emitter.killEmitter = function(){
          enabled = false;
          emitter.destroy();
      };
      return emitter;
  }

  function promptIdle() {
    // Check if there are any remaining unrevealed pigs
    const unrevealed = pigs.filter(pig => !pig.revealed);
    if (unrevealed.length === 0) {
      return;
    }

    // Pick one at random to animate
    unrevealed[Math.floor(unrevealed.length * Math.random())].prompt();

    // Restart the idle timer tween
    idleTween.duration(randomIdleDuration());
    idleTween.play(0);
  }

  //onGameStart listening for a startUserInteraction/restartUserInteraction call
  //this is just so we can listen for the scenario data independently of the framework
  //so we can grab the first and last prizes, if we need to create a seed from them
  function onGameStart(data){
    var scenarioNumArr = data.scenario.split('|')[1].split(',');
    prizeArr = [];
    for (var i = 0; i < scenarioNumArr.length; i++){
      prizeArr.push(scenarioNumArr[i].split(':')[1].split('')[0]);
    }
  }

  function populatePrizeTable(){
    //fairly straightforward, we need to grab the strings and set the prize levels up accordingly
    //we can just set 5 and 6 to long and short dash accordingly
    if (!prizeLevels){return;}
    prizeLevels[0].setState(prizeTable[0],'unselected');
    prizeLevels[1].setState(prizeTable[1],'unselected');
    prizeLevels[2].setState(prizeTable[2],'unselected');
    prizeLevels[3].setState(prizeTable[3],'unselected');
    prizeLevels[4].setState('longDash','unselected');
    prizeLevels[5].setState('shortDash','unselected');
  }

  function fromContainer(inClass, inContainer) {
    const indicator = new inClass();
    inContainer.addChild(indicator);
    return indicator;
  }

  //promises
  //complete for when we have finished the bonus game
  let complete;

  function completeBonus() {
    if (complete) {
      complete();
    }
  }

  //for when the bonus game is complete
  async function bonusGameComplete() {
    //now then, here is where we will transition into the bonus
    //so we need to work out how many hammers we have collected
    //if zero, no problem, the promise is fulfilled
    //if we have, we need to transition in - call transitionToBonus
    if (numberOfHammers === 5){
      displayList.bonusPrizeText.text = " ";
      //disable help and autoplay for transition
      msgBus.publish('UI.updateButtons', {
        autoPlay: false,
        help: { enabled: false },
      });
      //displayList.autoPlayStartButton.enabled = false;
      //displayList.helpButton.enabled = false;
      //oooo, we need to transition into the bonus
      Tween.delayedCall(2, transitionToBonus, [true]);
      await new Promise(c => {
        complete = c;
      });
    }else{
      //no need for a promise, we're not going into the bonus
      //effectively... game complete
    }

    // Disable to prevent double completion
    complete = undefined;
    numberOfHammers = 0;
    bonusScenario = [];
    numOfPigsPressed = 0;
    prizeRevealedArr = [];
    pigPressedArr = [];
    numOfLosers = 0;
    revealCounter = 0;
    autoRevealOrder = [];
    displayList.bonusPrizeText.text = " ";
    prizeArr = [];
    totalBonusPrize = 0;
    //and reset everything
    resetAll();
  }

  function transitionToBonus(toBonus){
    //if we're transitioning INTO the bonus, toBonus = true
    //we will need to fade out the base game and fade in the bonus game
    //if we're transitioning OUT OF the bonus, we will need to do the opposite
    console.log('transitionToBonus: '+toBonus);
    
    //publish state so revealAll knows to start the bonus game if we hit Reveal All during the bonus
    var nextState = (toBonus) ? 'BONUS_GAME' : 'BASE_GAME';
    msgBus.publish('gameStateChanged', nextState);

    var baseGame = displayList.baseGameContainer;
    var bonusGame = displayList.bonusGameContainer;
    //show the bonus game container
    bonusGame.visible = true;
    //fade one in and the other out
    Tween.fromTo(baseGame, 1, {alpha:toBonus?1:0}, {alpha:toBonus?0:1});
    Tween.fromTo(bonusGame, 1, {alpha:toBonus?0:1}, {alpha:toBonus?1:0, onComplete:function(){
      if (nextState === 'BASE_GAME'){
        //HITGA-102 - HITGA_COM:"$0.00" is displayed in the win meter when force a lose result with bonus.
        //only manipulate the meterData if totalBonusPrize > 0
        if (totalBonusPrize > 0){
          meterData.win += totalBonusPrize;
        }        
        bonusGame.visible = false;
        bonusGame.alpha = 0;
        completeBonus();        
      }else if (nextState === 'BONUS_GAME'){
        //enable the bonus game here
        enableBonusGame();
        //we now have the bonus scenario
        //now let's enable the pigs
        //unless of course, we're in auto play
        //if we are, just reveal all
        enablePigs();
        //if we're going into the bonus we need to be able to Reveal All again
        //so re-enable the auto play start button and help button
        autoPlay._enabled = false;
        msgBus.publish('UI.updateButtons', {
          autoPlay: true,
          help: { enabled: true },
        });
        displayList.autoPlayStartButton.enabled = true;
        //displayList.helpButton.enabled = true;        
        Tween.killTweensOf(displayList.bonusLabel.scale);
        //switch off the bonus sparkle
        displayList.bonusSparkles.visible = false;
        displayList.bonusSparkles.gotoAndStop(0);
        displayList.bonusLabel.scale.x = displayList.bonusLabel.scale.y = 1;
      }
    }});
  }

  function resetAll(){
    //reset the pigs
    for (var j = 0; j < pigs.length; j++){
      pigs[j].reset();
    }

    //reset the indicators
    pigIndicators[0].set(false);
    pigIndicators[1].set(false);
    pigIndicators[2].set(false);

    //no particles
    particleEmitter.emit = false;

    //stop and hide the selector anim
    displayList.selectorAnim.visible = false;
    displayList.selectorAnim.gotoAndStop(0);
    displayList.coinShower.visible = false;
    displayList.coinShower.gotoAndStop(0);

    Tween.to(displayList.bonusGameBackground, 0, {pixi:{brightness:1}, onComplete:function(){
      displayList.bonusGameBackground.filters = null;
    }});    

    for (var k = 0; k < pigs.length; k++){
      Tween.to(pigs[k], 0, {pixi:{brightness:1}, onComplete:function(){
        pigs[k].filters = null;
      }});
    }
  }

  function enableBonusGame(){    
    var winNums = numberState.winning.slice();

    /*
      Okay, so that the game is reproducible, we cannot simply run this off a randomiser

      Therefore... maths.

      Calculation:
    
      1. Add all the winning numbers together
      2. Perform this value mod 7 to return a value between 0 and 6

      If this is a losing play, do the following:

      0 = L,W,L,L
      1 = L,L,W,L
      2 = W,L,W,L,L
      3 = L,W,W,L,L
      4 = L,W,L,W,L
      5 = W,L,L,W,L
      6 = L,L,W,W,L
    */

    var winningTotal = 0;
    for (var i = 0; i < winNums.length; i++){
      winningTotal += winNums[i];
    }

    //if this is a losing play - bonusData = 0
    if (bonusData.bonusString === "0"){
      bonusScenario = bonusOutcomes.generateLoser(winningTotal);
    }else if (bonusData.bonusString === "4"){
      bonusScenario = bonusOutcomes.generateIW4(winningTotal);
    }else if (bonusData.bonusString === "3"){
      bonusScenario = bonusOutcomes.generateIW3(winningTotal);
    }else if (bonusData.bonusString === "2"){
      bonusScenario = bonusOutcomes.generateIW2(winningTotal);
    }else if (bonusData.bonusString === "1"){
      bonusScenario = bonusOutcomes.generateIW1(winningTotal);
    }        
  }
  
  function pigPressed(inVal){
    //we need to find which pig this is
    var thisPig = pigs[inVal-1];
    //now we need to set the contents of said pig
    //look at bonusScenario[numOfPigsPressed]
    var thisTurn = bonusScenario[numOfPigsPressed];
    prizeRevealedArr.push(thisTurn);
    thisPig.bonusVal = thisTurn;
    thisPig.populate(thisTurn);
    //now reveal said pig
    thisPig.disable();
    thisPig.reveal();   
    //increment
    numOfPigsPressed++;
    //have we revealed them all?
    if (numOfPigsPressed === bonusScenario.length){
      //disable all pigs
      disableAllPigs();
      //ensure help and autoplay are disabled
      // hide autoplay button, disable help button
      msgBus.publish('UI.updateButtons', {
        autoPlay: false,
        help: { enabled: false },
      });
    }
  }

  function checkForWinner(inVal){
    //well firstly, was the pig we have just revealed a loser?
    var lastPig = pigs[inVal-1];
    if (lastPig.bonusVal === "L"){
      //yep, it's a loser
      //set the next indicator
      pigIndicators[numOfLosers].set(true);      
      //and the one in the pig itself
      lastPig.noWin.visible = true;
      numOfLosers++;
      //play sound
      audio.playSequential('missedPiggy');
    }else{
      //what we need to do here, is see how many winners we have revealed
      var count = 0;
      for (var i = 0; i < prizeRevealedArr.length; i++){
        if (prizeRevealedArr[i] === "W"){
          //it's a winner
          count++;
        }
      }
      //update the prize table and selection animation
      updateDisplay(count);
    }

    //HITGA-77 - BONUS – when you have picked the last pig and you can’t pick anymore the other non-picked pigs need to grey out
    //grey out the unrevealed pigs
    if (numOfPigsPressed === bonusScenario.length){      
      greyOutUnrevealedPigs();
    }

    //and finally, check to see if the bonus is complete
    Tween.delayedCall(2, checkComplete, [inVal]);
  }

  function updateDisplay(inVal){
    updatePrizeTable(inVal);
    updateSelectionAnim(inVal);
  }

  function checkComplete(inVal){
    pigPressedArr.push(inVal);
    if (pigPressedArr.length === bonusScenario.length){
      if (totalBonusPrize > 0){
        //it's a winner
        //play coin shower
        displayList.coinShower.visible = true;
        displayList.coinShower.gotoAndPlay(1);
        displayList.coinShower.loop = false;  
        displayList.coinShower.onComplete = function(){
          displayList.coinShower.gotoAndStop(0);
          displayList.coinShower.visible = false;
        };
        darken();
        //play sound
        audio.play('bonusWinTerminator'); 
        Tween.delayedCall(3, transitionToBonus, [false]);
      }else{
        //play sound
        audio.play('bonusLoseTerminator'); 
        Tween.delayedCall(2, transitionToBonus, [false]);
      }              
    }
  }

  function updatePrizeTable(inCount){
    //prize table is already populated, so it *should* just be a case of setting everything
    //to unselected again, then setting the one we need to selected
    prizeLevels[0].setState(prizeTable[0],'unselected');
    prizeLevels[1].setState(prizeTable[1],'unselected');
    prizeLevels[2].setState(prizeTable[2],'unselected');
    prizeLevels[3].setState(prizeTable[3],'unselected');
    prizeLevels[4].setState('longDash','unselected');
    prizeLevels[5].setState('shortDash','unselected');

    switch (inCount){
      case 1:
        prizeLevels[5].setState('shortDash','selected');     
        audio.play('WinScale_1');   
        break;
      case 2:
        prizeLevels[4].setState('longDash','selected');      
        audio.play('WinScale_2');   
        break;
      case 3:
        prizeLevels[3].setState(prizeTable[3],'selected');
        totalBonusPrize = unformattedPrizeTable[3];
        updatePrizeDisplay();
        audio.play('WinScale_3'); 
        break;
      case 4:
        prizeLevels[2].setState(prizeTable[2],'selected');
        totalBonusPrize = unformattedPrizeTable[2];
        updatePrizeDisplay();
        audio.play('WinScale_4'); 
        break;
      case 5:
        prizeLevels[1].setState(prizeTable[1],'selected');
        totalBonusPrize = unformattedPrizeTable[1];
        updatePrizeDisplay();
        audio.play('WinScale_5'); 
        break;
      case 6:
        prizeLevels[0].setState(prizeTable[0],'selected');
        totalBonusPrize = unformattedPrizeTable[0];
        updatePrizeDisplay();
        audio.play('WinScale_6'); 
        break;
      default:
        //nope
        break;
    }
  }

  function updateSelectionAnim(inCount){
    //this is basically just a case of positioning the selection animation in the y
    //since the x value is dealt with elsewhere
    displayList.selectorAnim.visible = true;
    displayList.selectorAnim.gotoAndPlay(1);
    displayList.selectorAnim.loop = true;

    //PLAY PIXI PARTICLES HERE AND POSITION
    //only play the particleEmitter if inCount > 2
    particleEmitter.emit = (inCount > 2);

    var newYPos = 0;

    //now position it
    switch (inCount){
      case 6:
        newYPos = (orientation.get() === 'landscape') ? 195 : 119;
        break;
      case 5:
        newYPos = (orientation.get() === 'landscape') ? 275 : 196;
        break;
      case 4:
        newYPos = (orientation.get() === 'landscape') ? 360 : 272;
        break;
      case 3:
        newYPos = (orientation.get() === 'landscape') ? 440 : 352;
        break;
      case 2:
        newYPos = (orientation.get() === 'landscape') ? 503 : 410;
        break;
      case 1:
        newYPos = (orientation.get() === 'landscape') ? 545 : 450;
        break;
      default:
        //nope
        break;
    }

    displayList.selectorAnim.y = newYPos;
    displayList.coinShower.y = newYPos;
    displayList.prizeParticles.y = newYPos;
  }

  function enablePigs(){
    for (var j = 0; j < pigs.length; j++){
      pigs[j].num = (j+1);
      pigs[j].enable();
    }

    // Start the idle timer tween
    idleTween.play(0);
  }

  function disableAllPigs(){
    for (var j = 0; j < pigs.length; j++){
      pigs[j].disable();
      pigs[j].stopIdle();
    }

    // Stop the idle timer tween
    idleTween.pause(0);
  }

  function greyOutUnrevealedPigs(){
    for (var j = 0; j < pigs.length; j++){
      if (!pigs[j].revealed){
        pigs[j].greyscale();
      }
    }
  }

  function updateNumberOfHammers(inVal){
    numberOfHammers = inVal;
  }
  
  function populate(inString, inData){
    bonusData = {
      bonusString:inString,
      bonusOutcome:inData
    };
  }

  function darken(){
    //here we will darken the bonus background and any non winning pigs
    Tween.to(displayList.bonusGameBackground, 1, {pixi:{brightness:0.4}});
    //find the non winning pigs, this is fairly straightforward - if the buttons are visible, it's a non winner
    for (var j = 0; j < pigs.length; j++){
      if (pigs[j].bonusVal === "L" || pigs[j].bonusVal === "X"){
        Tween.to(pigs[j], 1, {pixi:{brightness:0.4}});
      }
    }
  }

  function updatePrizeDisplay(){    
    //now update the display
    var formattedPrize = SKBeInstant.formatCurrency(totalBonusPrize).formattedAmount;
    var str = (orientation.get() === 'landscape') ? 'bonusWinL' : 'bonusWinP';
    if (totalBonusPrize > 0){
      displayList.bonusPrizeText.text = resources.i18n.Game[str].replace('{0}', formattedPrize);
    }    
  }

  //now then, what we'd need to do here is take the first and last prize amounts from the scenario string
  //find out the ASCII code values, add them together and do a MOD 10
  //this gives us a value between 0 and 9
  //we can then select a shuffled order
  //saves having to do it via a randomiser
  function revealAll(){
    console.log('revealAll');
    // Stop the idle timer tween
    idleTween.pause(0);
    //first thing we need to do is disable all pigs
    disableAllPigs();
    //so the two values we need are prizeArr[0] and prizeArr[prizeArr.length-1]
    var code1 = prizeArr[0].charCodeAt(0);
    var code2 = prizeArr[prizeArr.length-1].charCodeAt(0);
    var seedVal = (code1 + code2) % 10;
    autoRevealOrder = bonusOutcomes.generateRevealAllOrder(seedVal, pigPressedArr);
    //we know the bonusScenario length
    //we also know how many we have revealed so far
    revealCounter = numOfPigsPressed;
    revealOne();
  }

  function revealOne(){
    pigPressed(autoRevealOrder[revealCounter]);
    revealCounter++;
    if (numOfPigsPressed < bonusScenario.length){
      Tween.delayedCall(gameConfig.bonusItemInterval, revealOne);
    }else{
      revealCounter = 0;
    }    
  }

  msgBus.subscribe('pigPressed', pigPressed);
  msgBus.subscribe('pigRevealed', checkForWinner);
  msgBus.subscribe('jLottery.reStartUserInteraction', onGameStart);
  msgBus.subscribe('jLottery.startUserInteraction', onGameStart);
  msgBus.subscribe('GameSize.OrientationChange', updatePrizeDisplay);

  return {
    init:init,
    bonusGameComplete:bonusGameComplete,
    update:updateNumberOfHammers,
    populate:populate,
    revealAll:revealAll
  };
});
