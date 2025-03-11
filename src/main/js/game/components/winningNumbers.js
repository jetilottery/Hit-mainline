define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const WinningNumber = require('game/components/WinningNumber');
  const numberState = require('game/state/numbers');

  require('com/gsap/TweenLite');
  const Tween = window.TweenLite;

  let cards;
  let numbers;

  let idleTween;

  function randomIdleDuration() {
    return (
      gameConfig.winningNumberIdleInterval -
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
      WinningNumber.fromContainer(displayList.winningNumber1),
      WinningNumber.fromContainer(displayList.winningNumber2),
      WinningNumber.fromContainer(displayList.winningNumber3),
      WinningNumber.fromContainer(displayList.winningNumber4),
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
      // Play the Winning Number reveal audio
      audio.playSequential('winningNumber');
      // Get the next Winning Number
      const nextNumber = numbers.shift();
      // Populate the card with the next Winning Number, ready to be uncovered
      card.populate(nextNumber);
      // Wait for the uncover animation (if animated)
      await card.uncover();
      //stop idle tween if we've revealed all of them
      stopIdleIfAllRevealed();
      msgBus.publish('Game.WinningNumber', nextNumber);
      // If the revealed number matches a revealed Player Number then mark the match
      if (numberState.player.includes(card.number)) {
        card.match();
        await card.presentWin();
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
    return unrevealed.map((number) => Tween.delayedCall(0, number.reveal, null, number));
  }

  function reset() {
    cards.forEach(number => number.reset());
    //make sure idle is completely stopped
    idleTween.pause(0);
  }

  function checkMatch(playerNumber) {
    const matchedCard = cards.find(card => card.number === playerNumber);
    if (matchedCard) {
      matchedCard.match();
      matchedCard.presentWin();
    }
  }

  msgBus.subscribe('Game.PlayerNumber', checkMatch);
  msgBus.subscribe('Game.ResetIdle', inPos => resetIdle(inPos));

  return {
    init,
    populate,
    enable,
    revealAll,
    reset
  };
});
