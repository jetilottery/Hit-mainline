/**
 * particle Configs
 */
define(function module() { 
    //by returning this from a function, it means we can do e.g. 'new coinFountain()',
    //and have multiples, rather than changing settings for one, and ending up with the same settings for all
    var fountain = function(){
        return {
            //custom particle config settings
            bigWinSettings: {
                animatedParticlePrefix: 'coin',
                isAnimated: true, 
                startFrame: 1,
                endFrame: 10,
                nonAnimatedImages: [],
                frameRate: 10,
                spawnPosLandscapeAnchor: {x: 0.5, y: 1},
                spawnPosPortraitAnchor: {x: 0.5, y: 1.5}
            },

            //Normal Particle config settings
            "alpha": {
                "start": 1,
                "end": 1
            },
            "scale": {
                "start": 0.32,
                "end": 0.34,
                "minimumScaleMultiplier": 0.32
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 1100,
                "end": 1500,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 1000
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 250,
                "max": 290
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": -30,
                "max": 30
            },
            "lifetime": {
                "min": 6,
                "max": 6
            },
            "blendMode": "normal",
            "frequency": 0.15,
            "emitterLifetime": -1,
            "maxParticles": 200,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 0
            }
        };
    };

    var prizeTableEffect = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.2,
            "end": 0.8,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ece431",
            "end": "#ece431"
        },
        "speed": {
            "start": 100,
            "end": 100,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": true,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.3,
            "max": 1.8
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": 3,
        "maxParticles": 60,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "rect",
        "spawnRect": {
            "x": 5,
            "y": 0,
            "w": 0,
            "h": 0
        }
    };

    return{
        fountain: fountain,
        prizeTableEffect: prizeTableEffect
    };
});