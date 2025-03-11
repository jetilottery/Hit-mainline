/**
 * @module PrizeLevel
 */
define([
    'com/pixijs/pixi',
    'skbJet/component/SKBeInstant/SKBeInstant',
    'game/components/utils/currencySymbol',
    'skbJet/componentManchester/standardIW/gameConfig'
    ], function(PIXI, SKBeInstant, currencySymbol, gameConfig){

    function PrizeLevel(){
        PIXI.Container.call(this);

        this.WIDTH = 300;
        this.HEIGHT = 83;
        //containers
        this.currencyContainer = new PIXI.Container();
        this.decimalContainer = new PIXI.Container();
        this.commaContainer = new PIXI.Container();
        this.shortDashContainer = new PIXI.Container();
        this.longDashContainer = new PIXI.Container();
        this.container0 = new PIXI.Container();
        this.container1 = new PIXI.Container();
        this.container2 = new PIXI.Container();
        this.container3 = new PIXI.Container();
        this.container4 = new PIXI.Container();
        this.container5 = new PIXI.Container();
        this.container6 = new PIXI.Container();
        this.container7 = new PIXI.Container();
        this.container8 = new PIXI.Container();
        this.container9 = new PIXI.Container();        
        //sprites
        this.unselectedLongDash = new PIXI.Sprite();
        this.unselectedShortDash = new PIXI.Sprite();
        this.selectedLongDash = new PIXI.Sprite();
        this.selectedShortDash = new PIXI.Sprite();

        //set the textures
        this.unselectedLongDash.texture = PIXI.Texture.fromFrame('-Long_Unselected');
        this.unselectedShortDash.texture = PIXI.Texture.fromFrame('-Short_Unselected');
        //the selected ones
        this.selectedLongDash.texture = PIXI.Texture.fromFrame('-Long_Selected');
        this.selectedShortDash.texture = PIXI.Texture.fromFrame('-Short_Selected');

        //let's see if we can set up a currency symbol here
        if (SKBeInstant.config.currency){
            //we have a currency, easy enough
            this.currency = SKBeInstant.config.currency;
            this.currencySymbol = currencySymbol.fetch(this.currency);
        }else{
            //oh dear, we don't have currency, we must be on WLA
            //okay, let's do a formatCurrency on 0 and then remove any numbers, separators and spaces
            //what we'll end up with is the currency symbol, it's less than elegant but for WLA we have very little choice
            //decimal separators will always be a space, comma or a period
            this.currencySymbol = "";
            var zeroString = SKBeInstant.formatCurrency(0).formattedAmount.split('');
            var invalid = /[0,. ]/;
            var i;
            for (i = 0; i < zeroString.length; i++){
                var thisChar = zeroString[i];
                if (thisChar.match(invalid)){
                    zeroString.splice(i, 1);
                    i--;
                }
            }

            //now run through the array, adding each part to the currencySymbol string
            //so in for example, INR or UAH, we can end up with simply that as the currencySymbol
            for (i = 0; i < zeroString.length; i++){
                this.currencySymbol += zeroString[i];
            }
        }        

        //anchor centre
        this.unselectedLongDash.anchor.set(0.5);
        this.unselectedShortDash.anchor.set(0.5);
        this.selectedLongDash.anchor.set(0.5);
        this.selectedShortDash.anchor.set(0.5);      

        // Add all to the master container
        this.shortDashContainer.addChild(this.unselectedShortDash, this.selectedShortDash);
        this.longDashContainer.addChild(this.unselectedLongDash, this.selectedLongDash);
        this.addChild(this.currencyContainer, this.decimalContainer, this.commaContainer, this.container0, this.container1, this.container2, this.container3, this.container4, this.container5, this.container6, this.container7, this.container8, this.container9, this.longDashContainer, this.shortDashContainer);
    
        this.hideAll();
    }

    PrizeLevel.prototype = Object.create(PIXI.Container.prototype, {
      enabled: {
        get: function getEnabled() {
          return this._enabled;
        },
        set: function setEnabled(v) {
          this._enabled = !!v;
          this.interactive = this._enabled;
        },
      },
    });

    PrizeLevel.prototype.setState = function(inVal, inState) {
      this.hideAll();
      this.value = inVal;
      //before we go deciphering the cash amount, do we need to show a dash?
      if (inVal === "longDash" || inVal === "shortDash"){
        var tempTex;
        switch (inVal){
            case "longDash":
                this.longDashContainer.visible = true;
                tempTex = (inState === 'unselected') ? this.unselectedLongDash : this.selectedLongDash;
                tempTex.visible = true;
                break;
            case "shortDash":
                this.shortDashContainer.visible = true;
                tempTex = (inState === 'unselected') ? this.unselectedShortDash : this.selectedShortDash;
                tempTex.visible = true;
                break;
            }            
        }else{
            //it's definitely a cash amount#
            //look through inVal and replace any occurrence of 'this.currencySymbol' with ¤ - generic currency symbol
            var genericString = inVal.replace(this.currencySymbol, "¤");
            var tempLength = genericString.length;
            var tempChildren = [];            
            this.numSprites = [];
            for (var i = 0; i < tempLength; i++){
                var spacingBuffer = -20;
                //start by creating a sprite
                var tempContainer;
                //var tempSpacing;
                var yOffset = 0;
                this.numSprites[i] = new PIXI.Sprite();
                this.numSprites[i].spacing = spacingBuffer;
                switch (genericString.charAt(i)){
                    case "0":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('00_Unselected') : PIXI.Texture.fromFrame('00_Selected');
                        tempContainer = this.container0;
                        break;
                    case "1":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('01_Unselected') : PIXI.Texture.fromFrame('01_Selected');
                        tempContainer = this.container1;
                        break;
                    case "2":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('02_Unselected') : PIXI.Texture.fromFrame('02_Selected');
                        tempContainer = this.container2;
                        break;
                    case "3":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('03_Unselected') : PIXI.Texture.fromFrame('03_Selected');
                        tempContainer = this.container3;
                        break;
                    case "4":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('04_Unselected') : PIXI.Texture.fromFrame('04_Selected');
                        tempContainer = this.container4;
                        break;
                    case "5":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('05_Unselected') : PIXI.Texture.fromFrame('05_Selected');
                        tempContainer = this.container5;
                        break;
                    case "6":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('06_Unselected') : PIXI.Texture.fromFrame('06_Selected');
                        tempContainer = this.container6;
                        //tempSpacing = 60;
                        break;
                    case "7":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('07_Unselected') : PIXI.Texture.fromFrame('07_Selected');
                        tempContainer = this.container7;
                        break;
                    case "8":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('08_Unselected') : PIXI.Texture.fromFrame('08_Selected');
                        tempContainer = this.container8;
                        break;
                    case "9":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('09_Unselected') : PIXI.Texture.fromFrame('09_Selected');
                        tempContainer = this.container9;
                        break;
                    case "¤":
                        //currency symbol
                        //see if we're autodetecting first
                        if (gameConfig.autoDetectBonusCurrencySymbol){
                            this.numSprites[i].texture = (inState === 'unselected') ? currencySymbol.generate(this.currencySymbol)[1] : currencySymbol.generate(this.currencySymbol)[0];
                        }else{
                            this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('currency_Unselected') : PIXI.Texture.fromFrame('currency_Selected');
                        }                        
                        tempContainer = this.currencyContainer;
                        break;
                    case " ":
                        //we have a space
                        //we don't need to show anything
                        //we do need to spoof a width though
                        this.numSprites[i].width = spacingBuffer*2;
                        break;
                    case ".":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('decimalUnselected') : PIXI.Texture.fromFrame('decimalSelected');
                        tempContainer = this.decimalContainer;
                        yOffset = 28;
                        break;
                    case ",":
                        this.numSprites[i].texture = (inState === 'unselected') ? PIXI.Texture.fromFrame('commaUnselected') : PIXI.Texture.fromFrame('commaSelected');
                        tempContainer = this.commaContainer;
                        yOffset = 34;
                        break;
                    default:
                        console.log('this character does not exist yet');
                        break;
                }
                this.numSprites[i].anchor.set(0,0.5);
                this.numSprites[i].y += yOffset;
                tempChildren.push(this.numSprites[i]);
                tempContainer.addChild(this.numSprites[i]);
                //finish by showing it
                tempContainer.visible = true;
            }     

            //now then, we need to space everything out
            //we know exactly how many we have
            //this is the tempLength
            //as some symbols are smaller than others, we need to adjust spacing
            this.spaceOut(tempChildren);

            //so all the children have been added
            //do we have a container width?
            this.centreWithinContainer(tempChildren);

            //the absolute maximum width of the field is 445
            //so let's look at the container width and scale it down if it is
            //this is a dirty way of dealing with localisation, but the game design doesn't lend itself well to it
            while (this.width > 445){
                //centre everything again
                this.centreAll(tempChildren);
                //scale down
                this.scaleChildren(tempChildren, -0.1);
                //space them out again
                this.spaceOut(tempChildren);
                //re-centre within container
                this.centreWithinContainer(tempChildren);
            }
      }
    };

    PrizeLevel.prototype.scaleChildren = function(inArr, inScale){
        for (var i = 0; i < inArr.length; i++){
            inArr[i].scale.x += inScale;
            inArr[i].scale.y += inScale;
        }
    };

    PrizeLevel.prototype.spaceOut = function(inArr){
        for (var j = 0; j < inArr.length; j++){
            var tempX = 0;
            if (inArr[j-1]){
                tempX = inArr[j-1].x;
                tempX += inArr[j-1].width;
                tempX += inArr[j-1].spacing;
            }
            inArr[j].x = tempX;
        }
    };

    PrizeLevel.prototype.centreWithinContainer = function(inArr){
        var contWidth = this.width >> 1;
        //we have the total width of the container, woo
        //we need to shift each child to the left to have the effect of centering it
        for (var k = 0; k < inArr.length; k++){
            inArr[k].x -= contWidth;
            //to account for left spacing
            inArr[k].x += 10;
        }
    };

    PrizeLevel.prototype.centreAll = function(inArr){
        for (var i = 0; i < inArr.length; i++){
            inArr[i].x = 0;
        }
    };

    PrizeLevel.prototype.hideAll = function(){
        //hide absolutely everything
        this.children.forEach(function(obj){
            obj.visible = false;
            obj.x = 0;
        });

        var i;
        for (i = this.currencyContainer.children.length - 1; i >= 0; i--) {  this.currencyContainer.removeChild(this.currencyContainer.children[i]);}
        for (i = this.commaContainer.children.length - 1; i >= 0; i--) {  this.commaContainer.removeChild(this.commaContainer.children[i]);}
        for (i = this.decimalContainer.children.length - 1; i >= 0; i--) {  this.decimalContainer.removeChild(this.decimalContainer.children[i]);}
        for (i = this.container0.children.length - 1; i >= 0; i--) {  this.container0.removeChild(this.container0.children[i]);}
        for (i = this.container1.children.length - 1; i >= 0; i--) {  this.container1.removeChild(this.container1.children[i]);}
        for (i = this.container2.children.length - 1; i >= 0; i--) {  this.container2.removeChild(this.container2.children[i]);}
        for (i = this.container3.children.length - 1; i >= 0; i--) {  this.container3.removeChild(this.container3.children[i]);}
        for (i = this.container4.children.length - 1; i >= 0; i--) {  this.container4.removeChild(this.container4.children[i]);}
        for (i = this.container5.children.length - 1; i >= 0; i--) {  this.container5.removeChild(this.container5.children[i]);}
        for (i = this.container6.children.length - 1; i >= 0; i--) {  this.container6.removeChild(this.container6.children[i]);}
        for (i = this.container7.children.length - 1; i >= 0; i--) {  this.container7.removeChild(this.container7.children[i]);}
        for (i = this.container8.children.length - 1; i >= 0; i--) {  this.container8.removeChild(this.container8.children[i]);}
        for (i = this.container9.children.length - 1; i >= 0; i--) {  this.container9.removeChild(this.container9.children[i]);}

        this.shortDashContainer.children.forEach(function(obj){
            obj.visible = false;
            obj.x = 0;
        });

        this.longDashContainer.children.forEach(function(obj){
            obj.visible = false;
            obj.x = 0;
        });
    };
    
    return PrizeLevel;
});