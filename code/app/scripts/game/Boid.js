define(['game/AssetLoader',
        'game/events/UserEvent'], 
        function(AssetLoader, UserEvent) {

    var Boid,
        instance;

    var Boid = function () {


        instance = this;
        instance.oPosition = {x: 0, y: 0};
        instance.velocity = {x: 0.5 - Math.random(), y: 0.5 - Math.random()};
        instance.speed = 0.85 + 0.15 * Math.random();
        instance.c = 0;

        /**
         * initialize
         */
        instance.init = function () {
            var BMD,
                ball;

            BMD = AssetLoader.assetloader.getResult("Fireball").src;
            ball = new Bitmap(BMD);
            instance.addChild(ball);
        },

        instance.update = function () {
            
        },

        instance.setId = function (_id) {
            id = _id;
        },

        instance.init();
    }

    Boid.prototype = new Container();

    return Boid;
});
