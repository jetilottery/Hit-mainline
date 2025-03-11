define({
  /* 
   * Game configuration options
   * Anything defined here could be overwritten either based on the channel in
   * assetPacks/CHANNEL/layout/gameConfig.js or at an operator level by gameConfig.json in i18n
   */

  // The scale and bounciness of the number match tween
  matchAnimAmplitude: 4,
  matchAnimPeriod: 0.5,
  // Should the HowToPlay screen show when the game loads
  showHowToPlayOnLoad: true,
  // Use AutoPlay with toggle start/stop rather than single use RevealAll
  toggleAutoPlay: false,
  // Time between each number being revealed in autoplay. 0 for instant reveal.
  autoPlayWinningNumberInterval: 0,
  autoPlayPlayerNumberInterval: 0.2,
  // Time between the revealing the winning numbers section and the player numbers section
  autoPlayPlayerNumberDelay: 0.5,
  // Time between the revealing the player numbers section and the bonus item
  autoPlayBonusItemDelay: 0.5,
  // Time between idle animations
  playerNumberIdleInterval: 4,
  winningNumberIdleInterval: 7,
  bonusItemIdleInterval: 5,
  // Actual idle times will be random, +/- this value
  idleIntervalVariation: 0.25,
  // Time over which the music will fade out on entering the result screen
  resultMusicFadeOutDuration: 0,
  // Time between entering the result screen and the terminator audio starting
  resultTerminatorFadeInDelay: 0,
  // Time over which the terminator audio will fade in
  resultTerminatorFadeInDuration: 0.5,
  // Win All roll up durations
  winAllRollupLowerDurationInSeconds: 2,
  winAllRollupHigherDurationInSeconds: 2,
  // Should the Result screen show when ticket is complete
  showResultScreen: true,
  // Speed of bonus coin burst
  bonusCoinBurstAnimationSpeed: 0.5,
  // Speed of pig explode
  pigExplodeAnimationSpeed: 1,
  // Time between each bonus item being revealed in autoplay. 0 for instant reveal.
  bonusItemInterval: 0.5,
  // Switch to use local currency symbol, or auto-detect
  autoDetectBonusCurrencySymbol: true
});
