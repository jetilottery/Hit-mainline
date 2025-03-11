define(function(require) {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');

  const winningNumbers = require('game/components/winningNumbers');
  const playerNumbers = require('game/components/playerNumbers');
  const bonusCard = require('game/components/bonusCard');
  const bonusGame = require('game/components/bonusGame');
  const winAll = require('game/components/winAll');
  const revealAll = require('game/revealAll');

  async function startReveal() {
    
    // Listen for autoplay activation which triggers the remaining cards to reveal automatically
    msgBus.subscribe('Game.AutoPlayStart', revealAll.start);

    // Listen for autoplay deactivation which cancels the revealAll timeline
    msgBus.subscribe('Game.AutoPlayStop', revealAll.stop);
  
    // Enable all of the winning numbers and player numbers, wait until they are all revealed
    await Promise.all([
      ...winningNumbers.enable(),
      ...playerNumbers.enable(),
    ]);

    // Wait for Win All to be complete, if applicable
    await winAll.complete();
    // Wait for the bonus card to show the correct number of symbols
    await bonusCard.bonusCardPopulated();
    // Wait for the bonus game to be completed
    await bonusGame.bonusGameComplete();

    // continue to the next state
    gameFlow.next('REVEAL_COMPLETE');
  }

  gameFlow.handle(startReveal, 'START_REVEAL');
});
