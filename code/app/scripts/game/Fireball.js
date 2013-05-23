define(['game/AssetLoader',
        'game/events/UserEvent'], 
        function(AssetLoader, UserEvent) {

    var Fireball,
        _FIREBALL_SPEED = 4;

    Fireball = function (direction) {
        var instance = this,
            dir = direction;
 
        instance.init = function () {
            var BMD,
                ball;

            BMD = AssetLoader.assetloader.getResult("Fireball").src;
            ball = new Bitmap(BMD);
            instance.scaleX = -dir;
            instance.addChild(ball);

		    Ticker.addListener(instance.update);
        }

        instance.update = function () {
            instance.x += dir * _FIREBALL_SPEED;
        }

        instance.getDirection = function () {
            return dir;
        }

    }

    Fireball.prototype = new Container();

    return Fireball;
});
