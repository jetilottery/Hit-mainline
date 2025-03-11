define((require) => {
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const app = require('skbJet/componentManchester/standardIW/app');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const winningNumbers = require('game/components/winningNumbers');
  const playerNumbers = require('game/components/playerNumbers');
  const bonusGame = require('game/components/bonusGame');

  function ticketAcquired() {
    winningNumbers.populate(scenarioData.scenario.winningNumbers);
    playerNumbers.populate(scenarioData.scenario.playerNumbers);
    bonusGame.populate(scenarioData.scenario.bonusString, scenarioData.scenario.bonusOutcome);
    
    if (!audio.isPlaying('music')) {
      audio.play('music', true);
    }

    // Pre-upload textures for the Player Numbers
    app.renderer.plugins.prepare.add(displayList.playerNumbers);

    // Start the intro animation once the textures are all uploaded
    app.renderer.plugins.prepare.upload();

    gameFlow.next('START_REVEAL');
  }

  gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});
