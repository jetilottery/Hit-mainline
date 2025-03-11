define(function module() {

  //IW1 is the only one we can have variable length scenarios
  //if the player reaches IW1 the bonus game simply ends
  //so we can have a few where the player reveals one loser (3)
  //a few where the player reveals two losers (6)
  //and a couple where the player reveals 6 wins straight (1)
  function generateIW1(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 9
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['W','W','L','W','W','W','W'];
        break;
      case 1:
        outVal = ['W','W','L','W','W','W','W'];
        break;
      case 2:
        outVal = ['W','W','W','W','L','W','W'];
        break;
      case 3:
        outVal = ['W','L','W','L','W','W','W','W'];
        break;
      case 4:
        outVal = ['L','W','W','L','W','W','W','W'];
        break;
      case 5:
        outVal = ['W','W','W','W','W','L','L','W'];
        break;
      case 6:
        outVal = ['L','W','W','W','W','L','W','W'];
        break;
      case 7:
        outVal = ['W','L','L','W','W','W','W','W'];
        break;
      case 8:
        outVal = ['W','W','W','L','W','L','W','W'];
        break;
      case 9:
        outVal = ['W','W','W','W','W','W'];
        break;
    }

    return outVal;
  }

  function generateIW2(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 9
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['W','W','W','W','L','L','W','L'];
        break;
      case 1:
        outVal = ['L','W','W','L','W','W','W','L'];
        break;
      case 2:
        outVal = ['W','W','W','L','L','W','W','L'];
        break;
      case 3:
        outVal = ['W','W','W','W','L','W','L','L'];
        break;
      case 4:
        outVal = ['W','L','W','W','W','W','L','L'];
        break;
      case 5:
        outVal = ['W','W','L','W','W','W','L','L'];
        break;
      case 6:
        outVal = ['L','W','W','W','L','W','W','L'];
        break;
      case 7:
        outVal = ['W','W','L','L','W','W','W','L'];
        break;
      case 8:
        outVal = ['L','L','W','W','W','W','W','L'];
        break;
      case 9:
        outVal = ['W','W','W','L','W','W','L','L'];
        break;
    }

    return outVal;
  }

  function generateIW3(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 13
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['W','L','L','W','W','W','L'];
        break;
      case 1:
        outVal = ['L','W','W','W','L','W','L'];
        break;
      case 2:
        outVal = ['W','W','W','L','L','W','L'];
        break;
      case 3:
        outVal = ['W','L','W','W','L','W','L'];
        break;
      case 4:
        outVal = ['W','W','W','L','W','L','L'];
        break;
      case 5:
        outVal = ['W','W','L','L','W','W','L'];
        break;
      case 6:
        outVal = ['W','L','W','L','W','W','L'];
        break;
      case 7:
        outVal = ['W','W','L','W','W','L','L'];
        break;
      case 8:
        outVal = ['W','W','L','W','L','W','L'];
        break;
      case 9:
        outVal = ['L','L','W','W','W','W','L'];
        break;
    }

    return outVal;
  }

  function generateIW4(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 9
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['W','L','W','L','W','L'];
        break;
      case 1:
        outVal = ['L','W','L','W','W','L'];
        break;
      case 2:
        outVal = ['L','W','W','W','L','L'];
        break;
      case 3:
        outVal = ['L','W','W','L','W','L'];
        break;
      case 4:
        outVal = ['W','W','W','L','L','L'];
        break;
      case 5:
        outVal = ['W','L','L','W','W','L'];
        break;
      case 6:
        outVal = ['L','L','W','W','W','L'];
        break;
      case 7:
        outVal = ['W','W','L','W','L','L'];
        break;
      case 8:
        outVal = ['W','W','L','L','W','L'];
        break;
      case 9:
        outVal = ['W','L','W','W','L','L'];
        break;
    }

    return outVal;
  }

  function generateLoser(winningTotal){
    var valueMod = winningTotal % 7; //this returns a value between 0 and 6
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['L','W','L','L'];
        break;
      case 1:
        outVal = ['L','L','W','L'];
        break;
      case 2:
        outVal = ['W','L','W','L','L'];
        break;
      case 3:
        outVal = ['L','W','W','L','L'];
        break;
      case 4:
        outVal = ['L','W','L','W','L'];
        break;
      case 5:
        outVal = ['W','L','L','W','L'];
        break;
      case 6:
        outVal = ['L','L','W','W','L'];
        break;
    }

    return outVal;
  }

  function generateRevealAllOrder(inSeed, inRevealed){
    var valueMod = inSeed % 10; //value between 0 and 9
    var outVal;
    switch (valueMod){
      case 0:
        outVal = [12,4,8,2,9,10,11,5,3,6,7,1];
        break;
      case 1:
        outVal = [11,4,7,12,3,6,2,5,9,10,8,1];
        break;
      case 2:
        outVal = [5,10,11,4,9,12,6,3,1,2,7,8];
        break;
      case 3:
        outVal = [9,4,5,7,11,12,2,1,8,6,10,3];
        break;
      case 4:
        outVal = [7,3,5,12,11,8,9,4,10,2,6,1];
        break;
      case 5:
        outVal = [10,6,12,1,9,11,5,2,8,7,4,3];
        break;
      case 6:
        outVal = [2,3,9,5,8,11,7,10,12,1,6,4];
        break;
      case 7:
        outVal = [5,11,9,8,3,2,7,12,1,4,6,10];
        break;
      case 8:
        outVal = [1,5,10,7,3,8,4,12,6,11,2,9];
        break;
      case 9:
        outVal = [6,10,4,7,5,9,1,2,3,12,8,11];
        break;
    }

    //now then, step through and remove ones that have already been revealed
    //this is so that if the player hits Reveal All while in this stage, we can continue as normal
    var removedArr = [];
    var i;
    for (i = 0; i < outVal.length; i++){
      if (inRevealed.indexOf(outVal[i]) < 0){
        removedArr.push(outVal[i]);
      }
    }

    //HITGA-119 - HITGA_COM/WLA: game stuck in bonus page
    //now unshift some fake turns in, so we can continue to use the same counters/variables in the bonus game
    for (i = 0; i < inRevealed.length; i++){
      removedArr.unshift(-1);
    }

    return removedArr;
  }

  return {
    generateLoser:generateLoser,
    generateIW4:generateIW4,
    generateIW3:generateIW3,
    generateIW2:generateIW2,
    generateIW1:generateIW1,
    generateRevealAllOrder:generateRevealAllOrder
  };
});
