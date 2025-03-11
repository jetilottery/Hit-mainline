define({
  _BASE_APP: {
    children: ['baseGameContainer', 'bonusGameContainer'],
  },

  baseGameContainer: {
    type: 'container',
    children: ['background', 'logo', 'winUpTo', 'winningNumbers', 'bonusCard', 'playerNumbers', 'winAllContainer'],
  },

  /*
   * BACKGROUND
   */
  background: {
    type: 'sprite',
    children: ['selectionBackgrounds']
  },

  selectionBackgrounds: {
    type: 'sprite'
  },

  /*
   * LOGO
   */
  logo: {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      x: 328,
      y: 132
    },
    portrait: {
      x: 405,
      y: 99
    },
  },

  /*
   * WIN UP TO
   */
  winUpTo: {
    type: 'container',
    children: ['winUpToIn', 'winUpToOut'],
    landscape: { x: 327, y: 256 },
    portrait: { x: 405, y: 209 },
  },
  winUpToIn: {
    type: 'container',
    children: ['winUpToInText'],
  },
  winUpToInText: {
    type: 'text',
    style: 'winUpTo',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 400,
  },
  winUpToOut: {
    type: 'container',
    children: ['winUpToOutText'],
  },
  winUpToOutText: {
    type: 'text',
    style: 'winUpTo',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 400,
  },

  /*
   * WINNING NUMBERS
   */
  winningNumbers: {
    type: 'container',
    children: [
      'winningNumbersTitle',
      'winningNumber1',
      'winningNumber2',
      'winningNumber3',
      'winningNumber4',
    ],
    landscape: { x: 16, y: 297 },
    portrait: { x: 106, y: 243 },
  },
  winningNumbersTitle: {
    type: 'text',
    string: 'luckyNumbers',
    style: 'winningNumbersTitle',
    anchor: 0.5,
    maxWidth: 350,
    landscape: { x: 311, y: 32 },
    portrait: { x: 299, y: 27 },
  },
  winningNumber1: {
    type: 'container',
    landscape: { x: 92, y: 133, scale: 1 },
    portrait: { x: 89, y: 120, scale: 0.914 },
  },
  winningNumber2: {
    type: 'container',
    landscape: { x: 238, y: 133, scale: 1 },
    portrait: { x: 229, y: 120, scale: 0.914 },
  },
  winningNumber3: {
    type: 'container',
    landscape: { x: 384, y: 133, scale: 1 },
    portrait: { x: 369, y: 120, scale: 0.914 },
  },
  winningNumber4: {
    type: 'container',
    landscape: { x: 530, y: 133, scale: 1 },
    portrait: { x: 509, y: 120, scale: 0.914 },
  },


  /*
   * PLAYER NUMBERS
   */
  bonusCard: {
    type: 'container',
    children: ['bonusSparkles','bonusCardBG','bonusLabel','bonusHammer1','bonusHammer2','bonusHammer3','bonusHammer4','bonusHammer5'],
    landscape: { x: 320, y: 587 },
    portrait: { x: 405, y: 496 },
  },
  bonusSparkles: {
    type: 'animatedSprite',
    anchor: 0.5,
  },
  bonusCardBG : {
    type: 'sprite',
    anchor: 0.5,
    texture: 'bonusBackground'
  },
  bonusLabel: {
    type: 'text',
    style: 'bonusLabel',
    string: 'bonus',
    anchor: 0.5,
    maxWidth: 320,
    landscape: { x: 0, y: -25 },
    portrait: { x: 0, y: -25 },
  },
  bonusHammer1: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { x: -111, y: 19 },
    portrait: { x: -111, y: 19 },
  },
  bonusHammer2: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { x: -52, y: 19 },
    portrait: { x: -52, y: 19 },
  },
  bonusHammer3: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { x: 7, y: 19 },
    portrait: { x: 7, y: 19 },
  },
  bonusHammer4: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { x: 65, y: 19 },
    portrait: { x: 65, y: 19 },
  },
  bonusHammer5: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { x: 124, y: 19 },
    portrait: { x: 124, y: 19 },
  },

  /*
   * PLAYER NUMBERS
   */
  playerNumbers: {
    type: 'container',
    children: [
      'playerNumbersTitle',
      'playerNumber1',
      'playerNumber2',
      'playerNumber3',
      'playerNumber4',
      'playerNumber5',
      'playerNumber6',
      'playerNumber7',
      'playerNumber8',
      'playerNumber9',
      'playerNumber10',
      'playerNumber11',
      'playerNumber12',
      'playerNumber13',
      'playerNumber14',
      'playerNumber15',
    ],
    landscape: { x: 656, y: 119 },
    portrait: { x: 36, y: 548 },
  },
  playerNumbersTitle: {
    type: 'text',
    string: 'yourNumbers',
    style: 'playerNumbersTitle',
    anchor: 0.5,
    maxWidth: 750,
    landscape: { x: 384, y: 36 },
    portrait: { x: 369, y: 32 },
  },
  playerNumber1: {
    type: 'container',
    landscape: { x: 92, y: 133, scale: 1 },
    portrait: { x: 89, y: 120, scale: 0.914 },
  },
  playerNumber2: {
    type: 'container',
    landscape: { x: 238, y: 133, scale: 1 },
    portrait: { x: 229, y: 120, scale: 0.914 },
  },
  playerNumber3: {
    type: 'container',
    landscape: { x: 384, y: 133, scale: 1 },
    portrait: { x: 369, y: 120, scale: 0.914 },
  },
  playerNumber4: {
    type: 'container',
    landscape: { x: 530, y: 133, scale: 1 },
    portrait: { x: 509, y: 120, scale: 0.914 },
  },
  playerNumber5: {
    type: 'container',
    landscape: { x: 676, y: 133, scale: 1 },
    portrait: { x: 649, y: 120, scale: 0.914 },
  },
  playerNumber6: {
    type: 'container',
    landscape: { x: 92, y: 279, scale: 1 },
    portrait: { x: 89, y: 254, scale: 0.914 },
  },
  playerNumber7: {
    type: 'container',
    landscape: { x: 238, y: 279, scale: 1 },
    portrait: { x: 229, y: 254, scale: 0.914 },
  },
  playerNumber8: {
    type: 'container',
    landscape: { x: 384, y: 279, scale: 1 },
    portrait: { x: 369, y: 254, scale: 0.914 },
  },
  playerNumber9: {
    type: 'container',
    landscape: { x: 530, y: 279, scale: 1 },
    portrait: { x: 509, y: 254, scale: 0.914 },
  },
  playerNumber10: {
    type: 'container',
    landscape: { x: 676, y: 279, scale: 1 },
    portrait: { x: 649, y: 254, scale: 0.914 },
  },
  playerNumber11: {
    type: 'container',
    landscape: { x: 92, y: 425, scale: 1 },
    portrait: { x: 89, y: 388, scale: 0.914 },
  },
  playerNumber12: {
    type: 'container',
    landscape: { x: 238, y: 425, scale: 1 },
    portrait: { x: 229, y: 388, scale: 0.914 },
  },
  playerNumber13: {
    type: 'container',
    landscape: { x: 384, y: 425, scale: 1 },
    portrait: { x: 369, y: 388, scale: 0.914 },
  },
  playerNumber14: {
    type: 'container',
    landscape: { x: 530, y: 425, scale: 1 },
    portrait: { x: 509, y: 388, scale: 0.914 },
  },
  playerNumber15: {
    type: 'container',
    landscape: { x: 676, y: 425, scale: 1 },
    portrait: { x: 649, y: 388, scale: 0.914 },
  },

  /*
   * WIN ALL CONTAINER
   */
  winAllContainer: {
    type: 'container',
    children: ['winAllBackground','winAllLabel','winAllValue'],
    landscape: { x: 749.5, y: 364},
    portrait: { x: 400.5, y: 679},
  },
  winAllBackground: {
    type: 'sprite',
    texture: 'largeWinAll',
    anchor: 0.5,
  },
  winAllLabel: {
    type: 'text',
    string: 'winAll',
    style: 'winAll',
    anchor: 0.5,
    align: 'center',
    y: -75
  },
  winAllValue: {
    type: 'text',
    string: '',
    style: 'winAllValue',
    anchor: 0.5,
    align: 'center',
    y: 50
  },

  /*
   * How To Play
   */
  howToPlayPages: {
    type: 'container',
    children: ['howToPlayPage1Container','howToPlayPage2Container']
  },
  howToPlayPage1Container : {
    type: 'container'
  },
  howToPlayPage2Container : {
    type: 'container'
  },
  /*howToPlayPage1: {
    type: 'text',    
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: { 
      x: 720, 
      y: 415, 
      wordWrapWidth: 1100,
      string: 'page1Landscape',
    },
    portrait: { 
      x: 405, 
      y: 550, 
      wordWrapWidth: 560,
      string: 'page1Portrait',
    },
  },
  howToPlayPage12X: {
    type: 'sprite',
    texture: 'Symbol_doubler',
    anchor: 0.5,
    landscape: { x: 690, y: 415},
    portrait: { x: 450, y: 530},
  },
  howToPlayPage1WinAllContainer: {
    type: 'container',
    children: ['howToPlayPage1WinAll','howToPlayPage1WinAllText'],
    landscape: { x: 605, y: 510},
    portrait: { x: 290, y: 698},
  },
  howToPlayPage1WinAll: {
    type: 'sprite',
    texture: 'Symbol_winAll',
    anchor: 0.5
  },
  howToPlayPage1WinAllText: {
    type: 'text',    
    style: 'winAllIcon',
    string: 'winAllIcon',
    fontSize: 24,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    x: 3,
    y: 10
  },
  howToPlayPage2: {
    type: 'text',    
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: { 
      x: 720, 
      y: 415, 
      wordWrapWidth: 1100,
      string: 'page2Landscape'
    },
    portrait: { 
      x: 405, 
      y: 550, 
      wordWrapWidth: 560,
      string: 'page2Portrait'
    },
  },
  howToPlayPage2BonusContainer: {
    type: 'container',
    children: ['page2BonusBG','page2BonusLabel','page2BonusHammer1','page2BonusHammer2','page2BonusHammer3','page2BonusHammer4','page2BonusHammer5'],
    landscape: { x: 550, y: 310},
    portrait: { x: 400, y: 500},
  },
  page2BonusBG: {
    type: 'sprite',
    texture: 'bonusBackground_500',
    anchor: 0.5,
    landscape: { x: 0, y: 0},
    portrait: { x: 0, y: 0},
  },
  page2BonusHammer1: {
    type: 'sprite',
    texture: 'hammerCollected',
    anchor: 0.5,
    landscape: { x: -112, y: 18 },
    portrait: { x: -112, y: 18 },
  },
  page2BonusHammer2: {
    type: 'sprite',
    texture: 'hammerCollected',
    anchor: 0.5,
    landscape: { x: -53, y: 18 },
    portrait: { x: -53, y: 18 },
  },
  page2BonusHammer3: {
    type: 'sprite',
    texture: 'hammerCollected',
    anchor: 0.5,
    landscape: { x: 6, y: 18 },
    portrait: { x: 6, y: 18 },
  },
  page2BonusHammer4: {
    type: 'sprite',
    texture: 'hammerCollected',
    anchor: 0.5,
    landscape: { x: 64, y: 18 },
    portrait: { x: 64, y: 18 },
  },
  page2BonusHammer5: {
    type: 'sprite',
    texture: 'hammerCollected',
    anchor: 0.5,
    landscape: { x: 123, y: 18 },
    portrait: { x: 123, y: 18 },
  },
  page2BonusLabel: {
    type: 'text',
    style: 'bonusLabel',
    string: 'bonus',
    anchor: 0.5,
    maxWidth: 320,
    landscape: { x: 0, y: -22 },
    portrait: { x: 0, y: -22 },
  },*/
  howToPlayPrevious: {
    type: 'button',
    landscape: { x: 56, y: 418 },
    portrait: { x: 53, y: 568 },
    textures: {
      enabled: 'tutorialLeftButtonEnabled',
      disabled: 'tutorialLeftButtonDisabled',
      over: 'tutorialLeftButtonOver',
      pressed: 'tutorialLeftButtonPressed',
    },
  },
  howToPlayNext: {
    type: 'button',
    landscape: { x: 1384, y: 418 },
    portrait: { x: 757, y: 568 },
    textures: {
      enabled: 'tutorialRightButtonEnabled',
      disabled: 'tutorialRightButtonDisabled',
      over: 'tutorialRightButtonOver',
      pressed: 'tutorialRightButtonPressed',
    },
  },
  howToPlayTitle: {
    type: 'container'
  },

  /*
   * BONUS GAME CONTAINER
   */
  bonusGameContainer: {
    type: 'container',
    children: ['bonusGameBackground','bonusPigIndicators','bonusPrizeTable','playerSelectedPigs','bonusPrizeField','selectorAnim','prizeParticles','coinShower']
  },
  bonusGameBackground: {
    type: 'sprite',
    landscape: {
      texture: 'minigameBackdropLandscape',
    },
    portrait: {
      texture: 'minigameBackdropPortrait',
    },
  },
  /*
   * BONUS PIG INDICATORS
   */
  bonusPigIndicators: {
    type: 'container',
    children: [
      'pigIndicator1',
      'pigIndicator2',
      'pigIndicator3'
    ]
  },
  pigIndicator1: {
    type: 'container',
    landscape: { x: 152.5, y: 646, scale: 1 },
    portrait: { x: 691, y: 190, scale: 0.805 },
  },
  pigIndicator2: {
    type: 'container',
    landscape: { x: 263.5, y: 646, scale: 1 },
    portrait: { x: 691, y: 291, scale: 0.805 },
  },
  pigIndicator3: {
    type: 'container',
    landscape: { x: 373.5, y: 646, scale: 1 },
    portrait: { x: 691, y: 392, scale: 0.805 },
  },
  /*
   * BONUS PRIZE TABLE
   */
  bonusPrizeTable: {
    type: 'container',
    children: [
      'prizeLevel1',
      'prizeLevel2',
      'prizeLevel3',
      'prizeLevel4',
      'prizeLevel5',
      'prizeLevel6'
    ],
  },
  prizeLevel1: {
    type: 'container',
    landscape: { x: 254.3, y: 189.5, scale: 0.625 },
    portrait: { x: 364.5, y: 121, scale: 0.628 },
  },
  prizeLevel2: {
    type: 'container',
    landscape: { x: 254.3, y: 272.5, scale: 0.625 },
    portrait: { x: 364.5, y: 199, scale: 0.628 },
  },
  prizeLevel3: {
    type: 'container',
    landscape: { x: 254.3, y: 355.5, scale: 0.625 },
    portrait: { x: 364.5, y: 276, scale: 0.628 },
  },
  prizeLevel4: {
    type: 'container',
    landscape: { x: 254.3, y: 438.5, scale: 0.625 },
    portrait: { x: 364.5, y: 354, scale: 0.628 },
  },
  prizeLevel5: {
    type: 'container',
    landscape: { x: 264.3, y: 502.5, scale: 0.683 },
    portrait: { x: 374.5, y: 411.5, scale: 0.683 },
  },
  prizeLevel6: {
    type: 'container',
    landscape: { x: 264.3, y: 546.5, scale: 0.683 },
    portrait: { x: 374.5, y: 450, scale: 0.683 },
  },
  selectorAnim: {
    type: 'animatedSprite',
    anchor: 0.5,
    landscape: {x: 256},
    portrait: {x: 355}
  },
  prizeParticles: {
    type: 'container',
    landscape: {x: 260},
    portrait: {x: 370}
  },
  coinShower: {
    type: 'animatedSprite',
    anchor: 0.5,
    landscape: {x: 290},
    portrait: {x: 400}
  },

  /*
   * PLAYER SELECTED PIGS
   */
  playerSelectedPigs: {
    type: 'container',
    children: [
      'playerPig1',
      'playerPig2',
      'playerPig3',
      'playerPig4',
      'playerPig5',
      'playerPig6',
      'playerPig7',
      'playerPig8',
      'playerPig9',
      'playerPig10',
      'playerPig11',
      'playerPig12'
    ]
  },
  playerPig1: {
    type: 'container',
    landscape: { x: 664, y: 172, scale: 1 },
    portrait: { x: 110, y: 584, scale: 1 },
  },
  playerPig2: {
    type: 'container',
    landscape: { x: 860, y: 172, scale: 1 },
    portrait: { x: 305, y: 584, scale: 1 },
  },
  playerPig3: {
    type: 'container',
    landscape: { x: 1055, y: 172, scale: 1 },
    portrait: { x: 501, y: 584, scale: 1 },
  },
  playerPig4: {
    type: 'container',
    landscape: { x: 1253, y: 172, scale: 1 },
    portrait: { x: 700, y: 584, scale: 1 },
  },
  playerPig5: {
    type: 'container',
    landscape: { x: 664, y: 342, scale: 1 },
    portrait: { x: 109, y: 754, scale: 1 },
  },
  playerPig6: {
    type: 'container',
    landscape: { x: 860, y: 342, scale: 1 },
    portrait: { x: 305, y: 754, scale: 1 },
  },
  playerPig7: {
    type: 'container',
    landscape: { x: 1056, y: 342, scale: 1 },
    portrait: { x: 501, y: 754, scale: 1 },
  },
  playerPig8: {
    type: 'container',
    landscape: { x: 1252, y: 342, scale: 1 },
    portrait: { x: 697, y: 754, scale: 1 },
  },
  playerPig9: {
    type: 'container',
    landscape: { x: 665, y: 513, scale: 1 },
    portrait: { x: 111, y: 925, scale: 1 },
  },
  playerPig10: {
    type: 'container',
    landscape: { x: 860, y: 513, scale: 1 },
    portrait: { x: 305, y: 925, scale: 1 },
  },
  playerPig11: {
    type: 'container',
    landscape: { x: 1056, y: 513, scale: 1 },
    portrait: { x: 501, y: 925, scale: 1 },
  },
  playerPig12: {
    type: 'container',
    landscape: { x: 1258, y: 513, scale: 1 },
    portrait: { x: 695, y: 925, scale: 1 },
  },
  bonusPrizeField: {
    type: 'container',
    children: ['bonusPrizeBG','bonusPrizeText']
  },
  bonusPrizeBG : {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      texture: 'PrizeValueBorderLandscape',
      x: 267.5,
      y: 122.4
    },
    portrait: {
      texture: 'PrizeValueBorderPortrait',
      x: 135.5,
      y: 153
    },
  },
  bonusPrizeText: {
    type: 'text',
    style: 'bonusPrize',    
    anchor: 0.5,
    align: 'center',
    landscape: {
      x: 267.5,
      y: 118,
      maxWidth: 340
    },
    portrait: {
      x: 135.5,
      y: 150,
      maxWidth: 180
    }
  },

  /*
   * WIN PLAQUE CLOSE BUTTON
   */
  winPlaqueCloseButton: {
    type: 'button',
    landscape: { y: 205 },
    portrait: { y: 325 },
    string: 'button_ok',
    style: {
      enabled: 'resultPlaqueOKButtonEnabled',
      over: 'resultPlaqueOKButtonOver',
      pressed: 'resultPlaqueOKButtonPressed',
    },
    textures: {
      enabled: 'endOfGameMessageCloseButtonEnabled',
      over: 'endOfGameMessageCloseButtonOver',
      pressed: 'endOfGameMessageCloseButtonPressed',
    },
  }
});