define(['game/AssetLoader',
        'game/events/UserEvent'], 
        function(AssetLoader, UserEvent) {

    var Boid,
        instance;

    var Boid = function () {
        instance = this;

        /**
         * initialize
         */
        instance.init = function () {
		    Ticker.addListener(instance.update);
        }

        instance.update = function () {

        }

        instance.init();
    }

    Boid.prototype = new Container();

    return Boid;
});
