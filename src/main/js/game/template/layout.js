define({
  _BASE_APP: {
    children: ['background', 'logo', 'winUpTo', 'winningNumbers', 'bonusCard', 'playerNumbers'],
  },

  /*
   * BACKGROUND
   */
  background: {
    type: 'sprite',
    children: ['selectionBackgrounds'],
    landscape: {
      texture: 'landscape_background',
    },
    portrait: {
      texture: 'portrait_background',
    },
  },

  selectionBackgrounds: {
    type: 'sprite',
    landscape: {
      texture: 'selectionBackgrounds',
    },
    portrait: {
      texture: 'selectionBackgroundsPortrait',
    },
  },

  /*
   * LOGO
   */
  logo: {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      x: 328,
      y: 132,
      texture: 'landscape_gameLogo',
    },
    portrait: {
      x: 405,
      y: 99,
      texture: 'portrait_gameLogo',
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
    type: 'sprite',
    children: ['bonusWin', 'bonusNoWin', 'bonusCover'],
    texture: 'bonusBackground',
    anchor: 0.5,
    landscape: { x: 320, y: 587 },
    portrait: { x: 405, y: 496 },
  },
  bonusWin: {
    type: 'container',
    children: ['bonusWinText'],
  },
  bonusWinText: {
    type: 'text',
    style: 'bonusWin',
    anchor: 0.5,
    maxWidth: 320,
  },
  bonusNoWin: {
    type: 'text',
    string: 'bonusNoWin',
    style: 'bonusNoWin',
    anchor: 0.5,
    maxWidth: 320,
  },
  bonusCover: {
    type: 'animatedSprite',
    children: ['bonusLabel'],
    textures: 'bonusCover',
    anchor: 0.5,
  },
  bonusLabel: {
    type: 'text',
    string: 'bonus',
    style: 'bonusLabel',
    anchor: 0.5,
    maxWidth: 320,
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
   * How To Play
   */
  howToPlayPages: {
    type: 'container',
    children: ['howToPlayPage1'],
  },
  howToPlayPage1: {
    type: 'text',
    string: 'page1',
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: { x: 720, y: 415, wordWrapWidth: 1100 },
    portrait: { x: 405, y: 550, wordWrapWidth: 560 },
  },
});
