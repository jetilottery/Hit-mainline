/**
 * @module game/audioManager
 * @description single place to play sound
 */
define([
    'com/pixijs/pixi'
], function (PIXI) {
    
    var currencyRef = [
        ["ARS","$"],
        ["AUD","$"],
        ["BGN","лв"],
        ["BRL","R$"],
        ["CAD","$"],
        ["CHF","CHF"],
        ["CNY","¥"],
        ["CZK","Kč"],
        ["DKK","kr"],
        ["EUR","€"],
        ["FPY",""],
        ["FUN",""],
        ["GBP","£"],
        ["HKD","$"],
        ["HUF","Ft"],
        ["INR","INR"],
        ["ISK","kr"],
        ["JPY","¥"],
        ["MXN","$"],
        ["MYR","RM"],
        ["NOK","kr"],
        ["NZD","$"],
        ["PHP","₱"],
        ["PLN","zł"],
        ["RMB","RMB"],
        ["RON","lei"],
        ["SEK","kr"],
        ["SGD","$"],
        ["THB","฿"],
        ["TWD","NT$"],
        ["UAH","UAH"],
        ["USD","$"],
        ["ZAR","R"],
        ["COP","$"]
    ];

    function fetch(inVal){
        for (var i = 0; i < currencyRef.length; i++){
            if (inVal === currencyRef[i][0]){
                return currencyRef[i][1];
            }
        }
    }

    function generate(inSymbol){
        //first we need to find out the length
        //because a lot of them are just single character symbols
        //the dollar and yen for instance
        var outArr = [];
        switch (inSymbol){
            case "$":
            case "NT$":
                outArr = [PIXI.Texture.fromFrame('dollar_Selected'),PIXI.Texture.fromFrame('dollar_Unselected')];
                break;
            case "¥":
            case "RMB":
                outArr = [PIXI.Texture.fromFrame('yen_Selected'),PIXI.Texture.fromFrame('yen_Unselected')];
                break;
            case "€":
                outArr = [PIXI.Texture.fromFrame('EUR_Selected'),PIXI.Texture.fromFrame('EUR_Unselected')];
                break;
            case "":
                outArr = [PIXI.Texture.EMPTY,PIXI.Texture.EMPTY];
                break;
            case "£":
                outArr = [PIXI.Texture.fromFrame('GBP_Selected'),PIXI.Texture.fromFrame('GBP_Unselected')];
                break;
            case "₱":
                outArr = [PIXI.Texture.fromFrame('PHP_Selected'),PIXI.Texture.fromFrame('PHP_Unselected')];
                break;
            case "฿":
                outArr = [PIXI.Texture.fromFrame('THB_Selected'),PIXI.Texture.fromFrame('THB_Unselected')];
                break;
            case "R":
                outArr = [PIXI.Texture.fromFrame('R_Selected'),PIXI.Texture.fromFrame('R_Unselected')];
                break;
            case "лв":
                outArr = [PIXI.Texture.fromFrame('BGN_Selected'),PIXI.Texture.fromFrame('BGN_Unselected')];
                break;
            case "UAH":
            case "₴":
                outArr = [PIXI.Texture.fromFrame('UAH_Selected'),PIXI.Texture.fromFrame('UAH_Unselected')];
                break;
            case "INR":
            case "₹":
                outArr = [PIXI.Texture.fromFrame('INR_Selected'),PIXI.Texture.fromFrame('INR_Unselected')];
                break;
            case "kr":
                outArr = [PIXI.Texture.fromFrame('kr_Selected'),PIXI.Texture.fromFrame('kr_Unselected')];
                break;
            case "R$":
                outArr = [PIXI.Texture.fromFrame('R$_Selected'),PIXI.Texture.fromFrame('R$_Unselected')];
                break;
            case "Ft":
                outArr = [PIXI.Texture.fromFrame('Ft_Selected'),PIXI.Texture.fromFrame('Ft_Unselected')];
                break;
            case "lei":
                outArr = [PIXI.Texture.fromFrame('lei_Selected'),PIXI.Texture.fromFrame('lei_Unselected')];
                break;
            case "CHF":
                outArr = [PIXI.Texture.fromFrame('CHF_Selected'),PIXI.Texture.fromFrame('CHF_Unselected')];
                break;
            case "Kč":
                outArr = [PIXI.Texture.fromFrame('CZK_Selected'),PIXI.Texture.fromFrame('CZK_Unselected')];
                break;
            case "RM":
                outArr = [PIXI.Texture.fromFrame('RM_Selected'),PIXI.Texture.fromFrame('RM_Unselected')];
                break;
            default:
                outArr = [PIXI.Texture.EMPTY,PIXI.Texture.EMPTY];
                break;
        }

        return outArr;
    }

    return {
        fetch:fetch,
        generate:generate
    };
});