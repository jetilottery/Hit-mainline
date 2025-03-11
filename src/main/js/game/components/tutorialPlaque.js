define(require => {
  const PIXI = require('com/pixijs/pixi');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const fontColors = require('skbJet/componentManchester/standardIW/fontColors');
  const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
  const orientation = require('skbJet/componentManchester/standardIW/orientation');
  const rollupUtils = require('game/components/utils/rollupUtils');

  let page1Container;
  let page2Container;
  let howToPlayTitleContainer;
  let howToPlayTitle;
  let widthOfButtons = 72;
  let isGenerated = false;
  let spacingBuffer = 2;
  let page1Landscape;
  let page2Landscape;
  let page1Portrait;
  let page2Portrait;

  let positioning = {
    portrait:{
      containerWidth: 810,
      title:{
        x:405,
        y:178,
        wordWrap:false,
        wordWrapWidth:642
      },
      page1:{
        line1:{
          x:405,
          y:400,
          wordWrap:true,
          wordWrapWidth:642
        },
        line2:{
          x:405,
          y:550,
          wordWrap:true,
          wordWrapWidth:642
        },
        line3:{
          x:405,
          y:700,
          wordWrap:true,
          wordWrapWidth:642
        }
      },
      page2:{
        line1:{
          x:405,
          y:400,
          wordWrap:true,
          wordWrapWidth:642
        },
        line2:{
          x:405,
          y:700,
          wordWrap:true,
          wordWrapWidth:642
        }
      }      
    },
    landscape:{
      containerWidth: 1440,
      title:{
        x:720,
        y:170,
        wordWrap:false,
        wordWrapWidth:1264
      },
      page1:{
        line1:{
          x:720,
          y:270,
          wordWrap:true,
          wordWrapWidth:1264
        },
        line2:{
          x:720,
          y:395,
          wordWrap:true,
          wordWrapWidth:1264
        },
        line3:{
          x:720,
          y:535,
          wordWrap:true,
          wordWrapWidth:1264
        }
      },
      page2:{
        line1:{
          x:720,
          y:303,
          wordWrap:true,
          wordWrapWidth:1264
        },
        line2:{
          x:720,
          y:478,
          wordWrap:true,
          wordWrapWidth:1264
        }
      }      
    }
  }; 

  function init() {
    page1Container = displayList.howToPlayPage1Container;
    page2Container = displayList.howToPlayPage2Container;
    howToPlayTitleContainer = displayList.howToPlayTitle;

    //we'll start with the title, this is straightforward enough
    createTitle();
    //generate bonus texture
    createBonusTexture();
    //generate both orientations
    generatePortrait();
    generateLandscape();

    page1Landscape = rollupUtils.spriteFromTexture('tutorialPage1Landscape');
    page2Landscape = rollupUtils.spriteFromTexture('tutorialPage2Landscape');
    page1Landscape.anchor.set(0.5);
    page2Landscape.anchor.set(0.5);

    page1Portrait = rollupUtils.spriteFromTexture('tutorialPage1Portrait');
    page2Portrait = rollupUtils.spriteFromTexture('tutorialPage2Portrait');
    page1Portrait.anchor.set(0.5);
    page2Portrait.anchor.set(0.5);

    page1Landscape.x = page2Landscape.x = 720;
    page1Landscape.y = page2Landscape.y = 405;

    page1Portrait.x = page2Portrait.x = 405;
    page1Portrait.y = page2Portrait.y = 550;

    page1Container.addChild(page1Landscape, page1Portrait);
    page2Container.addChild(page2Landscape, page2Portrait);

    //hide all
    page1Landscape.visible = page2Landscape.visible = false;
    page1Landscape.visible = page2Landscape.visible = false;
    page1Portrait.visible = page2Portrait.visible = false;
    page1Portrait.visible = page2Portrait.visible = false;

    //generated
    isGenerated = true;

    //show the current one
    show(orientation.get());
  }

  function createTitle(){
    howToPlayTitle = new PIXI.Text(resources.i18n.Game.howToPlay.title,{
      fontFamily: 'oswald',
      fontSize: 40,
      fontWeight: 'bold',
      fill: fontColors('fontColourTutorialTitle'),
      wordWrap: positioning[orientation.get()].title.wordWrap,
      wordWrapWidth: positioning[orientation.get()].title.wordWrapWidth
    });
    howToPlayTitle.anchor.set(0.5);
    howToPlayTitleContainer.addChild(howToPlayTitle);

    howToPlayTitle.x = positioning[orientation.get()].title.x;
    howToPlayTitle.y = positioning[orientation.get()].title.y;
  }

  function show(inOrientation){
    if (!isGenerated){return;}
    page1Landscape.visible = page2Landscape.visible = false;
    page1Landscape.visible = page2Landscape.visible = false;
    page1Portrait.visible = page2Portrait.visible = false;
    page1Portrait.visible = page2Portrait.visible = false;
    switch (inOrientation){
      case 'landscape':
        page1Landscape.visible = page2Landscape.visible = true;
        page1Landscape.visible = page2Landscape.visible = true;
        break;
      case 'portrait':
        page1Portrait.visible = page2Portrait.visible = true;
        page1Portrait.visible = page2Portrait.visible = true;
        break;
    }

    //reposition the title
    howToPlayTitle.x = positioning[inOrientation].title.x;
    howToPlayTitle.y = positioning[inOrientation].title.y;
    //update style
    howToPlayTitle.style.wordWrap = positioning[inOrientation].title.wordWrap;
    howToPlayTitle.style.wordWrapWidth = positioning[inOrientation].title.wordWrapWidth;
  }

  function createBonusTexture(){
    var bonusContainer = new PIXI.Container();
    //bonus sprite
    var bonusSprite = rollupUtils.spriteFromTexture('bonusBackground_500');
    bonusSprite.anchor.set(0.5);
    //add 5 hammers
    var hammer1 = rollupUtils.spriteFromTexture('hammerCollected');
    var hammer2 = rollupUtils.spriteFromTexture('hammerCollected');
    var hammer3 = rollupUtils.spriteFromTexture('hammerCollected');
    var hammer4 = rollupUtils.spriteFromTexture('hammerCollected');
    var hammer5 = rollupUtils.spriteFromTexture('hammerCollected');
    hammer1.anchor.set(0.5);
    hammer2.anchor.set(0.5);
    hammer3.anchor.set(0.5);
    hammer4.anchor.set(0.5);
    hammer5.anchor.set(0.5);
    hammer1.y = hammer2.y = hammer3.y = hammer4.y = hammer5.y = 18;
    hammer1.x = -112;
    hammer2.x = -53;
    hammer3.x = 6;
    hammer4.x = 64;
    hammer5.x = 123;
    //and the label, why not?
    var page2BonusLabel = new PIXI.Text(resources.i18n.Game.bonus, {
      fontFamily: 'oswald',
      fontSize: 32,
      fontWeight: 'bold',
      fill: fontColors('fontColourLuckyNumberTitle')
    });
    page2BonusLabel.anchor.set(0.5);
    page2BonusLabel.x = 0;
    page2BonusLabel.y = -22;
    //add to container
    bonusContainer.addChild(bonusSprite, hammer1, hammer2, hammer3, hammer4, hammer5, page2BonusLabel);
    //create sprite from container
    rollupUtils.createTextureFromContainer(bonusContainer, 'tutorialBonus');
  }

  function generateLandscape(){
    //we need to generate both pages of the tutorial plaque
    //then create sprites from the container - this means we can have four sprites (both pages, both orientations)
    //so we can simply show/hide the correct sprites instead of messing around repositioning everything on each game resize
    //or orientation change
    //so there are many things we need to set up here
    //now then, let's pass all the strings and splice them where the image placeholders are
    var tempArr1 = [
      resources.i18n.Game.howToPlay.page1.landscape.text1,
      resources.i18n.Game.howToPlay.page1.landscape.text2,
      resources.i18n.Game.howToPlay.page1.landscape.text3
    ];
    var tempArr2 = [
      resources.i18n.Game.howToPlay.page2.landscape.text1,
      resources.i18n.Game.howToPlay.page2.landscape.text2
    ];
    var page1Lines = getStrings(tempArr1);
    var page2Lines = getStrings(tempArr2);

    //page 1
    processPage1(page1Lines, 'landscape');
    processPage2(page2Lines, 'landscape');
  }

  function processPage1(inArr, inOrientation){
    var i, j;
    var pageObjects = [];
    var pageContainers = [];
    var targetContainer = new PIXI.Container();
    for (i = 0; i < inArr.length; i++){
      pageObjects[i] = [];
      pageContainers[i] = new PIXI.Container();
      for (j = 0; j < inArr[i].length; j++){
        if (inArr[i][j] !== '{0}'){
          //not an image
          pageObjects[i][j] = new PIXI.Text(inArr[i][j],{
            fontFamily: 'oswald',
            fontSize: 30,
            fontWeight: 'bolder',
            align: 'center',
            fill: fontColors('fontColourTutorialBodyText')
          });
          
        }else{
          //check the line
          //if we're on page 1, line 2, it's a 2x
          //if we're on page 1, line 3, it's a Win All pig
          var tempTex;
          if (i === 1){
            tempTex = 'Symbol_doubler';
          }else if (i === 2){
            tempTex = 'Symbol_winAll';
          }
          pageObjects[i][j] = rollupUtils.spriteFromTexture(tempTex);
        }
        //set anchor
        pageObjects[i][j].anchor.set(0.5);
        //add to container
        pageContainers[i].addChild(pageObjects[i][j]);     
      }
      targetContainer.addChild(pageContainers[i]);
    }

    //now do some positioning and arranging
    var xPos, yPos;
    for (i = 0; i < pageContainers.length; i++){
      xPos = positioning[inOrientation].page1["line"+(i+1)].x;
      yPos = positioning[inOrientation].page1["line"+(i+1)].y;
      pageContainers[i].x = xPos;
      pageContainers[i].y = yPos;
      arrangeWithinContainer(pageObjects, i, pageContainers[i], inOrientation);
    }

    //generate a sprite name
    var tempOrient = (inOrientation === 'landscape') ? 'Landscape' : 'Portrait';
    var texName = 'tutorialPage1'+tempOrient;
    //create sprite from container
    rollupUtils.createTextureFromContainer(targetContainer, texName);
  }

  function processPage2(inArr, inOrientation){
    var i, j;
    var pageObjects = [];
    var pageContainers = [];
    var targetContainer = new PIXI.Container();
    for (i = 0; i < inArr.length; i++){
      pageObjects[i] = [];
      pageContainers[i] = new PIXI.Container();
      for (j = 0; j < inArr[i].length; j++){
        if (inArr[i][j] !== '{0}'){
          //not an image
          pageObjects[i][j] = new PIXI.Text(inArr[i][j],{
            fontFamily: 'oswald',
            fontSize: 30,
            fontWeight: 'bolder',
            align: 'center',
            fill: fontColors('fontColourTutorialBodyText'),
            wordWrap:true
          });

          var wordWrapWidth = (inOrientation === 'landscape') ? 1264 : 642;
          pageObjects[i][j].style.wordWrapWidth = wordWrapWidth;
          
        }else{
          pageObjects[i][j] = rollupUtils.spriteFromTexture('tutorialBonus');
        }
        //set anchor
        pageObjects[i][j].anchor.set(0.5);
        //add to container
        pageContainers[i].addChild(pageObjects[i][j]);     
      }
      targetContainer.addChild(pageContainers[i]);
    }

    //now do some positioning and arranging
    var xPos, yPos;
    for (i = 0; i < pageContainers.length; i++){
      xPos = positioning[inOrientation].page2["line"+(i+1)].x;
      yPos = positioning[inOrientation].page2["line"+(i+1)].y;
      pageContainers[i].x = xPos;
      pageContainers[i].y = yPos;
      arrangeWithinContainer(pageObjects, i, pageContainers[i], inOrientation);
    }

    //generate a sprite name
    var tempOrient = (inOrientation === 'landscape') ? 'Landscape' : 'Portrait';
    var texName = 'tutorialPage2'+tempOrient;
    //create sprite from container
    rollupUtils.createTextureFromContainer(targetContainer, texName);
  }

  function generatePortrait(){
    //we need to generate both pages of the tutorial plaque
    //then create sprites from the container - this means we can have four sprites (both pages, both orientations)
    //so we can simply show/hide the correct sprites instead of messing around repositioning everything on each game resize
    //or orientation change
    //so there are many things we need to set up here
    //now then, let's pass all the strings and splice them where the image placeholders are
    var tempArr1 = [
      resources.i18n.Game.howToPlay.page1.portrait.text1,
      resources.i18n.Game.howToPlay.page1.portrait.text2,
      resources.i18n.Game.howToPlay.page1.portrait.text3
    ];
    var tempArr2 = [
      resources.i18n.Game.howToPlay.page2.portrait.text1,
      resources.i18n.Game.howToPlay.page2.portrait.text2
    ];
    var page1Lines = getStrings(tempArr1);
    var page2Lines = getStrings(tempArr2);

    //page 1
    processPage1(page1Lines, 'portrait');
    processPage2(page2Lines, 'portrait');
  }

  function arrangeWithinContainer(inArr, inVal, inContainer, inOrientation){
    //basically, we need to space everything out within this container
    //in theory it is straightforward, but it does not account for wrapping onto two lines
    //we need to add together the width of all children (with a small buffer)
    //start by setting everything to zero
    var i;
    for (i = 0; i < inArr[inVal].length; i++){
      inArr[inVal][i].x = 0;
    }

    //pass to a function to arrange these sequentially
    arrangeAndCenter(inArr[inVal], inContainer);

    //well well well, we now need to work out whether the current width of the container
    //is wider than the width of the tutorialPlaque
    var maxWidth = positioning[inOrientation].containerWidth - widthOfButtons*2;
    if (inContainer.width > maxWidth){
      //we definitely need to do some resizing
      for (i = 0; i < inArr[inVal].length; i++){
        if (inArr[inVal].length > 1){
          var j;
          //var currentWidth = 0;
          //this is a text field with an image
          //for the time being we need to whack everything back into the center
          //also find the height of the tallest object, we'll need it later
          //var tallest = 0;
          for (j = 0; j < inArr[inVal].length; j++){
            inArr[inVal][j].x = 0;
          }
          
          //right, here we need to work out exactly how much will fit on each line
          //we need to loop through the array, adding the cumulative width
          //as soon as the width has been exceeded, we bump that child down to the next line
          //we know the width of the container with everything centered
          var currentWidth = 0;
          var lineFit = [];
          var lineOverflow = [];
          var lineOverflow2 = [];
          for (j = 0; j < inArr[inVal].length; j++){            
            currentWidth += inArr[inVal][j].width;
            if (currentWidth < maxWidth){
              //current width is less than the max width
              lineFit.push(inArr[inVal][j]);
            }else{
              //current width is greater than the max width
              //bump this child down a tad
              lineOverflow.push(inArr[inVal][j]);
            }
          }

          //ahh, now we need to look at the overflow array and make sure that itself doesn't overflow
          //we can only have one or two elements in the overflow array (an image and the string either side)
          //so if the length is greater than 1 AND the total width of both > container width
          //then move the end one into lineOverflow2
          if (lineOverflow.length > 1){
            if ((lineOverflow[0].width + lineOverflow[1].width) > maxWidth){
              lineOverflow2.push(lineOverflow[1]);
              lineOverflow.splice(1,1);
            }
          }

          //some vertical positioning, we need to space the lines out depending on whether we have two or three
          var numOfLines = 2;
          if (lineOverflow2.length > 0){numOfLines = 3;}

          if (numOfLines === 2){
            //Right, we simply need to work out if the any of the containers in lineFit overlap any of those in lineOverflow
            //as long as we have an overlap, keep subtracting 1 from lineFit and keep adding 1 to lineOverflow
            while(checkOverlap(lineFit, lineOverflow)){
              adjustPosition(lineFit, -1);
              adjustPosition(lineOverflow, 1);
            }

            //now add a buffer
            adjustPosition(lineFit, -spacingBuffer);
            adjustPosition(lineOverflow, spacingBuffer);

          }else if (numOfLines === 3){
            //Keep the centre line in the middle, so raise lineFit
            while(checkOverlap(lineFit, lineOverflow)){
              adjustPosition(lineFit, -1);
              adjustPosition(lineOverflow, 0);
            }

            //now add a buffer
            adjustPosition(lineFit, -spacingBuffer);

            //Keep the centre line in the middle, so lower lineOverflow2
            while(checkOverlap(lineOverflow, lineOverflow2)){
              adjustPosition(lineOverflow, 0);
              adjustPosition(lineOverflow2, 1);
            }

            //now add a buffer
            adjustPosition(lineOverflow2, spacingBuffer);
          }

          //arrange both
          arrangeAndCenter(lineFit, inContainer);
          arrangeAndCenter(lineOverflow, inContainer);
          arrangeAndCenter(lineOverflow2, inContainer);
        }else{
          //single text field, resize using wordWrapWidth
          inArr[inVal][0].style.wordWrap = true;
          var wordWrapWidth = (inOrientation === 'landscape') ? 1264 : 642;
          inArr[inVal][0].style.wordWrapWidth = wordWrapWidth;
        }     
      }
    }
  }

  function checkOverlap(inArr1, inArr2){
    //we need to check if any containers in inArr1 overlap with any in inArr2
    var outVal = false;
    for (var i = 0; i < inArr1.length; i++){
      //grab this container
      var tempCont = inArr1[i];
      for (var j = 0; j < inArr2.length; j++){
        var tempCont2 = inArr2[j];
        //does tempCont overlap with tempCont2?
        var ab = tempCont.getBounds();
        var bb = tempCont2.getBounds();
        if (ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height){
          outVal = true;
        }
      }
    }
    return outVal;
  }

  function adjustPosition(inArr, inVal){
    for (var i = 0; i < inArr.length; i++){
      inArr[i].y += inVal;
    }
  }

  function arrangeAndCenter(arrayOfObjects){
    if (arrayOfObjects.length === 0){return;}
    var totalWidth = 0;
    var thisChild, lastChild;
    for (var i = 0; i < arrayOfObjects.length; i++){
      thisChild = arrayOfObjects[i];
      lastChild = arrayOfObjects[i-1];
      //we don't need to shufty the first child anywhere
      //but we do for subsequent ones
      if (i > 0){
        //we need to add the current totalWidth
        totalWidth += (lastChild.width/2 + thisChild.width/2);
        thisChild.x += totalWidth;
      }else{
        totalWidth += 0;
      }
    }

    //center children
    centerChildren(arrayOfObjects);
  }

  function centerChildren(arrayOfObjects){
    var tempWidth = 0;
    var halfInitWidth = arrayOfObjects[0].width >> 1;
    for (var i = 0; i < arrayOfObjects.length; i++){
      tempWidth += arrayOfObjects[i].width;
      if (arrayOfObjects.length > 1){
        arrayOfObjects[i].x += halfInitWidth;
      }      
    }

    for (var j = 0; j < arrayOfObjects.length; j++){
      if (arrayOfObjects.length > 1){
        arrayOfObjects[j].x -= tempWidth >> 1;
      }      
    }
  }

  function getStrings(inArr){
    var outArr = [];
    for (var i = 0; i < inArr.length; i++){
      var imageFound = false;
      outArr[i] = [];
      var thisStrings = [];
      //search this array for an image placeholder
      if (inArr[i].indexOf('{img}') < 0){
        //no image
        thisStrings.push(inArr[i]);
      }else{
        //we have an image
        thisStrings = inArr[i].split('{img}');
        imageFound = true;
      }

      if (imageFound){
        thisStrings.splice(1,0,'{0}');
      }

      outArr[i] = thisStrings.slice();
    }

    return outArr;
  }

  function onOrientationChange(){
    show(orientation.get());
  }

  //HITGA-74 - HITGA_COM:Game UI display bad after resize window
  //HITGA-86 - HITGA_COM_rotation:game UI display bad
  msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

  return {
    init
  };
});