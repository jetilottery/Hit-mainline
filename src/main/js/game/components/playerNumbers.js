define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const PlayerNumber = require('game/components/PlayerNumber');
  const numberState = require('game/state/numbers');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  require('com/gsap/TweenLite');
  const Tween = window.TweenLite;

  let cards;
  let numbers;
  let totalAmount = 0;
  let totalBonus = 0;
  let idleTween;

  function randomIdleDuration() {
    return (
      gameConfig.playerNumberIdleInterval -
      gameConfig.idleIntervalVariation +
      Math.random() * gameConfig.idleIntervalVariation * 2
    );
  }

  function init() {
    idleTween = Tween.to({}, randomIdleDuration(), {
      onComplete: promptIdle,
      paused: true,
    });

    cards = [
      PlayerNumber.fromContainer(displayList.playerNumber1),
      PlayerNumber.fromContainer(displayList.playerNumber2),
      PlayerNumber.fromContainer(displayList.playerNumber3),
      PlayerNumber.fromContainer(displayList.playerNumber4),
      PlayerNumber.fromContainer(displayList.playerNumber5),
      PlayerNumber.fromContainer(displayList.playerNumber6),
      PlayerNumber.fromContainer(displayList.playerNumber7),
      PlayerNumber.fromContainer(displayList.playerNumber8),
      PlayerNumber.fromContainer(displayList.playerNumber9),
      PlayerNumber.fromContainer(displayList.playerNumber10),
      PlayerNumber.fromContainer(displayList.playerNumber11),
      PlayerNumber.fromContainer(displayList.playerNumber12),
      PlayerNumber.fromContainer(displayList.playerNumber13),
      PlayerNumber.fromContainer(displayList.playerNumber14),
      PlayerNumber.fromContainer(displayList.playerNumber15),
    ];
  }

  function promptIdle() {
    // Check if there are any remaining unrevealed cards
    const unrevealed = cards.filter(number => !number.revealed);
    if (unrevealed.length === 0) {
      return;
    }

    // Pick one at random to animate
    unrevealed[Math.floor(unrevealed.length * Math.random())].prompt();

    // Restart the idle timer tween
    idleTween.duration(randomIdleDuration());
    resetIdle(0);
  }

  function resetIdle(inVal){
    idleTween.play(inVal);
  }

  function populate(data) {
    numbers = data;
    //work out the total winning amount for this game
    //we'll need this if we get a WIN ALL
    totalAmount = 0;
    totalBonus = 0;
    for (var i = 0; i < numbers.length; i++){
      totalAmount += numbers[i][1];
      totalBonus += numbers[i][2];
    }

    //store the total number of bonus symbols
    msgBus.publish('Game.TotalBonus', totalBonus);
  }

  function enable() {
    // Start the idle timer tween
    resetIdle(0);

    // Return an array of promises for each card's lifecycle
    return cards.map(async card => {
      // Enable the card and wait for it to be revealed (manually or automatically)
      await card.enable();
      // HITGA-75 - The idle animations should not animate if the game has been interacted with within the last 5 seconds or so.
      // Restart the idle timer tween everywhere
      msgBus.publish('Game.ResetIdle', 0);
      // Play the Player Number reveal audio
      audio.playSequential('playerNumber');
      // Get the next Winning Number
      const nextData = numbers.shift();
      // Populate the card with the next Player Number, ready to be uncovered
      card.populate(nextData);
      // Wait for the uncover animation (if animated)
      await card.uncover();
      //stop idle tween if we've revealed all of them
      stopIdleIfAllRevealed();
      //show number of hammers for this number
      card.showBonus();
      msgBus.publish('Game.PlayerNumber', nextData[0]);
      // If the revealed number matches a revealed Winning Number then mark the match
      // But with this game we also need to consider an x2 win or a Win All  
      if (!card.matched){
        if (numberState.winning.includes(nextData[0])){
          //then it's a number match, woo
          card.match();
          audio.playSequential('match');
          meterData.win += card.value;
          await card.presentWin();
        }else if (nextData[0] === 'Y'){
          //it's a 2x
          card.match();
          audio.playSequential('MultSymbol');
          meterData.win += (card.value*2);
          await card.presentWin();
        }else if (nextData[0] === 'Z'){
          //it's a win all
          card.match();
          card.winAll.visible = true;
          audio.playSequential('WinAll');
          meterData.win = totalAmount;
          msgBus.publish('winAllActivated', {
            winAllFound:true,
            winAllValue:totalAmount
          });
          await card.presentWin();
        }        
      }
    });
  }

  function stopIdleIfAllRevealed(){
    const revealed = cards.filter(number => number.revealed);
    if (revealed.length === cards.length){
      // Stop the idle timer tween
      idleTween.pause(0);
    }
  }

  function revealAll() {
    // Stop the idle timer tween
    idleTween.pause(0);
    // Get all the cards yet to be revealed
    const unrevealed = cards.filter(number => !number.revealed);
    // Return an array of tweens that calls reveal on each card in turn
    return unrevealed.map(number => Tween.delayedCall(0, number.reveal, null, number));
  }

  function reset() {
    cards.forEach(number => number.reset());
    //make sure idle is completely stopped
    idleTween.pause(0);
  }

  function checkMatch(winningNumber) {
    //HITGA-121 - HIT_IQA: 29000 error message pop up when clicking all numbers out in "MY NUMBERS" section manully first and more then 4 lucky number exists in it.
    //we need to return an array of matched cards, instead of looking for a single one
    const matchedCards = cards.filter(card => card.revealed && !card.matched && card.number === winningNumber);
    //now run through the array and mark each one off
    for (var i = 0; i < matchedCards.length; i++){
      matchedCards[i].match();
      matchedCards[i].presentWin();
      meterData.win += matchedCards[i].value;
      audio.playSequential('match');
    }
  }

  function winAllMatch(inNum){
    if (cards[inNum].number !== 'Z'){
      cards[inNum].winAllMatch();
      cards[inNum].presentWin();
      audio.playSequential('match');
    }    
  }

  msgBus.subscribe('Game.WinningNumber', checkMatch);
  msgBus.subscribe('Game.WinAllMatch', winAllMatch);
  msgBus.subscribe('Game.ResetIdle', inPos => resetIdle(inPos));

  return {
    init,
    populate,
    enable,
    revealAll,
    reset
  };
});
