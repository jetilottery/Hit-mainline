define(function(require) {
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const numberState = require('game/state/numbers');
  const winningNumbers = require('game/components/winningNumbers');
  const playerNumbers = require('game/components/playerNumbers');
  const bonusCard = require('game/components/bonusCard');
  const winUpTo = require('game/components/winUpTo');
  const audio = require('skbJet/componentManchester/standardIW/audio');

  function gameReset() {
    numberState.reset();
    winningNumbers.reset();
    playerNumbers.reset();
    bonusCard.reset();
    winUpTo.reset();

    // Fade out the win/lose terminator in case it is still playing
    if (audio.isPlaying('winTerminator')) {
      audio.fadeOut('winTerminator', 1);
    }
    if (audio.isPlaying('loseTerminator')) {
      audio.fadeOut('loseTerminator', 1);
    }

    gameFlow.next('BUY_SCREEN');
  }

  gameFlow.handle(gameReset, 'GAME_RESET');
});
