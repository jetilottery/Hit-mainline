/**
 * @module PigIndicator
 */
define([
    'com/pixijs/pixi'
    ], function(PIXI){

    function PigIndicator(){
        PIXI.Container.call(this);

        this.WIDTH = 123;
        this.HEIGHT = 110;

        this.base = new PIXI.Sprite();
        this.noWin = new PIXI.Sprite();

        // Set the textures, these are not dynamic
        this.base.texture = PIXI.Texture.fromFrame('noWinBase');
        this.noWin.texture = PIXI.Texture.fromFrame('noWinXFilled');

        // Center everything
        this.base.anchor.set(0.5);
        this.noWin.anchor.set(0.5);        

        // Add all to the master container
        this.addChild(this.base, this.noWin);

        // State
        this.revealed = false;

        // noWin not visible by default
        this.noWin.visible = false;
    }

    PigIndicator.prototype = Object.create(PIXI.Container.prototype, {
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

    PigIndicator.prototype.set = function(inVal) {
      this.noWin.visible = inVal;
    };
    
    return PigIndicator;
});