define(['game/AssetLoader',
        'game/events/UserEvent'], 
        function(AssetLoader, UserEvent) {

    var Hero,
        instance,
        animation,
        ducking,
        shooting = false,
        jumping = false,
        _FRICTION = 0.96,
        _WALK_SPEED = 4,
        _SHELL_SPEED = 8,
        _WIDTH = 36,
        _HEIGHT = 42,
        _FLOOR_Y = 367,
        _GRAVITY = -10,
        vx = 0,
        vy = 0;

    var Hero = function () {
        instance = this;
      
        /**
         * initialize
         */
        instance.init = function () {

            var spriteSheet,
                image,
                data;
            
            image = AssetLoader.assetloader.getResult("Hero").result;
            data = {
                images: [image], 
                frames: {width: _WIDTH, height: _HEIGHT, regX: 0, regY: 0}, 
                animations: {    
                    stop: [0],
                    walk: {
                        frames: [0, 3, 4],
                        next: "walk", 
                        frequency: 10
                    },
                    fire: [0, 1, "stop", 10],
                    duck: [3, 5, "duck", 10],
                    jump: {
                        frames: [3, 5, 5, 6, 5, 3], 
                        next: "stop", 
                        frequency: 10
                    },
                    die: [6, 10, 'stop', 10]
                }
            };

            instance.y = _FLOOR_Y;
            instance.x = -100;
            instance.scaleX = 1;

            spriteSheet = new SpriteSheet(data);
            animation = new BitmapAnimation(spriteSheet);
            animation.gotoAndStop('stop');
            instance.addChild(animation);

		    Ticker.addListener(instance.update);
        }

        instance.update = function () {
            vx *= _FRICTION;
            vy += _GRAVITY;
            instance.x += vx;

            if (jumping) {
                if (instance.y < _FLOOR_Y - 50) {
                    jumping = false;
                } else {
                    instance.y -= 5;
                }
            } else {
                if (Math.abs(vx) < 1) {
                    instance.wait();
                }
                instance.y = instance.y < _FLOOR_Y ? instance.y -= _GRAVITY * 0.2 : _FLOOR_Y;
            }
        }

        instance.moveRight = function () {
            vx = ducking ? _SHELL_SPEED : _WALK_SPEED;
            animation.scaleX = 1;
            animation.x = 0;
            animation.gotoAndPlay('walk');
        }

        instance.moveLeft = function () {
            vx = ducking ? -_SHELL_SPEED : -_WALK_SPEED;
            animation.scaleX = -1;
            animation.x = _WIDTH;
            animation.gotoAndPlay('walk');
        }

        /**
         * handle keydown input
         */
        instance.handle_KEY_DOWN = function (e) {
            switch(e.keyCode) {
            case 37: //left
                break;
            case 39: //right
                break;
            case 38: //jump
                
                break;
            case 40: //duck
                
                break;
            case 32: //fire
                
                break;
            }
        }

        /**
         * key up event
         */
        instance.handle_KEY_UP = function (e) {
            switch(e.keyCode) {
            case 40:
                unduck();
                break;
            }
        }

        instance.init();
    }

    Hero.prototype = new Container();

    return Hero;
});
