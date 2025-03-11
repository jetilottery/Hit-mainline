define(require => {
  const Timeline = require('com/gsap/TimelineLite');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const bonusGame = require('game/components/bonusGame');
  const winningNumbers = require('game/components/winningNumbers');
  const playerNumbers = require('game/components/playerNumbers');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

  let revealAllTimeline;
  let currentGameState = 'BASE_GAME';

  function start() {
    if (currentGameState !== 'BASE_GAME'){
      //we must be in the bonus game
      bonusGame.revealAll();
      return;
    }

    const revealWinning = winningNumbers.revealAll();
    const revealPlayer = playerNumbers.revealAll();

    revealAllTimeline = new Timeline();

    // disable all interaction at the parent container level
    displayList.playerNumbers.interactiveChildren = false;
    displayList.winningNumbers.interactiveChildren = false;

    // Start with the winning numbers
    revealAllTimeline.add(
      new Timeline({ tweens: revealWinning, stagger: gameConfig.autoPlayWinningNumberInterval })
    );

    // Then the player numbers, with a delay between the winning and player numbers
    revealAllTimeline.add(
      new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
      revealWinning.length > 0 && revealPlayer.length > 0
        ? `+=${gameConfig.autoPlayPlayerNumberDelay}`
        : '+=0'
    );

    return revealAllTimeline;
  }

  function stop() {
    // re-enable all interaction at the parent container level
    displayList.playerNumbers.interactiveChildren = true;
    displayList.winningNumbers.interactiveChildren = true;
    // kill the revealAll timeline if active
    if (revealAllTimeline) {
      revealAllTimeline.kill();
      revealAllTimeline = undefined;
    }
  }

  msgBus.subscribe('winAllActivated', function(active){
    if (active && !autoPlay._enabled){
      displayList.autoPlayStartButton.enabled = false;
      displayList.helpButton.enabled = false;
      autoPlay._enabled = true;
      start();
    }
  });

  msgBus.subscribe('gameStateChanged', function(data){
    currentGameState = data;
  });

  return {
    start,
    stop,
  };
});
