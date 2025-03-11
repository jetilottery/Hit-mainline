define(require => {
  const PIXI = require('com/pixijs/pixi');
  const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
  const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const fontColors = require('skbJet/componentManchester/standardIW/fontColors');
  const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');
  const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  require('com/gsap/TweenMax');
  require('com/gsap/easing/EasePack');

  const Tween = window.TweenMax;

  const winFrameName = 'numberWin';
  const noWinFrameName = 'numberNoWin';

  var topPrize;
  //find the top prize
  msgBus.subscribe('PrizeData.PrizeStructure', function(){
    topPrize = prizeData.prizeStructure[0]/100;
  });

  class NumberCard extends Pressable {
    constructor() {
      super();

      this.WIDTH = 140;
      this.HEIGHT = 140;

      // Create all the empty sprites
      this.background = new PIXI.Sprite();
      this.win = new PIXI.Sprite();
      this.noWin = new PIXI.Sprite();
      this.winAll = new PIXI.Text(resources.i18n.Game.winAllIcon,{fontFamily: 'oswald',fontSize: 25,fontWeight: 'bold',miterLimit:2,stroke: 'black',strokeThickness: 3,fill: fontColors('fontColourWinUpToTitle')});
      this.revealAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
      this.revealAnim.loop = false;
      this.revealAnim.visible = false;
      this.revealAnim.playStarted = false;
      this.idleAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
      this.idleAnim.loop = false;
      this.idleAnim.animationSpeed = 0.5;
      this.idleAnim.visible = false;

      //position winAll slightly
      this.winAll.y = -5;

      //separate cover
      this.cover = new PIXI.Sprite();
      this.cover.texture = PIXI.Texture.EMPTY;

      this.idleAnim.onComplete = () => {
        this.idleAnim.visible = false;
        this.revealAnim.visible = true;
      };

      // Center everything
      this.background.anchor.set(0.5);
      this.win.anchor.set(0.5);
      this.noWin.anchor.set(0.5);
      this.winAll.anchor.set(0.5);
      this.revealAnim.anchor.set(0.5);
      this.idleAnim.anchor.set(0.5);
      this.cover.anchor.set(0.5);

      // Add all the result elements to a container
      this.resultContainer = new PIXI.Container();
      this.resultContainer.addChild(this.win, this.winAll, this.noWin);
      this.resultContainer.visible = false;
      this.resultContainer.name = 'resultContainer';

      this.addChild(this.background, this.resultContainer, this.revealAnim, this.idleAnim, this.cover);

      // State
      this.revealed = false;

      //winAll visible false
      this.winAll.visible = false;

      // Interactivity
      this.hitArea = new PIXI.Rectangle(
        this.WIDTH / -2,
        this.HEIGHT / -2,
        this.WIDTH,
        this.HEIGHT
      );
      this.on('press', () => {
        if (!autoPlay.enabled) {
          this.reveal();
        }
      });
    }

    enable() {
      return new Promise(resolve => {
        this.reveal = resolve;
        this.enabled = true;
      }).then(() => {
        this.enabled = false;
      });
    }

    populate(number) {
      this.number = number;
      //if the number is a number
      if (!isNaN(number)){
        //let's grab the frame, prepending the top prize
        var noWinTex = topPrize+'_'+noWinFrameName + number;     
        if (gameConfig.pricePointSpecificAssets){
          if (PIXI.utils.TextureCache[noWinTex]){
            this.noWin.texture = PIXI.Texture.fromFrame(noWinTex);
          }else{
            this.noWin.texture = PIXI.Texture.fromFrame(noWinFrameName + number);
          }
        }else{
          //find the price point index
          var prices = SKBeInstant.config.gameConfigurationDetails.availablePrices;
          var pricePointIndex = prices.indexOf(meterData.ticketCost);
          var colourLookup = ['orange','blue','darkOrange','gold','purple','orange','blue','darkOrange','gold','purple'];
          //find the colour
          var col = colourLookup[pricePointIndex];
          var tempString = col+'_'+noWinFrameName + number; 
          this.noWin.texture = PIXI.Texture.fromFrame(tempString);
        }
        //win texture is the same regardless
        this.win.texture = PIXI.Texture.fromFrame(winFrameName + number);
      }else{
        //it's a letter, Y or Z, Y = x2 prize multiplier, Z = Win All
        switch (number){
          case "Y":
            this.win.texture = PIXI.Texture.fromFrame('Symbol_doubler');
            break;
          case "Z":
            this.win.texture = PIXI.Texture.fromFrame('Symbol_winAll');
            break;
        }
      }      
      this.noWin.visible = true;
    }

    prompt() {
      //bring it to the front
      this.revealAnim.parent.parent.parent.setChildIndex(
        this.revealAnim.parent.parent,
        this.revealAnim.parent.parent.parent.children.length - 1
      );
      //pulse it
      Tween.fromTo(this.scale, 0.25, {x:1, y:1}, {x:1.2,y:1.2,yoyo:true,repeat:1});
    }

    disable() {
      this.enabled = false;
      this.reveal = undefined;
    }

    reset() {
      this.noWin.texture = PIXI.Texture.EMPTY;
      this.win.texture = PIXI.Texture.EMPTY;
      this.enabled = false;
      this.revealAnim.gotoAndStop(0);
      this.revealAnim.visible = true;
      this.noWin.visible = false;
      this.win.visible = false;
      this.resultContainer.visible = false;
      this.revealed = false;
      this.matched = false;
      this.number = undefined;
      this.cover.visible = true;
      this.winAll.visible = false;
      this.scale.x = this.scale.y = 1;
      if (this.valueText){this.valueText.visible = true;}
    }

    async uncover() {
      if (this.revealAnim.textures && this.revealAnim.textures.length > 1) {
        await new Promise(resolve => {
          // kill all tweens first
          Tween.killTweensOf(this.scale);
          this.scale.x = this.scale.y = 1;
          // bring to front in case the animation overlaps neighboring cards
          this.revealAnim.parent.parent.parent.setChildIndex(
            this.revealAnim.parent.parent,
            this.revealAnim.parent.parent.parent.children.length - 1
          );

          // Calculate the animation's duration in seconds
          const duration = this.revealAnim.textures.length / this.revealAnim.animationSpeed / 60;
          const halfDuration = duration / 2;
          // Tween in the results over the 2nd half of the animation
          this.resultContainer.visible = true;
          Tween.fromTo(
            this.resultContainer,
            halfDuration,
            { alpha: 0 },
            {
              alpha: 1,
              delay: halfDuration,
            }
          );

          //HITGA-104 - HITGA_COM:Game stuck after resize window or rotate device to anther orientation
          //the issue is that on a resize the revealAnims are snapping back to the start, which means
          //they will never resolve - the answer is to work out what frame we were on before
          //and then when the frame changes, work out whether the current frame is greater than the previous one
          //if the current frame is greater than the previous frame, fine, we're definitely playing the animation
          //if the current frame is now less than the previous frame, we have a problem
          this.revealAnim.onFrameChange = () => {
            //check to see if we have already started to play this one
            if (this.revealAnim.playStarted){
              //so the frame has changed
              if (this.revealAnim.currentFrame > this.revealAnim.previousFrame){
                this.revealAnim.previousFrame = this.revealAnim.currentFrame;
              }else{
                this.revealAnim.gotoAndPlay(this.revealAnim.previousFrame);
              }
            }            
          };

          // Wait for the animation to complete before resolving
          this.revealAnim.onComplete = () => {
            this.revealAnim.visible = false;
            this.revealed = true;
            this.revealAnim.playStarted = false;
            this.revealAnim.previousFrame = 0;
            resolve();
          };

          // Disable interactivity to prevent re-reveal, then switch to the animation
          this.enabled = false;
          this.cover.visible = false;
          this.revealAnim.previousFrame = 0;
          this.revealAnim.playStarted = true;
          this.revealAnim.gotoAndPlay(0);
        });
      } else {
        // Otherwise just a swap from the cover to the resultsContainer
        this.resultContainer.visible = true;
        this.revealAnim.visible = false;
        this.revealed = true;
      }
    }

    match() {
      this.matched = true;
      this.win.visible = true;
      this.noWin.visible = false;
    }

    winAllMatch() {
      this.matched = true;
      this.win.visible = true;
      this.noWin.visible = true;
      //we need to hide the non win value
      this.valueText.visible = false;
      //and the winning number
      this.win.texture = PIXI.Texture.EMPTY;
    }

    presentWin() {
      return new Promise(resolve => Tween.fromTo(
        this.resultContainer.scale,
        0.75,
        {
          x: 0.666,
          y: 0.666,
        },
        {
          x: 1,
          y: 1,
          ease: window.Elastic.easeOut.config(
            gameConfig.matchAnimAmplitude,
            gameConfig.matchAnimPeriod
          ),
          onComplete: resolve,
        }
      ));
    }
  }

  return NumberCard;
});
