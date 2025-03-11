define(require => {
  const PIXI = require('com/pixijs/pixi');
  const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  require('com/gsap/TweenMax');
  require('com/gsap/easing/EasePack');
  const Tween = window.TweenMax;

  class BonusPig extends Pressable {
    constructor() {
      super();

      this.WIDTH = 155;
      this.HEIGHT = 139;

      this.base = new PIXI.Sprite();
      this.noWin = new PIXI.Sprite();      
      this.coins = new PIXI.Sprite();
      this.buttons = new PIXI.Sprite();
      this.sparkle = new PIXI.Sprite();
      this.revealAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
      this.revealAnim.animationSpeed = gameConfig.pigExplodeAnimationSpeed;
      this.revealAnim.loop = false;
      this.revealAnim.visible = false;
      this.topFoil = new PIXI.Sprite();
      this.greyFoil = new PIXI.Sprite();

      this.bonusVal = 'X';

      // Set the textures, these are not dynamic
      this.base.texture = PIXI.Texture.fromFrame('pigBase');
      this.noWin.texture = PIXI.Texture.fromFrame('noWinXFilled');
      this.coins.texture = PIXI.Texture.fromFrame('pigBaseCoins');
      this.buttons.texture = PIXI.Texture.fromFrame('pigBaseButtons');
      this.sparkle.texture = PIXI.Texture.fromFrame('pigBaseCoinsSparkle');
      this.topFoil.texture = PIXI.Texture.fromFrame('pigFoil');
      this.greyFoil.texture = PIXI.Texture.fromFrame('pigFoilGrey');
      this.revealAnim.textures = [
        PIXI.Texture.fromFrame('pigExplode_01'),
        PIXI.Texture.fromFrame('pigExplode_02'),
        PIXI.Texture.fromFrame('pigExplode_03'),
        PIXI.Texture.fromFrame('pigExplode_04'),
        PIXI.Texture.fromFrame('pigExplode_05'),
        PIXI.Texture.fromFrame('pigExplode_06'),
        PIXI.Texture.fromFrame('pigExplode_07'),
        PIXI.Texture.fromFrame('pigExplode_08'),
        PIXI.Texture.fromFrame('pigExplode_09'),
        PIXI.Texture.fromFrame('pigExplode_10'),
        PIXI.Texture.fromFrame('pigExplode_11'),
        PIXI.Texture.fromFrame('pigExplode_12'),
        PIXI.Texture.fromFrame('pigExplode_13'),
        PIXI.Texture.fromFrame('pigExplode_14'),
        PIXI.Texture.fromFrame('pigExplode_15'),
        PIXI.Texture.fromFrame('pigExplode_16'),
        PIXI.Texture.fromFrame('pigExplode_17'),
        PIXI.Texture.fromFrame('pigExplode_18'),
        PIXI.Texture.fromFrame('pigExplode_19'),
        PIXI.Texture.fromFrame('pigExplode_20'),
        PIXI.Texture.fromFrame('pigExplode_21'),
        PIXI.Texture.fromFrame('pigExplode_22'),
        PIXI.Texture.fromFrame('pigExplode_23'),
        PIXI.Texture.fromFrame('pigExplode_24'),
        PIXI.Texture.fromFrame('pigExplode_25')
      ];

      // Center everything
      this.base.anchor.set(0.5);
      this.noWin.anchor.set(0.5);
      this.coins.anchor.set(0.5);
      this.buttons.anchor.set(0.5);
      this.sparkle.anchor.set(0.5);
      this.revealAnim.anchor.set(0.5);
      this.topFoil.anchor.set(0.5);
      this.greyFoil.anchor.set(0.5);

      //some positioning
      this.coins.x = 20;
      this.coins.y = 11;

      this.buttons.x = -2;
      this.buttons.y = 33;

      this.sparkle.x += 45;
      this.sparkle.y -= 25;

      // Add the base and nonWin to a container
      this.baseContainer = new PIXI.Container();
      this.baseContainer.addChild(this.base, this.noWin);
      this.baseContainer.visible = false;
      this.baseContainer.name = 'baseContainer';

      //hide noWin by default
      this.noWin.visible = false;
      //hide grey pig by default
      this.greyFoil.visible = false;

      // Add all the result elements to a container
      this.resultContainer = new PIXI.Container();
      this.resultContainer.addChild(this.coins, this.buttons, this.sparkle);
      this.resultContainer.visible = false;
      this.resultContainer.name = 'resultContainer';
      //hide the contents by default
      this.coins.visible = this.buttons.visible = this.sparkle.visible = false;

      // Add all to the master container
      this.addChild(this.baseContainer, this.resultContainer, this.revealAnim, this.greyFoil, this.topFoil);

      // State
      this.revealed = false;
      //disabled by default
      this.enabled = false;

      // Interactivity
      this.hitArea = new PIXI.Rectangle(
        this.WIDTH / -2,
        this.HEIGHT / -2,
        this.WIDTH,
        this.HEIGHT
      );
      this.on('press', () => {
        this.pressed();
      });
      //add the pointerover event
      this.off('pointerover');
      this.on('pointerover', () => {
        this.rollover();
      }); 
      this.off('pointerout');
      this.on('pointerout', () => {
        Tween.killTweensOf(this.topFoil);
      });
    }

    rollover() {
      if (this.enabled){
        audio.playSequential('piggyRollover');
        //now we need to jiggle it a bit
        var count = 0;
        var maxCount = 20;
        var originX = this.topFoil.x;
        var originY = this.topFoil.y;
        var originR = this.topFoil.rotation;
        this.wobble(this, this.topFoil, count, maxCount, originX, originY, originR);
      }
    }

    wobble(_this, inObj, count, countMax, originX, originY, originR) {
      var maxDist = 0;
      var maxRot = 0.07; //radians
      var tweenTime = 0.05;
      var rX = Math.random() > 0.5 ? -(Math.random() * maxDist) : Math.random() * maxDist;
      var rY = Math.random() > 0.5 ? -(Math.random() * maxDist) : Math.random() * maxDist;
      var rR = Math.random() > 0.5 ? -(Math.random() * maxRot) : Math.random() * maxRot;
      if (count === countMax){
          rX = originX;
          rY = originY;
          rR = originR;
      }
      Tween.to(inObj, tweenTime, {x: rX, y: rY, rotation:rR, onComplete: function(){
          if(count === countMax){
            //finished wobbling
          }else{
            count++;
            _this.wobble(_this, inObj, count, countMax, originX, originY, originR);
          }
        }
      });
    }

    enable() {
      this.enabled = true;
    }

    populate(inVal) {
      if (inVal === "L"){
        this.buttons.visible = true;
      }else if (inVal === "W"){
        this.coins.visible = true;
      }
    }

    disable() {
      this.enabled = false;
    }

    reset() {
      this.enabled = false;
      this.revealAnim.gotoAndStop(0);
      this.revealAnim.visible = false;
      this.topFoil.visible = true;
      this.greyFoil.visible = false;
      this.noWin.visible = false;
      this.resultContainer.visible = false;
      this.baseContainer.visible = false;
      this.revealed = false;
      this.matched = false;
      this.coins.visible = false;
      this.buttons.visible = false;
      this.sparkle.visible = false;
      this.bonusVal = 'X';
      //make sure we reset the position and rotation of the topFoil
      this.topFoil.x = this.topFoil.y = 0;
      this.topFoil.rotation = 0;
    }

    pressed() {
      msgBus.publish('pigPressed', this.num);
    }

    reveal() {
      this.stopIdle();
      this.revealed = true;
      this.topFoil.visible = false;
      this.resultContainer.visible = true;
      this.baseContainer.visible = true;
      this.revealAnim.visible = true;
      this.revealAnim.gotoAndPlay(1);
      //play sound
      audio.play('PiggySmashed');
      this.revealAnim.onComplete = () => {
        this.revealAnim.visible = false;
        this.revealAnim.gotoAndStop(0);
        if (this.bonusVal === "W"){
          //sparkle sparkle
          this.sparkle.visible = true;
          Tween.fromTo(this.sparkle, 0.25, {alpha:0}, {alpha:1, yoyo:true, repeat:1});
          Tween.fromTo(this.sparkle, 0.5, {rotation:0}, {rotation:3.14159});
        }
        msgBus.publish('pigRevealed', this.num);
      };
    }

    prompt() {
      //simply use the rollover anim for the idle prompt
      this.rollover();
    }

    stopIdle() {
      Tween.killTweensOf(this.topFoil);
      //make sure we reset the position and rotation of the topFoil
      this.topFoil.x = this.topFoil.y = 0;
      this.topFoil.rotation = 0;
    }

    greyscale() {
      this.topFoil.visible = false;
      this.greyFoil.visible = true;
    }

    static fromContainer(container) {
      const pig = new BonusPig();
      container.addChild(pig);
      return pig;
    }
  }

  return BonusPig;
});
