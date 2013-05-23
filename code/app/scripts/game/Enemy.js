define(['game/AssetLoader',
        'game/events/UserEvent'], 
        function(AssetLoader, UserEvent) {

    var Enemy,
        instance,
        animation,
        ducking,
        shooting = false,
        jumping = false,
        comment,
        currentComment = 0,
        _FRICTION = 0.96,
        _WALK_SPEED = 4,
        _SHELL_SPEED = 8,
        _WIDTH = 50,
        _HEIGHT = 54,
        _FLOOR_Y = 360,
        _GRAVITY = -10,
        _COMMENTARY = [
            'oh well, just another lonely day..',
            'this castle is pretty boring.',
            'i wonder if any heroes will show up?'
        ],
        vx = 0,
        vy = 0;

    Enemy = function () {
        instance = this;

        function fireball() {
            animation.gotoAndPlay('fire');
            UserEvent.FIREBALL.dispatch();
            shooting = true;
            setTimeout(function () {
                shooting = false;
            }, 1000);
        }

        function duck() {
            ducking = true;
            //vx = 0;
            animation.gotoAndPlay('duck');
        }

        function onFloor() {
            return instance.y == _FLOOR_Y;
        }

        function unduck() {
            ducking = false;
            animation.gotoAndStop('stop');

            if (onFloor()) {
                SoundJS.play('JumpSFX', SoundJS.INTERRUPT_ANY, 0, 0, 0, 0.5); 
                jumping = true;
                animation.gotoAndPlay('jump');
                vx = vx > 0 ? -2 : 2;
            }
        }

        function hideComment() {
            comment.alpha = 0;
            setTimeout(newComment, 1000 + Math.random() * 3000);
        }

        function newComment() {
            currentComment += 1;

            if (currentComment < _COMMENTARY.length) {
                comment.text = _COMMENTARY[currentComment];
                comment.alpha = 1;
                setTimeout(hideComment, 3000);
            }
        }

        function addComment() {
            comment = new Text(_COMMENTARY[currentComment], '16px commodore', 'white');
            comment.lineWidth = 300;
            comment.textAlign = "center";
            comment.x = 0;
            comment.y = -50;
            instance.addChild(comment);

            setTimeout(hideComment, 3000);
        }

        /**
         * initialize
         */
        instance.init = function () {

            var spriteSheet,
                image,
                data;
            
            image = AssetLoader.assetloader.getResult("Enemy").result;
            data = {
                images: [image], 
                frames: {width: _WIDTH, height: _HEIGHT, regX: 0, regY: 0}, 
                animations: {    
                    stop: [0],
                    die: [6, 10, 'stop', 10],
                    fire: [0, 1, "stop", 10],
                    duck: [3, 5, "duck", 10],
                    jump: {
                        frames: [2, 10, 10, 10, 10, 2], 
                        next: "stop", 
                        frequency: 10
                    }
                }
            };

            instance.y = _FLOOR_Y;
            instance.x = 500;
            instance.scaleX = 1;

            spriteSheet = new SpriteSheet(data);
            animation = new BitmapAnimation(spriteSheet);
            animation.gotoAndStop('stop');
            instance.addChild(animation);

            setTimeout(addComment, 2000);

            UserEvent.KEY_DOWN.add(instance.handle_KEY_DOWN);
            UserEvent.KEY_UP.add(instance.handle_KEY_UP);
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
                instance.y = instance.y < _FLOOR_Y ? instance.y -= _GRAVITY * .2 : _FLOOR_Y;
            }
        }

        /**
         * handle keydown input
         */
        instance.handle_KEY_DOWN = function (e) {
            switch(e.keyCode) {
            case 37: //left
                vx = ducking ? -_SHELL_SPEED : -_WALK_SPEED;
                animation.scaleX = -1;
                animation.x = _WIDTH;
                break;
            case 39: //right
                vx = ducking ? _SHELL_SPEED : _WALK_SPEED;
                animation.scaleX = 1;
                animation.x = 0;
                break;
            case 38: //jump
                if (onFloor()) {
                    SoundJS.play('JumpSFX', SoundJS.INTERRUPT_ANY, 0, 0, 0, 0.5); 
                    animation.gotoAndPlay('jump');
                    jumping = true;
                }
                break;
            case 40: //duck
                if (!ducking && onFloor()) {
                    duck();
                }
                break;
            case 32: //fire
                if (!ducking && onFloor() && !shooting) {
                    fireball();
                }
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

        /**
         *
         * GETTERS
         *
         **/

        instance.getDirection = function () {
            return animation.scaleX;
        }

        instance.getJumping = function () {
            return !onFloor();
        }

        instance.getDucking = function () {
            return ducking;
        }

        instance.init();
    }

    Enemy.prototype = new Container();

    return Enemy;
});
